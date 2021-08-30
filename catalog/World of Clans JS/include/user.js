const vk = require('./vk');
const util = require('./util');

var userInfo = {
  gold: 0,
  ore: 0,
  tree: 0,
  eat: 0,

  mines_gold: 0,
  mines_ore: 0,
  mines_tree: 0,
  mines_eat: 0,

  warehouses: 0,
  barracks: 0,
  towers: 0
}

module.exports = {
  getUserInfo: function(context) {
    let msg = context.text.split('\n');
    if(userInfo.gold == 0 && userInfo.ore == 0 && userInfo.tree == 0 && userInfo.eat == 0) {
      if(msg && msg[5] && msg[5].search(/золото/i) != -1) {
        userInfo.gold = msg[5].replace(`,`, ``).match(/\d+/i)[0];
        userInfo.ore = msg[6].replace(`,`, ``).match(/\d+/i)[0];
        userInfo.tree = msg[7].replace(`,`, ``).match(/\d+/i)[0];
        userInfo.eat = msg[8].replace(`,`, ``).match(/\d+/i)[0];
        console.log(`[ WOC BOT ] Золото: ${userInfo.gold} | Руды: ${userInfo.ore} | Дерева: ${userInfo.tree} | Еды: ${userInfo.eat}`);
        context.send({ message: `🕍 Постройки`, payload: `"постройки"` });
      } else {
        context.send({ message: `🕍 Поселение`, payload: `"поселение"` });
      }
    } else if(userInfo.mines_gold == 0 && userInfo.mines_ore == 0 && userInfo.mines_tree == 0 && userInfo.mines_eat == 0) {
      if(msg && msg[2] && msg[2].search(/шахты/i) != -1) {
        userInfo.mines_gold = msg[2].replace(`,`, ``).match(/\d+/i)[0];
        userInfo.mines_ore = msg[3].replace(`,`, ``).match(/\d+/i)[0];
        userInfo.mines_tree = msg[4].replace(`,`, ``).match(/\d+/i)[0];
        userInfo.mines_eat = msg[5].replace(`,`, ``).match(/\d+/i)[0];

        userInfo.warehouses = msg[7].replace(`,`, ``).match(/\d+/i)[0];
        userInfo.barracks = msg[8].replace(`,`, ``).match(/\d+/i)[0];
        userInfo.towers = msg[9].replace(`,`, ``).match(/\d+/i)[0];
        console.log(`[ WOC BOT ] Шахты: ${userInfo.mines_gold} | Рудники: ${userInfo.mines_ore} | Лесопилки: ${userInfo.mines_tree} | Фермы: ${userInfo.mines_eat}`);
        console.log(`[ WOC BOT ] Склады: ${userInfo.warehouses} | Казармы: ${userInfo.barracks} | Башни: ${userInfo.towers}`);
      } else {
        context.send({ message: `🕍 Постройки`, payload: `"постройки"` });
      }
    }
  }
}
