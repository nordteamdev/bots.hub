from kutana import Plugin
from kutana.database import *
from kutana.vksm import *
import datetime
plugin = Plugin(name="Staff")
@plugin.on_startswith_text('установить статус')
async def setstatus(msg,ats,env):
    user_p = await get_or_none(user_info, user_id=msg.from_id)
    if user_p.status < 5:
        return await env.reply('выдавать статусы могут только пользователи со статусом разработчик')
    puid = await parse_user_id(msg, env)
    if not env.body or not puid:
        return await env.reply('используйте команду "установить статус [роль(user,vip,moder,admin,rcon] [id(например durov)]\nПример использования: установить статус vip durov')
    user, c = await db.get_or_create(user_info, user_id=puid[0])
    args = env.body.split()
    if args[0].lower() not in ('user', 'vip','moder','admin','rcon'):
        return await env.reply('доступные статусы: user, vip, admin, moder, rcon\nиспользуйте команду "установить статус [роль(vip,moder,admin,rcon] [id(например durov)]\nПример использования: установить статус vip durov')
    if args[0] == 'user':
        user.status = 0
        user.pay_limit = 1
        user.pay_max = 10000000000
        user.give_max = 0
        await db.update(user)
    if args[0] == 'vip':
        user.status = 1
        user.pay_limit = 6
        user.pay_max = 10000000000
        user.give_max = 0
        await db.update(user)
    elif args[0] == 'moder':
        user.status = 2
        user.pay_limit = 10
        user.pay_max = 10000000000
        user.give_max = 1000000
        await db.update(user)
    elif args[0] == 'admin':
        user.status = 3
        user.pay_limit = 20
        user.pay_max = 10000000000
        user.give_max = 10000000
        user.vip_set = 1
        await db.update(user)
    elif args[0] == 'rcon':
        user.status = 4
        user.pay_max = 10000000000
        user.vip_set = 10
        await db.update(user)
    await env.request('messages.send', user_id=puid[0], message=f'Ваш статус изменен на [{args[0]}]')
    return await env.reply(f"Пользователю @id{puid[0]} (id{puid[0]}) выдан доступ [{args[0]}] ({datetime.datetime.today()})")


@plugin.on_startswith_text('заблокировать')
async def ban(msg,ats,env):
    user_p = await get_or_none(user_info, user_id=msg.from_id)
    if user_p.status < 5:
        return await env.reply('блокировать аккаунты могут только пользователи со статусом разработчик')
    puid = await parse_user_id(msg, env)
    if not env.body or not puid:
        return await env.reply('используйте команду "заблокировать [id(например durov)]\nПример использования: заблокировать durov')
    user, c = await db.get_or_create(user_info, user_id=puid[0])
    user.is_banned =1
    await db.update(user)
    await env.request('messages.send', user_id=puid[0], message=f'Вам запрещен доступ к использованию бота ({datetime.datetime.today()})')
    return await env.reply(f"Пользователю @id{puid[0]} (id{puid[0]}) запрещен доступ к использованию бота ({datetime.datetime.today()})")

@plugin.on_startswith_text('разбан')
async def ban(msg,ats,env):
    user_p = await get_or_none(user_info, user_id=msg.from_id)
    if user_p.status < 5:
        return await env.reply('разблокировать аккаунт могут только пользователи со статусом разработчик')
    puid = await parse_user_id(msg, env)
    if not env.body or not puid:
        return await env.reply('используйте команду "разбан [id(например durov)]\nПример использования: разбан durov')
    user, c = await db.get_or_create(user_info, user_id=puid[0])
    user.is_banned = 0
    await db.update(user)
    return await env.reply(f"Пользователю @id{puid[0]} (id{puid[0]}) разрешен доступ к использованию бота ({datetime.datetime.today()})")

@plugin.on_startswith_text('исключить')
async def kick_user(msg,ats,env):
    user_p = await get_or_none(user_info, user_id=msg.from_id)
    if user_p.status < 4:
        return await env.reply('исключать могут только пользователи со статусом rcon+')
    puid = await parse_user_id(msg, env)
    if not env.body or not puid:
        return await env.reply('используйте команду "исключить [id(например durov)]\nПример использования: исключить durov')
    user_puid = await get_or_none(user_info, user_id=puid[0])
    if user_puid and user_p.status < user_puid.status:
        return await env.reply('недостаточно прав')
    default = 2000000000
    request = await env.request('messages.removeChatUser', chat_id=int(msg.peer_id) - int(default), member_id=puid[0])
    print(request)
    if not request.response:
        return
    return await env.reply(f'исключен пользователь @id{puid[0]} ({puid[0]})')