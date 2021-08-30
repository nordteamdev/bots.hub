const vk = require('./vk');
const util = require('./util');
const user = require('./user');
const config = require("../config.js");

var mines = {
  0: { name: `💰 Золото`, payload: `"золото"`, active: false, count: 0 },
  1: { name: `⛏ Руда`, payload: `"руда"`, active: false, count: 0 },
  2: { name: `🌲 Дерево`, payload: `"дерево"`, active: false, count: 0 },
};

var timer = null;

module.exports = {
  startMineng: function(type) {
    if(config.farm_gold) mines[0].active = true;
    if(config.farm_ore) mines[1].active = true;
    if(config.farm_tree) mines[2].active = true;
    console.log(`[ WOC BOT ] Настройки майнинга применены!`);
  },

  checkMine: function(msg) {
    if(timer != null || (!mines[0].active && !mines[1].active && !mines[1].active)) return;

    let thisMine = this.getThisMine();

    if(msg.search(/Рабочие устали/i) != -1) {
      timer = setTimeout(function() {
        vk.sendMsg(-172544710, mines[thisMine].name, mines[thisMine].payload);
        mines[thisMine].count = Number(mines[thisMine].count) + 1;
        timer = null;
      }, 300000);
      return;
    } else {
      vk.sendMsg(-172544710, mines[thisMine].name, mines[thisMine].payload);
      mines[thisMine].count = Number(mines[thisMine].count) + 1;
    }
  },

  getThisMine: function() {
    arr = [];
    Object.keys(mines).filter(function(value){
      if(mines[value].active) arr.push(value);
		});

    var sort = arr.sort(function(a,b) {
      return mines[a].count - mines[b].count
    });

    return sort[0];
  }
}
