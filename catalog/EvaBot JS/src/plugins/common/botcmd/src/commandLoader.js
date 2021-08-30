import readdirp from 'readdirp';
import chokidar from 'chokidar';
import clearModule from 'clear-module';

export default class CommandLoader {
  aliases = new Map()

  constructor(plugin) {
    this.plugin = plugin;
    this.henta = plugin.henta;
  }

  initWatcher() {
    const watcher = chokidar.watch(`${this.henta.botdir}/src/commands`, {
      awaitWriteFinish: {
        stabilityThreshold: 500
      }
    });

    watcher.on('change', async path => {
      const command = this.commands.find(v => v.path === path);
      if (!command) {
        return;
      }

      this.henta.log(`Перезагрузка ${path}...`);
      // Clear
      this.commands = this.commands.filter(v => v !== command);
      this.aliases.delete(command.name);
      if (command.aliases) {
        command.aliases.forEach(v => { this.aliases.delete(v); });
      }

      if (command.clear) {
        await command.clear(this.henta);
      }

      clearModule(path);

      // Load
      const newCommand = await this.loadCommand(path);
      if (newCommand.init) {
        await newCommand.init(this.henta);
      }

      this.commands.push(newCommand);
      this.henta.log(`${path} перезагружен.`);
    });
  }

  async loadCommands() {
    const commandList = await readdirp.promise(`${this.henta.botdir}/src/commands`);
    this.commands = await Promise.all(commandList.map(v => this.loadCommand(v.fullPath)));
    await Promise.all(this.commands.map(v => v.init && v.init(this.henta)));
    this.henta.log(`Команды успешно загружены (${this.commands.length} шт.)`);
  }

  async loadCommand(path) {
    try {
      const commandModule = await import(path);
      const CommandClass = commandModule.default || commandModule;
      const command = new CommandClass();

      const tokens = path.split('/');
      command.type = tokens[tokens.length - 2];
      command.path = path;
      if (command.subcommands) {
        command.subcommandsAliases = {};
        command.subcommands.forEach(v => {
          command.subcommandsAliases[v.name] = v;
          if (v.aliases) {
            v.aliases.forEach(v2 => { command.subcommandsAliases[v2] = v; });
          }
        });
      }

      this.aliases.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(v => { this.aliases.set(v, command); });
      }

      return command;
    } catch (e) {
      throw Error(`Ошибка в команде ${path}: ${e.stack}`);
    }
  }
}
