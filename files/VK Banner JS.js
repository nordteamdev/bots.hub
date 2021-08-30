/*----------------------------------------------------------------------------------------------------------*/
/*======================================DEVELOPER KONSTANTIN AVDONIN========================================*/
/*======================= ================vk.com/fullstackowerflow==========================================*/
/*----------------------------------------------------------------------------------------------------------*/

// Чтобы этот г.код заработал поставьте  apiMode: "parallel_selected"  Так сказано в документации.

// Скопируйте код и вставьте в своего бота.

   



updates.hear(/^(?:обложка)/i, async message => {

    let _users = await User.countDocuments();

    const {
        registerFont
    } = require('canvas')
    registerFont('./fonts/8289.otf', {
        family: 'Intro'
    })

    const {
        createCanvas,
        loadImage
    } = require('canvas');
    const canvas = createCanvas(1590, 400);
    const ctxx = canvas.getContext('2d');
    const fon = await loadImage("./images/vk/banner.png")


    ctx = message;


    ctxx.drawImage(fon, 0, 0);

    ctxx.font = '30px intro';
    ctxx.fillStyle = '#FFF';

    ctxx.fillText(`Количество игроков: ${_users}`, 315, 50);
    //  require('fs').writeFileSync('cover.png', canvas.toBuffer())
    vk.upload.groupCover({
        group_id: 189612952,
        source: {
            value: canvas.toBuffer()
            //filename: 'vk.png'
        }

    })
    return message.send('Обложка обновлена!')
})