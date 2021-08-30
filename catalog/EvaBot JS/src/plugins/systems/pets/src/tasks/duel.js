import skillFuncs from '../skill';

/* eslint-disable no-param-reassign */
export default class DuelTask {
  constructor(plugin, petId, data) {
    this.plugin = plugin;
    this.sourceId = petId;
    Object.assign(this, data);

    if (this.targetId !== this.sourceId) {
      this.plugin.tasks.set(this.targetId, this);
      setTimeout(() => this.step(), Math.random() * 10e3);
    }
  }

  async step() {
    const pets = await Promise.all([
      this.plugin.Pet.findOne({ where: { id: this.sourceId } }),
      this.plugin.Pet.findOne({ where: { id: this.targetId } })
    ]);

    const attackerId = 1 - (this.lastAttackerId || 0);
    this.lastAttackerId = attackerId;

    const attacker = pets[attackerId];
    const defender = pets[1 - attackerId];

    const isGood = Math.random() > (attacker.force > defender.force ? 0.3 : 0.6);
    const data = {
      damage: isGood ? Math.floor(Math.random() * 60) : 0,
      builder: this.builder()
    };

    const attackerUseSkill = isGood
      && Math.random() > 0.5
      && this.plugin.skillFromSlug[attacker.skill.split('|')[0]];

    if (attackerUseSkill) {
      data.attack = attackerUseSkill.slug;
      const func = skillFuncs[attackerUseSkill.func || attackerUseSkill.slug];
      if (func) {
        await func(attacker, defender, data, this);
      } else {
        data.builder.line(`⚡ ${attacker.name} использует <<${attackerUseSkill.name}>>`);
      }
    } else {
      data.builder.line(await this.defaultText(isGood, attacker, defender, data.damage));
    }

    const defenderUseSkill = Math.random() < 0.5
      && this.plugin.skillFromSlug[defender.skill.split('|')[1]];


    if (defenderUseSkill) {
      data.defend = defenderUseSkill.slug;
      const func = skillFuncs[defenderUseSkill.func || defenderUseSkill.slug];
      if (func) {
        if (attackerUseSkill && attackerUseSkill.slug === 'hypnosis') {
          if (Math.random() > 0.3) {
            data.builder.line(`🕯 ${attacker.name} загипнотизировал ${defender.name} и тот не смог использовать защиту.`);
          } else {
            data.builder.line(`🎭 ${defender.name} увернулся от гипноза.`);
            await func(attacker, defender, data, this);
          }
        } else {
          await func(attacker, defender, data, this);
        }
      }
    }

    if (data.infection === attacker.id) {
      data.builder.line(`💉 ${attacker.name} чихнул.`);
      data.damage = Math.floor(data.damage * 0.1);
    }

    this.healths[1 - attackerId] -= data.damage;

    data.builder.line(this.getHealth(defender, data.damage, attackerId));
    await data.builder.send();

    if (this.healths[1 - attackerId] >= 0) {
      setTimeout(() => this.step(), Math.random() * 10e3);
    } else {
      this.end(attacker, defender);
    }
  }

  getHealth(defender, damage, attackerId) {
    if (damage === 0) {
      return '';
    }

    return `♥ ${defender.name} ➖${damage}% (${Math.max(this.healths[1 - attackerId], 0)}%)`;
  }

  async defaultText(isGood, attacker, defender) {
    const variants = await this.plugin.henta.util.loadSettings('pets/duelVariants.json');
    const variantLines = isGood ? variants.good : variants.bad;

    const variantText = variantLines[Math.floor(Math.random() * variantLines.length)];
    return `⚡ ${variantText.replace('&1', attacker.name).replace('&2', defender.name)}`;
  }

  async sendMessage(data) {
    const botPlugin = this.plugin.henta.getPlugin('common/bot');
    const messageBuilder = botPlugin.createBuilder(data);
    messageBuilder.setContext({ vk: this.plugin.henta.vk });
    await messageBuilder.run();

    this.peers.forEach(v => {
      messageBuilder.msg.peer_id = v;
      this.plugin.henta.vk.api.messages.send(messageBuilder.msg);
    });
  }

  builder() {
    const botPlugin = this.plugin.henta.getPlugin('common/bot');
    const messageBuilder = botPlugin.createBuilder();
    messageBuilder.setContext({ vk: this.plugin.henta.vk });

    messageBuilder.send = async () => {
      await messageBuilder.run();

      this.peers.forEach(v => {
        messageBuilder.msg.peer_id = v;
        this.plugin.henta.vk.api.messages.send(messageBuilder.msg);
      });
    };

    return messageBuilder;
  }

  async end(winner, looser) {
    // 0 - победитель ни капли не слабее, 1 - победитель во многом слабее.
    const ratingCoff = Math.min(Math.max(looser.force, 1) / Math.max(winner.force, 1), 1);
    const winnerRating = Math.floor(ratingCoff * 2000);
    const looserRating = Math.floor(ratingCoff * 2200);

    const force = Math.floor(Math.random() * 10) + Math.floor(ratingCoff * 10);
    winner.force += force;
    winner.rating += winnerRating;
    winner.save();

    looser.rating -= looserRating;
    if (looser.rating < 0) {
      looser.rating = 0;
    }
    looser.save();

    this.sendMessage(`⚜ ${winner.name} победил!`);

    // winner.getOwner().then(user => user.achievement.unlock('petWinner'));

    this.plugin.tasks.delete(this.sourceId);
    this.plugin.tasks.delete(this.targetId);
  }

  getText() {
    return '🔫 %petname% сейчас в дуэли.';
  }

  toJSON() {
    return {
      healths: this.healths,
      lastAttackerId: this.lastAttackerId,
      targetId: this.targetId,
      peers: this.peers
    };
  }
}
