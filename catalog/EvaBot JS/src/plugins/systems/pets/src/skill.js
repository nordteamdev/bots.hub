/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
function armor(attacker, defender, data, duel) {
  if (data.attack === 'fang') {
    data.builder.line(`🎊 ${defender.name} попытался использовать броню, но челюсти нападающего прокусили её.`);
    return;
  }

  if (data.attack === 'weight') {
    data.builder.line(`🎃 ${defender.name} даже засмеялся от того, что его пытались взять весом.`);
    data.damage = 0;
    return;
  }

  data.damage = Math.floor(data.damage * 0.6);
  data.builder.line(`🛡 ${defender.name} использует броню.`);
}

function hide(attacker, defender, data, duel) {
  if (data.attack === 'sensitivity') {
    data.builder.line(`❕ ${defender.name} попытался спрятаться, но чуткий ${attacker.name} мигом вычислил его.`);
    return;
  }

  data.damage = 0;
  data.builder.line(`💨 ${defender.name} успел спрятаться.`);
}

function pofigizm(attacker, defender, data, duel) {
  data.damage = Math.floor(data.damage * 0.3);
  data.builder.line(`💢 ${defender.name} не особо реагирует на атаку.`);
}

function wool(attacker, defender, data, duel) {
  if (data.attack === 'fang') {
    data.builder.line(`💥 ${defender.name} попытался использовать свою шерсть, но челюсти нападающего прокусили её.`);
    return;
  }

  data.damage = Math.floor(data.damage * 0.8);
  data.builder.line(`🕶 ${defender.name} использует свою шерсть.`);
}

function microSize(attacker, defender, data, duel) {
  if (data.attack === 'sensitivity') {
    data.builder.line(`💢 ${defender.name} хотел проскочить, но чуткий ${attacker.name} мигом поймал его.`);
    return;
  }

  if (Math.random() > 0.8) {
    data.builder.line(`💢 Попытка использовать свой маленький размер оказалась плохой идеей для ${defender.name}`);
  } else {
    data.damage = 0;
    data.builder.line(`💨 ${attacker.name} глазом не моргнул, как ${defender.name} пробежал между его лап.`);
  }
}

function fear(attacker, defender, data, duel) {
  if (Math.random() > 0.8) {
    data.builder.line(`😋 ${defender.name} использовал всю свою пугающую мощь, но ${attacker.name} был невозмутим.`);
  } else {
    data.damage = 0;
    data.builder.line(`👹 ${attacker.name} побоялся подходить к ${defender.name}.`);
  }
}

function foxery(attacker, defender, data, duel) {
  if (data.attack === 'sensitivity' && Math.random() > 0.2) {
    data.builder.line(`💢 ${defender.name} не смог извернуться от ${attacker.name}`);
    return;
  }

  data.damage = 0;
  data.builder.line(`💨 ${defender.name} успешно проскользнул где-то там где-то тут`);
}

function mercy(attacker, defender, data, duel) {
  data.builder.line(`😻 ${defender.name} был таким милым, ну как его атаковать?`);
  data.damage = 0;
}

/* Attacks */
function spit(attacker, defender, data, duel) {
  data.builder.line(`💦 ${attacker.name} плюнул в ${defender.name}`);
  duel.skipAttack = true;
}

function weight(attacker, defender, data, duel) {
  data.builder.line('💦 Упс..');
  data.damage = 101;
}

function infection(attacker, defender, data, duel) {
  duel.infection = attacker.id;
  data.builder.line(`💉 ${defender.name} поразила какая-то инфекция. Все его атаки на 90% слабже.`);
}


export default {
  armor,
  hide,
  pofigizm,
  wool,
  microSize,
  fear,
  foxery,
  mercy,
  // Attacks
  spit,
  weight,
  infection
};