process.env.TZ = "Europe/Kaliningrad";
//----------------------------------------------------------\\
const { VK, Keyboard } = require('vk-io');
const keyboard = Keyboard;
const vk = new VK();
const { MessageContext } = require('vk-io');
const { updates, snippets } = vk;
const requests = require('request')
const rq = require('prequest')
let updated = Date.now();
const path = require('path')
const fs = require("fs");
const siteShot = require('screenshot-site')
const { atan2, chain, derivative, e, evaluate, pi, pow, round, sqrt } = require('mathjs')
var Qiwi = require('node-qiwi-api').Qiwi;
var Wallet = new Qiwi('def452dc79f5e569d62519061b8a13b9'); //908dc5f6c82bbd5ba0065c55dea361dc - Давидский //5ff8bf4082d8722053509f27ad859e1a
//const request = require('prequest');
const { SceneManager, StepScene } = require('@vk-io/scenes')
const { SessionManager } = require('@vk-io/session')
const sessionManager = new SessionManager();
const sceneManager = new SceneManager();

let user = new VK();
user.setOptions({
    token: 'f2962dc40d7910bba27679717ad727f6e59e2d733a4d03a6dbbba56fc1a7759bfee56700ab7bc1d873f23'
});
////////////////////////////
vk.setOptions({
    token: '9a8886d725633da50a89f2c881b76280c70efa8239dbc8c7f9ed04a98f4c8ffe837fa243111f538907846',
    apiMode: 'parallel',
    pollingGroupId: 181383219 
});
const mentionRegexp = new RegExp(`\\[club181383219\\|(.*)\\]`);
//----------------------------------\\
const users = require("./db/users.json");
const clans = require("./db/clans.json");
const chats = require("./db/chats.json");
const chat = require("./chat.json");
const log = require("./db/log.json");
const cht = require("./cht.json");
const child = require('child_process');
const desk = require("./opt/desk.json")
const { works } = require("./works.js");
const donat = require("./db/donat.json")
const https = require('https');
const tcpp = require('tcp-ping');
const uid = require("./db/uid.json");
const promocode = require('./db/promocode.json');
const ferm = require("./db/ferm.json");
const config = require("./opt/config.json");
//------------------------------------\\
async function save() {
    fs.writeFileSync("./db/users.json", JSON.stringify(users, null, "\t"))
    fs.writeFileSync("./db/clans.json", JSON.stringify(clans, null, "\t"))
    fs.writeFileSync("./db/chats.json", JSON.stringify(chats, null, "\t"))
    fs.writeFileSync("./chat.json", JSON.stringify(chat, null, "\t"))    
    fs.writeFileSync("./db/log.json", JSON.stringify(log, null, "\t"));
    fs.writeFileSync("./cht.json", JSON.stringify(cht, null, "\t"))
    fs.writeFileSync("./db/sap.json", JSON.stringify(sap, null, "\t"))
    fs.writeFileSync("./db/donat.json", JSON.stringify(donat, null, "\t"))
    fs.writeFileSync("./opt/config.json", JSON.stringify(config, null, "\t"))
    fs.writeFileSync("./db/uid.json", JSON.stringify(uid, null, "\t"))
    fs.writeFileSync("./db/ferm.json", JSON.stringify(ferm, null, "\t"));
    fs.writeFileSync("./db/promocode.json", JSON.stringify(promocode, null, "\t"));    
    fs.writeFileSync("./opt/desk.json", JSON.stringify(desk, null, "\t"));
}
//------------------------------------\\
var grg = [0, 'Контейнер ', 'Деревянный гараж', 'Во дворе', 'Ангар', 'Автостоянка', 'В белом доме Путина'];
var pt = [0, 'Улитка', 'Кит', 'Овца', 'Курица', 'Коала', 'Оса', 'Свинья', 'Слон', 'Мартышка', 'Пингвин', 'Тигр', 'Волк', 'Заяц', 'Корова', 'Совёнок'];
var cars = [0, 'Mercedes S-Class', 'Volkswagen Phaeton', 'Lexus LS 430', 'Skoda Rapid', 'Audi A8', 'Range Rover', 'BMW X6', 'Porsche Cayenne', 'BMW 7 Series', 'Lexus LX'];
var yah = [0, 'Ванна', 'Nauticat 331', 'Nordhavn 56 MS', 'Princess 60', 'Dominator 40M', 'Moonen 124', 'Wider 150', 'Porsche Cayenne', 'Palmer Johnson 42M SuperSport', 'Wider 165'];
var kv = [0, 'Чердак', 'Квартира в общежитии', 'Однокомнатная квартира', 'Двухкомнатная квартира', 'Четырехкомнатная квартира', 'Квартира в центре Москвы', 'Двухуровневая квартира', 'Квартира с Евроремонтом'];
var ph = [0, 'Nokia 108', 'Nokia 3310 (2017)', 'ASUS ZenFone 4', 'BQ Aquaris X', 'Sony Xperia XA', 'Samsung Galaxy S8', 'Xiaomi Mi Mix', 'Torex FS1', 'iPhone X', 'Мегафон С1'];
var air = [0, 'Параплан ', 'АН-2', 'Cessna-172E', 'Supermarine Spitfire', 'BRM NG-5', 'Cessna T210'];
var farms = [0, 'Weak','Average','Powerful']
    //------------------------------------\\
const reg = ["Помощь"];
const razvl = ["Анекдот", "Мем", "Сохра", "Вернуть клавиатуру"];
const help = ["Аккаунт", "Игры", "Развлечения", "Clan help", "Правила", "Инфо", "Вернуть клавиатуру"];
const acc = ["Профиль", "Баланс", "Банк", "Дата", "Курс", "Топ", "Бонус", "Вернуть клавиатуру"];
const casino = ["Казино 1к", "Казино 5к", "Казино 10к", "Казино 50к", "Казино 100к", "Казино 500к", "Казино 1кк", "Казино 5кк", "Казино 10кк", "Казино 50кк", "Вернуть клавиатуру"];
const asino = ["Азино 1к", "Азино 5к", "Азино 10к", "Азино 50к", "Азино 100к", "Азино 500к", "Азино 1кк", "Азино 5кк", "Азино 10кк", "Азино 50кк", "Вернуть клавиатуру"];
const kosti = ["Кости 1к", "Кости 5к", "Кости 10к", "Кости 50к", "Кости 100к", "Кости 500к", "Кости 1кк", "Кости 5кк", "Кости 10кк", "Кости 50кк", "Вернуть клавиатуру"];
const dev =  [ "Setbalance 1 1000000000000000", "SetRating 1 10000000000", "Созвать всех", "StatChat", "Stata", "Offtops", "RL", "Вернуть клаву", "qbal"];
const game = ["Казино 1к", "Азино 1к", "Кости 1к", "Сейф"]
const safe = ["Взлом 0000", "Взлом 1111", "Взлом 2222","Взлом 3333","Взлом 4444","Взлом 5555","Взлом 6666","Взлом 7777","Взлом 8888","Взлом 9999","Вернуть Клавиатуру"]
//------------------------------------\\
const zag = [
{id: 1, zagadka: "Без ног и без рук,\nА художник еще тот.", otvet: "звёздное небо"},
{id: 2, zagadka: "Красный колобок,\nГолубой платок.\nПо платку катается,\nЛюдям улыбается.", otvet: "солнце и небо"},
{id: 3, zagadka: "Поднять его легко, но сложно бросить далеко.", otvet: "пух"},
{id: 4, zagadka: "Каких камней в море не сыщешь?", otvet: "сухих"},
{id: 5, zagadka: "Во Франции это на втором месте, а в России на первом. Что это?", otvet: "буква Р"},
{id: 6, zagadka: "На столе стояла жестяная банка с крышкой. Она на 2/3 свисала со стола. Через некоторое время банка упала. Чтобы в ней было?", otvet: "лёд"},
{id: 7, zagadka: "У отца Кристи есть пять дочерей: Чочо, Чичи, Чече, Чача. Как зовут пятую дочку?", otvet: "Кристи"},
{id: 8, zagadka: "Что можно увидеть у женщины, если она поднимет ногу? На «П» начинается, На «А» заканчивается?", otvet: "пятка"},
{id: 9, zagadka: "У еврея на уме, у женщин – на теле, применяется на шахматной доске и в хоккее? ", otvet: "комбинация"},
{id: 10, zagadka: "Лететь – не долететь\nБежать – не добежать", otvet: "горизонт"},
{id: 11, zagadka: "Синяя шубка\nВесь мир покрыла", otvet: "небо"},
{id: 12, zagadka: "Лезет в окошко белая кошка", otvet: "лучи солнца"},
{id: 13, zagadka: "Седые кабаны все поле облегли", otvet: "туман"},
{id: 14, zagadka: "Без ног и без рук,\nА ворота открывает", otvet: "ветер"},
{id: 15, zagadka: "Выглянул в окошко,\nИдет там длинненький Антошка", otvet: "дождь"},
{id: 16, zagadka: "Через реку повисло\nАлое коромысло", otvet: "радуга"},
{id: 17, zagadka: "В воде не утонет,\nВ огне не сгорит", otvet: "лёд"},
{id: 18, zagadka: "Не земля, не море,\nКорабли здесь не плавают\nИ ходить нельзя", otvet: "болото"},
{id: 19, zagadka: "В воду упало 2 гвоздя. Как фамилия грузина", otvet: "Заржавели"},
{id: 20, zagadka: "Чем заканчивается ночь и день?", otvet: "мягким знаком"},
{id: 21, zagadka: "Кто умеет говорить на любом языке?", otvet: "эхо"},
{id: 22, zagadka: "Скажите что это такое: с усами, большой, синий, везет зайцев?", otvet: "троллейбус"},
{id: 23, zagadka: "Серенький, маленький, похож на слона.", otvet: "слонёнок"},
{id: 24, zagadka: "Стоит бабка на полу, приоткрыв свою дыру", otvet: "печка"},
{id: 25, zagadka: "Само твердое, а в мягкое вставляются. Рядом только шарики болтаются…", otvet: "серьги"},
{id: 26, zagadka: "Эта женщина сначала потрется об тебя, а потом еще и денег потребует… ", otvet: "кондуктор"},
{id: 27, zagadka: "С виду — клин, а развернешь — блин", otvet: "зонт"},
{id: 28, zagadka: "Пять чуланов, одна дверь.", otvet: "перчатки"},
{id: 29, zagadka: "У фермера было стадо из восьми овец: три белые, четыре черные, одна коричневая.\nСколько овец могут ответить, что в стаде есть хотя бы одна овца такой же масти, как её?", otvet: "овцы не разговаривают"},
{id: 30, zagadka: "Языка нет, а правду скажет", otvet: "зеркало"},
{id: 31, zagadka: "Ни огня, ни жару не имею, а все поджигаю.", otvet: "молния"},
{id: 32, zagadka: "Сами — верхом, а ноги — за ушами.", otvet: "очки"},
{id: 33, zagadka: "Какой знак поставить между цифрами 5 и 4 , чтобы ответ был меньше 5, но больше 4?", otvet: "запятую"},
{id: 34, zagadka: "Без чего не может жить человек?", otvet: "без имени"},
{id: 35, zagadka: "Не птица, а летает", otvet: "летучая мышь"},
{id: 36, zagadka: "Что в руках не удержать?", otvet: "вода"},
{id: 37, zagadka: "В лесу она не водится,\nВ реке она одна,\nВ сарай не помещается,\nА в кошельке их 2!", otvet: "буква К"},
{id: 38, zagadka: "Горя не знает, а слезы проливает", otvet: "туча"},
{id: 39, zagadka: "Идешь, идешь, а конца не найдешь.", otvet: "земной шар"},
{id: 40, zagadka: "Чему на свете нет:\nни меры, ни веса, ни цены?", otvet: "огонь"},
{id: 41, zagadka: "Какое слово дополнит следующий набор слов: Пляс, Река, Тмин, Сила, Удод, Фаза?", otvet: "соль"},
{id: 42, zagadka: "Несла бабка на базар сто яиц, а дно упало сколько яиц осталось в корзине.", otvet: "ни одного"},
{id: 43, zagadka: "Москва - 100, Ярославль - 1000, Архангельск - 500. О чём речь?", otvet: "рубли"},
{id: 44, zagadka: "Стоит дуб,\nВ нем двенадцать гнезд,\nВ каждом гнезде\nПо четыре яйца,\nВ каждом яйце\nПо семи цыпленков.", otvet: "год"},
{id: 45, zagadka: "етели утки: одна впереди и две позади, \nОдна позади и две впереди, \nОдна между двумя. \nСколько их было всего?", otvet: "три"},
{id: 46, zagadka: "Шли муж с женой, брат с сестрой да муж с шурином. Сколько всего человек?", otvet: "три"}
]

const businesses = [[
{name: 'Хлебная лавка', cost: 50000, earn: 200, workers: 1, id: 1, icon: '🥖'},
{name: '5 Хлебных лавок', cost: 350000, earn: 1000, workers: 10, id: 1, icon: '🥖'},
{name: 'Небольшая сеть Хлебных Лавок', cost: 900000, earn: 2625, workers: 30, id: 1, icon: '🥖'},
{name: 'Средняя сеть Хлебных Лавок', cost: 1200000, earn: 3750, workers: 50, id: 1, icon: '🥖'},
{name: 'Лучшая Хлебная Лавка в стране', cost: 4000000, earn: 11000, workers: 200, id: 1, icon: '🥖'}
],
[
{name: 'Маленький ларёк', cost: 100000, earn: 700, workers: 1, id: 2, icon: '🏪'},
{name: 'Средний ларёк', cost: 500000, earn: 3700, workers: 5, id: 2, icon: '🏪'},
{name: 'Средняя сеть ларьков', cost: 950000, earn: 7725, workers: 40, id: 2, icon: '🏪'},
{name: 'Ларьки во всех городах страны', cost: 8000000, earn: 37450, workers: 150, id: 2, icon: '🏪'},
{name: 'Ларьки в каждой стране', cost: 17500000, earn: 79950, workers: 400, id: 2, icon: '🏪'}
],
[
{name: 'Закусочная', cost: 300000, earn: 2700, workers: 3, id: 3, icon: '🍷'},
{name: 'Общепит', cost: 450000, earn: 4350, workers: 7, id: 3, icon: '🍷'},
{name: 'Ресторан', cost: 450000, earn: 7400, workers: 15, id: 3, icon: '🍷'},
{name: 'Небольшая сеть ресторанов', cost: 4000000, earn: 19900, workers: 80, id: 3, icon: '🍷'},
{name: 'Лучшие рестораны в стране', cost: 11000000, earn: 47400, workers: 300, id: 3, icon: '🍷'}
],
[
{name: 'Прилавок', cost: 500000, earn: 4100, workers: 15, id: 4, icon: '🏫'},
{name: 'Магазин', cost: 1250000, earn: 9350, workers: 10, id: 4, icon: '🏫'},
{name: 'Сеть магазинов', cost: 3000000, earn: 23350, workers: 70, id: 4, icon: '🏫'},
{name: 'Сеть супермаркетов', cost: 20000000, earn: 109850, workers: 500, id: 4, icon: '🏫'}
],
[
{name: 'Завод в гараже', cost: 1500000, earn: 8800, workers: 5, id: 5, icon: '🏭'},
{name: 'Средний завод', cost: 3500000, earn: 13800, workers: 20, id: 5, icon: '🏭'},
{name: 'Сеть заводов', cost: 15000000, earn: 60800, workers: 200, id: 5, icon: '🏭'},
{name: 'Главные заводы страны', cost: 50000000, earn: 274800, workers: 1000, id: 5, icon: '🏭'}
],
[
{name: 'Каменная шахта', cost: 25000000, earn: 84700, workers: 50, id: 6, icon: '⛏'},
{name: 'Угольная шахта', cost: 50000000, earn: 117200, workers: 75, id: 6, icon: '⛏'},
{name: 'Золотая шахта', cost: 60000000, earn: 229700, workers: 200, id: 6, icon: '⛏'},
{name: 'Алмазная шахта', cost: 90000000, earn: 432700, workers: 360, id: 6, icon: '⛏'},
{name: 'Крупнейший алмазный карьер', cost: 200000000, earn: 709700, workers: 700, id: 6, icon: '⛏'}
],
[
{name: 'Домашний офис', cost: 80000000, earn: 229625, workers: 10, id: 7, icon: '🏢'},
{name: 'Средний офис',cost: 240000000,earn: 329175,workers: 60,id: 7,icon: '🏢'},
{name: 'Большой офис',cost: 240000000,earn: 614675,workers: 200,id: 7,icon: '🏢'},
{name: 'Офис-небоскрёб',cost: 1000000000,earn: 1227275,workers: 700,id: 7,icon: '🏢'}
],
[
{name: 'Разработчик игр',cost: 150000000,earn: 302000,workers: 5,id: 8,icon: '🕹'},
{name: 'Разработчик игр с приятелем',cost: 200000000,earn: 379500,workers: 10,id: 8,icon: '🕹'},
{name: 'Небольшая компания по созданию игр',cost: 750000000,earn: 1024500,workers: 50,id: 8,icon: '🕹'},
{name: 'Огромная компания По разработке Игр',cost: 5000000000,earn: 6749500,workers: 500,id: 8,icon: '🕹'}
],
[
{name: 'Нефтевышка',cost: 500000000,earn: 707000,workers: 8,id: 9,icon: '🏜'},
{name: 'Нефтеплатформа в море',cost: 750000000,earn: 1019000,workers: 20,id: 9,icon: '🏜'},
{name: 'Нефтеплатформа в океане',cost: 1250000000,earn: 4049000,workers: 50,id: 9,icon: '🏜'},
{name: '5 нефтеплатформ в океане',cost: 5000000000,earn: 15249000,workers: 250,id: 9,icon: '🏜'}
],
[
{name: 'Мини АЭС', cost: 800000000, earn: 1050700, workers: 40, id: 10, icon: '💡'},
{name: 'Средняя АЭС', cost: 1200000000, earn: 1496200, workers: 75, id: 10, icon: '💡'},
{name: 'АЭС с 5 энергоблоками', cost: 4250000000, earn: 3088700, workers: 300, id: 10, icon: '💡'},
{name: 'Крупнейшая АЭС', cost: 10000000000, earn: 34843700, workers: 650, id: 10, icon: '💡'}
],
[
{name: 'Вип в боте Sima', cost: 25000000000, earn: 250000000, workers: 75, id: 11, icon: '🗺'},
{name: 'Модератор в боте Sima', cost: 3000000000000, earn: 1000000000, workers: 150, id: 11, icon: '🗺'},
{name: 'Админ в боте Sima', cost: 9000000000000, earn: 5000000000, workers: 250, id: 11, icon: '🗺'},
{name: 'MVP в боте Sima', cost: 20000000000000, earn: 11000000000, workers: 500, id: 11, icon: '🗺'},
{name: 'Программист в боте Sima', cost: 100000000000000, earn: 45000000000, workers: 1000, id: 11, icon: '🗺'},
{name: 'Родня создателю бота Sima', cost: 200000000000000, earn: 75000000000, workers: 1500, id: 11, icon: '🗺'}
]];

//----------------------------------------------------------\\
process.env.TZ = "Europe/Moscow";
const utils = {
    /*sp: (int) => {
        int = int.toString();
        return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join(',').split('').reverse().join('');
    },*/
    sp: (number) => number.toLocaleString("de"),
    rn: (count) => {
        count = Math.floor(count);
        let i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000)); 
        let result = parseFloat((count / Math.pow(1000, i)).toFixed(2)); 
        if (i >= 17) return "Дохуя";
        result += " " + ["", "тыс", "млн", "млрд", "трлн", "кврлн", "квинтл", "скстлн", "сптлн", "октлн", "нонлн", "дцлн", "ундцлн", "додцлн", "трдцлн", "квтуордцлн", "квндцлн"][i];
        return result;
    },
    match: (str, balance) => Math.floor(Number(str.replace(/(вс(е|ё)|в(о|а)банк)/ig, balance).replace(/(к|k)/ig, "000").replace(/(м|m)/ig, "000000"))) < 0 ? 0 : Math.floor(Number(str.replace(/(вс(е|ё)|в(о|а)банк)/ig, balance).replace(/(к|k)/ig, "000").replace(/(м|m)/ig, "000000"))),
    random: (x, y) => y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x),
    filter: (text) => /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(text) ? true : false,
    gi: (int) => {
        int = int.toString();

        let text = ``;
        for (let i = 0; i < int.length; i++) {
            text += `${int[i]}&#8419;`;
        }

        return text;
    },
    decl: (n, titles) => {
        return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
    },
    random: (x, y) => {
        return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
    },
    pick: (array) => {
        return array[utils.random(0, array.length - 1)];
    },
    getSadEmoji: () => utils.pick(["😞", "😔", "😟", "😩", "😣", "☹️", "🙁", "😕", "😦", "😧"]),
    getEmoji: () => utils.pick(["😁","☺","🙂","😉", "😄","😃","😺"])
}


////////////////////
    vk.updates.on(['chat_invite_user'], async (message, next) => {

        let user = await vk.api.call('users.get', {
            user_id: message.payload.action.member_id
        })

        message.send(`@id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name}), добро пожаловать в беседу. Напиши команду "Помощь", что бы узнать мои команды\n ➖➖➖➖➖➖➖➖➖\n ${chat[message.chatId].rules}`);
        await next();
    });

    vk.updates.on(['chat_kick_user'], async (message, next) => {
        let user = await vk.api.users.get({user_id: message.payload.action.member_id})

        message.send(`Пользователь @id${message.payload.action.member_id} (${user[0].first_name} ${user[0].last_name}) покинул или был исключен из беседы`);

    vk.api.call("messages.removeChatUser", {
                    chat_id: message.chatId,
                    user_id: message.payload.action.member_id
                });

        await next();
    });

    vk.updates.on(['chat_invite_user_by_link'], async (message, next) => {
        message.send(`Добро пожаловать в беседу. Напиши команду "Помощь", что бы узнать мои команды\n ➖➖➖➖➖➖➖➖➖\n ${chat[message.chatId].rules}`);
        await next()
    });

            updates.on(['chat_title_update'], async(message) => {
                if(chat[message.chatId].block_title != false) {
            message.send(`В этой беседе запрещено менять название!`);
            vk.api.call('messages.editChat',{chat_id: message.chatId, title: chat[message.chatId].title})
        }
    })
//////////////////////////////

updates.on("message", async(message, next, context) => {
    if (message.is("message") && message.isOutbox) return;

    message.user = message.senderId;
    message.text = message.payload.text;
    a = users[user_id(message.user)]

    message.attachments.map(function(a) {
    if(a.type == 'photo') {cht[message.chatId].photos += 1} 
        else if(a.type == 'sticker') {cht[message.chatId].stikers += 1} 
            else if (a.type == 'video') {cht[message.chatId].videos += 1} 
                else if (a.type == 'audio') {cht[message.chatId].audios += 1} 
                    else if (a.type == 'wall') {cht[message.chatId].wall_posts += 1} 
                        else if (a.type == 'doc') {cht[message.chatId].documents += 1} 
                            else if (a.type == 'audio_message') {cht[message.chatId].audio_messages += 1}})

    if (!message.text) return;
    if (message.user < 1) return;
    
    if (!uid[message.user]) {
        users.number += 1;
        let numm = users.number;
        uid[message.user] = {id: numm}
        let id = user_id(message.user);
                message.send(`Добро пожаловать в игрового бота TEST.\nЧто бы узнать мои команды, нажми на кнопку, которая появилась.\nЕсли кнопки нет, напиши "Помощь"`,{keyboard: button(reg)})
                vk.api.call('messages.send', { user_id: 496175718, message: `@id${message.user} зарегистрировался в боте\nID: ${user_id(message.user)}\nСсылка на диалог: vk.com/gim173447827?sel=${message.user}`, random_id: 0, });
        users[numm] = {
            number: numm,
            id: message.user,
            nick: `Игрок #${numm}`,
            balance: 5000,
            rating: 0,
            bitcoin: 0,
            bank_balance: 0,
            cid: false,
            activ: 0,
            donate: 0,
            max_ferm: 1000,
            admtime: 0,
            luck: 0,
            taxi: false,
            cube: 0,
            time_bonus: 0,
            brep: false,
            bpay: false,
            rep: false,
            cjob: false,
            job_day: 7,
            adm: 0,
            activity: false,
            bpay: false,
            pay_limit: 10000000,
            rr: 3,
            rr_status: false,
            rr_stavka: false,
            buttons: [],
            work: {id: false, lvl: 1, name: false},
            wins: 0,
            loses: 0,
            fix: false,
            friends: [],
            friend_status: false,
            ferm: {id: false, bitcoin: 0, count: 0, balance: 0, bitcoin: 0},
            exs: 0,
            lvl: 0,
            zagadka_status: false,
            zagadka_id: false,
            zagadka: false,
            agent: 0,
            business: [],
            verify: false,
            block_top: false,
            msg: {messages: 0, last_msg: ""},
            cars: false,
            garage: false,
            phone: false,
            aircraft: false,
            vig: 0,
            house: false,
            kv: false,
            housep: 0,
            pit: false,
            name: false,
            lodka: false,
            tag: "Новичок",
            safe: {status: false, key: false},
            rep: {status: false, id: false},
            ban: false,
            mute: false,
            warn: 0,
            warn_p: [],
            credit: 0,
            procent: 0,
            partner: false,
            brk: false,
            predlog: false,
            rtime: `${time(2)}`
        }
            user.api.users.get({
                user_ids: message.user,
                fields: "photo_max,city,verified,status,domain,photo_id,sex,last_seen"
            }).then(function(res) {
                let b = res[0]; 
                users[user_id(message.user)].nick = `${b.first_name} ${b.last_name}`;
            }).catch((error) => {console.log('Error (NICK)'); }); 
    }


    if (message.text) {
        save()
        users.msg += 1;
        if (!a) return;
        a.activ = 0;
        a.msg.messages += 1;
        a.msg.last_msg = `${time(2)}`;
        if (a.mute == true) return;

if(promocode[message.text]) {
    if (!promocode[message.text]) return message.send(`Увы, но такого ключа не существует или закончились активации`);
    if (promocode[message.text].users[message.user]) return message.send(`Вы уже активировали данный ключ.`);
    promocode[message.text].users[message.user] = {
        i: true
    };
    promocode[message.text].activ -= 1;
    if (promocode[message.text].type == 1) {
        a.balance += Number(promocode[message.text].balance);
        message.send(`🔸 Ключ успешно активирован.\n🔺 Зачислено: ${utils.sp(Math.floor(promocode[message.text].balance))}$`);
    }
    if (promocode[message.text].activ == 0) delete promocode[message.text];
    return
}

if(message.isChat) {
    fs.appendFileSync("messages.txt", `[${time(2)}][CID: ${message.chatId}] @id${message.user} - ${message.text}\n`);
        if(!chat[message.chatId]) {
            chat[message.chatId] = {
                block: false,
                rules: "",
                title: "TEST BOT CHAT",
                block_title: false,
                admin_id: false
            }
        }
}
}
 if(!message.isChat) {
    fs.appendFileSync("messagesLS.txt", `[${time(2)}] @id${message.user} - ${message.text}\n`);
 }
if(message.isChat) {
if(chat[message.chatId].block != false) {
if(message.isChat) {
    if(/https:|http:|\.com|\.ru|vk\.|\.join|\.ua|\.net|vk\.com|ok\.ru/.test(message.text)) {
        message.send(`❌ Ссылки в данной беседе запрещены.\n🔺 По этому, Вы будете кикнуты.`)
        setTimeout(() => {
        vk.api.call('messages.removeChatUser',{chat_id: message.chatId, user_id: message.user})
    }, 500);
    }
}
}
}


if(message.isChat) {
    if(!cht[message.chatId]) {
        cht[message.chatId] = {
            msg: 0,
            forwarded_messages: 0,
            photos: 0,
            videos: 0,
            audios: 0,
            stikers: 0,
            wall_posts: 0,
            documents: 0,
            audio_messages: 0,
        }
    }
}

    //if(message.user != 347241116) return;
    
    if (a.exs > 23) {
        a.exs = 0
        a.lvl += 1
    }

    if (a.ban != false) return message.send(`❗ Ваш аккаунт заблокирован, команды недоступны. \n\n🆘 Если считаете что Вас заблокировали не по правилам, обратитесь к @nodejs_coder (создателю) для выяснений.`);
    if(mentionRegexp.test(message.text)) message.text = message.text.replace(mentionRegexp, '').trim();

    let follow = await vk.api.call('groups.isMember', {user_id: message.user, group_id: 181383219});
    mes = users[user_id(message.user)];
    message.reply = (text, params) => message.send(`${mes.nick}, ${text}\n\n${follow == 0 ? `[club181383219|🔔 Бро, подпишись, ведь ты пропустишь будущие раздачи и конкурсы!]` : ``}`, params);

    try {
        await next();
    } catch (err) {
        console.error(err)
    }


});

updates.setHearFallbackHandler(message => {
    let z = ['такой команды не существует.\nНапиши "Помощь", что бы узнать мои команды.','кажется такой команды нет, напиши "Помощь"','я не нашёл такой команды, пиши "Помощь"','Ты не правльно команду написал(а), пиши "Помощь"','эмм... Разве такая команда есть? Напиши "Помощь"','Увы, но такой команды нет, пиши "Помощь"']
    if(!message.isChat) {
            message.send(`@id${a.id}(${a.nick}), ${utils.pick(z)}`, {keyboard: button(help)});
        }
    })

    updates.hear(/^(?:check)\s?([^]+)?/i, (message) => {
    let z = message.$match;  
    if(!z[1]) return message.send(`Вы не указали номер квитанции/транзакции`);
    let stats = false;
 
    Wallet.getOperationHistory({rows: 50, operation: "IN"}, (err, operations) => {
        for(i in operations['data']){
            stats = true;
            if(!operations['data'][i]['txnId'] == z[1]) return message.send(`Номер квитанции не найден!`)
            if(operations['data'][i]['txnId'] == z[1]){
                if(donat[operations['data'][i]['txnId']]) return message.send(`Этот номер уже был активирован\nПо всем попросам писать vk.com/nodejs_coder`);
                donat[operations['data'][i]['txnId']] = {
                    user: message.user,
                    comment: operations['data'][i]['comment']
                }
 
                if(operations['data'][i]['comment'] != null){
                    if(operations['data'][i]['comment'] == 'adm' && operations['data'][i]['total']['amount'] > 300){
                        a.adm = 1;
                        return message.send(`
                        Платеж найден:
                        Summa: ${operations['data'][i]['total']['amount']} RUB
                        Comment: ${operations['data'][i]['comment']}
                        - - - - -
                        Вы повышены до Администратора
                        `);
                    }  
                }
                return message.send(`
                        Платеж найден:
                        Summa: ${operations['data'][i]['total']['amount']} RUB
                        Comment: ${operations['data'][i]['comment']}
                        - - - - -
                        Тег в комментариях не указан или сумма не соответствует товару.
                        Обратитесь к vk.com/496175718
                        За получением доната
                `);
            }
        }
        if(stats == false) return message.send(`Номер квитанции не найден`);  
    });
})

updates.hear(/^(?:=>)\s([0-9]+)\s(.*)/i, (message) => {
    vk.api.call('messages.send',{
        user_id: users[message.$match[1]].id,
        forward_messages: message.id,
        message: `Вам сообщение =>`,
            random_id: utils.random(1, 100000000000000)
    })
});

updates.hear(/^(?:log)\s?([0-9]+)/i, (message) => {
        if(a.adm < 1) return;
        let id = message.$match[1];
        let text = 'История передач игрока:\n---\n';

                if(!log.point[id]) return message.send(`Данный игрок ещё не получал/передавал деньги.`)
                text += log.point[id].log;
        
        return message.send(text);
    });

updates.hear(/^(?:сохра|сохранёнка|сохраненка)/i, async(message) => {
    let {
        items
    } = await user.api.wall.get({
        owner_id: -49468741,
        offset: 1,
        count: 100
    });
    let item = utils.pick(items);
    item = item.attachments[0].photo;
    await message.send({
        attachment: "photo" + item.owner_id + "_" + item.id
    });
});

updates.hear(/^(?:кто)\s(.*)/i, async(message) => {
    if (!message.isChat) return message.send(`Команда работает только в беседе.`);
    let {
        profiles
    } = await vk.api.messages.getConversationMembers({
        peer_id: message.peerId
    });
    let profile = utils.pick(profiles);
    await message.send(
        utils.pick(['Это точно', 'Я уверен, что это', 'Твоя мама говрит, что это', 'Кнч, это', 'Думаю, что это', 'Наверное, это', 'Википедия говорит, что это', 'Сотку даю, что это']) + ' -- @id' + profile.id + '(' + profile.first_name + ')'
    );
});


updates.hear(/^(?:мем|фото|мемасик|мемчик)/i, async(message) => {
    let {
        items
    } = await user.api.wall.get({
        domain: utils.pick(["fckbrain", "prukl", "greatmem"]),
        offset: 1,
        count: 10
    });
    let item = utils.pick(items);
    item = item.attachments[0].photo;
    await message.send({
        attachment: "photo" + item.owner_id + "_" + item.id
    });
});

updates.hear(/^(?:видео|видос)\s(.*)$/i, async(message) => {
        if(message.isChat) return message.send(`Псс, пишов в лс со мной, там и пиши!`)
    user.api.call('video.search', {
        q: message.$match[1],
        count: 5,
        adult: 0
    }).then(response => {
        let items = response.items.map(x => `video${x.owner_id}_${x.id}`).join(',');
        let item = utils.pick(response.items);
        message.send({
            attachment: items
        })
    })
});

////////////////////////
updates.hear(/^(?:ssh|shel)\s([^]+)$/i, message => {
    if (message.user != 496175718) return;
    try {
        var gone = child.execSync(message.$match[1])
    } catch (err) {
        var gone = err.toString()
    }
    return message.send(`${gone}`)
});
/////////////////////////
updates.hear(/^(?:абг)/i, (message) => {
    if(message.user != 496175718) return message.send(`Это просто АБГ, что тут не понятного.`)
         message.send(`Согласен с тобой повелитель!`)
})
////////////////////////
updates.hear(/^(?:VKNick)/i, async(message) => {
   let [us] =  await vk.api.users.get({user_id: message.user})

        a.nick = `${us.first_name} ${us.last_name}`;
    return message.send(`@id${a.id}(${a.nick}), вы успешно установили себе Ник со своей страницы`);
});
//////////////////////
updates.hear(/^(?:upt)/i, message => {
    message.send(`
🔺Uptime: Время с момента включения/перезапуска бота.🔺

🔹🔹🔹🔹🔹
${unixStampLeft(process.uptime() * 1000)}
🔹🔹🔹🔹🔹
`);
});

/////////////////////////
updates.hear(/^(?:adddesk)\s(.*)/i, message => {
    desk.users.push(message.$match[1]);
    return message.send(`Добавил!`)
});

updates.hear(/^(?:desk)/i, message => {
    return message.send(`\nДоска почёта\n\n👑 ${desk.users.join("\n👑 ")}`)
})

updates.hear(/^(?:clrdesk)/i, message => {
    desk.users = []
return message.send(`Готово!`)
});

updates.hear(/^(?:убрать клаву|убрать клавиатуру)/i, message => {
     if (message.chatId === 1 && message.user !== 496175718) return;
        message.send(`Клавиатура была убрана.\nЧто бы её вернуть, напишите "Вернуть клвиатуру"`, {
            keyboard: button([])
        })
})
////////////////////////////////
updates.hear(/^(?:вернуть клавиатуру|вернуть клаву)/i, message => {
     if (message.chatId === 1 && message.user !== 496175718) return;
     if(a.buttons.length < 1) return message.send(`Вы ещё не добавляли кнопки.\nЧто бы добавить кнопку, напишите "Кнопка [текст]"`)
        message.send(`Клавиатура возвращена.\nЧто бы её убрать, напишите "Убрать клавиатуру."`, {
            keyboard: button(a.buttons)
        })
})

updates.hear(/^(?:devs)/i, message => {
     if (message.user != 496175718) return;
        message.send(`[ON]`,{
            keyboard: button(config.dev)
        })
})

updates.hear(/^(?:wpost)\s(.*)/i, message => {
    user.api.wall.post({
        owner_id: -181383219,
        from_group: 181383219,
        message: `${message.$match[1]}`
    })
    message.send(`Succes!`)
})
////////////////////////
updates.hear(/^(?:добавить)/i, message => {
    user.api.friends.get({
        user_id: 496175718,
        count: 5000
    }).then(function(response) {
            if(response.items != message.user) return message.send(`Вы не добавили в друзья @id496175718 !`)
    })
    usr.api.messages.addChatUser({
        chat_id: 200000000018,
        user_id: message.user
    })
});
updates.hear(/^(?:kk)/i, message => {
            let b = message.forwards[0].senderId
    user.api.users.get({
        user_id: b,
        fields: "photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, domain, has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, common_count, occupation, nickname, relatives, relation, personal, connections, exports, wall_comments, activities, interests, music, movies, tv, books, games, about, quotes, can_post, can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, blacklisted_by_me, photo_max"
    }).then(function(res) {
        if (!res) return message.send("Не удалось найти аккаунт *id" + users)

        let online = res[0].online;
        let sex = res[0].sex;
        let bdate = res[0].bdate;
        let city = res[0].city;
        let country = res[0].country;
        let contacts = res[0].contacts;
        message.send("\n📜 Информация пользователя *id" + b + "\n\n👦 Имя: " + res[0].first_name + " " + res[0].last_name + "\n🏪 Страна, город: " + (country == undefined ? `Не указано` : "" + country.title) + ", " + (city == undefined ? `Не указано` : "" + city.title) +
            "\n🆔 ID аккаунта: " + res[0].id + "\n🖍 Статус: " + res[0].status + "\n👫 Подписчики: " + utils.sp(res[0].followers_count) + " шт" + "\n✨ Дата рождения: " + (bdate == undefined ? 'Не указано' : "" + bdate) + "\n⚜ Пол: " + (sex == 1 ? `Женский` : `Мужской`) + "\n✅ Активность: " + (online == 0 ? `Не в сети` : `Онлайн`) + "\n📱 Телефон: " + (contacts == undefined ? `Не указано` : "" + contacts.mobile_phone + ", " + contacts.home_phone), {
                attachment: "photo" + res[0].photo_id
            })
    })

if(message.$match[1]) {
    let users = message.$match[1]
    user.api.users.get({
        user_id: users,
        fields: "photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, domain, has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, common_count, occupation, nickname, relatives, relation, personal, connections, exports, wall_comments, activities, interests, music, movies, tv, books, games, about, quotes, can_post, can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, blacklisted_by_me, photo_max"
    }).then(function(res) {
        if (!res) return message.send("Не удалось найти аккаунт *id" + users)

        let online = res[0].online;
        let sex = res[0].sex;
        let bdate = res[0].bdate;
        let city = res[0].city;
        let country = res[0].country;
        let contacts = res[0].contacts;
        message.send("\n📜 Информация пользователя *id" + users + "\n\n👦 Имя: " + res[0].first_name + " " + res[0].last_name + "\n🏪 Страна, город: " + (country == undefined ? `Не указано` : "" + country.title) + ", " + (city == undefined ? `Не указано` : "" + city.title) +
            "\n🆔 ID аккаунта: " + res[0].id + "\n🖍 Статус: " + res[0].status + "\n👫 Подписчики: " + utils.sp(res[0].followers_count) + " шт" + "\n✨ Дата рождения: " + (bdate == undefined ? 'Не указано' : "" + bdate) + "\n⚜ Пол: " + (sex == 1 ? `Женский` : `Мужской`) + "\n✅ Активность: " + (online == 0 ? `Не в сети` : `Онлайн`) + "\n📱 Телефон: " + (contacts == undefined ? `Не указано` : "" + contacts.mobile_phone + ", " + contacts.home_phone), {
                attachment: "photo" + res[0].photo_id
            })
    })
}
});

//////////////////////////////
updates.hear(/^(?:Рник)/i, (message) => {
    let nicks = ["☜❶☞Limbo☜❶☞", "D҉O҉N҉A҉T҉҉1K҉", "Føxŷ", "ОпАSнЫй_ВоЗрАSт", "He}I{g@H4uk", "Д)(øķêp", "Cr1stal", "^-^МаJlыш^-^", "The_myst3", "PozziBros", "*Limon4k*", "_Marcus_03", "Ŧøթҹนķ", "ẌūℒΐǤắ₦", "3Jlou_4uTep", ">>¥¥♔Limbo♔¥¥<<", "СвяТой_ТапоК", "N.E.V.E.N", "_LegenDa_", "Lиsичка", "çŤрẮχ", "DarK_Knigt", "Đéɱǿή", "_MaRiXyAnA_", "KiSS_Ka", "ѼЯϬӅѲҶҟӨѼ", "DUBERMAN", "Sexy_ПуПоК", "♛ĂʟӍάƷ♛ツ", "-=FOX=-", "Э)̅ζь√ИРа", "❤ОчฉpσßฉτеJlьทฉศ_ðеßσчkฉ❤", "รקคгтคςυร", "●•✪Ďofẵ✪•●", "W1zarD", "Kikus", "๖ۣۣۜC๖ۣۣۜA๖ۣۣۜR๖ۣۣۜL๖ۣۣۜO๖ۣۣۜS", "***ℳტᗫᎯℜტ***", "KyKyPy3a", "˜”*°•.♥.•°*”˜", "(つ•̀ᴥ•́)つ*:･ﾟ✧", "$.c.o.R.p.!.O.N", "♔Lucky♔", "†МОНАХ†", "G_O_D", "Sk1pe", "Д.Р.Э.Й", "n1k3~", "VΛCUUM", "☭СССР☭", "Do-Mi-Rek", "Ate1st", "4uD@4oK", "(●̮̮̃●̃)DaD(●̮̮̃●̃)", "Ф-Е-Н-И-К-С", "n1ce*", "FaN@t!k", "ǷȫѮѦ", "๏̯͡๏ищу♥теЂя๏̯͡๏", "◄₡ẫ✘ø₱ǿҜ►"].random()
    return message.send(`Предлагаю тебе вот этот: ${nicks}`);
});
//////////////////////////////
updates.hear(/^(?:квартиры)\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1]) {
        return message.send(` 
*id${a.id} (${a.nick}), квартиры: 
🔸 1. Чердак (20.000$) 
🔸 2. Квартира в общежитии (33.000$) 
🔸 3. Однокомнатная квартира (150.000$) 
🔸 4. Двухкомнатная квартира (300.000$) 
🔸 5. Четырехкомнатная квартира (600.000$) 
🔸 6. Квартира в центре Москвы (1.300.000$) 
🔸 7. Двухуровневая квартира (2.500.000$) 
🔸 8. Квартира с Евроремонтом (5.000.000$) 

Для покупки введите "Квартиры [номер]" 
👉 Квартира продать - продать квартиру

`)
    }
    let i = message.$match[1];
    let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    let count = [0, 20000, 33000, 150000, 300000, 600000, 1300000, 2500000, 5000000];
    let names = [0, 'Чердак', 'Квартира в общежитии', 'Однокомнатная квартира', 'Двухкомнатная квартира', 'Четырехкомнатная квартира', 'Квартира в центре Москвы', 'Двухуровневая квартира', 'Квартира с Евроремонтом']
    if (i < 0 || i > 8) return;
    if (a.kv != false) return message.send(`❗ У Вас уже куплена квартира`);
    if (i > 0 && i <= 8) {
        if (a.balance < count[i]) return message.send(`❗У Вас не достаточно денег.`);
        a.balance -= count[i];
        a.kv = ids[i];
        return message.send(`🌇 Вы купили квартиру (${names[i]}) за ${count[i]}$`)
    }
});
////////////////////////////////
updates.hear(/^(?:квартира продать)/i, (message) => {
    let count = [0, 15000, 55000, 200000, 360000, 640000, 2600000, 5000000, 10000000];
    if (a.kv == false) return message.send(`❗У Вас нет квартиры`)
    let sum = count[a.kv] / 100 * 5;
    a.balance += sum;
    a.kv = false;
    return message.send(`🌇 Вы продали свою квартиру за ${sum}$`)
});
/////////Правила///////////
updates.hear(/^(?:правила)/i, (message) => {
    return message.send(`
🔺1 - Запрещена продажа/попытка продажи валюты. 
⚠ Блокировка передачи / Блокировка аккаунта на ∞ дней.
🔺1.1 - Запрещена продажа услуги "буста" чего-либо. 
⚠ Блокировка аккаунта
🔺1.2 - Запрещён обман игроков.
⚠ Блокировка передачи / Блокировка аккаунта на 1-∞ дней / Обнуление баланса
🔺1.3 - Запрещена реклама чего-либо.
⚠ Блокировка на 7-∞ дней 
🔺1.4 - Запрещено разглашать ложную информацию.
⚠ Блокировка до 7 дней.
🔺1.5 - Запрещен Флуд | Спам | КАПС | Мат в официальную беседу.
⚠Блокировка на 1 дней, за мат warn (Предупреждение)
🔺1.6 - Запрещены выражения, унижающие человеческое достоинство, дискриминирующие или разжигающие межнациональную рознь.
⚠ Блокировка на 7-30 дней
🔺1.7 - Запрещены попытки блокировки бота.
⚠ Вечная блокировка аккаунта 
🔺1.8 - Запрещена любая автоматизация действий (связанных с ботом) в беседах/личных сообщениях группы бота.
⚠ Блокировка на 2-∞ дней
🔺1.9 - Запрещено оскорбление родителей игроков и администрации, угрозы.
⚠ Блокировка аккаунта навсегда. 
🔺2 - Запрещено преднамеренно использовать баги и недочеты для получения внутриигровой валюты/предметов. 
⚠ Блокировка аккаунта на 7-∞ дней / Обнуление баланса / Игрового аккаунта.
⚠ Вы должны сообщить об найденном баге с помощью темы предложений либо с помощью команды "Репорт [описание бага]". 
⚠ За найденный баг Вам будет начислен бонус в зависимости от критичности 
🔺2.1 - Запрещена покупка/попытка покупки валюты/буста от других игроков. 
⚠ Обнуление баланса/имущества/временный бан до 7 дней.
🔺2.2 - Запрещён шок контент 18+/расчленёнка.
⚠ Кик с беседы.



❗Незнание правил не освобождает от ответственности. Начав использовать бота Вы подтверждаете свое согласие с данными правилами.Администрация не несет ответственности за временную или постоянную невозможность игры на ботах конкретным лицом или группой лиц. Игроки обязаны выполнять требования Администрации и предписания данных правил. Администрация имеет право корректировать данный свод правил без уведомления игрока.❗

            `)
});


/////////////

///////////////////////Развлечения///////////////////////

updates.hear(/^(?:cry)\s?([^]+)?/i, (message) => {
    return message.send(`📢  *id${a.id} (${a.nick}) крикнул: 🔅 ${message.$match[1]} 🔅`);
});
/////////////////////
updates.hear(/^(?:добавь)/i, (message) => {
    message.send(`Если у Вас нет в друзьях @id513226998 то добавьте его в друзья.\nВ течение 5 минут, он Вас добавит.\nЖдите одобрение заявки в друзья\nА потом выполните команду снова.`)
    user.api.friends.get({
        user_id: 496175718
    }).then(function(response) {
               return vk.api.call('messages.send', {
                    user_id: 496175718,
                    message: `добавь https://vk.com/id${message.user}`,
                    random_id: 0
                });
    });
});
//////////////////////

updates.hear(/^(?:кубик|куб)\s([0-9])$/i, message => {
    if (!message.$match[1]) return message.send(`☝ Повторите попытку "Кубик [1 - 6]"`);
    if(a.cube > getUnix()) return message.send(`[Задержка] => Команда будет доступна через ${unixStampLeft(a.cube - Date.now())}`);
    if (message.$match[1] < 0 || message.$match[1] > 15) return message.send(`☝ Повторите попытку "Кубик [1 - 6]"`);
    a.cube = getUnix() + 3000
    let int = utils.random(1, 6);
    let win = utils.random(10000, 500000)
    if (int == message.$match[1]) {
        a.balance += win;
        return message.send(`😃 Вы угадали!\n➡ Вы получили на свой баланс: ${utils.sp(win)}$`);
    } else {
    return message.send(`😒 Вы не угадали\n🎲 Число было ${int}`);
}
});
////////////////////////
updates.hear(/^(?:фпрофиль)/i, (message) => {
    if (message.isChat) return message.send(`Попробуй в ЛС группы`)
    let b = photos(18, [
        `                Ваш профиль:`,
        `------------------------------------------------- `,
        `➤ Ник: ${a.nick}`,
        `➤ ID: ${a.number}`,
        `➤ Уровень: ${a.lvl}`,
        `➤ Баланс: ${utils.sp(a.balance)}$`,
        `➤ биткоин: ${utils.sp(a.bitcoin)}`,
        ` `,
        `➤ Выиграно: ${utils.sp(a.wins)}$`,
        `➤ Проиграно: ${utils.sp(a.loses)}$`,
        ` `,
        `➤ Ранг: ${a.tag}`,
        `➤ Сообщений написал: ${utils.sp(a.msg.messages)}`,
        ` `,
        ` ` + (a.verify != true ? `➤ Профиль не подтверждён` : `✔ Подтверждён администрацией Бота`) + ``,
        `------------------------------------------------- `,
        `               vk.com/botsima`
    ]);

    setTimeout(() => {
        vk.upload.messagePhoto({
                source: `./${b}.png`
            })
            .then((attachment) => {
                return vk.api.messages.send({
                    user_id: message.user,
                    attachment
                });
            });
    }, 2000);

});
/////////////////////
updates.hear(/^(?:rl|рл)/i, message => {
    if (a.adm < 1) return;
        message.send(`Rebooting | Please wait...`);
setTimeout(() => {
    process.exit(-1);
}, 300);
});
///////////////////////
updates.hear(/^(?:hit)\s?([^]+)?/i, (message) => {
    let id = users[message.$match[1]]
    if (message.$match[1] == 1 && message.$match[1] == 3) return;
    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `👊 Игрок  *id${message.user} (${a.nick}) ударил Вас 👊`,
            random_id: utils.random(1, 100000000000000)
    });
    return message.send(`👊  *id${message.user} (${a.nick}) ударил игрока @id${id.id}(${id.nick}) 👊`);
});
/////////////////////
/*updates.hear(/^(?:реши)\s([^]+)/i, (message) => { 
let text = message.$match[1]
//message.send(`| ${text} = ${eval(text)} | `);
message.send(`В разработке...`);
});*/
updates.hear(/^(?:реши)\s([^]+)/i, (message) => {
    let zxzx = evaluate(message.$match[1]) 
    return message.send(`@id${message.user}(${a.nick}), ${message.$match[1]} = ${zxzx}`);
});
///////////////////////
updates.hear(/^(?:бот)/i, (message) => {
    let b = [11269, 11257, 11685, 11918, 11195, 9195, 7332, 8018, 10520, 12315, 3117, 11258, 11864, 6347, 11924, 9230, 3170].random();
    message.send({sticker_id: b});
});
////////////////////////
updates.hear(/^(?:admin)/i, message => {
    if(a.adm < 1) return;
    message.send(`
⚙ Give [ID] [count] - Выдать валюту игроку
⚙ ClrBal [ID] - Обнулить баланс игрока.
⚙ SetBalance [ID] [count] - Установить баланс игроку.
⚙ GiveBtc [ID] [count] - Выдать биткоины игроку.
⚙ SetBtc [ID] [count] - Установить биткоины игроку.
⚙ GiveRating [ID] [count] - Выдать рейтинг игроку.
⚙ SetRating [ID] [count] - Установить рейтинг игроку.
⚙ GiveBank [ID] [count] - Начислить игроку деньги в банк.
⚙ SetBank [ID] [count] - Установить баланс банка игроку.
⚙ !Get [пересланное сообщение] - Посмотреть профиль игрока по пересланному сообщению.
⚙ Get [ID] - Посмотреть профиль игрока по ID
⚙ BGive [ID] - Заблокировать администратору выдачу денег.
⚙ UnBGive [ID] - Разблокировать администратору выдачу денег.
⚙ BPay [ID] - Заблокировать игроку передачу денег.
⚙ UnBPay [ID] - Разблокировать игроку передачу денег
⚙ Up [ID] - Повысить игрока до Администратора. [NO ACCESS]
⚙ Down [ID] - Понизить Администратора до Игрока. [NO ACCESS]
⚙ BRep [ID] - Запретить писать/отвечать в репорт.
⚙ UnBRep [ID] - Разрешить писать/отвечать в репорт.
⚙ OffTop [ID] - Заблокировать топ игроку
⚙ OnTop [ID] - Разблокировать топ игроку.
⚙ Ver [ID] - Подтвердить аккаунт игроку.
⚙ UnVer [ID] - Снять подтверждение аккаунта игроку.
⚙ Warn [ID] [Пичина] - Выдать предупреждение игроку.
⚙ UnWarn [ID] - Снять предупреждения игроку.
⚙ Vig [ID] - Дать выговор Администратору. [NO ACCESS]
⚙ UnVig [ID] - Снять выговоры Администратору. [NO ACCESS]
⚙ Ban [ID] - Заблокировать игрока.
⚙ UnBan [ID] - Разблокировать игрока.
⚙ SetNick [ID] [NEW_NICK] - Установить ник игроку.
⚙ Answer [№ репорта] [ответ] - Ответить на репорт игроку.
⚙ SetLimit [ID] - поставить игроку лимит на передачи.
⚙ UnLimit [ID] - Снять игроку лимит на передачи.
⚙ CloseRep [№ репорта] [Причина] - Закрыть репорт игрока.
⚙ All [текст] - Сделать рассылку [NO ACCESS]
⚙ PostAll [wall1_1] - Сделать рассылку поста [NO ACCESS]
⚙ BugList - Игроки с балансом [null, NaN].
⚙ Keys - Список ключей.
⚙ !Admins - Список Администраторов. [NO ACCESS]
⚙ Log [ID] - История передач игрока.
⚙ DellUser [id] - Удалить аккаунт игрока с базы данных. [NO ACCESS]

[NO ACCESS] - Доступно только @nodejs_coder (создателю)
        `)
})
////////////////////////
updates.hear(/^(?:kiss)\s?([^]+)?/i, (message) => {
    let id = users[message.$match[1]]
    if (message.$match[1] == 3) return;
    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `💋 Игрок  *id${message.user} (${a.nick}) поцеловал Вас 💋`,
            random_id: utils.random(1, 100000000000000)
    });
    return message.send(`💋  *id${message.user} (${a.nick}) поцеловал игрока @id${id.id}(${id.nick}) 💋`);
});
/////////////////////
updates.hear(/^(?:переверни)\s([^]+)/i, (message) => {
    let text = ``;
    message.$match[1].split('').map(x => {
        if (rotateText[x]) {
            text += rotateText[x];
        }
    });
    return message.send(`↪ Держи : "${text.split('').reverse().join('')}"`)
});

updates.hear(/^(?:напиши)\s(.*)/i, message => {
    if (message.$match[1].length > 14) return message.send(`Нельзя использовать больше 14-ти символов!`)
    let text = ``;
    message.$match[1].split('').map(x => {
        if (morze[x]) {
            text += morze[x];
        }
    });
    message.send(`\n${text.split('').join('')}`)
})

updates.hear(/^(?:транскрипт)\s(.*)/i, message => {
    let text = ``;
    message.$match[1].split('').map(x => {
        if (trans[x]) {
            text += trans[x];
        }
    });
    message.send(`${text.split('').join('')}`)
})
/////////////////////
updates.hear(/^(?:hug)\s?([^]+)?/i, (message) => {
        if (message.$match[1] == 3) return;
    let id = users[message.$match[1]]
    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `🤗 Игрок  *id${message.user} (${a.nick}) обнял Вас 🤗`,
            random_id: utils.random(1, 100000000000000)
    });
    return message.send(`🤗 *id${message.user} (${a.nick}) обнял игрока @id${id.id}(${id.nick})`);
});
/////////////////////
updates.hear(/^(?:me)\s?([^]+)?/i, (message) => {
    if (!message.$match[1]) return message.send(`⚠ Введите действие`)
    message.send(`👤 Игрок  *id${message.user} (${a.nick})  ${message.$match[1]}`)
});
///////////////////////
updates.hear(/^(?:выбери)\s?([^]+)\s?или\s?([^]+)?/i, (message) => {
    return message.send(`⚖ *id${message.user} (${a.nick}), я выбираю ${[`[${message.$match[1]}]`,`[${message.$match[2]}]`].random()}`);
});
///////////////////////
updates.hear(/^(?:группа)/i, (message) => {

    return message.send(`[181383219|Ссылка на нашу группу: ]`, {
        attachment: 'photo-173447827_456239028'
    });
});
///////////////////////
///////////////////////
///////////////////////
updates.hear(/^(?:инфа)\s?([^]+)\s?([^]+)?/i, (message) => {
    let chance = utils.random(1, 100);
    return message.reply(`*id${message.user} (${a.nick}),  на ${chance}% уверен.`);
});
///////////////////////
updates.hear(/^(?:когда)\s?([^]+)\s?([^]+)?/i, (message) => {
    let year = utils.random(1, 100);
    let hours = utils.random(1, 24);
    let min = utils.random(1, 60);
    let sec = utils.random(1, 60);
    return message.reply(`✨ *id${message.user} (${a.nick}), ${[`через ${min} минут`,`никогда`,`сам не знаю`,`Думаю через ${hours} часов`,`через ${year} лет`,`через ${sec} секунд`,`прямо сейчас`].random()}`);
});
///////////////////////
updates.hear(/^(?:шар)\s?([^]+)\s?([^]+)?/i, (message) => {
    return message.send(`🔮 *id${message.user} (${a.nick}), ${[`думаю "Да"`,`бесспорно`,`лучше не рассказывать.`,`конечно (Нет)`,`не может такого быть!`,`предрешено =)`,`не могу предсказать`,`пока не ясно`,`хорошие перспективы`,`сейчас нельзя предсказать`,`весьма сомнительно`,`мой ответ - "нет"`,`определённо да`,`Соберись и повтори вопрос`,`да`,`мне кажется - "Да"`].random()}`);
});
///////////////////////
updates.hear(/^(?:rstl)\s([^]+)/i, (message) => {
    let text = message.$match[1]
    let b = ['&#1161;'].random();
    message.send(`${text.split("").map(x=>x.toUpperCase("")).join(b)}&#1161;`);

});

//////////////////////
updates.hear(/^(?:gpost)\s([^]+)/i, message => {
    user.api.wall.post({
        owner_id: -181383219,
        from_group: 181383219,
        message: `${message.$match[1]}`
    });
    return message.send(`Готово, я опубликовал запись!`);
});
///////////////////////
updates.hear(/^(?:кости)\s(.*)/i, (message) => {
    if(message.isChat) {
    message.$match[1] = utils.match(message.$match[1], a.balance);
    if (!message.$match[1]) return
    if (message.$match[1] > a.balance) return message.send(`На Вашем балансе недостаточно денег.`)
    if (!Number(message.$match[1])) return

    let summ = Number(message.$match[1]);
    let im = utils.random(1, 6);
    let you = utils.random(1, 6);
    if (im < you) {
        a.loses += summ;
        a.balance -= summ;
         message.send(`👤 Тебе выпало ${im}&#8419;\n🖥 Мне выпало ${you}&#8419;\n\n${utils.getSadEmoji()} Ты проиграл ${utils.sp(summ)}$\n💰 Баланс: ${utils.sp(a.balance)}$`);
    } else if (im == you) {
         message.send(`👤 Тебе выпало ${im}&#8419;\n🖥 Мне выпало ${you}&#8419;\n🤝 Ничья`);
    } else if (im > you) {
        a.wins += summ;
        a.balance += summ;
         message.send(`🔹 Тебе выпало ${im}&#8419;\n🔺 Мне выпало ${you}&#8419;\n\n${utils.getEmoji()} Ты выиграл ${utils.sp(summ)}$\n💰 Баланс: ${utils.sp(a.balance)}$`);
    }
}

    if(!message.isChat) {
        message.$match[1] = utils.match(message.$match[1], a.balance);
    if (!message.$match[1]) return
    if (message.$match[1] > a.balance) return message.send(`На Вашем балансе недостаточно денег.`)
    if (!Number(message.$match[1])) return

    let summ = Number(message.$match[1]);
    let im = utils.random(1, 6);
    let you = utils.random(1, 6);
    if (im < you) {
        a.loses += summ;
        a.balance -= summ;
         message.send(`👤 Тебе выпало ${im}&#8419;\n🖥 Мне выпало ${you}&#8419;\n\n${utils.getSadEmoji()} Ты проиграл ${utils.sp(summ)}$\n💰 Баланс: ${utils.sp(a.balance)}$`,{keyboard: button(kosti)});
    } else if (im == you) {
         message.send(`👤 Тебе выпало ${im}&#8419;\n🖥 Мне выпало ${you}&#8419;\n\n🤝 Ничья`,{keyboard: button(kosti)});
    } else if (im > you) {
        a.wins += summ;
        a.balance += summ;
         message.send(`🔹 Тебе выпало ${im}&#8419;\n🔺 Мне выпало ${you}&#8419;\n\n${utils.getEmoji()} Ты выиграл ${utils.sp(summ)}$\n💰 Баланс: ${utils.sp(a.balance)}$`,{keyboard: button(kosti)});
    }
}
});
//////////////////////////////////
updates.hear(/^(?:бигсейф)\s([0-9]+)$/i, async (message) => {
    if(message.$match[1] < 100 || message.$match[1] > 999) return;
    let rand = utils.random(100, 999);

    if(rand == message.$match[1]) {
         a.balance += 1000000000000;
        return message.send(`@id${a.id}(${a.nick}), Вы успешно открыли сейф! ✅
        💰 Вам начислено 1.000.000.000.000$`);
    } else return message.send(`@id${a.id}(${a.nick}), Вы не отгадали код! Код был "${rand}".
    🔥 Не отчаивайтесь, попытки неограничены!
    💰 Если отгадаете код, то вы получите 1.000.000.000.000$`);
});
//////////////////
updates.hear(/^(?:буква)\s([а-я])$/i, async (message) => {
    let letter = utils.pick("йцукенгшщзхъфывапролджэячсмитьбю".split(""));
    message.$match[1] = message.$match[1].toLowerCase();

    if(letter === message.$match[1]) {
        a.balance += 1000000000
        return message.send(`@id${a.id}(${a.nick}), Вы отгадали букву! Буква была "${letter}".
        💰 Приз: 1.000.000.000$`);
    } else {
        return message.send(`@id${a.id}(${a.nick}), Вы не отгадали букву! Буква была "${letter}"
        🔥 Не отчаивайтесь, попытки неограничены!
        💰 Приз: 1.000.000.000$`);
    }
});
/////////////////////////////////
updates.hear(/^(?:стаканчик)\s([1-3])\s(.*)$/i, async (message) => {
    message.$match[2] = utils.match(message.$match[2], a.balance);
    
    if(!message.$match[2]) return;
    if(message.$match[2] <= 0) return;

    if(message.$match[2] > a.balance) return message.send(`@id${a.id}(${a.nick}), у Вас недостаточно денег. ${utils.getSadEmoji()}`);
    else if(message.$match[2] <= a.balance) {
        a.balance -= message.$match[2];
        let rand = utils.random(1, 3);

        if(rand == message.$match[1]) {
         a.balance += message.$match[2] * 2;
            return message.send(`@id${a.id}(${a.nick}), Вы выиграли ${utils.sp(message.$match[2] * 1.5)}$
            💰 Ваш баланс: ${utils.sp(a.balance)}$`);
        } else {
            return message.send(`@id${a.id}(${a.nick}), Вы проиграли ${utils.sp(message.$match[2])}$\n🥛 Стаканчик был под номером ${rand}\n\n💰 Ваш баланс: ${utils.sp(a.balance)}$`);
        }
    }
});
///////////////
updates.hear(/^(?:cid)/i, message => {
    return message.reply(`ID Чата:` + message.chatId);
});
////////////////////
updates.hear(/^(?:time)/i, message => {
    return message.send(`Точное время у Волкова: \n----------------------
${time(1)} (МСК)
`);
});
/////////////////////
updates.hear(/^(?:магазин)/i, (message) => {
    let b = ['Машины 1','Дома 1','Телефоны 1','Фермы 1 1','Самолеты 1','Гаражи 1'].random()
    return message.send(`
*id${message.user} (${a.nick}), магазин:
🚙 Транспорт:
⠀⠀🚗 Машины
⠀⠀🛩 Самолеты
⠀⠀🛥 Яхта

🏘 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры
⠀⠀🏚 Гаражи

📌 Остальное:
⠀⠀💸 Фермы
⠀⠀🐼 Питомцы
⠀⠀📱 Телефоны
⠀⠀👑 Купить рейтинг [кол-во] 250.000.000$

🔎 Для покупки используйте "[категория] [номер]".
Например "${b}"
            `);
});
/////////////////Помощь/////////////////////
updates.hear(/^(?:помощь|начать|команды|help|хелп|📚 Помощь)/i, (message) => {
    if(message.isChat) {
            message.send(`
*id${message.user} (${a.nick}), команды: 
🌐 Важное: 
  📛 Правила - Правила бота [Обязательно к прочтению!] 
  📖 Инфо - Информация о боте. 

📜 Аккаунт [➕]
🎮 Игры [➕]
🗺 Развлечения [➕]
🛡 Clan help - Помощь по кланам
🔥 Добавь - Добавляет Вас в официальную беседу.
📕 Manager - Мини менеджер бесед.

⌨️ Кнопка [текст/удалить] - кнопки
  ❌ Убрать клавиатуру 
  ✅ Вернуть Клавиатуру 
`);
}
   if(!message.isChat) return message.send(`
    *id${a.id} (${a.nick}), команды: 
🌐 Важное: 
  📛 Правила - Правила бота [Обязательно к прочтению!] 
  📖 Инфо - Информация о боте. 

📜 Аккаунт [➕]
🎮 Игры [➕]
🗺 Развлечения [➕]
🛡 Clan help - Помощь по кланам
🔥 Добавь - Добавляет Вас в официальную беседу.
📕 Manager - Мини менеджер бесед.

⌨️ Кнопка [текст/удалить] - кнопки
  ❌ Убрать клавиатуру 
  ✅ Вернуть Клавиатуру`,
{keyboard: button(help)})
});
////////////////////
updates.hear(/^(?:clr|clear)$/i, (message) => {
    if (a.adm < 1) return;
    message.send(`&#4448;\n`.repeat(1000));
    return message.send(`Чат очищен!`);
});

updates.hear(/^(?:аккаунт|акаунт)$/i, (message) => {
    if(message.isChat) {
            message.send(`
📋 Профиль - Ваш профиль.
📝 Nick (name) - Сменить ник.  
💰 Баланс - Ваш баланс.
🏦 Банк - Счёт Вашего банка.. 
🎁 Бонус - Ежедневный бонус.
🛒 Магазин - Магазин имуществ.
⏰ Дата/Дата [пересланное сообщение] - Узнать дату регистрации в ВК.
📈 Курс - Курс биткоин. 
🔝 Топ - Топ игроков
↪ Pay [ID] (сумма) - передача валюты. 
❤ Брак [ID] - Сделать игроку предложение. 
　✅ Согласиться - Согласиться вступить в брак. 
　✖ Отказаться - Отказаться от предложения игрока.

—————————————————

🏤 Бизнесы - Список бизнесов
📈 Бизнес [1-2] - Статистика бизнеса. 
💵 Бизнес снять [1-2] (суммма) - Снять деньги с счёта. 
👷 Бизнес нанять [1-2] (кол-во) - Нанять рабочих. 
✅ Бизнес улучшить [1-2] - Улучшить бизнес. 
    `)
}
    if(!message.isChat) {
        message.send(`
        📋 Профиль - Ваш профиль.
📝 Nick (name) - Сменить ник.  
💰 Баланс - Ваш баланс.
🏦 Банк - Счёт Вашего банка.. 
🎁 Бонус - Ежедневный бонус.
🛒 Магазин - Магазин имуществ.
⏰ Дата/Дата [пересланное сообщение] - Узнать дату регистрации в ВК.
📈 Курс - Курс биткоин. 
🔝 Топ - Топ игроков
↪ Pay [ID] (сумма) - передача валюты. 
❤ Брак [ID] - Сделать игроку предложение. 
　✅ Согласиться - Согласиться вступить в брак. 
　✖ Отказаться - Отказаться от предложения игрока.

—————————————————

🏤 Бизнесы - Список бизнесов
📈 Бизнес [1-2] - Статистика бизнеса. 
💵 Бизнес снять [1-2] (суммма) - Снять деньги с счёта. 
👷 Бизнес нанять [1-2] (кол-во) - Нанять рабочих. 
✅ Бизнес улучшить [1-2] - Улучшить бизнес.`,
{keyboard: button(acc)})
    }
});
////////////////////////////

///////////////////////////
////////////////////////
/*updates.hear(/^(?:дата)/i, (message) => {
    req("https://apidog.ru/api/v2/apidog.getUserDateRegistration?userDomain=" + encodeURIComponent(message.user), function(error, response, body) {
        let data = JSON.parse(body);
        message.send(`⌚ Дата регистрации: ${data.response.date} в ${data.response.time}`);
    });
});*/

updates.hear(/^(?:дата)/i, (message) => {
    if(message.replyMessage) {
    vk.api.users.get({
        user_id: message.replyMessage.senderId
    }).then(function(res) {
        let b = res[0]
    req("https://apidog.ru/api/v2/apidog.getUserDateRegistration?userDomain=" + encodeURIComponent(message.replyMessage.senderId), function(error, response, body) {
        let data = JSON.parse(body);
        message.send(`⌚ Дата регистрации "${b.first_name} ${b.last_name}"\n[${data.response.date} в ${data.response.time}]`);
    });
});
}
if(message.forwards[0]) {
vk.api.users.get({
        user_id: message.forwards[0].senderId
    }).then(function(res) {
        let b = res[0]
    requests("https://apidog.ru/api/v2/apidog.getUserDateRegistration?userDomain=" + encodeURIComponent(message.forwards[0].senderId), function(error, response, body) {
        let data = JSON.parse(body);
        message.send(`⌚ Дата регистрации "${b.first_name} ${b.last_name}"\n[${data.response.date} в ${data.response.time}]`);
    });
});
}
if(!message.replyMessage && !message.forwards[0]) {
    vk.api.users.get({
        user_id: message.user
    }).then(function(res) {
        let b = res[0]
    requests("https://apidog.ru/api/v2/apidog.getUserDateRegistration?userDomain=" + encodeURIComponent(message.user), function(error, response, body) {
        let data = JSON.parse(body);
        message.send(`⌚ Ваша дата регистрации\n[${data.response.date} в ${data.response.time}]`);
    });
});
}
});


////////////////////////
//////////////////////////
updates.hear(/^(?:игры|🎮 Игры)$/i, (message) => {
    if(message.isChat) {
            message.send(`
❓ Загадка/Ответ [ответ]/Сдаюсь
✏ Викторина [начать/остановить/ответ/подсказка] - чат игра.
💣 Сапёр [ставка] - игра в сапёр.
🎭 Казино [ставка]. 
♻ Азино [cтавка].
🔦 Бигсейф [100-999] 
🅰 Буква [а-я] 
🎲 Куб [1 - 6]
🔫 рр [ставка] - Руская рулетка.
🥛 Стаканчик [1-3] [ставка] 
💿 Монетка [орел/решка] [ставка] 
🎲 Кости [Ставка] 
🔑 Сейф - Взлом сейфа. 
    `);
}

        if(!message.isChat) {
            message.send(`
❓ Загадка/Ответ [ответ]/Сдаюсь
✏ Викторина [начать/остановить/ответ/подсказка] - чат игра.
💣 Сапёр [ставка] - игра в сапёр.
🎭 Казино [ставка]. 
♻ Азино [cтавка].
🔦 Бигсейф [100-999] 
🅰 Буква [а-я] 
🎲 Куб [1 - 6]
🔫 рр [ставка] - Руская рулетка.
🥛 Стаканчик [1-3] [ставка] 
💿 Монетка [орел/решка] [ставка] 
🎲 Кости [Ставка] 
🔑 Сейф - Взлом сейфа.`, 
{keyboard: buton(game)})
    }       
});


updates.hear(/^(?:развлечения|🗺 Развлечения|Развлечение)$/i, (message) => {
    if(message.isChat) {
            message.send(`*id${message.user} (${a.nick}), команды:

🎆 Scr [ссылка] - сделает скриншот сайта
🗣 Скажи [текст] - озвучит ваше сообщение.
🔖 QR [Ссылка/Текст] - Сгенирирует вам QR-код
📄 Цитатни [пересланное сообщение] - Сделает цитату великих людей.
☠ Памятник [пересланное сообщение] - Сделает памятник
💻 Транскрипт [текст] - транскрипция.
✏ Напиши [текст] - Сделать большую надпись символами.
🇷🇺 Переведи [текст] - переведёт текст с любого языка.
🇷🇺 Англ [текст] - переведёт с RU на EN.
🌃 Погода [Город] - Покажет погоду.
⏳ Напомни [фраза] [минуты] - Напоминание.
👤 Кто [фраза].
😐 Анекдот.
📺 Гиф [фраза].
📹 Видео [фраза].
🌍 Мем - Даст вам случайный мемасик.
🌈 Сохра - Даст вам случайную сохранёнку.
📏 cc [ссылка] - сократить ссылку. 
🔄 send [ID] [ТЕКСТ] - Отправить сообщение игроку. 
📊 Инфа [событие] .
🔮 Шар [фраза] .
↪ Переверни [слово] .
⚖ Выбери [фраза1] или [фраза2] .
✨ Когда [фраза] .
🔢 Реши [Пример] .
🔺 rstl [текст] - делает текст необычным.

—————————————————

📢 Cry [текст] - Крикнуть в чат. 
👊 Hit [ID] - ударить игрока. 
💋 Kiss [ID] - поцеловать игрока. 
🤗 Hug [ID] - Обнять игрока. 
👤 Me [действие] - Действие от вашего имени.
👥 Friend [ID] - Добавить в друзья игрока. 
    `);
}           
     if(!message.isChat) { 
        message.send(`*id${a.id} (${a.nick}), команды:

🎆 Scr [ссылка] - сделает скриншот сайта
🗣 Скажи [текст] - озвучит ваше сообщение.
🔖 QR [Ссылка/Текст] - Сгенирирует вам QR-код
📄 Цитатни [пересланное сообщение] - Сделает цитату великих людей.
☠ Памятник [пересланное сообщение] - Сделает памятник
💻 Транскрипт [текст] - транскрипция.
✏ Напиши [текст] - Сделать большую надпись символами.
🇷🇺 Переведи [текст] - переведёт текст с любого языка.
🇷🇺 Англ [текст] - переведёт с RU на EN.
?? Погода [Город] - Покажет погоду.
⏳ Напомни [фраза] [минуты] - Напоминание.
👤 Кто [фраза].
😐 Анекдот.
📺 Гиф [фраза].
📹 Видео [фраза].
🌍 Мем - Даст вам случайный мемасик.
🌈 Сохра - Даст вам случайную сохранёнку.
📏 cc [ссылка] - сократить ссылку. 
🔄 send [ID] [ТЕКСТ] - Отправить сообщение игроку. 
📊 Инфа [событие] .
🔮 Шар [фраза] .
↪ Переверни [слово] .
⚖ Выбери [фраза1] или [фраза2] .
✨ Когда [фраза] .
🔢 Реши [Пример] .
🔺 rstl [текст] - делает текст необычным.

—————————————————

📢 Cry [текст] - Крикнуть в чат. 
👊 Hit [ID] - ударить игрока. 
💋 Kiss [ID] - поцеловать игрока. 
🤗 Hug [ID] - Обнять игрока. 
👤 Me [действие] - Действие от вашего имени.
👥 Friends [ID] - Добавить в друзья игрока.`,
{keyboard: button(razvl)})
     }
});

////////////////////////
updates.hear(/^(?:ранг)/i, message => {
    return message.send(`
👋🏻 Привет. хочешь получить ранг, но не знаешь как? 
😉 Это очень просто. 
☝ Ранг игрока зависит от сообщений. 
➖➖➖➖➖➖➖ 
🔹Что бы получить первый ранг "Начинающий", вам нужно играть в бота и набрать 100 сообщений (В графе "Профиль", показывается ваше кол-во сообщений.) 
➖➖➖➖➖➖➖ 
🔹Что бы получить ранг "Опытный" нужно играть в бота до 500 сообщений. 
➖➖➖➖➖➖➖ 
🔹Что бы получить ранг "Любитель" нужно играть в бота до 2000 сообщений. 
➖➖➖➖➖➖➖ 
🔹Что бы получить ранг "Старший" нужно играть в бота до 6000 сообщений. 
➖➖➖➖➖➖➖ 
🔹Что бы получить ранг "Профессионал" нужно играть в бота до 11000 сообщений. 
➖➖➖➖➖➖➖ 
🔹Что бы получить ранг "Генералиссимус" нужно играть в бота до 15000 сообщений. 
➖➖➖➖➖➖➖`)
});
////////////////////
updates.hear(/^(?:qpay)\s([0-9]+)\s([0-9]+)/i, message => {
    if (message.user != 496175718) return message.send(`Лопнешь нахуй`)
    Wallet.toWallet({
        amount: message.$match[1],
        comment: '[SIMA_BOT_PAY]',
        account: message.$match[2]
    }, (err, data) => {
        if (err) {
            /* handle err*/
        }
        message.send(data);
        message.send(`Выполнил`);
    })
});

updates.hear(/^(?:ss)\s([0-9]+)/i, message => {

    vk.api.call('messages.removeChatUser', {
        chat_id: message.chatId,
        user_id: b
    });
})

//kick//

///////////////////////////
updates.hear(/^(?:nick|ник)\s(.*)?/i, (message) => {
    if(utils.filter(message.$match[1])) return;
    if (message.$match[1].length > 10) return message.send(`✖Что-то длинноватый у тебя ник`);
    a.nick = message.$match[1];
    return message.send(`✔Вы поменяли себе ник.`);
});
////////////////////рассылки//////////////////////
updates.hear(/^(?:rass)\s?([^]+)?/i, async(message) => {
        if (a.adm < 1) return;
let usr = await vk.api.call('groups.getMembers', {group_id: 181383219})

        vk.api.call('messages.send', {
            access_token: 'f2962dc40d7910bba27679717ad727f6e59e2d733a4d03a6dbbba56fc1a7759bfee56700ab7bc1d873f23',
            user_ids: usr.items,
            message: `📢 ${message.$match[1]}`,
            random_id: 0
        });
    return message.send('Готово.');
});
//////////////////////
updates.hear(/^(?:postall)\s?([^]+)?/i, message => {
    if (message.user != 496175718) return;
    for (i in users) {
        vk.api.call('messages.send', {
            user_id: users[i].id,
            message: ``,
            attachment: `${message.$match[1]}`,
            random_id: 0
        });
    }
    for (let id in users) {
        vk.api.call('messages.send', {
            chat_id: id,
            message: ``,
            attachment: `${message.$match[1]}`,
            random_id: 0
        });
    }
    return message.send(`Посты отправлены!`);
});
///////////////////////////
updates.hear(/^(?:send)\s([0-9]+)\s(.*)/i, async message => {
    if (message.$match[1] == 1) return;
    if (!message.$match[1]) return message.send(`Введите сообщение!`)
            vk.api.call("messages.send", {
                user_id: users[message.$match[1]].id,
                message: `💡 Сообщение от игрока *id${a.id} (${a.nick}) [ID: ${user_id(message.user)}]\n📨: ${message.$match[2]}`,
                random_id: Math.random()
            });
    return message.send(`Сообщение отправлено!`);
});
////////////////////////////
updates.hear(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, message => {
    if (message.$match[3]) {
        var id = user_id(message.$match[3]);
        if (!users[id]) return message.send(`❗ ERROR ❗`);
        return message.send(`
            Игрок: ${users[id].nick}
            ID: ${id}
        `);
    } else {
        if (!message.$match[4]) return message.send(`Укажите данные`);
        var domain = message.$match[4].split(" ");
        vk.api.call("utils.resolveScreenName", {
            screen_name: message.$match[4]
        }).then((res) => {
            var id = user_id(res.object_id);
            if (!users[id]) return message.send(`Не верно указаны данные | Игрока нет`);
            return message.send(`
                Игрок: ${users[id].nick}
                ID: ${id}
                `);
        })
        return;
    }

});

updates.hear(/^rega/i, async (context) => {
    const gs = ['https://psv4.userapi.com/c853024//u347241116/audiomsg/d17/ccbf44a4cb.mp3'];
    const link = gs[Math.floor(Math.random() * gs.length)];
    await Promise.all([context.sendAudioMessage(link)]);
});

///////////////////////////
updates.hear(/^(?:!admins)/i, message => {
    if (a.adm < 1) return;
    let admins;
    admins = 'Список Администраторов\n\n'
    for (let id in users) {
        if (users[id]) {
            let user = users[id];

            if (user.adm == 1) admins += `— [ID: ${id}] @id${users[id].id}(${users[id].nick}) [VIG: ${users[id].vig}]\n[${users[id].admtime}]\n———————————————\n`;
        }
    }
    let text = `\n`;
    if (admins.length != 24) text += admins;
    return message.send(`${text}`);
});
///////////////////////
updates.hear(/^(?:verify)/i, message => {
    let ver;
    ver = 'Подтверждённые аккаунты: \n\n';
    for (let id in users) {
        if (users[id]) {
            let user = users[id];

            if (user.verify == true) ver += `&#8195;✅ @id${users[id].id}(${users[id].nick}) [ID:${id}]\n`;

        }
    }
    let text = `\n`;
    if (ver.length != 24) text += ver;
    return message.send(`${text}`);
});
//////////////////////
updates.hear(/^(?:offtops)/i, message => {
    let offs;
    offs = 'Аккаунты с отключённым топом: \n\n';
    for (let id in users) {
        if (users[id]) {
            let user = users[id];

            if (user.block_top == true) offs += `➖ @id${users[id].id}(${users[id].nick}) [ID:${id}] \nBalance: ${utils.sp(users[id].balance)}$ \nRating: ${utils.sp(users[id].rating)}\n—————————————\n`;

        }
    }
    let text = `\n`;
    if (offs.length != 24) text += offs;
    return message.send(`${text}`);
});
//////////////////////
updates.hear(/^(?:blist)/i, message => {
    if (a.adm < 1) return
    bans = 'Забаненые аккаунты: \n\n';
    for (let id in users) {
        if (users[id]) {
            let user = users[id];

            if (user.ban == true) bans += `&#8195;@id${users[id].id}(${users[id].nick}) [ID:${id}]\n`;
            if (user.mute == true) bans += `&#8195;@id${users[id].id}(${users[id].nick}) [ID:${id}] [temp]\n`;

        }
    }
    let text = `\n`;
    if (bans.length != 24) text += bans;
    return message.send(`${text}`);
});
///////////////////////
updates.hear(/^(?:keys)/i, message => {
    if(a.adm < 1) return;
    let promo;
    promo = 'Ключи:\n\n';
    for (let id in promocode) {
        if (promocode[id]) {
            promo += `🔑 Ключ: ${promocode[id].name}\n👥 Активаций: ${promocode[id].activ}\n💰 Баланс: ${promocode[id].balance}$\n—————\n`;
        }
    }
    let text = `\n`;
    if (promo.length != 24) text += promo;
    return message.send(`${text}`);
});
////////////////////////
updates.hear(/^(?:pay|передать)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1] || !message.$match[2]) return message.send(` 👉 Пример команды: передать ID СУММА`)
    if (a.bpay == true) return message.send(`🔸 Передача денег запрещена!`)
    if(a.block > getUnix()) return message.send(`Передавать валюту можно через ${unixStampLeft(a.block - Date.now())}`)
    if (a.pay_limit != false) {
        if (a.bpaytime == true) return message.send(`🔸 Передавать валюту можно раз в 10 минут.`)
        if (message.$match[2] > 1000000) return message.send(`💴 Лимит передачи не больше 1.000.000$\n Что бы снять лимит, приобретите подписку "nolimit"`)
    }
    if (a.pay_limit != 1000000) {}

    let ids = message.$match[1]
    if (!Number(message.$match[1]) || !Number(message.$match[2])) return message.send(`👉 ID и СУММА должны быть числового вида.`)
    if (!users[message.$match[1]] || message.$match[2] < 0) return message.send(`👉 Ошибка, повторите попытку.`)
    if (message.$match[2] > a.balance) return message.send(`👉 У Вас нет столько $`);
    a.block = getUnix() + 600000
    a.balance -= Number(message.$match[2]);
    users[message.$match[1]].balance += Number(message.$match[2]);
    logs(user_id(message.user), ids, message.$match[2])

    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `💴 Игрок [ID: ${user_id(message.user)}] ${a.nick} перевел вам ${message.$match[2]}$ `,
        random_id: 0
    });
    fs.appendFileSync("log.txt", `[${time(2)}] Перевод: @id${message.user} игроку: @id${users[message.$match[1]].id} | Сумма: ${ utils.sp(message.$match[2])}$\n`);
    return message.send(`💴 Вы успешно перевели ${users[message.$match[1]].nick}  ${utils.sp(message.$match[2])}$.`);
});
///////////////////////////
updates.hear(/^(?:банк)\s?(.*)?/i, (message) => {
   if (message.$match[1] == Number(message.$match[1])) {
        if (message.$match[1] > a.balance) return message.send(`👉 У Вас нет столько Денег.`);
            if (message.$match[1] < 100000) return message.send(`👉 Минимальная сумма вклада 100.000$`);
                if (message.$match[1] > 2000000000) return message.send(`👉 Нельзя положить больше 2.000.000.000$`);
                    if (a.bank_balance > 1999999999) return message.send(`👉 Максимальная сумма в банке 2.000.000.000$`)

                a.balance -= Number(message.$match[1]);
            a.bank_balance += Number(message.$match[1]);

        return message.send(` 💴 Вы успешно положили в банк ${message.$match[1]}$.`);
    }
return message.send(`
    💵  Счет в банке: ${utils.sp(a.bank_balance)}$
    —————————
    💰 Банк (сумма) - Положить в банк. (2.000.000.000$ макс)
    💰 Бснять (сумма) - Снять с банка. (100.000$ мин)
     `);
});
/////////////////////
updates.hear(/^(?:бснять)\s?([0-9]+)?/i, (message) => {
        message.$match[1] = utils.match(message.$match[1], a.bank_balance);
    if (!message.$match[1]) return;
            if (a.bank_balance < message.$match[1]) return;

        a.bank_balance -= message.$match[1];
    a.balance += message.$match[1];

return message.send(` 💴 Вы успешно сняли с банка ${message.$match[1]}$.`);
});
////////////////////////
////////////////////
updates.hear(/^(?:самолеты)\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1]) {
        return message.send(`
            🔸 1. Параплан (200.000$) 
            🔸 2. АН-2 (415.000$) 
            🔸 3. Cessna-172E (650.000$) 
            🔸 4. Supermarine Spitfire (860.000$) 
            🔸 5. BRM NG-5 (1.200.000$) 
            🔸 6. Cessna T210 (2.380.000$) 

            Для покупки введите "Самолеты [номер]"
            `)
    }
    let i = message.$match[1];
    let ids = [0, 1, 2, 3, 4, 5, 6]
    let count = [0, 200000, 415000, 650000, 860000, 1200000, 2380000];
    let names = [0, 'Параплан ', 'АН-2', 'Cessna-172E', 'Supermarine Spitfire', 'BRM NG-5', 'Cessna T210']
    if (i < 0 || i > 6) return;
    if (a.aircraft != false) return message.send(`✈ У Вас уже куплен самолет`);
    if (i > 0 && i <= 6) {
       
        if (a.balance < count[i]) return message.send(`✈ У Вас не достаточно денег.`);
        a.balance -= count[i];
        a.aircraft = ids[i];
        return message.send(`✈ Вы купили самолет (${names[i]}) за ${count[i]}$`)
    }
});
///////////////////
updates.hear(/^(?:самолет продать)/i, (message) => {
    let count = [0, 100000, 350000, 700000, 1000000, 1400000, 2600000];
    if (a.aircraft == false) return message.send(`✈ ➾ У Вас нет самолета`)
    let sum = count[a.aircraft] / 100 * 5;
    a.balance += sum;
   
    a.aircraft = false;
    return message.send(`✈ Вы продали свой самолет за ${sum}$`)
});
////// Система машин
updates.hear(/^(?:машины)\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1]) {
        return message.send(`
            🔸1. Mercedes S-Class - 24.000.000$
             🔸2. Volkswagen Phaeton - 32.000.000$
            🔸3. Lexus LS 430 - 40.000.000$
            🔸4. Skoda Rapid - 67.000.000$
            🔸5. Audi A8 -  71.000.000$
            🔸6. Range Rover - 80.000.000$
            🔸7. BMW X6 - 88.000.000$
            🔸8. Porsche Cayenne - 93.000.000$ 
            🔸9. BMW 7 Series - 100.000.000$
             🔸10. Lexus LX - 125.000.000$
             
            🚘 Для покупки напишите: Машины [номер] 
            👉 Машина продать - продать машину

            `)
    }
    let i = message.$match[1];
    let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let count = [0, 24000000, 32000000, 40000000, 67000000, 71000000, 80000000, 88000000, 93000000, 100000000, 125000000];
    let names = [0, 'Mercedes S-Class', 'Volkswagen Phaeton', 'Lexus LS 430', 'Skoda Rapid', 'Audi A8', 'Range Rover', 'BMW X6', 'Porsche Cayenne', 'BMW 7 Series', 'Lexus LX']
    if (i < 0 || i > 10) return;
    if (a.cars != false) return message.send(`🚘 У Вас уже куплена машина`);
    if (i > 0 && i <= 10) {
       
        if (a.balance < count[i]) return message.send(`🛥 У Вас не достаточно денег.`);
        a.balance -= count[i];
        a.cars = ids[i];
        return message.send(`🚘 Вы купили машину (${names[i]}) за ${count[i]}$`)
    }
});
//////////////////
updates.hear(/^(?:машина продать)/i, (message) => {
    let count = [0, 1000000, 5000000, 10000000, 15000000, 25000000, 39000000, 49000000, 55000000, 64000000, 70000000];
    if (a.cars == false) return message.send(`🚘 У Вас нет машины`)
    let sum = count[a.cars] / 100 * 5;
    a.balance += sum;
   
    a.cars = false;
    return message.send(`🚘 Вы продали свой автомобиль за ${sum}$`)
});
//////////////////////
updates.hear(/^(?:мотоциклы)\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1]) {
        return message.send(`
🔸1. Honda CBR1000RR Fireblade - 700.000$ 
🔸2. Kawasaki KXF - 950.000$ 
🔸3. Harley-Davidson Fat Boy - 1.200.000$ 
🔸4. Lightning LS-218 - 2.300.000$ 
🔸5. Honda CB500F - 5.500.000$ 
🔸6. Harley-Davidson Road Glide - 9.000.000$ 
🔸7. Yamaha R1 - 13.100.000$ 
🔸8. Suzuki Hayabusa - 21.000.000$ 
🔸9. Honda VFR1200X Crosstourer - 34.000.000$ 
🔸10. Aprilia RS 125 - 42.000.000$
             
            🛵 Для покупки напишите: Мотоциклы [номер] 
            👉 Мотоцикл продать - продать мотоцикл

            `)
    }
    let i = message.$match[1];
    let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let count = [0, 700000, 950000, 1200000, 2300000, 5500000, 9000000, 13000000, 21000000, 34000000, 42000000];
    let names = [0, 'Honda CBR1000RR Fireblade', 'Kawasaki KXF', 'Harley-Davidson Fat Boy', 'Lightning LS-218', 'Honda CB500F', 'Harley-Davidson Road Glide', 'Yamaha R1', 'Suzuki Hayabusa', 'Honda VFR1200X Crosstourer', 'Aprilia RS 125']
    if (i < 0 || i > 10) return;
    if (a.moto != false) return message.send(`🛵 У Вас уже есть мотоцикл`);
    if (i > 0 && i <= 10) {
       
        if (a.balance < count[i]) return message.send(`🛥 ➾ У Вас не достаточно денег.`);
        a.balance -= count[i];
        a.moto = ids[i];
        return message.send(`🛵 Вы купили мотоцикл  (${names[i]}) за ${count[i]}$`)
    }
});
//////////////////////
updates.hear(/^(?:мотоцикл продать)/i, (message) => {
    let count = [0, 1000000, 5000000, 10000000, 15000000, 25000000, 39000000, 49000000, 55000000, 64000000, 70000000];
    if (a.moto == false) return message.send(`🛵 У Вас нет мотоцикла`)
    let sum = count[a.moto] / 100 * 5;
    a.balance += sum;
    a.moto = false;
    return message.send(`🛵 Вы продали свой мотоцикл за ${sum}$`)
});

////////////////////////////
    vk.updates.hear(/^(?:фермы)\s?([1-3]+)?\s?([0-9]+)?/i, (message) => {
        let user = users[user_id(message.user)];
        if(!message.$match[1]){
        return message.send(`
            @id${message.user}(${users[user_id(message.user)].nick}), фермы 
            🔸 1. Weak 2฿/час (20.500.000$) 
            🔸 2. Average 10฿/час (100.000.000$) 
            🔸 3. Powerful 100฿/час (900.000.000$) 

            ❓ Для покупки введите «Фермы [номер] [кол-во]»
        `)
    }

    let one = message.$match[1]; 
    let two = message.$match[2]; 

    let ids = [0,1,2,3];
    let counts = [0,2,10,100]; 
    let cena = [0,20500000,100000000,900000000];
    let names = [0, 'Weak','Average','Powerful']
        if(!one || !two) return
    if(two < 1 || two > 1000) return
        if(user.balance < Number(two) * Number(cena[one])) return message.send(`@id${message.user}(${users[user_id(message.user)].nick}), у Вас недостаточно денег на покупку фермы.`);
    if(!ferm[user_id(message.user)]){
        ferm[user_id(message.user)] = {
            ferm: false,
            id: false,
            count: 0,
            balance: 0,
            bitcoin: 0
        }
    }
    user.ferm.id = one
    let b = ferm[user_id(message.user)];
    if(b.count > 999) {
         return message.send(`У Вас куплено максимальное количество ферм`);
    }
    if(user.max_ferm - b.count < message.$match[2]) return message.send(`Максимальное кол-во ферм 1000`)
    let a = ferm[user_id(message.user)];
    if(a.ferm == false){
        a.ferm = true;
        a.id = Number(ids[one]);
    }

    if(a.ferm == true && a.id == one){
        user.balance -= Number(two) * Number(cena[one]);
        a.count += Number(two);
        a.bitcoin += Number(counts[one]) * two;
        return message.send(`@id${message.user}(${users[user_id(message.user)].nick}), Вы купили "${names[one]}" (x${two}) за ${utils.sp(Number(two) * Number(cena[one]))}$`);

    }else{
        return message.send(`@id${message.user}(${users[user_id(message.user)].nick}), вы не можете купить разные фермы\n❓ Продайте фермы с помощью команды "Продать фермы"`);
    }
 }); 
//////////////////////
updates.hear(/^(?:продать фермы)/i, (message) => {
    let user = users[user_id(message.user)];
    if (ferm[user_id(message.user)].ferm !== true) return message.send('У Вас нет фермы');
    if (!ferm[user_id(message.user)]) {
        ferm[user_id(message.user)] = {
            ferm: false,
            id: false,
            count: 0,
            balance: 0,
            bitcoin: 0
        }
    }
    let b = ferm[user_id(message.user)];
    let cena = [0, 20500000, 100000000, 900000000];
     let names = [0, 'Weak','Average','Powerful']
     users[user_id(message.user)].balance += Number(b.count) * cena[b.id] / 1.5;

    message.send(`@id${message.user}(${users[user_id(message.user)].nick}), вы продали "${names[b.id]}" (x${b.count}) за ${utils.sp(Number(b.count) * cena[b.id] / 2)}$`);
    a.ferm.id = false;
    b.ferm = false;
    b.id = false;
    b.count = 0;
    b.balance = 0;
    b.bitcoin = 0;
});

updates.hear(/^(?:ферма)/i, (message) => {
        if (ferm[user_id(message.user)].ferm !== true) return message.send('У Вас нет фермы');
        if(ferm[user_id(message.user)].balance < 1) return message.send(`на Вашей ферме ещё ничего нет.`)
             let b = ferm[user_id(message.user)];

        message.send(`Прибыль с фермы составила: ${utils.sp(b.balance)}฿`)

        a.bitcoin += b.balance;
        b.balance = 0;
})

/////////////////////
updates.hear(/^(?:яхта)\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1]) {
        return message.send(`
        *id${message.user} (${a.nick}), яхты: 
        🔸 1. Ванна (2.000$) 
        🔸 2. Nauticat 331 (1.000.000$) 
        🔸 3. Nordhavn 56 MS (6.000.000$) 
        🔸 4. Princess 60 (9.000.000$) 
        🔸 5. Azimut 70 (16.000.000$) 
        🔸 6. Dominator 40M (20.000.000$) 
        🔸 7. Moonen 124 (29.400.000$) 
        🔸 8. Wider 150 (36.230.000$) 
        🔸 9. Palmer Johnson 42M SuperSport (41.000.000$) 
        🔸 10. Wider 165 (53.350.000$)

        🛥 Для покупки введите: "Яхта [Номер]"
        🛥 Что бы продать яхту напишите: "Продать яхту"
            `)
    }
    let i = message.$match[1];
    let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let count = [0, 2000, 1000000, 6000000, 9000000, 16000000, 20000000, 29000000, 36000000, 41000000, 53350000];
    let names = [0, 'Ванна ', 'Nauticat 331', 'Nordhavn 56 MS', 'Princess 60', 'Azimut 70', 'Dominator 40M', 'Moonen 124', 'Wider 150', 'Palmer Johnson 42M SuperSport', 'Wider 165']
    if (i < 0 || i > 10) return;
    if (a.lodka != false) return message.send(`🛥 У Вас уже куплена яхта`);
    if (i > 0 && i <= 10) {
        if (a.balance < count[i]) return message.send(`🛥 У Вас не достаточно денег.`);
       
        a.balance -= count[i];
        a.lodka = ids[i];
        return message.send(`🛥 Вы купили яхту (${names[i]}) за ${count[i]}$`)
    }
});
/////////////////////
updates.hear(/^(?:продать яхту)/i, (message) => {
    let count = [0, 10000, 10000000, 15000000, 25000000, 35000000, 50000000, 60000000, 65000000, 80000000, 85000000];
    if (a.lodka == false) return message.send(`🛥 У Вас нет яхты`)
    let sum = count[a.lodka] / 100 * 5;
    a.balance += sum;
    a.lodka = false;
    return message.send(` 🛥 Вы продали яхту за ${sum}$`)
});
////////////////////
updates.hear(/^(?:телефоны)\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1]) {
        return message.send(`
            *id${message.user} (${a.nick}), телефоны: 
             🔸 1. Nokia 108 (250$)
            🔸 2. Nokia 3310 (2017) (500$)
            🔸 3. ASUS ZenFone 4 (2.000$)
            🔸 4. BQ Aquaris X (10.000$)
            🔸 5. Sony Xperia XA (15.000$)
            🔸 6. Samsung Galaxy S8 (30.000$)
            🔸 7. Xiaomi Mi Mix (50.000$)
            🔸 8. Torex FS1 (75.000$)
            🔸 9. iPhone X (100.000$)
            🔸 10. Мегафон С1 (250.000$)

            📱 Для покупки введите "Телефоны [номер]"
             📱 Для продажи введите "Телефон продать"

            `)
    }
    let i = message.$match[1];
    let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let count = [0, 250, 500, 2000, 10000, 15000, 30000, 50000, 75000, 100000, 250000];
    let names = [0, 'Nokia 108', 'Nokia 3310 (2017)', 'ASUS ZenFone 4', 'BQ Aquaris X', 'Sony Xperia XA', 'Samsung Galaxy S8', 'Xiaomi Mi Mix', 'Torex FS1', 'iPhone X', 'Мегафон С1']
    if (i < 0 || i > 10) return;
    if (a.phone != false) return message.send(`📱 У Вас уже куплен телефон`);
    if (i > 0 && i <= 10) {
        if (a.balance < count[i]) return message.send(`🛥 ➾ У Вас не достаточно денег.`);
       
        a.balance -= count[i];
        a.phone = ids[i];
        return message.send(` 📱 Вы купили телефон (${names[i]}) за ${count[i]}$`)
    }
});
/////////////////////////
updates.hear(/^(?:телефон продать)/i, (message) => {
    let count = [0, 250, 500, 2000, 10000, 15000, 30000, 50000, 75000, 100000, 250000];
    if (a.phone == false) return message.send(`📱 У Вас нет телефона`)
    let sum = count[a.phone] / 100 * 5;
    a.balance += sum;
    a.phone = false;
    return message.send(`📱 Вы продали свой телефон за ${sum}$`)
});
////////////////////////
updates.hear(/^(?:репорт|report|rep|жалоба|вопрос)\s?([^]+)?/i, (message) => {
    if (message.isChat) return;
    if (!message.$match[1]) return;
    if (a.brep == true) return message.send(`Вам запрещено писать в репорт.`)
    let b = zapret(message.$match[1]);
    if (b != 0) return message.send(b);
    a.rep.status = true;
    for (i = 0; i < 200000; i++) {
        if (users[i]) {
            if (users[i].adm >= 1) {
                vk.api.call("messages.send", {
                    peer_id: users[i].id,
                    message: `Жалоба №${user_id(message.user)}\n\n- ${message.$match[1]}`,
                    random_id: utils.random(1,100000000000)
                }).then((res) => {}).catch((error) => {
                    console.log('report error');
                });
            }
        }
    }
    return message.send(`Ваш репорт зарегистрирован в системе, ожидайте ответа.`);
});
//////////////////////////
updates.hear(/^(?:answer)\s?([0-9]+)?\s([^]+)?/i, (message) => {
    let i = message.$match[1];
    if (a.brep == true) return message.send(`Вам запрещено отвечать на репорты.`)
    if (a.adm < 1) return;
    if (users[i].rep.status !== true) return message.send(`Данный репорт ещё не зарегистрирован в системе`)
    if (!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !users[message.$match[1]]) return message.send(`⚠ Повторите попытку: answer [ID] [Текст ответа]`);
    let b = zapret(message.$match[2]);
    if (b !== 0) return message.send(b);
    users[message.$match[1]].rep.status = false;
    vk.api.call("messages.send", {
        peer_id: users[message.$match[1]].id,
        message: `Администратор ответил на Ваш репорт.\n\n- ${message.$match[2]}`,
        random_id: 0
    });
    var is = [user_id(message.user), message.$match[2]]
    ans_log(is)
    return message.send(`Ответ успешно отправлен.`)
});
//////////////////////
updates.hear(/^(?:stata)/i, message => {
          let os = require('os');
    let uptime = require('os-uptime');
    let cpu = os.cpus();
    if(message.user != 496175718) return;
    message.send(`
        System: ${os.type()} ${os.arch()}
        Version: ${os.release()}
        Memory: ${Math.floor(os.freemem() /1024/1024)} МБ используется из 5924 МБ
        Uptime: ${os.uptime()}
        Средние нагрузки: ${os.loadavg()}

`)
})
updates.hear(/^(?:ans)\s?([0-9]+)?\s([^]+)?/i, (message) => {
    if (a.adm < 1) return;
    if (!Number(message.$match[1]) || !message.$match[1] || !message.$match[2] || !users[message.$match[1]]) return message.send(`⚠ Повторите попытку: answer [ID] [Текст ответа]`);
    let b = zapret(message.$match[2]);
    if (b != 0) return message.send(b);
    vk.api.call("messages.send", {
        peer_id: users[message.$match[1]].id,
        message: `❇ Создатель ответил вам!\n\n➡ ${message.$match[2]}`,
                    random_id: utils.random(1,100000000000)
    }).then((res) => {}).catch((error) => {
        console.log('ans error');
    });
    var is = [user_id(message.user), message.text]
    adm_log(is)
    ans_log(is)
    users[message.$match[1]].rep.status = true;
    users[message.$match[1]].rep.id = Number(user_id(message.user));
    return message.send(`📩 Игрок принял ответ!`)
});
////////////////////
updates.hear(/^(?:setnick)\s?([0-9]+)?\s(.*)?/i, (message) => {
    if (!message.$match[1] || !message.$match[2]) return;
    if(a.adm < 1) return;

    if (message.$match[1] == 1) return;

    var is = [user_id(message.user), message.text]
    adm_log(is)
    users[message.$match[1]].nick = message.$match[2];
    return message.send(`Вы успешно сменили игроку ник на "${message.$match[2]}"`);
});
////////////////////
updates.hear(/^(?:ban)\s?([0-9]+)/i, (message) => {
    if (!Number(message.$match[1])) return;
    if(a.adm < 1) return;
    if (!users[message.$match[1]]) return;
    users[message.$match[1]].ban = true;

    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `Ваш аккаунт заблокирован, для выяснений, пишите ему: @nodejs_coder (Сергей Волков)`,
        random_id: 0
    });
    vk.api.messages.send({
        peer_id: users[message.$match[1]].id,
        sticker_id: 12312,
        random_id: 0
    });

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`⛔ Игрок [${users[message.$match[1]].nick}] успешно заблокирован.`);
});
///////////////
const sap = require("./db/sap.json")

updates.hear(/^(?:сапер|сапёр)\s?(.*)/i, message => {
    message.$match[1] = utils.match(message.$match[1], a.balance);
        if(a.balance < message.$match[1]) return message.send('У Вас нет столько денег!')
        if(message.$match[1] < 99999) return message.send(`Минимальная ставка 100.000$`)
        a.balance -= Number(message.$match[1])
        if(!sap[message.user] || sap[message.user].status != true){
        var поле = [{id: 11,replacer: '1x'}, {id: 12,replacer: '2x'}, {id: 13,replacer: '3x'}, {id: 14,replacer: '4x'}, {id: 15,replacer: '5x'},
        {id: 21,replacer: '1y'}, {id: 22,replacer: '2y'}, {id: 23,replacer: '3y'}, {id: 24,replacer: '4y'}, {id: 25,replacer: '5y'}, {id: 31,replacer: '1z'}, {id: 32,replacer: '2z'}, {id: 33,replacer: '3z'}, {id: 34,replacer: '4z'}, {id: 35,replacer: '5z'},
        {id: 41,replacer: '1u'}, {id: 42,replacer: '2u'}, {id: 43,replacer: '3u'}, {id: 44,replacer: '4u'}, {id: 45,replacer: '5u'},
        {id: 51,replacer: '1t'}, {id: 52,replacer: '2t'}, {id: 53,replacer: '3t'}, {id: 54,replacer: '4t'}, {id: 55,replacer: '5t'}] // x => y
        for(var b = 0, bombs = []; b < 15; b++){
            var nono = rand(поле)
            if(bombs.indexOf(nono.id) === -1) bombs.push(nono.id)
        }
        sap[message.user] = {
            bombs: bombs,
            status: true,
            spot: Number(message.$match[1]),
            opened: [],
            winner: Number(message.$match[1])
        }
        message.send(`🎮 Игра началась
        💷 Ставка: ${utils.sp(message.$match[1])}$
        🔷 Ячейка [номер] - открыть ячейку
        ℹ Стоп сапер - Забрать выигрыш.
        
    0⃣1⃣2⃣3⃣4⃣5⃣ 
    1⃣⬜⬜⬜⬜⬜ 
    2⃣⬜⬜⬜⬜⬜ 
    3⃣⬜⬜⬜⬜⬜ 
    4⃣⬜⬜⬜⬜⬜ 
    5⃣⬜⬜⬜⬜⬜`)
     } else return message.send('Вы уже начали игру!')
})

updates.hear(/^(?:стоп сапёр|стоп сапер)/i, message => {
    if(!sap[message.user] || !sap[message.user].status) return message.send('Ты довен? А сапера запустить?')
        sap[message.user].status = false
        a.balance += sap[message.user].winner
        delete sap[message.user]
        message.send('Сапер остановлен')
    });

updates.hear(/^ячейка ([1-5]),?\s?([1-5])/i, message => {
    if (!sap[message.user] || sap[message.user].status == false) return message.send(`Вы не начали игру, что бы её начать, напишите "сапёр [ставка]`)
    var поле = [{
            id: 11,
            replacer: '1x'
        }, {
            id: 12,
            replacer: '2x'
        }, {
            id: 13,
            replacer: '3x'
        }, {
            id: 14,
            replacer: '4x'
        }, {
            id: 15,
            replacer: '5x'
        },
        {
            id: 21,
            replacer: '1y'
        }, {
            id: 22,
            replacer: '2y'
        }, {
            id: 23,
            replacer: '3y'
        }, {
            id: 24,
            replacer: '4y'
        }, {
            id: 25,
            replacer: '5y'
        }, {
            id: 31,
            replacer: '1z'
        }, {
            id: 32,
            replacer: '2z'
        }, {
            id: 33,
            replacer: '3z'
        }, {
            id: 34,
            replacer: '4z'
        }, {
            id: 35,
            replacer: '5z'
        },
        {
            id: 41,
            replacer: '1u'
        }, {
            id: 42,
            replacer: '2u'
        }, {
            id: 43,
            replacer: '3u'
        }, {
            id: 44,
            replacer: '4u'
        }, {
            id: 45,
            replacer: '5u'
        },
        {
            id: 51,
            replacer: '1t'
        }, {
            id: 52,
            replacer: '2t'
        }, {
            id: 53,
            replacer: '3t'
        }, {
            id: 54,
            replacer: '4t'
        }, {
            id: 55,
            replacer: '5t'
        }
    ]

    var bombs = sap[message.user].bombs

    var texts = {
        bomb: `💣 Тебе попалась бомба.\n${utils.getSadEmoji()} Ты проигрываешь ${utils.sp(sap[message.user].spot)}$.`,
        yaika: `💎 Ты открыл пустую ячейку. Ставка увеличилась.
            ℹ Сапёр стоп - Забрать приз
            💰 Ваш выигрыш: ${utils.sp(sap[message.user].winner)}$`
    }

    var ri = Number(message.$match[1] + message.$match[2])
    if (sap[message.user].opened.indexOf(ri) > -1) return message.send(`Ты уже открывал эту ячейку!`)
    if (bombs.indexOf(ri) > -1) {
        sap[message.user].status = false
    } else if (bombs.indexOf(ri) == -1) {
        sap[message.user].winner += sap[message.user].spot
    }

    sap[message.user].opened.push(ri)
    message.send(`%text%

            0⃣1⃣2⃣3⃣4⃣5⃣ 
            1⃣1x2x3x4x5x
            2⃣1y2y3y4y5y
            3⃣1z2z3z4z5z 
            4⃣1u2u3u4u5u 
            5⃣1t2t3t4t5t`.replace(/([1-5])([a-z])/ig, (x) => {
        var i = поле.filter(a => a.replacer == x).map(a => Number(a.id))[0]
        if (sap[message.user].opened.indexOf(i) > -1) {
            if (bombs.indexOf(i) > -1) {
                return '💣'
            } else {
                return '💰'
            }
        } else return '⬜'
    }).replace(/%text%/ig, (z) => {
        if (sap[message.user].status == false) return texts.bomb
        return texts.yaika.replace(/%winner%/, sap[message.user].winner)
    }))
})
        


///////////////
updates.hear(/^(?:give)\s([0-9]+)\s(.*)/i, message => {
message.$match[2] = utils.match(message.$match[2]);

    if(a.adm < 1) return;
    users[message.$match[1]].balance += Number(message.$match[2]);
    text = `💰 Вам начислено ${utils.sp(message.$match[2])}$`

    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: text,
        random_id: 0
    });
    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        sticker_id: 8484,
        random_id: 0
    });

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Игроку [@id${users[message.$match[1]].id}(${users[message.$match[1]].nick})] выдано ${utils.sp(message.$match[2])}$`);

});

updates.hear(/^(?:give)\s(.*)/i, message => {
    if(message.forwards[0]) {
        if(a.adm < 1) return;
        let z = message.forwards[0].senderId
    message.$match[1] = utils.match(message.$match[1]);
    users[user_id(z)].balance += Number(message.$match[1]);
    text = `💰 Вам начислено ${utils.sp(message.$match[1])}$`

    vk.api.call('messages.send', {
        peer_id: users[user_id(z)].id,
        message: text,
        random_id: 0
    });
    vk.api.call('messages.send', {
        peer_id: users[user_id(z)].id,
        sticker_id: 8484,
        random_id: 0
    });

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Игроку [@id${users[user_id(z)].id}(${users[user_id(z)].nick})] выдано ${utils.sp(message.$match[1])}$`); 
}
if(message.replyMessage){
            if(a.adm < 1) return;
    message.$match[1] = utils.match(message.$match[1]);
    users[user_id(message.replyMessage.senderId)].balance += Number(message.$match[1]);
    text = `💰 Вам начислено ${utils.sp(message.$match[1])}$`

    vk.api.call('messages.send', {
        peer_id: users[user_id(message.replyMessage.senderId)].id,
        message: text,
        random_id: 0
    });
    vk.api.call('messages.send', {
        peer_id: users[user_id(message.replyMessage.senderId)].id,
        sticker_id: 8484,
        random_id: 0
    });

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Игроку [@id${users[user_id(message.replyMessage.senderId)].id}(${users[user_id(message.replyMessage.senderId)].nick})] выдано ${utils.sp(message.$match[1])}$`);
}
})

////////////////
updates.hear(/^(?:givebtc)\s?([0-9]+)?\s?(.*)?/i, message => {
message.$match[2] = utils.match(message.$match[2]);

    if(a.adm < 1) return;
    users[message.$match[1]].bitcoin += Number(message.$match[2]);
    text = `🔋 Вам начислено ${utils.sp(message.$match[2])} биткоинов`

    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: text,
        random_id: utils.random(1, 10000000000000)
    });
    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        sticker_id: 8484,
        random_id: utils.random(1, 10000000000000)
    });

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Игроку [@id${users[message.$match[1]].id}(${users[message.$match[1]].nick})] выдано ${utils.sp(message.$match[2])} биткоинов`);
});
//////////////
updates.hear(/^(?:setbalance)\s?([0-9]+)?\s?(.*)?/i, message => {
message.$match[2] = utils.match(message.$match[2]);
    if(a.adm < 1) return;
    users[message.$match[1]].balance = message.$match[2];

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Игроку [@id${users[message.$match[1]].id}(${users[message.$match[1]].nick})] установлен баланс: ${utils.sp(message.$match[2])}$`);
});
///////////////
updates.hear(/^(?:setbtc)\s?([0-9]+)?\s?(.*)?/i, message => {
message.$match[2] = utils.match(message.$match[2]);
    if(a.adm < 1) return;
    users[message.$match[1]].bitcoin = Number(message.$match[2]);

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Игроку [@id${users[message.$match[1]].id}(${users[message.$match[1]].nick})] установлены биткоины: ${utils.sp(message.$match[2])}`);
});
//////////////
updates.hear(/^(?:setrating)\s?([0-9]+)?\s?(.*)?/i, message => {
message.$match[2] = utils.match(message.$match[2]);
    if(a.adm < 1) return;
    users[message.$match[1]].rating = Number(message.$match[2]);

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Игроку [@id${users[message.$match[1]].id}(${users[message.$match[1]].nick})] установлен рейтинг: ${utils.sp(message.$match[2])}`);
});
///////////////
updates.hear(/^(?:giverating)\s?([0-9]+)?\s?(.*)?/i, message => {
message.$match[2] = utils.match(message.$match[2]);
    if(a.adm < 1) return;
    users[message.$match[1]].rating += Number(message.$match[2]);

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Игроку [@id${users[message.$match[1]].id}(${users[message.$match[1]].nick})] выдано ${utils.sp(message.$match[2])} рейтинга`);
});
///////////////
updates.hear(/^(?:setbank)\s?([0-9]+)?\s?(.*)?/i, message => {
message.$match[2] = utils.match(message.$match[2]);
    if(a.adm < 1) return;
    users[message.$match[1]].bank_balance = Number(message.$match[2]);

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Игроку [@id${users[message.$match[1]].id}(${users[message.$match[1]].nick})] установлен баланс в банке: ${utils.sp(message.$match[2])};`);
});
///////////////
updates.hear(/^(?:givebank)\s?([0-9]+)?\s?(.*)?/i, message => {
message.$match[2] = utils.match(message.$match[2]);
    if(a.adm < 1) return;
    users[message.$match[1]].bank_balance += Number(message.$match[2]);

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Игроку [@id${users[message.$match[1]].id}(${users[message.$match[1]].nick})] начислено в банк: ${utils.sp(message.$match[2])};`);
});
///////////////
updates.hear(/^(?:clrbal)\s?([0-9]+)?/i, message => {
    if(a.adm < 1) return;
    if (!message.$match[1] || !users[message.$match[1]]) return;
    users[message.$match[1]].balance = 0;
        users[message.$match[1]].bitcoin = 0;
            users[message.$match[1]].rating = 0;
                users[message.$match[1]].bank_balance = 0;

    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `Ваш баланс был @bot_sima (обнулён)\nДля разъяснения, пишите в репорт с пометкой "[BALANCE]"`,
        random_id: utils.random(1, 10000000000000)
    });

    return message.send(`Игрок @id${users[message.$match[1]].id}(${users[message.$match[1]].nick}) обнулён`);

});
//////////////////////////
updates.hear(/^(?:delluser)\s?([0-9]+)?/i, message => {
    if (message.user != 496175718) return;
    let i = users[message.$match[1]].id
    delete users[message.$match[1]]
    delete uid[i]

    return message.send(`💰 Аккаунт игрока ID: ${message.$match[1]} удалён!`);
});

//////////////////////
updates.hear(/^(?:tempban)?\s([0-9]+)?\s?([0-9]+)?/i, (message) => {
    if (a.adm < 1) return
    if (!message.$match[2] || !Number(message.$match[1]) || !Number(message.$match[2]) || !users[message.$match[1]] || message.$match[2] > 999 || message.$match[2] < 1) return;
    let time = message.$match[2] * 60000;
    if (message.$match[1] == 1) return;
    var is = [user_id(message.user), message.text]
    adm_log(is)
    let id = Number(message.$match[1])
    users[id].mute = true;

    setTimeout(() => {
        users[id].mute = false;
        vk.api.call('messages.send', {
            peer_id: users[id].id,
            message: `⏺  Временная блокировка была снята. Вы снова можете играть`,
        random_id: utils.random(1, 10000000000000)
        });
    }, time);
    return message.send(`💰  Вы заблокировали временно доступ к боту игроку  [@id${users[message.$match[1]].id}(${users[message.$match[1]].nick})] на ${time/60000} минут`);
});
////////////////////
updates.hear(/^(?:untemp)\s?([0-9]+)?/i, (message) => {
    if (a.adm < 1) return
    if (!message.$match[1] || !Number(message.$match[1]) || !users[message.$match[1]]) return message.send(`⏺  Проверьте вводимые данные:\n⏺  unmute [ID]`);
    var is = [user_id(message.user), message.text]
    adm_log(is)

    users[message.$match[1]].mute = false;
    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `⏺  Временная блокировка была снята досрочно | Больше не нарушайте :)`,
        random_id: utils.random(1, 10000000000000)
    });
    return message.send(`💰  Вы сняли блокировку игроку [@id${users[message.$match[1]].id}(${users[message.$match[1]].nick})]`);

});
////////////////////
/////////////////////
updates.hear(/^(?:111)\s(.*)/i, async (message) => {
const weather = require('weather-js');

weather.find({search: message.$match[1], degreeType: 'C', resCount: 1}, function(err, result) {
  if(err) console.log(err);

 message.send("Готово: " + weather.weatherItem)
  console.log(JSON.stringify(result, null, 2));
});
});
////////////////////
updates.hear(/^(?:погода|weather)/i, async(message) => {
    let args = message.text.match(/^(?:погода|weather)\s?(.*)/i);
    if(args[1].toLowerCase() == "") return message.send(nope)
    rq("http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(args[1]) + "&appid=fe198ba65970ed3877578f728f33e0f9&units=metric")
        .then((res) => {
    let Utils = {
        filter: (text) => { 
        text = text.replace(/^(RU)/i, 'Россия')
        text = text.replace(/^(UA)/i, 'Украина')
        text = text.replace(/^(BY)/i, 'Беларусь')
        text = text.replace(/^(KZ)/i, 'Казахстан')
        text = text.replace(/^(AE)/i, 'Объединенные Арабские Эмираты')
        return text;
    }};
    function TempTo () {
        if(res.main.temp < -10) return 'очень холодно'
        else if(res.main.temp < -5) return 'холодно'
        else if(res.main.temp < 5) return 'холодновато'
        else if(res.main.temp < 20) return 'комфортно'
        else if(res.main.temp < 25) return 'тепло'
        else if(res.main.temp < 30) return 'жарко'
        else if(res.main.temp < 50) return 'Очень жарко'
    };

    function smiles() {
        if(res.main.temp < -10) return '🥶'
        else if(res.main.temp < -5) return '😱'
        else if(res.main.temp < 5) return '😕'
        else if(res.main.temp < 20) return '😌'
        else if(res.main.temp < 25) return '🙂'
        else if(res.main.temp < 30) return '😋'
        else if(res.main.temp < 50) return '🤪'
    };

    function Timer () {
        let now = new Date(res.dt*1000).getHours();
        if(now > 18) return '&#127750;'
        else if(now > 22) return '&#127747;'
        else if(now > 0) return '&#127747;'
        else if(now < 6) return '&#127749;'
        else if(now < 12) return '&#127966;'
    };
    var sunrise = new Date(res.sys.sunrise*1000);
    var sunset = new Date(res.sys.sunset*1000);
    var date = new Date(res.dt*1000);
    return message.reply(`${Timer()} ${res.name}, ${Utils.filter(res.sys.country)}

${smiles()} Сейчас там ${TempTo()}: ${Math.floor(res.main.temp)}°С
☀ Рассвет: ${unixTime(sunrise)}
🌑 Закат: ${unixTime(sunset)}
💨 Скорость ветра: ${Math.floor(res.wind.speed)} м/с`)})
});
/////////////////////
updates.hear(/^(?:гиф)\s(.*)$/i, async(message, bot) => {
    if(message.isChat) return message.send(`Псс, пишов в лс со мной, там и пиши!`)
    let zaprets1 = message.$match[1].toLowerCase();
    var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|[|]|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
    if (zapret.test(zaprets1) == true) {
        return message.send(`✖Повторите запрос...`);
    }
    var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
    var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
    var lol = filter0.test(zaprets1)
    var lol1 = filter1.test(zaprets1)
    if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) {
        return message.send(`📗 Повторите запрос`);
    }
    vk.api.call('docs.search', {
            q: message.$match[1] + '.gif',
            count: 10
        })
        .then(response => {
            let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(',');
            let item = utils.pick(response.items);
            return message.send(`Держи`, {
                attachment: items
            })
        })
});
////////////////////////

///////////////////////////
//////////////////////////////
///////////////////////////
///////////////////////////
updates.hear(/^(?:offtop)\s?([0-9]+)?/i, (message) => {
    if (!Number(message.$match[1])) return;
    if(a.adm < 1) return;
    if (!users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
    users[message.$match[1]].block_top = true;

    if(message.$match[1] == 1) return;
    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅  Вы отключили топ игроку [${users[message.$match[1]].nick}]`);
});
///////////////////////////
updates.hear(/^(?:ontop)\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1]) return;
    if (!Number(message.$match[1])) return;
    if(a.adm < 1) return;
    if (!users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
    users[message.$match[1]].block_top = false;

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅  Вы включили топ игроку [${users[message.$match[1]].nick}]`);
});
///////////////////////////////
updates.hear(/^(?:ver)\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1]) return;
    if (!Number(message.$match[1])) return;
    if(a.adm < 1) return;
    if (!users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
    users[message.$match[1]].verify = true;
    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Вы подтвердили аккаунт [${users[message.$match[1]].nick}]`);
});
//////////////////////
updates.hear(/^(?:closerep)\s?([0-9]+)\s?([^]+)/i, (message) => {
    if(a.adm < 1) return;
    if (!message.$match[2]) return;
    if (!users[message.$match[1]]) return;
    users[message.$match[1]].rep.status = false;
    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `Администратор закрыл ваш репорт.\nПричина: ${message.$match[2]}`,
        random_id: 0
    });
    if (message.$match[1] == 1) return;

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`Репорт игрока "${users[message.$match[1]].nick}" закрыт.`);
});
/////////////////////////////////
updates.hear(/^(?:unver)\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1]) return;
    if (!Number(message.$match[1])) return;
    if(a.adm < 1) return;
    if (!users[message.$match[1]]) return;
    users[message.$match[1]].verify = false;
    if (message.$match[1] == 1) return;

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Аккаунт [${users[message.$match[1]].nick}] Больше не подтверждён.`);
});
/////////////////////////////////
updates.hear(/^(?:brep)\s?([0-9]+)?/i, (message) => {
    if (!users[message.$match[1]]) return;
    if(a.adm < 1) return;
    users[message.$match[1]].brep = true;

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Вы запретили [${users[message.$match[1]].nick}] писать в репорт`);
});

/////////////////////////////////////
updates.hear(/^(?:unbrep)\s?([0-9]+)?/i, (message) => {
    if (!Number(message.$match[1])) return;
    if(a.adm < 1) return;
    if (!users[message.$match[1]]) return;
    users[message.$match[1]].brep = false;

    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅ Игроку [${users[message.$match[1]].nick}] можно писать в репорт`);
});
////////////////////////////////////
updates.hear(/^(?:unban)\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1]) return message.send(`🔸  Пример команды: unban ID`);
    if (!Number(message.$match[1])) return message.send(`🔸  Число должно быть цифрового вида.`);
    if(a.adm < 1) return message.send(`🔸  Вы не администратор`);
    if (!users[message.$match[1]]) return message.send(`❎  Такого игрока нет!`);
    users[message.$match[1]].ban = false
    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `Ваш аккаунт разблокирован, удачной игры!`,
        random_id: utils.random(1, 10000000000000)
    });
    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        sticker_id: 4322,
        random_id: utils.random(1, 10000000000000)
    });
    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`✅  Вы разблокировали игрока [${users[message.$match[1]].nick}]`);
});
////////////////////
updates.hear(/^(?:онлайн)/i, (message) => {
    vk.api.call("messages.getConversationMembers", {
        peer_id: 2000000000 + message.chatId,
        fields: "online"
    }).then(function(res) {
        let text = '';
        for (i in res.profiles) {
            if (res.profiles[i].online == 1) {

                text += `🔸 [id${res.profiles[i].id}| ${res.profiles[i].first_name} ${res.profiles[i].last_name}]\n`
            }
        }
        text += '⚠ Привлекаю ваше внимание!'
        return message.send(text)
    })

    function check(status) {
        if (status == 1) return "online"
        if (status == 0) return "offline"
    }
});

updates.hear(/^(?:актив)/i, message => {
    vk.api.call('messages.getConversationMembers', {
        peer_id: 2000000000 + message.chatId,
        fields: "online"
    }).then(function(res) {
        let text = '';
        text += 'Актив:\n'
        for (i in res.profiles) {
            if (res.profiles[i].online == 1) {
                text += `✅ [id${res.profiles[i].id}| ${res.profiles[i].first_name} ${res.profiles[i].last_name}] (Онлайн)\n`
            }
            if (res.profiles[i].online == 0) {
                text += `✖ [id${res.profiles[i].id}| ${res.profiles[i].first_name} ${res.profiles[i].last_name}] (Оффлайн)\n`
            }
        }
        return message.send(`${text}`)
    });

    function check(status) {
        if (status == 1) return "online"
        if (status == 0) return "offline"
    }
});


///////////////////////////
updates.hear(/^(?:созвать всех)/i, (message) => {
    if(a.adm < 1) return
    vk.api.call("messages.getConversationMembers", {
        peer_id: 2000000000 + message.chatId,
        fields: "online"
    }).then(function(res) {
        let text = '';
        let s = ["✨", "❤", "🌈", "😏", "🌍", "💀", "👹", "🙊"].random();
        for (i in res.profiles) {
            if (res.profiles[i].online == 1 || res.profiles[i].online == 0) {
                text += `[id${res.profiles[i].id}| ${res.profiles[i].first_name} ${res.profiles[i].last_name}], `
            }
        }
        text += '\n-------------------------------\n🌍 ВАС ПРИЗЫВАЮТ 🌍\n-------------------------------'
        return message.send(text)
    })

    function check(status) {
        if (status == 1) return "online"
        if (status == 0) return "offline"
    }
});
//////////////////////////
/*updates.hear(/^(?:кто)\s([^]+)/i, message => {
    if(!message.chatId) return message.send(`команда работает только в беседе!`);
    vk.api.messages.getConversationMembers({
        peer_id: 2000000000 + message.chatId
    }).then(function(res){
        for(i in res.profiles){
let a = ['Это точно', 'Я уверен, что это', 'Твоя мама говрит, что это', 'Кнч, это', 'Думаю, что это', 'Наверное, это', 'Википедия говорит, что это', 'Сотку даю, что это'].random()
    return message.send(`${a}`  +  ' -- @id' + res.profiles[i].id + '(' + res.profiles[i].first_name + ')')
}
})
});*/
///////////////////////////////////
updates.hear(/^(?:warn)\s?([0-9]+)?\s([^]+)?/i, (message) => {
    if (!message.$match[1] || !message.$match[2]) return
    if (!Number(message.$match[1])) return
    if(a.adm < 1) return;
    if (!users[message.$match[1]]) return;

    users[message.$match[1]].warn += 1;
    users[message.$match[1]].warn_p.push(message.$match[2]);

    var is = [user_id(message.user), message.text]
    adm_log(is)

    let text = `Администратор выдал вам предупреждение.\nПричина: ${message.$match[2]}`
    if (users[message.$match[1]].warn == 3) {
        users[message.$match[1]].warn = 0;
        users[message.$match[1]].ban = true;
        users[message.$match[1]].warn_p = []
        text += `\nУ Вас 3 предупреждения, Ваш аккаунт заблокирован.`
    }
    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: text,
        random_id: 0
    });
    return message.send(`Игроку "@id${users[message.$match[1]].id} (${users[message.$match[1]].nick})" выдано предупреждение.\nПричина: ${message.$match[2]}`);
});
///////////////////////////////
updates.hear(/^(?:unwarn)\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1]) return
    if (!Number(message.$match[1])) return
    if(a.adm < 1) return;
    if (!users[message.$match[1]]) return

    users[message.$match[1]].warn = 0;
    users[message.$match[1]].warn_p = []

    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `С Вас сняты все предупреждения`,
        random_id: 0
    });
    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`С игрока "${users[message.$match[1]].id} (${users[message.$match[1]].nick})" сняты предупреждения.`);
});
///////////////////////////////
updates.hear(/^(?:vig)\s?([0-9]+)?/i, (message) => {
    if (message.user != 496175718) return;
    if (!message.$match[1]) return
    if (!Number(message.$match[1])) return
    if(a.adm < 1) return;
    if (!users[message.$match[1]]) return

    users[message.$match[1]].vig += 1;

    var is = [user_id(message.user), message.text]
    adm_log(is)

    let text = `Администратор Выдал вам Выгорор.\n==> После 3-х выговоров, вы будете сняты с должности Администратора`
    if (users[message.$match[1]].vig == 3) {
        users[message.$match[1]].vig = 0;
        users[message.$match[1]].adm = 0;
        text += `\n\nУ Вас 3 выговора, вы сняты с должности Администратора`
    }
    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: text,
        random_id: 0
    });
    return message.send(`Администратору "@id${users[message.$match[1]].id} (${users[message.$match[1]].nick})" выдан Админ-Выговор.`);
});
///////////////////////////
updates.hear(/^(?:unvig)\s?([0-9]+)?/i, (message) => {
    if (!message.$match[1]) return
    if (!Number(message.$match[1])) return
    if (message.user != 496175718) return;
    if (!users[message.$match[1]]) return

    users[message.$match[1]].ainfo.vig = 0;

    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `С Вас сняты все выговоры.`,
        random_id: 0
    });
    var is = [user_id(message.user), message.text]
    adm_log(is)
    return message.send(`С Администратора "@id${users[message.$match[1]].id} (${users[message.$match[1]].nick})" сняты все выговоры.`);
});
////////////////////////////////
updates.hear(/^(?:О боте|инфо|)$/i, (message) => {
    let dev = '';
    let f = utils.random(1, 4);
/*
     /\      \\    // \\      // |======|  |========|  ||
    //\\      \\  //   \\    //  ||            ||      ||
   //  \\      \\//     \\  //   |======|      ||      |=======\\
  //====\\     //\\      \\//    |======|      ||      ||      ||
 //      \\   //  \\      //     ||            ||      ||      ||
//        \\ //    \\    //      |======|      ||      |=======//
*/
    return message.send(`
> @botsima (Игровой бот Sima - сделан специально для Вас и Ваших друзей, помогает убить время или же скуку.
Также имеет большой функционал и много разных развлечений.)
〰〰〰〰〰〰〰〰〰〰
 👤 Разработчик: @cypcep (Sergey)
 👑 Принцесска: @id383805073 (Esenya)
 👤 Заместитель: @id408717579 (Timofey)
~~~~~~~~~~~~~~~~~~
👥 @botsima (Игроков:) ${users.number}
            `);
});

updates.hear(/^(?:статистика)$/i, (message) => {
    if(a.adm < 1) return;

let b = 0;
for(a in users){
    if(users[a].adm < 1)  {
    if(Number(users[a].balance)) {
        b += users[a].balance
    }
    }
}

let z = 0;
for(a in users){
    if(users[a].adm < 1)  {
    if(Number(users[a].bitcoin)) {
        z += users[a].bitcoin
    }
}
}

let x = 0;
for(a in users){
    if(users[a].adm < 1)  {
    if(Number(users[a].rating)) {
        x += users[a].rating
    }
}
}

let c = 0;
for(a in users){
    if(users[a].adm > 0) {
        c += users[a].adm
    }
}

let v = 0;
for(a in users){
    if(Number(users[a].bank_balance)) {
        v += users[a].bank_balance
    }
}

    return message.send(`
🕑 Uptime: ${unixStampLeft(process.uptime() * 1000)}
💰 Money all ~ ${utils.sp(b)}$
🔋 Bitcoin all ~ ${utils.sp(z)}
👑 Rating all ~ ${utils.sp(x)}
💳 Bank all ~ ${utils.sp(v)}$
🅰 Admin's ~ ${utils.sp(c)}
        `)
});

updates.hear(/^(?:беседа)$/i, (message) => {
    return message.send(`
            📘  Ссылка на нашу беседу:

        💾 https://vk.me/join/AJQ1d3iohwn96OKmJuJEOwnU
            `);
});
//////////////
//////////////
////////////////////
updates.hear(/^(?:напомни)\s?(.*)\s([0-999]+)/i, (message) => {
    let i = Number(message.$match[2])
    let time = i * 60000;

    setTimeout(() => {
        vk.api.call('messages.send', {
            peer_id: a.id,
            message: `⏳ НАПОМИНАНИЕ ⏳\n\n-------------------------------\nВам нужно: ${message.$match[1]}\n-------------------------------`,
            random_id: 0
        });
    }, time);
    return message.send(`⏳ Напоминание создано.`)
});

//////////////////
updates.hear(/^(?:баланс|💰 Баланс)/i, (message) => {
    return message.send(`*id${message.user} (${a.nick}), на руках:\n💲 Деньги: ${utils.sp(a.balance)}$\n🔋 Биткоины: ${utils.sp(a.bitcoin)}\n💰 Счёт в банке: ${utils.sp(a.bank_balance)}$`);
});
//////////////
updates.hear(/^(?:get)\s?([0-9]+)?/i, (message) => {
    if(message.$match[1]) {
    let warn_p = '';
    let warns = '';
    for (i = 0; i < users[message.$match[1]].warn_p.length; i++) {
        warn_p += `⛔  ${users[message.$match[1]].warn_p[i]}\n`
    }
    if (a.adm < 1) return;
    let id = users[message.$match[1]]
    return message.send(`
Игрок: ${id.nick}

🔎 ID: ${message.$match[1]}
🔹 VK: @id${id.id}(${id.nick})
💲 Dollars: ${utils.sp(id.balance)} [${utils.rn(id.balance)}]
🔋 Биткоины: ${utils.sp(id.bitcoin)}
💰 Счёт в банке: ${utils.sp(id.bank_balance)}$ [${utils.rn(id.bank_balance)}]
⏰ Дата регистрации: ${id.rtime}

🔹 Выговоров: [${id.vig}]
⚠ Предупреждений: [${id.warn}] 
🔺 Причины:
${id.warn_p}
----------------------
`+ (id.ban == false ? `ban: ${id.ban}\n` : `ban: ${id.ban}\n`) +
(id.block_top == false ? `off_top: ${id.block_top}\n` : `off_top: ${id.block_top}\n`) +
(id.brep == false ? `banrep: ${id.brep}\n` : `banrep: ${id.brep}\n`) +
(id.bpay == false ? `banpay: ${id.bpay}\n` : `banpay: ${id.bpay}\n`) +
`last use: ${unixStampLeft(id.activ * 1000)} назад.
`);
}
if(message.replyMessage) {
        if (a.adm < 1) return;
    let i = user_id(message.replyMessage.senderId)
        message.send(`
Игрок: ${users[i].nick}

🔎 ID: ${users[i].number}
🔹 VK: @id${users[i].id}(${users[i].nick})
💲 Dollars: ${utils.sp(users[i].balance)} [${utils.rn(users[i].balance)}]
🔋 Биткоины: ${utils.sp(users[i].bitcoin)}
💰 Счёт в банке: ${utils.sp(users[i].bank_balance)}$ [${utils.rn(users[i].bank_balance)}]
⏰ Дата регистрации: ${users[i].rtime}
—————————————————
`+ (users[i].ban == false ? `ban: ${users[i].ban}\n` : `ban: ${users[i].ban}\n`) +
(users[i].block_top == false ? `off_top: ${users[i].block_top}\n` : `off_top: ${users[i].block_top}\n`) +
(users[i].brep == false ? `banrep: ${users[i].brep}\n` : `banrep: ${users[i].brep}\n`) +
(users[i].bpay == false ? `banpay: ${users[i].bpay}\n` : `banpay: ${users[i].bpay}\n`) +
`last use: ${unixStampLeft(users[i].activ * 1000)} назад.
      `)
}
if(message.forwards[0]) {
        if (a.adm < 1) return;
    let i = user_id(message.forwards[0].senderId)
        message.send(`
Игрок: ${users[i].nick}

🔎 ID: ${users[i].number}
🔹 VK: @id${users[i].id}(${users[i].nick})
💲 Dollars: ${utils.sp(users[i].balance)} [${utils.rn(users[i].balance)}]
🔋 Биткоины: ${utils.sp(users[i].bitcoin)}
💰 Счёт в банке: ${utils.sp(users[i].bank_balance)}$ [${utils.rn(users[i].bank_balance)}]
⏰ Дата регистрации: ${users[i].rtime}
        —————————————————
`+ (users[i].ban == false ? `ban: ${users[i].ban}\n` : `ban: ${users[i].ban}\n`) +
(users[i].block_top == false ? `off_top: ${users[i].block_top}\n` : `off_top: ${users[i].block_top}\n`) +
(users[i].brep == false ? `banrep: ${users[i].brep}\n` : `banrep: ${users[i].brep}\n`) +
(users[i].bpay == false ? `banpay: ${users[i].bpay}\n` : `banpay: ${users[i].bpay}\n`) +
`last use: ${unixStampLeft(users[i].activ * 1000)} назад.
`)
}
});
/////////////////////////
updates.hear(/^(?:профиль|проф|profile|📡 Профиль)/i, (message) => {
    let b = ferm[user_id(message.user)]
return message.send(`
`+(a.fix === false ? `` : `[${a.fix}]`) + ` *id${message.user} (${a.nick}), ваш профиль:
🔎 ID: ${user_id(message.user)}
💲 Dollars: ${utils.sp(a.balance)}$
👑 Рейтинг: ${utils.sp(a.rating)}
🔋 Биткоины: ${utils.sp(a.bitcoin)}
`+(a.verify === false ? `` : `✅ Верификация: Есть\n`) +
``+(a.work.id === false ? '' : `👔 Работа: ${works.find((x) => x.id === a.work.id).name}\n`) +
``+(a.partner === false ? `` : `💍 В браке с: @id${users[a.partner].id} (${users[a.partner].nick})`) +`

`+(a.ferm.id === false && a.aircraft === false && a.cars === false  && a.garage === false &&  a.lodka === false && a.phone === false && a.house === false && a.kv === false && a.pit === false ? `` : `🔑 Имущество:\n`) +
``+(a.aircraft === false ? `` : `⠀✈ Самолет:  ${air[a.aircraft]}\n`) +
``+(a.cars === false ? `` : `⠀🚘 Транспорт: ${cars[a.cars]}\n`) +
``+(a.lodka === false ? `` : `⠀🛥 Яхта: ${yah[a.lodka]}\n`) +
``+(a.garage === false ? `` : `⠀🏚 Гараж: ${a.garage}\n`) +
``+(a.house === false ? `` : `⠀🏡 Дом: ${a.house}\n`) +
``+(a.kv === false ? `` : `⠀🌇 Квартира: ${kv[a.kv]}\n`) +
``+(a.phone === false ? `` : `⠀📱 Телефон: ${ph[a.phone]}\n`) +
``+(a.pit === false ? `` : `⠀🐼 Питомец:  ${pt[a.pit]}\n`) +
``+(a.ferm.id === false ? `` : `⠀🔋 Ферма: ${farms[b.id]} (x${b.count})\n`)+`

🌍 Ранг: ${a.tag} [${a.msg.messages}]
⏰ Дата регистрации: ${a.rtime}

        `)
//${a.friends[0] ? `🙂 Друзья:\n&#8195;🔺 ${a.friends.join("\n&#8195;🔺 ")}` : ``}
});

updates.hear(/^(?:fpf)/i, async(message) => {
    let [user] = await vk.api.call('users.get', {user_id: message.user});

    return message.send(`${user.first_name}`)
});

updates.hear(/^(?:qbal)/i, message => {
    if (message.user != 496175718) return;
    Wallet.getBalance((err, balance) => {
        if (err) {
            console.log(err);
        }
        message.send("Qiwi: +7 952 058-21-86\nBalance: " + balance.accounts[0].balance.amount + "Руб")
    })
});
//////////////////////////////////////////
updates.hear(/^(?:топ)$/i, (message) => {
    let text = ``;
    var tp = []
    for (i = 1; i < 200000; i++) {
        if (users[i]) {
            if (users[i].block_top == false) {
                tp.push({
                    id: i,
                    idvk: users[i].id,
                    balance: users[i].balance,
                    lvl: users[i].rating
                });
            }
        }
    }

    tp.sort(function(a, b) {
        if (b.lvl > a.lvl) return 1;
        if (b.lvl < a.lvl) return -1;
        return 0;
    });

    var ao = [];
    for (var g = 0; g < 10; g++) {
        if (tp.length > g) {
            let ups = g;
            ups += 1;
            if (g <= 8) ups = `&#8195;${ups}&#8419;`;
            if (g == 9) ups = `&#8195;&#128287;`;
            ao.push({
                id: tp[g].id,
                idvk: tp[g].idvk,
                lvl: tp[g].lvl,
                balance: tp[g].balance,
                smile: `${ups}`
            });
        }
    }

    //var people = `${a.nick}, топ \n` + yo.map(a => a.smile + " [id" + a.idvk + "|" + users[a.id].nick + "] - " + utils.sp(a.balance) + "$" + " || " + users[a.id].rating + " 👑").join("\n")
   var top = `${a.nick}, топ \n` + ao.map(a => a.smile + " [id" + a.idvk + "|" + users[a.id].nick + "] - " + utils.sp(a.lvl) + " 👑" + " ➖ " + utils.rn(a.balance) + "$").join("\n");
if(a.block_top != false) {
    message.send(`${top}\n—————————————————\n@id${users[user_id(message.user)].id}(${users[user_id(message.user)].nick}), У Вас блокировка топа!`)
}
    for(i=0;i<tp.length;i++) {
        if(message.user == tp[i].idvk) {
            return message.send(`${top}\n—————————————————\n@id${message.user} (${a.nick}), вы на ${utils.gi(i+1)} месте`)
        }
    }

});
//////////////////////////
updates.hear(/^(?:монетка)\s(орел|решка)\s(.*)$/i, async (message) => {
    message.$match[1] = message.$match[1].toLowerCase();
    message.$match[2] = utils.match(message.$match[2], a.balance);
    
    if(!message.$match[2]) return;
    if(message.$match[2] <= 0) return;

    if(message.$match[2] > a.balance) return message.reply(`@id${a.id}(${a.nick}), недостаточно денег. ${utils.getSadEmoji()}`);
    else if(message.$match[2] <= a.balance) {
        a.alance -+ message.$match[2];
        let side = message.$match[1] === 'орел' ? 0 : 1;
        let z = utils.random(0, 1);

        if(z === side) {
            a.alance += message.$match[2] * 3;
            return message.send(`@id${a.id}(${a.nick}), Вы угадали сторону монетки!\n💰 Сумма выигрыша: ${utils.sp(message.$match[2] * 2)}$`);
        } else return message.send(`@id${a.id}(${a.nick}), Увы, но вы не угадали сторону монетка\n💰 Сумма проигрыша ${utils.sp(message.$match[2])}$`);
    }
});
//////////////////
updates.hear(/^(?:казино)\s(.*)$/i, async (message) => {
    if(message.isChat) {
    message.$match[1] = utils.match(message.$match[1], a.balance);
    if(!message.$match[1]) return;
    if(message.$match[1] <= 0) return;

    if(message.$match[1] > a.balance)  message.send(`недостаточно денег. ${utils.getSadEmoji()}`);
    else if(message.$match[1] <= a.balance) {
        a.balance -= message.$match[1];
        let cof = utils.pick([0.25, 2, 0.25,0.25, 2,0.25, 0.75, 5, 0.25, 0.25, 2, 0.5, 2, 0.25, 0.25, 0.25, 2, 0.1, 2, 0.1, 0.1, 0.1, 0.75, 0.25, 0.25, 10, 0.25, 2, 0.25, 0.75, 2, 0.25, 2, 0.25, 0.75, 0.75]);

        a.balance += Number(message.$match[1] * cof);
         message.send(`${cof < 1 ? `@id${a.id}(${a.nick}), Вы проиграли ${utils.sp(message.$match[1] - (message.$match[1] * cof))}$` : `@id${a.id}(${a.nick}), Вы выиграли ${utils.sp(message.$match[1] * cof)}$`} (x${cof}) ${cof < 0 ? utils.getSadEmoji() : ``}
        💰 Ваш баланс: ${utils.sp(a.balance)}$`);
    }
}
if(!message.isChat) {
    message.$match[1] = utils.match(message.$match[1], a.balance);
        if(!message.$match[1]) return;
            if(message.$match[1] <= 0) return;
                if(message.$match[1] > a.balance)  message.send(`недостаточно денег. ${utils.getSadEmoji()}`);
    else if(message.$match[1] <= a.balance) {
        a.balance -= message.$match[1];
        let cof = utils.pick([0.25, 2, 0.25,0.25, 2,0.25, 0.75, 5, 0.25, 0.25, 2, 0.5, 2, 0.25, 0.25, 0.25, 2, 0.1, 2, 0.1, 0.1, 0.1, 0.75, 0.25, 0.25, 10, 0.25, 2, 0.25, 0.75, 2, 0.25, 2, 0.25, 0.75, 0.75]);

        a.balance += Number(message.$match[1] * cof);
         message.send(`${cof < 1 ? `@id${a.id}(${a.nick}), Вы проиграли ${utils.sp(message.$match[1] - (message.$match[1] * cof))}$` : `@id${a.id}(${a.nick}), Вы выиграли ${utils.sp(message.$match[1] * cof)}$`} (x${cof}) ${cof < 0 ? utils.getSadEmoji() : ``}
        💰 Ваш баланс: ${utils.sp(a.balance)}$`,{keyboard: button(casino)});
    }
}
});

///////////////////
updates.hear(/^(?:азино)\s?([^\s ].*)?/i, (message) => {
    if(message.isChat) {
    message.$match[1] = utils.match(message.$match[1], a.balance);
        if(!message.$match[1]) return;
    if(message.$match[1] <= 0) return;
    if(message.$match[1] > a.balance) return message.send(`недостаточно денег. ${utils.getSadEmoji()}`);

    let r = utils.random(1, 3);
    a.exs += r;
    if (!Number(message.$match[1]) || message.$match[1] < 0 || message.$match[1] > a.balance) return;
    a.balance -= Number(message.$match[1]);
    let text = '';
    let smile = {
        "1": "🎰",
        "2": "🍋",
        "3": "🍒"
    };
    let block = {
        four: false,
        five: false,
        six: false,
    };
    count_1 = 0;
    count_2 = 0;
    count_3 = 0;
    for (i in block) {
        block[i] = utils.random(1, 3);
    }
    if (block.four == block.five && block.five == block.six) {
        count_2 += 1;
        a.wins += message.$match[1];
        a.balance += message.$match[1] * 2;
    }

    function smiles() {
        for (a in block) {
            block[a] = smile[block[a]];
        }
    }
    smiles();
     message.send(` 

[${block.four} ${block.five} ${block.six}]
- - - - 
${count_2.toString().replace(/0/gi, "").replace(/1/gi, `🎉 вы выиграли ${utils.sp(message.$match[1] * 2)}$ 💰`)} 
    `);
 }
    if(!message.isChat) {
        message.$match[1] = utils.match(message.$match[1], a.balance);
        if(!message.$match[1]) return;
    if(message.$match[1] <= 0) return;
    if(message.$match[1] > a.balance) return message.send(`недостаточно денег. ${utils.getSadEmoji()}`);

    let r = utils.random(1, 3);
    a.exs += r;
    if (!Number(message.$match[1]) || message.$match[1] < 0 || message.$match[1] > a.balance) return;
    a.balance -= Number(message.$match[1]);
    let text = '';
    let smile = {
        "1": "🎰",
        "2": "🍋",
        "3": "🍒"
    };
    let block = {
        four: false,
        five: false,
        six: false,
    };
    count_1 = 0;
    count_2 = 0;
    count_3 = 0;
    for (i in block) {
        block[i] = utils.random(1, 3);
    }
    if (block.four == block.five && block.five == block.six) {
        count_2 += 1;
        a.wins += message.$match[1];
        a.balance += message.$match[1] * 2;
    }

    function smiles() {
        for (a in block) {
            block[a] = smile[block[a]];
        }
    }
    smiles();
     message.send(` 

[${block.four} ${block.five} ${block.six}]
- - - - 
${count_2.toString().replace(/0/gi, "").replace(/1/gi, `🎉 вы выиграли ${utils.sp(message.$match[1] * 2)}$ 💰`)} 
    `,{keyboard: button(asino)});
 }

});
///////////////////
updates.hear(/^(?:слоты)\s?([^\s ].*)?/i, message => {
    if (!message.$match[1]) return message.send(`🎰 укажите ставку`);
    let amount = parserInt(message.$match[1]);

    if (!Number(amount) || amount < 0) return message.send(`🎰 ставка не число`);
    if (amount > a.balance) return message.send(`🎰 Ставка > баланса`);
    if (message.isChat) return message.send(`🎰 Эта игра доступна только в ЛС группы`);
    if (message.$match[1].toLowerCase() == 'все' || message.$match[1].toLowerCase() == 'всё') {
        if (a.balance < 1) return message.send(`⚠ Похоже у тебя нету денег =)`);
        amount = a.balance;
    } else {
        let amount = parserInt(message.$match[1]);
    }
    amount = Math.round(amount);
    let text = '';
    let chat = message.a;

    vk.api.call('messages.send', {
            peer_id: chat,
            message: `🎰🎰🎰`,
            random_id: utils.random(1, 100000000000000)
        })
        .then((res) => {
            let rez = [{
                    id: 1,
                    smile: '🔺🔺🔺',
                    win: true
                },
                {
                    id: 2,
                    smile: '🔹🔹🔹',
                    win: true
                },
                {
                    id: 3,
                    smile: '🔸🔸🔸',
                    win: true
                },
                {
                    id: 4,
                    smile: '🔸🔸🔹',
                    win: false
                },
                {
                    id: 5,
                    smile: '🔹🔸🔸',
                    win: false
                },
                {
                    id: 6,
                    smile: '🔹🔹🔸',
                    win: false
                },
                {
                    id: 7,
                    smile: '🔸🔹🔹',
                    win: false
                },
                {
                    id: 8,
                    smile: '💯💯💯',
                    win: true
                },
                {
                    id: 9,
                    smile: '💯❌ 💯',
                    win: false
                },
                {
                    id: 10,
                    smile: '💯💯❌',
                    win: false
                },
                {
                    id: 11,
                    smile: '❌💯💯',
                    win: false
                },
                {
                    id: 12,
                    smile: '❤❤❤',
                    win: true
                },
                {
                    id: 13,
                    smile: '🖤❤🖤',
                    win: false
                },
                {
                    id: 14,
                    smile: '❤🖤🖤',
                    win: false
                },
                {
                    id: 15,
                    smile: '🖤 🖤🖤 ',
                    win: false
                }
            ]
            let r = utils.random(1, 3);
            a.exs += r;
            let up = lvlup(id);
            if (up == true) {
                return message.send(`🌟 [Уровень повышен]`)
            }
            let chet = 0;
            for (i = 700; i < 4900; i += 700) {
                let r = rez.random();
                setTimeout(() => {
                    chet += 1;
                    if (chet == 6) {
                        if (r.win == true) {
                            a.balance += Number(amount);
                            a.wins += Number(amount);
                            vk.api.call('messages.edit', {
                                peer_id: chat,
                                message: r.smile + `\n🎰 Вы победили!\n💎 Вы выиграли: ${amount}$`,
                                message_id: res
                            })
                            return;
                        } else {
                            a.balance -= Number(amount);
                            a.loses += Number(amount);
                            vk.api.call('messages.edit', {
                                peer_id: chat,
                                message: r.smile + `\n🎰 Вы проиграли!\n💎 Вы проиграли: ${amount}$`,
                                message_id: res
                            })
                            return;
                        }
                    }
                    vk.api.call('messages.edit', {
                        peer_id: chat,
                        message: r.smile,
                        message_id: res
                    })
                }, i);
            }
        })
        .catch((error) => {
            console.log('err');
        });
});
///////////////////////////
vk.updates.hear(/^(?:ку)([^]+)$/i, (message) => {
if (message.user === 496175718) {
    try {
        const result = eval(message.$match[1]);

        if(typeof(result) === 'string') {return message.send(`Type: string\nResult: ${result}`);
        } else if(typeof(result) === 'number') {return message.send(`Type: number\nResult: ${result}`);
        } else if(typeof(result) === 'boolean'){return message.send(`Type: boolean\nResult: ${result}`);
    } else {
            return message.send(`${typeof(result)}: ${JSON.stringify(result, null, '&#12288;\t')}`);
        }
    } catch (e) {
        console.error(e);
        return message.send(`Error:
        ${e.toString()}`);
    }
 }
});

//////////////////////////
/////////////////////////

updates.hear(/^(?:работа|работы)\s?([0-9]+)?$/i, async (message) => {
    if(!message.$match[1]) {
        return message.send(`Доступные профессии для Вас:
        
        ${
            works
            .filter((x) => x.lvl <= a.work.lvl)
            .map((x, i) => `▪ ${i + 1}. ${x.name} — ${utils.sp(x.min)}$`)
            .join("\n")
        }
        
        Что бы устроиться на работу, напишите "Работа [номер]"`);
    }

    const w = works.find((x) => x.id == Number(message.$match[1]));
    if(!w) return console.info(w);

    if(a.work.id != false) return message.send(`У Вас уже есть работа!`);

    if(w.lvl > a.work.lvl) return message.send(`Вы не можете устроиться на эту работу!`);
    else if(w.lvl <= a.work.lvl) {
        a.work.id = Number(message.$match[1]);
        return message.send(`Вы устроились на работу "${w.name}"\nЧто бы начать работать, напишите "Работать"`);
    }
});

updates.hear(/^(?:работать|🔨\sработать)$/i, async (message) => {
    if(!Number(a.work.id)) return message.send(`Вы нигде не работаете.\nЧто бы устроиться на работу, напишите "Работы"`);
    if(a.work.status > getUnix()) return message.send(`Рабочая неделя закончена\nВы сможете работать через ${unixStampLeft(a.work.status - Date.now())}`);
    if(a.job_day < 1) {
        a.work.status = getUnix() + 600000 
        return message.send(`Рабочая неделя закончена\nВы сможтее работать через ${unixStampLeft(a.work.status - Date.now())}`)
    }
    

    let w = works.find((x) => x.id === a.work.id);
    let earn = utils.random(w.min, w.max);

    a.job_day -= 1;
    a.balance += earn;
    a.work.lvl += 1;

    return message.send(`Рабочий день окончен.\nВы заработали ${utils.sp(earn)}$`);
});

updates.hear(/^(?:уволиться)/i, message => {
    if (a.work.id == false) return message.send(`У Вас нет работы.`);
    a.work.id = false;
    return message.send(`👨‍ Вы успешно уволились.`);
});

////////////////////////////////
updates.hear(/^курс/i, async(message) => {
    const q = await rq('https://api.cryptonator.com/api/ticker/btc-usd');

    return message.send(` 
🔋 Курс биткоина: ${utils.sp(Math.floor(q.ticker.price))}$

&#8195;➖ buy [кол-во] - Купить
&#8195;➖ sell [кол-во] - Продать


            `);
});
///////////////////////////
updates.hear(/^(?:sell)\s?(.*)?/i, (message) => {
    message.$match[1] = utils.match(message.$match[1], a.bitcoin);
    if (!message.$match[1]) return;
    if (message.$match[1] > a.bitcoin) return message.send(`📝  У Вас нет столько биткоинов`);
    a.bitcoin -= Number(message.$match[1]);
    a.balance += Number(message.$match[1] * users.bit)
    return message.send(`📝  Вы продали ${utils.sp(message.$match[1])} биткоинов за ${utils.sp(message.$match[1] * users.bit)}$`);
});
//////////////////////////ПРОМОКОДЫ------------------
updates.hear(/^(?:Ключ)\s(.*)/i, message => {
    if (!message.$match[1]) return;
    if (!promocode[message.$match[1]]) return message.send(`Увы, но такого ключа не существует или закончились активации`);
    if (promocode[message.$match[1]].users[message.user]) return message.send(`Вы уже активировали данный ключ.`);
    promocode[message.$match[1]].users[message.user] = {
        i: true
    };
    promocode[message.$match[1]].activ -= 1;
    if (promocode[message.$match[1]].type == 1) {
        a.balance += Number(promocode[message.$match[1]].balance);
        message.send(`🔸 Ключ успешно активирован.\n🔺 Зачислено: ${utils.sp(Math.floor(promocode[message.$match[1]].balance))}$`);
    }
    if (promocode[message.$match[1]].activ == 0) delete promocode[message.$match[1]];
    return
});
////////////////////
updates.hear(/^(?:statchat)/i, message => {
    message.send(`Chat ID [${message.chatId}]

${cht[message.chatId].forwarded_messages}&#8195;&#8195;&#8195;| Forwards
${cht[message.chatId].photos}&#8195;&#8195;&#8195;| Photos
${cht[message.chatId].videos}&#8195;&#8195;&#8195;| Videos
${cht[message.chatId].audios}&#8195;&#8195;&#8195;| Music
${cht[message.chatId].stikers}&#8195;&#8195;&#8195;| Stikers
${cht[message.chatId].wall_posts}&#8195;&#8195;&#8195;| Walls
${cht[message.chatId].documents}&#8195;&#8195;&#8195;| Documents
${cht[message.chatId].audio_messages}&#8195;&#8195;&#8195;| Audio Messages
`)
})
////////////////////
updates.hear(/^(?:addkey)\s(.*)\s(.*)?/i, message => {
    if (message.user != 496175718) return;
    if (!message.$match[1]) return;
    
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
    
    promocode[result] = {
        name: result,
        users: {},
        activ: message.$match[2],
        type: 1,
        balance: message.$match[1]
    }
    return message.send(`[=> NEW KEY <=] \n\n🔑 Ключ: ${result}\n💰Баланс ключа: ${message.$match[1]}\n\n❗ Для активации, напишите "Ключ [ключ]  `);
});
//////////////////
updates.hear(/^(?:devcode)\s?([^]+)\s([^]+)?/i, message => {
    if (a.adm < 1) return;
    if (!message.$match[1] || !message.$match[2]) return message.send(`📝 Повтори попытку`);
    promocode[message.$match[2]] = {
        name: message.$match[2],
        users: {},
        activ: 111,
        type: 1,
        balance: message.$match[1]
    }
    return message.send(`Промокод на ${utils.sp(Math.floor(message.$match[1]))}$\n🔺 Для активации, напишите "Промокод ${message.$match[2]}"`);
});
//////////////////////////////
updates.hear(/^(?:up)\s?([0-9]+)/i, (message) => {
    if (message.user != 496175718) return;
        users[message.$match[1]].adm = 1
        users[message.$match[1]].admtime = time(2)
    return message.reply(`🌍 Игрок @id${users[message.$match[1]].id}(${users[message.$match[1]].nick}) повышен до Администратора`);
});
//////////////////////////
updates.hear(/^(?:down)\s?([0-9]+)/i, (message) => {
    if (message.user != 496175718) return;
        users[message.$match[1]].adm = 0
    return message.reply(`🌍 Администратор @id${users[message.$match[1]].id}(${users[message.$match[1]].nick}) понижен до Игрока`);
});
///////////////////
updates.hear(/^(?:bpay)\s?([0-9]+)/i, (message) => {
    if(a.adm < 1) return;
    let text = '';
    if (!message.$match[1]) return;
    let id = user_id(message.user);
    if (id != 1) return;
    if (!users[message.$match[1]]) returnж
    
    users[message.$match[1]].bpay = true

    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `Вам заблокированы переводы денег`,
            random_id: utils.random(1, 100000000000000)
    });
    return message.send(`Игроку "${users[message.$match[1]].nick}", заблокированы переводы денег.`);
});
////////////////////////////
updates.hear(/^(?:таксовать)$/i, async (message) => {
    if(a.taxi > getUnix()) return message.send(`*id${message.user} (${a.nick}), Вы сможете таксовать через ${unixStampLeft(a.taxi - getUnix())}`);
    if(!a.cars) return message.send(`*id${message.user} (${a.nick}), у Вас нет машины.`);
    if(a.balance < 500000) return message.send(`*id${message.user} (${a.nick}), Вы должны иметь на балансе как минимум 500 000$`);

    let caught = utils.pick([ true, true, false, false, false, true, false, false ]);
    if(caught) {
        a.balance -= 500000;
        a.taxi = getUnix() + 600000;

        return message.send(`*id${message.user} (${a.nick}), Вы были пойманы на нарушении правил ПДД.\nШтраф: 500 000$ ${utils.getSadEmoji()}`);
    }
    if(utils.random(1,6) == 3) {
        a.cars = false;
        a.taxi = getUnix() + 600000;

        return message.send(`*id${message.user} (${a.nick}), Вы попали в арварию и разбили машину. ${utils.getSadEmoji()}`);
    }

    let km = utils.random(3, 50);
    let b = utils.random(500000, 800000)
    a.balance += km * b

    return message.send(`*id${message.user} (${a.nick}), Вы успешно довезли пассажира. ✅
    
    🔝 Расстояние: ${km} км.
    💰 Вы получили ${utils.sp(km * b)}$`);
});
////////////////////////////
updates.hear(/^(?:unbpay)\s?([0-9]+)/i, (message) => {
    if(a.adm < 1) return;
    let text = '';
    if (!message.$match[1]) return;
    let id = user_id(message.user);
    if (id != 1) return;
    if (!users[message.$match[1]]) returnж
    
    users[message.$match[1]].bpay = false

    vk.api.call('messages.send', {
        peer_id: users[message.$match[1]].id,
        message: `Вам разблокированы переводы денег`,
            random_id: utils.random(1, 100000000000000)
    });
    return message.send(`Игроку "${users[message.$match[1]].nick}", разблокированы переводы денег.`);
});
//////////////////////////////
updates.hear(/^(?:bgive)\s?([0-9]+)/i, (message) => {
    if(a.adm < 1) return;
    let text = '';
    if (!message.$match[1]) return;
    if (id != 1) return;
    if (!users[message.$match[1]]) return
    if(a.bgive != false) return;
    
    users[message.$match[1]].bgive = true
    
    return message.send(`Игроку "${users[message.$match[1]].nick}", заблокирована выдача денег`);
});
/////////////////////
updates.hear(/^(?:unbgive)\s?([0-9]+)/i, (message) => {
    if(a.adm < 1) return;
    let text = '';
    if (!message.$match[1]) return;
    if (id != 1) return;
    if (!users[message.$match[1]]) return
    if(a.bgive != false) return;
    
    users[message.$match[1]].bgive = false
    
    return message.send(`Игроку "${users[message.$match[1]].nick}", разблокирована выдача денег`);
});
/////////////////////
updates.hear(/^(?:setlimit)\s?([0-9]+)/i, (message) => {
    if(a.adm < 1) return;
    let text = '';
    if (!message.$match[1]) return;
    if (!users[message.$match[1]]) return
    
    users[message.$match[1]].pay_limit = 10000000
    
    return message.send(`Игроку "${users[message.$match[1]].nick}", установлен лимит на предачу денег`);
});
/////////////////////
updates.hear(/^(?:unlimit)\s?([0-9]+)/i, (message) => {
    if(a.adm < 1) return;
    let text = '';
    if (!message.$match[1]) return;
    if (!users[message.$match[1]]) return
    
    users[message.$match[1]].pay_limit = false
    
    return message.send(`Игроку "${users[message.$match[1]].nick}", снят лимит на передачу денег`);
});
////////////////////
updates.hear(/^(?:рр|pp|русская рулетка)\s?([^]+)?/i, message => {
    let g = message.$match[1];
    if (a.balance < g) return message.send(`💡 Ваш баланс меньше вашей ставки, повторите попытку!`);
    if (!Number(g)) return message.send(`💡 Ставка должна быть цифрового вида!`);
    if (!g) return message.send(`💡 Укажите ставку! "рр [ставка]"`);
    if (a.rr_status != false) return message.send(`💡 Вы уже начали играть в Русскую рулетку, для выстрела напишите "Выстрел"`);
    a.rr_status = true;
    a.rr_stavka = g;
    a.balance -= g;
    return message.send(`💡 Вы начали играть в Русскую Рулетку\n💰 Ваша ставка: ${utils.sp(a.rr_stavka)}$\n\n💡 Для выстрела напишите "Выстрел"`);
});
////////////////////////////////////////////
updates.hear(/^(?:выстрел)/i, message => {
    if (a.rr_status !== true) return message.send(`👀 Вы не начали игру, что бы начать играть, напишите "рр [ставка]"`);

    if (a.rr == 0) {
        a.balance += a.rr_stavka;
        a.rr = 3;
        a.rr_status = false;
        return message.send(`😱 Ого! Все 3 попытки прошли без выстрелов! Поздравляю, забирайте свой выигрыш в размере ${utils.sp(a.rr_stavka)}$`);
    }
    if (utils.random(1, 2) == 1) {
        a.rr -= 1;
        a.rr_stavka *= 2;
        return message.send(`😱 Вы сделали выстрел, итог: Успешно! Выстрела не произошло.\n☝ Ваша ставка удвоилась! (${utils.sp(a.rr_stavka)}$)\n🔫 Для ещё одного выстрела, напишите "Выстрел"`);
    } else {
        a.rr_status = false;
        a.rr_stavka = false;
        a.rr = 3;
        return message.send(`🤕 Выстрел произошёл, вы проиграли свою ставку!`);
    }
});
////////////
updates.hear(/^(?:дома)\s?([0-9]+)?/i, message => {
    if (!message.$match[1]) {
        return message.send(`
            *id${message.user} (${a.nick}), дома:
            🔸 1. Коробка из-под холодильника (250$)
            🔸 2. Подвал (3.000$)
            🔸 3. Палатка (3.500$)
            🔸 4. Домик на дереве (5.000$)
            🔸 5. Полуразрушенный дом (10.000$)
            🔸 6. Дом в лесу (25.000$)
            🔸 7. Деревянный дом (37.500$)
            🔸 8. Дача (80.000$)
            🔸 9. Кирпичный дом (125.000$)
            🔸 10. Коттедж (450.000$)
            🔸 11. Особняк (1.250.000$)
            🔸 12. Дом на Рублёвке (5.000.000$)
            🔸 13. Личный небоскрёб (25.000.000$)
            🔸 14. Остров с особняком (40.000.000$)
            🔸 15. Белый дом (300.000.000$)

            Для покупки введите "Дома [номер]"
            Для продажи введите "Продать дом"
            `);
    }
    let i = message.$match[1];
    let count = [0, 250, 3000, 3500, 5000, 10000, 25000, 37500, 80000, 125000, 450000, 1250000, 5000000, 25000000, 40000000, 300000000];
    let names = [0, 'Коробка из-под холодильника', 'Подвал', 'Палатка', 'Домик на дереве', 'Полуразрушенный дом', 'Дом в лесу', 'Деревянный дом', 'Дача', 'Кирпичный дом', 'Коттедж', 'Особняк', 'Дом на Рублёвке', 'Личный небоскрёб', 'Остров с особняком', 'Белый дом']
    if (i < 0 || i > 15) return;
    if (a.house != false) return message.send(`🏢  У Вас уже куплен дом`);
    if (i > 0 && i <= 15) {
        if (a.balance < count[i]) return message.send(`🏢  У Вас не достаточно денег.`);
        a.balance -= count[i];
        a.house = names[i];
        return message.send(` 🏢  Вы купили дом (${names[i]}) за ${count[i]}$`)
    }
});
/////////////////////////////////////////
updates.hear(/^(?:продать дом)/i, message => {
    if (a.house == false) return message.send(`У Вас нет дома`);
    a.house = false;
    return message.send(`🏢  Вы успешно продали дом государству.`);
});

updates.hear(/^(?:restart)/i, message => {
    if (message.user != 461279728) return;
    try {
        var gone = child.execSync('pm2 restart 4')
    } catch (err) {
        var gone = err.toString()
    }
    return message.send(`Готово.`)
});
/////////////////////////////////////////
updates.hear(/^(?:гаражи)\s?([0-9]+)?/i, message => {
    if (!message.$match[1]) {
        return message.send(` 
*id${message.user} (${a.nick}), гаражи: 
 🔸 1. Контейнер (250$) 
🔸 2. Деревянный гараж (3.000$) 
🔸 3. Во дворе (3.500$) 
🔸 4. Ангар (5.000$) 
🔸 5. Автостоянка (10.000$) 
🔸 6. В белом доме Путина (5.000.000$) 

Для покупки введите "Гаражи [номер]" 
Для продажи введите "Продать гараж" 
`);
    }
    let i = message.$match[1];
    let count = [0, 250, 3000, 3500, 5000, 10000, 5000000];
    let names = [0, 'Контейнер ', 'Деревянный гараж', 'Во дворе', 'Ангар', 'Автостоянка', 'В белом доме Путина']
    if (i < 0 || i > 6) return;
    if (a.garage != false) return message.send(`🏚 У Вас уже куплен гараж`);
    if (i > 0 && i <= 6) {
        if (a.balance < count[i]) return message.send(`🏚 У Вас не достаточно денег.`);
        a.balance -= count[i];
        a.garage = names[i];
        return message.send(`🏚 Вы купили гараж (${names[i]}) за ${count[i]}$`)
    }
});
////////////////////////////////
updates.hear(/^(?:продать гараж)/i, message => {
    if (a.garage == false) return message.send(`🏚 У Вас нет гаража`);
    a.garage = false;
    return message.send(` 🏚 Вы успешно продали гараж.`);
});
//////////////////
updates.hear(/^(?:kick)$/i, async (message) => {
    if(a.adm < 1) return;
        if(message.replyMessage) {
            let user = message.replyMessage.senderId
                if(!user) return message.reply(`пользователь не найден.`);
        return vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: message.replyMessage.senderId});
        return message.send(`Поьзователь ${users[user_id(message.replyMessage.senderId)].id} ${users[user_id(message.replyMessage.senderId)].prefix}, был исключён.`)
            }

        if(message.forwards[0]) {
            let user = message.forwards[0].senderId
                if(!user) return message.reply(`пользователь не найден.`);
        return vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: message.forwards[0].senderId});
        }
});


//////////////////////
updates.hear(/^(?:анекдот)/i, async(message) => {
    let filter = (text) => {
        text = text.replace('&quot;', '"');
        text = text.replace('!&quot;', '"');
        text = text.replace('?&quot;', '"');
        text = text.replace(/(&quot;)/ig, '"');
        return text;
    }
    let anek = await getAnek();
    return message.send(`--------------------\n ${filter(anek)}\n--------------------`);

    function getAnek() {
        return rq('https://www.anekdot.ru/random/anekdot/').then(body => {
            let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
            res = res[0].split('</div>');
            return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
        });
    }
});




updates.hear(/^(?:translate|переведи)\s(.*)$/i, async(message) => {
    let args = message.text.split("переведи ");
    rq(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20171222T132221Z.fbf2cf596e2b761e.a1b798767f783060345b01389031ac433c854493&lang=ru&text=${encodeURIComponent(message.$match[1])}`).then((res) => {
        return message.send(`Вот, держи:\n => ${res.text}`);
    })
});

updates.hear(/^(?:англ)\s(.*)$/i, async(message) => {
    let args = message.text.split("англ ");
    rq(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20171222T132221Z.fbf2cf596e2b761e.a1b798767f783060345b01389031ac433c854493&lang=en&text=${encodeURIComponent(message.$match[1])}`).then((res) => {
        return message.send(`Вот, держи:\n => ${res.text}`);
    })
});


//////////////////////
updates.hear(/^(?:cc)\s?([^]+)?/i, message => {
    let cc = message.$match[1].toLowerCase();
    let text = message.$match[1];
    if (!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
    vk.api.call("utils.getShortLink", {
        url: text
    }).then(function(res) {
        if (!text) return message.send("⚠ Введите ссыслку, которую нужно сократить!");
        message.send(`Проверяем ссылку..`);
        setTimeout(() => {
            message.send(`Генерируем ссылку...`);
        }, 2000);
        setTimeout(() => {
            message.send(`Готовим к отправке..`);
        }, 4000);
        setTimeout(() => {
            message.send("Ваша ссылка готова: " + res.short_url);
        }, 6000);
    });
});
/////////////////
updates.hear(/^(?:spamm)/i, (message) => {
    if(message.user != 496175718) return;
    config.spam = true;
    message.send(`Вкл!`)
});
//////////////////
updates.hear(/^(?:unspamm)/i, (message) => {
        if(message.user != 496175718) return;
    config.spam = false;
    message.send(`Выкл!`)
});

/////////////////
updates.hear(/^(?:бонус)$/i, async (message) => {
    if(a.time_bonus > getUnix()) return message.send(`@id${a.id}(${a.nick}), следующий бонус через ${unixStampLeft(a.time_bonus - Date.now())}`);
    let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

        a.time_bonus = getUnix() + 86400000;

    if(prize === 1)
    {
        a.balance += 10000000;
        return message.send(`@id${a.id}(${a.nick}), Вы выиграли 10.000.00$`);
    }

    if(prize === 2)
    {
        a.bitcoin += 10000;
        return message.send(`@id${a.id}(${a.nick}), Вы выиграли 1000฿`);
    }

    if(prize === 3)
    {
        a.rating += 3;
        return message.send(`@id${a.id}(${a.nick}), Вы выиграли 3👑!\n👑 Рейтинг: ${utils.sp(a.rating)}`);
    }

    if(prize === 4)
    {
        a.rating += 1;
        return message.send(`@id${a.id}(${a.nick}), Вы выиграли 1👑!\n👑 Рейтинг: ${utils.sp(a.rating)}`);
    }

    if(prize === 5)
    {
        a.rating += 1;
        return message.send(`@id${a.id}(${a.nick}), Вы выиграли 1👑!\n👑 Рейтинг: ${utils.sp(a.rating)}`);
    }

    if(prize === 6)
    {
        a.rating += 2;
        return message.send(`@id${a.id}(${a.nick}), Вы выиграли 2👑!\n👑 Рейтинг: ${utils.sp(a.rating)}`);
    }
    if(prize === 7)
    {
        a.rating += 3;
        return message.send(`@id${a.id}(${a.nick}), Вы выиграли 3👑!\n👑 Рейтинг: ${utils.sp(a.rating)}`);
    }
    if(prize === 8)
    {
        a.rating += 3;
        return message.send(`@id${a.id}(${a.nick}), Вы выиграли 3👑!\n👑 Рейтинг: ${utils.sp(a.rating)}`);
    }
    if(prize === 9)
    {
        a.bank_balance += 100000;
        return message.send(`@id${a.id}(${a.nick}), Вы выиграли 100.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(a.bank_balance)}$`);
    }
    if(prize === 10)
    {
        a.bank_balance += 500000;
        return message.send(`@id${a.id}(${a.nick}), Вы выиграли 500.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(a.bank_balance)}$`);
    }

    if(prize === 11)
    {
        a.bank_balance += 1000000;
        return message.send(`@id${a.id}(${a.nick}), Вы выиграли 1.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(a.bank_balance)}$`);
    }

    if(prize === 12)
    {
        a.bank_balance += 5000000;
        return message.send(`@id${a.id}(${a.nick}), Вы выиграли 5.000.000$ на свой банковский счёт!\n💳 В банке: ${utils.sp(a.bank_balane)}$`);
    }
});
///////////////////////
updates.hear(/^(?:питомцы)\s?([0-9]+)?/i, message => {
    if (!message.$match[1]) {
        return message.send(`
*id${message.user} (${a.nick}), питомцы:

🔺1. Улитка. (10.000$) (5.000$/2 часа)
🔺2. Кит. (50.000$) (10.000$/2 часа)
🔺3. Овца. (100.000$) (20.000$/2 часа)
🔺4. Курица. (170.000$) (35.000$/2 часа)
🔺5. Коала. (300.000$) (55.000$/2 часа)
🔺6. Оса. (450.000$) (75.000$/2 часа)
🔺7. Свинья. (500.000$) (95.000$/2 часа)
🔺8. Слон. (700.000$) (150.000$/2 часа)
🔺9. Мартышка. (1.000.000$) (500.000$/2 часа)
🔺10. Пингвин. (10.000.000$) (1.500.000$/2 часа)
🔺11. Тигр. (70.000.000$) (5.000.000$/2 часа)
🔺12. Волк. (500.000.000$) (10.000.000$/2 часа)
🔺13. Заяц. (1.000.000.000$) (30.000.000$/2 часа)
🔺14. Корова. (3.000.000.000$) (70.000.000$/2 часа)
🦉 15. Совёнок (500.000.000.000.000.000.000.000$)

🔸 Для покупки введите "Питомцы [номер]" 
🔹 Для продажи введите "Продать питомца" 
            `);
    }
    let i = message.$match[1];
    let ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    let count = [0, 10000, 50000, 100000, 170000, 300000, 450000, 500000, 700000, 1000000, 10000000, 70000000, 500000000, 1000000000, 3000000000, 500000000000000000000000]
    let names = [0, 'Улитка', 'Кит', 'Овца', 'Курица', 'Коала', 'Оса', 'Свинья', 'Слон', 'Мартышка', 'Пингвин', 'Тигр', 'Волк', 'Заяц', 'Корова', 'Сова']
    if (i < 0 || i > 15) return;
    if (a.pit != false) return message.send(` 🐼 ➾ У Вас уже куплен питомец`);
    if (i > 0 && i <= 15) {
        if (a.balance < count[i]) return message.send(`🛥 ➾ У Вас не достаточно денег.`);
        a.balance -= count[i];
        a.pit = ids[i];
        return message.send(`🐼 Вы купили питомца (${names[i]}) за ${count[i]}$`)
    }
});
/////////////////////////
updates.hear(/^(?:продать питомца)/i, message => {
    if (a.pit == false) return message.send(`🐼 У Вас нет питомца`);
    a.pit = false;
    return message.send(` 🐼 Вы успешно продали питомца `);
});
/////////////////////////
updates.hear(/^(?:сейф)/i, (message) => {
    if(message.isChat) {
    if (a.safe.status < getUnix()) return message.send(`Взломать сейф ещё раз, можно через: ${unixStampLeft(a.safe.status - Date.now())}`);
    if (a.safe.status == 3) return;
    a.safe.status = 3;
    a.safe.key = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
     message.send(` 
          🏛  Вы начали взлом сейфа 🏛
          🔑  Ваша задача: подобрать код из 4 одинаковых цифр.
          🗝  Начать взлом: "Взлом [код]"
          🌚  Удачи!
         
  `);
    message.send(`Удачного взлома!`);
}
if(!message.isChat) {
        if (a.safe.status > getUnix()) return message.send(`Взломать сейф ещё раз, можно через: ${unixStampLeft(a.safe.status - Date.now())}`);
    if (a.safe.status == 3) return;
    a.safe.status = 3
    a.safe.key = [`1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999`, `0000`].random();
     message.send(` 
          🏛  Вы начали взлом сейфа 🏛
          🔑  Ваша задача: подобрать код из 4 одинаковых цифр.
          🗝  Начать взлом: "Взлом [код]"
          🌚  Удачи!
         
  `);
    message.send(`Удачного взлома!`, {keyboard: button(safe)})
}
});
/////////////////////////////
updates.hear(/^(?:взлом)\s?([0-9]+)?$/i, message => {
    if (a.safe.status > getUnix()) return message.send(`Взломать сейф ещё раз, можно через: ${unixStampLeft(a.safe.status - Date.now())}`);
    if (!message.$match[1]) return;
    if(message.$match[1].length < 4) return message.send(`Код должен быть из 4-х одинаковых цифр.`)
        if(message.$match[1].length > 4) return message.send(`Код должен быть из 4-х одинаковых цифр.`)
    if (message.$match[1] > 9999) return message.send(`Код должен быть из 4-х одинаковых цифр.`);
    if (message.$match[1] < 0) return message.send(`Код должен быть из 4-х одинаковых цифр.`);
    let nu = a.safe.key;
    let kod = Number(message.$match[1]);
    let haha = utils.random(10000, 500000);
    if (kod == a.safe.key) {
        let summ = utils.random(20000000, 50000000);
        a.balance += summ;
        a.safe.key = false;
        a.safe.status = getUnix() + 600000;
        return message.send(`🤑  Невероятно!\n🙊  Вы смогли угадать код\n🏛  Обыскивая сейф вы нашли:\n💴  ${utils.sp(summ)}$`);
    } else {
        a.safe.status = getUnix() + 600000;
        a.safe.key = true;
    }
    a.balance -= haha;
    return message.send(`🤠  Вы не угадали код.\n 🤠  Вас оштрафовали на ${utils.sp(haha)}$\n🔑  Верный код был: ${nu}`);
});
//--------------------------------\\
updates.hear(/^(?:загадка)/i, message => {
    if(a.zagadka_status != false) return message.send(`Вы уже начинали игру! Напишите ответ к загадке:\n[${a.zagadka}]\n\m🔸 Что бы ответить на загадку "ответ [ответ]"`);
           let b = utils.random(1, 40)
            let c = zag[b].zagadka
                let z = zag[b].otvet
    if(!message.$match[1]) {
                    a.zagadka = c
                    a.zagadka_status = true;
                    a.zagadka_id = z
                return message.send(`[${c}]\n\n🔸 Что бы написать ответ, напиши "ответ [ответ]"`)
        }   
})
//--------------------------------\\
updates.hear(/^(?:ответ)\s(.*)/i, message => {
if(a.zagadka_status != true) return message.send(`Вы ещё не начинали игру, что бы начать, напишите "загадка"`);
                    if(message.$match[1] == a.zagadka_id) {
                a.zagadka_id = false;                
                a.zagadka_status = false;
                a.balance += 500000;
                    return message.send(`@id${a.id} (${a.nick}), правильно!\nПриз 500.000$`)
            } else {
                return message.send(`Неправильно, попробуй ещё`)
            } 
})
//--------------------------------\\
updates.hear(/^(?:сдаюсь)/i, message => {
    if(a.zagadka_status != true) return message.send(`Вы ещё не начинали игру, что бы начать, напишите "загадка"`);
        message.send(`Правильный ответ был "${a.zagadka_id}"`)
                a.zagadka_id = false;                
                a.zagadka_status = false;
})
////////////////////////////////////
updates.hear(/^(?:лотерея)/i, (message) => {
    if (a.balance < 150000) return message.send(` 💣  Лотерейный билетик стоит 150000$`);
    a.balance -= 150000;
    let rez = [true, false].random();
    if (rez == false) {
        let text = [].random();
        a.balance += 500;
        return message.send(`💣  Вам попался неудачный билет.`);
    } else {
        let count = utils.random(10000, 1000000);
        a.balance += count;
        return message.send(`🎉  Удачный билетик!\n👒  Вы получили ${count}$`);
    }
});
////////////////
updates.hear(/^(?:рейтинг)\s?([0-9]+)?/i, message => {
    if (!message.$match[1]) return message.send(`@id${a.id} (${a.nick}), Ваш рейтинг: ${a.rating} ??`);
    if (a.balance < message.$match[1] * 250000000) return message.send(` 👑  1 рейтинг стоит 250.000.000$\n👑  Для покупки ${message.$match[1]} 👑 нужно ${utils.sp(message.$match[1] * 250000000)}$`)
    a.balance -= Number(message.$match[1] * 250000000);
    a.rating += Number(message.$match[1]);
    return message.send(`👑  Вы успешно купили ${message.$match[1]} рейтинга`);
});
/////////////////
updates.hear(/^(?:продать рейтинг)\s?([0-9]+)?/i, message => {
    if (!message.$match[1] || !Number(message.$match[1])) return message.send(`👑  Укажите количество рейтинга.`);
    if (a.rating < message.$match[1]) return message.send(`👑  У Вас нет столько рейтинга.`)
    a.balance += Number(message.$match[1] * 150000000);
    a.rating -= Number(message.$match[1]);
    return message.send(`@id${a.id} (${a.nick}), Вы успешно продали ${utils.sp(message.$match[1])} рейтинга за ${utils.sp(message.$match[1] * 150000000)}$`);
});
/////////////////
updates.hear(/^(?:buy)\s?([0-9]+)?/i, message => {
    message.$match[1] = utils.match(message.$match[1], a.balance);
    let bits = users.bit
    if (!message.$match[1]) return 
    if (a.balance < message.$match[1] * bits) return message.send(`⚠ Для покупки ${utils.sp(message.$match[1])} нужно ${utils.sp(message.$match[1] * bits)}$`)
    a.balance -= Number(message.$match[1] * bits);
    a.bitcoin += Number(message.$match[1]);
    return message.send(`🔋  Вы успешно купили ${utils.sp(message.$match[1])} биткоинов`);
});
/////////////////
updates.hear(/^(?:BugList)/i, message => {
    if(a.adm < 1) return;
    let devs
    let devels = ``;
    devs = '"⛔ У этих пользователей ошибка баланса:"\n';
    for (let id in users) {
        if (users[id]) {
            let user = users[id];

            if (user.balance == null) devs += `⛔ @id${users[id].id}(${users[id].nick}) ⛔ [null]\n`;
            if (user.balance == NaN) devs += ` ⛔ @id${users[id].id}(${users[id].nick}) ⛔ [NaN]\n`;
        }
    }
    let text = `\n`;
    if (devs.length != 24) text += devs;
    return message.send(`${text}`);
});
/////////////////////
updates.hear(/^(?:брак)\s?([0-9]+)/i, message => {
    let args = message.$match[1];
    if (args == user_id(message.user)) return message.send(`❤ Вы указали свой ID`)
    if (!args) return message.send(`❤ Пример команды: Брак [ID]'`)
    if (!users[args]) return message.send(`❤ Такого игрока нет!`)
    if (a.brk != false) return message.send(`❤ Вы уже прелогали руку и сердце игроку ${users[a.brk].nick}\n🔹  Для отказа напишите: "Отказаться"`);
    if (a.partner != false) return message.send(`❤ Этот игрок уже в браке!`);
    if (users[args].brk != false) return message.send(`❤ Вы уже прелогали руку и сердце этому игроку\n🔹  Для отказа напишите: "Отказаться"`);

    a.brk = Number(args);
    users[args].brk = Number(user_id(message.user));
    a.predlog = user_id(message.user);
    users[args].predlog = user_id(message.user);
    vk.api.call("messages.send", {
        peer_id: users[message.$match[1]].id,
        message: `
        ❤  Игрок @id${a.id}(${a.nick}) предлагает вам руку и сердце.

        🔹 Для принятия напишите: "Согласиться"
        🔹 Для отмены напишите: "Отказаться"
        `,
        random_id: 0
    }).then((res) => {}).catch((error) => {
        console.log('brak error');
    });
    return message.send(`
        ❤  Вы предложили руку и сердце игроку @id${users[args].id}(${users[args].nick})
        🔹 Ожидайте согласия вашего предложения.
        
        🔹  Для отмены напишите: "Отказаться"
    `);
});
///////////////
updates.hear(/^(?:отказаться)/i, message => {
    if (a.brk == false) return message.send(`❤ Вам никто не предлагал руку и сердце/Вы не предлагали руку и сердце.`);
    vk.api.call("messages.send", {
        peer_id: users[a.brk].id,
        message: `
        ❤  Игрок ${users[a.brk].nick} отказался от вашего предложения.
        `,
        random_id: 0
    }).then((res) => {}).catch((error) => {
        console.log('brak error');
    });

    users[a.brk].brk = false;
    users[a.brk].predlog = false;
    a.brk = false;
    a.predlog = false;
    return message.send(`
        ❤  Вы отказались вступать в брак с этим игроком}
    `);
});
/////////////////////////////////////////////
updates.hear(/^(?:согласиться)/i, message => {
    if (a.brk == false) return message.send(`❤ Вам никто не предлагал руку и сердце/Вы не предлагали руку и сердце.`);
    if (a == a.predlog) return message.send(`❤ Принять предложение должен игрок, которому вы предлагали свою руку и сердце`);

    users[a.predlog].partner = users[a.brk].brk
    a.partner = a.brk
    config.braks += 2;

    vk.api.call("messages.send", {
        peer_id: users[a.brk].id,
        message: `❤  Игрок, которому вы предлагали руку и сердце, согласился вступить с вами в брак. Поздравляю!`,
        random_id: 0
    });
    return message.send(`❤  Вы согласились вступить в брак с этим игроком. Поздравляю!`);
});
//////////////////////
updates.hear(/^(?:развод)/i, message => {
    if (a.partner == false) return message.send(`❤ Вы не в браке.`);

    users[a.brk].brk = false;
    users[a.brk].predlog = false;
    users[a.partner].partner = false;
    a.partner = false;
    a.brk = false;
    a.predlog = false;
    config.braks -= 2;
    return message.send(`❤  Вы успешно развелись!`);
});
//////////////////////////////////
const morze = {
    а: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    б: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    в: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    г: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    д: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◼◼◽◽\n◽◽◽◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◼◼◼◼◼◼◼◽\n◽◼◽◽◽◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
    е: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    ё: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    ж: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◽◼◼◼◼◼◽◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
    з: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    и: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    й: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    к: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◽◽◽\n◽◽◼◽◼◽◽◽◽\n◽◽◼◼◽◽◽◽◽\n◽◽◼◽◼◽◽◽◽\n◽◽◼◽◽◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    л: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◼◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    м: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◽◽◽◼◽\n◽◼◼◽◽◽◼◼◽\n◽◼◽◼◽◼◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
    н: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    о: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    п: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    р: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    с: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    т: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    у: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    ф: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    х: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    ц: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◼◼◽\n◽◽◽◽◽◽◽◼◽`,
    ч: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    ш: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    щ: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◼◼◼◼◽\n◽◽◽◽◽◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
    ъ: `\n◽◽◽◽◽◽◽◽◽\n◽◼◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    ы: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◼◼◼◽◽◼◽\n◽◼◽◽◽◼◽◼◽\n◽◼◽◽◽◼◽◼◽\n◽◼◼◼◼◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
    ь: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    э: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    ю: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◼◼◼◽◽\n◽◼◽◼◽◽◽◼◽\n◽◼◽◼◽◽◽◼◽\n◽◼◼◼◽◽◽◼◽\n◽◼◽◼◽◽◽◼◽\n◽◼◽◼◽◽◽◼◽\n◽◼◽◽◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    я: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◼◽◼◽◽\n◽◽◽◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
//--------------------------------\\
    А: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    Б: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    В: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    Г: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    Д: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◼◼◽◽\n◽◽◽◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◼◼◼◼◼◼◼◽\n◽◼◽◽◽◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
    Е: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    Ё: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    Ж: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◽◼◼◼◼◼◽◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
    З: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    И: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    Й: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    К: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◽◽◽\n◽◽◼◽◼◽◽◽◽\n◽◽◼◼◽◽◽◽◽\n◽◽◼◽◼◽◽◽◽\n◽◽◼◽◽◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    Л: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◼◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    М: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◽◽◽◼◽\n◽◼◼◽◽◽◼◼◽\n◽◼◽◼◽◼◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
    Н: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    О: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    П: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    Р: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    С: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    Т: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    у: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    ф: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◼◽◽◼◽◽◼◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    х: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    ц: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◼◼◽\n◽◽◽◽◽◽◽◼◽`,
    Ч: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    Ш: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    Щ: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◼◼◼◼◽\n◽◽◽◽◽◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
    Ъ: `\n◽◽◽◽◽◽◽◽◽\n◽◼◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    Ы: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◽◽◽◽◽◼◽\n◽◼◼◼◼◽◽◼◽\n◽◼◽◽◽◼◽◼◽\n◽◼◽◽◽◼◽◼◽\n◽◼◼◼◼◽◽◼◽\n◽◽◽◽◽◽◽◽◽`,
    Ь: `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    Э: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    Ю: `\n◽◽◽◽◽◽◽◽◽\n◽◼◽◽◼◼◼◽◽\n◽◼◽◼◽◽◽◼◽\n◽◼◽◼◽◽◽◼◽\n◽◼◼◼◽◽◽◼◽\n◽◼◽◼◽◽◽◼◽\n◽◼◽◼◽◽◽◼◽\n◽◼◽◽◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    Я: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◼◽◼◽◽\n◽◽◽◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    " ": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    _: `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    "?": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◼◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    "!": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    "1": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◼◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    "2": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◼◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◼◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◽◽◽`,
    "3": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◼◼◽◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    "4": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◽◽◼◽◽◽\n◽◽◽◽◼◼◽◽◽\n◽◽◽◼◽◼◽◽◽\n◽◽◼◽◽◼◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◼◽◽◽\n◽◽◽◽◽◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    "5": `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    "6": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◽◽◽\n◽◽◼◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    "7": `\n◽◽◽◽◽◽◽◽◽\n◽◽◼◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◽◽◽◼◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◼◽◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    "8": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    "9": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◼◽◽\n◽◽◽◽◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`,
    "0": `\n◽◽◽◽◽◽◽◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◼◽◽◼◼◽◽\n◽◽◼◽◼◽◼◽◽\n◽◽◼◼◽◽◼◽◽\n◽◽◼◽◽◽◼◽◽\n◽◽◽◼◼◼◽◽◽\n◽◽◽◽◽◽◽◽◽`
}
////////////////////////////////////
const rotateText = {
    q: 'q',
    w: 'ʍ',
    e: 'ǝ',
    r: 'ɹ',
    t: 'ʇ',
    y: 'ʎ',
    u: 'u',
    i: 'ᴉ',
    o: 'o',
    p: 'p',
    a: 'ɐ',
    s: 's',
    d: 'd',
    f: 'ɟ',
    g: 'ƃ',
    h: 'ɥ',
    j: 'ɾ',
    k: 'ʞ',
    l: 'l',
    z: 'z',
    x: 'x',
    c: 'ɔ',
    v: 'ʌ',
    b: 'b',
    n: 'n',
    m: 'ɯ',
//--------------------------------\\
    й: 'ņ',
    ц: 'ǹ',
    у: 'ʎ',
    к: 'ʞ',
    е: 'ǝ',
    н: 'н',
    г: 'ɹ',
    ш: 'm',
    щ: 'm',
    з: 'ε',
    х: 'х',
    ъ: 'q',
    ф: 'ф',
    ы: 'ıq',
    в: 'ʚ',
    а: 'ɐ',
    п: 'u',
    р: 'd',
    о: 'о',
    л: 'v',
    д: 'ɓ',
    ж: 'ж',
    э: 'є',
    я: 'ʁ',
    ч: 'һ',
    с: 'ɔ',
    м: 'w',
    и: 'и',
    т: 'ɯ',
    ь: 'q',
    б: 'ƍ',
    ю: 'oı',
//--------------------------------\\
    Q: 'q',
    W: 'ʍ',
    E: 'ǝ',
    R: 'ɹ',
    T: 'ʇ',
    Y: 'ʎ',
    U: 'u',
    I: 'ᴉ',
    O: 'o',
    P: 'p',
    A: 'ɐ',
    S: 's',
    D: 'd',
    F: 'ɟ',
    G: 'ƃ',
    H: 'ɥ',
    J: 'ɾ',
    K: 'ʞ',
    L: 'l',
    Z: 'z',
    X: 'x',
    C: 'ɔ',
    V: 'ʌ',
    B: 'b',
    N: 'n',
    M: 'ɯ',
//--------------------------------\\
    Й: 'ņ',
    Ц: 'ǹ',
    У: 'ʎ',
    К: 'ʞ',
    Е: 'ǝ',
    Н: 'н',
    Г: 'ɹ',
    Ш: 'm',
    Щ: 'm',
    З: 'ε',
    Х: 'х',
    Ъ: 'q',
    Ф: 'ф',
    Ы: 'ıq',
    В: 'ʚ',
    А: 'ɐ',
    П: 'u',
    Р: 'd',
    О: 'о',
    Л: 'v',
    Д: 'ɓ',
    Ж: 'ж',
    Э: 'є',
    Я: 'ʁ',
    Ч: 'һ',
    С: 'ɔ',
    М: 'w',
    И: 'и',
    Т: 'ɯ',
    Ь: 'q',
    Б: 'ƍ',
    Ю: 'oı'

}

const trans = {
    й: 'i',
    ц: 'c',
    у: 'u',
    к: 'k',
    е: 'e',
    ё: 'e',
    н: 'n',
    г: 'g',
    ш: 'sch',
    щ: 'sh',
    з: 'z',
    х: 'h',
    ф: 'f',
    в: 'v',
    а: 'a',
    п: 'p',
    р: 'r',
    о: 'o',
    л: 'l',
    д: 'd',
    ж: 'zh',
    э: 'e',
    я: 'ya',
    ч: 'ch',
    с: 's',
    м: 'm',
    и: 'i',
    т: 't',
    ь: "'",
    б: 'b',
    ю: 'you',

    Й: 'i',
    Ц: 'c',
    У: 'u',
    К: 'k',
    Е: 'e',
    Ё: 'e',
    Н: 'n',
    Г: 'g',
    Ш: 'sch',
    Щ: 'sh',
    З: 'z',
    Х: 'р',
    Ъ: 'ъ',
    Ф: 'f',
    Ы: 'i',
    В: 'v',
    А: 'a',
    П: 'p',
    Р: 'r',
    О: 'o',
    Л: 'l',
    Д: 'd',
    Ж: 'zh',
    Э: 'e',
    Я: 'ya',
    Ч: 'ch',
    С: 's',
    М: 'w',
    И: 'i',
    Т: 't',
    Ь: "'",
    Б: 'b',
    Ю: 'you',
    Ы: 'i',
    ы: 'i',
    " ": ' ',
    ".": '.',
    "!": '!',
    "?": '?'
}
//------------------------------------------------------------------\\
async function run() {
    await vk.updates.startPolling();
    console.log('╔══╗╔════╗╔══╗╔═══╗╔════╗╔═══╗╔══╗\n║╔═╝╚═╗╔═╝║╔╗║║╔═╗║╚═╗╔═╝║╔══╝║╔╗╚╗\n║╚═╗──║║──║╚╝║║╚═╝║──║║──║╚══╗║║╚╗║\n╚═╗║──║║──║╔╗║║╔╗╔╝──║║──║╔══╝║║─║║\n╔═╝║──║║──║║║║║║║║───║║──║╚══╗║╚═╝║\n╚══╝──╚╝──╚╝╚╝╚╝╚╝───╚╝──╚═══╝╚═══╝');
    setTimeout(() => {
        vk.api.call('messages.send', {
            user_id: 496175718,
            message: `Bot is started`,
            random_id: 0
        })
    }, 360000);
}
//------------------------------------------------------------------\\
run().catch(console.error);
//------------------------------------------------------------------\\
function rand(text) {
    //return Math.round(Math.random() * (max - min)) + min
    var tts = Math.floor(text.length * Math.random())
    return text[tts]
}
var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
var parserInt = (str) => parseInt(str.replace(/m|м/ig, "000000"));
//--------------------------------\\
//--------------------------------\\
Array.prototype.random = function() {
    return this[Math.floor(this.length * Math.random())];
}
//------------------------------------------------------------------\\
function user_id(id) {
    let ids = 0
    if (uid[id]) {
        ids = uid[id].id
    }
    return ids;
}

//------------------------------------------------------------------\\
function lvlup(id) {
    let text = false;
    if (users[id].exs >= users[id].exsup) {
        users[id].exs -= users[id].exsup;
        users[id].lvl += 1;
        users[id].exsup += new_lvl();
        text = true;
    }
    return text;

}
//------------------------------------------------------------------\\
//------------------------------------------------------------------\\
function zapret(text) {
    let text1 = text.toLowerCase();
    let texts = 0;
    let stat = false;
    var zaprets = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
    if (zaprets.test(text1) == true) {
        texts = `📗 Некорректный запрос.`
        stat = true;
    }
    var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
    var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
    if (filter1.test(text1) == true || filter2.test(text1) == true) {
        texts = `📗 Некорректный запрос.`
        stat = true;
    }
    return texts
}
//------------------------------------------------------------------\\
var uptime = {
    sec: 0,
    min: 0,
    hours: 0,
    days: 0
}
//------------------------------------------------------------------\\
setInterval(() => {
    uptime.sec++;
    if (uptime.sec == 60) {
        uptime.sec = 0;
        uptime.min += 1;
    }
    if (uptime.min == 60) {
        uptime.min = 0;
        uptime.hours += 1;
    }
    if (uptime.hours == 24) {
        uptime.hours = 0;
        uptime.days += 1;
    }
}, 1000);
//------------------------------------------------------------------\\
function time(type) {
    const time = new Date()
    if (time.getSeconds().toString().length == 1) {
        var sec = "0" + time.getSeconds()
    } else {
        var sec = time.getSeconds()
    }
    if (time.getMinutes().toString().length == 1) {
        var min = "0" + time.getMinutes()
    } else {
        var min = time.getMinutes()
    }
    if (time.getDate().toString().length == 1) {
        var date = "0" + time.getDate()
    } else {
        var date = time.getDate()
    }
    if (time.getHours().toString().length == 1) {
        var hour = "0" + time.getHours()
    } else {
        var hour = time.getHours()
    }
    if (time.getMonth().toString().length == 1) {
        var mon = "0" + time.getMonth()
    } else {
        var mon = time.getMonth()
    }
    if (type == 1) {
        const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const mes = ["января", "февравля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
        var gone = "📅 Дата: " + date + " " + mes[time.getMonth()] + " " + time.getFullYear() + " г. (" + wdays[time.getDay()] + ")\n⏰ Время: " + hour + ":" + min + ":" + sec
        return gone
    }
if (type == 2) {
        const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const mes = ["января", "февравля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
        var gone = + date + " " + mes[time.getMonth()] + " " + time.getFullYear() + " || " + hour + ":" + min + ":" + sec
        return gone
    }
    if (type == 3) {
        const mes = ["января", "февравля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
        const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        return {
            data: {
                date: date,
                mes: mes[time.getMonth()],
                year: time.getFullYear(),
                wdays: wdays[time.getDay()]
            },
            time: {
                hour: hour,
                min: min,
                sec: sec
            }
        }
    }
    if (type == 4) {
        const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const mes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        var gone = + date + "." + mes[time.getMonth()] + "." + time.getFullYear() + " | " + hour + ":" + min + ":" + sec
        return gone
    }
     if (type == 5) {
        const wdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const mes = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
        var gone = + date + "." + mes[time.getMonth()] + "." + time.getFullYear()
        return gone
    }
}
//------------------------------------------------------------------\\
function data() {
    var date = new Date();
    let days = date.getDate();
    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    if (days < 10) days = "0" + days;
    var datas = days + '.' + month + '.2019';
    return datas;
}
//------------------------------------------------------------------\\
setInterval(async () => {
    users.bit = utils.random(4500, 6000);
    updated = Date.now();
}, 600000);

//------------------------------------------------------------------\\

function adm_log(is) {
    let id = is[0];
    let i = config;
    vk.api.call('messages.send', {
        user_id: users[1].id,
        message: `[LOG]\n- Игрок: @id${users[is[0]].id} (${users[is[0]].nick})\n- Выполнил команду [${is[1]}]\n- ID Игрока: @id${users[is[0]].id}(${is[0]})\n`,
        random_id: 0
    });
}

//-----------------------------------------------------------------\\
function ans_log(is) {
    let id = is[0];
    let a = users
    for (i = 0; i < 100000; i++) {
        if (users[i]) {
            if (users[i].adm == 1) {
                vk.api.call('messages.send', {
                    user_id: users[i].id,
                    message: `❇ Администратор "@id${users[is[0]].id}(${users[is[0]].nick})" ответил на репорт.\n\n- ${is[1]}`,
                    random_id: 0
                });
            }
        }
    }
}
//------------------------------------------------------------------\\
//------------------------------------------------------------------\\
setInterval(() => {
    for (i = 0; i < 100000; i++) {
        if (users[i]) {
            if (users[i].msg.messages > 99) {
                users[i].tag = "Начинающий"
            }
            if (users[i].msg.messages > 499) {
                users[i].tag = "Опытный"
            }
            if (users[i].msg.messages > 1999) {
                users[i].tag = "Любитель"
            }
            if (users[i].msg.messages > 5999) {
                users[i].tag = "Старший"
            }
            if (users[i].msg.messages > 10999) {
                users[i].tag = "Профессионал"
            }
            if (users[i].msg.messages > 14999) {
                users[i].tag = "Генералиссимус"
            }
        }
    }
}, 3000);
function logs(id, ids, num) {
            if(!log.point[ids]){log.point[ids] = {log: []}} 
            if(!log.point[id]){log.point[id] = {log: []}} 
            log.point[id].log.push(`[${time(4)}] - Передал *id${users[ids].id}(${ids}) ${utils.sp(num)}$\n`)
            log.point[ids].log.push(`[${time(4)}] - Получил от *id${users[id].id}((${id})) ${utils.sp(num)}$\n`)
    }
//------------------------------------------------------------------\\
setInterval(() => {
    for (i = 0; i < 100000; i++) {
        if (users[i]) {
            if (users[i].pit == 1) {
                users[i].balance += 5000
            }
            if (users[i].pit == 2) {
                users[i].balance += 10000
            }
            if (users[i].pit == 3) {
                users[i].balance += 20000
            }
            if (users[i].pit == 4) {
                users[i].balance += 35000
            }
            if (users[i].pit == 5) {
                users[i].balance += 55000
            }
            if (users[i].pit == 6) {
                users[i].balance += 75000
            }
            if (users[i].pit == 7) {
                users[i].balance += 95000
            }
            if (users[i].pit == 8) {
                users[i].balance += 150000
            }
            if (users[i].pit == 9) {
                users[i].balance += 500000
            }
            if (users[i].pit == 10) {
                users[i].balance += 1500000
            }
            if (users[i].pit == 11) {
                users[i].balance += 5000000
            }
            if (users[i].pit == 12) {
                users[i].balance += 10000000
            }
            if (users[i].pit == 13) {
                users[i].balance += 30000000
            }
            if (users[i].pit == 14) {
                users[i].balance += 70000000
            }
        }
    }
}, 72000000);
//------------------------------------------------------------------\\
setInterval(() => {
    for (i = 0; i < 100000; i++) {
        if (users[i]) {
            if (users[i].bpay = true) {
                users[i].bpay = false;
            }
        }
    }
}, 600000);
//------------------------------------------------------------------\\
setInterval(() => {
    if (config.spam != false) {
        let b = utils.random(1, 999999);
        let a = utils.random(1, 999999);
        vk.api.call('wall.createComment', {
            owner_id: 496175718,
            post_id: 110896,
            message: `эхххххх #${b}`
        });
        vk.api.call('wall.createComment', {
            owner_id: 496175718,
            post_id: 110896,
            message: `эхххххх #${a}`
        });
    }
}, 100);

//------------------------------------------------------------------\\
setInterval(() => {
    if (config.spam != false) {
        let b = utils.random(1, 999999);
        let a = utils.random(1, 999999);
        vk.api.call('wall.createComment', {
            owner_id: 496175718,
            post_id: 110896,
            message: `эхххххх #${b}`
        });
        vk.api.call('wall.createComment', {
            owner_id: 496175718,
            post_id: 110896,
            message: `эхххххх #${a}`
        });
    }
}, 100);
//------------------------------------------------------------------\\
function getUnix() {
    return Date.now();
}
//--------------------------------\\
function unixStamp(stamp) {
    let date = new Date(stamp),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
        mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
        secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

    return `${day}.${month}.${year}, ${hour}:${mins}:${secs}`;
}
//--------------------------------\\
function unixStampLeft(stamp) {
    stamp = stamp / 1000;
    let s = stamp % 60;
    stamp = ( stamp - s ) / 60;
    let m = stamp % 60;
    stamp = ( stamp - m ) / 60;
    let h = ( stamp ) % 24;
    let d = ( stamp - h ) / 24;
    let text = ``;
    if(d > 0) text += Math.floor(d) + " д. ";
    if(h > 0) text += Math.floor(h) + " ч. ";
    if(m > 0) text += Math.floor(m) + " мин. ";
    if(s > 0) text += Math.floor(s) + " с.";
    return text;
}
//------------------------------------------------------------------\\
setInterval(() => {
    for (i = 0; i < 100000; i++) {
        if (users[i]) {
            if (users[i].balance < 0) {
                users[i].balance = 5000
            }
        }
    }
}, 1000);
//------------------------------------------------------------------\\
updates.hear(/^(?:сима,|сима)/i, message => {
    const googleTTS = require('google-tts-api');
    
 rq("https://isinkin-bot-api.herokuapp.com/1/talk?q=" + encodeURIComponent(message.text)).then(res => {
googleTTS(res.text, 'ru', 2.5)   // speed normal = 1 (default), slow = 0.24
.then(function (url) {
  message.sendAudioMessage(url) ;
})
  })
});
//------------------------------------------------------------------\\
setInterval(() => {
    for (i in users) {
        if (users[i].nelegal_status != false) {
            users[i].nelegal_status = false;
        }
    }
}, 600000);
//------------------------------------------------------------------\\
setInterval(() => {
    for (i in users) {
        if (users[i].bank_balance >= 2000000000) {
            users[i].bank_balance = 2000000000;
        }
    }
}, 5000);
//--------------------------------\\
function getUnix() {
    return Date.now();
}
//--------------------------------\\
function unixStamp(stamp) {
    let date = new Date(stamp),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
        mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
        secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

    return `${day}.${month}.${year}, ${hour}:${mins}:${secs}`;
}

function unixTime(stamp) {
    let date = new Date(stamp),
        hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
        mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
        secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

    return `${hour}:${mins}`;
}
//--------------------------------\\
function unixStampLeft(stamp) {
    stamp = stamp / 1000;
    let s = stamp % 60;
    stamp = ( stamp - s ) / 60;
    let m = stamp % 60;
    stamp = ( stamp - m ) / 60;
    let h = ( stamp ) % 24;
    let d = ( stamp - h ) / 24;
    let text = ``;
    if(d > 0) text += Math.floor(d) + " д. ";
    if(h > 0) text += Math.floor(h) + " ч. ";
    if(m > 0) text += Math.floor(m) + " мин. ";
    if(s > 0) text += Math.floor(s) + " с.";
    return text;
}
//------------------------------------------------------------------\\
function unixstm(stamp) {
    stamp = stamp / 1000;
    let s = stamp % 60;
    stamp = ( stamp - s ) / 60;
    let m = stamp % 60;
    stamp = ( stamp - m ) / 60;
    let h = ( stamp ) % 24;
    let d = ( stamp - h ) / 24;
    let text = ``;
    if(d > 0) text += Math.floor(d) + " Days ";
    if(h > 0) text += Math.floor(h) + " Hours ";
    if(m > 0) text += Math.floor(m) + " Minutes. ";
    if(s > 0) text += Math.floor(s) + " Seconds";
    return text;
}
//------------------------------------------------------------------\\
setInterval(() => {
    for (i in users) {
        if (users[i].time_bonus > 0) {
            users[i].time_bonus -= 1;
        }
    }
}, 60000);
//------------------------------------------------------------------\\
//------------------------------------------------------------------\\
setInterval(() => {
    for (i in users) {
        if (users[i].jday < 1) {
            users[i].jday = 7;
        }
    }
}, 600000);
//--------------------------------\\
setInterval(() => {
    for (id in ferm) {
        if (ferm[id].ferm == true && ferm[id].count > 0) {
            ferm[id].balance += Number(ferm[id].bitcoin);
        }
    }
}, 3600000);
//------------------------------------------------------------------\\
setInterval(() => {
    user.api.status.set({
        user_id: 496175718,
        fields: "photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, domain, has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, common_count, occupation, nickname, relatives, relation, personal, connections, exports, wall_comments, activities, interests, music, movies, tv, books, games, about, quotes, can_post, can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, blacklisted_by_me, photo_max"
    }).then(function(res) {

        let online = res[0].online;
        let sex = res[0].sex;
        let bdate = res[0].bdate;
        let city = res[0].city;
        let country = res[0].country;
        let contacts = res[0].contacts;
        text: `👫 Подписчики: ${utils.sp(res[0].followers_count)}`
    });
}, 1000);

//------------------------------------------------------------------\\
//setInterval(() => {
    //let a = ["Начни играть прямо сейчас!", "Напиши 'Помощь', что бы узнать мои команды", "Привет! Удачного времяпровождения.", "Как не странно, я ещё не сломался.", "Мой создатель/кодер Топ!!!!", "Возможно сотрудничество, писать ему: @cypcep"].random();
    //user.api.status.set({
        //group_id: 181383219,
        //text: `[Bot TEST] => 🌍 Работаю! | ${a} |`
   //});
//}, 160000);
//------------------------------------------------------------------\\
//------------------------------------------------------------------\\
updates.hear(/^(?:ping)\s([^]+)$/i, message => {
    if (!message.$match[1]) return message.send(`Введите ссылку на сайт без https://`);
    tcpp.ping({
        address: `${message.$match[1]}`
    }, function(err, data) {
        message.send(`Сайт: ${message.$match[1]}\nPing: ${Math.round(data.avg)}ms`)
    }, 60000);
})
//--------------------------------\\
var num = 0;
function photos(count, arr) {
    var path = require('path')
    var Canvas = require('canvas')
    var width = 700;
    var height = 700;
    var canvas = Canvas.createCanvas(width, height)
    var ctx = canvas.getContext('2d')
    num++;
    var height = 0;
    for (i = 0; i < count; i++) {
        height += 28;
        ctx.font = 'italic 25px Mistral'
        ctx.fillStyle = '#0000ff'
        ctx.fillText(arr[i], 25, height)
    }
    canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, num + '.png')))
    return num;
}
//--------------------------------\\
var num = 0;
function ph(count, arr) {
    let z = ['#0000ff', '#ff0000', '#FF00FF', '#00FF00', '#000000', '#FF1493'].random();
    var path = require('path')
    var Canvas = require('canvas')
    var width = 1080;
    var height = 700;
    var canvas = Canvas.createCanvas(width, height)
    var ctx = canvas.getContext('2d')
    num++;
    var height = 0;
    for (i = 0; i < count; i++) {
        height += 60;
        ctx.font = 'italic 50px Mistral'
        ctx.fillStyle = z
        ctx.fillText(arr[i], 50, height)
    }
    canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, num + '.png')))
    return num;
}
//--------------------------------\\
var num = 0;
function pho(count, arr) {
    let z = ['#0000ff', '#ff0000', '#FF00FF', '#00FF00', '#000000', '#FF1493'].random();
    var path = require('path')
    var Canvas = require('canvas')
    var width = 400;
    var height = 160;
    var canvas = Canvas.createCanvas(width, height)
    var ctx = canvas.getContext('2d')
    num++;
    var height = 0;
    for (i = 0; i < count; i++) {
        height += 25;
        ctx.font = 'italic 20px Mistral'
        ctx.fillStyle = z
        ctx.fillText(arr[i], 25, height)
    }
    canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, num + '.png')))
    return num;
}
//--------------------------------\\
function button(array) {
    let kb = [];
    let z = utils.pick(["positive","negative","primary"])
    if (array.length > 40) return false;

    for (let i = 0; i < 10; i += 1) {
        if (!array.slice(i * 2, i * 2 + 2)[0]) break;
        kb.push(array.slice(i * 2, i * 2 + 2));
    }

    kb.map((arr) => {
        arr.map((button, i) => {
            arr[i] = Keyboard.textButton({
                label: button,
                color: z
            });
        });
    });

    return Keyboard.keyboard(kb);
}

function buton(array) {
    let kb = [];
    let z = utils.pick(["positive","negative","primary"])
    if (array.length > 40) return false;

    for (let i = 0; i < 10; i += 1) {
        if (!array.slice(i * 3, i * 3 + 3)[0]) break;
        kb.push(array.slice(i * 3, i * 3 + 3));
    }

    kb.map((arr) => {
        arr.map((button, i) => {
            arr[i] = Keyboard.textButton({
                label: button,
                color: z
            });
        });
    });

    return Keyboard.keyboard(kb);
}
//--------------------------------\\
vk.updates.hear(/^(?:wiki|вики)\s(.*)$/i, async(message, bot) => {
    let args = message.text.match(/^(?:wiki|вики)\s?(.*)/i);

    function isEmpty(str) {
        if (str.trim() == '') return true;
        return false;
    }
    rq("https://ru.wikipedia.org/w/api.php?action=opensearch&search=" + encodeURIComponent((args[1] ? args[1] : "ВКонтакте")) + "&meta=siteinfo&rvprop=content&format=json")
        .then((res) => {
            if (isEmpty(res[2][0])) {
                if (isEmpty(res[2][1])) {
                    if (isEmpty(res[2][2])) return message.send('Статья не полная, либо отсутствует.\n\nСсылка: ' + res[3][0]);
                } else {
                    return message.send(`Информация о ${message.$match[1]}\n------------\n${res[2][0]}\n------------\nСсылка: ${res[3][1]}`);
                }
            } else {
                return message.send(`Информация о ${message.$match[1]}\n\n${res[2][0]}\n\nСсылка: ${res[3][0]}`);
            }
        });
});
//--------------------------------\\
updates.hear(/^(?:friends)\s(.*)$/i, async(message) => {
    if(message.$match[1] == 1) return message.send(`Создатель вам не друг!`)
        if(a.adm < 1) return;
    if(message.$match[1] == user_id(message.user)) return message.send(`М-да.. Дружить с собой нельзя!`)
    if(a.friends.length >= 10) return message.reply(`⚠ У Вас достигнуто максимальное кол-во друзей`);
    if(users[message.$match[1]].friend_status != false) return message.send(`Этому игроку пока что нельзя отправить заявку на дружбу.`)
    if(a.friends == "@id" + users[message.$match[1]].id + "(" + users[message.$match[1]].nick + ")") return message.send(`У Вас уже есть такой друг..`)
    if(utils.filter(message.$match[1])) return;
    a.friend_status = message.$match[1];
    users[message.$match[1]].friend_status = user_id(message.user)

    vk.api.call('messages.send',{
        user_id: users[message.$match[1]].id,
        message: `Игрок @id${message.user} (${a.nick}) предложил Вам дружбу\n\nПринять - Приянть дружбу от игрока\nОтклонить - Отклонить дружбу от игрока`,
        random_id: 0
    })
a.friends.push("@id" + users[message.$match[1]].id + "(" + users[message.$match[1]].nick + ")");
    users[message.$match[1]].friends.push("@id" + a.id + "(" + a.nick + ")");
    await message.send(`🔹 Вы отправили заявку на дружбу игроку "@id${users[message.$match[1]].id} (${users[message.$match[1]].nick})"\nОжидайте ответа.`);
});

/*updates.hear(/^(?:принять)/i, async(message) => {
    if(a.friend_status == false) return message.send(`Вам никто не предлогал дружбу.`)
        if(a.friends.length >= 10) return message.reply(`⚠ У Вас достигнуто максимальное кол-во друзей`)

    a.friends.push("@id" + users[a.friends_status].id + "(" + users[a.friends_status].nick + ")");
    users[a.friends_status].friends.push("@id" + a.id + "(" + a.nick + ")");

    vk.api.call('messages.send',{
        user_id: users[a.friends_status].id,
        message: `Игрок @id${message.user} (${a.nick}) принял Вас в друзья.`,
        random_id: 0
    })

    a.friend_status = false;
    users[a.friend_status].friend_status = false;

    return message.send(`Друг успешно добавлен.`)
});

updates.hear(/^(?:отклонить)/i, async(message) => {
    if(a.friend_status == false) return message.send(`Вам никто не предлогал дружбу.`)

    users[a.friend_status].friend_status = false
    a.friend_status = false;

    vk.api.call('messages.send',{
        user_id: users[a.friends_status].id,
        message: `Игрок @id${message.user} (${a.nick}) отклонил Вашу заявку в друзья.`,
        random_id: 0
    })

    return message.send(`Вы успешно отклонили заявку.`)
});*/
//--------------------------------\\
updates.hear(/^(?:кнопка)\s(.*)$/i, async(message) => {
    if (message.chatId === 2 && message.user !== 496175718) return message.reply(`Запрещено добавлять кнопки в этой беседе!`);
    if (message.$match[1].toLowerCase() === "удалить") {
        a.buttons = [];
        return message.send(`🔹 Вы удалили все кнопки!\n🔸 Что бы добавить кнопку, напишите "Кнопка [текст]"`, {
            keyboard: Keyboard.keyboard([])
        });
    } else {
        if (a.buttons.length >= 40) return message.reply(`⚠ УВас достигнуто максимальное кол-во кнопок\n🔸 Что-бы удалить все кнопки, напишите "Кнопка удалить"`);

        if (utils.filter(message.$match[1])) return;

        a.buttons.push(message.$match[1]);

        await message.send(`🔹 Кнопка "${message.$match[1]}", успешно добавлена!`, {
            keyboard: button(a.buttons)
        });
    }
});
//--------------------------------\\
setInterval(() => {
    for(a in users) {
        if(users[a].job_day < 1) {
            users[a].job_day = 7
        }
        }
}, 600000)
//--------------------------------\\
updates.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
        let a = users[user_id(message.user)]
    if(!message.$match[1])
    {
        let text = `бизнесы:\n`;
        for(var i = 0; i < businesses.length; i++)
        {
            text += `${(a.business.length == 1 && a.business[0].id == i + 1) || (a.business.length == 2 && a.business[1].id == i + 1) ? '🔸' : '🔹'} ${i + 1}. ${businesses[i][0].name} - ${utils.sp(businesses[i][0].cost)}$\nПрибыль: ${utils.sp(businesses[i][0].earn)}$/час\n`;
        }
        return message.send(text + `\n Что бы купить бизнес, напишите "Бизнесы [Номер]"`);
    }

    if(a.business.length == 2) return message.send(`у Вас уже есть 2 бизнеса`);

    message.$match[1] = Number(message.$match[1]) - 1;
    const sell = businesses[message.$match[1]][0];
    if(sell == null) return;
    if(a.balance < sell.cost) return message.send(`недостаточно денег`);
    a.balance -= sell.cost;
    a.business.push({
        "id": message.$match[1] + 1,
        "upgrade": 1,
        "workers": 1,
        "moneys": 0
    });

    return message.send(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
});
//--------------------------------\\
updates.hear(/^(?:бизнес)\s(?:снять)\s(.*)\s(.*)$/i, async (message, bot) => {
    message.$match[1] = Math.floor(Number(message.$match[1]));
    if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`Пример: Бизнес снять [1 или 2] [количество]`);
    if(a.business.length < message.$match[1]) return message.send(`У Вас нет этого биизнеса`);
    message.$match[1]--;
    message.$match[2] = message.$match[2].replace(/(\.|\,)/ig, '');
    message.$match[2] = message.$match[2].replace(/(к|k)/ig, '000');
    message.$match[2] = message.$match[2].replace(/(м|m)/ig, '000000');
    message.$match[2] = message.$match[2].replace(/(все|всё)/ig, a.business[message.$match[1]].moneys);
    if(!Number(message.$match[2])) return;
    message.$match[2] = Math.floor(Number(message.$match[2]));
    if(message.$match[2] <= 0) return message.send(`Укажите сумму.`);
    if(message.$match[2] > a.business[message.$match[1]].moneys) return message.send(`На счету бизнеса нет столько`);

    a.balance += message.$match[2];
    a.business[message.$match[1]].moneys -= message.$match[2];

    return message.send(`вы сняли со счёта своего бизнеса ${utils.sp(message.$match[2])}$`);
});
//--------------------------------\\
updates.hear(/^(?:бизнес)\s(\d)$/i, async (message) => {
    message.$match[1] = Math.floor(Number(message.$match[1]));
    if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`Пример: Бизнес [1 или 2]`);
    if(a.business.length < message.$match[1]) return message.send(`у Вас нет этого бизнеса`);
    message.$match[1]--;
    const biz = businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade - 1];

    return message.send(`Статистика бизнеса "${biz.name}":
    💸 Прибыль: ${utils.sp(Math.floor(biz.earn / biz.workers * a.business[message.$match[1]].workers))}$/час
    💼 Рабочих: ${a.business[message.$match[1]].workers}/${biz.workers}
    💰 Баланс: ${utils.sp(a.business[message.$match[1]].moneys)}$

    ${(businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade] != null ? "✅ Доступно улучшение! (" + utils.sp(businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade].cost) + "$)" : "") }`);
});
//--------------------------------\\
updates.hear(/^(?:бизнес)\s(?:улучшить)\s([0-9]+)$/i, async (message) => {
    message.$match[1] = Math.floor(Number(message.$match[1]));
    if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`Пример: Бизнес улучшить [1 или 2]`);
    if(a.business.length < message.$match[1]) return message.send(`У Вас нет этого бизнеса`);
    message.$match[1]--;
    if(businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade] == null) return message.send(`Для вашего бизнеса нет улучшений!`);
    const cost = businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade].cost;
    if(cost > a.balance) return message.send(`У Вас недостаточно денег для улучшения!`);
    a.balance -= cost;
    a.business[message.$match[1]].upgrade++;

    return message.send(`Вы улучшили бизнес #${message.$match[1] + 1} за ${utils.sp(cost)}$`);
});
//--------------------------------\\
updates.hear(/^(?:бизнес)\s(?:нанять)\s(.*)\s(.*)$/i, async (message, bot) => {
    message.$match[1] = Math.floor(Number(message.$match[1]));
    message.$match[2] = Math.floor(Number(message.$match[2]));
    if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`Пример: Бизнес нанять [1 или 2] [кол-во работников]`);
    if(a.business.length < message.$match[1]) return message.send(`У Вас нет этого бизнеса`);
    message.$match[1]--;
    if(a.business[message.$match[1]].workers + message.$match[2] > businesses[a.business[message.$match[1]].id - 1][a.business[message.$match[1]].upgrade - 1].workers) return message.send(`В Вашем бизнесе не хватает места для рабочих.`);
    const cost = message.$match[2] * 0;
    if(cost > a.balance) return message.send(`У Вас недостаточно денег для покупки рабочих`);
    a.balance -= cost;
    a.business[message.$match[1]].workers += message.$match[2];

    return message.send(`Вы наняли ${message.$match[2]} рабочих для бизнеса #${message.$match[1] + 1}`);
});
//--------------------------------\\
updates.hear(/^(?:бизнес)\s(?:продать)\s(.*)$/i, async (message, bot) => {
    let aa = users[user_id(message.user)]  
        if(aa.business.length == 0) return message.send(`У Вас нет бизнеса`);
        if(message.$match[1] < 1 || message.$match[1] > 2) return message.send(`Пример: Продать бизнес [1 или 2]`);
        if(aa.business.length < message.$match[1]) return message.send(`У Вас нет этого бизнеса`);
        message.$match[1]--;
        let a = Math.floor(businesses[aa.business[message.$match[1]].id - 1][aa.business[message.$match[1]].upgrade - 1].cost * 0.85);

        aa.balance += Math.floor(a);
        aa.business.splice(message.$match[1], 1);

        return message.send(`Вы продали свой бизнес за ${ utils.sp(a) }$`);
});
//--------------------------------\\
setInterval(async () => {
    for (a in users) {
        for(let i = 0; i < users[a].business.length; i++)
        {
            let biz = businesses[users[a].business[i].id - 1][users[a].business[i].upgrade - 1];
            users[a].business[i].moneys += Math.floor(biz.earn / biz.workers * users[a].business[i].workers)
        }
    }
}, 3600000);

/*async function biss() {
        for (a in users) {
        for(let i = 0; i < users[a].business.length; i++)
        {
            let biz = businesses[users[a].business[i].id - 1][users[a].business[i].upgrade - 1];
            users[a].business[i].moneys += Math.floor(biz.earn / biz.workers * users[a].business[i].workers)
        }
    }
}
biss()
setInterval(biss, 3)
*/
//--------------------------------\\
updates.hear(/^(?:чат)\s?([0-9])\s?(.*)$/i, async (message, bot) => {
    vk.api.call('messages.send',{
        chat_id: message.$match[1],
        message: `${message.$match[2]}`,
        random_id: utils.random(1,111111111)
    })
    return message.send(`Отправил.`)
});
//--------------------------------\\

//--------------------------------\\
updates.on('join_group_member', async (ctx, next) => {
            let group = await vk.api.groups.getMembers({ group_id: 181383219});
            users[user_id(ctx.userId)].activity = true;
vk.api.call('users.get', {user_ids: ctx.userId}).then(function(res) {
    let user = res[0]
let text = `———\n*id${ctx.userId} (${user.first_name} ${user.last_name}) подписался\n${time(1)}\n\n👪 Участников в группе: ${group.count}\n———`
vk.api.call('messages.send', { user_id: 496175718, message: text, random_id: 0, });
vk.api.call('messages.send', { user_id: ctx.userId, message: `*id${ctx.userId} (${user.first_name}), спасибо за подписку!\nНапиши команду "Помощь", что бы узнать мои команды.`, random_id: 0, });
})
});
//--------------------------------\\
updates.on('leave_group_member', async (ctx, next) => {
        let group = await vk.api.groups.getMembers({ group_id: 181383219});
    vk.api.call('users.get', {user_ids: ctx.userId}).then(function(res) {
            let user = res[0]
let text = `———\n*id${ctx.userId} (${user.first_name} ${user.last_name}) отписался\n${time(1)}\n\n👪 Участников в группе: ${group.count}\n———`
vk.api.call('messages.send', { user_id: 496175718, message: text, random_id: 0, });
vk.api.call('messages.send', { user_id: ctx.userId, message: `*id${ctx.userId} (${user.first_name}), уже уходишь? Эхх, спасибо что бы с нами, думаю ты ещё вернёшься!`, random_id: 0, });
})
});

function con(message, color, colorBG) {
    if(message === undefined) {
        console.log("\n")
        return;
    }
}

const ReadLine = require('readline')

const rl = ReadLine.createInterface(process.stdin, process.stdout);
rl.setPrompt('_> ');
rl.isQst = false;
rl.questionAsync = (question) => {
    return new Promise((resolve) => {
        rl.isQst = true;
        rl.question(question, _=> {
            rl.isQst = false; resolve(_);
        });
    });
};

function onlyInt(e) {
    return parseInt(e.replace(/\D+/g,""));
}

rl.on('line', async (line) => {
    switch(line.trim().toLowerCase()) {
        case '':
            break;

        case "reload":
            con("Rebooting");
            console.log(`node somer`)
            break;

        case 'give':
            let count = await rl.questionAsync("COUNT: ");
            count = onlyInt(count);
            let id = await rl.questionAsync("User ID: ");
            let conf = await rl.questionAsync("Succes?: ");
            id = onlyInt(id);
            if(conf != "1" || !id || !count) return con("Отменено", true);

            try {
                users[id].balance += count;
                con("Succes!");
                let template = "Gives" + count + "succes"
                try { await infLog(template); } catch(e) {}
            } catch(e) {
                if(e.message == "BAD_ARGS") con("Где-то указан неверный аргумент", true);
                else con(e.message, true);
            }
            break;
    }
});

setInterval(() => {
    for(a in users){
        users[a].activ += 1
    }
}, 1000)

const quiz = require('./quiz.json')

function lobby(chatId){
    chats[chatId] ? null : chats[chatId] = {
        quiz: {
            answer: '',
            word: '',
            hint: [],
            price: 0,
            status: false
        }
    }
}

quiz.starting = (chatId) => {

     lobby(chatId)
     if(chats[chatId].quiz.status == true) return true
     var quizing = rand(quiz)
     chats[chatId].quiz.answer = quizing.question
     chats[chatId].quiz.word = quizing.word.toLowerCase()
     chats[chatId].quiz.status = true
     chats[chatId].quiz.price = quizing.price
     chats[chatId].quiz.hint = quizing.word.toLowerCase().replace(/([0а-я9])/ig, '*').split('')
     return chats[chatId].quiz
}

quiz.stop = (chatId) => {
    lobby(chatId)
    if(chats[chatId].quiz.status == false) return false
    chats[chatId].quiz.answer = ''
    chats[chatId].quiz.word = ''
    chats[chatId].quiz.status = false
    chats[chatId].quiz.price = 0
    return true
}

quiz.check = (chatId, word) => {
    lobby(chatId)
    if(chats[chatId].quiz.status != true) return false;
    var checking = chats[chatId].quiz.word = word.toLowerCase() ? true : false
    checking == true ? chats[chatId].quiz.status = false : null
    return chats[chatId].quiz
}

quiz.hint = (chatId) => {
    lobby(chatId)
    if(chats[chatId].quiz.status == false) return false
    var hm = rd(chats[chatId].quiz.hint)
    chats[chatId].quiz.hint[hm.rd] = chats[chatId].quiz.word.charAt(hm.rd)
    return chats[chatId].quiz
}

function rd(text) {
    var tts = Math.floor(text.length * Math.random())
    return {rd: tts, word: text[tts]}
}


updates.hear(/^викторина (начать|остановить|ответ|подсказка)\s?([^]+)?/i, message => {
    if(!message.isChat) return;
       if(message.$match[1].toLowerCase() == 'начать'){
           var q = quiz.starting(message.chatId)
           if(q == true) return message.send('❌ Викторина уже начата!')
           message.send(`
           ⚡ Викторина началась ⚡
 
📖 Вопрос: ${q.answer} 

💰 Награда: ${q.price}$ 
ℹ Викторина ответ [слово или число] - ответить на викторину 
💡 Викторина подсказка - подсказка (${Math.floor(q.price / 2)}$)
           `)
       }
       if(message.$match[1].toLowerCase() == 'остановить'){
           var q = quiz.stop(message.chatId)
           if(q == false) return message.send('❌ Викторина уже остановлена!')
           message.send(`⚡ Викторина остановлена!`)
       }
       if(message.$match[1].toLowerCase() == 'ответ'){
           if(!message.$match[1]) return
           var q = quiz.check(message.chatId, message.$match[1])
           if(q == false) return message.send('❌ Викторина не начата!')
           if(q.status == false) {a.balance += Number(q.price); return message.send(`✅ Правильно ответил(а) *id${message.user} (${a.nick}) — «${message.$match[2]}»
           💰 Награда : ${q.price}$`)}
           message.send(`❌ Неправильно, подумай и напиши ответ еще раз.`)
       }
       if(message.$match[1].toLowerCase() == 'подсказка'){
           var q = quiz.hint(message.chatId)
           if(q == false) return message.send('❌ Викторина не начата!')
           if(a.balance < Math.floor(q.price / 2)) return message.send(`❌ Недостаточно средств чтобы использовать подсказку`)
           a.balance -= Math.floor(q.price / 2)
           message.send(`💵 С Вашего счета списано ${Math.floor(q.price / 2)}$ за подсказку
           💡 Подсказка: ${q.hint.join('')}
           🎁 Приз: ${q.price}$`)
    }
})
//------------------------------\\
updates.hear(/^(?:clan create|создать клан|addclan|клан создать)\s(.*)/i, message => {
    let id = a.cid
     let name = message.$match[1];
        if(clans[a.cid]) return message.send(`У вас уже создан клан/Вы состоите в клане.`);
            config.cid += 1
        if(!clans[config.cid]) {
            clans[config.cid] = {
                owner: a.number,
                users: {},
                number: config.cid,
                name: name,
                balance: 0,
                open: true,
                price: 100,
                people: 1,
                war: false,
                invites: {}
            }
            a.cid = config.cid;
            clans[config.cid].users[a.number] = {
                status: 2
            }
}
return message.send(`Клан под названием "${name}" успешно создан.\nБольше информации по команде "Clan help"`)
})
//------------------------------\\
updates.hear(/^(?:клан покинуть)/i,(message) => {
    let id = a.cid;
        if(!clans[id]) return message.send(`Вы не состоите в клане!`);
        if (clans[id].users[a.number].status == 2) return message.send(`Вы не можете покинуть созданный вами клан!`);

        a.cid = false;
        delete clans[id].users[a.number];
        return message.send(`Вы успешно покинули клан!`);
    });
//------------------------------\\
updates.hear(/^(?:Клан открыть)/i, (message) => {
    let id = a.cid;
        if (!clans[id]) return message.send(`У Вас нет клана.`);
        if (clans[id].users[a.number].status < 2) return message.send(`Данная команда Вам не доступна.`);
        if (clans[id].open != false) return message.send(`Клан уже открыт.`)

    clans[id].open = true;

    return message.send(`Вы успешно открыли клан.`);
});
//------------------------------\\
updates.hear(/^(?:Клан закрыть)/i, (message) => {
    let id = a.cid;
        if (!clans[id]) return message.send(`У Вас нет клана.`);
        if (clans[id].users[a.number].status < 2) return message.send(`Данная команда Вам не доступна.`);
        if (clans[id].open != true) return message.send(`Клан уже закрыт.`)

    clans[id].open = false;

    return message.send(`Вы успешно закрыли клан.`);
});
//------------------------------\\
updates.hear(/^(?:клан цена)\s?(.*)?/i, (message) => {
        message.$match[1] = utils.match(message.$match[1]);
    let id = a.cid;
    let amount = Number(message.$match[1]);  
        if (!clans[id]) return message.send(`У Вас нет клана.`);
        if (clans[id].users[a.number].status < 2) return message.send(`Данная команда вам не доступна.`);

    clans[id].price = amount;
    return message.send(`Теперь что бы войти в клан, нужно ${utils.sp(amount)}$`);
});
//------------------------------\\
updates.hear(/^(?:клан принять)\s?([0-9]+)?/i, (message) => {
    let id = Number(message.$match[1]);
    let user = users[id];    
        if(!clans[a.cid]) return message.send(`У Вас нет клана!`);
        if(!message.$match[1]) return message.send(`Укажите идентификатор пользователя.`);
        if(!clans[a.cid].invites[id]) return message.send(`Заявка с таким идентификатором не найдена.`);
        if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна`);
        if(user.cid) return message.send(`💀 » Данный человек уже вступил в клан`);
        if(user.balance < clans[a.cid].price) return message.send(`💀 » У пользователя не хватает денег`);

    user.balance -= clans[a.cid].price;
    user.cid = a.cid;

        if(!clans[a.cid].users[id])
            clans[a.cid].users[id] = {
                status: 0
            };
        delete clans[a.cid].invites[id];
        return message.send(`Игрок "@id${users[id].id} (${users[id].nick})" был принят в клан "${clans[a.cid].name}"`);
});
//------------------------------\\
updates.hear(/^(?:клан заявки)/i, (message) => {
    let id = a.cid;
        if (!clans[id]) return message.send(`Вы не состоите в клане`);
        let text = `Заявки на вступление в клан "${clans[a.cid].name}"\n`;
        if (clans[id].users[a.number].status < 1) return message.send(`Данная команда вам не доступна`);
        for(ids in clans[id].invites){

            text += `@id${users[ids].id}(${users[ids].nick}) [ID: ${ids}] - Ждёт одобрения\n`;

        }
        return message.send(text);
    });
//------------------------------\\
updates.hear(/^(?:Клан раздать)\s?(.*)?/i, (message) => {
    message.$match[1] = utils.match(message.$match[1]);
    let id = a.cid;
    let sum = Math.round(message.$match[1] / clans[id].people);
        if(!message.$match[1]) return   
        if(clans[id].people < 3) return message.send(`В клане должно быть не меньше 3-х участников.`)
        if (clans[id].users[a.number].status < 2) return message.send(`Данная команда вам не доступна`)
        if(message.$match[1] > clans[id].balance) return message.send(`На балансе клана нет столько денег.`);

        clans[id].balance -= message.$match[1];

        for(ids in clans[id].users){
            users[ids].balance += sum;
        }

    return message.send(`Деньги были поделены на всех участников.\nКаждый участник получил по ${utils.sp(sum)}`);
    });
//------------------------------\\
updates.hear(/^(?:клан вступить)\s?([0-9]+)?/i, (message) => {
    let id = Number(message.$match[1]);
        if(!message.$match[1]) return
        if(clans[a.cid]) return message.send(`Вы уже состоите в клане "${clans[a.cid].name}"`);
        if(!clans[id]) return message.send(`💀 »  Данного клана не существует.`);

        if(!clans[id].open) {
            if(!clans[id].invites)
                clans[id].invites = {}
                
        if(!clans[id].invites[a.number])
            clans[id].invites[a.number] = {
                i: true
            };
            
        return message.reply(`Заявка на вступление была отправлена создателю клана.`);
    } else if (clans[id].open) {
        if (a.balance < clans[id].price) return message.send(`У Вас недостаточно денег, что бы войти в этот клан.`);
        a.balance -= clans[id].price;
        a.cid = id;
        clans[id].people += 1;
        clans[id].balance += clans[id].price;
        if(!clans[id].users[a.number]) {
             clans[id].users[a.number] = {
                status: 0
            }
        }
            
        return message.send(`Вы успешно вошли в клан "${clans[message.$match[1]].name}".\nБольше информации по команде "Clan Help"`);
    }
});
//------------------------------\\
updates.hear(/^(?:клан название)\s?([^]+)?/i, (message) => {
    if(!message.$match[1]) return;
    if(!clans[a.cid]) return message.send(`У Вас нет клана.`);
    if(clans[a.cid].users[a.number].status < 2) return message.send(`Данная команда Вам не доступна`);
    if(clans[a.cid].balance < 1000000000) return message.send(`На балансе клана нет столько денег.\nСмена названия клана стоит: ${utils.sp(1000000000)}$`);

    clans[a.cid].balance -= 10000;

    if(clans[a.cid]) {
    if(a.number != clans[a.cid].owner) return message.send(`Данная команда Вам не доступна`);
    if(a.number == clans[a.cid].owner) {
        clans[a.cid].name = message.$match[1];
    return message.send(`Вы успешно сменили название клана на "${clans[a.cid].name}"`);
        }
    }
});
//------------------------------\\
updates.hear(/^(?:clan|клан)$/i, (message) => {
    let text = ``;
    let tipe = ``;
        if (!clans[a.cid]) return message.send(`У Вас нет клана.`);
        text += `👥 Участники:\n`;
        for (let id in clans[a.cid].users) {
            let people = users[id];
            if (clans[a.cid].users[id].status == 2) text += `&#8195;👑 [id${users[id].id}|${users[id].nick}] | Директор. [ID: ${users[id].number}]\n`;
            if (clans[a.cid].users[id].status == 1) text += `&#8195;🔸 [id${users[id].id}|${users[id].nick}] | Заместитель. [ID: ${users[id].number}]\n`;
            if (clans[a.cid].users[id].status == 0) text += `&#8195;🔹 [id${users[id].id}|${users[id].nick}] | Участник. [ID: ${users[id].number}]\n`;
        }

        if (clans[a.cid].open == true) tipe += `Открытый.`
        if (clans[a.cid].open == false) tipe += `Закрытый.`

            return message.send(`
🛡 Клан "${clans[a.cid].name}" [ID: ${clans[a.cid].number}]
&#8195;👤 Создатель: [id${users[clans[a.cid].owner].id}|${users[clans[a.cid].owner].nick}] 
&#8195;🔅 Тип: ${tipe} 
&#8195;💵 Цена за вход: ${utils.sp(clans[a.cid].price)}$
&#8195;💰 Баланс клана: ${utils.sp(clans[a.cid].balance)}$

${text}
        `);
    });
//------------------------------\\
updates.hear(/^(?:Клан выгнать)\s(.*)/i, (message) => {
    if(!clans[a.cid]) return message.send(`Вы не состоите в клане`);
    if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна`);
    if(!message.$match[1]) return;
    if(!clans[a.cid].users[message.$match[1]]) return message.send(`Этого участника нет в клане.`);
    if(!users[message.$match[1]]) return;
    if(users[message.$match[1]].cid != users[a.number].cid) return message.send(`Этот участник находится в другом клане!`);
    if(clans[a.cid].users[message.$match[1]].status == 2) return message.send(`Нельзя выгнать создателя клана!`);
    if(users[message.$match[1]].cid == false) return message.send(`Данный участник не состоит в клане.`);

    clans[a.cid].people -= 1;
    delete clans[a.cid].users[message.$match[1]];
     users[message.$match[1]].cid = false;

    return message.send(`Участник "${users[message.$match[1]].nick}" был выгнан с клана.`);
});
//------------------------------\\
updates.hear(/^(?:Кланы)/i, (message) => {
    if (!clans) return message.send(`Кланов ещё нет.`);
        let text = '';
        text += `&#8195;🔸 Список кланов 🔸\n`;
        let tipe = '';
        for (let id in clans) {
        if (clans[id].open == true) tipe += `Открытый.`
        if (clans[id].open == false) tipe += `Закрытый.`
            let user = users[clans[id].owner];
            text += `
🛡 Клан "${clans[id].name}" [ID: ${clans[id].number}]
&#8195;👑 Создал: [id${users[clans[id].owner].id}|${users[clans[id].owner].nick}] 
`+(clans[id].open === false ? `&#8195;🔅 Тип: Закрытый` : `&#8195;🔅 Тип: Открытый\n&#8195;💵 Цена входа: ${utils.sp(clans[id].price)}$`)+`
&#8195;👥 Участников: ${clans[id].people}
&#8195;💰 Баланс клана: ${utils.sp(clans[id].balance)}$ 
➖➖➖➖➖➖➖➖
             `;
        }
        return message.send(text);
    });
//------------------------------\\
updates.hear(/^(?:клан повысить)\s([0-9]+)/i, (message) => {
    if(!clans[a.cid]) return message.send(`У Вас нет клана`);
    if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна.`);
    if(message.$match[1] == clans[a.cid].owner) return message.send(`Зачем себя повышать до Заместителя, если Вы Создатель?`)
    if(!message.$match[1]) return;
    if(users[message.$match[1]].cid == false) return message.send(`Данный участник не состоит в клане.`);
    if(!users[message.$match[1]]) return
    if(users[message.$match[1]].cid != users[a.number].cid) return message.send(`Данный участник состоит в другом клане`);

    clans[a.cid].users[message.$match[1]].status = 1;

    return message.send(`Участник "${users[message.$match[1]].nick}" был повышен до Заместителя.`);
});
//------------------------------\\
updates.hear(/^(?:клан понизить)\s([0-9]+)/i, (message) => {
    if(!clans[a.cid]) return message.send(`У Вас нет клана`);
    if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна.`);
    if(message.$match[1] == clans[a.cid].owner) return message.send(`Зачем себя понижать до участника, если Вы Создатель?`)
    if(!message.$match[1]) return;
    if(users[message.$match[1]].cid == false) return message.send(`Данный участник не состоит в клане.`);
    if(!users[message.$match[1]]) return
    if(users[message.$match[1]].cid != users[a.number].cid) return message.send(`Данный участник состоит в другом клане`);

    clans[a.cid].users[message.$match[1]].status = 0;

    return message.send(`Участник "${users[message.$match[1]].nick}" был понижен до участника.`);
});
//------------------------------\\
updates.hear(/^(?:клан напасть)\s?([0-9]+)/i, (message) => {
    let id = Number(message.$match[1]); 
        if(!id) return message.send(`Вы не указали идентификатор клана`);
        if(id == a.cid) return message.send(`Нельзя нападать на свой клан...`);
        if(id == 1) return
        if(!clans[a.cid]) return message.send(`У Вас нет клана.`);
        if(!clans[id]) return;
        if(clans[a.cid].balance < 100000) return message.send(`На балансе клана должно быть не меньше 100.000$`)
        if(clans[id].balance < 100000) return message.send(`На балансе клана "${clans[id].name}" меньше 100.000$`)
        if(clans[a.cid].war > getUnix()) return message.send(`Вы уже нападали на клан\nНапасть ещё раз можно через ${unixStampLeft(clans[a.cid].war - Date.now())}`);
        if(clans[a.cid].users[a.number].status < 1) return message.send(`Данная команда вам не доступна`);

        clans[a.cid].war = getUnix() + 600000

        let win = rand(1,2);
        if(win == 1){
            clans[id].balance += Math.floor(clans[a.cid].balance / 1.50) 
            clans[a.cid].balance -= Math.floor(clans[a.cid].balance / 1.50);
            return message.send(`⚔ Клан ${clans[a.cid].name} напал на ${clans[id].name}
🏆 Победу одержал клан "${clans[id].name}"
💰 Смогли забрать: ${utils.sp(Math.floor(clans[a.cid].balance / 1.50))}$`);
        }else{
            clans[id].balance -= Math.floor(clans[id].balance / 1.50);
            clans[a.cid].balance += Math.floor(clans[id].balance / 1.50);
            return message.send(`⚔ Клан ${clans[a.cid].name} напал на ${clans[id].name}
🏆 Победу одержал клан "${clans[a.cid].name}"
💰 Смогли забрать: ${utils.sp(Math.floor(clans[id].balance / 1.50))}$`);
        }
    });
//------------------------------\\
updates.hear(/^(?:Clan help)/i, message => {
    message.send(`Помощь по кланам:

🔻 Клан - Покажет клан.
🔻 Кланы - Покажет список кланов
🔻 Клан создать [название] - Создать клан.
🔻 Клан вступить [ID] - Вступить/отправить заявку
🔻 Клан покинуть - Покинуть клан.
🔻 Клан открыть - открыть клан для входа.
🔻 Клан закрыть - закрыть клан для входа.
🔻 Клан цена [цена] - Установить цену за вход в клан.
🔻 Клан заявки - Посмотреть заявки на вступление в клан.
🔻 Клан принять [ID] - Принять заявку на вступление в клан.
🔻 Клан напасть [ID клана] - Напасть на клан.
🔻 Клан раздать [сумма] - Поделить сумму на всех участников клана.
🔻 Клан название [название] - сменить название клана (1.000.000.000$)
🔻 Клан выгнать [ID] - Выгнать участника с клана.
🔻 Клан повысить [ID] - Повысить участника до Заместителя.
🔻 Клан понизить [ID] - Понизить Заместителя до участника.
🔻 Клан работать - Отработать в клане.
        `)
})
//------------------------------\\
updates.hear(/^(?:клан работать)/i, message => {
    let r = utils.random(10000, 300000);
    if(!clans[a.cid]) return message.send(`У Вас нет клана`);
    if(a.cjob > getUnix()) return message.send(`Вы уже работали.\n работать можно через ${unixStampLeft(a.cjob - Date.now())}`);

    a.cjob = getUnix() + 600000
    clans[a.cid].balance += r

    return message.send(`Вы успешно отработали, на счёт клана зачислено ${utils.sp(r)}$`);
});


//------------------------------\\
//------------------------------\\
/*let commented = [];
let ids = [];
let GROUPS = ['https://vk.com/bot_lesya'];
let PHRASES = ['Подкиньте 5ккк плиз) 😉\nID: 10888\nСпасибо заранее))', 'Подникьте 5ккк на ID 10888))\nСпс)'];

(async () => {
  ids = await Promise.all(GROUPS.map(async (link) => {
    let res = await vk.snippets.resolveResource(link);
    if (!res || res.type !== 'group') throw new Error('Ссылка должна вести на группу');

    return -res.id;
  }));

  setInterval(async () => {
    let { items } = await user.api.newsfeed.get({ filters: 'post', count: 1 });
    let post = items[0];
  
    if (!ids.includes(post.source_id) || commented.includes(post.post_id)) return;
  
    let message = utils.pick(PHRASES);
  
    commented.push(post.post_id);
  
    try {
      await user.api.wall.createComment({ owner_id: post.source_id, post_id: post.post_id, message });
    } catch (e) {
      let errors = {
        213: 'Нет доступа к комментированию записи (возможно, комментарии были закрыты)',
        222: 'Запрещённые гиперссылки',
        223: 'Превышен лимит комментариев на стене',
      };

      let error = errors[e.code] || 'Неизвестная ошибка';

      throw new Error(error);
    }
  
    vk.api.call('messages.send',{user_id: 347241116, message: `> Был оставлен комментарий <<${message}>>`, random_id: 0});
  }, 500);
})();*/
//------------------------------\\
//------------------------------\\
updates.hear(/^(?:deny links)$/i, async(message) => {
    if(!message.isChat) return message.send(`Данная команда работает только в беседе`)
    if (message.chatId === 2 && message.user !== 496175718) return;
    if(chat[message.chatId].admin_id != message.user) return message.send(`Команда доступна только тому, кто зарегистрировал чат.`)
    chat[message.chatId].block = true;
    message.send(`Готово, ссылки в беседе запрещены.`)
});
//------------------------------\\
updates.hear(/^(?:allow links)$/i, async(message) => {
    if(!message.isChat) return message.send(`Данная команда работает только в беседе`)
    if (message.chatId === 2 && message.user !== 496175718) return;
    if(chat[message.chatId].admin_id != message.user) return message.send(`Команда доступна только тому, кто зарегистрировал чат.`)
    chat[message.chatId].block = false;
    message.send(`Готово, ссылки в беседе разрешены.`)
});
//------------------------------\\
updates.hear(/^(?:block title)\s(.*)/i, async(message) => {
    if(!message.isChat) return message.send(`Данная команда работает только в беседе`)
    if (message.chatId === 2 && message.user !== 496175718) return;
    if(chat[message.chatId].admin_id != message.user) return message.send(`Команда доступна только тому, кто зарегистрировал чат.`)
    chat[message.chatId].title = message.$match[1]
    chat[message.chatId].block_title = true;
    message.send(`Название беседы заблокировано.`)
});
//------------------------------\\
updates.hear(/^(?:unblock title)\s(.*)/i, async(message) => {
    if(!message.isChat) return message.send(`Данная команда работает только в беседе`)
    if (message.chatId === 2 && message.user !== 496175718) return;
    if(chat[message.chatId].admin_id != message.user) return message.send(`Команда доступна только тому, кто зарегистрировал чат.`)
    chat[message.chatId].block_title = false;
    message.send(`Название беседы разблокировано.`)
});
//------------------------------\\
updates.hear(/^(?:registration)$/i, async(message) => {
    if(!message.isChat) return message.send(`Данная команда работает только в беседе`)
    if (message.chatId === 2 && message.user !== 496175718) return;
    if(chat[message.chatId].admin_id != false) return message.send(`Данная беседу уже активирована.\nЕсли её зарегистрировал участник без статуса "Администратор",\nТо обратитесь в репорт для перерегистрации беседы.`)
   chat[message.chatId].admin_id = message.user;
    message.send(`Беседа успешно активирована.`)
});
//------------------------------\\
updates.hear(/^(?:rules)\s(.*)/i, async(message) => {
    if(!message.isChat) return message.send(`Данная команда работает только в беседе`)
    if (message.chatId === 2 && message.user !== 496175718) return;
    if(chat[message.chatId].admin_id != message.user) return message.send(`Команда доступна только тому, кто зарегистрировал чат.`)
    chat[message.chatId].rules = message.$match[1]
    message.send(`Правила беседы изменены.`)
});
//------------------------------\\
updates.hear(/^(?:manager)$/i, async(message) => {
    return message.send(`Команды Мини-Менеджера для бесед:

🔸 Registration - Зарегистрировать чат.
🔸 Deny links - Запретить ссылки в беседе (Кикает).
🔸 Allow links - Разрешить ссылки в беседе.
🔸 Block title [название] - Заблокировать название беседы.
🔸 Unblock title - Разблокировать название беседы.
🔸 Rules [Правила] - Установить правила в беседе.
`)
})
//------------------------------\\


async function online() {
    user.api.account.setOnline({
        voip: 0
    })
}
online()
setInterval(online, 299995)

﻿updates.hear(/^(?:памятник)/i, async(message) => {
    if (message.forwards[0]) {

    message.send(`Секундочку, делаю фото...`)
    const use_id = message.forwards[0].senderId;
    const Image = Canvas.Image;
    const [ava_info] = await vk.api.users.get({
        user_id: use_id,
        fields: "photo_200"
    });

    const [user_info] = await vk.api.users.get({
        user_id: use_id
    });

    const img = new Image();
    img.src = 'nadg.png';
    ctx.drawImage(img, 0, 0);

    ctx.font = '30px Roboto';
    ctx.fillStyle = "#F4ECD2";
    ctx.fillText(`${user_info.first_name}`, 220, 310);

    ctx.font = '30px Roboto';
    ctx.fillStyle = "#D8A903";
    ctx.fillText(`${time(5)}`, 200, 386);

    const mychit = await loadImage(ava_info.photo_200);
    ctx.drawImage(mychit, 215, 60);

    return message.sendPhoto(canvas.toBuffer());
}
    if (message.replyMessage) {

    message.send(`Секундочку, делаю фото...`)
    const use_id = message.replyMessage.senderId;
    const Image = Canvas.Image;
    const [ava_info] = await vk.api.users.get({
        user_id: use_id,
        fields: "photo_200"
    });

    const [user_info] = await vk.api.users.get({
        user_id: use_id
    });

    const img = new Image();
    img.src = 'nadg.png';
    ctx.drawImage(img, 0, 0);

    ctx.font = '30px Roboto';
    ctx.fillStyle = "#F4ECD2";
    ctx.fillText(`${user_info.first_name}`, 220, 310);

    ctx.font = '30px Roboto';
    ctx.fillStyle = "#D8A903";
    ctx.fillText(`${time(5)}`, 200, 386);

    const mychit = await loadImage(ava_info.photo_200);
    ctx.drawImage(mychit, 215, 60);

    return message.sendPhoto(canvas.toBuffer());
}
});



updates.hear(/^(?:цитатни)/i, async(message) => {
if(message.forwards[0]){
        message.send(`Секундочку, делаю фото.`)

        const { createCanvas, loadImage } = require('canvas');
        const canvas = createCanvas(800, 200);
        const ctx = canvas.getContext('2d');

        const chit = message.forwards[0].text;
        const use_id = message.forwards[0].senderId;

        const [ava_info] = await vk.api.users.get({
            user_id: use_id,
            fields: "photo_200"
        });

        const [user_info] = await vk.api.users.get({
            user_id: use_id
        });

        if(chit.length < 46){
            for(var i = 0; i < chit.length; ++i){
                if(chit[i] < 46 && chit[i] == " "){
                            
                }
            }
        }

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.fillStyle = "#FFFFFF";

        ctx.font = '20px Roboto';
        ctx.fillText(`Цитаты великих людей:`, 220, 20);

        ctx.font = '23px Roboto';
        ctx.fillText(`«${chit.match(/.{1,45}/g).join("\n")}»`, 220, 80);

        //ctx.textAlign = "right";
        ctx.font = '22px Roboto';
        ctx.fillText(`© ${user_info.first_name} ${user_info.last_name}`, 530, 180);

        const mychit = await loadImage(ava_info.photo_200); 
        ctx.drawImage(mychit, 0, 0); 

        return message.sendPhoto({
        value: canvas.toBuffer(),
            options:{
                filename: 'cit.png'
            }
        });   
    }  
    if(message.replyMessage){
        message.send(`Секундочку, делаю фото.`)

        const { createCanvas, loadImage } = require('canvas');
        const canvas = createCanvas(800, 200);
        const ctx = canvas.getContext('2d');

        const chit = message.replyMessage.text;
        const use_id = message.replyMessage.senderId;

        const [ava_info] = await vk.api.users.get({
            user_id: use_id,
            fields: "photo_200"
        });

        const [user_info] = await vk.api.users.get({
            user_id: use_id
        });

        if(chit.length < 46){
            for(var i = 0; i < chit.length; ++i){
                if(chit[i] < 46 && chit[i] == " "){
                            
                }
            }
        }

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.fillStyle = "#FFFFFF";

        ctx.font = '20px Roboto';
        ctx.fillText(`Цитаты великих людей:`, 220, 20);

        ctx.font = '23px Roboto';
        ctx.fillText(`«${chit.match(/.{1,45}/g).join("\n")}»`, 220, 80);

        //ctx.textAlign = "right";
        ctx.font = '22px Roboto';
        ctx.fillText(`© ${user_info.first_name} ${user_info.last_name}`, 530, 180);

        const mychit = await loadImage(ava_info.photo_200); 
        ctx.drawImage(mychit, 0, 0); 

        return message.sendPhoto({
        value: canvas.toBuffer(),
            options:{
                filename: 'cit.png'
            }
        });   
    }
});

vk.updates.hear(/^гс|голосовое/i, async (message) => {
    await message.sendAudioMessage(message.forwards[0].attachments[0].mp3Url) ;
});

vk.updates.hear(/^(?:скажи)\s(.*)/i, async (message) => {
const googleTTS = require('google-tts-api');
 
googleTTS(message.$match[1], 'ru', 2.5) 
.then(function (url) {
  message.sendAudioMessage(url) ;
})
.catch(function (err) {
  console.error(err.stack);
});
})



/*async function steam() {
const ACCESS_TOKEN = "";
const STEAM_API_KEY = "";
const STEAM_ID = "";

    request.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" + STEAM_API_KEY + "&steamids=" + STEAM_ID, (e,r,b) => {
    let data = JSON.parse(b);
    let res = data.response.players[0];
        user.api.status.set({
            text: `[STEAM] ${res.personaname} ${res.personastate === 0 ? "Offline" : res.gameextrainfo ? "Сейчас в игре " + res.gameextrainfo : "Online"}`
        });
}
*/

vk.updates.hear(/^(?:qr)\s(.*)/i, async (message) => {
const qr = require('qr-image');
let qr_svg = qr.image(message.$match[1], { type: 'png' });
qr_svg.pipe(require('fs').createWriteStream('i_love_qr.png'));
var svg_string = qr.imageSync(message.$match[1], { type: 'png' });
message.sendPhoto(svg_string)
});


function Steamkeys(length) { 
let result = ''; 
for (let i = 0; i < length; i++) { 
result += SteamKey() + '\n'; 
} 
return result.trim(); 
} 
 
function SteamKey() { 
let result = ''; 
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
return result; 
} 

function generateTokens(length) { 
 let result = '';    
for (let i = 0; i < length; i++) {  
result += generateToken() + '\n';  
}    
return result.trim();  
}    

function generateToken() {  
let result = '';  
let charset = 'abcdef0123456789abcdefabcdefabcdefabcdef';    
for (let i = 0; i < 85; i++) {  
result += charset[Math.floor(Math.random() * (charset.length - 1))];  
}
return result;  
}   

 updates.hear(/^(?:steam)/i, async(message) => {
 message.send(Steamkeys(1))
 })
 
 updates.hear(/^(?:gentoken)/i, async(message) => {
 message.send(generateTokens(1))
 })
 
updates.hear(/^(?:scr)\s(.*)/i, async(message) => {
    
 message.sendPhoto("http://mini.s-shot.ru/RU?" + message.$match[1])
 })
 
 
 
 updates.hear(/^(?:gennick)/i, async(message) => {
 const str = fs.readFileSync('./a.txt', 'utf8'); 
let a = utils.random(1, 3997)
const line = str.split('\n')[a]
message.send(line)
})
 
 updates.hear(/^(?:createtext|ct)\n(.*)\s(.*)\n(.*)/i, async(message) => {
 const t = require('emojify-text')
let a = t({ 
     bg: `${message.$match[1]}`, 
     fg: `${message.$match[2]}` 
}, `${message.$match[3]}`) 

 message.send(`${a}`)
 })
 
sceneManager.addScene(new StepScene('signup', [
    (message) => {
        if (message.scene.step.firstTime || !message.text) {
            return message.send('Как тебя зовут?');
        }
        a.nick = message.text;
        return message.scene.step.next();
    },
    (message) => {
        if (message.scene.step.firstTime || !message.text) {
            return message.send('Сколько тебе лет?');
        }
        a.age = Number(message.text);
        return message.scene.step.next();
    },
    async (message) => {
        const { firstName, age } = message.scene.state;
 
        await message.send(`👤 Вы ${a.nick}, Вам ${a.age} лет`);
 
        await message.scene.leave();
    }
]));

sceneManager.addScene(new StepScene('money', [
    (message) => {
        if (message.scene.step.firstTime || !message.text) {
            return message.send('Я готов к выдачи денег, подтвердите действие, напишите "подтверждаю"');
        }
 if(message.text == 'подтверждаю' || message.text == 'Подтверждаю') return message.scene.step.next();
 if(!message.text == 'подтверждаю' || message.text == 'Подтверждаю') return message.send(`Подтвердите действие, напишите "подтверждаю"`)
    },
    (message) => {
        if (message.scene.step.firstTime || !message.text) {
            return message.send('Сколько вам нужно?');
        }
        if(message.text == 'выйти') return message.scene.leave();
 
        a.balance += Number(message.text);
 
        return message.scene.step.next();
    },
    async (message) => {
        const { firstName, age } = message.scene.state;
 
        await message.send(`Готово, я выдал вам запрошенные деньги!`);
 
        await message.scene.leave();
    }
]));
 
vk.updates.on('message', sessionManager.middleware);
vk.updates.on('message', sceneManager.middleware);
vk.updates.on('message', (message, next) => {
    if (!message.scene.current) {
        return next();
    }
    const cancel =  message.messagePayload && message.messagePayload.command === 'cancel';
    if (cancel) {
        return message.scene.leave({
            canceled: true
        });
    }
    return message.scene.reenter();
});
 
vk.updates.hear(/^(?:тест)/i, (message) => {
    return message.scene.enter('signup');
});
 
 vk.updates.hear(/^(?:money)/i, (message) => {
    if(a.adm < 1) return;
    return message.scene.enter('money');
});