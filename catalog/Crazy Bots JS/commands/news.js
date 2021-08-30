module.exports = {
	r: /(news|новости)/i,
	f: function (msg, args, vk, bot){
		vk("wall.get", {owner_id: -137139998, count: 2}).then(function (res){
            if(!res.items[1].attachments){
               bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПоследние новости нашей группы: \n\n" + res.items[1].text + "\n\nСсылка на запись: https://vk.com/wall" + res.items[1].owner_id + "_" + res.items[1].id})
            }else{
               bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nПоследние новости нашей группы: \n\n" + res.items[1].text + "\n\nСсылка на запись: https://vk.com/wall" + res.items[1].owner_id + "_" + res.items[1].id, att: res.items[1].attachments.type + res.items[1].attachments.owner_id + "_" + res.items[1].attachments.id})
            }
        })
	},
	desc: "новости -- последняя новость из нашей группы",
    rights: 1,
    type: "all"
}