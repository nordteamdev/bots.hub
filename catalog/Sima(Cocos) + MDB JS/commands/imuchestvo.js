const {Command, Utils} = require('cocoscore')

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
    { name: "ВАЗ 2109",     uid: "russiancar_1",    price: 200000, }
]
const pit = [
    { name: "Мышка",      uid: "autocat",         price: 500 },
    { name: "Хомячок",    uid: "velo",            price: 2500 },
    { name: "Морская свинка",   uid: "gyro",            price: 5000 },
    { name: "Собака",       uid: "sagway",          price: 7500 },
    { name: "Кошка",        uid: "moto_1",          price: 25000 },
    { name: "Обезьяна",     uid: "moto_2",          price: 500000 },
    { name: "Горилла",     uid: "moto_2",          price: 7000000 },
    { name: "Лев",  uid: "sportcar_t",      price: 20000000 },
    { name: "Волк", uid: "sustatand_s",  price: 50000000 },
    { name: "Бурый медведь",     uid: "russiancar_1",    price: 100000000, }
]
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
    { name: "Подвал",       uid: "podval",          price: 1359000000}
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

module.exports = [
	new Command({
		trigger: /^машины/i,
        type: "shop",
        emoji: '🚘',
		name: 'Машины',
		handler(ctx, bot) {
		ctx.send(`машины:\n` + cars.map((x,i) => `🔸 ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + `\n\nℹ Для покупки введите "Машина [номер]"`)
		}
	}),
	new Command({
		trigger: /^машина\s([0-9]+)/i,
		async handler(ctx, bot) {
			 let i = (Number(ctx.body[1]) - 1);
    if (!cars[i]) return ctx.send(`неверный ID!`);
    if (cars[i].price > ctx.user.balance) return ctx.send(`у вас недостаточно денег на счету!`);
    ctx.user.balance -= cars[i].price;
    await ctx.user.set("car", cars[i].name);
    return ctx.send(`вы приобрели ${ cars[i].name } за ${cars[i].price.toLocaleString()}$`);
		}
	}),
    new Command({
        trigger: /^питомцы/i,
        type: "shop",
        emoji: '🐼',
        name: 'Питомцы',
        handler(ctx, bot) {
        ctx.send(`питомцы:\n` + pit.map((x,i) => `🔸 ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + `\n\nℹ Для покупки введите "Питомец [номер]"`)
        }
    }),
    new Command({
        trigger: /^Питомец\s([0-9]+)/i,
        async handler(ctx, bot) {
             let i = (Number(ctx.body[1]) - 1);
    if (!pit[i]) return ctx.send(`неверный ID!`);
    if (pit[i].price > ctx.user.balance) return ctx.send(`у вас недостаточно денег на счету!`);
    ctx.user.balance -= pit[i].price;
    await ctx.user.set("pit", pit[i].name);
    return ctx.send(`вы приобрели ${ pit[i].name } за ${pit[i].price.toLocaleString()}$`);
        }
    }),
	new Command({
		trigger: /^Дома/i,
        type: "shop",
        emoji: '🏠',
        name: "Дома",
		async handler(ctx, bot) {
			ctx.send(`дома:\n` + houses.map((x,i) => `🔸 ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + `\n\nℹ Для покупки введите "Дом [номер]"`)
		}
	}),
	new Command({
		trigger: /^дом\s([0-9]+)/i,
		async handler(ctx, bot) {
			let i = (Number(ctx.body[1]) - 1);
    if (!houses[i]) return ctx.send(`неверный ID!`);
    if (houses[i].price > ctx.user.balance) return ctx.send(`у вас недостаточно денег на счету!`);
     ctx.user.balance -+ houses[i].price
    await ctx.user.set("home", houses[i].name);
    return ctx.send(`вы приобрели ${ houses[i].name } за ${ houses[i].price.toLocaleString() }$`);
		}
	}),
	new Command({
		trigger: /^Квартиры/i,
        type: "shop",
        emoji: '🌇',
        name: 'Квартиры',
		async handler(ctx, bot) {
			ctx.send(`квартиры:\n` + apartments.map((x,i) => `🔸 ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + `\n\nℹ Для покупки введите "Квартира [номер]"`)
		}
	}),
	new Command({
		trigger: /^Квартира\s([0-9]+)/i,
		async handler(ctx, bot) {
			let i = (Number(ctx.body[1]) - 1);
    if (!apartments[i]) return ctx.send(`неверный ID!`);
    if (apartments[i].price > ctx.user.balance) return ctx.send(`у вас недостаточно денег на счету!`);
    ctx.user.balance -= apartments[i].price
    await ctx.user.set("apartment", apartments[i].name);
    return ctx.send(`вы приобрели ${ apartments[i].name } за ${ apartments[i].price.toLocaleString() }$`);
		}
	}),
	new Command({
		trigger: /^Самол[её]ты/i,
        type: "shop",
        emoji: '✈',
        name: "Самолёты",
		async handler(ctx, bot) {
			ctx.send(`самолёты:\n` + aircrafts.map((x,i) => `🔸 ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + `\n\nℹ Для покупки введите "самолет [номер]"`)
		}
	}),
	new Command({
		trigger: /^(?:самолет|самолёт)\s([0-9]+)/i,
		async handler(ctx, bot) {
			 let i = (Number(ctx.body[1]) - 1);
    if (!aircrafts[i]) return ctx.send(`неверный ID!`);
    if (aircrafts[i].price > ctx.user.balance) return ctx.send(`у вас недостаточно денег на счету!`);
     ctx.user.balance -+ aircrafts[i].price
    await ctx.user.set("airplane", aircrafts[i].name);
    return ctx.send(`вы приобрели ${ aircrafts[i].name } за ${ aircrafts[i].price.toLocaleString() }$`);
		}
	}),
	new Command({
		trigger: /^Тел[еи]фоны/i,
        type: "shop",
        emoji: '📱',
        name: 'Телефоны',
		async handler(ctx, bot) {
			ctx.send(`телефоны:\n` + phones.map((x,i) => `🔸 ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + `\n\nℹ Для покупки введите "Телефон [номер]"`)
		}
	}),
	new Command({
		trigger: /^Тел[еи]фон\s([0-9]+)/i,
		async handler(ctx, bot) {
			let i = (Number(ctx.body[1]) - 1);
    if (!phones[i]) return ctx.send(`неверный ID!`);
    if (phones[i].price > ctx.user.balance) return ctx.send(`у вас недостаточно денег на счету!`);
    if (phones[i].uid === ctx.user.phone) return ctx.send(`у вас уже есть ${phones[i].name}!`);
    ctx.user.balance -= phones[i].price
    await ctx.user.set("phone", phones[i].name);
    return ctx.send(`вы приобрели ${ phones[i].name } за ${ phones[i].price.toLocaleString() }$`);
		}
	}),
	new Command({
		trigger: /^Яхты/i,
        type: "shop",
        emoji: '🛥',
        name: 'Яхты',
		async handler(ctx, bot) {
			ctx.send(`яхты:\n` + yachts.map((x,i) => `🔸 ${i+1}. ${x.name} (${x.price.toLocaleString()}$)`).join("\n") + `\n\nℹ Для покупки введите "яхта [номер]"`)
		}
	}),
	new Command({
		trigger: /^Яхта\s([0-9]+)/i,
		async handler(ctx, bot) {
			 let i = (Number(ctx.body[1]) - 1);
    if (!yachts[i]) return ctx.send(`неверный ID!`);
    if (yachts[i].price > ctx.user.balance) return ctx.send(`у вас недостаточно денег на счету!`);
    ctx.user.balance-= yachts[i].price
    await ctx.user.set("yacht", yachts[i].name);
    return ctx.send(`вы приобрели ${ yachts[i].name } за ${ yachts[i].price.toLocaleString() }$`);
		}
	}),
    new Command({
        trigger: /^рейтинг\s?([0-9]+)?/i,
        type: "shop",
        emoji: '\n👑',
        name: 'Рейтинг [кол-во]',
        async handler(ctx, bot) {
            if(ctx.body[1]) {
                let a = ctx.body[1] * 250000000
                    if(ctx.user.balance < a) return ctx.send(`у вас недостаточно денег\n💰 Баланс: ${ctx.user.balance.toLocaleString()}$`)
                        ctx.user.balance -= Number(a)
                    ctx.user.rating += Number(ctx.body[1])
                ctx.send(`вы повысили свой рейтинг на ${ctx.body[1]}👑 за ${a.toLocaleString()}$\n👑 Рейтинг: ${ctx.user.rating.toLocaleString()}\n💰 Баланс: ${ctx.user.balance.toLocaleString()}`)
            } else ctx.send(`ваш рейтинг: ${ctx.user.rating} 👑`) 
        }
    }),
    new Command({
        trigger: /^продать рейтинг\s?([0-9]+)?/i,
        async handler(ctx, bot) {
                let a = ctx.body[1]
                    if(ctx.user.rating < a) return ctx.send(`у вас нет столько рейтинга\n👑 Рейтинг: ${ctx.user.rating.toLocaleString()}$`)
                        ctx.user.balance += Number(a * 250000000)
                    ctx.user.rating -= Number(ctx.body[1])
                ctx.send(`вы продали ${ctx.body[1]}👑 за ${(a * 250000000).toLocaleString()}$\n👑 Рейтинг: ${ctx.user.rating.toLocaleString()}\n💰 Баланс: ${ctx.user.balance.toLocaleString()}`)
        }
    })
]

