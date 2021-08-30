const {Command} = require('cocoscore');
 const { createCanvas, loadImage} = require('canvas')
  const canvas = createCanvas(890, 445)

module.exports = new Command({
    trigger: /^фпроф/i, type: 'razvl', name: 'ФПроф', description: 'Фото вашего профиля', emoji: '📷',
    async handler(ctx, bot) {
		const Canvas = require('canvas');
        const Image = Canvas.Image;
        const ctxx = canvas.getContext('2d');
        const [userq] = await bot.vk.api.users.get({ user_ids: ctx.user.vkId, fields: "photo_400_orig" });
        const mychit = await loadImage(userq.photo_400_orig);
        ctxx.drawImage(mychit, -80, -80);
        const img = new Image();
        img.src = './prof.png';
        ctxx.drawImage(img, 0, 0);
        ctxx.fillStyle = "#FFFFFF";
        ctxx.font = 'thin 25px Impact'; //
        ctxx.fillText(`${ctx.user.nickname}`, 380, 35);
        ctxx.fillText(`${ctx.user.vkId}`, 365, 67);
        ctxx.fillText(`${ctx.user.balance.toLocaleString()}$`, 436, 106);
        ctxx.fillText(`${ctx.user.bitcoin.toLocaleString()}`, 507, 144);
        ctxx.fillText(`${ctx.user.rating.toLocaleString()}`, 467, 183);
        ctxx.fillText(`${ctx.user.regDate}`, 580, 278);
        const attachment = await bot.vk.upload.messagePhoto({source: canvas.toBuffer()});
		ctx.send({ attachment });
    }
})