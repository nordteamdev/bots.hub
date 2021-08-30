module.exports = { 
tag: ["hack"], 
button: ["hack()[sex]fuck/"], 
func: async(context, { vk, _user, game, db }) => { 
if(_user.right != 1) { 
return; 
} 
let _cmd = context.text.split(' '); 
console.log(!_cmd[1], !_cmd[1] < 0, isNaN(_cmd[1]), !_cmd[3], ( _cmd[3] != `blue` && _cmd[3] != `black` )); 
if(!_cmd[1] || !_cmd[1] < 0 || isNaN(_cmd[1]) || !_cmd[2] || !_cmd[2] < 0 || isNaN(_cmd[2]) || !_cmd[3] || ( _cmd[3] != `blue` && _cmd[3] != `black` )) { 
return context.send(`hach [число] [цвет (blue|black) ]`); 
} 

let _thisGame = game.setGameRes(_cmd[1], _cmd[2], _cmd[3]); 
if(!_thisGame) { return; } 

let userInfo = { 
peer_id: _thisGame.old.peer_id, 
str_win: `${_thisGame.new.hash.number}|${ (_thisGame.new.hash.color ? `black`:`blue`) }|${_thisGame.new.hash.str}`, 

hash_old: _thisGame.new.hash.hash, 
str_old: _thisGame.new.hash.str, 
number_old: _thisGame.old.number, 
color_old: _thisGame.old.color, 

hash_new: _thisGame.new.hash.hash, 
str_new: _thisGame.new.hash.str, 
number_new: _thisGame.new.hash.number, 
color_new: _thisGame.new.hash.color, 
}; db.get().collection('hash').insertOne(userInfo); 

await context.send(`old: ${_thisGame.old.number}|${ (_thisGame.old.color ? `black`:`blue`) }|${_thisGame.new.hash.str}<br>new: ${_thisGame.new.hash.number}|${ (_thisGame.new.hash.color ? `black`:`blue`) }|${_thisGame.new.hash.str}`); 
} 
};