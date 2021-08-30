const {
    Command,
    Utils
} = require('cocoscore')

const {
	getUnix
} = require('../functions.js')

module.exports = [
    new Command({
        trigger: /^admin/i,
        permission: 1,
        handler(ctx, bot) {
            let admin = bot.commander.commands
                .filter((command) => command.type == "admin")
                .map((command) => `${command.emoji} ${command.name} -- ${command.description}`)
                .join('\n');

            ctx.send(`Добро пожаловать в панель Администратора, доступные команды:\n\n` + admin)
        }
    }),
    new Command({
        trigger: /^(?:ban)\s(.*)?$/i,
        type: "admin",
        name: "Ban [ссылка]",
        description: "Блокировка пользователя",
        emoji: "🅰",
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            userId = user.id
            let usr = await bot.db.getModel('user').findOne({
                vkId: userId
            })
            if (!usr) return ctx.error('пользователь не найден.')
            usr.banned = true
            usr.save()
            ctx.send(`Пользователь *id${userId} успешно заблокирован!`)
        }
    }),
    new Command({
        trigger: /^(?:unban)\s(.*)?$/i,
        type: "admin",
        name: "Unban [ссылка]",
        description: "разблокировка пользователя",
        emoji: "🅰",
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            userId = user.id
            let usr = await bot.db.getModel('user').findOne({
                vkId: userId
            })
            if (!usr) return ctx.error('пользователь не найден.')
            usr.banned = false
            usr.save()
            ctx.send(`Пользователь *id${userId} успешно раззблокирован!`)
        }
    }),
    new Command({
        trigger: /^(?:banrep)\s(.*)?$/i,
        type: "admin",
        name: "Banrep [ссылка]",
        description: "Блокировка репорта",
        emoji: "🅰",
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            userId = user.id
            let usr = await bot.db.getModel('user').findOne({
                vkId: userId
            })
            if (!usr) return ctx.error('пользователь не найден.')
            usr.banreport = true
            usr.save()
            ctx.send(`Пользователю *id${userId} запрещено писать в репорт!!`)
        }
    }),
    new Command({
        trigger: /^(?:unbanrep)\s(.*)?$/i,
        type: "admin",
        name: "Unbanrep [ссылка]",
        description: "разблокировка репорта",
        emoji: "🅰",
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            userId = user.id
            let usr = await bot.db.getModel('user').findOne({
                vkId: userId
            })
            if (!usr) return ctx.error('пользователь не найден.')
            usr.banreport = false
            usr.save()
            ctx.send(`Пользователю *id${userId} разрешено писать в репорт.`)
        }
    }),
    new Command({
        trigger: /^(?:banpay)\s(.*)?$/i,
        type: "admin",
        name: "Banpay [ссылка]",
        description: "блокировка передач",
        emoji: "🅰",
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            userId = user.id
            let usr = await bot.db.getModel('user').findOne({
                vkId: userId
            })
            if (!usr) return ctx.error('пользователь не найден.')
            usr.banpay = true
            usr.save()
            ctx.send(`Пользователю *id${userId} запрещены передачи денег`)
        }
    }),
    new Command({
        trigger: /^(?:unbanpay)\s(.*)?$/i,
        type: "admin",
        name: "unbanpay [ссылка]",
        description: "разблокировка передач",
        emoji: "🅰",
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            userId = user.id
            let usr = await bot.db.getModel('user').findOne({
                vkId: userId
            })
            if (!usr) return ctx.error('пользователь не найден.')
            usr.banpay = false
            usr.save()
            ctx.send(`Пользователю *id${userId} разрешены передачи денег`)
        }
    }),
    new Command({
        trigger: /^(?:bantop)\s(.*)?$/i,
        type: "admin",
        name: "Bantop [ссылка]",
        description: "Блокировка топа",
        emoji: "🅰",
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            userId = user.id
            let usr = await bot.db.getModel('user').findOne({
                vkId: userId
            })
            if (!usr) return ctx.error('пользователь не найден.')
            usr.bantop = true
            usr.save()
            ctx.send(`Пользователю *id${userId} отключён топ.`)
        }
    }),
    new Command({
        trigger: /^(?:unbantop)\s(.*)?$/i,
        type: "admin",
        name: "Unbantop [ссылка]",
        description: "разблокировка топа",
        emoji: "🅰",
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            userId = user.id
            let usr = await bot.db.getModel('user').findOne({
                vkId: userId
            })
            if (!usr) return ctx.error('пользователь не найден.')
            usr.bantop = false
            usr.save()
            ctx.send(`Пользователю *id${userId} включён топ.`)
        }
    }),
    new Command({
        trigger: /^(?:get)\s?(.*)$/i,
        type: "admin",
        name: 'get [ссылка]',
        description: 'профиль пользователя',
        emoji: '🅰',
        permission: 1,
        async handler(ctx, bot) {
            if (ctx.body[1]) {
            let text = '';
                let user = await bot.vk.snippets.resolveResource(ctx.body[1])
                if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
                userId = user.id
                let userFound = await bot.db.getModel('user').findOne({
                    vkId: userId
                })
                if (!userFound) return ctx.error('пользователь не найден.')

        if(userFound.home || userFound.apartment || userFound.phone || userFound.airplane || userFound.car || userFound.yacht || userFound.pit) text += "\n🔑 Имущество:\n";
        if(userFound.pit) text += `⠀🐼 Питомец: ${userFound.pit}\n`
        if(userFound.car) text += `⠀🚘 Машина: ${userFound.car}\n`
        if(userFound.airplane) text += `⠀✈ Самолёт: ${userFound.airplane}\n`
        if(userFound.home) text += `⠀🏠 Дом: ${userFound.home}\n`
        if(userFound.apartment) text += `⠀🌇 Квартира: ${userFound.apartment}\n`
        if(userFound.phone) text += `⠀📱 Телефон: ${userFound.phone}\n`
        if(userFound.yacht) text += `⠀🛥 Яхта: ${userFound.yacht}`

                ctx.send(`профиль пользователя:
🔎 ID: ${userFound.vkId}
🖊 Ник: ${userFound.nickname}
💬 Префикс: ${userFound.prefix ? `${userFound.prefix }` : `❌`}
💰 Денег: ${userFound.balance.toLocaleString()}$
🌐 Биткоинов: ${userFound.bitcoin.toLocaleString()}
👑 Рейтинг: ${userFound.rating.toLocaleString()}

${text}

💠 Бонус: ${(getUnix() - userFound.bonus) < 86400000 ? "✅ Получен" : "❌ Не получен"}
🆘 Бан репорта: ${userFound.banreport ? "✅" : "❌"}
🔁 Бан передач: ${userFound.banpay ? "✅" : "❌"}
🔝 Бан топа: ${userFound.bantop ? "✅" : "❌"}
🚫 Блокировка: ${userFound.banned ? "✅" : "❌"}
🅰 Админ права: ${userFound.permission ? "✅" : "❌"}
✉ Сообщений написал: ${userFound.lastMessage}

📗 Дата регистрации: ${userFound.regDate}
`)
            }
            if (ctx.forwards[0]) {
                let text = '';
                let user = ctx.forwards[0].senderId
                let userFound = await bot.db.getModel('user').findOne({
                    vkId: user
                })
                if (!userFound) return ctx.error('пользователь не найден.')

                            if(userFound.home || userFound.apartment || userFound.phone || userFound.airplane || userFound.car || userFound.yacht || userFound.pit) text += "\n🔑 Имущество:\n";
        if(userFound.pit) text += `⠀🐼 Питомец: ${userFound.pit}\n`
        if(userFound.car) text += `⠀🚘 Машина: ${userFound.car}\n`
        if(userFound.airplane) text += `⠀✈ Самолёт: ${userFound.airplane}\n`
        if(userFound.home) text += `⠀🏠 Дом: ${userFound.home}\n`
        if(userFound.apartment) text += `⠀🌇 Квартира: ${userFound.apartment}\n`
        if(userFound.phone) text += `⠀📱 Телефон: ${userFound.phone}\n`
        if(userFound.yacht) text += `⠀🛥 Яхта: ${userFound.yacht}`

                ctx.send(`профиль пользователя:
🔎 ID: ${userFound.vkId}
🖊 Ник: ${userFound.nickname}
💬 Префикс: ${userFound.prefix ? `${userFound.prefix }` : `❌`}
💰 Денег: ${userFound.balance.toLocaleString()}$
🌐 Биткоинов: ${userFound.bitcoin.toLocaleString()}
👑 Рейтинг: ${userFound.rating.toLocaleString()}

${text}

💠 Бонус: ${(getUnix() - userFound.bonus) < 86400000 ? "✅ Получен" : "❌ Не получен"}
🆘 Бан репорта: ${userFound.banreport ? "✅" : "❌"}
🔁 Бан передач: ${userFound.banpay ? "✅" : "❌"}
🔝 Бан топа: ${userFound.bantop ? "✅" : "❌"}
🚫 Блокировка: ${userFound.banned ? "✅" : "❌"}
🅰 Админ права: ${userFound.permission ? "✅" : "❌"}
✉ Сообщений написал: ${userFound.lastMessage}

📗 Дата регистрации: ${userFound.regDate}
`)
            }
            if (ctx.replyMessage) {
                let text = '';
                let user = ctx.replyMessage.senderId
                let userFound = await bot.db.getModel('user').findOne({
                    vkId: user
                })
                if (!userFound) return ctx.error('пользователь не найден.')
        if(userFound.home || userFound.apartment || userFound.phone || userFound.airplane || userFound.car || userFound.yacht || userFound.pit) text += "\n🔑 Имущество:\n";
        if(userFound.pit) text += `⠀🐼 Питомец: ${userFound.pit}\n`
        if(userFound.car) text += `⠀🚘 Машина: ${userFound.car}\n`
        if(userFound.airplane) text += `⠀✈ Самолёт: ${userFound.airplane}\n`
        if(userFound.home) text += `⠀🏠 Дом: ${userFound.home}\n`
        if(userFound.apartment) text += `⠀🌇 Квартира: ${userFound.apartment}\n`
        if(userFound.phone) text += `⠀📱 Телефон: ${userFound.phone}\n`
        if(userFound.yacht) text += `⠀🛥 Яхта: ${userFound.yacht}`

                ctx.send(`профиль пользователя:
🔎 ID: ${userFound.vkId}
🖊 Ник: ${userFound.nickname}
💬 Префикс: ${userFound.prefix ? `${userFound.prefix }` : `❌`}
💰 Денег: ${userFound.balance.toLocaleString()}$
🌐 Биткоинов: ${userFound.bitcoin.toLocaleString()}
👑 Рейтинг: ${userFound.rating.toLocaleString()}

${text}

💠 Бонус: ${(getUnix() - userFound.bonus) < 86400000 ? "✅ Получен" : "❌ Не получен"}
🆘 Бан репорта: ${userFound.banreport ? "✅" : "❌"}
🔁 Бан передач: ${userFound.banpay ? "✅" : "❌"}
🔝 Бан топа: ${userFound.bantop ? "✅" : "❌"}
🚫 Блокировка: ${userFound.banned ? "✅" : "❌"}
🅰 Админ права: ${userFound.permission ? "✅" : "❌"}
✉ Сообщений написал: ${userFound.lastMessage}

📗 Дата регистрации: ${userFound.regDate}
			`)
            }
        }
    }),
    new Command({
        trigger: /^(?:выдать|give)\s([0-9]+)\s?(.+)?/is,
        type: "admin",
        name: 'give [сумма] [ссылка]',
        description: 'ваыдача денег',
        emoji: '🅰',
        permission: 1,
        async handler(ctx, bot) {
            var userId
            var amount = Number(ctx.body[1])
            if (ctx.body[2]) {
                let user = await bot.vk.snippets.resolveResource(ctx.body[2])
                if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
                userId = user.id
            } else userId = ctx.senderId
            let userFound = await bot.db.getModel('user').findOne({
                vkId: userId
            }).exec()
            if (!userFound) return ctx.error('пользователь не найден.')
            userFound.balance += amount
            userFound.save()
            bot.logger.info(`Выдача средств: Администратор: vk.com/id${ctx.senderId} ${userId != ctx.senderId ? `Пользователь: vk.com/id${userId}`: 'выдача самому себе'} Сумма: ${amount.toLocaleString()}$ `)
            return ctx.send(`Вы успешно выдали ${userId != ctx.senderId ? `игроку [id${userFound.vkId}|${userFound.nickname}]`: 'себе'} ${amount.toLocaleString()}$`)
        }
    }),
    new Command({
        trigger: /^(?:addkey)\s(.*)\s(.+)/is,
        permission: 1,
        async handler(ctx, bot) {
            if (ctx.senderId !== 347241116) return;
            const Key = bot.db.getModel('key');

            var result = '';
            let charset = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789';
            for (let i = 0; i < 5; i++) {
                result += charset[Math.floor(Math.random() * (charset.length - 1))];
            }
            result += "-"
            for (let i = 0; i < 5; i++) {
                result += charset[Math.floor(Math.random() * (charset.length - 1))];
            }
            result += "-"
            for (let i = 0; i < 5; i++) {
                result += charset[Math.floor(Math.random() * (charset.length - 1))];
            }

            let newPromo = new Key({
                key: result,
                balance: Number(ctx.body[1]),
                users: [],
                activation: Number(ctx.body[2])
            });

            await newPromo.save();
            return ctx.send(`Ключ на ${ctx.body[1].toLocaleString()} успешно создан \n- ${result}\nАкиваций: ${ctx.body[2]}`);
        }
    }),
    new Command({
        trigger: /^(?:Ответ)\s([0-9]+)\s(.*)?$/i,
        permission: 1,
        handler(ctx, bot) {
            bot.vk.api.call('messages.send', {
                user_id: ctx.body[1],
                message: `[REPLY ON REPORT]\n\n- ${ctx.body[2]}`,
                random_id: 0
            })
            ctx.send(`Ответ отправлен.`);
        }
    }),
    new Command({
        trigger: /^rl|рл?$/i,
        permission: 1,
        handler(ctx, bot) {
            ctx.send(`Rebooting...\nPlease wait`, {
                emoji: '😀'
            });
            process.exit(-1)
        }
    }),
    new Command({
        trigger: /^(?:\!|\/)(.*)/i,
        permission: 1,
        async handler(ctx, bot) {
            if (ctx.user.vkId === 347241116) {
                try {
                    const result = eval(ctx.body[1]);

                    if (typeof(result) === 'string') {
                        return ctx.send(`Type: string\nResult: ${result}`);
                    } else if (typeof(result) === 'number') {
                        return ctx.send(`Type: number\nResult: ${result}`);
                    } else if (typeof(result) === 'boolean') {
                        return ctx.send(`Type: boolean\nResult: ${result}`);
                    } else {
                        return ctx.send(`${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`);
                    }
                } catch (e) {
                    console.error(e);
                    return ctx.send(`Error:
        ${e.toString()}`);
                }
            }
        }
    }),
    new Command({
        trigger: /^all\s(.*)/i,
        permission: 1,
        async handler(ctx, bot) {
            if (ctx.senderId !== 347241116) return;
            let users = await bot.db.getModel('user').find({
                banned: false
            })
            let a = users.map((user) => user.vkId)
            let chats = await bot.db.getModel('chat').find({})
            let b = chats.map((chat) => chat.id)
            let text = ctx.text.slice(4)

            bot.vk.api.call('messages.send', {
                user_ids: a,
                message: `[NEWS]\n- ${text}`,
                random_id: 0
            })

            bot.vk.api.call('messages.send', {
                chat_id: b,
                message: `[NEWS]\n- ${ctx.body[1]}`,
                random_id: 0
            })
        }
    }),
    new Command({
        trigger: /^allchat\s(.*)/i,
        permission: 1,
        async handler(ctx, bot) {
            let chats = await bot.db.getModel('chat').find({})
            let b = chats.map((chat) => chat.id)
            let text = ctx.text.slice(4)

            bot.vk.api.call('messages.send', {
                peer_id: 2000000000 + b,
                message: `[NEWS]\n- ${text}`,
                random_id: 0
            })
        }
    }),
    new Command({
        trigger: /^(?:setnick)\s(.*)\s(.*)/is,
        type: "admin",
        name: "Setnick [ссылка] [ник]",
        description: "установить ник пользователю.",
        emoji: '🅰',
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            userId = user.id
            let userFound = await bot.db.getModel('user').findOne({
                vkId: userId
            })
            if (!userFound) return ctx.error('пользователь не найден.')

            await userFound.set("nickname", ctx.body[2])
            userFound.save()

            ctx.send(`Ник пользователя *id${userId} был изменён.`)
        }
    }),
    new Command({
        trigger: /^ssh\s(.*)/i,
        permission: 1,
        async handler(ctx, bot) {
            if (ctx.senderId != 347241116) return;
            try {
                var gone = child.execSync(ctx.body[1])
            } catch (err) {
                var gone = err.toString()
            }
            return ctx.send(`${gone}`)
        }
    }),
    new Command({
    	trigger: /^setcar\n(.*)\n(.*)/i,
    	name: '',
    	description: '',
        permission: 1,
    	async handler(ctx, bot) {
    		let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            	if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            	userId = user.id
            		let userFound = await bot.db.getModel('user').findOne({
                		vkId: userId
            		})
            	if (!userFound) return ctx.error('пользователь не найден.')

            await userFound.set("car", ctx.body[2])
            userFound.save()

            ctx.send(`Имя машины пользователя *id${userId} было изменено на "${ctx.body[2]}"`)
    	}
    }),
    new Command({
    	trigger: /^sethome\n(.*)\n(.*)/i,
    	name: '',
    	description: '',
        permission: 1,
    	async handler(ctx, bot) {
    		let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            	if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            	userId = user.id
            		let userFound = await bot.db.getModel('user').findOne({
                		vkId: userId
            		})
            	if (!userFound) return ctx.error('пользователь не найден.')

            await userFound.set("home", ctx.body[2])
            userFound.save()

            ctx.send(`Имя дома пользователя *id${userId} было изменено на "${ctx.body[2]}"`)
    	}
    }),
    new Command({
    	trigger: /^setapart\n(.*)\n(.*)/i,
    	name: '',
    	description: '',
        permission: 1,
    	async handler(ctx, bot) {
    		let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            	if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            	userId = user.id
            		let userFound = await bot.db.getModel('user').findOne({
                		vkId: userId
            		})
            	if (!userFound) return ctx.error('пользователь не найден.')

            await userFound.set("apartment", ctx.body[2])
            userFound.save()

            ctx.send(`Имя квартиры пользователя *id${userId} было изменено на "${ctx.body[2]}"`)
    	}
    }),
    new Command({
    	trigger: /^setphone\n(.*)\n(.*)/i,
    	name: '',
    	description: '',
        permission: 1,
    	async handler(ctx, bot) {
    		let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            	if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            	userId = user.id
            		let userFound = await bot.db.getModel('user').findOne({
                		vkId: userId
            		})
            	if (!userFound) return ctx.error('пользователь не найден.')

            await userFound.set("phone", ctx.body[2])
            userFound.save()

            ctx.send(`Имя телефона пользователя *id${userId} было изменено на "${ctx.body[2]}"`)
    	}
    }),
    new Command({
    	trigger: /^setair\n(.*)\n(.*)/i,
    	name: '',
    	description: '',
        permission: 1,
    	async handler(ctx, bot) {
    		let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            	if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            	userId = user.id
            		let userFound = await bot.db.getModel('user').findOne({
                		vkId: userId
            		})
            	if (!userFound) return ctx.error('пользователь не найден.')

            await userFound.set("airplane", ctx.body[2])
            userFound.save()

            ctx.send(`Имя самолёта пользователя *id${userId} было изменено на "${ctx.body[2]}"`)
    	}
    }),
    new Command({
    	trigger: /^setyacht\n(.*)\n(.*)/i,
    	name: '',
    	description: '',
        permission: 1,
    	async handler(ctx, bot) {
    		let user = await bot.vk.snippets.resolveResource(ctx.body[1])
            	if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
            	userId = user.id
            		let userFound = await bot.db.getModel('user').findOne({
                		vkId: userId
            		})
            	if (!userFound) return ctx.error('пользователь не найден.')

            await userFound.set("yacht", ctx.body[2])
            userFound.save()

            ctx.send(`Имя яхты пользователя *id${userId} было изменено на "${ctx.body[2]}"`)
    	}
    }),
    new Command({
        trigger: /^setpit\n(.*)\n(.*)/i,
        name: '',
        description: '',
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
                if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
                userId = user.id
                    let userFound = await bot.db.getModel('user').findOne({
                        vkId: userId
                    })
                if (!userFound) return ctx.error('пользователь не найден.')

            await userFound.set("pit", ctx.body[2])
            userFound.save()

            ctx.send(`Имя питомца пользователя *id${userId} было изменено на "${ctx.body[2]}"`)
        }
    }),
    new Command({
        trigger: /^banlist/i,
        name: '',
        description: '',
        permission: 1,
        async handler(ctx, bot) {
           let users = await bot.db.getModel('user').find({ banned: true })
           let text = ``
           text += `заблокированные пользователи:\n\n`
           let a = users.map((x) => `🚫 @id${x.vkId}`).join('\n')

           ctx.send(`${text} ${a}`)
        }
    }),
    new Command({
        trigger: /^bantoplist/i,
        name: '',
        description: '',
        permission: 1,
        async handler(ctx, bot) {
           let users = await bot.db.getModel('user').find({ bantop: true })
           let text = ``
           text += `пользователи с бантопом:\n\n`
           let a = users.map((x) => `- @id${x.vkId} (${x.nickname}) [${x.vkId}]`).join('\n')

           ctx.send(`${text} ${a}`)
        }
    }),
    new Command({
        trigger: /^banreplist/i,
        name: '',
        description: '',
        permission: 1,
        async handler(ctx, bot) {
           let users = await bot.db.getModel('user').find({ banreport: true })
           let text = ``
           text += `пользователи с банрепортом:\n\n`
           let a = users.map((x) => `- @id${x.vkId} (${x.nickname}) [${x.vkId}]`).join('\n')

           ctx.send(`${text} ${a}`)
        }
    }),
    new Command({
        trigger: /^banpaylist/i,
        name: '',
        description: '',
        permission: 1,
        async handler(ctx, bot) {
           let users = await bot.db.getModel('user').find({ banpay: true })
           let text = ``
           text += `пользователи с баном передач:\n\n`
           let a = users.map((x) => `- @id${x.vkId} (${x.nickname}) [${x.vkId}]`).join('\n')

           ctx.send(`${text} ${a}`)
        }
    }),
new Command({
        trigger: /^setbtc\n(.*)\n(.*)/i,
        name: '',
        description: '',
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
                if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
                userId = user.id
                    let userFound = await bot.db.getModel('user').findOne({
                        vkId: userId
                    })
                if (!userFound) return ctx.error('пользователь не найден.')

            await userFound.set("bitcoin", ctx.body[2])
            userFound.save()

            ctx.send(`Биткоины пользователя *id${userId} установлены на "${ctx.body[2]}"`)
        }
    }),
    new Command({
        trigger: /^setblc\n(.*)\n(.*)/i,
        name: '',
        description: '',
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
                if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
                userId = user.id
                    let userFound = await bot.db.getModel('user').findOne({
                        vkId: userId
                    })
                if (!userFound) return ctx.error('пользователь не найден.')

            await userFound.set("balance", ctx.body[2])
            userFound.save()

            ctx.send(`Баланс пользователя *id${userId} установлен на "${ctx.body[2]}"`)
        }
    }),
    new Command({
        trigger: /^setrat\n(.*)\n(.*)/i,
        name: '',
        description: '',
        permission: 1,
        async handler(ctx, bot) {
            let user = await bot.vk.snippets.resolveResource(ctx.body[1])
                if (!user || user.type != "user") return ctx.error('укажите верную ссылку!')
                userId = user.id
                    let userFound = await bot.db.getModel('user').findOne({
                        vkId: userId
                    })
                if (!userFound) return ctx.error('пользователь не найден.')

            await userFound.set("rating", ctx.body[2])
            userFound.save()

            ctx.send(`Рейтинг пользователя *id${userId} установлен на "${ctx.body[2]}"`)
        }
    }),
    new Command({
        trigger: /^check\s?(.*)/i,
        async handler(ctx, bot) {
        	const {VK} = require('vk-io')
            const tok = new VK();
            var count = 0;
            var text = ``;
                if (!ctx.body[1]) return ctx.send(`Ошибка, вы не ввели токен сообщества.`);
            tok.api.call('groups.getTokenPermissions', {access_token: `${ctx.body[1]}`}).then(function(response) {
            var c = response;
            c.permissions.map(function(c) {
                text += `${c.name}, `;
                count += 1;
            })
        }).catch((error) => {
    return ctx.send(`Ошибка, указан неверный токен сообщества.`);
})
tok.api.call('groups.getById', {access_token: `${ctx.body[1]}`, fields: "members_count,age_limits,wall,verified,trending,status,site,is_closed,type"})
.then(function(response) {
    var gr = response[0];
    return ctx.send(`
Токен группы:  @club${gr.id} (${gr.name})
ID: ${gr.id}
Тип: ${gr.type.toString().replace(/group/gi, "GROUP").replace(/page/gi, "PUBLIC PABE").replace(/event/gi, "Мероприятие")}
Стена: ${gr.wall.toString().replace(/0/gi, "Выключена").replace(/1/gi, "OPEN").replace(/2/gi, "Ограниченая").replace(/3/gi, "CLOSED")}
Подписчики: ${gr.members_count}

Права токена(${count}):
[${text}]
`)
})
        }
    })
]