/*==========================================================================================================*/

/*============================DEVELOPER https://vk.com/fullstackoverflow====================================*/

/*==========================================================================================================*/

const download = require('image-downloader') //Модуль для загрузки фотографий на диск. Подробнее про этот модуль - https://www.npmjs.com/package/image-downloader 
const { VK } = require('vk-io');
const commands = [];
const utils = require("./other/utils");
const cars = require("./other/cars");
const { works } = require("./other/Earns.js");
const mongo = require("mongoose");
const { Keyboard } = require("vk-io");
const keyboard = Keyboard;
let user  = new VK();

/*==========================================================================================================*/

const promoSchema = new mongo.Schema({
	title: String,
	count: Number,
	users: Array,
	sum: Number
});

/*==========================================================================================================*/

const besedaSchema = new mongo.Schema({
	title: String,
	count: Number,
	users: Array,
});

/*==========================================================================================================*/

const Promo = mongo.model("Promo", promoSchema);
const Beseda = mongo.model("Beseda", besedaSchema);
let config = require('./authorization/auth.json');


/*==========================================================================================================*/

mongo.connect('mongodb://localhost:27017/bot', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('База данных загружена'))
    .catch(err => console.error(err));

    const schema = new mongo.Schema({
        id: Number,
        uid: Number,
        balance: Number,
        bank: Number,
        rating: Number,
        regDate: String,
        ban: Boolean,
        fuel: Number,
        lvl: Number,
        vip: Number,
        tag: String,
        kostya: Number,
        kostya1: Number,
        kostya2: Number,
        kostya3: Number,
        kostya4: Number,
        kostya5: Number,
        kostya6: Number,
        kostya7: Number,
        kostya8: Number,
        kostya9: Number,
        avdonin: Number,
        avdonin1: Number,
        avdonin2: Number,
        avdonin3: Number,
        avdonin4: Number,
        avdonin5: Number,
        avdonin6: Number,
        avdonin7: Number,
        avdonin8: Number,
        avdonin9: Number
    });
    
/*==========================================================================================================*/

    let stats = {
        messages: {
            inbox: 0,
            outbox: 0
        },
        new_users: 0,
        bot_start: Date.now()
    }
    
    const User = mongo.model("User", schema);

/*==========================================================================================================*/

    const vk = new VK({
    token: config.grouptoken, 
    pollingGroupId: config.groupid,
    apiMode: "parallel_selected"
});
const {
    updates,
    snippets
} = vk;
    
updates.startPolling();
updates.on('message', async (message) => {
        
    if (Number(message.senderId) <= 0) return;
    if (/\[public180013698\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[public180013698\|(.*)\]/ig, '').trim();
    let _user = await User.findOne({
        id: message.senderId
    });
        
    if (!_user) {
        let [user_info] = await vk.api.call("users.get", {
            user_id: message.senderId
        });
    
        let count = await User.countDocuments();
    
        let $user = new User({
    
            id: message.senderId,
            uid: count + 1,
            balance: 10000,
            bank: 0,
            rating: 0,
            regDate: getUnix(),
            ban: false,
            fuel: 0,
            lvl: 0,
            vip: 0,
            tag: user_info.first_name,
            kostya: 0,
            kostya1: 0,
            kostya2: 0,
            kostya3: 0,
            kostya4: 0,
            kostya5: 0,
            kostya6: 0,
            kostya7: 0,
            kostya8: 0,
            kostya9: 0,
            avdonin: 0,
            avdonin1: 0,
            avdonin2: 0,
            avdonin3: 0,
            avdonin4: 0,
            avdonin5: 0,
            avdonin6: 0,
            avdonin7: 0,
            avdonin8: 0,
            avdonin9: 0
        
        });
    
        await $user.save();
        await vk.api.messages.send({
            chat_id: 1,
            message: `${unixStamp(getUnix())} ${message.isChat ? "в беседе №"+message.chatId : "В личном сообщении бота"}: Новый пользователь - vk.com/id${message.senderId}  ID: ${count + 1}`
        });
        if (message) {
            await message.sendAudioMessage('https://psv4.userapi.com/c852720//u167888509/audiomsg/d3/e490cc23db.mp3');
            await message.send(`@id${message.senderId} (${user_info.first_name}), приветствуем Вас! купите тачку в магазине чтобы начать игру а потом выберите ее для гонок `, {
                keyboard: generateKeyboard(["💣 Команды","🏁 Гонка", "🚗 Гараж", "🛒 Магазин"])
            });
        }
        stats.new_users += 1;
        }
        message.user = await User.findOne({
            id: message.senderId
        });
        
        
        const command = commands.find(x=> x[0].test(message.text));
	if(!command)
	{
       

	}
        message.args = message.text.match(command[0]);
        await command[1](message);
        
        console.log(` Введена команда: ${message.text}.`)
        console.log(``)
        });

        const cmd = {
            hear: (p, f) => {
                commands.push([p, f]);
            }
        }
      
       cmd.hear(/^(?:🚗 машины|машины)$/i, async (message) => {

            return message.reply(`📋 Список доступных машин:
                    
                    ${cars.map((x) => `🚗 ${x.id}. ${x.name} — ${utils.spaces(x.cost)}$`).join("\n")}
                    
                    ❓ Купить машину: Купить [номер машины] \n Или же нажмите на кнопку!`, {
                        keyboard: generateKeyboard(["🚗 1","🚗 2","🚗 3","🚗 4","🛒 Магазин","⚠️ restart"])
                    });
                    
        
        
        });
        cmd.hear(/^(?:⚠️ restart|restart|рестарт)$/i, async (message) => {

            return message.reply(`Клавиатура возвращена в исходное состояние! `, {
                keyboard: generateKeyboard(["💣 Команды","🏁 Гонка", "🚗 Гараж", "🛒 Магазин"])
            }); 
        });

        cmd.hear(/^(?:❓ профиль|профиль)$/i, async (message) => {

            return message.reply(`💰 Баланс: ${message.user.balance}$\n 🏆 Рейтинг: ${message.user.rating}\n 👤 Уровень: ${message.user.lvl} `, {
                keyboard: generateKeyboard(["💣 Команды","🏁 Гонка", "🚗 Гараж", "🛒 Магазин"])
            }); 
        });
        cmd.hear(/^(?:🛒 Магазин|магазин)$/i, async (message) => {

            return message.reply(`📋 Выберите раздел: 
            ❓ Нажмите на клавиатуре интересующий Вас пункт. Если клавиатуры по каким то причинам нет, напишите "Машины" без кавычек. `, {
                keyboard: generateKeyboard(["🚗 машины","⚠️ restart"])
            }); 
        });

        cmd.hear(/^(?:🚗 1|купить 1)$/i, async (message) => {

            let carss = cars.find((x) => x.id == 1);
        
            if (!carss) return;
        
            if (carss.cost > message.user.balance) return message.reply(`Недостаточно денег! \n💰 Баланс: ${message.user.balance}$`);
            else if (carss.cost <= message.user.balance) {
                //	await message.user.dec("balance", raketaa.cost);
                await message.user.dec("balance", carss.cost);
                await message.user.set("kostya", 1);
                await message.user.set("avdonin1", 1);
        
                return message.reply(`вы успешно купили ${carss.name} за ${utils.spaces(carss.cost)}$ 😇`, {
                    keyboard: generateKeyboard(["🏁 Гонка", "🚗 Гараж", "🛒 Магазин"]),
                
                    attachment: carss.attachment
                })
            }
        });
        cmd.hear(/^(?:баланс)$/i, async (message) => {
  
           
               await message.user.set("balance", 40000);
                
        
                return message.reply(`kostya - ${message.user.kostya} \n kostya1 - ${message.user.kostya1} \n kostya2 - ${message.user.kostya2} \n kostya3 - ${message.user.kostya3}`);
           
        });
        cmd.hear(/^(?:🚗 2|купить 2)$/i, async (message) => {

            let carss = cars.find((x) => x.id == 2);
        
            if (!carss) return;
        
            if (carss.cost > message.user.balance) return message.reply(`Недостаточно денег! \n💰 Баланс: ${message.user.balance}$`);
            else if (carss.cost <= message.user.balance) {
                //	await message.user.dec("balance", raketaa.cost);
                await message.user.dec("balance", carss.cost);
                await message.user.set("kostya1", 1);
                await message.user.set("avdonin1", 1);
                return message.reply(`вы успешно купили ${carss.name} за ${utils.spaces(carss.cost)}$ 😇`, {
                    keyboard: generateKeyboard(["🏁 Гонка", "🚗 Гараж", "🛒 Магазин"]),
                    attachment: carss.attachment
                })
            }
        });

        cmd.hear(/^(?:🚗 3|купить 3)$/i, async (message) => {

            let carss = cars.find((x) => x.id == 3);
        
            if (!carss) return;
        
            if (carss.cost > message.user.balance) return message.reply(`Недостаточно денег! \n💰 Баланс: ${message.user.balance}$`);
            else if (carss.cost <= message.user.balance) {
                //	await message.user.dec("balance", raketaa.cost);
                await message.user.dec("balance", carss.cost);
                await message.user.set("kostya2", 1);
                await message.user.set("avdonin1", 1);
                return message.reply(`вы успешно купили ${carss.name} за ${utils.spaces(carss.cost)}$ 😇`, {
                    keyboard: generateKeyboard(["🏁 Гонка", "🚗 Гараж", "🛒 Магазин"]),
                    attachment: carss.attachment
                })
            }
        });

        cmd.hear(/^(?:🚗 4|купить 4)$/i, async (message) => {

            let carss = cars.find((x) => x.id == 4);
        
            if (!carss) return;
        
            if (carss.cost > message.user.balance) return message.reply(`Недостаточно денег! \n💰 Баланс: ${message.user.balance}$`);
            else if (carss.cost <= message.user.balance) {
                //	await message.user.dec("balance", raketaa.cost);
                await message.user.dec("balance", carss.cost);
                await message.user.set("kostya3", 1);
                await message.user.set("avdonin1", 1);
                return message.reply(`вы успешно купили ${carss.name} за ${utils.spaces(carss.cost)}$ 😇`, {
                    keyboard: generateKeyboard(["🏁 Гонка", "🚗 Гараж", "🛒 Магазин"]),
                    attachment: carss.attachment
                })
            }
        });

        cmd.hear(/^(?:обложка)/i, async message => {
           
            
     
            const use_id = message.user.id;
            const [ava_info] = await vk.api.users.get({
                user_id: use_id,
                fields: "photo_400"
            });
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
            const phone = await loadImage("./images/vk.png")
           
           
            ctx = message;
            const mychit = await loadImage(last_subscriber.photo_200);
        
           ctxx.drawImage(phone, 0, 0, 1590, 400);
            ctxx.drawImage(mychit, 640, 0, 170, 170);
            ctxx.font = '30px intro';
            ctxx.fillStyle = '#FFF';
        
            ctxx.fillText(`ТЕСТ`, 315, 50);
          //  require('fs').writeFileSync('cover.png', canvas.toBuffer())
            vk.upload.groupCover({
                group_id: 180013698,
                source: {
                  value: canvas.toBuffer(),
                  filename: 'vk.png'
                }
              })
        
        })

      
       

        cmd.hear(/^(?:🏁 Гонка|гонка)/i, async message => {
            if (message.user.balance == 0) return message.send("У Вас закончились деньги!");
            if (message.user.avdonin1 == 0) return message.send("Чтобы учавствовать в гонках, купите машину!", {
                keyboard: generateKeyboard(["💣 Команды", "🚗 Гараж", "🛒 Магазин"])
            }); 
            if (message.user.avdonin == 0) return message.send("Перейдите в гараж и выберите машину для гонок!", {
                keyboard: generateKeyboard(["🏁 Гонка", "🚗 Гараж"])
            }); 
            
            let users = await User.find({
                avdonin: {
                    $gte: 1
                }
            });
            const use_id = message.user.id;
            const [ava_info] = await vk.api.users.get({
                user_id: use_id,
                fields: "photo_400"
            });
            const { registerFont } = require('canvas')
            registerFont('./fonts/8289.otf', { family: 'Intro' })
            users = users.filter(d => d.id != message.senderId)
            let user2 = users[utils.random(0, users.length - 1)]
            
            const [ava_infoo] = await vk.api.users.get({
                user_id: user2.id,
                fields: "photo_400"
            });
            let user1 = await User.findOne({
                id: message.senderId
            });
            
            const {
                createCanvas,
                loadImage
            } = require('canvas');
            const canvas = createCanvas(800, 400);
            const ctxx = canvas.getContext('2d');
            const phone = await loadImage("./images/gonka.png")
            let tachka_1, tachka_2;
           
            switch (user1.avdonin) {
                case 1:
                    tachka_1 = await loadImage(`./images/zhiguli.png`)
                    break;
                case 2:
                    tachka_1 = await loadImage(`./images/mercedes.png`)
                    break;
                case 3:
                    tachka_1 = await loadImage(`./images/bmw.png`)
                    break;
                case 4:
                    tachka_1 = await loadImage(`./images/Lambordzhini.png`)
                    break;
            }
            switch (user2.avdonin) {
                case 1:
                    tachka_2 = await loadImage(`./images/zhiguli.png`)
                    break;
                case 2:
                    tachka_2 = await loadImage(`./images/mercedes.png`)
                    break;
                case 3:
                    tachka_2 = await loadImage(`./images/bmw.png`)
                    break;
                case 4:
                    tachka_2 = await loadImage(`./images/Lambordzhini.png`)
                    break;
            }
        
            ctx = message;
            const mychit = await loadImage(ava_info.photo_400);
            const mychit2 = await loadImage(ava_infoo.photo_400);
            ctxx.drawImage(mychit, 640, 0, 170, 170);
            ctxx.drawImage(mychit2, 0, 0, 170, 170);
            ctxx.drawImage(phone, 0, 0, 800, 400);
            
            ctxx.drawImage(tachka_2, 4, 100, 280, 280) // TODO: норм координаты выбрать
            ctxx.drawImage(tachka_1, 500, 100, 280, 280)
            let flag = utils.random(0, user1.fuel) % 100 - utils.random(0, user2.fuel) % 100
            flag = utils.random(0, 100 + flag) < 50 ? 0 : 1;
            if (flag) {
                ctxx.font = '30px intro'; 
                ctxx.fillStyle = '#FFF';
                
                ctxx.fillText(`ПОБЕДА`, 315, 50);
                let km = utils.random(3, 10);
	await message.user.inc("balance", km * 1000)
                const foto = await vk.upload.messagePhoto({
                    source: canvas.toBuffer()
                });
                message.send(`@id${message.user.id} (${message.user.tag}), Вы одержали победу!\nВаш соперник @id${user2.id} (${user2.tag}) дал вам ${utils.spaces(km * 1000)}₽ `, {
                    keyboard: generateKeyboard(["🏁 Гонка", "🚗 Гараж", "🛒 Магазин"]),
                    attachment: foto
                });
        
            } else {
                ctxx.font = '30px intro'; 
                ctxx.fillStyle = '#FFF';
                ctxx.fillText(`ПОРАЖЕНИЕ `, 315, 50);
        
                const foto = await vk.upload.messagePhoto({
                    source: canvas.toBuffer()
                });
                let km = utils.random(3, 10);
                await message.user.dec("balance", km * 1000)
                message.send(`@id${message.user.id} (${message.user.tag}), ❗ Вы проиграли гонку!\nВы отдали сопернику @id${user2.id} (${user2.tag}) : ${utils.spaces(km * 1000)}₽ `, {
                    keyboard: generateKeyboard(["🏁 Гонка", "🚗 Гараж", "🛒 Магазин"]),
                    attachment: foto
                });
            }
        })
       

       
        cmd.hear(/^(?:чек)/i, async message => {
            const {
                createCanvas,
                loadImage
            } = require('canvas');
            const canvas = createCanvas(800, 400);
            const ctxx = canvas.getContext('2d');
            const phone = await loadImage(`./users_images/${message.user.uid}.png` )
           
        
            ctx = message;
            ctxx.drawImage(phone, 0, 0, 800, 400);
            
                const foto = await vk.upload.messagePhoto({
                    source: canvas.toBuffer()
                });
                message.send(`@id${message.user.id} (${message.user.tag}), фото, загруженное Вами на наш сервер `, {
                    attachment: foto
                });
        
          
        })
        cmd.hear(/^(?:🚕 1)$/i, async (message) => {
            let user = await User.findOne({ id: message.senderId });
            if (message.user.kostya == 0) return message.reply(`У тебя нету этой машины, посети магазин.`, {
                keyboard: generateKeyboard(["💣 Команды","🏁 Гонка", "🚗 Гараж", "🛒 Магазин"])
            }); 
             
            //if(message.user.pol === 1) return message.send(`Вы уже выбрали пол.\nСледующая смена пола будет стоить 250.000.000$`)
            await user.set("avdonin", 1);
            return message.send(`Вы выбрали жигу для гонок`,{
            keyboard: generateKeyboard(["🏁 Гонка","⚠️ restart"])
            })
            });

            cmd.hear(/^(?:🚕 2)$/i, async (message) => {
                let user = await User.findOne({ id: message.senderId });
                if (message.user.kostya1 == 0) return message.reply(`У тебя нету этой машины, посети магазин.`, {
                    keyboard: generateKeyboard(["💣 Команды","🏁 Гонка", "🚗 Гараж", "🛒 Магазин"])
                }); 
                
                //if(message.user.pol === 1) return message.send(`Вы уже выбрали пол.\nСледующая смена пола будет стоить 250.000.000$`)
                await user.set("avdonin", 2);
                return message.send(`Вы выбрали мерин для гонок`,{
                    keyboard: generateKeyboard(["🏁 Гонка","⚠️ restart"])
                    })
                    });
                cmd.hear(/^(?:🚕 3)$/i, async (message) => {
                    let user = await User.findOne({ id: message.senderId });
                   
                    if (message.user.kostya2 == 0) return message.reply(`У тебя нету этой машины, посети магазин.`, {
                        keyboard: generateKeyboard(["💣 Команды","🏁 Гонка", "🚗 Гараж", "🛒 Магазин"])
                    }); 
                    //if(message.user.pol === 1) return message.send(`Вы уже выбрали пол.\nСледующая смена пола будет стоить 250.000.000$`)
                    await user.set("avdonin", 3);
                    return message.send(`Вы выбрали бэху для гонок`,{
                        keyboard: generateKeyboard(["🏁 Гонка","⚠️ restart"])
                        })
                        });

                    cmd.hear(/^(?:🚕 4)$/i, async (message) => {
                        let user = await User.findOne({ id: message.senderId });
                        if (message.user.kostya3 == 0) return message.reply(`У тебя нету этой машины, посети магазин.`, {
                            keyboard: generateKeyboard(["💣 Команды","🏁 Гонка", "🚗 Гараж", "🛒 Магазин"])
                        }); 
                        
                        //if(message.user.pol === 1) return message.send(`Вы уже выбрали пол.\nСледующая смена пола будет стоить 250.000.000$`)
                        await user.set("avdonin", 4);
                        return message.send(`Вы выбрали ламбу для гонок`,{
                            keyboard: generateKeyboard(["🏁 Гонка","⚠️ restart"])
                            })
                            });


                            cmd.hear(/^(?:команды|💣 команды)$/i, async (message) => {
                               
                                return message.send(`Список команд:

                                фото загрузить [прикреплённое фото] - загружает фото на наши сервера
                                чек - показывает фото, загруженное Вами
                                гонка - игра)
                                магазин - список тачек
                                audiomusic [прикрепленная музыка] -запишет гс с вашим музлом
                                гараж - ваш гараж
                                профиль - ваш профиль
                                беседа "ссылка" добавить беседу в базу
                                поиск беседы - тип поиск)0) окда
                                `,{
                                    keyboard: generateKeyboard(["🏁 Гонка","🚗 Гараж","🛒 Магазин" ])
                                    })
                                    });


                        cmd.hear(/^(?:фото загрузить)$/i, async (message) => {
                            var url = message.attachments[0].mediumPhoto;
                            const downloader = require('image-downloader')
                            options = {
                                url: url,
                                dest: `./users_images/${message.user.uid}.png`,        // сохраниие в папку  /canvas с айди игрока
                                done: function(err, filename, image) {
                                  if (err) {
                                    throw err
                                  }
                                  message.send('Ваша фотография успешно загружена!')
                                }
                              }
                               
                              downloader(options)
                        
                        
                        })

                        

                        cmd.hear(/^(?:checkurl)/i, message => {

                            // получение урл голосового сообщение
                        
                            var url = message.replyMessage.attachments[0].url
                            message.send(url);
                        
                        
                        });
                       
                        cmd.hear(/^(?:audiomusic)/i, message => {

                            // запишет голосовое сообщение с прикрепленной музыкой
                            var a = message.attachments[0];
                            var gs = a.url;
                            var name = a.title;
                            var auth = a.artist;
                            message.sendAudioMessage(gs,{message: `Лови свой трек! \n Исполняет: ${auth}! \n Трек называется: ${name}`})
                   
                            })

                            cmd.hear(/^(?:беседа)\s(.*)$/i, async (message) => {
                                if(!message.args[1].match(/https:\/\/vk\.me\/join\/.+/gi)||!message.args[1].match(/https:\/\/vk\.me\/join\/.+/gi).length) return message.send (`Неверная ссылка`);
                                let $beseda = await Beseda.findOne({ title: message.args[1].toLowerCase() });
                            
                                if($beseda) return message.send(`Беседа уже добавлена`);
                                let newBeseda = new Beseda({
                                    title: message.args[1],
                                    users: []
                                });
                            
                                await newBeseda.save();
                                return message.send(`Беседа добавлена ${message.args[1]}`);
                            });


cmd.hear(/^(?:dell)$/i, async (message) => {
				let user = await User.findOne({ id: message.senderId });
		
                await user.set("kostya", 0);
                await user.set("kostya1", 0);
                await user.set("kostya2", 0);
                await user.set("kostya3", 0);
                await user.set("kostya4", 0);
                await user.set("avdonin", 0);
                await user.set("avdonin1", 0);
				return message.send(`Обнуление завершено! `)
				});
           
                cmd.hear(/^(?:промосоздать)\s([0-9]+)\s([0-9]+)\s(.*)$/i, async (message) => {
                    if(message.senderId !== 167888509) return;
                    let $promo = await Promo.findOne({ title: message.args[3].toLowerCase() });
                
                    if($promo) return message.reply(`уже есть такой промокод.`);
                    let newPromo = new Promo({
                        title: message.args[3].toLowerCase(),
                        count: Number(message.args[1]),
                        users: [],
                        sum: Number(message.args[2])
                    });
                
                    await newPromo.save();
                    return message.reply(`промокод создан.`);
                });
                
                cmd.hear(/^(?:промостатус)\s(.*)$/i, async (message) => {
                    let $promo = await Promo.findOne({ title: message.args[1].toLowerCase() });
                    if(!$promo) return message.reply(`промокод не найден!`);
                
                    return message.reply(`информация:
                    
                    🆕 Осталось активаций: ${$promo.count - $promo.users.length}\n💰 Сумма: ${utils.spaces($promo.sum)}$`);
                });

                cmd.hear(/^(?:поиск беседы)$/i, async (message) => {
                    let $beseda = await Beseda.find({} );
                    $beseda = $beseda.sort(()=> {return 0.5 - Math.random()})[0];
                
                    return message.send(`
                    
                     ${$beseda.title}`);
                });
                
                cmd.hear(/^(?:промо)\s(.*)$/i, async (message) => {
                    let $promo = await Promo.findOne({ title: message.args[1].toLowerCase() });
                
                    if(!$promo) return message.reply(`промокод не найден!`);
                    if($promo.users.indexOf(message.senderId) !== -1) return message.reply(`вы уже активировали этот промокод.`);
                
                    if($promo.users.length >= $promo.count) {
                        await $promo.remove();
                        return message.reply(`промокод закончился...`);
                    }
                
                    $promo.users.push(message.senderId);
                    await $promo.save();
                
                    await message.user.inc("balance", $promo.sum);
                    return message.reply(`вы успешно активировали промокод!\n\n🆕 Осталось активаций: ${$promo.count - $promo.users.length}\n💰 Вы получили ${utils.spaces($promo.sum)}$`);
                });
                
                 


               
     
                cmd.hear(/^(?:гараж|🚗 Гараж)/i, async message => {
                    const { registerFont } = require('canvas')
            registerFont('./fonts/8289.otf', { family: 'Intro' })
                    const use_id = message.user.id;
                    const [ava_info] = await vk.api.users.get({
                        user_id: use_id,
                        fields: "photo_400"
                    });
               
                    let user1 = await User.findOne({
                        id: message.senderId
                    });
                    const {
                        createCanvas,
                        loadImage
                    } = require('canvas');
                    const canvas = createCanvas(800, 400);
                    const ctxx = canvas.getContext('2d');
                    const mychit = await loadImage(ava_info.photo_400);
                  //  const ogo = await loadImage(`./users_images/${message.user.uid}.png`);
                    
                    ctxx.drawImage(mychit, 0, 80, 250, 250);
                  //  ctxx.drawImage(ogo, 0, 80, 250, 250);
                    const phone = await loadImage("./images/fon.png");
                    const tachka_1 = await loadImage(`./images/zhiguli.png`);
                const  tachka_2 = await loadImage(`./images/mercedes.png`);
                const tachka_3 = await loadImage(`./images/bmw.png`);
                const   tachka_4 = await loadImage(`./images/Lambordzhini.png`);
                
                    ctxx.drawImage(phone, 0, 0, 800, 400);
                    if(user1.kostya == 1) {
                        ctxx.drawImage(tachka_1, 500, 100, 280, 280);
                    }
                    if(user1.kostya1 == 1) {
                        ctxx.drawImage(tachka_2, 350, 100, 280, 280);
                    }
                        if(user1.kostya2 == 1) {
                            ctxx.drawImage(tachka_3, 250, 100, 280, 280);
                        }
                            if(user1.kostya3 == 1) {
                                ctxx.drawImage(tachka_4, 150, 100, 280, 280);
                            }
               
                    ctx = message;
                 
                   
                   
                    ctxx.font = '40px intro'; 
                        ctxx.fillStyle = '#FFF';
                        ctxx.fillText(`Ваш гараж`, 50, 50);
                        const foto = await vk.upload.messagePhoto({
                            source: canvas.toBuffer()
                        
                        });
                        message.send(`@id${message.user.id} (${message.user.tag}), Ваш гараж:\n ❓ Для выбора автомобиля для гонок кликните по клавиатуре на нужный Вам автомобиль! `, {
                            keyboard: generateKeyboard(["🚕 1","🚕 2", "🚕 3", "🚕 4"]),
                        
                            attachment: foto
                        
                        
                        });
                
                })
     


                cmd.hear(/([^])/, (message) => {

                    if (!message.isChat) {
                
                        let task = ``
                        let ans = `Упс... Я не знаю такой команды`
                        if (message.text.includes(`ф`)) {
                            task += `\n⠀➖ Фото загрузить [прикреплённое фото]`
                            task += `\n⠀➖ Профиль`
                        }
                        if (message.text.includes(`ч`)) {
                            task += `\n⠀➖ Чек - показывает фото, загруженное Вами`
                        }
                        if (message.text.includes(`г`)) {
                            task += `\n⠀➖ Гараж - ваш гараж`
                            task += `\n⠀➖ Гонка - игра)`
                        }
                        if (message.text.includes(`м`)) {
                            task += `\n⠀➖ Магазин - список тачек`
                        }
                        
                        if (task !== ``) ans += `\n▶ Возможно вы имели в виду:${task}`
                        return message.send(ans)
                    }
                })			
                function generateKeyboard(array) {
                    let kb = [];
                    if(array.length > 40) return false;
                
                    for (let i = 0; i < 10; i += 1) {
                        if(!array.slice(i * 4, i * 4 + 4)[0]) break;
                        kb.push(array.slice(i * 4, i * 4 + 4));
                    }
                
                    kb.map((arr) => {
                        arr.map((button, i) => {
                            arr[i] = Keyboard.textButton({ label: button });
                        });
                    });
                
                    return Keyboard.keyboard(kb);
                }
                
User.prototype.inc = function(field, value) {
	this[field] += value;
	return this.save();
}

User.prototype.dec = function(field, value) {
	this[field] -= value;
	return this.save();
}

User.prototype.set = function(field, value) {
	this[field] = value;
	return this.save();
}
function flipString(string) {
    let result = "";
    string = string.toLowerCase().split("").reverse();
    string.map((symbol) => {
        result += flipTable[symbol] || symbol;
    });
    return result;
}


function time() {
	let date = new Date();
	let days = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	if (hours < 10) hours = "0" + hours;
	if (minutes < 10) minutes = "0" + minutes;
	if (seconds < 10) seconds = "0" + seconds;
	var times = hours + ':' + minutes + ':' + seconds
	return times;
}
//------------------------------------------------------------------------------------\\
function date() {
	var date = new Date();
	let days = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear()
	if (month < 10) month = "0" + month;
	if (days < 10) days = "0" + days;
	var datas = days + '.' + month + '.' + year;
	return datas;
}

function timeConverter(UNIX_timestamp) {
	let a = new Date(UNIX_timestamp * 1000);
	let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = a.getHours();
	let min = a.getMinutes();
	let sec = a.getSeconds();
	if (hour < 10) hour = `0${hour}`;
	if (min < 10) min = `0${min}`;
	if (sec < 10) sec = `0${sec}`;
	if (date < 10) date = `0${date}`;
	let read_time = `${hour}:${min}:${sec}`;
	let read_date = date + '.' + month + '.' + year;
	let time_date = date + '.' + month + '.' + year + ' | ' + hour + ':' + min + ':' + sec;
	let time = {
		moment: time_date,
		date: read_date,
		time: read_time,
		years: year,
		months: month,
		number: date,
		hours: hour,
		minutes: min,
		secunds: sec
	}
	return time;
}

function getUnix() {
	return Date.now();
}

function unixStamp(stamp) {
	let a = new Date(stamp);
	let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = a.getHours();
	let min = a.getMinutes();
	let sec = a.getSeconds();
	if (hour < 10) hour = `0${hour}`;
	if (min < 10) min = `0${min}`;
	if (sec < 10) sec = `0${sec}`;
	if (date < 10) date = `0${date}`;
	let read_time = `${hour}:${min}:${sec}`;
	let read_date = date + '.' + month + '.' + year;
	let time_date = date + '.' + month + '.' + year + ' , ' + hour + ':' + min + ':' + sec;
	return time_date;
}

function unixStampLeft(stamp) {
	stamp = stamp / 1000;

	let s = stamp % 60;
	stamp = (stamp - s) / 60;

	let m = stamp % 60;
	stamp = (stamp - m) / 60;

	let h = (stamp) % 24;
	let d = (stamp - h) / 24;

	let text = ``;

	if (d > 0) text += Math.floor(d) + " д. ";
	if (h > 0) text += Math.floor(h) + " ч. ";
	if (m > 0) text += Math.floor(m) + " мин. ";
	if (s > 0) text += Math.floor(s) + " с.";

	return text;
}                 

























console.log('')
console.log('-------------------------------------------------------------')
console.log('Поздравляю, Бот успешно запустился!')
console.log('Написал это ущербное говно - https://vk.com/fullstackoverflow ')
console.log('-------------------------------------------------------------')
console.log('')


function generateKeyboard(array) {
	let kb = [];
	if(array.length > 40) return false;

	for (let i = 0; i < 10; i += 1) {
		if(!array.slice(i * 4, i * 4 + 4)[0]) break;
		kb.push(array.slice(i * 4, i * 4 + 4));
	}

	kb.map((arr) => {
		arr.map((button, i) => {
			arr[i] = Keyboard.textButton({ label: button });
		});
	});

	return Keyboard.keyboard(kb);
}
