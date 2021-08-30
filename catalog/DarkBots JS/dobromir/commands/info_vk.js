const vk = require("VK-Promise")(require("../settings/config.js").token)
module.exports = {
	r: /(sc|скан) ([0-9]+)/i,
	f: function (msg, args, vk, bot){
		var user = args[2]
		vk("users.get", {user_ids: user, fields: "photo_id, verified, sex, bdate, city, country, home_town, has_photo, photo_50, photo_100, photo_200_orig, photo_200, photo_400_orig, photo_max, photo_max_orig, online, domain, has_mobile, contacts, site, education, universities, schools, status, last_seen, followers_count, common_count, occupation, nickname, relatives, relation, personal, connections, exports, wall_comments, activities, interests, music, movies, tv, books, games, about, quotes, can_post, can_see_all_posts, can_see_audio, can_write_private_message, can_send_friend_request, is_favorite, is_hidden_from_feed, timezone, screen_name, maiden_name, crop_photo, is_friend, friend_status, career, military, blacklisted, blacklisted_by_me"}).then(function(res){
            if(!res) return bot({text: "Не удалось найти аккаунт *id" + user})
			   var user = res[0].id
			if(res[0].sex == 2){
               var sex = "Мужской"
			}else{
			   var sex = "Женский"
			}
			if(res[0].bdate == undefined){
			   var bdate = "Информация скрыта"
			}else{
               var bdate = res[0].bdate
			}
			bot({text: "\n📜 | Информация пользователя *id" + user + "\n\n👦 |  ФИ: " + res[0].first_name + " " + res[0].last_name+ "\n🆔 |  ID аккаунта: " + res[0].id + "\n🍰 |  Дата рождения: " + bdate + "\n🇷🇺 |  Место проживания (страна и город): " + res[0].country.title + ", " + res[0].city.title + "\n🖍 |  Статус: " + res[0].status + "\n👫 | Подписчики: " + res[0].followers_count + "\n👫 | Пол: " + sex, att: "photo" + res[0].photo_id})
        })
	},
	desc: "скан <id ПОЛЬЗОВАТЕЛЯ> -- информация о пользователе",
	rights: 1,
	type: "admin"
}