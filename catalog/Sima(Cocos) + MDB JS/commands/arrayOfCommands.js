const { Command, Utils } = require('cocoscore');

module.exports = [
    new Command({
        trigger: /^инфа(?:\s+(.*)|$)/i,
        type: "razvl",
        name: 'Инфа',
        description: 'вероятность события',
        emoji: 'ℹ',
        handler(ctx) {
            ctx.send(`Вероятность -- ${Utils.getRandomInRange(0, 100)}%`);
        }
    }),
    new Command({
        trigger: /^(?:бот)/i,
        type: "razvl",
        name: 'Бот',
        description: 'проверка работоспособности',
        emoji: '📡',
        handler(ctx) {
             let b = Utils.getRandomElement([11269, 11257, 11685, 11918, 11195, 9195, 7332, 8018, 10520, 12315, 3117, 11258, 11864, 6347, 11924, 9230, 3170])
                    ctx.sendSticker(b);
        }
    })
];