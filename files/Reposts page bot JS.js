const VK = require('vk-io')
const vk = new VK({ token: '261c97e4f9216338942e31b50ed66c7418fdd3f45f4fb75f53a0148e96a48529eca51049d7d04cb035e3e' });
vk.updates.startPolling()
for(i = 0; i < 100; i++){
vk.api.users.report({ user_id: 567519943, type: "report_type", comment: 'Рекламная страница' })
}