const chalk = require('chalk-master')
console.log(chalk.bold.inverse.red('hi!'));
//chalk - установка цвета, шрифта//
/* chalk. ansi - настройка.
bold - жирный
underline - подчернутый
inverse - выделеный (при цвете будет цвет выделения)
bg(color с большой буквы)
color: magenta
*/
var ProgressBar = require('progress');

var bar = new ProgressBar('[:bar] :percent', { total: 20 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    console.log('\nComplete 100%');
    clearInterval(timer);
  }
}, 500);