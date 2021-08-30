const SlavaBot = require("./core");
const request = require("request");
const cheerio = require("cheerio");
const mathjs = require("mathjs");
const moment = require("moment");
const { MongoClient } = require("mongodb");
const mongo = MongoClient.connect("mongodb://localhost:27017/");
const db_name = "slava";
moment.locale("ru");

const admins = [489137926];

const { api } = new (require("vk-io").VK)({
    "token": "cce238d52548b21cdcf5df399cc0f54fce47130a350b73d587b8d4fe193ca4153b320761593d80f18cf1f",
    "apiMode": "parallel"
});
let bot = new SlavaBot({
    token: "cce238d52548b21cdcf5df399cc0f54fce47130a350b73d587b8d4fe193ca4153b320761593d80f18cf1f",
    db: "slava",
    group_id: 177446964
});


bot.start();

bot.addCommand(/^помощь\s?(.*)/i, (message) => {
    if (/поле/ig.test(message.$match[1])) return message.send("Для начала игры в \"Минное поле\" вы должны ввести команду \"Поле [сумма]\", после чего вводить числа от 1 до 3 \"Поле [1-3]\".\n Минное поле имеет размер 3х5 клеток, в одной из 3х клеточек находится \"Мина\", ваша задача угадать ту, в которой её нет.\n При правильном ответе вы переходите на следующие клетки, а ваша ставка умножается.")
    let cmds = bot.commands;

    if (message.$match[1]) {
        let cmd = cmds.find((x) => x.pattern.test(message.$match[1]));
        if (!cmd) return;
        return message.send(cmd.description);
    }

    message.append("%name%, мои команды:");
    message.append(cmds.filter((x) => x.type === "help").map((x) => x.description).join("\n"));
    message.append("\n🎉Развлекательные:");
    message.append(cmds.filter((x) => x.type === "fun").map((x) => x.description).join("\n"));
    message.append("🚀 Игры:");
    message.append(cmds.filter((x) => x.type === "game").map((x) => "⠀⠀" + x.description).join("\n"));
    message.append("\n🔥 Полезное:");
    message.append(cmds.filter((x) => x.type === "utils").map((x) => x.description).join("\n"));
    message.append("\n💡 Разное:");
    message.append(cmds.filter((x) => x.type === "other").map((x) => x.description).join("\n"));
    message.append("\n" + cmds.filter((x) => x.type === "report").map((x) => x.description).join("\n"));
    message.apply();
}, "help", "❓ Помощь [команда] - описание команды");

bot.addCommand(/^анекдот$/i, (message) => {
    request("https://www.anekdot.ru/random/anekdot/", (error, response, body) => {
        let $ = cheerio.load(body);
        $(".topicbox").find("br").replaceWith("\n");
        let text = $(".topicbox").last().find(".text").text();
        message.send("%name%, анекдот:\n" + text);
    });
}, "fun", "😐 Анекдот");

bot.addCommand(/^видео\s(.*)$/i, (message) => {
	let filters     = /([0-9]|\#)/ig;
	let SymFilter   = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/ig;
	if (filters.test(message.$match[1]) || SymFilter.test(message.$match[1])) return;
    api.video.search({
        "q": message.$match[1],
        "adult": 0,
        "count": 10
    }).then(({ count, items }) => {
        let smile = getRandomElement("😒 😢 😔 😩 😭 😲 😕 🙁 😟".split(" "));
        if (count < 1) return message.send(`%name%, по запросу "${message.$match[1]}" ничего не найдено ${smile}`);
        message.send(`%name%, видео по запросу "${message.$match[1]}":`, {
            "attachment": items.map((x) => `video${x.owner_id}_${x.id}`)
        });
    });
}, "fun", "📹 Видео [фраза]");
bot.addCommand(/^гиф\s(.*)$/i, (message) => {
	let filters     = /([0-9]|\#)/ig;
	let SymFilter   = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/ig;
	if (filters.test(message.$match[1]) || SymFilter.test(message.$match[1])) return;
    api.docs.search({
        "q": message.$match[1] + ".gif",
        "offset": getRandomInt(1, 990),
        "count": 10
    }).then(({ count, items }) => {
        let smile = getRandomElement("😒 😢 😔 😩 😭 😲 😕 🙁 😟".split(" "));
        if (count < 1) return message.send(`%name%, по запросу "${message.$match[1]}" ничего не найдено ${smile}`);
        message.send(`%name%, гифки по запросу "${message.$match[1]}":`, {
            "attachment": items.map((x) => `doc${x.owner_id}_${x.id}`)
        });
    });
}, "fun", "📺 Гиф [фраза]");
bot.addCommand(/^переверни\s(.*)/i, (message) => {
	let filters     = /([0-9]|\#)/ig;
	let SymFilter   = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/ig;
	if (filters.test(message.$match[1]) || SymFilter.test(message.$match[1])) return;
    message.send(`%name%, держи: "${flipString(message.$match[1])}"`);
}, "fun", "↪ Переверни [фраза]");
bot.addCommand(/^шар\s(.*)$/i, (message) => {
    let phrases = [
        "пока не ясно, попробуй снова",
        "сейчас нельзя предсказать",
        "весьма сомнительно",
        "вне всякого сомнения",
        "да",
        "определённо да",
        "спроси позже",
        "по моему - ДА",
        "хорошие перспективы",
        "никаких сомнений",
        "ни за что на свете",
        "знаки говорят да",
        "мой ответ нет",
        "предрешено",
        "нет!",
        "лучше не говорить пока",
        "сконцентрируйся и спроси опять",
        "вероятнее всего",
        "перспективы не очень хорошие",
        "можешь быть уверен в этом",
        "по моим данным нет"
    ];
    message.send("🔮 %name%, " + getRandomElement(phrases));
}, "fun", "🔮 Шар [фраза]");
bot.addCommand(/^(?:шанс|вероятность|инфа)\s(.*)$/i, (message) => {
    let phrases = [
        "мне кажется около %s%",
        "вероятность этого %s%",
        "шанс этого %s%"
    ];
    message.send(`%name%, ${getRandomElement(phrases).replace("%s", getRandomInt(100))}`);
}, "fun", "📊 Инфа [фраза]");
bot.addCommand(/^выбери\s(.*)\sили\s(.*)$/i, (message) => {
	let filters     = /([0-9]|\#|\s)/ig;
	let SymFilter   = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/ig;
	if (filters.test(message.$match[1]) || SymFilter.test(message.$match[1])) return;
    let [one, two] = shuffle([message.$match[1], message.$match[2]]);
    let phrases = [
        "100% \"%s\" намного лучше",
        "конечно \"%s\"!",
        "как по мне, \"%s\" лучше, но \"%s2\" тоже неплохо",
        "мне кажется лучше \"%s\" чем \"%s2\"",
        "я не уверен, но выберу \"%s\""
    ];
    message.send(`%name%, ${getRandomElement(phrases).replace("%s", one).replace("%s2", two)}`);
}, "fun", "⚖ Выбери [фраза] или [фраза2]");
bot.addCommand(/^дата$/i, (message) => {
    request.post({
        "url": "https://apidog.ru/api/v2/apidog.getUserDateRegistration",
        "form": {
            "userDomain": message.senderId
        }
    }, (error, response, body) => {
        let data = JSON.parse(body);
        let [date, time] = [data.response.date, data.response.time];
        message.send("%name%, ваша дата регистрации в ВК: " + date + ", " + time);
    });
}, "other", "⌚ Дата - ваша дата регистрации Вк");
bot.addCommand(/^реши\s([^"]+)$/i, (message) => {
    try {
        message.send("%name%, " + message.$match[1] + "=" + mathjs.eval(message.$match[1]));
    } catch (e) {
        // 
    }
}, "utils", "📠 Реши [пример]");
bot.addCommand(/^рулетка/i, async (message) => {
    if (message.$user.balance < 10000) return message.send("Вы не можете играть в рулетку при балансе менее 10000$ 😥");
    if (!message.$user.roulette) {
        await message.$user.set("roulette", true);
        return message.send("%name%, вы начали играть в \"Русскую рулетку\", чтобы выстрелить введите ( Выстрел ), чтобы забрать деньги введите ( Рулетка )")
    } else {
        await message.$user.inc("balance", message.$user.shot * 5000);
        message.send("%name%, вы решили остановиться на " + message.$user.shot + " выстреле и заработали " + (message.$user.shot*5000).toLocaleString() + "$");
        await message.$user.set("roulette", false);
        await message.$user.set("shot", 0);
    }
}, "game", "🔫 Рулетка - русская рулетка");
bot.addCommand(/^выстрел/i, async (message) => {
    if (!message.$user.roulette) return message.send("%name%, сначала раскрутите барабан( Рулетка )");
    if (getRandomInt(100) > 50) {
        await message.$user.inc("shot", 1);
        return message.send("%name%, вам повезло и выстрела не было!");
    } else {
        let amount = getRandomInt(1000,10000);
        await message.$user.dec("balance", amount);
        message.send("%name%, уупс, Вы выстрелили на " + message.$user.shot + " пуле 😵, лечение обошлось в " + amount.toLocaleString() + "$");
        await message.$user.set("roulette", false);
        await message.$user.set("shot", 0);
    }
}, "none", "none");
bot.addCommand(/^поле\s?([0-9]+)?/i, async (message) => {
    let smile = getRandomElement("😒 😢 😔 😩 😭 😲 😕 🙁 😟".split(" "));
    if (!message.$match[1] && !message.$user.miner) return message.send("%name%, введите \"Поле [сумма]\" чтобы сделать ставку");
    if (!message.$user.miner) {
        let amount = Number(message.$match[1]);
        if (amount > message.$user.balance) return message.send(`%name%, недостаточно средств ${smile}`);
        if (amount < 10) return message.send(`%name%, минимальная ставка 10$`);
        await message.$user.set("miner", true);
        await message.$user.dec("balance", amount);
        await message.$user.set("miner_spot", amount);
        message.send(`%name%, вы начали играть в "Минное поле".\n❕ Чтобы узнать правила введите "Помощь поле"`)
    } else if (!message.$match[1] && message.$user.miner) {
        let factor = [0, 1, 1.2, 2][message.$user.miner_step];
        message.send("%name%, вы закончили игру и получили " + Math.floor(message.$user.miner_spot * factor) + "$");
        await message.$user.set("miner", false);
        await message.$user.set("miner_spot", 0);
        await message.$user.set("miner_step", 1);
        await message.$user.inc("balance", Math.floor(message.$user.miner_spot * factor));
    } else if (/^([1-3])$/i.test(String(message.$match[1])) && message.$user.miner) {
        if (message.$user.miner_step === 5) {
            let factor = [0, 1, 1.2, 2, 2.2, 3][message.$user.miner_step];
            message.send("%name%, вы закончили игру и получили " + Math.floor(message.$user.miner_spot * factor) + "$");
            await message.$user.set("miner", false);
            await message.$user.set("miner_spot", 0);
            await message.$user.set("miner_step", 1);
            await message.$user.inc("balance", Math.floor(message.$user.miner_spot * factor));
            
            return;
        }
        if (getRandomInt(100) > 30) {
            await message.$user.inc("miner_step", 1);
            let factor = [0, 1, 1.2, 2, 2.2, 3][message.$user.miner_step + 1];
            message.send(`%name%, вы угадали!\n✅ Ваша ставка умножается на x${factor} (${Math.floor(message.$user.miner_spot * factor)}$)`)
        } else {
            await message.$user.set("miner", false);
            await message.$user.set("miner_spot", 0);
            await message.$user.set("miner_step", 1);
            message.send("%name%, вы попали на мину💥, ваша ставка аннулируется " + smile);
        }
    } else if (!/^([1-3])$/i.test(message.$match[1]) && message.$user.miner) {
        message.send("%name%, введите число от 1 до 3");
    }
}, "game", "💣 Поле [сумма/1-3]");
bot.addCommand(/^трейд\s(вверх|вниз)\s([0-9kк]+)/i, async (message) => {
    let smile = getRandomElement("😒 😢 😔 😩 😭 😲 😕 🙁 😟".split(" "));
    let direction = /вверх/i.test(message.$match[1]) ? "подорожал⤴" : "подешевел⤵";
    let looseDirection = /вверх/i.test(message.$match[1]) ? "подешевел⤵" : "подорожал⤴";
    let amount = parse(message.$match[2]);
    if (amount > message.$user.balance) return message.send("%name%, у вас недостаточно денег");
    if (amount < 50) return message.send(`%name%, сумма трейда должна быть не менее 50$ ${smile}`);
    if (getRandomInt(100) > 40) {
        let factor = getRandomInt(1,20);
        await message.$user.inc("balance", Math.floor((amount - amount / 50 * factor)));
        return message.send(`%name%, курс ${ direction } на ${getRandomInt(10,50)}$\n✅ Вы заработали +${ Math.floor((amount - amount / 100 * factor)) }$\n💰 Баланс: ${ (message.$user.balance +  Math.floor((amount - amount / 100 * factor))).toLocaleString() }$`);
    } else {
        await message.$user.dec("balance", amount);
        return message.send(`%name%, курс ${ looseDirection } на ${getRandomInt(10,50)}$\n✅ Вы потеряли -${ amount }$ ${ smile }\n💰 Баланс: ${ (message.$user.balance - amount).toLocaleString() }$`);
    }
}, "game", "📈 Трейд [вверх/вниз] [сумма]");
bot.addCommand(/^казино\s([0-9kк]+|вабанк)$/i, async (message) => {
    let smile = getRandomElement("😒 😢 😔 😩 😭 😲 😕 🙁 😟".split(" "));
    let smiles = getRandomElement("🙂 ☺ 😌 😋 😃 🙃 😨 😏 😸".split(" "));
    let amount = message.$match[1] === "вабанк" ? message.$user.balance : parse(message.$match[1]);
    if (amount < 1) return message.send("%name%, ставка должна быть минимум 1$");
	if (message.$user.balance < amount) {
        message.append("%name%, у вас недостаточно денег " + smile);
        message.append("💰 Баланс: " + message.$user.balance.toLocaleString() + "$");
        return message.apply();
    }
    let multiply = getRandomElement([0,0, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0]);
    let prize = Math.floor(amount * multiply);
    if (multiply < 1) {
		await message.$user.dec("balance", amount);
        message.append(`%name%, вы проиграли ${amount}$ ${smile}`);
        message.append("💰 Баланс: " + (message.$user.balance - amount).toLocaleString() + "$");
    } else if (multiply === 1.0) {
        message.append(`%name%, ваши деньги остаются при вас (x1) ${smiles}`);
        message.append("💰 Баланс: " + (message.$user.balance).toLocaleString() + "$");
    } else {
        await message.$user.inc("balance", prize);
        message.append(`%name%, вы выиграли ${prize}$ (x${multiply}) ${smiles}`);
        message.append("💰 Баланс: " + (message.$user.balance + prize).toLocaleString() + "$");
    }
    message.apply();
}, "game", "🎰 Казино [сумма]");
bot.addCommand(/^кубик\s([1-6])$/i, (message) => {
    let number = getRandomInt(1, 6);
    if (number === Number(message.$match[1])) {
        let prize = getRandomElement([500, 1000, 5000]);
        message.$user.inc("balance", prize);
        message.send("%name%, вы угадали! Приз " + prize + "$");
    } else {
        let smile = getRandomElement("😒 😢 😔 😩 😭 😲 😕 🙁 😟".split(" "));
        message.send("%name%, не угадали " + smile + "\n🎲 Выпало число " + number);
    }
}, "game", "🎲 Кубик [1-6]");
bot.addCommand(/^ник\s(вкл|выкл|.*)/i, (message) => {
    if (message.$match[1].toLowerCase() === "выкл") {
        message.$user.set("nick", false);
        message.send("%name%, гиперссылка отключена!");
    } else if (message.$match[1].toLowerCase() === "вкл") {
        message.$user.set("nick", true);
        message.send("%name%, гиперссылка включена!");
    } else {
        if (message.$match[1].length > 15) {
            return message.send("%name%, максимальная длина ника 15 символов");
        } else {
			let filters     = /([0-9]|\#)/ig;
			let SymFilter   = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/ig;
			if (filters.test(message.$match[1]) || SymFilter.test(message.$match[1])) return;
            message.$user.set("nickname", message.$match[1]);
            message.send(`Вы теперь "${message.$match[1]}"`);
        }
    }
}, "other", "✒ Ник [ник/вкл/выкл]");
bot.addCommand(/^бонус$/i, async (message) => {
    let coins = [50000, 25000, 10000, 5000, 1000];
    let money = [1000000, 800000, 600000, 500000, 300000, 250000];
    let rating = [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 22, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    if ((getUnix() - message.$user.bonus) < 86400) return message.send(`%name%, бонус будет доступен через ${ getTimer(message.$user.bonus, 86400, "HH:mm:ss") }`);
    if (getRandomInt(1)) {
        let amount = getRandomElement(money);
        await message.$user.inc("balance", amount);
        message.append("%name%, вы выиграли " + amount.toLocaleString() + "$!");
        message.append("💰 Баланс: " + (message.$user.balance + amount).toLocaleString() + "$");
    } else {
        let amount = getRandomElement(coins);
        await message.$user.inc("coins", amount);
        message.append("%name%, вы выиграли " + amount.toLocaleString() + "฿!");
        message.append("🌐 Биткоинов: " + (message.$user.coins + amount).toLocaleString() + "฿");
    }  {
        let amount = getRandomElement(rating);
        await message.$user.inc("rating", amount);
        message.append("\nТебе так же выпало " + amount.toLocaleString() + "рейтинга!");
        message.append("👑 Рейтинг: " + (message.$user.coins + amount).toLocaleString() + "рейтинг.");        
    }  
    await message.$user.set("bonus", getUnix());
    message.apply();
}, "other", "💎 Бонус - ежедневный бонус");
const jobs = [
    { 
        title: "Бомж",
        min: 500,
        max: 4000,
        average: 5000,
        days: 0
    },{ 
        title: "Дворник",
        min: 5000,
        max: 10000,
        average: 15000,
        days: 3
    },{ 
        title: "Продавец",
        min: 15000,
        max: 30000,
        average: 35000,
        days: 6
    },{ 
        title: "Химик",
        min: 35000,
        max: 45000,
        average: 50000,
        days: 9
    },{ 
        title: "Тренер",
        min: 50000,
        max: 65000,
        average: 70000,
        days: 12
    },{ 
        title: "Раб",
        min: 70000,
        max: 85000,
        average: 90000,
        days: 15
    },{ 
        title: "Учитель",
        min: 90000,
        max: 105000,
        average: 110000,
        days: 18
    },{ 
        title: "Строитель",
        min: 110000,
        max: 125000,
        average: 130000,
        days: 21
    },{ 
        title: "Хирург",
        min: 130000,
        max: 145000,
        average: 150000,
        days: 24
    },{                                         
        title: "Водитель президента",
        min: 150000,
        max: 170000,
        average: 180000,
        days: 27
    },{ 
        title: "Призедент",
        min: 200000,
        max: 250000,
        average: 850000,
        days: 30
    },
]
bot.addCommand(/^работать/i, async (message) => {
    if (!message.$user.job) return message.send(`%name%, вы нигде не работаете 😩\nДля трудоустройства введите "Работа"`);
    if (getUnix() - message.$user.cooldown < 3599) return message.send(`%name%, рабочая неделя закончена!\n⏳ Вы сможете работать вновь через ${ getTimer(message.$user.cooldown, 3599) }`);
    let isCooldown = String(message.$user.days).split("").last() === "5" ? true : false;
    if (isCooldown) {
        await message.$user.set("cooldown", getUnix());
        await message.$user.set("days", 0);
        return message.send(`%name%, рабочая неделя закончена!\n⏳ Вы сможете работать вновь через ${ getTimer(message.$user.cooldown, 3599) }`);
    } else {
        let job = jobs[message.$user.job - 1];
        let amount = getRandomInt(job.min, job.max);
        await message.$user.inc("days", 1);
        await message.$user.inc("balance", amount);
        return message.send(`%name%, рабочий день закончен ☺\n💵 Вы заработали ${amount.toLocaleString()}$`);
    }
});
bot.addCommand(/^работа\s?([0-9]+)?/i, async (message) => {
    if (message.$user.job) {
        let job = jobs[message.$user.job - 1];
        let text = job.title.split(" ");
        let fword = text[0];
        text.splice(0, 1);
        return message.send(`%name%, вы работаете ${fword}ом ${text.join(" ")}`);
    } else if (!message.$user.job && !message.$match[1]) {
        message.append(`%name%, доступные профессии:`);
        jobs.map((x, i) => message.append(`🔹 ${i+1}. ${x.title} - зарплата ~${x.average.toLocaleString()}$`) );
        message.append(`Для трудоустройства введите "Работа [номер]"`);
        return message.apply();
    } else if (!message.$user.job && message.$match[1]) {
        let number = Number(message.$match[1]);
        let job = jobs[number - 1];
        if (!job) return message.send(`%name%, этой работы не существует`);
        if (job.days > message.$user.days) return message.send(`%name%, у вас не хватает опыта для этой работы`);
        await message.$user.set("job", number);
        let text = job.title.split(" ");
        let fword = text[0];
        text.splice(0, 1);
        return message.send(`%name%, вы устроились работать ${fword}ом ${text.join(" ")}`);
    }
}, "game", "👔 Работа - список работ\n&#4448;&#4448;🔨 Работать");
bot.addCommand(/^уволиться/i, async (message) => {
    if (!message.$user.job) return message.send(`%name%, вы нигде не работаете 😩\nДля трудоустройства введите "Работа"`);
    await message.$user.set("job", null);
    return message.send(`%name%, вы уволились со своей работы 😟`);
}, "game", "&#4448;❌ Уволиться");

const bussines = [
    { name: "Шаурмичная",               uid: "shaurma", price: 50000,       profit: 400,        workers: 2 }, 
    { name: "Ларёк",                    uid: "larek",   price: 100000,      profit: 700,        workers: 4 }, 
    { name: "Ресторан",                 uid: "restr",   price: 300000,      profit: 2500,       workers: 6 }, 
    { name: "Магазин",                  uid: "shop",    price: 500000,      profit: 3800,       workers: 12 }, 
    { name: "Завод",                    uid: "bighome", price: 1500000,     profit: 8000,       workers: 40 }, 
    { name: "Шахта",                    uid: "mine",    price: 25000000,    profit: 70000,      workers: 45 }, 
    { name: "Офис",                     uid: "office",  price: 80000000,    profit: 220000,     workers: 75 }, 
    { name: "Разработка игр",           uid: "devgame", price: 150000000,   profit: 300000,     workers: 150 }, 
    { name: "Нефтевышка",               uid: "russia",  price: 500000000,   profit: 700000,     workers: 110 }, 
    { name: "Атомная электростанция",   uid: "atom",    price: 800000000,   profit: 1000000,    workers: 120 }, 
    { name: "Космическое агентство ",   uid: "spacex",  price: 5000000000, profit: 50000000,   workers: 330, special: true }, 
];

const cars = [
    { name: "Самокат",      uid: "autocat",         price: 500 },
    { name: "Велосипед",    uid: "velo",            price: 2500 },
    { name: "Гироскутер",   uid: "gyro",            price: 5000 },
    { name: "Сегвей",       uid: "sagway",          price: 7500 },
    { name: "Мопед",        uid: "moto_1",          price: 25000 },
    { name: "Мотоцикл",     uid: "moto_2",          price: 50000 },
    { name: "VAS-2101",     uid: "moto_2",          price: 70000 },
    { name: "Sportcar Tt",  uid: "sportcar_t",      price: 100000 },
    { name: "Mustatand Shelb", uid: "sustatand_s",  price: 150000 },
    { name: "ВАЗ 2109",     uid: "russiancar_1",    price: 200000, special: true }
];

const houses = [
    { name: "Коробка",      uid: "korobka",         price: 5000 },
    { name: "Каморка",      uid: "kamorka",         price: 15000 },
    { name: "Палатка",      uid: "polatka",         price: 23000 },
    { name: "Дисковой дом", uid: "disk_house",      price: 34000 },
    { name: "Домик на дереве", uid: "dom_dereveo",  price: 1000000 },
    { name: "Дача",         uid: "dacha_",          price: 1500000 },
    { name: "Дом у озера",  uid: "ozero_hous",      price: 2000000 },
    { name: "Кирпичный дом", uid: "kirpich_h",      price: 25000000 },
    { name: "Бумажный дом", uid: "paper_hous",      price: 160000000 },
    { name: "Коттедж",      uid: "kottedz",         price: 250000000 },
    { name: "Дом на бутылке", uid: "bytilk_do",     price: 350000000 },
    { name: "Дом на Рублевке", id: "dom_rublevka",  price: 400000000 },
    { name: "Дом Создателя", uid: "house_admin",    price: 600000000 },
    { name: "Подвал",       uid: "podval",          price: 1359000000, special: true }
];

const computers = [
    { name: "Asus E210",    uid: "asus_e210",       price: 2500 },
    { name: "HP T530",      uid: "hp_t530",         price: 6000 },
    { name: "Acer Veriton", uid: "acer_veriton",    price: 15000 },
    { name: "Dell Vostro",  uid: "dell_vostro",     price: 55000 },
    { name: "Lenovo iDea",  uid: "lenovo_idea",     price: 120000 },
    { name: "MSI Pro 20ET", uid: "msi_pro_20et",    price: 1500000 },
    { name: "HP Pavilion 570", uid: "hp_valilion_570", price: 200000 },
    { name: "MacBook Air",  uid: "macbook_air",    price: 350000 },
    { name: "iMac",         uid: "imac",           price: 550000 },
    { name: "Mac Pro",      uid: "mac_pro",        price: 1000000 },
    { name: "Asus ROG GR8", uid: "asus_rog_gr8",   price: 1350000, special: true }
];

const phones = [
    { name: "Nokia 3310",   uid: "nokia_3310",      price: 5000 },
    { name: "Samsung S2",   uid: "sams_s2",         price: 15000 },
    { name: "iPhone 4",     uid: "iphone_4_roc",    price: 15000 },
    { name: "iPhone 5s",    uid: "iphone_5s_r",     price: 45000 },
    { name: "iPhone 8",     uid: "iphone_8_da",     price: 92000 },
    { name: "Samsung S9",   uid: "samsung_s9_d",    price: 150000 },
    { name: "Meizu M5",     uid: "meizu_m5",        price: 200000 },
    { name: "Xiaomi Redmi 4A", uid: "xiaomi_redmi_4a", price: 350000 },
    { name: "Microsot Lumia 6830", uid: "microlumia_6830", price: 550000 },
    { name: "iPhone XS",    uid: "iphone_xss",        price: 1000000 },
    { name: "Xiaomi Redmi 6A", uid: "xiaomi_redmi_6a",   price: 1350000, special: true }
];

const apartments = [
    { name: "Чердак",       uid: "cherdak",         price: 5000 },
    { name: "Квартира в общежитии", uid: "kr_ob", price: 15000 },
    { name: "Однокомнатная квартира",     uid: "kr_1", price: 15000 },
    { name: "Двухкомнатная квартира",    uid: "kr_2", price: 45000 },
    { name: "Четырехкомнатная квартира", uid: "kr_4", price: 92000 },
    { name: "Пятикомнатная квартира", uid: "kr_5", price: 150000 },
    { name: "Шестикомнатная квартира", uid: "kr_6", price: 200000 },
    { name: "Квартира в центре Москвы", uid: "kr_mscoww", price: 350000 },
    { name: "Двухуровневая квартира", uid: "kr_2b", price: 550000 },
    { name: "Квартира с Евроремонтом", uid: "kr_evro", price: 1000000 },
    { name: "Квартира админа", uid: "kr_admin", price: 1350000, special: true }
];

const gameconsoles = [
    { name: "Sega Dreamcast",   uid: "sega_dream",  price: 200000 },
    { name: "Dendy Junior 2",   uid: "sams_s2",     price: 500000 },
    { name: "PlayStation 3",    uid: "playsat_",    price: 1000000 },
    { name: "Nintendo Classic Mini: SNES", uid: "nintendo_classminisnes", price: 1500000 },
    { name: "PlayStation Vita", uid: "playstat_vi", price: 2500000 },
    { name: "XBOX 360",     uid: "xbox_360",        price: 2700000 },
    { name: "XBOX ONE",     uid: "xbox_one",        price: 3000000 },
    { name: "PSP",          uid: "psp",             price: 4455000 },
    { name: "PlayStation 4", uid: "playstation_4",  price: 5550000 },
    { name: "Microsoft Xbox One X 1TB", uid: "microxbox_one_x_1tb", price: 6550000 },
    { name: "Sony PlayStation 4 Pro 1TB", uid: "sony_playstations4_pro1tb", price: 7550000, special: true }
];

const ptichkas = [
    { name: "Параплан",   uid: "paraplan",  price: 200000 },
    { name: "Cessna-172E",   uid: "cess_172e",     price: 500000 },
    { name: "Supermarine Spitfire",    uid: "superma_spl",    price: 1000000 },
    { name: "Cessna 550", uid: "cessna_550", price: 1500000 },
    { name: "Hawker 4000", uid: "hawker_4000", price: 2500000 },
    { name: "Boeing 747-430 Custom",     uid: "boegn_custom",        price: 2700000 },
    { name: " C-17A Globemaster III",     uid: "glob_c71A",        price: 3000000 },
    { name: "Airbus A318",          uid: "airbusa318",             price: 4455000 },
    { name: "F-22 Raptor", uid: "ff2rapator",  price: 5550000 },
    { name: "Airbus 380 Custom", uid: "airbus380cu", price: 6550000 },
    { name: "B-2 Spirit Stealth Bomber", uid: "b2spirit", price: 7550000, special: true }
];

const helicopters = [
    { name: "Iphone XS",    uid: "iphone_xs",       price: 100000 },
    { name: "Доска(Утюг)",  uid: "doska_ytug",      price: 350000 },
    { name: "Линейка",      uid: "lineika",         price: 700000 },
    { name: "АН-2",         uid: "АН-2",            price: 850000 },
    { name: "Геометрия",    uid: "geometry",        price: 1000000 },
    { name: "Физика",       uid: "fizika",          price: 1500000 },
    { name: "История",      uid: "history_ru",      price: 2000000 },
    { name: "Русский язык", uid: "russian_l",       price: 25000000 },
    { name: "Cessna 550",   uid: "cessna_550",      price: 160000000 },
    { name: "BRM NG-5",     uid: "BRM NG-5",        price: 250000000 },
    { name: "Learjet 31",   uid: "learjet_31",      price: 350000000 },
    { name: "Алгебра",      uid: "algebra",         price: 400000000 },
    { name: "Крокодил",     uid: "crokodile",       price: 600000000 },
    { name: "Вагон",        uid: "fly_railway",     price: 1359000000, special: true }
];

const yachts = [
    { name: "Лодка из пластика", uid: "autocat",    price: 50000 },
    { name: "Doral Intrigue", uid: "doral_intrigue", price: 350000 },
    { name: "Nauticat 331", uid: "Nauticat 331",    price: 700000 },
    { name: "Круизная яхта", uid: "yaxta_kryiz",    price: 15000000 },
    { name: "CIGARETTE 50", uid: "cigaretee_50",    price: 25000000 },
    { name: "HUSTLER MONSTER 50", uid: "hustler_monter_50", price: 55500000 },
    { name: "Lady Moura",   uid: "lady_moura",      price: 65000000 },
    { name: "Octopus",      uid: "Octopus",         price: 75000000 },
    { name: "Pelorus",      uid: "pelorus",         price: 255000000 },
    { name: "Azzam",        uid: "azzam",           price: 350000000 },
    { name: "Eclipse",      uid: "eclipse",         price: 400000000 },
    { name: "Dubai",        uid: "dubai",           price: 600000000 },
    { name: "Ванна",        uid: "russian_vanna",   price: 750000000, special: true }
];

const aircrafts = [
    { name: "Airbus-A310",  uid: "airbus_a310",    price: 50000 },
    { name: "Сеssnа-172Е",  uid: "cеssnа-172e", price: 350000 },
    { name: "Suреrmаrinе Sрitfirе", uid: "suреrmаrinе_sрitfirе",    price: 700000 },
    { name: "Сеssnа 550",   uid: "cеssnа_550",    price: 15000000 },
    { name: "Hаwkеr 4000",  uid: "hаwkеr_4000",    price: 25000000 },
    { name: "Летающий стакан", uid: "letaet_stakan", price: 55500000 },
    { name: "Пассажирский стилус",   uid: "stilus_i",      price: 65000000 },
    { name: "Bеесhсrаft 1900D", uid: "bеесhсrаft_1900d",     price: 75000000 },
    { name: "F-35А",        uid: "f-35a",           price: 255000000 },
    { name: "Bоеing 747-430 Сustоm", uid: "bоеing_747_430_custоm", price: 250000000 },
    { name: "Airbus-A319",  uid: "airbus_a319",     price: 300000000 },
    { name: "Boeing-767",   uid: "boeing_767",      price: 450000000 },
    { name: "Boeing-737",   uid: "boeing_737",      price: 500000000, special: true }
];

bot.addCommand(/^бизнесы\s?([0-9]+)?/i, async (message) => {
    if (!message.$match[1]) {
        return message.send(`%name%, бизнесы:\n` + bussines.map((x,i) => `${x.special ? "🔸" : "🔹" } ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + `\n\nДля покупки введите "Бизнесы [номер]" \n Чтобы собрать сумму: "Бизнес собрать".(Собрание денег с бизнеса, временно не работает. Айм сорре)`);
    }
    const i = (Number(message.$match[1]) - 1);
    if (!bussines[i]) return message.send(`%name%, неверный ID!`);
    if (bussines[i].price > message.$user.balance) return message.send(`%name%, у вас недостаточно денег на счету!`);
    if (message.$user.bussines.length === 2) return message.send(`%name%, вы достигли лимита бизнесов!`);
    if (message.$user.bussines.find((x) => x.id === bussines[i].uid)) return message.send(`%name%, вы уже приобрели данный бизнес!`);

    const template = {
        id: bussines[i].uid,
        profit: bussines[i].profit,
        workers: 1
    };

    await message.$user.dec("balance", bussines[i].price);
    await message.$user.push("bussines", template);
    return message.send(`%name%, вы приобрели ${ bussines[i].name } за ${ bussines[i].price.toLocaleString() }$`);
});
bot.addCommand(/^бизнес собрать/i, async (message) => {
    if (!message.$user.bussines) return message.send(`%name%, у вас нету бизнеса -.-\nЧтобы купить бизнесы напишите "бизнесы"`);
    if (getUnix() - message.$user.cooldown < 3599) return message.send(`%name%, рабочая неделя закончена!\n⏳ Вы сможете работать вновь через ${ getTimer(message.$user.cooldown, 3599) }`);
    let isCooldown = String(message.$user.days).split("").last() === "1" ? true : false;
    if (isCooldown) {
        await message.$user.set("cooldown", getUnix());
        await message.$user.set("days", 0);
        return message.send(`%name%, вы собрали деньги с бизнеса ☺\n⏳ Вы сможете забрать сумму через ${ getTimer(message.$user.cooldown, 3599) }`);
    } else {
        const i = (Number(message.$match[1]) - 1);
        let biz = bussines[message.$user.bussines - 1];
        let amount = getRandomInt(bussines[i].profit);
        await message.$user.inc("days", 1);
        await message.$user.inc("balance", amount);
        return message.send(`%name%, вы собрали деньги с бизнеса ☺\n💵 Всего получилось:  ${amount.toLocaleString()}$`);
    }
});
bot.addCommand(/^машины/i, async (message) => {
    return message.send(
        `%name%, машины:\n` + 
        cars.map((x,i) => `${x.special ? "🔹" : "🔸"} ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + 
        `\n\nДля покупки введите "Машина [номер]"`
    );
});
bot.addCommand(/^машина\s([0-9]+)/i, async (message) => {
    let i = (Number(message.$match[1]) - 1);
    if (!cars[i]) return message.send(`%name%, неверный ID!`);
    if (cars[i].price > message.$user.balance) return message.send(`%name%, у вас недостаточно денег на счету!`);
    if (cars[i].uid === message.$user.car) return message.send(`%name%, у вас уже есть ${cars[i].name}!`);
    await message.$user.dec("balance", cars[i].price);
    await message.$user.set("car", cars[i].uid);
    return message.send(`%name%, вы приобрели ${ cars[i].name } за ${ cars[i].price.toLocaleString() }$`);
});
bot.addCommand(/^компьютеры/i, async (message) => {
    return message.send(
        `%name%, компьютеры:\n` + 
        computers.map((x,i) => `${x.special ? "🔹" : "🔸"} ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + 
        `\n\nДля покупки введите "Компьютер [номер]"`
    );
});
bot.addCommand(/^компьютер\s([0-9]+)/i, async (message) => {
    let i = (Number(message.$match[1]) - 1);
    if (!computers[i]) return message.send(`%name%, неверный ID!`);
    if (computers[i].price > message.$user.balance) return message.send(`%name%, у вас недостаточно денег на счету!`);
    if (computers[i].uid === message.$user.computer) return message.send(`%name%, у вас уже есть ${computers[i].name}!`);
    await message.$user.dec("balance", computers[i].price);
    await message.$user.set("computer", computers[i].uid);
    return message.send(`%name%, вы приобрели ${ computers[i].name } за ${ computers[i].price.toLocaleString() }$`);
});
bot.addCommand(/^дома/i, async (message) => {
    return message.send(
        `%name%, дома:\n` + 
        houses.map((x,i) => `${x.special ? "🔹" : "🔸"} ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + 
        `\n\nДля покупки введите "Дом [номер]"`
    );
});
bot.addCommand(/^дом\s([0-9]+)/i, async (message) => {
    let i = (Number(message.$match[1]) - 1);
    if (!houses[i]) return message.send(`%name%, неверный ID!`);
    if (houses[i].price > message.$user.balance) return message.send(`%name%, у вас недостаточно денег на счету!`);
    if (houses[i].uid === message.$user.house) return message.send(`%name%, у вас уже есть ${houses[i].name}!`);
    await message.$user.dec("balance", houses[i].price);
    await message.$user.set("house", houses[i].uid);
    return message.send(`%name%, вы приобрели ${ houses[i].name } за ${ houses[i].price.toLocaleString() }$`);
});
bot.addCommand(/^квартиры/i, async (message) => {
    return message.send(
        `%name%, квартиры:\n` + 
        apartments.map((x,i) => `${x.special ? "🔹" : "🔸"} ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + 
        `\n\nДля покупки введите "Квартира [номер]"`
    );
});
bot.addCommand(/^квартира\s([0-9]+)/i, async (message) => {
    let i = (Number(message.$match[1]) - 1);
    if (!apartments[i]) return message.send(`%name%, неверный ID!`);
    if (apartments[i].price > message.$user.balance) return message.send(`%name%, у вас недостаточно денег на счету!`);
    if (apartments[i].uid === message.$user.apartment) return message.send(`%name%, у вас уже есть ${apartments[i].name}!`);
    await message.$user.dec("balance", apartments[i].price);
    await message.$user.set("apartment", apartments[i].uid);
    return message.send(`%name%, вы приобрели ${ apartments[i].name } за ${ apartments[i].price.toLocaleString() }$`);
});
bot.addCommand(/^самолеты/i, async (message) => {
    return message.send(
        `%name%, острова:\n` + 
        ptichkas.map((x,i) => `${x.special ? "🔹" : "🔸"} ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + 
        `\n\nДля покупки введите "Самолет [номер]"`
    );
});
bot.addCommand(/^самолет\s([0-9]+)/i, async (message) => {
    let i = (Number(message.$match[1]) - 1);
    if (!ptichkas[i]) return message.send(`%name%, неверный ID!`);
    if (ptichkas[i].price > message.$user.balance) return message.send(`%name%, у вас недостаточно денег на счету!`);
    if (ptichkas[i].uid === message.$user.ptichka) return message.send(`%name%, у вас уже есть ${ptichkas[i].name}!`);
    await message.$user.dec("balance", ptichkas[i].price);
    await message.$user.set("ptichka", ptichkas[i].uid);
    return message.send(`%name%, вы приобрели ${ ptichkas[i].name } за ${ ptichkas[i].price.toLocaleString() }$`);
});
bot.addCommand(/^телефоны/i, async (message) => {
    return message.send(
        `%name%, телефоны:\n` + 
        phones.map((x,i) => `${x.special ? "🔹" : "🔸"} ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + 
        `\n\nДля покупки введите "Телефон [номер]"`
    );
});
bot.addCommand(/^телефон\s([0-9]+)/i, async (message) => {
    let i = (Number(message.$match[1]) - 1);
    if (!phones[i]) return message.send(`%name%, неверный ID!`);
    if (phones[i].price > message.$user.balance) return message.send(`%name%, у вас недостаточно денег на счету!`);
    if (phones[i].uid === message.$user.phone) return message.send(`%name%, у вас уже есть ${phones[i].name}!`);
    await message.$user.dec("balance", phones[i].price);
    await message.$user.set("phone", phones[i].uid);
    return message.send(`%name%, вы приобрели ${ phones[i].name } за ${ phones[i].price.toLocaleString() }$`);
});
bot.addCommand(/^приставки/i, async (message) => {
    return message.send(
        `%name%, приставки:\n` + 
        gameconsoles.map((x,i) => `${x.special ? "🔹" : "🔸"} ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + 
        `\n\nДля покупки введите "Приставка [номер]"`
    );
});
bot.addCommand(/^приставка\s([0-9]+)/i, async (message) => {
    let i = (Number(message.$match[1]) - 1);
    if (!gameconsoles[i]) return message.send(`%name%, неверный ID!`);
    if (gameconsoles[i].price > message.$user.balance) return message.send(`%name%, у вас недостаточно денег на счету!`);
    if (gameconsoles[i].uid === message.$user.gameconsole) return message.send(`%name%, у вас уже есть ${gameconsoles[i].name}!`);
    await message.$user.dec("balance", gameconsoles[i].price);
    await message.$user.set("gameconsole", gameconsoles[i].uid);
    return message.send(`%name%, вы приобрели ${ gameconsoles[i].name } за ${ gameconsoles[i].price.toLocaleString() }$`);
});
bot.addCommand(/^вертолеты/i, async (message) => {
    return message.send(
        `%name%, вертолеты:\n` + 
        helicopters.map((x,i) => `${x.special ? "🔹" : "🔸"} ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + 
        `\n\nДля покупки введите "Вертолет [номер]"`
    );
});
bot.addCommand(/^вертолет\s([0-9]+)/i, async (message) => {
    let i = (Number(message.$match[1]) - 1);
    if (!helicopters[i]) return message.send(`%name%, неверный ID!`);
    if (helicopters[i].price > message.$user.balance) return message.send(`%name%, у вас недостаточно денег на счету!`);
    if (helicopters[i].uid === message.$user.helicopter) return message.send(`%name%, у вас уже есть ${helicopters[i].name}!`);
    await message.$user.dec("balance", helicopters[i].price);
    await message.$user.set("helicopter", helicopters[i].uid);
    return message.send(`%name%, вы приобрели ${ helicopters[i].name } за ${ helicopters[i].price.toLocaleString() }$`);
});
bot.addCommand(/^яхты/i, async (message) => {
    return message.send(
        `%name%, яхты:\n` + 
        yachts.map((x,i) => `${x.special ? "🔹" : "🔸"} ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + 
        `\n\nДля покупки введите "яхта [номер]"`
    );
});
bot.addCommand(/^яхта\s([0-9]+)/i, async (message) => {
    let i = (Number(message.$match[1]) - 1);
    if (!yachts[i]) return message.send(`%name%, неверный ID!`);
    if (yachts[i].price > message.$user.balance) return message.send(`%name%, у вас недостаточно денег на счету!`);
    if (yachts[i].uid === message.$user.yacht) return message.send(`%name%, у вас уже есть ${yachts[i].name}!`);
    await message.$user.dec("balance", yachts[i].price);
    await message.$user.set("yacht", yachts[i].uid);
    return message.send(`%name%, вы приобрели ${ yachts[i].name } за ${ yachts[i].price.toLocaleString() }$`);
});
bot.addCommand(/^самолеты/i, async (message) => {
    return message.send(
        `%name%, самолёты:\n` + 
        aircrafts.map((x,i) => `${x.special ? "🔹" : "🔸"} ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + 
        `\n\nДля покупки введите "самолет [номер]"`
    );
});
bot.addCommand(/^самолет\s([0-9]+)/i, async (message) => {
    let i = (Number(message.$match[1]) - 1);
    if (!aircrafts[i]) return message.send(`%name%, неверный ID!`);
    if (aircrafts[i].price > message.$user.balance) return message.send(`%name%, у вас недостаточно денег на счету!`);
    if (aircrafts[i].uid === message.$user.aircraft) return message.send(`%name%, у вас уже есть ${aircrafts[i].name}!`);
    await message.$user.dec("balance", aircrafts[i].price);
    await message.$user.set("aircraft", aircrafts[i].uid);
    return message.send(`%name%, вы приобрели ${ aircrafts[i].name } за ${ aircrafts[i].price.toLocaleString() }$`);
});
bot.addCommand(/^бизнес\sнанять\s([1-2])/i, async (message) => {
    const user = message.$user;
    if (!user.bussines.length) {
        return message.send(`%name%, у вас нету бизнесов.`);
    }
    const i = Number(message.$match[1]) - 1;
    if (!user.bussines[i]) {
        return message.send(`%name%, неверный ID!`);
    }
    const _Bussines = user.bussines[i];
    const _Target = bussines.find((x) => x.uid === user.bussines[i].id);
    const Price = user.bussines[i].profit / 2;
    if (_Target.workers === _Bussines.workers) {
        return message.send(`%name%, бизнес уже переполнен!`);
    }
    _Bussines.workers = _Target.workers;
    _Bussines.profit += _Bussines.profit / 15;
    await message.$user.pull("bussines", i);
    await message.$user.push("bussines", _Bussines);
    return message.send(`%name%, вы наняли максимальное число сотрудников!`);
});
bot.addCommand(/^бизнес\sулучшить\s([1-2])/i, async (message) => {
    const user = message.$user;
    message.append('ага, счас улучшишь. это просто не доступно, ок-да :D')
});
bot.addCommand(/^бизнес/i, async (message) => {
    const user = message.$user;
    if (!user.bussines.length) {
        return message.send(`%name%, у вас нету бизнесов.`);
    }
    return message.send(
        `%name%, статистика твоих бизнесов:\n` +
        user.bussines.map((biz) => `"${(bussines.find((x) => x.uid === biz.id)).name}":\n💸 Прибыль: ${biz.profit.toLocaleString()}$/час\n💼 Рабочих: ${biz.workers} / ${(bussines.find((x) => x.uid === biz.id)).workers}\n`) +
        `\nДля найма сотрудников введите "Бизнес нанять [номер]"`
    );
}, "game", "💼 Бизнесы:\n&#4448;&#4448;📈 Бизнес - статистика\n&#4448;&#4448;👷 Бизнес нанять [1-2]");
bot.addCommand(/^магазин/i, async (message) => {
    let categorys = { auto: ["🚗 » Машины","🚁 » Вертолеты","🛥 » Яхты", "🛩 » Самолеты"], nadoblyat: ["🏠 » Дома","🌇 » Квартиры"], texnic: ["📱 » Телефоны", "🎮 » Приставки", "🖥 » Компьютеры"], misc: ["⭐ » Фермы(временно отключены)", "💼 » Бизнесы"] };
    return message.send(
        `%name%, разделы магазина:\n` +
        `🚙 Транспорт:\n` +
        categorys.auto.map(x => `⠀${x}`).join("\n") + 
        `\n\n🌆 Недвижимость:\n` +
        categorys.nadoblyat.map(x => `⠀${x}`).join("\n") +        
        `\n\n💻 Техника:\n` +
        categorys.texnic.map(x => `⠀${x}`).join("\n") +         
        `\n\n📌 Остальное:\n` +
        categorys.misc.map(x => `⠀${x}`).join("\n")
    );
}, "other", "🛍 Магазин");
bot.addCommand(/^баланс$/i, (message) => {
    let [balance, coins] = [message.$user.balance, message.$user.coins];
    message.send(`%name%, на руках: ${balance.toLocaleString()}$\n🌐 Биткоинов: ${coins.toLocaleString()}฿`);
}, "other", "💲 Баланс");
bot.addCommand(/^профиль$/i, async (message) => {
    message.append("%name%, твой профиль:");
    message.append("🔎 ID: " + message.$user.uid);
    message.append("💰 Денег: " + message.$user.balance.toLocaleString() + "$");
    message.append("🌐 Биткоинов: " + message.$user.coins.toLocaleString() + "฿");
    message.append("👑 Рейтинг: " + message.$user.rating.toLocaleString() + "👑");
    if (message.$user.marry) {
        let user = await bot.users.getById(message.$user.marry, true);
        if (user.marry === message.$user.uid) {
            message.append(`💞 В браке: ${user.name}`);
        }
    }
    if (message.$user.job) {
        message.append("👔 Работа: " + jobs[message.$user.job - 1].title);
    }
    message.append("🏡 Имущество: ");
    if (message.$user.house) {
        message.append("&#4448;🏠 Дом: " + (houses.find((x) => x.uid === message.$user.house)).name);
    }       
    if (message.$user.apartment) {
        message.append("&#4448;🌇 Квартира: " + (apartments.find((x) => x.uid === message.$user.apartment)).name);
    }    
    if (message.$user.car) {
        message.append("&#4448;🚗 Машина: " + (cars.find((x) => x.uid === message.$user.car)).name);
    }
    if (message.$user.helicopter) {
        message.append("&#4448;🚁 Вертолёт: " + (helicopters.find((x) => x.uid === message.$user.helicopter)).name);
    }
    if (message.$user.ptichka) {
        message.append("&#4448;🚁 Вертолёт: " + (ptichkas.find((x) => x.uid === message.$user.ptichka)).name);
    }    
    if (message.$user.yacht) {
        message.append("&#4448;🛥 Яхта: " + (yachts.find((x) => x.uid === message.$user.yacht)).name);
    }
    if (message.$user.computer) {
        message.append("&#4448;💻 Компьютер: " + (computers.find((x) => x.uid === message.$user.computer)).name);
    } 
     if (message.$user.phone) {
        message.append("&#4448;📱 Телефон: " + (phones.find((x) => x.uid === message.$user.phone)).name);
    }     
    if (message.$user.gameconsole) {
        message.append("&#4448;🎮 Приставка: " + (gameconsoles.find((x) => x.uid === message.$user.gameconsole)).name);
    }        
    message.append("");
    message.append("📗 Дата регистрации: " + moment(message.$user.register).format("DD.MM.YYYY, HH:mm:ss"));
    message.apply();
}, "other", "📒 Профиль");
bot.addCommand(/^топ/i, async (message) => {
    mongo.then(($) => {
        $.db(db_name).collection("users").find({}).toArray((err, docs) => {
            let users = docs.filter((x) => !x.ignore && !x.creator && !x.admin && x.balance < 10^30).sort((a,b) => b.balance - a.balance).slice(0, 10);
            message.append(`%name%, топ-${users.length} по балансу:`);
            users.map((x, i) => message.append(`${i+1}. 💰 @id${x.id} (${(x.nickname || x.first_name).replace(/\✓|\✪/g, "")}) -- ${formatNumber(x.balance)} $`));
            return message.apply();
        });
    })
}, "other", "🏆 Топ");
bot.addCommand(/^банк\s?([0-9kк]+|снять)?\s?([0-9]+)?/i, async (message) => {
    if (!message.$match[1] && message.$user.bank === 0) return message.send(`%name%, ваш банковский счёт пуст`);
    if (!message.$match[1] && message.$user.bank !== 0) return message.send(`%name%, на вашем банковском счёте находится ${message.$user.bank}$`)
    if (message.$match[1].toLowerCase() === "снять" && message.$match[2]) {
        let amount = parse(message.$match[2]);
        if (amount > message.$user.bank) return message.send(`%name%, на вашем банковском счёте недостаточно средств`);
        await message.$user.inc("balance", amount);
        await message.$user.dec("bank", amount);
        return message.send(`%name%, вы сняли ${amount.toLocaleString()}\n💳 Остаток на счёте: ${message.$user.bank - amount}$\n💰 Ваш баланс: ${message.$user.balance}$`);
    } else if (message.$match[1] && message.$match[1].toLowerCase() !== "снять") {
        let amount = Number(message.$match[1]);
        if (amount < 50) return message.send(`%name%, минимальная сумма вклада 50$`);
        if (amount > message.$user.balance) return message.send(`%name%, у вас нет данной суммы 😩`);
        await message.$user.inc("bank", amount);
        await message.$user.dec("balance", amount);
        return message.send(`%name%, вы положили на свой банковский счёт ${amount}$`);
    }
}, "other", "💰 Банк [сумма/снять сумма]");
bot.addCommand(/^передать\s([0-9]+)\s([0-9кk]+)/i, async (message) => {
    let smile = getRandomElement("😒 😢 😔 😩 😭 😲 😕 🙁 😟".split(" "));
    let user = await bot.users.isUser(Number(message.$match[1]), true);
    let amount = parse(message.$match[2]);
    if (!user) return message.send(`%name%, неверный ID игрока ${smile}`);
    if (user.id === message.$user.id) return message.send(`%name%, неверный ID ${smile}`);
    if (amount > message.$user.balance) return message.send(`%name%, недостаточно денег ${smile}\n 💰 Баланс: ${message.$user.balance.toLocaleString()}$`);
    await message.$user.dec("balance", amount);
    await user.inc("balance", amount);
    return message.send(`%name%, вы передали игроку ${user.name} ${amount.toLocaleString()}`);
}, "other", "🤝 Передать [id] [сумма]"


);
bot.addCommand(/^брак\s([0-9]+)/i, async (message) => {
    let smile = getRandomElement("😒 😢 😔 😩 😭 😲 😕 🙁 😟".split(" "));
    let smiles = getRandomElement("😻 💋 💘 💞 💝 💗 💓 💕 😍".split(" "));
    let user = await bot.users.isUser(Number(message.$match[1]), true);
    if (message.$user.marry) return message.send(`%name%, вы уже находитесь в браке ${smile}`);
    if (!user) return message.send(`%name%, неверный ID${smile}`);
    if (user.id === message.$user.id) return message.send(`%name%, вы не можете жениться/выйти замуж за себя ${smile}`);
    await bot.api.messages.send({ peer_id: user.id, message: `[УВЕДОМЛЕНИЕ]\n▶ Игрок @id${message.$user.id} (${message.$user.name}) сделал вам предложение руки и сердца! ${smiles}` })
    await message.$user.set("marry", user.uid);
    return message.send(`%name%, вы сделали предложение руки и сердца игроку "${user.name} ${smiles}"`);
}, "other", "💞 Брак [id] - сделать предложение");
bot.addCommand(/^браки\s?([0-9]+)?/i, async (message) => 

{
    if (message.$user.marry) return message.send(`%name%, вы уже состоите в браке`);
    mongo.then(async ($) => {
        $.db(db_name).collection("users").find({ marry: message.$user.uid }).toArray(async (err, docs) => {
            if (!message.$match[1]) {
                if (err) return;
                if (docs.length === 0) return message.send(`%name%, вам никто не сделал предложение`);
                message.append("%name%, предложения для вас:");
                docs.map((item, index) => message.append(`&#4448; ${index+1}. Предложение от ${item.nickname || item.first_name}`));
                message.append("Чтобы принять введите \"Браки [номер]\"");
                return message.apply();
            } else {
                let number = Number(message.$match[1]) - 1;
                if (!docs[number]) return;
                await message.$user.set("marry", docs[number].uid);
                return message.send(`%name%, вы заключили брак с ${docs[number].nickname || docs[number].first_name}`);
            }
        });
    });
}, "other", "&#4448; Браки - список предложений");
bot.addCommand(/^биток/i, async (message) => {
	let amount = message.$user.coins * 5000;
	await message.$user.set("coins", 0);
	await message.$user.inc("balance", amount);
	return message.send(`%name%, вы обменяли свои биткоины на ${amount.toLocaleString()}$`);
}, "other", "🌐 Биток");
bot.addCommand(/^развод/i, async (message) => {
    if (!message.$user.marry) return message.send(`%name%, вы не состоите в браке`);
    let user = await bot.users.getById(message.$user.marry, true);
    await message.$user.set("marry", null);
    await user.set("marry", null);
    return message.send(`%name%, вы теперь свободный человек`);
}, "other", "💔 Развод");


bot.addCommand(/^eval\s([^]+)/i, (message) => {
    if (message.senderId !== 489137926) return;
    return message.send(eval(message.$match[1]).toString());
})

bot.addCommand(/^дроп$/i, (message) => {
    return;
    bot.drop();
});

//bot.addCommand(/^дайденяк/i, message => message.$user.inc("balance", 500000))
bot.addCommand(/^рассылка\s(.*)/i, async (message) => {
	if (!user.isAdmin) return;
	let stream = bot.collect.messages.getConversations();
    let post = await bot.resolveResource(message.$match[1]);
    stream.on("data", async ({ items }) => {
		items.map(async (item) => {
			await bot.api.messages.send({
                peer_id: item.conversation.peer.id,
                message: `📢 Рассылочка`,
                attachment: `${post.type}${post.owner}_${post.id}`
            })
        });
		
        await message.send(`Dialogs sended!\nNext step - chats..`);

        for (let i = 1; i < 1000; i++) {
            try {
                await bot.api.messages.send({
                    peer_id: 2000000000 + i,
                    message: "📢 Рассылочка",
                    attachment: `${post.type}${post.owner}_${post.id}`
                })
            } catch (err) { 1 }
        }
		
        await message.send(`Sended..`);
	});
});

bot.addCommand(/^накрути\s([0-9kк]+)/i, async (message) => {
    if (!user.isAdmin) return;
	await message.$user.inc("balance", parse(message.$match[1]));
	return message.send(`Готово`);
});

bot.addCommand(/^бан\s([0-9]+)/i, async (message) => {
    let user = message.$user;
   if (!user.isAdmin) return;
    let target = await bot.users.getById(message.$match[1]);
    if (target.isAdmin && !user.isBoss) return message.send(`Вы не можете заблокировать этого пользователя`);
    await target.set("ignore", true);
    return message.send(`@id${target.id} был успешно заблокирован!`);
});

bot.addCommand(/^анбан\s([0-9]+)/i, async (message) => {
    let user = message.$user;
  if (!user.isAdmin) return;
    let target = await bot.users.getById(message.$match[1]);
    await target.set("ignore", false);
    return message.send(`@id${target.id} был успешно разблокирован!`);
});

bot.addCommand(/^надмин\s([0-9]+)/i, async (message) => {
    if (!user.isAdmin) return;
    let target = await bot.users.getById(message.$match[1]);
    await target.set("admin", true);
    return message.send(`@id${target.id} был успешно назначен админом.`);
});

bot.addCommand(/^курс$/i, (message) => {
    request({
        "method": "GET", 
        "rejectUnauthorized": false, 
        "url": "https://currate.ru/api/?get=rates&pairs=USDRUB,EURRUB,BTCRUB,BTCUSD&key=1ca2229c50dcda30ed078373447135ee",
        "headers": {
            "Content-Type": "application/json"
        }
    }, (error, response, body) => {
        let { data } = JSON.parse(body);
        let [USD, EUR, BTCRUB, BTCUSD] = [
            Number(data.USDRUB).toFixed(2),
            Number(data.EURRUB).toFixed(2),
            Number(data.BTCRUB).toFixed(2),
            Number(data.BTCUSD).toFixed(2)
        ];
        message.append("%name%, курс валют на данный момент:");
        message.append(`💵Доллар США: ${USD}₽`);
        message.append(`💶Евро: ${EUR}₽`);
        message.append(`💸Биткоин: ${BTCUSD}$ или ${BTCRUB}₽`);
        message.apply();
    });
}, "utils", "📊 Курс");
bot.addCommand(/^репорт\s(.*)$/i, (message) => {
    message.send("%name%, ваше сообщение отправлено.\n\nВам может помочь: Администрация не выдает валюту/бизнес/фермы/права администратора");
    admins.map((user_id) => {
        message.reply("🆘 Репорт от *id" + message.senderId, {
            user_id
        });
    });
}, "report", "🆘 Репорт [фраза] - ошибки или пожелания");

setInterval(() => {
    mongo.then(($) => {
        $.db(db_name).collection("users").find({}).toArray(async (err, docs) => {
            for (let i = 0; i < docs.length; i++) {
                if (!docs[i].bussines.length) {
                    let doc = docs[i];
                    for (let j = 0; j < doc.bussines.length; j++) {
                        if (getUnix() - doc.bussines[j].time >= 3600) {
                            let user = await bot.users.getById(doc.id);
                            let _biz = doc.bussines[j];
                            _biz.time = getUnix();
                            await user.pull("bussines", j);
                            await user.inc("balance", _biz.profit);
                            await user.push("bussines", _biz);
                            console.log(`Pay #${user.id}`);
                        }
                    }
                }
            }
        });
    });
}, 10000);

function getTimer(unixtime, step, format = "mm:ss") {
    return moment.utc((moment((unixtime+step) * 1000).diff(moment((getUnix())*1000)))).format(format);
}

function formatNumber(count) {
    let i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000)); 
    let result = parseFloat((count / Math.pow(1000, i)).toFixed(2)); 
    if (i >= 17) return "Дохуя";
    result += " " + ["", "тыс", "млн", "млрд", "трлн", "кврлн", "квинтл", "скстлн", "сптлн", "октлн", "нонлн", "дцлн", "ундцлн", "додцлн", "трдцлн", "квтуордцлн", "квндцлн"][i];
    return result; 
}

function getUnix() { return Math.floor(Date.now() / 1000); }
function getRandomInt(x, y) {
    return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
}
 
function getRandomElement(array) {
    return array[getRandomInt(array.length - 1)];
}
function shuffle(array) {
    return array.sort(() => .5 - Math.random());
}
function parse(str) { 
	return parseInt(str.replace(/(k|к)/ig, "000"));
}
function flipString(string) {
    let result = "";
    string = string.toLowerCase().split("").reverse();
    string.map((symbol) => {
        result += flipTable[symbol] || symbol;
    });
    return result;
}
Array.prototype.last = function() {
	return this[this.length - 1];
}
const flipTable = {
    "a": "\u0250",
    "b": "q",
    "c": "\u0254",
    "d": "p",
    "e": "\u01DD",
    "f": "\u025F",
    "g": "\u0183",
    "h": "\u0265",
    "i": "\u0131",
    "j": "\u027E",
    "k": "\u029E",
    "m": "\u026F",
    "n": "u",
    "r": "\u0279",
    "t": "\u0287",
    "v": "\u028C",
    "w": "\u028D",
    "y": "\u028E",
    ".": "\u02D9",
    "[": "]",
    "(": ")",
    "{": "}",
    "?": "\u00BF",
    "!": "\u00A1",
    "\"": ",",
    "<": ">",
    "_": "\u203E",
    "\u203F": "\u2040",
    "\u2045": "\u2046",
    "\u2234": "\u2235",
    "\r": "\n",
    "а": "ɐ",
    "б": "ƍ",
    "в": "ʚ",
    "г": "ɹ",
    "д": "ɓ",
    "е": "ǝ",
    "ё": "ǝ",
    "ж": "ж",
    "з": "ε",
    "и": "и",
    "й": "ņ",
    "к": "ʞ",
    "л": "v",
    "м": "w",
    "н": "н",
    "о": "о",
    "п": "u",
    "р": "d",
    "с": "ɔ",
    "т": "ɯ",
    "у": "ʎ",
    "ф": "ф",
    "х": "х",
    "ц": "ǹ",
    "ч": "Һ",
    "ш": "m",
    "щ": "m",
    "ъ": "q",
    "ы": "ıq",
    "ь": "q",
    "э": "є",
    "ю": "oı",
    "я": "ʁ"
};