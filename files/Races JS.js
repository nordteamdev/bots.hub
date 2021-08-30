cmd.hear(/^(?:рейсы|рейс)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]){
	return bot(`Рейсы:
		✈ 1. Москва-Анталья. Заплатят 1.000.000.000$
		✈ 2. Киев-Москва Заплатят 700.000.000$
		✈ 3. Анталья-Москва. Заплатят 1.000.000.000$

		✈ Чтобы взять какой-то рейс напишите Рейс [номер]
		`)
}		 else if(message.args[1] && message.args[1] == 1) {
if(message.user.transport.airplane == 0) return bot(`У вас нету самолета!`)
if(message.user.transport.airplane < 11) return bot(`Этот рейс очень затратывает много Керосина. Вам нужен минимум самолет: Airbus 318.`)
if(message.user.timers.race == true) return bot(`Вы уже выполняли рейс подождите 1 час!`)
		if(message.user.timers.race1 == true) return bot(`Вы уже были на этом рейсе. Подождите 1 час`)

		setTimeout(() => {
		message.user.timers.race1 = false;
	}, 3600000);

	message.user.timers.race1 = true;


	bot(`Вы получили рейс, Москва-Анталья
		Зарплата: 1.000.000.000$
		Чтобы продолжить рейс напишите "Полет"`)
} else if(message.args[1] && message.args[1] == 2) {
	if(message.user.transport.airplane == 0) return bot(`У вас нету самолета!`)
		if(message.user.transport.airplane < 9) return bot(`Этот рейс очень затратывает много Керосина. Вам нужен минимум самолет: Hawker 400.`)
	if(message.user.timers.race == true) return bot(`Вы уже выполняли рейс подождите 1 час!`)
		if(message.user.timers.race2 == true) return bot(`Вы уже были на этом рейсе. Подождите 1 час`)
			setTimeout(() => {
		message.user.timers.race2 = false;
	}, 3600000);

	message.user.timers.race2 = true;
	bot(`Вы получили рейс, Киев-Москва
		Зарплата: 700.000.000$
		Чтобы продолжить рейс напишите "Полет"`)
} else if(message.args[1] && message.args[1] == 3) {
	if(message.user.transport.airplane == 0) return bot(`У вас нету самолета!`)
		if(message.user.transport.airplane < 11) return bot(`Этот рейс очень затратывает много Керосина. Вам нужен минимум самолет: Airbus 318.`)
	if(message.user.timers.race == true) return bot(`Вы уже выполняли рейс подождите 1 час!`)
	if(message.user.timers.race3 == true) return bot(`Вы уже были на этом рейсе. Подождите 1 час`)
		setTimeout(() => {
		message.user.timers.race3 = false;
	}, 3600000);

	message.user.timers.race3 = true;
	bot(`Вы получили рейс, Анталья-Москва
		Зарплата: 1.000.000.000$
		Чтобы продолжить рейс напишите "Полет"`)
}

});

cmd.hear(/^(?:Полет|Полёт|Палет|Палёт)$/i, async (message, bot) => {
if(message.user.timers.race1 == false && message.user.timers.race2 == false && message.user.timers.race3 == false) return bot(`Вы не взяли рейс. Напишите: "Рейсы"`)
if(message.user.timers.race == true) return bot(`Вы уже выполняли рейс подождите 1 час!`)
	const pasazhir = utils.random(20,200);


const kerosinn = message.user.kerosin;
const dengi = 10000000 * pasazhir;
const kerosin = utils.random(20,50)
if(message.user.kerosin < kerosin) return bot(`Вам нехватает АвиаКеросина! Заправьтесь с помощью команды: Заправить.`)
	setTimeout(() => {
		message.user.timers.race = false;
	}, 3600000);

	message.user.timers.race = true;

	if(message.user.timers.race3 == true){  
		message.user.balance += dengi;
		message.user.kerosin -= kerosin;
		return bot(`Ваш рейс Москва-Анталья прошел успешно. Вы заработали ${utils.sp(dengi)}$, было пассажиров: ${utils.sp(pasazhir)}, Затрачено Керосина: ${kerosin}, Осталось керосина: ${message.user.kerosin}`, { attachment: `photo-190506705_457239146`});
	}


	if(message.user.timers.race2 == true){  
		message.user.balance += dengi;
		message.user.kerosin -= kerosin;
		return bot(`Ваш рейс Киев-Москва прошел успешно. Вы заработали ${utils.sp(dengi)}$, было пассажиров: ${utils.sp(pasazhir)}, Затрачено Керосина: ${kerosin}, Осталось керосина: ${message.user.kerosin}`, { attachment: `photo-190506705_457239146`});
}

 if(message.user.timers.race1 == true){  
        message.user.balance += dengi;
        message.user.kerosin -= kerosin;
        return bot(`Ваш рейс Анталья-Москва прошел успешно. Вы заработали ${utils.sp(dengi)}$, было пассажиров: ${utils.sp(pasazhir)}, Затрачено Керосина: ${kerosin}, Осталось керосина: ${message.user.kerosin}`, { attachment: `photo-190506705_457239146`});
}
});

cmd.hear(/^(?:Заправка|заправить|заправить самолет)$/i, async (message, bot) => {
		if(!message.user.transport.airplane) return bot(`У Вас нету самолета!`)
	if(message.user.kerosin >= 100) return bot(`Ваш самолет не требует заправки!`)
await bot(`Ваш самолет начали заправлять рабочие. Через 30 секунд самолет заправится.`, {
	attachment: `photo-190506705_457239144`
});
setTimeout(() => {
		message.user.kerosin = 100;
		message.send(`Ваш самолет был заправлен!`, {
			attachment: `photo-190506705_457239145`
		});
	}, 30000);

	});