const vk = new require("VK-Promise")(require("../settings/config.js").token)
module.exports = {
	r: /(лайк|like) ([^]+) ([0-9]+)_([0-9]+)/i,
	f: function (msg, args, vk, bot){
        vk("likes.add", {type: args[2], owner_id: args[3], item_id: args[4]}).then(function(res){
            if(!res) return
            msg.send("\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nЛайк поставлен!\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~")
        }).catch(function(error){console.log(error);msg.send("\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nНе удалось поставить лайк\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~")})
	},
	rights: 4,
	desc: "лайк <<post|photo|comment|video|note|market|photo_comment|video_comment|topic_comment|market_comment>> <<OWNER_ID>>_<<ITEM_ID>> -- поставить лайк",
	type: "all"
}