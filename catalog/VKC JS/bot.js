const VKCOINAPI = require('node-vkcoinapi');

const vkcoin = new VKCOINAPI({

 token: "токен", // token vk желательно от клевер
 key: "", // api key vkcoin
 userId: ид // id пользователя от которого получен api key vkcoin

});

let users = require('./users.json');

const { VK, Keyboard } = new require('vk-io');
const vk = new VK();
const fs = require("fs");
const commands = [];
const request = require('prequest');

vk.setOptions({ token: 'токен', pollingGroupId: цифр ид });  // 1 токен группы!  2 ид группы!
const { updates, snippets } = vk;

let buttons = [];

updates.startPolling();

const utils = {
	sp: (int) => {
		int = int.toString();
		return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
	},
	pick: (array) => {
		return array[utils.random(array.length - 1)];
	},
    random: (x, y) => {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
}

setInterval(async () => {
	await saveUsers();
}, 10000);

async function saveUsers()
{
	require('fs').writeFileSync('./users.json', JSON.stringify(users, null, '\t'));
	return true;
}

updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;

	if(!users.find(x=> x.id === message.senderId))
	{
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			balance: 0,
			register: false,
			mention: true,
			tag: user_info.first_name,
            MiniCase: 0,
            StandartCase: 0,
            SpectrumCase: 0,
            GloveCase: 0,
            GammaCase: 0,
            RevolverCase: 0,
            KDMCase: 0
		});
	}

	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.ban) return;

	const name = (text, params) =>
	{
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}

	const command = commands.find(x=> x[0].test(message.text));
	if(!command) return;

	message.args = message.text.match(command[0]);
	await command[1](message, name);

	console.log(`Пользователь ${message.user.uid}: ${message.text}`)
});
	
const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}
/*/////
	message.send(`☹ Акция закончелась или не начиналась.`,
    
        	{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "🤑X2COIN"
		},
			"color": "positive"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выйти"
		},
			"color": "negative"
		}]
        ]
			})
});
});
/*//////
///////X2COIN///////////////////🤑
cmd.hear(/^(.*Приgfhfhвет)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})

message.send(`Привет ${nick[0].first_name}`)	
});

cmd.hear(/^(.*🤑)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})

message.send(`${nick[0].first_name} Скоро сдесь будет бонус.`)	
});

cmd.hear(/^(.*382428dfjdssdsdakf3)$/ig, async (message, name) => {	
let nick = await vk.api.users.get({user_ids: message.senderId})
	message.user.balance += 2000;
	
	return message.send(`${nick[0].first_name} 🎉+2.000 VKC✅`); 
});
///////////////
cmd.hear(/^(.*dsfds🤑sdfX2CsdfdsfsddsOIN)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
	message.send(`☹${nick[0].first_name}  Акция закончилась или не начиналась.`); 
});
//////////////
cmd.hear(/^(.*payvk1000X2vkCOINx0000setx2on)$/ig, async (message, name) => {
	message.user.balance = 0;
	return message.send(`payvk1000X2*COIN = GOOD`); 
});
////X2COIN/////////////////////

cmd.hear(/^(.*Открыть Новогодний Box 🎁)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})    
    if(message.user.MiniCase < 1) return message.send(`☹${nick[0].first_name}  У вас нет данного box'a.`);
    
    message.user.MiniCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7]);
    
	if(prize === 1)
	{
		message.user.balance += 80000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Новогоднего" box'a 80.000 VKC.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 65000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Новогоднего" box'a 65.000 VKC.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 75000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Новогоднего" box'a 75.000 VKC.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 170000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Новогоднего" box'a 170.000 VKC.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 140000;
		return message.send(`🎉${nick[0].first_name} "Новогоднего" box'a 140.000 VKC.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 50000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Новогоднего" box'a 50.000 VKC.`);
    }
	if(prize === 7)
	{
		message.user.balance += 200000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Новогоднего" box'a 200.000 VKC.`);
	}

});

cmd.hear(/^(.*Открыть Стандарт Box 📦)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})    
    if(message.user.StandartCase < 1) return message.send(`☹${nick[0].first_name} У вас нет данного box'a.`);
    
    message.user.StandartCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7]);
    
	if(prize === 1)
	{
		message.user.balance += 500000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Стандарт" box'a 500.000 VKC.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 650000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Стандарт" box'a 650.000 VKC.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 700000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Стандарт" box'a 700.000 VKC.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 800000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Стандарт" box'a 800.000 VKC.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 1300000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Стандарт" box'a 1.300.000 VKC.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 1500000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Стандарт" box'a 1.500.000 VKC.`);
    }
	
	if(prize === 7)
	{
		message.user.balance += 2000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Стандарт" box'a 2.000.000 VKC.`);
    }

});

cmd.hear(/^(.*Открыть Мастер Box 🎯)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})  
    if(message.user.SpectrumCase < 1) return message.send(`☹${nick[0].first_name} У вас нет данного box'a.`);
    
    message.user.SpectrumCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7]);
    
	if(prize === 1)
	{
		message.user.balance += 3000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Мастер" box'a 3.000.000 VKC.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 4000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Мастер" box'a 4.000.000 VKC.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 6000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Мастер" box'a 6.000.000 VKC.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 7000000;
		return message.send(`🎉${nick[0].first_name} 🎉Вам выпало из "Мастер" box'a 7.000.000 VKC.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 2500000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Мастер" box'a 2.500.000 VKC.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 8000000;
		return message.send(`🎉${nick[0].first_name} 🎉Вам выпало из "Мастер" box'a 8.000.000 VKC.`);
    }
	
	if(prize === 7)
	{
		message.user.balance += 10000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Мастер" box'a 10.000.000 VKC.`);
    }

});

cmd.hear(/^(.*Открыть 2020 Box 🐀)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})    
    if(message.user.GloveCase < 1) return message.send(`☹${nick[0].first_name} У вас нет данного box'a.`);
    
    message.user.GloveCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6]);
    
	if(prize === 1)
	{
		message.user.balance += 7000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "2020" box'a 7.000.000 VKC.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 13000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "2020" box'a 13.000.000 VKC.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 5000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "2020" box'a 5.000.000 VKC.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 6500000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "2020" box'a 6.500.000 VKC.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 15000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "2020" box'a 15.000.000 VKC.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 20000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "2020" box'a 20.000.000 VKC.`);
    }

});

cmd.hear(/^(.*Открыть Magic Box 💥)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})    
    if(message.user.GammaCase < 1) return message.send(`☹${nick[0].first_name} У вас нет данного box'a.`);
    
    message.user.GammaCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5]);
    
	if(prize === 1)
	{
		message.user.balance += 30000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Magic" box'a 30.000.000 VKC.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 35000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Magic" box'a 35.000.000 VKC.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 50000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Magic" box'a 50.000.000 VKC.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 60000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Magic" box'a 60.000.000 VKC.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 65000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Magic" box'a 65.000.000 VKC.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 70000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Magic" box'a 70.000.000 VKC.`);
    }

});

cmd.hear(/^(.*Открыть Mega Box 🎰)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})    
    if(message.user.RevolverCase < 1) return message.send(`☹${nick[0].first_name} У вас нет данного box'a.`);
    
    message.user.RevolverCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6]);
    
	if(prize === 1)
	{
		message.user.balance += 60000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Mega" box'a 60.000.000 VKC.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 75000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Mega" box'a 75.000.000 VKC.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 90000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "Mega" box'a 90.000.000 VKC.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 115000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Mega" box'a 115.000.000 VKC.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 130000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Mega" box'a 130.000.000 VKC.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 150000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "Mega" box'a 150.000.000 VKC.`);
    }

});

cmd.hear(/^(.*Открыть Elite Box 👑)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})   
    if(message.user.KDMCase < 1) return message.send(`${nick[0].first_name} ☹ У вас нет данного box'a.`);
    
    message.user.KDMCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6]);
    
	if(prize === 1)
	{
		message.user.balance += 200000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 200.000.000 VKC.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 250000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 250.000.000 VKC.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 300000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 300.000.000 VKC.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 350000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 350.000.000 VKC.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 400000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 400.000.000 VKC.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 450000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 450.000.000 VKC.`);
    }
	    
	if(prize === 7)
	{
		message.user.balance += 500000000;
		return message.send(`💰${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 500.000.000 VKC.`);
	}
	    
	if(prize === 8)
	{
		message.user.balance += 600000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 600.000.000 VKC.`);
	}
	    
	if(prize === 9)
	{
		message.user.balance += 650000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 650.000.000 VKC.`);
	}
	    
	if(prize === 10)
	{
		message.user.balance += 750000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 750.000.000 VKC.`);
	}
	    
	if(prize === 11)
	{
		message.user.balance += 800000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 800.000.000 VKC.`);
	}
	    
	if(prize === 12)
	{
		message.user.balance += 850000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 850.000.000 VKC.`);
	}
	    
	if(prize === 13)
	{
		message.user.balance += 900000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 900.000.000 VKC.`);
	}
	    
	if(prize === 14)
	{
		message.user.balance += 950000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 950.000.000 VKC.`);
	}
	    
	if(prize === 15)
	{
		message.user.balance += 1000000000;
		return message.send(`🎉${nick[0].first_name} Вам выпало из "👑Elite👑" box'a 1.000.000.000 VKC.`);
	}

});

cmd.hear(/^(.*Купить Elite Box 👑)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 500000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 500000000;
    
    message.user.KDMCase += 1;
    
    message.send(`🎉${nick[0].first_name} Вы купили Elite Box 👑.
👑 Сейчас у вас их: ${utils.sp(message.user.KDMCase)} шт.`);
    
});

cmd.hear(/^(.*Купить Mega Box 🎰)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 100000000) return message.send(`${nick[0].first_name} ☹ На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 100000000;
    
    message.user.RevolverCase += 1;
    
    message.send(`${nick[0].first_name} 🎉 Вы купили 'Mega Box'.
🎰 Сейчас у вас их: ${utils.sp(message.user.RevolverCase)} шт.`);
    
});

cmd.hear(/^(.*Купить Magic Box 💥)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 50000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 50000000;
    
    message.user.GammaCase += 1;
    
    message.send(`🎉${nick[0].first_name} Вы купили 'Magic Box'.
💥 Сейчас у вас их: ${utils.sp(message.user.GammaCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 2020 Box 🐀)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 10000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 10000000;
    
    message.user.GloveCase += 1;
    
    message.send(`🎉${nick[0].first_name} Вы купили '2020 Box'.
🐀 Сейчас у вас их: ${utils.sp(message.user.GloveCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 3 2020 Box 🐀)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 30000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 30000000;
    
    message.user.GloveCase += 3;
    
    message.send(`${nick[0].first_name} 🎉 Вы купили 3 шт. '2020 Box'.
🐀 Сейчас у вас их: ${utils.sp(message.user.GloveCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 5 2020 Box 🐀)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 50000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 50000000;
    
    message.user.GloveCase += 5;
    
    message.send(`🎉${nick[0].first_name} Вы купили 5 шт. '2020 Box'.
🐀 Сейчас у вас их: ${utils.sp(message.user.GloveCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 10 2020 Box 🐀)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 100000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 100000000;
    
    message.user.GloveCase += 10;
    
    message.send(`🎉${nick[0].first_name} Вы купили 10 шт. '2020 Box'.
🐀 Сейчас у вас их: ${utils.sp(message.user.GloveCase)} шт.`);
    
});

cmd.hear(/^(.*Купить Мастер Box 🎯)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 5000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 5000000;
    
    message.user.SpectrumCase += 1;
    
    message.send(`🎉${nick[0].first_name} Вы купили 'Мастер Box'.
🎯 Сейчас у вас их: ${utils.sp(message.user.SpectrumCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 3 Мастер Box 🎯)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 15000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 15000000;
    
    message.user.SpectrumCase += 3;
    
    message.send(`🎉${nick[0].first_name} Вы купили 3 шт. 'Мастер Box'.
🎯 Сейчас у вас их: ${utils.sp(message.user.SpectrumCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 5 Мастер Box 🎯)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 25000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 25000000;
    
    message.user.SpectrumCase += 5;
    
    message.send(`🎉${nick[0].first_name} Вы купили 5 шт. 'Мастер Box'.
🎯 Сейчас у вас их: ${utils.sp(message.user.SpectrumCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 10 Мастер Box 🎯)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 50000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 50000000;
    
    message.user.SpectrumCase += 10;
    
    message.send(`🎉${nick[0].first_name} Вы купили 10 шт. 'Мастер Box'.
🎯 Сейчас у вас их: ${utils.sp(message.user.SpectrumCase)} шт.`);
    
});

cmd.hear(/^(.*Купить Стандарт Box 📦)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 1000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 1000000;
    
    message.user.StandartCase += 1;
    
    message.send(`🎉${nick[0].first_name} Вы купили 'Стандарт Box'.
📦 Сейчас у вас их: ${utils.sp(message.user.StandartCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 3 Стандарт Box 📦)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 3000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 3000000;
    
    message.user.StandartCase += 3;
    
    message.send(`🎉${nick[0].first_name} Вы купили 3 шт. 'Стандарт Box'.
📦 Сейчас у вас их: ${utils.sp(message.user.StandartCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 5 Стандарт Box 📦)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 5000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 5000000;
    
    message.user.StandartCase += 5;
    
    message.send(`🎉${nick[0].first_name} Вы купили 5 шт. 'Стандарт Box'.
📦 Сейчас у вас их: ${utils.sp(message.user.StandartCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 10 Стандарт Box 📦)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 10000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 10000000;
    
    message.user.StandartCase += 10;
    
    message.send(`🎉${nick[0].first_name} Вы купили 10 шт. 'Стандарт Box'.
📦 Сейчас у вас их: ${utils.sp(message.user.StandartCase)} шт.`);
    
});

cmd.hear(/^(.*Купить Новогодний Box 🎁)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 100000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 100000;
    
    message.user.MiniCase += 1;
    
    message.send(`🎉${nick[0].first_name} Вы купили 'Новогодний Box'.
🎁 Сейчас у вас их: ${utils.sp(message.user.MiniCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 3 🎁)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 300000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 300000;
    
    message.user.MiniCase += 3;
    
    message.send(`🎉${nick[0].first_name} Вы купили 3 шт. 'Новогодний Box'.
🎁 Сейчас у вас их: ${utils.sp(message.user.MiniCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 5 🎁)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 500000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 500000;
    
    message.user.MiniCase += 5;
    
    message.send(`🎉${nick[0].first_name} Вы купили 5 шт. 'Новогодний Box'.
🎁 Сейчас у вас их: ${utils.sp(message.user.MiniCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 10 🎁)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    if(message.user.balance < 1000000) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);
    
    message.user.balance -= 1000000;
    
    message.user.MiniCase += 10;
    
    message.send(`🎉${nick[0].first_name} Вы купили 10 шт. 'Новогодний Box'.
🎁 Сейчас у вас их: ${utils.sp(message.user.MiniCase)} шт.`);
    
});

cmd.hear(/^(.*Oтмена)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
    message.send(`📦${nick[0].first_name} Выберите box..`,
    
        {
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Magic Box 💥"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Mega Box 🎰"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Elite Box 👑"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выйти"
		},
			"color": "negative"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Назад"
		},
			"color": "primary"
		}]
		]
			})
});
});

cmd.hear(/^(.*Elite Box 👑)$/ig, async (message, name) => {
    message.send(`💸Стоит: 500.000.000 VKC
💰Выпадает: от 200.000.000, до 1.000.000.000 VKC
👑Сейчас у вас их: ${utils.sp(message.user.KDMCase)} шт.`,
    
    	{
            attachment: "photo-171845689_457239203",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить Elite Box 👑"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть Elite Box 👑"
		},
			"color": "primary"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Отмена"
		},
			"color": "negative"
		}]
        ]
			})
});
});

cmd.hear(/^(.*Mega Box 🎰)$/ig, async (message, name) => {
    message.send(`💸Стоит: 100.000.000 VKC
💰Выпадает: от 60.000.000, до 150.000.000 VKC
🎰Сейчас у вас их: ${utils.sp(message.user.RevolverCase)} шт.`,
    
    	{
            attachment: "photo-171845689_457239202",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить Magic Box 🎰"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть Magic Box 🎰"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выбрать кол-во 🎰"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Отмена"
		},
			"color": "negative"
		}]
        ]
			})
});
});

cmd.hear(/^(.*Выбрать кол-во 🎰)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
    message.send(`${nick[0].first_name} Купите кол-во "Mega" box'a.`,
    
        {
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 3 🎰"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть Mega Box 🎰"
		},
			"color": "positive"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выйти"
		},
			"color": "negative"
		}]
		]
			})
});
});

cmd.hear(/^(.*Купить 3 🎰)$/ig, async (message, name) => {
    message.send(`💸Стоит: 300.000.000 VKC ЗА 3 ШТ.
💰Выпадает: от 60.000.000, до 150.000.000 VKC
🎰Сейчас у вас их: ${utils.sp(message.user.RevolverCase)} шт.`);
    
});

cmd.hear(/^(.*Magic Box 💥)$/ig, async (message, name) => {
    message.send(`💸Стоит: 50.000.000 VKC
💰Выпадает: от 30.000.000, до 70.000.000 VKC
💥Сейчас у вас их: ${utils.sp(message.user.GammaCase)} шт.`,
    
    	{
            attachment: "photo-171845689_457239201",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить Magic Box 💥"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть Magic Box 💥"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выбрать кол-во 💥"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Отмена"
		},
			"color": "negative"
		}]
        ]
			})
});
});

cmd.hear(/^(.*Выбрать кол-во 💥)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
    message.send(`${nick[0].first_name} Купите кол-во "Magic" box'a.`,
    
        {
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 3 💥"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть Magic Box 💥"
		},
			"color": "positive"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выйти"
		},
			"color": "negative"
		}]
		]
			})
});
});

cmd.hear(/^(.*Купить 3 💥)$/ig, async (message, name) => {
    message.send(`💸Стоит: 150.000.000 VKC ЗА 3 ШТ.
💰Выпадает: от 30.000.000, до 70.000.000 VKC
💥Сейчас у вас их: ${utils.sp(message.user.GammaCase)} шт.`);
    
});

cmd.hear(/^(.*2020 Box 🐀)$/ig, async (message, name) => {
    message.send(`💸Стоит: 10.000.000 VKC
💰Выпадает: от 5.000.000, до 20.000.000 VKC
🐀Сейчас у вас их: ${utils.sp(message.user.GloveCase)} шт.`,
    
    	{
            attachment: "photo-171845689_457239200",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 2020 Box 🐀"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 2020 Box 🐀"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выбрать кол-во 🐀"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Отмена"
		},
			"color": "negative"
		}]
        ]
			})
});
});

cmd.hear(/^(.*Выбрать кол-во 🐀)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
    message.send(`${nick[0].first_name} Купите кол-во "2020" box'a.`,
    
        {
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 3 🐀"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 5 🐀"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 10 🐀"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 2020 Box 🐀"
		},
			"color": "positive"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выйти"
		},
			"color": "negative"
		}]
		]
			})
});
});

cmd.hear(/^(.*Купить 3 🐀)$/ig, async (message, name) => {
    message.send(`💸Стоит: 30.000.000 VKC ЗА 3 ШТ.
💰Выпадает: от 5.000.000, до 20.000.000 VKC
🐀Сейчас у вас их: ${utils.sp(message.user.GloveCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 5 🐀)$/ig, async (message, name) => {
    message.send(`💸Стоит: 50.000.000 VKC ЗА 5 ШТ.
💰Выпадает: от 5.000.000, до 20.000.000 VKC
🐀Сейчас у вас их: ${utils.sp(message.user.GloveCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 10 🐀)$/ig, async (message, name) => {
    message.send(`💸Стоит: 100.000.000 VKC ЗА 10 ШТ.
💰Выпадает: от 5.000.000, до 20.000.000 VKC
🐀Сейчас у вас их: ${utils.sp(message.user.GloveCase)} шт.`);
    
});

cmd.hear(/^(.*Мастер Box 🎯)$/ig, async (message, name) => {
    message.send(`💸Стоит: 5.000.000 VKC
💰Выпадает: от 2.500.000, до 10.000.000 VKC
🎯Сейчас у вас их: ${utils.sp(message.user.SpectrumCase)} шт.`,
    
    	{
            attachment: "photo-171845689_457239198",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить Мастер Box 🎯"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть Мастер Box 🎯"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выбрать кол-во 🎯"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Отмена"
		},
			"color": "negative"
		}]
        ]
			})
});
});

cmd.hear(/^(.*Выбрать кол-во 🎯)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
    message.send(`${nick[0].first_name} Купите кол-во "Мастер" box'a.`,
    
        {
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 3 🎯"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 5 🎯"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 10 🎯"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть Мастер Box 🎯"
		},
			"color": "positive"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выйти"
		},
			"color": "negative"
		}]
		]
			})
});
});

cmd.hear(/^(.*Купить 3 🎯)$/ig, async (message, name) => {
    message.send(`💸Стоит: 15.000.000 VKC ЗА 3 ШТ.
💰Выпадает: от 3.000.000, до 10.000.000 VKC
🎯Сейчас у вас их: ${utils.sp(message.user.SpectrumCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 5 🎯)$/ig, async (message, name) => {
    message.send(`💸Стоит: 25.000.000 VKC ЗА 5 ШТ.
💰Выпадает: от 3.000.000, до 10.000.000 VKC
🎯Сейчас у вас их: ${utils.sp(message.user.SpectrumCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 10 🎯)$/ig, async (message, name) => {
    message.send(`💸Стоит: 50.000.000 VKC ЗА 10 ШТ.
💰Выпадает: от 3.000.000, до 10.000.000 VKC
🎯Сейчас у вас их: ${utils.sp(message.user.SpectrumCase)} шт.`);
    
});

cmd.hear(/^(.*Стандарт Box 📦)$/ig, async (message, name) => {
    message.send(`💸Стоит: 1.000.000 VKC
💰Выпадает: от 500.000, до 2.000.000 VKC
📦Сейчас у вас их: ${utils.sp(message.user.StandartCase)} шт.`,
    
    	{
            attachment: "photo-171845689_457239197",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить Стандарт Box 📦"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть Стандарт Box 📦"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выбрать кол-во 📦"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Отмена"
		},
			"color": "negative"
		}]
        ]
			})
});
});

cmd.hear(/^(.*Выбрать кол-во 📦)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
    message.send(`${nick[0].first_name} Купите кол-во "Стандарт" box'a.`,
    
        {
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 3 📦"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 5 📦"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 10 📦"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть Стандарт Box 📦"
		},
			"color": "positive"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выйти"
		},
			"color": "negative"
		}]
		]
			})
});
});

cmd.hear(/^(.*Купить 3 📦)$/ig, async (message, name) => {
    message.send(`💸Стоит: 3.000.000 VKC ЗА 3 ШТ.
💰Выпадает: от 500.000, до 2.000.000 VKC
📦Сейчас у вас их: ${utils.sp(message.user.StandartCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 5 📦)$/ig, async (message, name) => {
    message.send(`💸Стоит: 5.000.000 VKC ЗА 5 ШТ.
💰Выпадает: от 500.000, до 2.000.000 VKC
📦Сейчас у вас их: ${utils.sp(message.user.StandartCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 10 📦)$/ig, async (message, name) => {
    message.send(`💸Стоит: 10.000.000 VKC ЗА 10 ШТ.
💰Выпадает: от 500.000, до 2.000.000 VKC
📦Сейчас у вас их: ${utils.sp(message.user.StandartCase)} шт.`);
    
});

cmd.hear(/^(.*Новогодний Box 🎁)$/ig, async (message, name) => {
    message.send(`💸Стоит: 100.000 VKC
💰Выпадает: от 50.000, до 200.000 VKC
🎁Сейчас у вас их: ${utils.sp(message.user.MiniCase)} шт.`,//Выбрать кол-во 🎁
    
    	{
            attachment: "photo-171845689_457239196",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить Новогодний Box 🎁"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть Новогодний Box 🎁"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выбрать кол-во 🎁"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Отмена"
		},
			"color": "negative"
		}]
        ]
			})
});
});

cmd.hear(/^(.*Выбрать кол-во 🎁)$/ig, async (message, name) => {
    let nick = await vk.api.users.get({user_ids: message.senderId})
    message.send(`${nick[0].first_name} Купите кол-во "Новогоднего" box'a.`,

        {
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 3 🎁"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 5 🎁"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 10 🎁"
		},
			"color": "primary"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть Новогодний Box 🎁"
		},
			"color": "positive"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выйти"
		},
			"color": "negative"
		}]
		]
			})
});
});

cmd.hear(/^(.*Купить 3 🎁)$/ig, async (message, name) => {
    message.send(`💸Стоит: 300.000 VKC ЗА 3 ШТ.
💰Выпадает: от 50.000, до 200.000 VKC
🎁Сейчас у вас их: ${utils.sp(message.user.MiniCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 5 🎁)$/ig, async (message, name) => {
    message.send(`💸Стоит: 500.000 VKC ЗА 5 ШТ.
💰Выпадает: от 50.000, до 200.000 VKC
🎁Сейчас у вас их: ${utils.sp(message.user.MiniCase)} шт.`);
    
});

cmd.hear(/^(.*Купить 10 🎁)$/ig, async (message, name) => {
    message.send(`💸Стоит: 1.000.000 VKC ЗА 10 ШТ.
💰Выпадает: от 50.000, до 200.000 VKC
🎁Сейчас у вас их: ${utils.sp(message.user.MiniCase)} шт.`);
    
});

cmd.hear(/^(.*Отмена)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
    message.send(`${nick[0].first_name} 📦 Выберите box..`,
    
        {
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Новогодний Box 🎁"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Стандарт Box 📦"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Мастер Box 🎯"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "2020 Box 🐀"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выйти"
		},
			"color": "negative"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дальше"
		},
			"color": "primary"
		}]
		]
			})
});
});

cmd.hear(/^(?:Вывод)\s?([0-9]+)?/ig, async (message, bot) => {
	let nick = await vk.api.users.get({user_ids: message.senderId})
	if(!message.args[1]) return message.send(`😎${nick[0].first_name} Чтобы вывести, напишите: "Вывод [СУММА]".`);
    
    if(message.args[1] < 100000) return message.send(`☹${nick[0].first_name} Вы попытались вывести VKC меньше, чем 100.000 VKC\nМинимальная сумма вывода: 100.000 VKC`);

	if(message.user.balance < message.args[1]) return message.send(`☹${nick[0].first_name} На вашем балансе недостаточно VKC.`);

	const balance = Math.floor(message.args[1] * 1);

	message.user.balance -= message.args[1];

	await vkcoin.sendPayment(message.senderId, balance * 1000);
	await message.send(`🎉${nick[0].first_name} Вам выведено ${utils.sp(balance)} VK Coins.`);

});

cmd.hear(/(.*Пополнение)$/ig, async (message) => { 
let nick = await vk.api.users.get({user_ids: message.senderId})
const link = vkcoin.getLink(1000000, false);
await vkcoin.updates.startPolling(); 
vkcoin.updates.onTransfer((event) => { 
console.log(event); 

let user = users.find(x=> x.id === event.fromId); 
user.balance += event.amount / 1000; 
vk.api.messages.send({ 
user_id: event.fromId, 
message: `😃${nick[0].first_name} на баланс поступило ${vkcoin.formatCoins(event.amount)} VK Coins.` 
}); 
});
return message.send(`🤝🏻${nick[0].first_name} вот ссылка для пополнения:
${link}`);
});

cmd.hear(/^(.*Статистика)$/ig, async (message, name) => { 
let nick = await vk.api.users.get({user_ids: message.senderId})
message.send(`${nick[0].first_name} вот твоя статистика:

💳 Баланс: ${utils.sp(message.user.balance)} VK Coins.

🎁 НГ Box: ${utils.sp(message.user.MiniCase)} шт.
📦 Стандарт Box: ${utils.sp(message.user.StandartCase)} шт.
🎯 Мастер Box: ${utils.sp(message.user.SpectrumCase)} шт.
🐀 2020 Box: ${utils.sp(message.user.GloveCase)} шт.
💥 Magic Box: ${utils.sp(message.user.GammaCase)} шт.
🎰 Mega Box: ${utils.sp(message.user.RevolverCase)} шт.
👑 Elite Box 👑: ${utils.sp(message.user.KDMCase)} шт.`);

});

cmd.hear(/^(.*Выйти)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
    message.send(`📦${nick[0].first_name} Выберите box..`,
    
    	{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "📦"
		},
			"color": "default"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "🤑"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Пополнение"
		},
			"color": "positive"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вывод"
		},
			"color": "negative"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Статистика"
		},
			"color": "primary"
		}]
        ]
			})
});
});

cmd.hear(/^(.*Назад)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
    message.send(`📦${nick[0].first_name} Выберите box..`,
    
        {
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Новогодний Box 🎁"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Стандарт Box 📦"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Мастер Box 🎯"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "2020 Box 🐀"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выйти"
		},
			"color": "negative"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дальше"
		},
			"color": "primary"
		}]
		]
			})
});
});

cmd.hear(/^(.*Дальше)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
    message.send(`📦${nick[0].first_name} Выберите box..`,
    
    	{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Magic Box 💥"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Mega Box 🎰"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Elite Box 👑"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выйти"
		},
			"color": "negative"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Назад"
		},
			"color": "primary"
		}]
		]
			})
});
});

cmd.hear(/^(.*📦)$/ig, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
    message.send(`📦${nick[0].first_name} Выберите box..`,
    
    	{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Новогодний Box 🎁"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Стандарт Box 📦"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Мастер Box 🎯"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "2020 Box 🐀"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Выйти"
		},
			"color": "negative"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Дальше"
		},
			"color": "primary"
		}]
		]
			})
});
});

cmd.hear(/^(.*)$/i, async (message, name) => {
let nick = await vk.api.users.get({user_ids: message.senderId})
if(message.user.register === false)
{
	message.user.register = true;
	message.send(`Привет 👋🏻 ${nick[0].first_name}, Я @xtwocoin (X2COIN) - 🙂 Бот с помощью которого , открывая мои боксы ты сможешь поднять VKC`,

		{
			attachment: "wall-185644832_31",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "📦"
		},
			"color": "default"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "🤑"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Пополнение"
		},
			"color": "positive"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вывод"
		},
			"color": "negative"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Статистика"
		},
			"color": "primary"
		}]
		]
			})
});
}
});