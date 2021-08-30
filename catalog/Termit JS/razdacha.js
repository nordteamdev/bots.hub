 /*vk.updates.hear(/^(?:razdacha12345)$/i, message => {
	if(acc.users[user_id(message.user)].level < 6) return message.send(`⚠ » Вы не помощник`);
	token_user.api.wall.post({
		owner_id: -129049703,
		message: `
		🔥 » Каждый, кто сделает репост этой записи, получит на свой баланс ЦЕЛЫХ 500.000.000$! Конец акции ровно через 6 часов!
		
		⚠ » Деньги на баланс будут выданы по окончанию акции.
		
		✅ » Хотите больше таких раздач? Тогда давай наберем 20 лайков!`,
	}).then((response) => {
		token_user.api.wall.openComments({
				owner_id: -129049703,
				post_id: response.post_id
			});
		token_user.api.wall.createComment({
				owner_id: -129049703,
				post_id: response.post_id,
				from_group: 129049703,
				message: '⚠ » Валюта будет выданы по окончанию акции, ваш профиль ВК должен быть открыт, а то мы не увидим репост!'
			});
			token_user.api.wall.closeComments({
				owner_id: -129049703,
				post_id: response.post_id
			});
			message.send('✅ » Сделал раздачу!')
		setTimeout(() => {
			token_user.api.call('wall.getReposts', {  
				owner_id: -129049703, 
				post_id: response.post_id, 
				count: 300 
			}).then(res => { 
				    var id = []
					for(i in res.profiles){
						id.push(res.profiles[i].id)
					}
					for(z in id){ 
						if(acc.users[user_id(id)]){ 
						acc.users[user_id(id)].balance += 5000000; // Выдача суммы на нужный ID 
						}
					vk.api.call('messages.send', {
							user_id: z,
							message: `🔥 » Привет!\n✅ » Cпасибо за участие в нашей акции! Вы получили +500.000.000!\n✅ » Проверь свой баланс, на нем должны появится деньги!`
						});
					}	
				});
			token_user.api.wall.openComments({
				owner_id: -129049703,
				post_id: response.post_id
			});
			token_user.api.wall.createComment({
				owner_id: -129049703,
				post_id: response.post_id,
				from_group: 129049703,
				message: '⚠ » Раздача окончена'
			});
			token_user.api.wall.closeComments({
				owner_id: -129049703,
				post_id: response.post_id
			});
		}, 90000);
	});
 });*/