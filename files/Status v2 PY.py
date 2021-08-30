import time
from datetime import datetime
import vk_api
from vk_api.longpoll import VkLongPoll, VkChatEventType
import random

vk_session = vk_api.VkApi(token='Здесь должен быть токен с разрешениями от Kate Mobile')
vk = vk_session.get_api()
longpoll = VkLongPoll(vk_session)
print("Вечный онлайн запущен")
print("Версия: 2.0")

#Исправлен баг с подсчетом пользователей в ЧС

#основной цикл
while True:
    try:
        time.sleep(60)
        vk.account.setOnline(voip=0)
        account = vk.account.getBanned()
        getBan = account['count']
        getOnline = len(vk.friends.getOnline())
        stats = "✅ Only Online | 👥 Друзья онлайн: " + str(getOnline) + " | 🚫 ЧС: " + str(getBan) + " | ⌚ Время " + str(datetime.strftime(datetime.now(), "%D, %H:%M"))
        vk.status.set(text=stats)
    except vk_api.exceptions.Captcha as captcha:
        continue
        
