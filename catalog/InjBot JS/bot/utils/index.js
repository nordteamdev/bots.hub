const Utils = {
    // Случайное число в промежутке
    random: (x,y) => y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x),
    // Случайный элемент из массива
    randomPick: (array) => array[Utils.random(array.length - 1)]
};

module.exports = Utils;