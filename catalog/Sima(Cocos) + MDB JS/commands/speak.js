const {Command} = require('cocoscore')
const https = require('https')
const tts_key = "42dcc964-8c97-48e3-8cc0-b53f2bb654c9"

module.exports = [
new Command({
	trigger: /^(?:мскажи)\s(.*)/i,
	type: "razvl",
	name: 'МСкажи [текст]',
	description: 'Скажет муж. голосом',
	emoji: '🗣',
	handler(ctx, bot) {
        let a = ctx.text.slice(6)
            https.get("https://tts.voicetech.yandex.net/generate?key=" + tts_key + "&format=mp3&speaker=ermil&text=" + encodeURIComponent(a),function(stream){
                stream.filename = "generate.mp3";
                ctx.sendAudioMessage(stream)
            });
        }
}),
new Command({
    trigger: /^(?:жскажи)\s(.*)/i,
    type: "razvl",
    name: 'ЖСкажи [текст]',
    description: 'Скажет жен. голосом',
    emoji: '🗣',
    handler(ctx, bot) {
        let b = ctx.text.slice(6)
            https.get("https://tts.voicetech.yandex.net/generate?key=" + tts_key + "&format=mp3&speaker=alyss&text=" + encodeURIComponent(b), function(stream){
                stream.filename = "generate.mp3";
                ctx.sendAudioMessage(stream)
            });
        }
    }),
new Command({
    trigger: /^(?:мкрикни)\s(.*)/i,
    type: "razvl",
    name: 'МКрикни [текст]',
    description: 'Крик муж. голосом',
    emoji: '🗣',
    handler(ctx, bot) {
        let c = ctx.text.slice(7)
            https.get("https://tts.voicetech.yandex.net/generate?key=" + tts_key + "&format=mp3&speaker=zahar&emotion=evil&text=" + encodeURIComponent(c),function(stream){
                stream.filename = "generate.mp3";
                ctx.sendAudioMessage(stream)
            });
        }
}),
new Command({
    trigger: /^(?:жкрикни)\s(.*)/i,
    type: "razvl",
    name: 'ЖКрикни [текст]',
    description: 'Крик жен. голосом',
    emoji: '🗣',
    handler(ctx, bot) {
        let d = ctx.text.slice(7)
            https.get("https://tts.voicetech.yandex.net/generate?key=" + tts_key + "&format=mp3&speaker=omazh&emotion=evil&text=" + encodeURIComponent(d), function(stream){
                stream.filename = "generate.mp3";
                ctx.sendAudioMessage(stream)
            });
        }
    })
]
