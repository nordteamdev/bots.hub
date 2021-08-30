const VKCOINAPI = require('node-vkcoinapi');

const vkcoin = new VKCOINAPI({

 token: "dc3a955d547de71c857d918acb3acea9aa35a1eb07d93f259f883517cea5a5cda398c0b5383efb7bae1f5", // token vk желательно от клевер
 key: "*npRgPoE!8g5uc1-ik_tvM3OvJaB#_iV#mPjLU67U,fK&IKUt!", // api key vkcoin
 userId: 508391242 // id пользователя от которого получен api key vkcoin

});

let users = require('./users.json');

const { VK, Keyboard } = new require('vk-io');
const vk = new VK();
const fs = require("fs");
const commands = [];
const request = require('prequest');

vk.setOptions({ token: '9d662b0709f4ade1791eab99f39b94cc5b6d171b9541c4455d5b43043c36af4512006220010f29453fa57', pollingGroupId: 191033691  });  // 1 токен группы!  2 ид группы!
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
	console.log('Аккаунты сохранены');
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

cmd.hear(/^(?:Нaзад)$/i, async (message, name) => {

    message.send(`📦 Выберите кейс:`,
    
        	{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 'Mini Case'"
		},
			"color": "positive"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 'Standart Case'"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 'Spectrum Case'"
		},
			"color": "positive"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 'Glove Case'"
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
				"label": "Дaльше"
		},
			"color": "primary"
		}]
        ]
			})
});
});

cmd.hear(/^(?:Открыть кейсы 🗃)$/i, async (message, name) => {

    message.send(`📦 Выберите кейс:`,
    
    	{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 'Mini Case'"
		},
			"color": "positive"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 'Standart Case'"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 'Spectrum Case'"
		},
			"color": "positive"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 'Glove Case'"
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
				"label": "Дaльше"
		},
			"color": "primary"
		}]
        ]
			})
});
});

cmd.hear(/^(?:Дaльше)$/i, async (message, name) => {

    message.send(`📦 Выберите кейс:`,
    
    	{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 'Gamma Case'"
		},
			"color": "positive"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 'Revolver Case'"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть 👑 Slipiz Case 👑"
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
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Нaзад"
		},
			"color": "primary"
		}]
        ]
			})
});
});

cmd.hear(/^(?:Открыть 'Mini Case')$/i, async (message, name) => {
    
    if(message.user.MiniCase < 1) return message.send(`У вас нет данного кейса.`);
    
    message.user.MiniCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7]);
    
	if(prize === 1)
	{
		message.user.balance += 10000;
		return message.send(`Вам выпало из кейса 10.000 коинов.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 11000;
		return message.send(`Вам выпало из кейса 11.000 коинов.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 19000;
		return message.send(`Вам выпало из кейса 19.000 коинов.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 35000;
		return message.send(`Вам выпало из кейса 35.000 коинов.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 40000;
		return message.send(`Вам выпало из кейса 40.000 коинов.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 20000;
		return message.send(`Вам выпало из кейса 20.000 коинов.`);
    }
	if(prize === 7)
	{
		message.user.balance += 100000;
		return message.send(`Вам выпало из кейса 100.000 коинов.`);
	}

});

cmd.hear(/^(?:Открыть 'Standart Case')$/i, async (message, name) => {
    
    if(message.user.StandartCase < 1) return message.send(`У вас нет данного кейса.`);
    
    message.user.StandartCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7]);
    
	if(prize === 1)
	{
		message.user.balance += 50000;
		return message.send(`Вам выпало из кейса 50.000 коинов.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 67000;
		return message.send(`Вам выпало из кейса 67.000 коинов.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 70000;
		return message.send(`Вам выпало из кейса 70.000 коинов.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 55000;
		return message.send(`Вам выпало из кейса 55.000 коинов.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 80000;
		return message.send(`Вам выпало из кейса 80.000 коинов.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 90000;
		return message.send(`Вам выпало из кейса 90.000 коинов.`);
    }
	
	if(prize === 7)
	{
		message.user.balance += 150000;
		return message.send(`Вам выпало из кейса 150.000 коинов.`);
    }

});

cmd.hear(/^(?:Открыть 'Spectrum Case')$/i, async (message, name) => {
    
    if(message.user.SpectrumCase < 1) return message.send(`У вас нет данного кейса.`);
    
    message.user.SpectrumCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6, 7]);
    
	if(prize === 1)
	{
		message.user.balance += 110000;
		return message.send(`Вам выпало из кейса 110.000 коинов.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 120000;
		return message.send(`Вам выпало из кейса 120.000 коинов.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 130000;
		return message.send(`Вам выпало из кейса 130.000 коинов.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 135000;
		return message.send(`Вам выпало из кейса 135.000 коинов.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 145000;
		return message.send(`Вам выпало из кейса 140.000 коинов.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 150000;
		return message.send(`Вам выпало из кейса 150.000 коинов.`);
    }
	
	if(prize === 7)
	{
		message.user.balance += 200000;
		return message.send(`Вам выпало из кейса 200.000 коинов.`);
    }

});

cmd.hear(/^(?:Открыть 'Glove Case')$/i, async (message, name) => {
    
    if(message.user.GloveCase < 1) return message.send(`У вас нет данного кейса.`);
    
    message.user.GloveCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6]);
    
	if(prize === 1)
	{
		message.user.balance += 160000;
		return message.send(`Вам выпало из кейса 160.000 коинов.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 175000;
		return message.send(`Вам выпало из кейса 175.000 коинов.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 180000;
		return message.send(`Вам выпало из кейса 180.000 коинов.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 195000;
		return message.send(`Вам выпало из кейса 195.000 коинов.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 200000;
		return message.send(`Вам выпало из кейса 200.000 коинов.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 250000;
		return message.send(`Вам выпало из кейса 250.000 коинов.`);
    }

});

cmd.hear(/^(?:Открыть 'Gamma Case')$/i, async (message, name) => {
    
    if(message.user.GammaCase < 1) return message.send(`У вас нет данного кейса.`);
    
    message.user.GammaCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6]);
    
	if(prize === 1)
	{
		message.user.balance += 210000;
		return message.send(`Вам выпало из кейса 210.000 коинов.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 215000;
		return message.send(`Вам выпало из кейса 215.000 коинов.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 225000;
		return message.send(`Вам выпало из кейса 225.000 коинов.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 230000;
		return message.send(`Вам выпало из кейса 230.000 коинов.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 240000;
		return message.send(`Вам выпало из кейса 240.000 коинов.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 300000;
		return message.send(`Вам выпало из кейса 300.000 коинов.`);
    }

});

cmd.hear(/^(?:Открыть 'Revolver Case')$/i, async (message, name) => {
    
    if(message.user.RevolverCase < 1) return message.send(`У вас нет данного кейса.`);
    
    message.user.RevolverCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6]);
    
	if(prize === 1)
	{
		message.user.balance += 260000;
		return message.send(`Вам выпало из кейса 260.000 коинов.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 270000;
		return message.send(`Вам выпало из кейса 270.000 коинов.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 280000;
		return message.send(`Вам выпало из кейса 280.000 коинов.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 275000;
		return message.send(`Вам выпало из кейса 275.000 коинов.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 290000;
		return message.send(`Вам выпало из кейса 290.000 коинов.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 320000;
		return message.send(`Вам выпало из кейса 350.000 коинов.`);
    }

});

cmd.hear(/^(?:Открыть 👑 Slipiz Case 👑)$/i, async (message, name) => {
    
    if(message.user.KDMCase < 1) return message.send(`У вас нет данного кейса.`);
    
    message.user.KDMCase -= 1;

	let prize = utils.pick([1, 2, 3, 4, 5, 6]);
    
	if(prize === 1)
	{
		message.user.balance += 500000;
		return message.send(`Вам выпало из кейса 500.000 коинов.`);
	}
    
	if(prize === 2)
	{
		message.user.balance += 530176;
		return message.send(`Вам выпало из кейса 530.176 коинов.`);
	}
    
	if(prize === 3)
	{
		message.user.balance += 549808;
		return message.send(`Вам выпало из кейса 549.808 коинов.`);
	}
    
	if(prize === 4)
	{
		message.user.balance += 596239;
		return message.send(`Вам выпало из кейса 596.239 коинов.`);
	}
    
	if(prize === 5)
	{
		message.user.balance += 627241;
		return message.send(`Вам выпало из кейса 627.241 коинов.`);
	}
    
	if(prize === 6)
	{
		message.user.balance += 794049;
		return message.send(`Вам выпало из кейса 794.049 коинов.`);
    }
	    
	if(prize === 7)
	{
		message.user.balance += 802281;
		return message.send(`Вам выпало из кейса 802.281 коинов.`);
	}
	    
	if(prize === 8)
	{
		message.user.balance += 721808;
		return message.send(`Вам выпало из кейса 721.808 коинов.`);
	}
	    
	if(prize === 9)
	{
		message.user.balance += 790353;
		return message.send(`Вам выпало из кейса 790.353 коинов.`);
	}
	    
	if(prize === 10)
	{
		message.user.balance += 994746;
		return message.send(`Вам выпало из кейса 994.746 коинов.`);
	}
	    
	if(prize === 11)
	{
		message.user.balance += 711381;
		return message.send(`Вам выпало из кейса 711.381 коинов.`);
	}
	    
	if(prize === 12)
	{
		message.user.balance += 872751;
		return message.send(`Вам выпало из кейса 872.751 коинов.`);
	}
	    
	if(prize === 13)
	{
		message.user.balance += 891894;
		return message.send(`Вам выпало из кейса 891.894 коинов.`);
	}
	    
	if(prize === 14)
	{
		message.user.balance += 970436;
		return message.send(`Вам выпало из кейса 970.436 коинов.`);
	}
	    
	if(prize === 15)
	{
		message.user.balance += 1540824;
		return message.send(`Вам выпало из кейса 1.540.824 коинов.`);
	}

});

cmd.hear(/^(?:Купить 👑 Slipiz Case 👑)$/i, async (message, name) => {
    
    if(message.user.balance < 100000000) return message.send(`На вашем балансе недостаточно коинов.`);
    
    message.user.balance -= 100000000;
    
    message.user.KDMCase += 1;
    
    message.send(`Вы купили 👑 Slipiz Case 👑.
Сейчас у вас их: ${utils.sp(message.user.KDMCase)} шт.`);
    
});

cmd.hear(/^(?:Купить 'Revolver Case')$/i, async (message, name) => {
    
    if(message.user.balance < 30000000) return message.send(`На вашем балансе недостаточно коинов.`);
    
    message.user.balance -= 30000000;
    
    message.user.RevolverCase += 1;
    
    message.send(`Вы купили 'Revolver Case'.
Сейчас у вас их: ${utils.sp(message.user.RevolverCase)} шт.`);
    
});

cmd.hear(/^(?:Купить 'Gamma Case')$/i, async (message, name) => {
    
    if(message.user.balance < 25000000) return message.send(`На вашем балансе недостаточно коинов.`);
    
    message.user.balance -= 25000000;
    
    message.user.GammaCase += 1;
    
    message.send(`Вы купили 'Gamma Case'.
Сейчас у вас их: ${utils.sp(message.user.GammaCase)} шт.`);
    
});

cmd.hear(/^(?:Купить 'Glove Case')$/i, async (message, name) => {
    
    if(message.user.balance < 20000000) return message.send(`На вашем балансе недостаточно коинов.`);
    
    message.user.balance -= 20000000;
    
    message.user.GloveCase += 1;
    
    message.send(`Вы купили 'Glove Case'.
Сейчас у вас их: ${utils.sp(message.user.GloveCase)} шт.`);
    
});

cmd.hear(/^(?:Купить 'Spectrum Case')$/i, async (message, name) => {
    
    if(message.user.balance < 15000000) return message.send(`На вашем балансе недостаточно коинов.`);
    
    message.user.balance -= 15000000;
    
    message.user.SpectrumCase += 1;
    
    message.send(`Вы купили 'Spectrum Case'.
Сейчас у вас их: ${utils.sp(message.user.SpectrumCase)} шт.`);
    
});

cmd.hear(/^(?:Купить 'Standart Case')$/i, async (message, name) => {
    
    if(message.user.balance < 10000000) return message.send(`На вашем балансе недостаточно коинов.`);
    
    message.user.balance -= 10000000;
    
    message.user.StandartCase += 1;
    
    message.send(`Вы купили 'Standart Case'.
Сейчас у вас их: ${utils.sp(message.user.StandartCase)} шт.`);
    
});

cmd.hear(/^(?:Купить 'Mini Case')$/i, async (message, name) => {
    
    if(message.user.balance < 5000000) return message.send(`На вашем балансе недостаточно коинов.`);
    
    message.user.balance -= 5000000;
    
    message.user.MiniCase += 1;
    
    message.send(`Вы купили 'Mini Case'.
Сейчас у вас их: ${utils.sp(message.user.MiniCase)} шт.`);
    
});

cmd.hear(/^(?:Oтмена)$/i, async (message, name) => {

    message.send(`📦 Выберите кейс:`,
    
        {
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Gamma Case"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Revolver Case"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "👑 KDM Case 👑"
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

cmd.hear(/^(?:👑 Slipiz Case 👑)$/i, async (message, name) => {

    message.send(`Стоит: 100000000.000
Выпадает: от 500.000, до 3000.000
Сейчас у вас их: ${utils.sp(message.user.KDMCase)} шт.`,
    
    	{
            attachment: "",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 👑 KDM Case 👑"
		},
			"color": "positive"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Oтмена"
		},
			"color": "negative"
		}]
        ]
			})
});
});

cmd.hear(/^(?:Revolver Case)$/i, async (message, name) => {

    message.send(`Стоит: 300.000
Выпадает: от 260.000, до 350.000
Сейчас у вас их: ${utils.sp(message.user.RevolverCase)} шт.`,
    
    	{
            attachment: "photo-186082173_457239023",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 'Revolver Case'"
		},
			"color": "positive"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Oтмена"
		},
			"color": "negative"
		}]
        ]
			})
});
});

cmd.hear(/^(?:Gamma Case)$/i, async (message, name) => {

    message.send(`Стоит: 250.000
Выпадает: от 210.000, до 300.000
Сейчас у вас их: ${utils.sp(message.user.GammaCase)} шт.`,
    
    	{
            attachment: "photo-186082173_457239022",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 'Gamma Case'"
		},
			"color": "positive"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Oтмена"
		},
			"color": "negative"
		}]
        ]
			})
});
});

cmd.hear(/^(?:Glove Case)$/i, async (message, name) => {

    message.send(`Стоит: 200.000
Выпадает: от 160.000, до 250.000
Сейчас у вас их: ${utils.sp(message.user.GloveCase)} шт.`,
    
    	{
            attachment: "photo-186082173_457239021",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 'Glove Case'"
		},
			"color": "positive"
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

cmd.hear(/^(?:Spectrum Case)$/i, async (message, name) => {

    message.send(`Стоит: 150.000
Выпадает: от 110.000, до 200.000
Сейчас у вас их: ${utils.sp(message.user.SpectrumCase)} шт.`,
    
    	{
            attachment: "photo-186082173_457239020",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 'Spectrum Case'"
		},
			"color": "positive"
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

cmd.hear(/^(?:Standart Case)$/i, async (message, name) => {

    message.send(`Стоит: 100.000
Выпадает: от 50.000, до 150.000
Сейчас у вас их: ${utils.sp(message.user.StandartCase)} шт.`,
    
    	{
            attachment: "photo-186082173_457239019",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 'Standart Case'"
		},
			"color": "positive"
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

cmd.hear(/^(?:Отмена)$/i, async (message, name) => {

    message.send(`📦 Выберите кейс:`,
    
        {
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Mini Case"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Standart Case"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Spectrum Case"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Glove Case"
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

cmd.hear(/^(?:Mini Case)$/i, async (message, name) => {

    message.send(`Стоит: 50.000
Выпадает: от 10.000, до 100.000
Сейчас у вас их: ${utils.sp(message.user.MiniCase)} шт.`,
    
    	{
            attachment: "photo-186082173_457239018",
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить 'Mini Case'"
		},
			"color": "positive"
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

cmd.hear(/^(?:Вывод)\s?([0-9]+)?/i, async (message, bot) => {

	if(!message.args[1]) return message.send(`Чтобы вывести, напишите: "Вывод сумма".`);
    
    if(message.args[1] < 1000) return message.send(`Вы попытались вывести коинов меньше, чем 1000 VKc\nМинимальная сумма вывода: 1000 VKc`);

	if(message.user.balance < message.args[1]) return message.send(`На вашем балансе недостаточно коинов.`);

	const balance = Math.floor(message.args[1] * 1);

	message.user.balance -= message.args[1];

	await vkcoin.sendPayment(message.senderId, balance * 1000);
	await message.send(`Выведено ${utils.sp(balance)} VK Coins.`);

});

cmd.hear(/(?:Пополнение)$/i, async (message) => { 
const link = vkcoin.getLink(1000000, false);
await vkcoin.updates.startPolling(); 
vkcoin.updates.onTransfer((event) => { 
console.log(event); 

let user = users.find(x=> x.id === event.fromId); 
user.balance += event.amount / 1000; 
vk.api.messages.send({ 
user_id: event.fromId, 
message: `На баланс поступило ${vkcoin.formatCoins(event.amount)} VK Coins.` 
}); 
});
return message.send(`Ссылка для пополнения:
${link}`);
});

cmd.hear(/^(?:Профиль)$/i, async (message, name) => { 

message.send(`💰Ваш баланс: ${utils.sp(message.user.balance)} VK Coins.

📦 Mini Case: ${utils.sp(message.user.MiniCase)} шт.
📦 Standart Case: ${utils.sp(message.user.StandartCase)} шт.
📦 Spectrum Case: ${utils.sp(message.user.SpectrumCase)} шт.
📦 Glove Case: ${utils.sp(message.user.GloveCase)} шт.
📦 Gamma Case: ${utils.sp(message.user.GammaCase)} шт.
📦 Revolver Case: ${utils.sp(message.user.RevolverCase)} шт.
📦 KDM Case 👑 : ${utils.sp(message.user.KDMCase)} шт.`);

});

cmd.hear(/^(?:Выйти)$/i, async (message, name) => {

    message.send(`📦 Выберите кейс:`,
    
    	{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Купить кейсы 💼"
		},
			"color": "positive"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть кейсы 🗃"
		},
			"color": "positive"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Пополнение"
		},
			"color": "primary"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вывод"
		},
			"color": "primary"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Профиль"
		},
			"color": "default"
		}]
        ]
			})
});
});

cmd.hear(/^(?:Назад)$/i, async (message, name) => {

    message.send(`📦 Выберите кейс:`,
    
        {
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Mini Case"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Standart Case"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Spectrum Case"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Glove Case"
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

cmd.hear(/^(?:Дальше)$/i, async (message, name) => {

    message.send(`📦 Выберите кейс:`,
    
    	{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Gamma Case"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Revolver Case"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "👑 KDM Case 👑"
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

cmd.hear(/^(?:Купить кейсы 💼)$/i, async (message, name) => {

    message.send(`📦 Выберите кейс:`,
    
    	{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Mini Case"
		},
			"color": "default"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Standart Case"
		},
			"color": "positive"
		}],
		[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Spectrum Case"
		},
			"color": "default"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Glove Case"
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
if(message.user.register === false)
{
	message.user.register = true;
	message.send(`Добро пожаловать в "📦 KDM Case ".`,

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
				"label": "Купить кейсы 💼"
		},
			"color": "positive"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Открыть кейсы 🗃"
		},
			"color": "positive"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Пополнение"
		},
			"color": "primary"
		},
        {
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Вывод"
		},
			"color": "primary"
		}],
        [{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "Профиль"
		},
			"color": "default"
		}]
		]
			})
});
}
});