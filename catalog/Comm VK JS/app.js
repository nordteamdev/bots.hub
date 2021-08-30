console.log('')
console.log('-------------------------------')
console.log('    10%     ')
console.log('    20%     ')
console.log('    30%     ')
console.log('    40%     ')
console.log('    50%     ')
console.log('    60%     ')
console.log('    70%     ')
console.log('    80%     ')
console.log('    90%     ')
console.log('    100%    ')
console.log('   идет загрузка комментариев...')
console.log('-------------------------------')
console.log('')
const { VK } = require('vk-io'); 

const vk = new VK({ 
token: "токен группы"
	
}); 

function awoken() { 
vk.api.wall.createComment({ 
owner_id: ваш айди (цифровой), 
post_id: айди поста, 
message: 'текст' 

}); 
} 

setInterval(awoken, 3000);
