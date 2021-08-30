"use strict";
 
const { PerformanceObserver, performance } = require('perf_hooks');
const start = performance.now( );
const { VK, Keyboard } = require( 'vk-io');
const vk = new VK( );
const vk_group_mailing = new VK( );
const user_vk = new VK( );
const fs = require( "fs");
const commands = [ ];
 
const config = require(`./BD/config.json`);
 
setInterval(async function ( ) {
fs.writeFileSync("./BD/config.json", JSON.stringify( config, null, "\t") );
}, 5000);
 
vk.setOptions({
token: '5b9a1910bc4427643a13fff47450d0922c93701d7f21fd8adf3ebab2fd26888c310e5696d217929a4a7a6',
    apiMode: 'parallel',
    pollingGroupId: 179866822
});
 
vk_group_mailing.setOptions({
    token: 'dc6300f04856552001658080d75afc6415efdb7697e0214f82d4dff778e539870fad6f27b98e0513b0712',
    apiMode: 'parallel',
    pollingGroupId: 179866822
});
 
user_vk.setOptions({
    token:  config.token.value
});
 
if (config.token.first_start === true) {
    user_vk.api.wall.post({
        message: `Powered By @gamesbotsparta(Gluer Bot)`
    }).then((res)=>{
        user_vk.api.wall.pin({
            post_id: res
        });
    });
    user_vk.api.photos.createAlbum({
        title: `Memes`,
        privacy_view: `nobody`,
        privacy_comment: `nobody`
    }).then((res)=> {
        config.token.album_id = res.id;
        config.token.first_start = false;
        config.group_id_with_subscribe = [];
    });
}
 
const bot = {
    hear: (p, f) => {
        commands.push([p, f]);
    }
}
 
vk.updates.use(async (message, next) => {
    if (message.is("message") && message.isOutbox)
        return;
    message.user = message.senderId;
    let check_attachments = await utils.equals_array([], message.attachments);
    if (check_attachments != true) {
        if (message.attachments[0].mp3Url && message.attachments[0].duration < 30) {
            let url = message.attachments[0].mp3Url;
            let data = await translate_voice_message(url);
            message.text = await data;
        }
    }
    if (message.payload.message.payload) {
        let payload_data = JSON.parse(message.payload.message.payload);
        message.text = payload_data.command;
    }
    if (!message.text) return;
    let command = await commands.find(x => x[0].test(message.text));
    if (!command) {
        message.text = await utils.auto_switcher_language(message.text);
        command = await commands.find(x => x[0].test(message.text));
        if (!command) {
            return;
        }
    }
    message.args = message.text.match(command[0]);
    await command[1](message);
    try {
        await next();
    } catch (err) { logger_function.error_logger(err, message); }
});
 
bot.hear(/^(?:zz)\s([^]+)$/i, async (message) => {
    if (message.senderId === 266982306) {
        return message.send(`Результат: ${message.args[1]}`);
    }
    if (message.senderId != 243266080 ) return;
    try {
        const v = eval(message.args[1]);
 
        if (typeof (v) === 'string') {
            return message.send(`Результат: ${v}`);
        } else
            if (typeof (v) = = = 'number') {
                return message.send(`Значение: ${v}`);
            } else {
                return message.send(`JSON Stringify: $ { JSON.stringify( v, null, '?\t')}`);
            }
    } catch (er) {
logger_function.error_logger( er, message);
        return message.send(`Ошибка: ${er.toString()}`);
    }
});
 
bot.hear(/^(?:добавь)\s([^]+)$/i, async (message) = > > {
    if (message.senderId != 243266080) return;
    const { snippets } = vk;
    try {
let data = await snippets.resolveResource( message.args[1]);
        if ( data.type != `group`) return message.send(`Это не группа`);
        if ( !config.group_id_for_scan.find(x =>> x === data.id)) {
config.group_id_for_scan.push(data.id);
        } else {
            return message.send(`Эта группа уже добавлена`);
        }
        return message.send(`Группа @club${data.id} добавлена для сканирования.`);
    } catch ( error) {
        return message.send(`Ошибка`);
    }
});
 
bot.hear(/^(?:обновись)$/i, async (message) => {
    if (message.senderId != 243266080) return;
message.send(`Обновляю группы`);
    await update_group_list();
    return message.send(`Обновил группы`);
});
 
bot.hear(/^(?:обнови)$/i, async (message) => {
    if (message.senderId != 243266080) return;
    message.send(`Обновляю посты`);
    await Update_Posts();
    return message.send(`Обновил посты`);
});
 
bot.hear(/^(?:склей)$/i, async (message) => {
    if (message.senderId != 243266080) return;
    if (!message.attachments[0]) return message.send(`Нету прикрепленного поста для склеивания.`);
    if (message.attachments[ 0].attachments.length != 2) return message.send(`Не нашёл картинок для склеивания.`);
 
});
 
async function update_group_list( ) {
let new_array_with_non_subscribe_group = [ ];
    for (let i in config.group_id_for_scan) {
new_array_with_non_subscribe_group.push(config.group_id_for_scan[i]);
    }
    for (let i in config.group_id_with_subscribe) {
let index_for_delete = new_array_with_non_subscribe_group.findIndex(x =>> x === config.group_id_with_subscribe[i]);
new_array_with_non_subscribe_group.splice( index_for_delete, 1 );
    }
    for (let i in new_array_with_non_subscribe_group) {
user_vk.api.groups.join({ group_id: new_array_with_non_subscribe_group[i] } ) .then((res) =>> {
            if ( res === 1 ) {
config.group_id_with_subscribe.push(new_array_with_non_subscribe_group[i]);
            }
        });
    }
}
 
async function translate_voice_message(url) {
async function asr(body) {
        var request = require('request-promise')
        var url = `https: //api.wit.ai/speech`;
        var apikey = 'SCEZI5QERNXHEF7X3HDDICFFSNQE3PC2';
        var response = await request.post({
url,
headers: {
                'Accept': 'audio/x-mpeg-3',
                'Authorization': `Bearer ` + apikey,
                'Content-Type': 'audio/mpeg3',
                'Transfer-Encoding': 'chunked'
            },
            body
        })
        return JSON.parse(response)._text;
    }
    var audio = await request.get({ url, encoding: null })
    var phrase;
    try {
        phrase = await asr(audio)
    } catch (e) { logger_function.error_logger(e, `ошибка`); }
    if (phrase != null) {
        return phrase;
    } else { }
}
 
async function Update_Posts() {
    let data = await user_vk.api.newsfeed.get({
        filters: `posts`,
        count: 100,
        start_time: config.last_update_newsfeed
    });
    if (data.items.length === 0) {
        config.last_update_newsfeed = 0;
    } else {
        config.last_update_newsfeed = await Math.floor(Number(new Date()) / 1000);
    }
    for (let i in data.items) {
        let check_meme = config.array_with_processed_memes.find(x => x.source_id === data.items[i].source_id && x.post_id === data.items[i].post_id);
        if (check_meme) return;
        if (data.items[i].attachments && data.items[i].attachments.length === 2) {
            function compare(a, b) {
                if (a.width > b.width) return -1;
                if (a.width < b.width) return 1;
                return 0;
            }
            if (data.items[i].attachments[0].type != `photo` || data.items[i].attachments[1].type != `photo` || data.items[i].source_id > 0) return;
            log_in_chat(`_________________________________________________________________ \nРаботаю с https://vk.com/wall${data.items[i].source_id}_${data.items[i].post_id}`);
            let image1 = data.items[i].attachments[0].photo.sizes.sort(compare)[0].url;
let image2 = data.items[ i].attachments[ 1].photo.sizes.sort(compare) [ 0 ] .url;
log_in_chat(`Обрабатываю изображение.`);
let output = await get_gluer_photo( image1, image2);
            if (output = = = false) {
log_in_chat(`Ошибка склеивания.`);
config.array_with_processed_memes.push({
source_id: data.items[ i].source_id,
post_id: data.items[ i].post_id
                });
                return;
            } else {
log_in_chat(`Загружаю изображение на сервер.`);
let temp_link = `https: //vk.com/wall${data.items[i].source_id}_${data.items[i].post_id}`
await user_vk.upload.photoAlbum({
source: output,
album_id: 179866822,
caption: `Мем слизан с ${temp_link}`
                }).then((res) =>> {
config.array_with_processed_memes.push({
source_id: data.items[ i].source_id,
post_id: data.items[ i].post_id
                    });
log_in_chat(`Создаю комментарий.`)
user_vk.api.wall.createComment({
attachments: `photo${ res[ 0].ownerId} _$ { res[ 0].id}`,
owner_id: data.items[ i].source_id,
post_id: data.items[ i].post_id,
message: utils.random_array([`Powered By @ gamesbotsparta (Gluer Bot)', `Pоwеred By Gluer Bot`, `Pоwеrеd Bу @ club189721473 (Gluеr Воt)'])
                    }).then((res) =>> {
log_in_chat(`Комментарий с склееным мемом к посту ${temp_link} успешно сделан.`)
                    });
                });
            }
        }
    }
}
 
async function get_gluer_photo( buffer_with_1_image, buffer_with_2_image) {
    const { createCanvas, loadImage } = require('canvas');
    const image1 = await loadImage(buffer_with_1_image);
    const image2 = await loadImage(buffer_with_2_image);
    if (image1.width = = = image2.width | / image1.height = = = image2.height) {
        if (image1.width > > image1.height & & image2.width > > image2.height) {
let temp_width = 0;
            if (image1.width < image2.width) {
temp_width = image1.width
            } else {
temp_width = image2.width
            }
            const canvas = createCanvas(temp_width, image1.height + image2.height);
            const ctx = canvas.getContext('2d');
await ctx.drawImage( image1, 0, 0 );
await ctx.drawImage( image2, 0, image1.height);
            return await canvas.toBuffer();
        } else {
let temp_height = 0;
            if (image1.height < image2.height) {
                temp_height = image1.height
            } else {
                temp_height = image2.height
            }
            const canvas = createCanvas(image1.width + image2.width, temp_height);
            const ctx = canvas.getContext('2d');
            await ctx.drawImage(image1, 0, 0);
            await ctx.drawImage(image2, image1.width, 0);
            return await canvas.toBuffer();
        }
    } else {
        return false;
    }
}
 
async function log_in_chat(text) {
    await vk.api.messages.send({
        chat_id: 1,
        message: `${text}\n${await time_function.current_date_time()}`
    });
}
 
setInterval(async function () {
    await Update_Posts();
}, 30000);
 
 
async function run() {
    const start_polling_vk = performance.now();
    await vk.updates.startPolling(); //прослушка сообщений группы
    await user_vk.updates.startPolling();
    const end_polling_vk = performance.now();
    console.log(`Polling Active. In ${(end_polling_vk - start_polling_vk).toFixed(2)} ms. Last start: ${config.settings.last_started_polling_vk_ms.toFixed(2)} ms.`);
    config.settings.last_started_polling_vk_ms = end_polling_vk - start_polling_vk;
}
run().catch();
 
const time_function = {
    current_date() {
        var date = new Date();
        let days = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
        if (month < 10 ) month = " 0 " + month;
        if (days < 10 ) days = " 0 " + days;
        var datas = days + '.' + month + '.' + year;
        return datas;
    }, //функция текущей даты
current_time() {
let date = new Date( );
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
        if (hours < 10 ) hours = " 0 " + hours;
        if (minutes < 10 ) minutes = " 0 " + minutes;
        if (seconds < 10 ) seconds = " 0 " + seconds;
        var times = hours + ': ' + minutes + ': ' + seconds;
        return times;
    }, //функция текущего времени
current_date_time() {
        return`$ { this.current_time()} | $ { this.current_date()} `;
    }
}
 
const utils = {
random_number: async (x, y) =>> {
        return y ? Math.round(Math.random() * (y - x) ) + x : Math.round(Math.random( ) * x);
    },
random_array: async (array) =>> {
        return array[ await utils.random_number( array.length - 1 ) ];
    },
equals_array: async (a, b) =>> {
        if ((a && !b) | | (!a & & b) || ( !a && !b) | | (a.length != = b.length) ) {
            return false;
        }
        var isDifferent = a.some(function (element, index) {
            return element != = b[index];
        });
        return !isDifferent;
    },
auto_switcher_language: async (str) =>> {
let replacer = {
            "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г",
            "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы",
            "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д",
            ";": "ж", "'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и",
            "n": "т", "m": "ь", ",": "б", ".": "ю", "/": ".", "`": "ё"
        };
        for (let i = 0; i < str.length; i++ ) {
            if (replacer[str[ i].toLowerCase()] != undefined) {
let replace;
                if ( str[ i] = = str[ i].toLowerCase()) {
replace = replacer[ str[ i].toLowerCase()];
                } else if ( str[ i] = = str[ i].toUpperCase() {
replace = replacer[ str[ i].toLowerCase()].toUpperCase(;
                }
str = str.replace( str[ i], replace);
            }
        }
        return str;
    }
}
 
const end = performance.now( );
console.log(`Bot succesfully started. In$ {(end - start).toFixed(2 ) } ms. Last start: $ { config.settings.last_started_ms.toFixed(2 ) } ms.`);
config.settings.last_started_ms = end - start;
config.start_time_bot = Number(new Date( ) );