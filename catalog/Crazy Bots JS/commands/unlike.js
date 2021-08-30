const vk = new require("VK-Promise")(require("../settings/config.js").token)
module.exports = {
	r: /(дизлайк|анлайк|unlike) ([^]+) ([0-9]+)_([0-9]+)/i,
	f: function (msg, args, vk, bot){
        vk("likes.delete", {type: args[2], owner_id: args[3], item_id: args[4]}).then(function(res){
            if(!res) return
            bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nЛайк убран!\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})
        }).catch(function(error){bot({text: "\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~\nНе удалось убрать лайк\n~/~/~/~❄❄❄❄❄❄❄~/~/~/~"})})
	},
	rights: 4,
	desc: "дизлайк <<post|photo|comment|video|note|market|photo_comment|video_comment|topic_comment|market_comment>> <<OWNER_ID>>_<<ITEM_ID>> -- убрать лайк",
	type: "all"
}