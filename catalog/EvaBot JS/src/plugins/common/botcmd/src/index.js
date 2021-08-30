import ArgumentParser from './argumentParser';
import CommandLoader from './commandLoader';

export default class BotCmdPlugin {
  constructor(henta) {
    this.henta = henta;
    this.argumentParser = new ArgumentParser(henta, this);
    this.loader = new CommandLoader(this);
    this.cache = new WeakMap();
  }

  async init(henta) {
    this.argumentParser.init();

    const { messageProcessor } = henta.getPlugin('common/bot');
    messageProcessor.handlers.set('command', this.handler.bind(this));

    await this.loader.loadCommands();
    this.loader.initWatcher();
  }

  get(commandName) {
    return this.loader.aliases.get(commandName.toLowerCase());
  }

  getSubcommand(ctx, command) {
    if (ctx.args.length < 2) {
      return;
    }

    return command.subcommandsAliases && command.subcommandsAliases[ctx.args[1]];
  }

  checkPex(ctx, right, errStr) {
    if (!right) {
      return true;
    }

    if (!ctx.user.pex || !ctx.user.pex.is(`command:${right}`)) {
      ctx.answer(errStr || 'У вас недостаточно прав!');
      return false;
    }

    return true;
  }

  async handler(ctx, next) {
    const commandLine = ctx.getPayloadValue('command') || ctx.text;
    if (!commandLine) {
      return next();
    }

    ctx.args = commandLine.split(' ').filter(v => v !== 'i');
    const commandName = ctx.args[0];

    const command = this.get(commandName);
    if (!command) {
      return next();
    }

    const currentCommand = this.getSubcommand(ctx, command) || command;

    if (!this.checkPex(ctx, currentCommand.right)) {
      return next();
    }

    if (currentCommand.cache) {
      const { type, ttl } = currentCommand.cache;
      const cached = this.cache.get(currentCommand) || {};
      if (type === 'all' && cached.data && Date.now() - cached.time <= ttl) {
        ctx.answer(cached.data);
        return next();
      }

      if (type === 'user' && cached.users && cached.users.get(ctx.user)) {
        const cachedUser = cached.users.get(ctx.user);
        if (cachedUser && Date.now() - cachedUser.time <= ttl) {
          ctx.answer(cachedUser.data);
          return next();
        }
      }

      const originalAnswer = ctx.answer.bind(ctx);
      const originalBuilder = ctx.builder.bind(ctx);

      if (type === 'all') {
        const writeToAllCache = data => {
          this.henta.log(`Кэширование ответа для '${commandName}'...`);
          this.cache.set(currentCommand, {
            data,
            time: Date.now()
          });
        };

        ctx.answer = data => {
          writeToAllCache(data);
          originalAnswer(data);
        };
      }

      if (type === 'user') {
        const writeToUserCache = data => {
          this.henta.log(`Кэширование ответа для '${commandName}'/${ctx.user.vkId}...`);
          cached.users = cached.users || new WeakMap();
          cached.users.set(ctx.user, {
            data,
            time: Date.now()
          });

          this.cache.set(currentCommand, cached);
        };

        ctx.answer = data => {
          writeToUserCache(data);
          originalAnswer(data);
        };
      }
    }

    if (currentCommand.arguments) {
      const [error, res] = await this.argumentParser.parse(
        ctx,
        currentCommand.arguments,
        command === currentCommand ? 0 : 1,
        commandName
      );

      if (error) {
        ctx.answer(res);
        return next();
      }

      ctx.params = res;
    }

    await currentCommand.handler(ctx);
    await next();
  }
}