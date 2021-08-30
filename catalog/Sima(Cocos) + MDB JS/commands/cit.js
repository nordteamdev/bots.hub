const { Command } = require('cocoscore');
const { createCanvas, loadImage} = require('canvas')
const canvas = createCanvas(800, 200)
const canvass = createCanvas(1000, 500)

module.exports = [
 new Command({
    trigger: /^цит|цитата|цитатни/i, type: 'razvl', name: 'Цит [пересланное сообщение]', description: 'Цитата', emoji: '📒',
    async handler(ctx, bot) {
        if (ctx.forwards[0]) {
        	if(ctx.forwards[0].senderId < 1) return ctx.error(`перешлите сообщение пользовпателя, а не группы!`)
            ctx.send(`Please wait...`);
            const Canvas = require('canvas');
            const Image = Canvas.Image;
            const ctxx = canvas.getContext('2d');

            const chit = ctx.forwards[0].text
            const [user] = await bot.vk.api.users.get({ user_ids: ctx.forwards[0].senderId, fields: "photo_200_orig" });
            const mychit = await loadImage(user.photo_200_orig);
            ctxx.drawImage(mychit, 0, 0);
            const img = new Image();
            img.src = './cit.png';
            ctxx.drawImage(img, 0, 0);

            ctxx.fillStyle = "#FFFFFF";
            ctxx.font = 'bold 23px Impact';
            ctxx.fillText(`“${chit.match(/.{1,35}/g).join("-\n")}„`, 210, 50);

            ctxx.fillStyle = "#000000";
            ctxx.font = 'thin 20px Impact'
            ctxx.fillText(`© ${user.first_name} ${user.last_name}`, 500, 195)
            const attachment = await bot.vk.upload.messagePhoto({source: canvas.toBuffer()});
			ctx.send({ attachment });
        }

        if (ctx.replyMessage) {
        	if(ctx.forwards[0].senderId < 1) return ctx.error(`ответьте на сообщение пользовпателя, а не группы!`)
            const Canvas = require('canvas');
            const Image = Canvas.Image;
            const ctxx = canvas.getContext('2d');

            const chit = ctx.replyMessage.text
            const [user] = await bot.vk.api.users.get({ user_ids: ctx.replyMessage.senderId, fields: "photo_200_orig" });
            const mychit = await loadImage(user.photo_200_orig);
            ctxx.drawImage(mychit, 0, 0);
            const img = new Image();
            img.src = './cit.png';
            ctxx.drawImage(img, 0, 0);

            ctxx.fillStyle = "#FFFFFF";
            ctxx.font = 'bold 23px Impact'; //
            ctxx.fillText(`“${chit.match(/.{1,35}/g).join("-\n")}„`, 210, 50);

            ctxx.fillStyle = "#000000";
            ctxx.font = 'thin 20px Impact'
            ctxx.fillText(`© ${user.first_name} ${user.last_name}`, 500, 195)
            const attachment = await bot.vk.upload.messagePhoto({source: canvas.toBuffer()});
			ctx.send({ attachment });
        }
    }
})
 ]