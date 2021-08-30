import git from 'simple-git/promise';

class CommitSubcommand {
  name = 'commit';
  right = 'git';
  arguments = {
    msg: { name: 'Сообщение', type: 'string' }
  }

  async handler (ctx) {
    const repo = git(`/home/bots/eva`);
    await repo.add('.');
    await repo.commit(ctx.params.msg);
    ctx.answer('Success.');
  }
}

class PushSubcommand {
  name = 'push';
  right = 'git';

  async handler (ctx) {
    ctx.send('Pushing...');
    const repo = git(`/home/bots/eva`);
    await repo.push('origin', 'master');
    ctx.answer('Success.');
  }
}

export default class GitCommand {
  name = 'git';
  description = 'github';
  right = 'git';
  subcommands = [
    new CommitSubcommand(),
    new PushSubcommand()
  ];

  handler (ctx) {
    ctx.answer('abc');
  }
}