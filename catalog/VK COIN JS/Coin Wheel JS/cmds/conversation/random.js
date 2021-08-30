module.exports = {
  tag: ["test"],
  button: ["test"],
  func: async(context, { util }) => {
    let str = ``;
    for(let i = 0; i < 25; i++) {
      str += `Число: ${util.random(1,36)} | Цвет: ${ (util.random(0,1) == 1 ? `Чёрный`:`Синий`) } <br>`;
    }; await context.send(str);
  }
};
