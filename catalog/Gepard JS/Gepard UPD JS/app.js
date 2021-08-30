// топ 1 бот на свете vk.com/royale_mngr


const { VK, Keyboard } = require('vk-io');
const mysql = require("mysql");

const schedule = require('node-schedule');
const numeral = require("numeral");

const samp = require("samp-query");

const mysqlConfig = {
    host: 'remotemysql.com',
    user: 'Uwt7tzhuFw',
    password: '8J45PfWhtd',
    database: 'Uwt7tzhuFw'
};

function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

connection = mysql.createConnection(mysqlConfig);
connection.connect();

const vk = new VK({
    token: "token",
    pollingGroupId: 178397108
});

vk.updates.on('message', async (context, next) => {
    context.text = context.text.replace(/(@gepard_bot |Bot Gepard )/g, "");
    await next();
});

vk.updates.hear(/^(?:регистрация|начать)$/i, async (context) => {
    connection.query(`SELECT 1 FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            context.send({
                message: `Вы уже зарегистрированы!`,
                keyboard: Keyboard.keyboard([
                    Keyboard.textButton({
                        label: 'Помощь',
                        payload: {
                            command: 'Помощь'
                        },
                        color: Keyboard.PRIMARY_COLOR
                    }),
                    Keyboard.textButton({
                        label: 'Бонус',
                        payload: {
                            command: 'Бонус'
                        },
                        color: Keyboard.POSITIVE_COLOR
                    }),
                    Keyboard.textButton({
                        label: 'Ферма',
                        payload: {
                            command: 'Ферма'
                        },
                        color: Keyboard.NEGATIVE_COLOR
                    })
                ])
            });
        } else {
            context.send({
                message: `Вы успешно зарегистрировались! Укажите ваш никнейм через команду 'Ник [никнейм]'`,
                keyboard: Keyboard.keyboard([
                    Keyboard.textButton({
                        label: 'Помощь',
                        payload: {
                            command: 'Помощь'
                        },
                        color: Keyboard.PRIMARY_COLOR
                    }),
                    Keyboard.textButton({
                        label: 'Бонус',
                        payload: {
                            command: 'Бонус'
                        },
                        color: Keyboard.POSITIVE_COLOR
                    }),
                    Keyboard.textButton({
                        label: 'Ферма',
                        payload: {
                            command: 'Ферма'
                        },
                        color: Keyboard.NEGATIVE_COLOR
                    })
                ])
            });
            context.sendSticker(6006);
            connection.query(`INSERT INTO players (nickname, balance, vkid) VALUES ('No-Name', 10000, ${context.senderId})`);
        }
    });
});

vk.updates.hear(/^(?:ник)\s(.*)$/i, async (context) => {
    connection.query(`SELECT 1 FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            const [, displayName] = context.$match;
            connection.query(`UPDATE players SET nickname = '${displayName}' WHERE vkid = ${context.senderId}`);
            context.send(`Никнейм изменён на ${displayName}!`);
            context.sendSticker(7208);
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:помощь)$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            context.send(`
            [id${context.senderId}|${results[0].nickname}], команды бота:
            ⠀⠀⠀Основные:
            ⠀⠀⠀⠀⠀⠀- Помощь
            ⠀⠀⠀⠀⠀⠀- Ник [никнейм]
            ⠀⠀⠀⠀⠀⠀- Бонус
            ⠀⠀⠀⠀⠀⠀- Профиль
            ⠀⠀⠀Имущество:
            ⠀⠀⠀⠀⠀⠀- Бизнесы
            ⠀⠀⠀⠀⠀⠀- Дома
            ⠀⠀⠀⠀⠀⠀- Машины
            ⠀⠀⠀⠀⠀⠀- Яхты
            ⠀⠀⠀⠀⠀⠀- Самолёты
            ⠀⠀⠀Разное:
            ⠀⠀⠀⠀⠀⠀- Передать [id профиля] [сумма]
            ⠀⠀⠀⠀⠀⠀- Казино [сумма]
            ⠀⠀⠀⠀⠀⠀- Самп [ip сервера] (узнать информацию о сервере SA:MP или CR:MP)
            ⠀⠀⠀⠀⠀⠀- Промо [промокод] (ввести промокод)
            `);
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:бизнесы)$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            context.send(`
            [id${context.senderId}|${results[0].nickname}], бизнесы:
            🎒 1. Продуктовый магазин - 10.000$
            ⠀⠀⠀⠀⠀⠀Прибыль: 500$/час
            🎒 2. SA:MP Сервер - 50.000$
            ⠀⠀⠀⠀⠀⠀Прибыль: 1500$/час
            🎒 3. Minecraft сервер - 100.000$
            ⠀⠀⠀⠀⠀⠀Прибыль: 5000$/час
            🎒 4. Свой Youtube-канал - 250.000$
            ⠀⠀⠀⠀⠀⠀Прибыль: 15000$/час
            🎒 5. Собственный клуб - 1.000.000$
            ⠀⠀⠀⠀⠀⠀Прибыль: 50000$/час
            🎒 6. Казинo - 10.000.000$
            ⠀⠀⠀⠀⠀⠀Прибыль: 500000$/час
            🎒 7. Букмекерская контора - 100.000.000$
            ⠀⠀⠀⠀⠀⠀Прибыль: 5000000$/час

            💡 Вы можете иметь только ОДИН бизнес!
            🚩Для покупки введите "Бизнес [номер]"
            `);
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:дома)$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            context.send(`
            [id${context.senderId}|${results[0].nickname}], дома:
            🎒 1. Мусорный бак (100$)
            🎒 2. Детская площадка (500$)
            🎒 3. Сарай (2.500$)
            🎒 4. Землянка (5.000$)
            🎒 5. Маленький дом (10.000$)
            🎒 6. 3-ёх комнатная квартира в Москве (50.000$)
            🎒 7. Вилла (150.000$)
            🎒 8. Дворец (1.000.000$)
            🎒 9. Белый дом (10.000.000$)

            💡 Вы можете иметь только ОДИН дом!
            🚩Для покупки введите "Дом [номер]"
            `);
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:машины)$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            context.send(`
            [id${context.senderId}|${results[0].nickname}], машины:
            🎒 1. ВАЗ 2101 (1.000$)
            🎒 2. ВАЗ 2106 (5.000$)
            🎒 3. Лада Приора (10.000$)
            🎒 4. Лада Гранта (15.000$)
            🎒 5. Skoda Kodiaq (30.000$)
            🎒 6. Lamborghini Aventador (150.000$)
            🎒 7. Ferrari LaFerrari (1.000.000$)
            🎒 8. MacLaren (15.000.000$)
            🎒 9. Запорожец (100.000.000.000$)

            💡 Вы можете иметь только ОДНУ машину!
            🚩Для покупки введите "Машина [номер]"
            `);
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:яхты)$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            context.send(`
            [id${context.senderId}|${results[0].nickname}], яхты:
            🎒 1. Ванна (1.000$)
            🎒 2. Nauticat 331 (5.000$)
            🎒 3. Nordhavn 56 MS (10.000$)
            🎒 4. Princess 60 (15.000$)
            🎒 5. Azimut 70 (30.000$)
            🎒 6. Dominator 40M (150.000$)
            🎒 7. Moonen 124 (1.000.000$)
            🎒 8. Wider 150 (15.000.000$)
            🎒 9. Palmer Johnson 42M SuperSport (30.000.000$)
            🎒 10. Wider 165 (50.000.000$)
            🎒 11. Eclipse (100.000.000$)
            🎒 12. Dubai (150.000.000$)
            🎒 13. Streets of Monaco (300.000.000$)

            💡 Вы можете иметь только ОДНУ яхту!
            🚩Для покупки введите "Яхта [номер]"
            `);
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:с(а|о)м(а|о)л(ё|о|е|йo|ьо)т(и|ы))$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            context.send(`
            [id${context.senderId}|${results[0].nickname}], самолёты:
            🎒 1. Параплан (10.000$)
            🎒 2. АН-2 (50.000$)
            🎒 3. Cessna-172E (100.000$)
            🎒 4. Supermarine Spitfire (150.000$)
            🎒 5. BRM NG-5 (300.000$)
            🎒 6. Cessna T210 (750.000$)
            🎒 7. Beechcraft 1900D (5.000.000$)
            🎒 8. Cessna 550 (30.000.000$)
            🎒 9. Hawker 4000 (50.000.000$)
            🎒 10. Learjet 31 (150.000.000$)
            🎒 11. Airbus A318 (500.000.000$)
            🎒 12. F-35A (1.000.000.000$)
            🎒 13. B-2 Spirit Stealth Bomber (2.500.000.000$)

            💡 Вы можете иметь только ОДИН самолёт!
            🚩Для покупки введите "Самолёт [номер]"
            `);
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:с(?:а|о)м(?:а|о)л(?:е|ё|йо|ьо)т)\s?([0-9]+)?$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            const [, houseid] = context.$match;
            if (houseid) {
                let hint = parseInt(houseid);
                if (hint > 0 && hint <= 13) {
                    switch (hint) {
                        case 1:
                            if (results[0].balance >= 10000) {
                                connection.query(`UPDATE players SET balance = balance - 10000, flying = "Параплан" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 2:
                            if (results[0].balance >= 50000) {
                                connection.query(`UPDATE players SET balance = balance - 50000, flying = "АН-2" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 3:
                            if (results[0].balance >= 100000) {
                                connection.query(`UPDATE players SET balance = balance - 100000, flying = "Cessna-172E" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 4:
                            if (results[0].balance >= 150000) {
                                connection.query(`UPDATE players SET balance = balance - 150000, flying = "Supermarine Spitfire" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 5:
                            if (results[0].balance >= 300000) {
                                connection.query(`UPDATE players SET balance = balance - 300000, flying = "BRM NG-5" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 6:
                            if (results[0].balance >= 750000) {
                                connection.query(`UPDATE players SET balance = balance - 750000, flying = "Cessna T210" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 7:
                            if (results[0].balance >= 5000000) {
                                connection.query(`UPDATE players SET balance = balance - 5000000, flying = "Beechcraft 1900D" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 8:
                            if (results[0].balance >= 30000000) {
                                connection.query(`UPDATE players SET balance = balance - 30000000, flying = "Cessna 550" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 9:
                            if (results[0].balance >= 50000000) {
                                connection.query(`UPDATE players SET balance = balance - 50000000, flying = "Hawker 4000" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 10:
                            if (results[0].balance >= 150000000) {
                                connection.query(`UPDATE players SET balance = balance - 150000000, flying = "Learjet 31" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 11:
                            if (results[0].balance >= 500000000) {
                                connection.query(`UPDATE players SET balance = balance - 500000000, flying = "Airbus A318" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 12:
                            if (results[0].balance >= 1000000000) {
                                connection.query(`UPDATE players SET balance = balance - 1000000000, flying = "F-35A" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 13:
                            if (results[0].balance >= 2500000000) {
                                connection.query(`UPDATE players SET balance = balance - 2500000000, flying = "B-2 Spirit Stealth Bomber" WHERE vkid = ${context.senderId}`);
                                context.send(`Самолёт успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                    }
                } else {
                    context.send(`[id${context.senderId}|${results[0].nickname}], Такого самолёта не существует!`);
                }
            } else {
                context.send(`[id${context.senderId}|${results[0].nickname}], Ваш самолёт: ${results[0].flying}`);
            }
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:яхта)\s?([0-9]+)?$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            const [, houseid] = context.$match;
            if (houseid) {
                let hint = parseInt(houseid);
                if (hint > 0 && hint <= 13) {
                    switch (hint) {
                        case 1:
                            if (results[0].balance >= 1000) {
                                connection.query(`UPDATE players SET balance = balance - 1000, yacht = "Ванна" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 2:
                            if (results[0].balance >= 5000) {
                                connection.query(`UPDATE players SET balance = balance - 5000, yacht = "Nauticat 331" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 3:
                            if (results[0].balance >= 10000) {
                                connection.query(`UPDATE players SET balance = balance - 10000, yacht = "Nordhavn 56 MS" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 4:
                            if (results[0].balance >= 15000) {
                                connection.query(`UPDATE players SET balance = balance - 15000, yacht = "Princess 60" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 5:
                            if (results[0].balance >= 30000) {
                                connection.query(`UPDATE players SET balance = balance - 30000, yacht = "Azimut 70" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 6:
                            if (results[0].balance >= 150000) {
                                connection.query(`UPDATE players SET balance = balance - 150000, yacht = "Dominator 40M" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 7:
                            if (results[0].balance >= 1000000) {
                                connection.query(`UPDATE players SET balance = balance - 1000000, yacht = "Moonen 124" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 8:
                            if (results[0].balance >= 15000000) {
                                connection.query(`UPDATE players SET balance = balance - 15000000, yacht = "Wider 150" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 9:
                            if (results[0].balance >= 30000000) {
                                connection.query(`UPDATE players SET balance = balance - 30000000, yacht = "Palmer Johnson 42M SuperSport" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 10:
                            if (results[0].balance >= 50000000) {
                                connection.query(`UPDATE players SET balance = balance - 50000000, yacht = "Wider 165" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 11:
                            if (results[0].balance >= 100000000) {
                                connection.query(`UPDATE players SET balance = balance - 100000000, yacht = "Eclipse" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 12:
                            if (results[0].balance >= 150000000) {
                                connection.query(`UPDATE players SET balance = balance - 150000000, yacht = "Dubai" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 13:
                            if (results[0].balance >= 300000000) {
                                connection.query(`UPDATE players SET balance = balance - 300000000, yacht = "Streets of Monaco" WHERE vkid = ${context.senderId}`);
                                context.send(`Яхта успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                    }
                } else {
                    context.send(`[id${context.senderId}|${results[0].nickname}], Такой яхты не существует!`);
                }
            } else {
                context.send(`[id${context.senderId}|${results[0].nickname}], Ваша яхта: ${results[0].yacht}`);
            }
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:передать)\s?([0-9]+)\s?([0-9]+)?$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            let [, arg0, arg1] = context.$match;
            if(arg0 && arg1)
            {
                connection.query(`SELECT * FROM players WHERE id = ${arg0}`, (err, rows) => {
                    if(err) throw err;
                    if(rows.length > 0)
                    {
                        if(results[0].id != rows[0].id)
                        {
                            if(results[0].balance >= parseInt(arg1))
                            {
                                connection.query(`UPDATE players SET balance = balance - ${arg1} WHERE vkid = ${context.senderId}`);
                                connection.query(`UPDATE players SET balance = balance + ${arg1} WHERE id = ${arg0}`);
                                context.send(`Деньги успешно переданы игроку [id${rows[0].vkid}|${rows[0].nickname}]!`);
                                vk.api.messages.send({
                                    user_id: arg0,
                                    message: `Игрок [id${context.senderId}|${results[0].nickname}] передал Вам ${arg1}$!`,
                                    sticker_id: 6170
                                });
                            } else {
                                context.send(`У Вас недостаточно денег!`);
                            }
                        } else {
                            context.send(`Вы не можете передать денег самому себе!`);
                        }
                    } else {
                        context.send(`Игрока с ID профиля ${arg0} не существует!`);
                    }
                });
            } else {
                context.send(`Используйте: Передать [id профиля] [сумма]`);
            }
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:самп|samp)\s(.*)$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            let [, arg0] = context.$match;
            //console.log(1);
            if(arg0)
            {
                if(arg0.includes(':'))
                {
                    let argum = arg0.split(':');
                    //console.log(argum);
                    samp({
                        host: argum[0],
                        port: argum[1]
                    }, (err, response) => {
                        if(err)
                        {
                            console.log(err);
                        } else {
                            context.send(`[id${context.senderId}|${results[0].nickname}], Информация о сервере SA:MP:
                            ⠀⠀⠀Название сервера: ${response.hostname}
                            ⠀⠀⠀Игровой режим: ${response.gamemode}
                            ⠀⠀⠀Онлайн: ${response.online}/${response.maxplayers}
                            ⠀⠀⠀Версия: ${response.rules.version}
                            ⠀⠀⠀Карта: ${response.mapname}`);
                        }
                    });
                } else {
                    samp({
                        host: arg0
                    }, (err, response) => {
                        if(err)
                        {
                            console.log(err);
                        } else {
                            context.send(`[id${context.senderId}|${results[0].nickname}], Информация о сервере SA:MP:
                            ⠀⠀⠀Название сервера: ${response.hostname}
                            ⠀⠀⠀Игровой режим: ${response.gamemode}
                            ⠀⠀⠀Онлайн: ${response.online}/${response.maxplayers}
                            ⠀⠀⠀Версия: ${response.rules.version}
                            ⠀⠀⠀Карта: ${response.mapname}`);
                        }
                    });
                }
            } else {
                context.send(`Используйте: Самп [ip сервера]`);
            }
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:промо|promo)\s(.*)$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            let [, arg0] = context.$match;
            //console.log(1);
            if(arg0)
            {
                connection.query(`SELECT * FROM promocodes WHERE name = '${arg0}'`, (err, rows) => {
                    if(err) throw err;
                    if(rows.length > 0)
                    {
                        if(rows[0].activations <= 0)
                        {
                            context.send(`У промокода кончились активации!`);
                        } else {
                            connection.query(`SELECT * FROM usedpromo WHERE vkid = ${context.senderId} AND name = '${arg0}'`, (errn, rowsn) => {
                                if(errn) throw errn;
                                if(rowsn.length > 0)
                                {
                                    context.send(`Вы уже активировали данный промокод!`);
                                } else {
                                    connection.query(`UPDATE promocodes SET activations = activations - 1 WHERE name = '${arg0}'`);
                                    connection.query(`INSERT INTO usedpromo (vkid, name) VALUES (${context.senderId}, '${arg0}')`);
                                    connection.query(`UPDATE players SET balance = balance + ${rows[0].balance} WHERE vkid = ${context.senderId}`);
                                    context.send(`Вы активировали промокод "${arg0}" на ${numeral(rows[0].balance).format(`0,0`)}$!`);
                                }
                            });
                        }
                    } else {
                        context.send(`Промокода не существует!`);
                    }
                })
            } else {
                context.send(`Используйте: Промо [промокод]`);
            }
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:казино)\s(.*)$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            let [, arg0] = context.$match;
            if(arg0)
            {
                arg0 = arg0.replace(/(\.|\,)/ig, '');
                arg0 = arg0.replace(/(к|k)/ig, '000');
                arg0 = arg0.replace(/(м|m|кк|kk)/ig, '000000');
                arg0 = arg0.replace(/(вабанк|вобанк|все|всё)/ig, results[0].balance);
                if(!Number(arg0)) return;
                arg0 = Math.floor(Number(arg0));
                if(arg0 <= 0) return;
                if(arg0 > results[0].balance) return context.send(`У Вас недостаточно средств!`);
                let casino_num = randomInteger(1, 3);
                switch(casino_num)
                {
                    case 1:
                        context.send(`Деньги остались при вас!`);
                        break;
                    case 2:
                        context.send(`Вы выиграли ${numeral(arg0 * 2).format(`0,0`)}$!`);
                        connection.query(`UPDATE players SET balance = balance + ${arg0 * 2} WHERE vkid = ${context.senderId}`);
                        context.sendSticker(6170);
                        break;
                    case 3:
                        context.send(`Вы проиграли ${numeral(arg0).format(`0,0`)}$!`);
                        connection.query(`UPDATE players SET balance = balance - ${arg0} WHERE vkid = ${context.senderId}`);
                        break;
                }
            } else {
                context.send(`Используйте: Казино [сумма]`);
            }
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:машина)\s?([0-9]+)?$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            const [, houseid] = context.$match;
            if (houseid) {
                let hint = parseInt(houseid);
                if (hint > 0 && hint <= 9) {
                    switch (hint) {
                        case 1:
                            if (results[0].balance >= 1000) {
                                connection.query(`UPDATE players SET balance = balance - 1000, car = "ВАЗ 2101" WHERE vkid = ${context.senderId}`);
                                context.send(`Машина успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 2:
                            if (results[0].balance >= 5000) {
                                connection.query(`UPDATE players SET balance = balance - 5000, car = "ВАЗ 2106" WHERE vkid = ${context.senderId}`);
                                context.send(`Машина успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 3:
                            if (results[0].balance >= 10000) {
                                connection.query(`UPDATE players SET balance = balance - 10000, car = "Лада Приора" WHERE vkid = ${context.senderId}`);
                                context.send(`Машина успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 4:
                            if (results[0].balance >= 15000) {
                                connection.query(`UPDATE players SET balance = balance - 15000, car = "Лада Гранта" WHERE vkid = ${context.senderId}`);
                                context.send(`Машина успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 5:
                            if (results[0].balance >= 30000) {
                                connection.query(`UPDATE players SET balance = balance - 30000, car = "Skoda Kodiaq" WHERE vkid = ${context.senderId}`);
                                context.send(`Машина успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 6:
                            if (results[0].balance >= 150000) {
                                connection.query(`UPDATE players SET balance = balance - 150000, car = "Lamborghini Aventador" WHERE vkid = ${context.senderId}`);
                                context.send(`Машина успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 7:
                            if (results[0].balance >= 1000000) {
                                connection.query(`UPDATE players SET balance = balance - 1000000, car = "Ferrari LaFerrari" WHERE vkid = ${context.senderId}`);
                                context.send(`Машина успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 8:
                            if (results[0].balance >= 15000000) {
                                connection.query(`UPDATE players SET balance = balance - 15000000, car = "MacLaren" WHERE vkid = ${context.senderId}`);
                                context.send(`Машина успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 9:
                            if (results[0].balance >= 1000000000) {
                                connection.query(`UPDATE players SET balance = balance - 1000000000, car = "Запорожец" WHERE vkid = ${context.senderId}`);
                                context.send(`Машина успешно приобретёна!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                    }
                } else {
                    context.send(`[id${context.senderId}|${results[0].nickname}], Такой машины не существует!`);
                }
            } else {
                context.send(`[id${context.senderId}|${results[0].nickname}], Ваша машина: ${results[0].car}`);
            }
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:дом)\s?([0-9]+)?$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            const [, houseid] = context.$match;
            if (houseid) {
                let hint = parseInt(houseid);
                if (hint > 0 && hint <= 9) {
                    switch (hint) {
                        case 1:
                            if (results[0].balance >= 100) {
                                connection.query(`UPDATE players SET balance = balance - 100, house = "Мусорный бак" WHERE vkid = ${context.senderId}`);
                                context.send(`Дом успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 2:
                            if (results[0].balance >= 500) {
                                connection.query(`UPDATE players SET balance = balance - 500, house = "Детская площадка" WHERE vkid = ${context.senderId}`);
                                context.send(`Дом успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 3:
                            if (results[0].balance >= 2500) {
                                connection.query(`UPDATE players SET balance = balance - 2500, house = "Сарай" WHERE vkid = ${context.senderId}`);
                                context.send(`Дом успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 4:
                            if (results[0].balance >= 5000) {
                                connection.query(`UPDATE players SET balance = balance - 5000, house = "Землянка" WHERE vkid = ${context.senderId}`);
                                context.send(`Дом успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 5:
                            if (results[0].balance >= 10000) {
                                connection.query(`UPDATE players SET balance = balance - 10000, house = "Маленький дом" WHERE vkid = ${context.senderId}`);
                                context.send(`Дом успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 6:
                            if (results[0].balance >= 50000) {
                                connection.query(`UPDATE players SET balance = balance - 50000, house = "3-ёх комнатная квартира в Москве" WHERE vkid = ${context.senderId}`);
                                context.send(`Дом успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 7:
                            if (results[0].balance >= 150000) {
                                connection.query(`UPDATE players SET balance = balance - 150000, house = "Вилла" WHERE vkid = ${context.senderId}`);
                                context.send(`Дом успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 8:
                            if (results[0].balance >= 1000000) {
                                connection.query(`UPDATE players SET balance = balance - 1000000, house = "Дворец" WHERE vkid = ${context.senderId}`);
                                context.send(`Дом успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                        case 9:
                            if (results[0].balance >= 10000000) {
                                connection.query(`UPDATE players SET balance = balance - 10000000, house = "Белый дом" WHERE vkid = ${context.senderId}`);
                                context.send(`Дом успешно приобретён!`);
                            } else {
                                context.send(`У Вас недостаточно средств!`);
                            }
                            break;
                    }
                } else {
                    context.send(`[id${context.senderId}|${results[0].nickname}], Такого дома не существует!`);
                }
            } else {
                context.send(`[id${context.senderId}|${results[0].nickname}], Ваш дом: ${results[0].house}`);
            }
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:бизнес)\s?([0-9]+)?$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            const [, bizid] = context.$match;
            if (bizid) {
                if (results[0].biz == 0) {
                    if (bizid > 0 && bizid <= 7) {
                        if (results[0].balance >= GetBizPrice(bizid)) {
                            connection.query(`UPDATE players SET balance = balance - ${GetBizPrice(parseInt(bizid))}, biz = ${parseInt(bizid)} WHERE vkid = ${context.senderId}`);
                            context.send(`Вы успешно приобрели бизнес ${GetBizName(parseInt(bizid))} за ${numeral(GetBizPrice(parseInt(bizid))).format(`0,0`)}$!`);
                        } else {
                            context.send(`У Вас недостаточно средств!`);
                        }
                    } else {
                        context.send(`Такого бизнеса не существует!`);
                    }
                } else {
                    context.send(`Сначала продайте свой бизнес через команду "Продать бизнес"`);
                }
            } else {
                context.send(`
                [id${context.senderId}|${results[0].nickname}], Ваш бизнес:
                ⠀⠀⠀Название бизнеса: ${GetBizName(results[0].biz)}
                ⠀⠀⠀Прибыль: ${numeral(GetBizPlus(results[0].biz)).format(`0,0`)}$/час
                `);
            }
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:профиль)$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            context.send(`
            [id${context.senderId}|${results[0].nickname}], Ваш профиль:
            ⠀⠀⠀ID Прoфиля: ${results[0].id}
            ⠀⠀⠀Деньги на руках: $${numeral(results[0].balance).format(`0,0`)}
            ⠀⠀⠀Деньги в банке: $${numeral(results[0].bank).format(`0,0`)}
            ⠀⠀⠀Машинa: ${results[0].car}
            ⠀⠀⠀Самoлёт: ${results[0].flying}
            ⠀⠀⠀Яхтa: ${results[0].yacht}
            ⠀⠀⠀Дом: ${results[0].house}
            ⠀⠀⠀Бизнec: ${GetBizName(results[0].biz)}
            `);
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:рассылка)\s([^]+)\s([^]+)/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            if(results[0].admin <= 0) return;
            const [, zapis, text] = context.$match;
            connection.query(`SELECT * FROM players`, (err, rows) => {
                if (err) throw err;
                if (rows.length > 0) {
                    for(let i = 0; i <= rows.length - 1; i++)
                    {
                        if(zapis != 0)
                        {
                            vk.api.messages.send(
                                {
                                    user_id: rows[i].vkid,
                                    message: text.replace(/_/g, " "),
                                    attachment: "wall-178397108_" + zapis
                                }
                            );
                        } else {
                            vk.api.messages.send({
                                user_id: rows[i].vkid,
                                message: text.replace(/_/g, " ")
                            });
                        }
                    }
                    for(let i = 0; i < 10; i++)
                    {
                        if(zapis != 0)
                        {
                            vk.api.messages.send({
                                peer_id: 2000000000 + i,
                                message: text.replace(/_/g, " "),
                                attachment: "wall-178397108_" + zapis
                            }).then(console.log("ok")).catch((err) => i = 10);
                        } else {
                            vk.api.messages.send({
                                peer_id: 2000000000 + i,
                                message: text.replace(/_/g, " ")
                            }).then(console.log("ok")).catch((err) => i = 10);
                        }
                    }
                    //context.send(`Всё четко!`);
                }
            });
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.hear(/^(?:бонус)$/i, async (context) => {
    connection.query(`SELECT * FROM players WHERE vkid = ${context.senderId}`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            if (results[0].bonusok == 0)
                context.send(`[id${context.senderId}|${results[0].nickname}], ваш бoнус будет доступен завтра в то же время что и Вы активировали бoнус`);
            else {
                let randomed = randomInteger(1, 3);
                let txt = '';
                switch (randomed) {
                    case 1:
                        txt = `[id${context.senderId}|${results[0].nickname}], вы получили 1.000.000$`;
                        connection.query(`UPDATE players SET balance = ${results[0].balance} + 1000000, bonusok = 0, bonustime = ${Math.round((new Date()).getTime() / 1000) + 86400} WHERE vkid = ${context.senderId}`);
                        break;
                    case 2:
                        txt = `[id${context.senderId}|${results[0].nickname}], вы получили 5.000.000$`;
                        connection.query(`UPDATE players SET balance = ${results[0].balance} + 5000000, bonusok = 0, bonustime = ${Math.round((new Date()).getTime() / 1000) + 86400} WHERE vkid = ${context.senderId}`);
                        break;
                    case 3:
                        txt = `[id${context.senderId}|${results[0].nickname}], вы получили 500.000$`;
                        connection.query(`UPDATE players SET balance = ${results[0].balance} + 500000, bonusok = 0, bonustime = ${Math.round((new Date()).getTime() / 1000) + 86400} WHERE vkid = ${context.senderId}`);
                        break;
                }
                context.send(txt);
                context.sendSticker(6157);
            }
        } else {
            context.send(`Вы не зарегистрированы!`);
            context.sendSticker(7209);
        }
    });
});

vk.updates.startPolling().then(() => {
    console.log("App started!");

    let job1 = schedule.scheduleJob('*/2 * * * *', () => {
        connection.query(`UPDATE players SET bonusok = 1 WHERE bonustime <= ${Math.round((new Date()).getTime() / 1000)}`);
        console.log("done bonusok");
    });
    let job2 = schedule.scheduleJob('0 * * * *', () => {
        connection.query(`UPDATE players SET balance = balance + 500 WHERE biz = 1`);
        connection.query(`UPDATE players SET balance = balance + 1500 WHERE biz = 2`);
        connection.query(`UPDATE players SET balance = balance + 5000 WHERE biz = 3`);
        connection.query(`UPDATE players SET balance = balance + 15000 WHERE biz = 4`);
        connection.query(`UPDATE players SET balance = balance + 50000 WHERE biz = 5`);
        connection.query(`UPDATE players SET balance = balance + 500000 WHERE biz = 6`);
        connection.query(`UPDATE players SET balance = balance + 5000000 WHERE biz = 7`);
        console.log("balance from biz has been gived");
    });
});

function GetBizName(bizid) {
    let naming;
    switch (bizid) {
        case 0: naming = "Нет"; break;
        case 1: naming = "Продуктовый магазин"; break;
        case 2: naming = "SA:MP Сервер"; break;
        case 3: naming = "Minecraft сервер"; break;
        case 4: naming = "Свой Youtube-канал"; break;
        case 5: naming = "Собственный клуб"; break;
        case 6: naming = "Казинo"; break;
        case 7: naming = "Букмекерская контора"; break;
    }
    return naming;
}

function GetBizPrice(bizid) {
    let naming;
    switch (bizid) {
        default: naming = 0; break;
        case 1: naming = 10000; break;
        case 2: naming = 50000; break;
        case 3: naming = 100000; break;
        case 4: naming = 250000; break;
        case 5: naming = 1000000; break;
        case 6: naming = 10000000; break;
        case 7: naming = 100000000; break;
    }
    return naming;
}

function GetBizPlus(bizid) {
    let naming;
    switch (bizid) {
        default: naming = 0; break;
        case 1: naming = 500; break;
        case 2: naming = 1500; break;
        case 3: naming = 5000; break;
        case 4: naming = 15000; break;
        case 5: naming = 50000; break;
        case 6: naming = 500000; break;
        case 7: naming = 5000000; break;
    }
    return naming;
}

vk.updates.start().catch(console.error);