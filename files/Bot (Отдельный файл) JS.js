const { VK } = require('vk-io')
const vk = new VK({
    token: 'а ты знал что vk.com/royale_mngr топ бот?'
})
const mysql = require('mysql')

const mysqlConfig = {
    host: 'а',
    user: 'у',
    password: 'ф',
    database: 'ф'
}

const connection = mysql.createConnection(mysqlConfig)
connection.connect()

vk.updates.hear(/^(?:начать|регистрация|рег|reg|register)$/i, context => {
    connection.query(`SELECT * FROM users`, (err, res) => {
        if(err) throw err
        if(res.length > 0) {
            context.send(`Хм... А вы уже зарегистрированы! 🤔`)
        } else {
            context.send(`✅ Вы успешно зарегистрировались!`)
            vk.api.users.get({
                user_ids: context.senderId
            }).then(response => {
                connection.query(`INSERT INTO users (name, vkid) VALUES ('${response[0].first_name}', ${context.senderId})`)
            })
        }
    })
})

vk.updates.hear(/^(?:ник|nick|nickname|никнейм)\s(.*)$/i, context => {
    connection.query(`SELECT 1 FROM users WHERE vkid = ${context.senderId}`, (err, res) => {
        if(res.length > 0) {
            const [, nick] = context.$match
            if(nick.length > 0)
            {
                if(res[0].admin == 0 && nick.lenght > 16) return context.send(`🚫 Длина никнейма должна быть от 1 до 16`)
                connection.query(`UPDATE users SET name = '${nick}' WHERE vkid = ${context.senderId}`)
                context.send(`✅ Никнейм успешно изменён на '${nick}'`)
            }
        } else {
            context.send(`Хм... А вы не зерегистрированы! 🤔`)
        }
    })
})

vk.updates.hear(/^(?:помощь|help|команды|cmds)$/i, context => {
    connection.query(`SELECT 1 FROM users WHERE vkid = ${context.senderId}`, (err, res) => {
        if(err) throw err
        if(res.length > 0) {
            context.send(`
            ❓ Команды бота:
            ⠀⠀⠀❗ Основные:
            ⠀⠀⠀⠀⠀⠀👤 Профиль - просмотреть свой профиль
            ⠀⠀⠀⠀⠀⠀💰 Баланс - просмотреть свой баланс
            ⠀⠀⠀⠀⠀⠀💳 Банк [снять/положить] - банковские операции
            ⠀⠀⠀⠀⠀⠀🎮 Ник [никнейм] - никнейм для всех аккаунтов
        
            ⠀⠀⠀👥 Соц.сети:
            ⠀⠀⠀⠀⠀⠀🗣 Создать [youtube/vk/instagram] - создать аккаунт в соц.сети
            ⠀⠀⠀⠀⠀⠀💬 VK - узнать информацию о аккаунте VK
            ⠀⠀⠀⠀⠀⠀📷 Instagram - узнать информацию о аккаунте Instagram
            ⠀⠀⠀⠀⠀⠀📽 YouTube - узнать информацию о аккаунте YouTube
            ⠀⠀⠀⠀⠀⠀📣 Пост [youtube/vk/instagram] - выложить пост в соц.сеть
            ⠀⠀⠀⠀⠀⠀🔊 Стрим - провести стрим на YouTube
            ⠀⠀⠀⠀⠀⠀💲 Партнёрка - подключить партнёрку для YouTube
            ⠀⠀⠀⠀⠀⠀📈 Реклама [youtube/vk/instagram] - заказать рекламу в соц.сеть
            
            ⠀⠀⠀⛏ Работы:
            ⠀⠀⠀⠀⠀⠀👷‍ Шахта - работать на шахте
            ⠀⠀⠀⠀⠀⠀👷‍♀ Стройка - работать на стройке
        
            ⠀⠀⠀💎 Прочее:
            ⠀⠀⠀⠀⠀⠀🥇 Рейтинг [кол-во] - приобрести рейтинг (1 шт. = 100000$)
            ⠀⠀⠀⠀⠀⠀🎖 VIP - узнать подробности о VIP-Аккаунте
            `)
        } else {
            context.send(`Хм... А вы не зерегистрированы! 🤔`)
        }
    })
})
vk.updates.hear(/^(?:профиль|профайл|profile)$/i, context => {
    connection.query(`SELECT * FROM users WHERE vkid = ${context.senderId}`, (err, res) => {
        if(err) throw err
        if(res.length > 0) {
            context.send(`
            👤 Профиль игрока ${res[0].name}:
            ⠀⠀⠀💲 Экономика:
            ⠀⠀⠀⠀⠀⠀💰 Баланс: ${res[0].balance}$
            ⠀⠀⠀⠀⠀⠀💳 Счёт в банке: ${res[0].bank}$
            ⠀⠀⠀👥 Соц.сети:
            ⠀⠀⠀⠀⠀⠀📷 Instagram-подписчики: ${res[0].insta==1 ? res[0].instasubs : 'Аккаунт в Instagram не создан!'}
            ⠀⠀⠀⠀⠀⠀💬 VK-подписчики: ${res[0].vk==1 ? res[0].vksubs : 'Аккаунт в VK не создан!'}
            ⠀⠀⠀⠀⠀⠀📽 YouTube-подписчики: ${res[0].yt==1 ? res[0].ytsubs : 'Аккаунт YouTube не создан!'}
            ⠀⠀⠀💎 Прочее:
            ⠀⠀⠀⠀⠀⠀🥇 Рейтинг: ${res[0].rating}
            ⠀⠀⠀⠀⠀⠀🎖 VIP: ${res[0].vip==1 ? 'Есть' : 'Нет'}
            `)
        } else {
            context.send(`Хм... А вы не зерегистрированы! 🤔`)
        }
    })
})

vk.updates.hear(/^(?:баланс|боланс|balance)$/i, context => {
    connection.query(`SELECT * FROM users WHERE vkid = ${context.senderId}`, (err, res) => {
        if(err) throw err
        if(res.length > 0) {
            context.send(`
            💰 Баланс игрока ${res[0].name}: ${res[0].balance}$
            `)
        } else {
            context.send(`Хм... А вы не зерегистрированы! 🤔`)
        }
    })
})

vk.updates.hear(/^(?:банк|💳 Банк|bank)$/i, context => {
    connection.query(`SELECT * FROM users WHERE vkid = ${context.senderId}`, (err, res) => {
        if(err) throw err
        if(res.length > 0) {
            context.send(`
            💳 Банковский счет игрока игрока ${res[0].name}: ${res[0].bank}$
            `)
        } else {
            context.send(`Хм... А вы не зерегистрированы! 🤔`)
        }
    })
})

vk.updates.hear(/^(?:банк|💳 Банк|bank)\s(.*)\s?([0-9]+)?$/i, context => {
    connection.query(`SELECT * FROM users WHERE vkid = ${context.senderId}`, (err, res) => {
        if(err) throw err
        if(res.length > 0) {
            const [, noSplit] = context.$match
            const args = noSplit.split(' ')
            if(args[0].match(/^(?:положить)$/i))
            {
                if(+args[1] <= res[0].balance) {
                    context.send(`💳 Банковский счет пополнен на ${args[1]}$`)
                    connection.query(`UPDATE users SET balance = balance - ${args[1]}, bank = bank + ${args[1]} WHERE vkid = ${context.senderId}`)
                } else {
                    context.send(`💳 У Вас недостаточно денег для пополнения счёта в банке!`)
                }
            } else if(args[0].match(/^(?:снять)$/i)) {
                if(+args[1] <= res[0].bank) {
                    context.send(`💳 Вы сняли ${args[1]}$ с банковского счета`)
                    connection.query(`UPDATE users SET balance = balance + ${args[1]}, bank = bank - ${args[1]} WHERE vkid = ${context.senderId}`)
                } else {
                    context.send(`💳 У Вас недостаточно денег для снятия с счёта в банке!`)
                }
            }
        } else {
            context.send(`Хм... А вы не зерегистрированы! 🤔`)
        }
    })
})

vk.updates.hear(/^(?:рейтинг|🥇 Рейтинг|rating)\s?([0-9]+)?$/i, context => {
    connection.query(`SELECT * FROM users WHERE vkid = ${context.senderId}`, (err, res) => {
        if(err) throw err
        if(res.length > 0) {
            const [, rating] = context.$match
            if(res[0].balance >= +rating * 100000)
            {
                context.send(`🥇 Вы успешно приобрели ${rating} рейтинга за ${+rating * 100000}$`)
                connection.query(`UPDATE users SET rating = rating + ${rating}, balance = balance - ${+rating * 100000} WHERE vkid = ${context.senderId}`)
            } else {
                context.send(`🥇 У Вас недостаточно денег!`)
            }
        } else {
            context.send(`Хм... А вы не зерегистрированы! 🤔`)
        }
    })
})

vk.updates.hear(/^(?:вип|🎖 VIP|vip)$/i, context => {
    connection.query(`SELECT * FROM users WHERE vkid = ${context.senderId}`, (err, res) => {
        if(err) throw err
        if(res.length > 0) {
            context.send(`
            🎖 VIP-аккаунт даёт:
            ⠀⠀⠀- 100 бесплатного рейтинга
            ⠀⠀⠀- возможность сделать ник длиннее 16 символов
            ⠀⠀⠀- ежедневные 10000$
            ⠀⠀⠀- нет лимита на перевод денег
            ⠀⠀⠀- возможность посмотреть чужой профиль (Профиль [id ВКонтакте])
            
            🎖 Цена: 29 рублей
            Приобрести можно на нашем сайте sait.ru
            `)
        } else {
            context.send(`Хм... А вы не зерегистрированы! 🤔`)
        }
    })
})

vk.updates.startPolling()