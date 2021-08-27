let command = `баланс`
	let quest = context.text.toLowerCase()
if(quest !== `${command}` && !context.text.includes(`@`) && !context.text.includes(`/`)) return

let user = base.bs[base.id[context.senderId].id]
let nick = ``
if(user.nicknotify == false) {
	nick = `${base.bs[base.id[context.senderId].id].nick}`
}
if(user.nicknotify == true) {
	nick = `*id${context.senderId} (${base.bs[base.id[context.senderId].id].nick})`
}



let myclan = clan[base.bs[base.id[context.senderId].id].clan]


const now = new Date(); 
now.setHours(now.getHours() + (now.getTimezoneOffset()/60) + 3)
let date = `${now.toLocaleString()}`
const bb = new Date; 
var array = splitString(date, `,`);
var arraytwo = splitString(array[0], `/`);
context.send(`Дата: ${arraytwo[1]}.${arraytwo[0]}.${arraytwo[2]}, ${bb.getHours() + (bb.getTimezoneOffset()/60) + 3}:${bb.getMinutes() + (bb.getTimezoneOffset()/60) + 5}`)
