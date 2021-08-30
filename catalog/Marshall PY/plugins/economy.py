from kutana import Plugin
from kutana.database import *
from kutana.vksm import *
import aiohttp, datetime, time, random, re
from datetime import timedelta
from apscheduler.schedulers.background import BackgroundScheduler
plugin = Plugin(name="Economy")

class MoneySendLimit(BaseModel):
  user_id = peewee.BigIntegerField(default=0)
  pay_amount = peewee.IntegerField(default=0)
  pay = peewee.BigIntegerField(default=0)
  gived_money = peewee.BigIntegerField(default=0)
MoneySendLimit.create_table(True)

@plugin.on_startup()
async def on_startup(kutana, update):
    def clear_db():
        with db.allow_sync():
            MoneySendLimit.drop_table(True)
            MoneySendLimit.create_table(True)
    scheduler = BackgroundScheduler()
    scheduler.start()
    scheduler.add_job(clear_db, trigger='interval', hours=1)
    plugin.dict = {}
    plugin.bitcoin = 0
    plugin.positive = random.choice(['😊','😉','😃','😋','😏','😄'])
    plugin.negative = random.choice(['😩','😰','😒','😔','😢'])
    plugin.user_jobs = {}
    plugin.is_active = {}
    plugin.jobs_user = {}
    async with aiohttp.ClientSession() as sess:
        async with sess.get("https://blockchain.info/ru/ticker") as resp:
            res = await resp.json()
            data = res['USD']['sell']
            plugin.bitcoin = toFixed(data)
            plugin.full_bitcoin = data
    schedule_coroutine(get_btc())

@plugin.schedule(900)
async def get_btc(stopper):
    async with aiohttp.ClientSession() as sess:
        async with sess.get("https://blockchain.info/ru/ticker") as resp:
            res = await resp.json()
            data = res['USD']['sell']
            plugin.bitcoin = toFixed(data)
            plugin.full_bitcoin = data

def toFixed(f: float, n=0):
    a, b = str(f).split('.')
    return '{}{}{}'.format(a, b[:n], '0'*(n-len(b)))

def convert_timedelta(duration):
    days, seconds = duration.days, duration.seconds
    hours = days * 24 + seconds // 3600
    minutes = (seconds % 3600) // 60
    seconds = (seconds % 60)
    return hours, minutes, seconds

cases = (2, 0, 1, 1, 1, 2)   
def plural_form(n: int, v: (list, tuple), need_n=False, need_cases=False):
    """Функция возвращает число и просклонённое слово после него

    Аргументы:
    :param n: число
    :param v: варианты слова в формате (для 1, для 2, для 5)

    Пример:
    plural_form(difference.days, ("день", "дня", "дней"))

    :return: Число и просклонённое слово после него
    """

    return f"{n if need_n is False else ''}  {v[2 if (4 < n % 100 < 20) else cases[min(n % 10, 5)]] if need_cases is False else ''}"

def digits_recursive(nonneg):
    digits = []
    while nonneg:
        digits += [nonneg % 10]
        nonneg //= 10
    return digits[::-1] or [0]
def num_to_smile(num):
    if num <= 10:
        numbers = {0:'0⃣', 1:'1⃣', 2:'2⃣', 3:'3⃣', 4:'4⃣', 5:'5⃣', 6:'6⃣', 7:'7⃣', 8:'8⃣', 9:'9⃣', 10:'🔟'}
        return numbers[num]
    numbers = {0:'0⃣.', 1:'1⃣', 2:'2⃣', 3:'3⃣', 4:'4⃣', 5:'5⃣', 6:'6⃣', 7:'7⃣', 8:'8⃣', 9:'9⃣', 10:'🔟'}
    digits = digits_recursive(num)
    result = ""
    for i in digits:
        result += numbers[i]
    return result

def text_to_value(value, text):
    value2 = 1000
    if text == 'к' or text == 'k':
        return int(value) * int(value2)
    if text == 'кк' or text == 'kk':
        return int(value) * (int(value2) ** 2)
    if text == 'ккк' or text == 'kkk':
        return int(value) * (int(value2) ** 3)
    if text == 'кккк' or text == 'kkkk':
        return int(value) * (int(value2) ** 4)
    if text == 'ккккк' or text == 'kkkkk':
        return int(value) * (int(value2) ** 5)  
    if text == 'кккккк' or text == 'kkkkkk':
        return int(value) * (int(value2) ** 6)
    if text == 'ккккккк' or text == 'kkkkkkk':
        return int(value) * (int(value2) ** 7)
    if text == 'кккккккк' or text == 'kkkkkkkk':
        return int(value) * (int(value2) ** 8)
    if text == 'ккккккккк' or text == 'kkkkkkkkk':
        return int(value) * (int(value2) ** 9)
    if text == 'кккккккккк' or text == 'kkkkkkkkkk':
        return int(value) * (int(value2) ** 10)
    return int(value) 

async def parse_role_to_text(user_id):
    user = await get_or_none(user_info, user_id=user_id)
    if not user:
        return 'Новичёк'
    if user.status == 0:
        return 'Новичёк'
    elif user.status == 1:
        return 'Вип'
    elif user.status == 2:
        return 'Moder'
    elif user.status == 3:
        return 'Admin'
    elif user.status == 4:
        return 'Gl.Admin'
    else:
        return 'Разработчик'

def textify_value(value):
    avalue = abs(value)
    if avalue >= 1000000000000000000000000000000000000000000000000000000000000000:
        return str(round(value / 1000000000000000000000000000000000000000000000000000000000000000, 2)) + " вгтл."
    if avalue >= 1000000000000000000000000000000000:
        return str(round(value / 1000000000000000000000000000000000, 2)) + " дец."
    if avalue >= 1000000000000000000000000000000:
        return str(round(value / 1000000000000000000000000000000, 2)) + " нон."
    if avalue >= 1000000000000000000000000000:
        return str(round(value / 1000000000000000000000000000, 2)) + " окт."
    if avalue >= 1000000000000000000000000:
        return str(round(value / 1000000000000000000000000, 2)) + " сптл."
    if avalue >= 1000000000000000000000:
        return str(round(value / 1000000000000000000000, 2)) + " скст."
    if avalue >= 1000000000000000000:
        return str(round(value / 1000000000000000000, 2)) + " квнт."
    if avalue >= 1000000000000000:
        return str(round(value / 1000000000000000, 2)) + " квдр."
    if avalue >= 1000000000000:
        return str(round(value / 1000000000000, 2)) + " трлн."
    if avalue >= 1000000000:
        return str(round(value / 1000000000, 2)) + " млрд."
    if avalue >= 1000000:
        return str(round(value / 1000000, 2)) + " млн."
    if avalue >= 100000:
        return  str(round(value / 100000)) + "00 тыс."
    if avalue >= 1000:
        return str(round(value / 1000)) + " тыс."
    return str(value)

def humanize(value):
    return "{:,}".format(round(value)).replace(",",".")
async def parse_business_name(uid, b_id):
    p = await get_or_create_profile(uid)
    if int(b_id) == int(1):
        if int(p.business1_level) == 1:
            return p.business1.level1_name
        elif int(p.business1_level) == 2:
            return p.business1.level2_name
        else:
            return p.business1.level3_name
    elif int(b_id) == int(2):
        if int(p.business2_level) == 1:
            return p.business2.level1_name
        elif int(p.business2_level) == 2:
            return p.business2.level2_name
        else:
            return p.business2.level3_name
async def parse_business_smile(uid, b_id):
    p = await get_or_create_profile(uid)
    if int(b_id) == int(1):
        return p.business1.smile
    elif int(b_id) == int(2):
        return p.business2.smile
async def get_or_create_profile(user_id):
    try:
        shopcenters = (
            shopcenter
            .select()
        )
        job = (
            jobs.select()
        )
        profiles = (
            Profile
            .select()
            .where(Profile.user_id == user_id
            )
        )

        profile = list(await db.prefetch(profiles, shopcenters, job))[0]
    except IndexError:
        profile = await peewee_async.create_object(Profile, user_id=user_id)
    return profile
@plugin.on_has_text()
async def register(msg,ats,env):
    if not msg.text:
        return "GOON"
    u, c = await db.get_or_create(user_info, user_id=msg.from_id)
    if u.is_banned > 0:
        return "DONE"
    profile = await get_or_create_profile(msg.from_id)
    if profile.money < 0:
        profile.money = 0
        await db.update(profile)
    if not profile.last_bonus:
        profile.last_bonus = datetime.datetime.now()
        await db.update(profile)
    if profile.reg == 0:
        profile.datareg = datetime.date.today()
        profile.reg = 1
        await env.request('messages.send', peer_id=msg.peer_id, message=f'Я зарегистрировал вас в моей системе, теперь вы можете использовать меня.\n🆔Ваш ID: {profile.id}\n💰Ваш баланс: {humanize(profile.money)}$\n\n❤Подписывайся vk.com/slavabot')
        return await db.update(profile)
    return "GOON"
try:
    @plugin.on_startswith_text('отнять')
    async def ungivemoney(msg,ats,env):
        user = await get_or_none(user_info, user_id=msg.from_id)
        if user.status < 5:
            return await env.reply('вы не можете забирать деньги')
        profile = await get_or_create_profile(msg.from_id)
        try:
            _, user_idd, amount = msg.text.split(" ")
        except (ValueError, KeyError, IndexError):
            return
        if not await get_or_none(Profile, id=user_idd):
            return await env.reply("пользователя с данным ID не существует")
        c, cr = await db.get_or_create(Profile, id=user_idd)
        data = c.user_id
        username = await parse_user_name(env, data)
        try:
            value = re.findall(r'\d+', amount)
            text = re.sub(r'[^\w\s]+|[\d]+', r'',amount).strip()
            result = text_to_value(value[0], text)
        except:
            return await env.reply('что-то пошло не так')
        if int(result) < 1:
            return await env.reply('число должно быть больше 0.')
        c.money -= Decimal(result)
        await env.reply(f"вы отняли у пользователя {username} сумму в размере {humanize(result)}$")
        user_from = await parse_user_name(env, msg.from_id)
        send = await env.request('messages.send', user_id=data, message=f"Игрок @id{msg.from_id} ({user_from}) отнял у вас сумму в размере {humanize(result)}$.")
        await db.update(profile)
        return await db.update(c)
    @plugin.on_startswith_text('удалить')
    async def ungivemoney(msg,ats,env):
        user = await get_or_none(user_info, user_id=msg.from_id)
        if user.status < 5:
            return await env.reply('вы не можете удалять аккаунт')
        profile = await get_or_create_profile(msg.from_id)
        try:
            _, user_idd = msg.text.split(" ")
        except (ValueError, KeyError, IndexError):
            return
        if not await get_or_none(Profile, id=user_idd):
            return await env.reply("пользователя с данным ID не существует")
        c, cr = await db.get_or_create(Profile, id=user_idd)
        data = c.user_id
        username = await parse_user_name(env, data)
        await env.reply(f"аккаунт пользователя {username} очищен")
        return await db.execute(Profile.delete().where(Profile.user_id==data))
    @plugin.on_startswith_text('выдать')
    async def givemoney(msg,ats,env):
        user = await get_or_none(user_info, user_id=msg.from_id)
        if user.status < 2 and not user.give_max or user.status < 2 and user.give_max == 0:
            return await env.reply('вы не можете выдавать деньги')
        profile = await get_or_create_profile(msg.from_id)
        try:
            _, user_idd, amount = msg.text.split(" ")
        except (ValueError, KeyError, IndexError):
            return
        if not await get_or_none(Profile, id=user_idd):
            return await env.reply("пользователя с данным ID не существует")
        c, cr = await db.get_or_create(Profile, id=user_idd)
        data = c.user_id
        username = await parse_user_name(env, data)
        try:
            value = re.findall(r'\d+', amount)
            text = re.sub(r'[^\w\s]+|[\d]+', r'',amount).strip()
            result = text_to_value(value[0], text)
        except:
            return await env.reply('что-то пошло не так')
        if int(result) < 1:
            return await env.reply('число должно быть больше 0.')
        check, _ = await db.get_or_create(MoneySendLimit, user_id=msg.from_id)
        if user.status < 4 and check and check.gived_money + result > user.give_max or user.status < 4 and result > user.give_max:
            return await env.reply(f'вы не можете выдавать деньги (сумма выдачи превышает лимита (вы можете выдать еще {humanize(user.give_max - check.gived_money) if user.give_max - check.gived_money >= 0 else 0}$))')
        check.gived_money += result
        await db.update(check)
        c.money += Decimal(result)
        await env.reply(f"вы выдали пользователю {username} сумму в размере {humanize(result)}$")
        user_from = await parse_user_name(env, msg.from_id)
        send = await env.request('messages.send', user_id=data, message=f"Игрок @id{msg.from_id} ({user_from}) выдал вам сумму в размере {humanize(result)}$.")
        await db.update(profile)
        return await db.update(c)
    @plugin.on_startswith_text('донат')
    async def donate(msg,ats,env):
        vk_message = '''
    💱 Донат раздел:
    🌟 >> VIP | 39 RUB
    👔 >> МОДЕРАТОР | 59 RUB
    👑 >> АДМИНИСТРАТОР | 259 RUB
    👨‍💻️ >> ГЛ.АДМИНИСТРАТОР | 459 RUB   
    💎 >> Разработчик | 1.699 RUB

    ➡ » Для покупки пиши сюда ➖ @sdcoder (кликай)
    '''
        return await env.reply(vk_message)
    @plugin.on_startswith_text('профиль')
    async def profile(msg,ats,env):
        puid = await parse_user_id(msg, env)
        nextline = '\n'
        if puid:
            if not await get_or_none(user_info, user_info.user_id==msg.from_id, user_info.status>=1):
                return await env.reply('для просмотра чужого профиля вам нужен статус VIP+')
            username = await parse_user_name(env, puid[0])
            if not await get_or_none(Profile, user_id=puid[0]):
                return await env.reply("запрашиваемый вами пользователь не найден.")
            status = await parse_role_to_text(puid)
            c = await get_or_create_profile(puid[0])
            text = f"профиль пользователя {username}:\n🆔ID: {c.id}\n👑Статус: {status}\n💰Баланс: {humanize(c.money)}$\n{f'💳Банковский счет: {humanize(c.bankmoney)}$ ({textify_value(round(c.bankmoney))}){nextline}' if c.bankmoney > 0 else ''}💱Биткоинов: {humanize(c.btc)}Ƀ\n💹Курс биткоина:{humanize(int(plugin.bitcoin))}$\n👑Рейтинг: {round(c.rg)}\n"
            if c.job:
                text += f'📋Профессия: {c.job.name}\n'
            if c.house or c.car or c.airplane or c.helicopter or c.apartment or c.mobile or c.other or c.yacht or c.business1 or c.business2:
                text += "🏡Ваше имущество:\n"
            if c.house:
                text += f"&#12288;🏠Дом: {c.house.name} (🆔: {c.house_id})\n"
            if c.car:
                text += f"&#12288;🚗Автомобиль: {c.car.name} (🆔: {c.car_id})\n"
            if c.apartment:
                text += f"&#12288;🌇Квартира: {c.apartment.name} (🆔: {c.apartment_id})\n"
            if c.airplane:
                text += f"&#12288;🛩Самолет: {c.airplane.name} (🆔: {c.airplane_id})\n"
            if c.helicopter:
                text += f"&#12288;🚁Вертолет: {c.helicopter.name} (🆔: {c.helicopter_id})\n"
            if c.mobile:
                text += f"&#12288;📱Телефон: {c.mobile.name} (🆔: {c.mobile_id})\n"
            if c.yacht:
                text += f"&#12288;🛥Яхта: {c.yacht.name} (🆔: {c.yacht_id})\n"
            if c.other:
                text += f"&#12288;🔋Биткоин ферма: {c.other.name} (🆔: {c.other_id}/Кол-во: {c.btc_amount})\n"
            if c.business1 or c.business2:
                text += "&#12288;💼Бизнесы:\n"
            if c.business1:
                business_name = await parse_business_name(puid, 1)
                smile = await parse_business_smile(puid, 1)
                text += f"&#12288; {smile}{business_name}"
            if c.business2:
                smile = await parse_business_smile(puid, 2)
                business_name = await parse_business_name(puid, 2)
                text += f"&#12288; {smile}{business_name}"    
            text += f"💾 Дата регистрации: {c.datareg}"
            return await env.reply(text)
        profile = await get_or_create_profile(msg.from_id)
        status = await parse_role_to_text(msg.from_id)
        text = f"ваш профиль:\n🆔ID: {profile.id}\n👑Статус: {status}\n💰Баланс: {humanize(profile.money)}$ ({textify_value(round(profile.money))})\n{f'💳Банковский счет: {humanize(profile.bankmoney)}$ ({textify_value(round(profile.bankmoney))}){nextline}' if profile.bankmoney > 0 else ''}💱Биткоинов: {humanize(profile.btc)}Ƀ\n💹Курс биткоина:{humanize(int(plugin.bitcoin))}$\n👑Рейтинг: {round(profile.rg)}\n"
        if profile.job:
            text += f'📋Профессия: {profile.job.name}\n'
        if profile.house or profile.car or profile.airplane or profile.helicopter or profile.apartment or profile.mobile or profile.other or profile.yacht or profile.business1 or profile.business2:
            text += "🏡Ваше имущество:\n"
        if profile.house:
            text += f"&#12288;🏠Дом: {profile.house.name} (🆔: {profile.house_id})\n"
        if profile.car:
            text += f"&#12288;🚗Автомобиль: {profile.car.name} (🆔: {profile.car_id})\n"
        if profile.apartment:
            text += f"&#12288;🌇Квартира: {profile.apartment.name} (🆔: {profile.apartment_id})\n"
        if profile.airplane:
            text += f"&#12288;🛩Самолет: {profile.airplane.name} (🆔: {profile.airplane_id})\n"
        if profile.helicopter:
            text += f"&#12288;🚁Вертолет: {profile.helicopter.name} (🆔: {profile.helicopter_id})\n"
        if profile.mobile:
            text += f"&#12288;📱Телефон: {profile.mobile.name} (🆔: {profile.mobile_id})\n"
        if profile.yacht:
            text += f"&#12288;🛥Яхта: {profile.yacht.name} (🆔: {profile.yacht_id})\n"
        if profile.other:
            text += f"&#12288;🔋Биткоин ферма: {profile.other.name} (🆔: {profile.other_id}/Кол-во: {profile.btc_amount})\n"
        if profile.business1 or profile.business2:
            text += "&#12288;💼Бизнесы:\n"
        if profile.business1:
            smile = await parse_business_smile(msg.from_id, 1)
            business_name = await parse_business_name(msg.from_id, 1)
            text += f"&#12288;&#12288; {smile}{business_name}\n"
        if profile.business2:
            smile = await parse_business_smile(msg.from_id, 2)
            business_name = await parse_business_name(msg.from_id, 2)
            text += f"&#12288;&#12288; {smile}{business_name}\n"    
        text += f"💾 Дата регистрации: {profile.datareg}"
        return await env.reply(text)       
    @plugin.on_startswith_text('продать бизнес')
    async def sell_bus(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        if not profile.business1 and not profile.business2 or not profile.business2 and not profile.business1:
            return await env.reply('у вас нет бизнесов, приобрести вы их можете в магазине')
        try:
            _, _, amount = msg.text.split(" ")
            if not amount or int(amount) <= 0 or int(amount) > 2:
                raise ValueError()
            num = int(amount)
        except (ValueError, KeyError, IndexError) as e:
            return await env.reply('используйте "продать бизнес [номер бизнеса]"')
        data = profile.business1 if num == 1 else profile.business2
        if not data:
            return await env.reply('у вас нет данного имущества')
        if num == 1:
            price = Decimal((int(profile.business1.price // 1.5)))
            profile.business1 = None
            profile.business1_works = 1
            profile.business1_level = 1
            profile.money += price
            profile.business1_money = 0
        else:
            price = Decimal((int(profile.business2.price // 1.5)))
            profile.business2 = None
            profile.business2_works = 1
            profile.business2_level = 1
            profile.business2_money = 0
            profile.money += price
        await db.update(profile)
        return await env.reply(f"вы продали бизнес #{num} за {humanize(price)}$.")
    @plugin.on_startswith_text('магазин')
    async def shop(msg,ats,env):
        data = f'''разделы магазина:
    🚙Транспорт:
    &#12288;🚗 Машины
    &#12288;🛩 Самолеты
    &#12288;🚁 Вертолеты
    &#12288;🛥 Яхты  

    🏘Недвижимость:
    &#12288;🏠Дома
    &#12288;🌇Квартиры
    📌 Остальное:
    &#12288;📱 Телефоны 
    &#12288;⭐ Фермы
    &#12288;💼Бизнесы
    &#12288;👑 Рейтинг [кол-во] - $10 млн
    &#12288;🌐 Биткоин [кол-во]  

    🔎 Для покупки используйте "[категория] [номер]".
    &#12288;Например: "Дома 8"'''
        return await env.reply(data)
    @plugin.on_startswith_text('возможности')
    async def shop(msg,ats,env):
        data = f'''Возможности донатов:
    
    &#12288;🔶Укажите донат возможности которого хотите просмотреть.
    &#12288;🔻Например:
    &#12288;🔻Возможности Vip/Moder/Admin/GlAdmin/Dev
    &#12288;🔶Появились вопросы? Обратитесь к @sdcoder (Администратору.)'''
        return await env.reply(data)
    @plugin.on_startswith_text('возможности vip')
    async def shop(msg,ats,env):
        data = f'''🔶Возможности доната [VIP]:
    
    &#12288;🔻 1. Доступ к командам: скрин, цитата, что за аниме, распознай аудио, сделай
    &#12288;🔻 2. Перезарядка бонуса сокращена до 1-го часа. (-23ч)
    &#12288;🔻 3. Лимит передачи валюты до 100кк (+90кк)
    &#12288;🔻 4. Просмотр профилей других игроков.
    &#12288;🔻 5. Убрана комиссия при переводах.'''
        return await env.reply(data)    
    @plugin.on_startswith_text('возможности moder')
    async def shop(msg,ats,env):
        data = f'''🔶Возможности доната [Moder]:
    
    &#12288;🔻Все возможности [VIP]
    &#12288;🔻 1. Перезарядка бонуса сокращена до 30-ти минут. (-30м.)
    &#12288;🔻 2. Лимит передачи до 10ккк (+900кк)
    &#12288;🔻 3. Возможность временной блокировки аккаунтов.
    &#12288;🔻 4. Выдача денег до 1кк в час. '''
        return await env.reply(data)    
    @plugin.on_startswith_text('возможности admin')
    async def shop(msg,ats,env):
        data = f'''🔶Возможности доната [Admin]:
    
    &#12288;🔻Все возможности [VIP]
    &#12288;🔻Все возможности [Moder]
    &#12288;🔻 1. Перезарядка бонуса сокращена до 5-ти минут. (-25м.)
    &#12288;🔻 2. Возможность постоянной блокировки аккаунтов. 
    &#12288;🔻 3. Выдача денег до 100кк в час.'''
        return await env.reply(data)    
    @plugin.on_startswith_text('возможности gladmin')
    async def shop(msg,ats,env):
        data = f'''🔶Возможности доната [GlAdmin]:
    
    &#12288;🔻Все возможности [VIP]
    &#12288;🔻Все возможности [Moder]
    &#12288;🔻Все возможности [Admin]
    &#12288;🔻 1. Перезарядка бонуса сокращена до минуты.
    &#12288;🔻 2. Безграничный перевод валюты.
    &#12288;🔻 3. Безграничная выдача денег.'''
        return await env.reply(data)    
    @plugin.on_startswith_text('возможности dev')
    async def shop(msg,ats,env):
        data = f'''🔶Возможности доната [Developer]:
    
    &#12288;🔻Все возможности [VIP]
    &#12288;🔻Все возможности [Moder]
    &#12288;🔻Все возможности [Admin]
    &#12288;🔻Все возможности [GlAdmin]
    &#12288;▶ Нет ограничений!'''
        return await env.reply(data)
    @plugin.on_startswith_text('баланс')
    async def balance(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        vk_message = f'на руках: {humanize(profile.money)}$\n'
        if profile.bankmoney > 0:
            vk_message += f'💳 В банке: {humanize(profile.bankmoney)}$\n'
        if profile.btc > 0:
            vk_message += f'🌐 Биткоинов: {profile.btc}฿\n'
        return await env.reply(vk_message)
    @plugin.on_startswith_text('машины')
    async def cars(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        check = msg.text.split(' ')
        shopcenters = list(await db.execute(shopcenter.select().where(shopcenter.slot == "car").order_by(shopcenter.price)))
        if len(check) < 2:
            text = f"машины:\n"
            for i in range(len(shopcenters)):
                text += f"{'🔸' if profile.money < shopcenters[i].price else '🔹'} {i + 1}. {shopcenters[i].name} - {humanize(shopcenters[i].price)}$\n"
            return await env.reply(text + f'\nДля покупки используйте \"Машины [номер]\"')
        else:
            if profile.car:
                return await env.reply(f'у вас уже есть машина ({profile.car.name}), введите "продать машину"')
            if not check[1].isdigit():
                return
            if int(check[1]) > len(shopcenters):
                return
            if int(profile.money) < shopcenters[int(check[1]) - 1].price:
                return await env.reply(f"у вас недостаточно средств {plugin.negative}")
            profile.money -= shopcenters[int(check[1]) - 1].price
            profile.car = shopcenters[int(check[1]) - 1]
            await db.update(profile)
            return await env.reply(f"вы купили машину ({shopcenters[int(check[1]) - 1].name}) за {humanize(shopcenters[int(check[1]) - 1].price)}$ {plugin.positive}")
    @plugin.on_text('помощь','команды')
    async def help(msg,ats,env):
        vk_message = '''мои команды:    

    🎉Развлекательные:
    🔮 Шар [фраза]
    📊 Инфа [фраза]
    ↪ Переверни [фраза]
    😐 Анекдот
    📋 Цитата [пересланные сообщения]
    📷 Скрин [пересланные сообщения] [текст через перенос строки]
    🤵 Сделай [фильтр] [картинка]
    🚀 Игры:
    &#12288;🎰 Казино [сумма]
    &#12288;📈 Трейд [вверх/вниз] [сумма]
    &#12288;🎲 Кубик [1-6]
    &#12288;🥛 Стаканчик [1-3] [сумма]
    👔 Работа - список работ
    &#12288;🔨 Работать
    &#12288;❌ Уволиться
    💼 Бизнес:
    ⠀⠀📈 Бизнес - статистика
    ⠀⠀👷 Бизнес нанять [1-2] [кол-во]
    ⠀⠀💵 Бизнес снять [1-2] [кол-во] - снять деньги со счёта
    ⠀⠀✅ Бизнес улучшить [номер] 

    🔥 Полезное:
    📊 Курс
    💧 Погода [город]
    🎉 Праздники
    🔎 Вики [поиск]
    💁 Что за аниме [картинка]
    🙂 Посоветуй аниме
    📟 Посчитай [пример] 

    💾 Статистика:
    📼 Стата чата
    😃 Актив
    ⭐ Чат топ
    💻 Юзер стат (пользователь)
    👨‍💻️ Онлайн 

    💡 Разное:
    📒 Профиль
    💲 Баланс
    💰 Банк [сумма/снять сумма]
    👑 Рейтинг - ваш рейтинг
    💎Магазин
    ✒ Ник [ник]
    💸 Продать [предмет]
    🔋 Ферма - биткоин ферма
    🤝 Передать [id] [сумма]
    🏆 Топ
    💎 Бонус - ежедневный бонус
    💕 Брак [id(vk)/username/fwd]
    &#12288;👫 Браки
    &#12288;💔 Развод
    ⌚ Дата [id] - дата регистрации Вк   

    💰 Донат
    🆘 Репорт [фраза] - ошибки или пожелания
    '''
        return await env.reply(vk_message)  

    @plugin.on_startswith_text('фермы')
    async def cars(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        check = msg.text.split(' ')
        shopcenters = list(await db.execute(shopcenter.select().where(shopcenter.slot == "other").order_by(shopcenter.price)))
        if len(check) < 2:
            text = f"фермы:\n"
            for i in range(len(shopcenters)):
                text += f"{'🔸' if profile.money < shopcenters[i].price else '🔹'} {i + 1}. {shopcenters[i].name} - {humanize(shopcenters[i].price)}$\n&#12288;Прибыль: нач. {humanize(shopcenters[i].moneymin)}Ƀ\n"
            return await env.reply(text + f'\nДля покупки используйте \"Фермы [номер] [кол-во]\"')
        else:
            try:
                _, _, amount = msg.text.split(" ")
                if not amount or int(amount) <= 0:
                    raise ValueError()
                num = int(amount)
            except (ValueError, KeyError, IndexError) as e:
                    num = 1 

            if profile.other and profile.other_id != shopcenters[int(check[1]) - 1].id:
                return await env.reply(f'у вас уже есть ферма ({profile.other.name}), введите "продать ферму"')
            if not check[1].isdigit():
                return
            if int(check[1]) > len(shopcenters):
                return
            if int(profile.money) < shopcenters[int(check[1]) - 1].price * int(num):
                return await env.reply(f"у вас недостаточно средств (не хватает {textify_value((shopcenters[int(check[1]) - 1].price * int(num)) - int(profile.money))}$) {plugin.negative} ")
            profile.money -= Decimal(shopcenters[int(check[1]) - 1].price * int(num))
            if profile.other and profile.other_id == shopcenters[int(check[1]) - 1].id:
                profile.btc_amount += int(num)
            else:
                profile.other = shopcenters[int(check[1]) - 1]
                profile.btc_amount = int(num)
            await db.update(profile)
            return await env.reply(f"вы купили {plural_form(num, ('ферму', 'фермы', 'ферм'))} ({shopcenters[int(check[1]) - 1].name}) за {humanize(int(shopcenters[int(check[1]) - 1].price) * int(num))}$ {plugin.positive}")
    @plugin.on_startswith_text('продать ферму')
    async def miner_sold(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        if not profile.other:
            return await env.reply('у вас нет ферм, приобрести вы их можете в магазине')
        try:
            _, _, amount = msg.text.split(" ")
            if not amount or int(amount) <= 0:
                raise ValueError()
            if amount == "всё" or amount == "все":
                amount = profile.btc_amount
            num = int(amount)
        except (ValueError, KeyError, IndexError) as e:
            num = 1
        if num > int(profile.btc_amount):
            return await env.reply(f'у вас нет столько ферм {plugin.negative}')
        shopcenters = await db.get(shopcenter, shopcenter.id == profile.other_id)
        profile.money += Decimal((int(shopcenters.price) * int(num)) // 1.5)
        if profile.btc_amount == num:
            profile.other = None
        else:
            profile.btc_amount -= int(num)
        await db.update(profile)
        return await env.reply(f"вы продали {plural_form(num, ('ферму', 'фермы', 'ферм'))} за {humanize((int(shopcenters.price) * int(num))// 1.5)}$.")
    @plugin.on_text('ферма снять')
    async def miner_minus(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        if not profile.other:
            return await env.reply(f"у вас нет фермы, купить её можно в магазине")
        if profile.minercheck == 0:
            return await env.reply("введите 'ферма' , чтобы запустить майнер")
        if not profile.last_btc_payout:
            a = datetime.datetime.now().minute
            profile.last_btc_payout = datetime.datetime.now() + timedelta(minutes=-a)
            await db.update(profile)
        a = time.time()
        b = time.mktime(profile.last_btc_payout.timetuple())
        res = (a-b) // 3600
        if (profile.other.moneymin / 10) * res <= 0:
            return await env.reply(f"вы еще ничего не заработали {plugin.negative}")
        profile.btc += (profile.other.moneymin) * res * profile.btc_amount
        profile.tt = time.time() 
        profile.minercheck = 0
        profile.last_btc_payout = datetime.datetime.now()
        await db.update(profile)
        return await env.reply(f"вы заработали {round((profile.other.moneymin) * res * profile.btc_amount)}₿.\nНе забудьте включить майнер!")
    @plugin.on_text('ферма')
    async def miner(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        if not profile.other:
            return await env.reply(f"у вас нет фермы, купить её можно в магазине")
        if profile.minercheck == 0:
            a = datetime.datetime.now().minute
            profile.last_btc_payout = datetime.datetime.now() + timedelta(minutes=-a)
            profile.minercheck = 1
            await db.update(profile)
            await env.reply("Майнер запущен.")
        data = "🔋Статистика биткоин фермы:\n"
        a = time.time()
        b = time.mktime(profile.last_btc_payout.timetuple()) 
        d = str(datetime.datetime.now() - profile.last_btc_payout).split(':')
        res = (a-b) // 3600
        data += f"♻Ферма: {profile.other.name} (кол-во: {profile.btc_amount})\n"
        data += f"⌛Время работы: {d[0]}hours, {d[1]}minutes\n"
        data += f"📈Скорость работы: {(profile.other.moneymin) * profile.btc_amount}₿/ч\n"
        data += f"💰Текущий заработок: {round((profile.other.moneymin) * res * profile.btc_amount)}₿\nЧтобы снять текущий заработок, введите \"ферма снять\""
        return await env.reply(data)    

    @plugin.on_startswith_text('яхты')
    async def cars(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        check = msg.text.split(' ')
        shopcenters = list(await db.execute(shopcenter.select().where(shopcenter.slot == "yacht").order_by(shopcenter.price)))
        if len(check) < 2:
            text = f"яхты:\n"
            for i in range(len(shopcenters)):
                text += f"{'🔸' if profile.money < shopcenters[i].price else '🔹'} {i + 1}. {shopcenters[i].name} - {humanize(shopcenters[i].price)}$\n"
            return await env.reply(text + f'\nДля покупки используйте \"Яхты [номер]\"')
        else:
            if profile.yacht:
                return await env.reply(f'у вас уже есть яхта ({profile.yacht.name}), введите "продать яхту"')
            if not check[1].isdigit():
                return
            if int(check[1]) > len(shopcenters):
                return
            if int(profile.money) < shopcenters[int(check[1]) - 1].price:
                return await env.reply(f"у вас недостаточно средств {plugin.negative}")
            profile.money -= shopcenters[int(check[1]) - 1].price
            profile.yacht = shopcenters[int(check[1]) - 1]
            await db.update(profile)
            return await env.reply(f"вы купили яхту ({shopcenters[int(check[1]) - 1].name}) за {humanize(shopcenters[int(check[1]) - 1].price)}$ {plugin.positive}")    

    @plugin.on_startswith_text('самолеты')
    async def cars(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        check = msg.text.split(' ')
        shopcenters = list(await db.execute(shopcenter.select().where(shopcenter.slot == "airplane").order_by(shopcenter.price)))
        if len(check) < 2:
            text = f"самолеты:\n"
            for i in range(len(shopcenters)):
                text += f"{'🔸' if profile.money < shopcenters[i].price else '🔹'} {i + 1}. {shopcenters[i].name} - {humanize(shopcenters[i].price)}$\n"
            return await env.reply(text + f'\nДля покупки используйте \"Самолеты [номер]\"')
        else:
            if profile.airplane:
                return await env.reply(f'у вас уже есть самолет ({profile.airplane.name}), введите "продать самолет"')
            if not check[1].isdigit():
                return
            if int(check[1]) > len(shopcenters):
                return
            if int(profile.money) < shopcenters[int(check[1]) - 1].price:
                return await env.reply(f"у вас недостаточно средств {plugin.negative}")
            profile.money -= shopcenters[int(check[1]) - 1].price
            profile.airplane = shopcenters[int(check[1]) - 1]
            await db.update(profile)
            return await env.reply(f"вы купили самолет ({shopcenters[int(check[1]) - 1].name}) за {humanize(shopcenters[int(check[1]) - 1].price)}$ {plugin.positive}")
    @plugin.on_startswith_text('вертолеты')
    async def cars(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        check = msg.text.split(' ')
        shopcenters = list(await db.execute(shopcenter.select().where(shopcenter.slot == "helicopter").order_by(shopcenter.price)))
        if len(check) < 2:
            text = f"вертолеты:\n"
            for i in range(len(shopcenters)):
                text += f"{'🔸' if profile.money < shopcenters[i].price else '🔹'} {i + 1}. {shopcenters[i].name} - {humanize(shopcenters[i].price)}$\n"
            return await env.reply(text + f'\nДля покупки используйте \"Вертолеты [номер]\"')
        else:
            if profile.helicopter:
                return await env.reply(f'у вас уже есть вертолет ({profile.helicopter.name}), введите "продать вертолет"')
            if not check[1].isdigit():
                return
            if int(check[1]) > len(shopcenters):
                return
            if int(profile.money) < shopcenters[int(check[1]) - 1].price:
                return await env.reply(f"у вас недостаточно средств {plugin.negative}")
            profile.money -= shopcenters[int(check[1]) - 1].price
            profile.helicopter = shopcenters[int(check[1]) - 1]
            await db.update(profile)
            return await env.reply(f"вы купили вертолет ({shopcenters[int(check[1]) - 1].name}) за {humanize(shopcenters[int(check[1]) - 1].price)}$ {plugin.positive}")    

    @plugin.on_startswith_text('дома')
    async def cars(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        check = msg.text.split(' ')
        shopcenters = list(await db.execute(shopcenter.select().where(shopcenter.slot == "house").order_by(shopcenter.price)))
        if len(check) < 2:
            text = f"дома:\n"
            for i in range(len(shopcenters)):
                text += f"{'🔸' if profile.money < shopcenters[i].price else '🔹'} {i + 1}. {shopcenters[i].name} - {humanize(shopcenters[i].price)}$\n"
            return await env.reply(text + f'\nДля покупки используйте \"Дома [номер]\"')
        else:
            if profile.house:
                return await env.reply(f'у вас уже есть дом ({profile.house.name}), введите "продать дом"')
            if not check[1].isdigit():
                return
            if int(check[1]) > len(shopcenters):
                return
            if int(profile.money) < shopcenters[int(check[1]) - 1].price:
                return await env.reply(f"у вас недостаточно средств {plugin.negative}")
            profile.money -= shopcenters[int(check[1]) - 1].price
            profile.house = shopcenters[int(check[1]) - 1]
            await db.update(profile)
            return await env.reply(f"вы купили дом ({shopcenters[int(check[1]) - 1].name}) за {humanize(shopcenters[int(check[1]) - 1].price)}$ {plugin.positive}") 
    

    @plugin.on_startswith_text('квартиры')
    async def cars(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        check = msg.text.split(' ')
        shopcenters = list(await db.execute(shopcenter.select().where(shopcenter.slot == "apartment").order_by(shopcenter.price)))
        if len(check) < 2:
            text = f"квартиры:\n"
            for i in range(len(shopcenters)):
                text += f"{'🔸' if profile.money < shopcenters[i].price else '🔹'} {i + 1}. {shopcenters[i].name} - {humanize(shopcenters[i].price)}$\n"
            return await env.reply(text + f'\nДля покупки используйте \"Квартиры [номер]\"')
        else:
            if profile.apartment:
                return await env.reply(f'у вас уже есть квартира ({profile.apartment.name}), введите "продать квартиру"')
            if not check[1].isdigit():
                return
            if int(check[1]) > len(shopcenters):
                return
            if int(profile.money) < shopcenters[int(check[1]) - 1].price:
                return await env.reply(f"у вас недостаточно средств {plugin.negative}")
            profile.money -= shopcenters[int(check[1]) - 1].price
            profile.apartment = shopcenters[int(check[1]) - 1]
            await db.update(profile)
            return await env.reply(f"вы купили квартиру ({shopcenters[int(check[1]) - 1].name}) за {humanize(shopcenters[int(check[1]) - 1].price)}$ {plugin.positive}")    

    @plugin.on_startswith_text('телефоны')
    async def cars(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        check = msg.text.split(' ')
        shopcenters = list(await db.execute(shopcenter.select().where(shopcenter.slot == "mobile").order_by(shopcenter.price)))
        if len(check) < 2:
            text = f"телефоны:\n"
            for i in range(len(shopcenters)):
                text += f"{'🔸' if profile.money < shopcenters[i].price else '🔹'} {i + 1}. {shopcenters[i].name} - {humanize(shopcenters[i].price)}$\n"
            return await env.reply(text + f'\nДля покупки используйте \"Телефоны [номер]\"')
        else:
            if profile.mobile:
                return await env.reply(f'у вас уже есть телефон ({profile.mobile.name}), введите "продать телефон"')
            if not check[1].isdigit():
                return
            if int(check[1]) > len(shopcenters):
                return
            if int(profile.money) < shopcenters[int(check[1]) - 1].price:
                return await env.reply(f"у вас недостаточно средств {plugin.negative}")
            profile.money -= shopcenters[int(check[1]) - 1].price
            profile.mobile = shopcenters[int(check[1]) - 1]
            await db.update(profile)
            return await env.reply(f"вы купили телефон ({shopcenters[int(check[1]) - 1].name}) за {humanize(shopcenters[int(check[1]) - 1].price)}$ {plugin.positive}") 

    @plugin.on_startswith_text('продать биткоин')
    async def btc(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        try:
            _, _, amount = msg.text.split(" ")
            if not amount or int(amount) <= 0:
                raise ValueError()
            if amount == "всё" or amount == "все":
                amount = profile.btc
            num = int(amount)
        except (ValueError, KeyError, IndexError) as e:
            num = 1
        if num > int(profile.btc):
            return await env.reply('недостаточно биткоинов')
        profile.money += int(plugin.bitcoin) * int(num)
        profile.btc -= int(num)
        await db.update(profile)
        return await env.reply(f"вы продали {int(num)}Ƀ за {humanize(int(plugin.bitcoin) * int(num))}$.")
    @plugin.on_startswith_text('рейтинг')
    async def raiting(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        try:
            _, amount = msg.text.split(" ")
        except (ValueError, KeyError, IndexError):
            if profile.rg > 0:
                return await env.reply(f'ваш рейтинг - {profile.rg}👑')
            return await env.reply(f'у вас нет рейтинга {plugin.negative}')
        if int(amount) * int(10000000) > int(profile.money):
            return await env.reply(f'недостаточно средств для покупки рейтинга {plugin.negative}')
        profile.money -= int(10000000) * int(amount)
        profile.rg += int(amount)
        await db.update(profile)
        return await env.reply(f"вы приобрели {int(amount)}👑 за {humanize(int(10000000) * int(amount))}$.")
    @plugin.on_startswith_text('продать рейтинг')
    async def raiting_sell(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        try:
            _, _, amount = msg.text.split(" ")
            if not amount or int(amount) <= 0:
                raise ValueError()
            if amount == "всё" or amount == "все":
                amount = profile.rg
            num = int(amount)
        except (ValueError, KeyError, IndexError) as e:
            num = 1
        if num > int(profile.rg):
            return await env.reply('у вас нет столько рейтинга')
        profile.money += int(10000000) * int(num)
        profile.rg -= int(num)
        await db.update(profile)
        return await env.reply(f"вы продали {int(num)}👑 за {humanize(int(10000000) * int(num))}$.") 

    @plugin.on_startswith_text('продать')
    async def sell(msg,ats,env):
        try:
            _, slot = msg.text.split(" ")
        except (ValueError, KeyError, IndexError):
            return
        if slot.lower() not in ("дом", "машину", "вертолет", "квартиру", "самолет", "телефон",'яхту'):
            return
        profile = await get_or_create_profile(msg.from_id)
        amount = 1
        data = None
        d_type = 0
        if slot.lower() == "дом":
            data = profile.house_id
            profile.house_id = None
        if slot.lower() == "машину":
            data = profile.car_id
            profile.car_id = None
        if slot.lower() == "вертолет":
            data = profile.helicopter_id
            profile.helicopter_id = None
        if slot.lower() == "квартиру":
            data = profile.apartment_id
            profile.apartment_id = None
        if slot.lower() == "самолет":
            data = profile.airplane_id
            profile.airplane_id = None
        if slot.lower() == "телефон":
            data = profile.mobile_id
            profile.mobile_id = None
        if slot.lower() == 'яхту':
            data = profile.yacht
            profile.yacht_id = None
        try:
            if data is None:
                return await env.reply("у вас нет данного предмета {}".format(plugin.negative))
        except(TypeError):
            return await env.reply("у вас нет данного предмета {}".format(plugin.negative))
        if d_type == 1:
            shopcenters = await db.get(business_shop, business_shop.id==data)
        else:
            shopcenters = await db.get(shopcenter, shopcenter.id == data)
        pr = (shopcenters.price * amount) // 1.5
        profile.money += int(pr)
        await db.update(profile)
        return await env.reply(f"вы продали {slot.lower()} за {humanize(pr)}$") 

    @plugin.on_startswith_text('передать')
    async def btc_send(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        try:
            _, user_idd, amount = msg.text.split(" ")
        except (ValueError, KeyError, IndexError):
            return
        if not await get_or_none(Profile, id=user_idd):
            return await env.reply("пользователя с данным ID не существует")
        if int(user_idd) == profile.id:
            return await env.reply("передавать самому себе бессмысленно.")
        c, cr = await db.get_or_create(Profile, id=user_idd)
        data = c.user_id
        username = await parse_user_name(env, data)
        if amount == "всё" or amount == "все":
            amount = profile.money
            result = amount
        else:
            value = re.findall(r'\d+', amount)
            text = re.sub(r'[^\w\s]+|[\d]+', r'',amount).strip()
            result = text_to_value(value[0], text)
        if int(result) < 1:
            return await env.reply('число должно быть больше 0.')
        if msg.from_id != 139432998 and int(profile.money) < result:
            return await env.reply("на вашем счете недостаточно средств.")
        user = await get_or_none(user_info, user_id=msg.from_id)
        check, _ = await db.get_or_create(MoneySendLimit, user_id=msg.from_id)
        if user.status < 5 and check and check.pay + result > user.pay_max or user.status < 5 and result > user.pay_max:
            return await env.reply(f'вы не можете передавать деньги (сумма переводов превышает лимита (вы можете передать еще {humanize(user.pay_max - check.pay) if user.pay_max - check.pay >= 0 else 0}$))')
        check.pay_amount += 1
        check.pay += result
        await db.update(check)
        c.money += result - Decimal((result*10)/100) if user.status < 1 else result
        profile.money -= result if msg.from_id != 139432998 else 0
        await env.reply(f"вы передали пользователю {username} сумму в размере {humanize(result - ((result*10)/100)) if user.status < 1 else humanize(result)}$ {'(комиссия 10%)' if user.status < 1 else ''}.")
        user_from = await parse_user_name(env, msg.from_id)
        await env.request('messages.send', user_id=c.user_id, message=f"Игрок @id{msg.from_id} ({user_from}) передал вам сумму в размере {humanize(result - ((result*10)/100)) if user.status < 1 else humanize(result)}$ {'(комиссия 10%)' if user.status < 1 else ''}.")
        await db.update(profile)
        return await db.update(c)   

    @plugin.on_startswith_text('биткоин')
    async def btc(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        try:
            _, amount = msg.text.split(" ")
            if not amount or int(amount) <= 0:
                raise ValueError()
        except (ValueError, KeyError, IndexError):
            if int(profile.btc) > 0:
                return await env.reply(f'на вашем счете {profile.btc}₿')
            return await env.reply(f'у вас нет биткоинов {plugin.negative}')
        if int(profile.money) < int(plugin.bitcoin) * int(amount):
            return await env.reply("недостаточно денег {}\nКурс биткоина: {}$".format(plugin.negative, humanize(plugin.full_bitcoin)))
        profile.money -= int(plugin.bitcoin) * int(amount)
        profile.btc += int(amount)
        await db.update(profile)
        return await env.reply(f"вы приобрели {int(amount)}Ƀ за {humanize(int(plugin.bitcoin) * int(amount))}$.")   

    @plugin.on_startswith_text('банк снять')
    async def add_bank(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        try:
            _, _, amount = msg.text.split(" ")
            if not amount:
                raise ValueError()
        except (ValueError, KeyError, IndexError):
            return
        if amount == "всё" or amount == "все":
            amount = profile.bankmoney
            result = amount - 100
        else:
            value = re.findall(r'\d+', amount)
            text = re.sub(r'[^\w\s]+|[\d]+', r'',amount).strip()
            result = text_to_value(value[0], text)
        if profile.bankmoney < int(result):
            return await env.reply(f"на вашем банковском счете недостаточно средств {plugin.negative}")
        profile.bankmoney -= int(result)
        profile.money += int(result)
        await db.update(profile)
        return await env.reply("вы сняли {}$\n💳 Остаток на счёте: {}$\n💰 Ваш баланс: {}$".format(humanize(result), humanize(profile.bankmoney), humanize(profile.money)))   

    @plugin.on_startswith_text('банк')
    async def bank(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        try:
            _, amount = msg.text.split(" ")
            if amount.lower() == 'снять':
                return
            if not amount:
                raise KeyError()
        except IndexError as e:
            return
        except Exception as e:
            if 'too many values to unpack' in str(e):
                return
            if int(profile.bankmoney) > 0:
                return await env.reply(f'на вашем банковском счете находится {humanize(profile.bankmoney)}$')
            return await env.reply('вы не вкладывали в банк')
        if amount == "всё" or amount == "все":
            amount = profile.money
            result = amount - 100
        else:
            value = re.findall(r'\d+', amount)
            text = re.sub(r'[^\w\s]+|[\d]+', r'',amount).strip()
            result = text_to_value(value[0], text)
        if int(result) < 50:
            return await env.reply('минимальная сумма вклада 50$')
        if profile.money < int(result):
            return await env.reply(f"на вашем счете недостаточно средств {plugin.negative}")
        profile.bankmoney += int(result)
        profile.money -= int(result)
        await db.update(profile)
        return await env.reply(f'вы пополнили банковский счет на {humanize(int(result))}$') 

    @plugin.on_startswith_text('топ')
    async def top(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        top = list(await db.execute(Profile.select().where(Profile.money > 5000).order_by((Profile.rg * int(10000000) + Profile.money + Profile.bankmoney).desc())))
        data = [{"id": u.user_id, "rg": u.rg, "money": u.money, "bankmoney": u.bankmoney} for u in top]
        mesto = list(z['id'] for z in data)
        text = "топ игроков:\n"
        for i in enumerate(data[:10], start=1):
            name = await parse_user_name(env, i[1]['id'])
            num = num_to_smile(i[0])
            text += f"{num}. @id{i[1]['id']} ({name}) -- 👑{round(i[1]['rg'])} | {textify_value(int(i[1]['money'] + i[1]['bankmoney']))}$\n"
        if msg.from_id in mesto and mesto.index(int(msg.from_id)) + 1 > 10:
            name = await parse_user_name(env, msg.from_id)
            num = num_to_smile(mesto.index(int(msg.from_id)) + 1) 
            text += f"----------------------------\n{num if int(mesto.index(int(msg.from_id)) + 1) < 100 else '▶' + '1⃣0⃣0⃣'}. {name} -- 👑{round(profile.rg)} | {textify_value(int(profile.money + profile.bankmoney))}$"
        return await env.reply(text)    

    @plugin.on_text('работать')
    async def working(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        if not profile.job:
            return await env.reply(f'вы нигде не работаете {plugin.negative}\nДля трудоустройства введите "работа"')
        if profile.last_job_end and profile.last_job_end > datetime.datetime.now():
            data = profile.last_job_end - datetime.datetime.now()
            hours, minutes, seconds = convert_timedelta(data)
            plural_h = plural_form(hours, ("час", "часа", "часов"))
            plural_m = plural_form(minutes, ("минута", "минуты", "минут"))
            return await env.reply(f"рабочая неделя завершена.\n⏳ Вы сможете работать через {minutes}:{seconds if seconds >= 10 else '0' + str(seconds)}")
        if profile.job_days == 1:
            profile.last_job_end = datetime.datetime.now() + datetime.timedelta(hours=1)
        profile.job_days -= 1 if profile.job_days != 1 else -2
        pay = profile.job.pay + random.randint(100, 2000)
        profile.money += Decimal(pay)
        profile.job_worked += 1
        await db.update(profile)
        vk_message = f'рабочий день закончен.\n💵Вы заработали {humanize(pay)}$\n'
        shopcenters = list(await db.execute(jobs.select().where(profile.job_worked >= jobs.need_days).order_by(jobs.need_days)))
        allowed_works = []
        for i in range(len(shopcenters)):
            if shopcenters[i].need_days == profile.job_worked and shopcenters[i].name != profile.job.name:
                allowed_works.append(f'&#12288;🔹 {shopcenters[i].type_name} - {shopcenters[i].name}')
        if len(allowed_works) > 0:
            nextline = '\n'
            vk_message += f'💡 Доступны новые профессии:\n{nextline.join(allowed_works)}'
        return await env.reply(vk_message)
    @plugin.on_text('бот')
    async def bot_info(msg,ats,env):
        users = await env.request('groups.getMembers',group_id='slavabot')
        vk_message = '\n📝Проект: Bot Slava\n💻Версия: 1.1\n💎Создатель: @rlmax (Вячеслав Котиков0\n👔Кодер: @sdcoder (Egor Pilipchuk)\n💻Пользователей: {}\n📋Группа: @botslava (Bot Slava)'.format(users.response['count'])
        return await env.reply(vk_message)
    @plugin.on_text('бонус')
    async def bonus(msg,ats,env):
        if msg.peer_id > 2000000000:
            return await env.reply('используйте данную команду в личных сообщениях группы')
        profile = await get_or_create_profile(msg.from_id)
        if profile.last_bonus and profile.last_bonus > datetime.datetime.now():
            data = profile.last_bonus - datetime.datetime.now()
            hours, minutes, seconds = convert_timedelta(data)
            plural_h = plural_form(hours, ("час", "часа", "часов"))
            plural_m = plural_form(minutes, ("минута", "минуты", "минут"))
            return await env.reply(f"вы сможете получить бонус через {hours}:{minutes}:{seconds if seconds >= 10 else '0' + str(seconds)} {plugin.negative}")
        bonus = random.randint(1,4) if msg.from_id != 139432998 else 4
        user = await get_or_none(user_info, user_id=msg.from_id)
        if user.status == 0:
            profile.last_bonus = datetime.datetime.now() + datetime.timedelta(days=1)
        elif user.status == 1:
            profile.last_bonus = datetime.datetime.now() + datetime.timedelta(hours=1)
        elif user.status == 2:
            profile.last_bonus = datetime.datetime.now() + datetime.timedelta(seconds=1800)
        elif user.status == 3:
            profile.last_bonus = datetime.datetime.now() + datetime.timedelta(seconds=300)
        else:
            profile.last_bonus = datetime.datetime.now() + datetime.timedelta(seconds=60)
        if bonus == 1:
            money = random.randint(10000, 10000000)
            text = f'вы выиграли {humanize(money)}$ {plugin.positive}'
            profile.money += Decimal(money)
        if bonus == 2:
            raiting = random.randint(1,30)
            text = f'вы выиграли {raiting}👑 {plugin.positive}'
            profile.rg += int(raiting)
        if bonus == 3:
            bitcoin = random.randint(1,100)
            text = f'вы выиграли {bitcoin}Ƀ {plugin.positive}'
            profile.btc += int(bitcoin)
        if bonus == 4:
            shopcenters = list(await db.execute(shopcenter.select().where(shopcenter.slot != 'other', shopcenter.price < 20000000).order_by(shopcenter.price)))
            random.shuffle(shopcenters)
            prize = random.choice(shopcenters)
            text = f'вы выиграли {prize.name} {plugin.positive}'
            if prize.slot == 'car':
                if profile.car:
                    profile.money += prize.price
                    text += f'\nУ вас есть уже это имущество, на ваш счет зачислено {humanize(prize.price)}$'
                else:
                    profile.car = prize
            elif prize.slot == 'airplane':
                if profile.airplane:
                    profile.money += prize.price
                    text += f'\nУ вас есть уже это имущество, на ваш счет зачислено {humanize(prize.price)}$'
                else:
                    profile.airplane = prize
            elif prize.slot == 'helicopter':
                if profile.helicopter:
                    profile.money += prize.price
                    text += f'\nУ вас есть уже это имущество, на ваш счет зачислено {humanize(prize.price)}$'
                else:
                    profile.helicopter = prize
            elif prize.slot == 'house':
                if profile.house:
                    profile.money += prize.price
                    text += f'\nУ вас есть уже это имущество, на ваш счет зачислено {humanize(prize.price)}$'
                else:
                    profile.house = prize
            elif prize.slot == 'apartment':
                if profile.apartment:
                    profile.money += prize.price
                    text += f'\nУ вас есть уже это имущество, на ваш счет зачислено {humanize(prize.price)}$'
                else:
                    profile.apartment = prize
            elif prize.slot == 'mobile':
                if profile.mobile:
                    profile.money += prize.price
                    text += f'\nУ вас есть уже это имущество, на ваш счет зачислено {humanize(prize.price)}$'
                else:
                    profile.mobile = prize
            elif prize.slot == 'yacht':
                if profile.yacht:
                    profile.money += prize.price
                    text += f'\nУ вас есть уже это имущество, на ваш счет зачислено {humanize(prize.price)}$'
                else:
                    profile.yacht = prize
        await db.update(profile)
        return await env.reply(text)    

    @plugin.on_text('уволиться')
    async def leave_job(msg,ats,env):
        profile = await get_or_create_profile(msg.from_id)
        if not profile.job:
            return await env.reply(f'вы нигде не работаете {plugin.negative}\nДля трудоустройства введите "работа"')
        profile.job = None
        await db.update(profile)
        return await env.reply(f'вы уволились со своей работы {plugin.negative}')   

    @plugin.on_startswith_text('работа')
    async def work(msg,ats,env):
        if 'работать' in msg.text.lower():
            return
        profile = await get_or_create_profile(msg.from_id)
        check = msg.text.split(' ')
        num = 1
        if len(check) < 2:
            shopcenters = list(await db.execute(jobs.select(jobs.type_name).where(profile.job_worked >= jobs.need_days).order_by(jobs.pay)))
            text = f"вы можете устроиться на одну из работ:\n"
            jobs_type = []
            jobs_user = {}
            for i in range(len(shopcenters)):
                if shopcenters[i].type_name in jobs_type:
                    continue
                text += f"🔹 {num_to_smile(num)}. {shopcenters[i].type_name}\n"
                num += 1
                jobs_type.append(shopcenters[i].type_name)
            plugin.jobs_user[msg.from_id] = jobs_type
            text += 'для просмотра списка профессий введите "работа [номер]"'
            plugin.is_active[msg.from_id] = 1
            return await env.reply(text)
        else:
            if msg.from_id not in plugin.is_active:
                return await env.reply('используйте команду \"работа\" для просмотра списка профессий')
            if plugin.is_active[msg.from_id] == 1 and int(check[1]) - 1 > len(plugin.jobs_user[msg.from_id]):
                return await env.reply('у вас недостаточно опыта работы, список доступных для вас работ - работа')
            if not check[1].isdigit():
                return await env.reply('Укажите номер желаемой категории.')
            numerate = 1
            if plugin.is_active[msg.from_id] == 1:
                user_jobs = []
                jobs_list = list(await db.execute(jobs.select().where(jobs.type_name == plugin.jobs_user[msg.from_id][int(check[1]) - 1]).order_by(jobs.pay)))
                vk_message = f'профессии ({plugin.jobs_user[msg.from_id][(int(check[1])-1)]}):\n'
                for i in range(len(jobs_list)):
                    if jobs_list[i].need_days > profile.job_worked:
                        continue
                    user_jobs.append(jobs_list[i])
                    vk_message += f'🔹 {num_to_smile(numerate)}. {jobs_list[i].name} - зарплата ~ {jobs_list[i].pay * 3}$\n'
                    numerate += 1
                plugin.user_jobs[msg.from_id] = user_jobs
                vk_message += 'для трудоустройства введите "работа [номер]"'
                plugin.is_active[msg.from_id] = 2
                return await env.reply(vk_message)
            if plugin.is_active[msg.from_id] == 2:
                if profile.job:
                    return await env.reply(f'вы уже трудоустроены в {profile.job.type_name} - {profile.job.name}\n💾Введите команду \"уволиться\"')
                if int(check[1]) - 1 > len(plugin.user_jobs[msg.from_id]):
                    return await env.reply('данная работа не найдена')
                profile.job = plugin.user_jobs[msg.from_id][int(check[1]) - 1]
                plugin.is_active.pop(msg.from_id)
                vk_message = f'вы устроились работать в {plugin.user_jobs[msg.from_id][int(check[1]) - 1].type_name} - {plugin.user_jobs[msg.from_id][int(check[1]) - 1].name}\n👔Введите команду \"работать\".'
                await db.update(profile)
                return await env.reply(vk_message)  

    @plugin.on_startswith_text('бизнесы')
    async def businesses(msg,ats,env):
        check = msg.text.split()
        if check[0].lower() != 'бизнесы':
            return
        profile = await get_or_create_profile(msg.from_id)
        check = msg.text.split(' ')
        shopcenters = list(await db.execute(business.select().order_by(business.price)))
        if len(check) < 2:
            text = f"бизнесы:\n"
            for i in range(len(shopcenters)):
                text += f"{'🔸' if profile.money < shopcenters[i].price else '🔹'} {i + 1}. {shopcenters[i].level1_name} - {humanize(shopcenters[i].price)}$\n&#12288;Прибыль: {humanize(shopcenters[i].pay)}\n"
            return await env.reply(text + f'\nДля покупки используйте \"Бизнесы [номер]\"')
        else:
            if not check[1].isdigit():
                return
            if profile.business1 and profile.business2 or profile.business2 and profile.business1:
                return await env.reply(f'у вас уже есть 2 бизнеса, введите "продать бизнес [номер]"')
            if profile.business1 and profile.business1_id == shopcenters[int(check[1]) - 1].id or profile.business2 and profile.business2_id == shopcenters[int(check[1]) - 1].id:
                return await env.reply('у вас уже есть этот бизнес')
            if not check[1].isdigit():
                return
            if int(check[1]) > len(shopcenters):
                return
            if int(profile.money) < shopcenters[int(check[1]) - 1].price:
                return await env.reply(f"у вас недостаточно средств {plugin.negative}")
            profile.money -= shopcenters[int(check[1]) - 1].price
            if profile.business1 and not profile.business2:
                profile.business2 = shopcenters[int(check[1]) - 1]
                profile.business2_run = datetime.datetime.now()
                profile.business2_works = 1
                profile.business2_level = 1
                profile.business2_money = 0
            else:
                profile.business1 = shopcenters[int(check[1]) - 1]
                profile.business1_run = datetime.datetime.now()
                profile.business1_works = 1
                profile.business1_level = 1
                profile.business1_money = 0
            await db.update(profile)
            return await env.reply(f"вы купили бизнес ({shopcenters[int(check[1]) - 1].level1_name}) за {humanize(shopcenters[int(check[1]) - 1].price)}$ {plugin.positive}\nЧтобы узнать статистику бизнесов, введите \"Бизнес [1-2]\"")
    @plugin.on_startswith_text('бизнес')
    async def business_menu(msg,ats,env):
        check1 = msg.text.split()
        if check1[0].lower() != "бизнес":
            return
        profile = await get_or_create_profile(msg.from_id)
        check = msg.text.split(' ')
        num = 1
        if not profile.business1 and not profile.business2 or not profile.business2 and not profile.business1:
            return await env.reply(f'у вас нет бизнеса, купить его можно в магазине')
        if len(check) < 2:
            if profile.business1 and not profile.business2 or profile.business2 and not profile.business1:
                business_name = await parse_business_name(msg.from_id, 1 if profile.business1 else 2)
                text = f"статистика \"{business_name}\":\n"
                if profile.business1:
                    pay = profile.business1.pay * profile.business1_works * 0.45
                    text += f"💸 Прибыль: {humanize(pay)}$/час\n"
                    if profile.business1_level == 1:
                        works = profile.business1.max_works
                    elif profile.business1_level == 2:
                        works = profile.business1.max_works * 5
                    else:
                        works = profile.business1.max_works * 5 * 3
                    text += f"💼 Рабочих: {profile.business1_works}/{works}\n"
                    a = time.time()
                    b = time.mktime(profile.business1_run.timetuple())
                    res = (a-b) // 3600
                    profile.business1_money += Decimal(pay * res) if (pay) * res != profile.last_bus1_pay  else 0
                    profile.last_bus1_pay = Decimal(pay * res)
                    await db.update(profile)
                    text += f"💰 На счёте: {humanize(profile.business1_money)}$\n"
                    if profile.business1_works < works:
                        text += "⚠ У вас работает недостаточно людей, от этого уменьшена прибыль. Введите \"Бизнес нанять 1 [кол-во]\""
                    if profile.business1_level < 3:
                        text += f"\n✅ Доступно улучшение! ({humanize(profile.business1.up_price * (profile.business1.level + 1) if profile.business1.level > 1 else profile.business1.up_price)}$)\nВведите \"Бизнес улучшить 1\" для улучшения бизнеса"
                    return await env.reply(text)
                else:
                    pay = profile.business2.pay * profile.business2_works * 0.45
                    text += f"💸 Прибыль: {humanize(pay)}$/час\n"
                    if profile.business2_level == 1:
                        works = profile.business2.max_works
                    elif profile.business2_level == 2:
                        works = profile.business2.max_works * 5
                    else:
                        works = profile.business2.max_works * 5 * 3
                    text += f"💼 Рабочих: {profile.business2_works}/{works}\n"
                    a = time.time()
                    b = time.mktime(profile.business2_run.timetuple())
                    res = (a-b) // 3600
                    profile.business2_money += Decimal(pay * res) if (pay) * res != profile.last_bus2_pay else 0
                    profile.last_bus2_pay = Decimal(pay * res)
                    await db.update(profile)
                    text += f"💰 На счёте: {humanize(profile.business2_money)}$\n"
                    if profile.business2_works < works:
                        text += "⚠ У вас работает недостаточно людей, от этого уменьшена прибыль. Введите \"Бизнес нанять 2 [кол-во]\""
                    if profile.business2_level < 3:
                        text += f"\n✅ Доступно улучшение! ({humanize(profile.business2.up_price * (profile.business2_level + 1) if profile.business2_level > 1 else profile.business2.up_price)}$)\nВведите \"Бизнес улучшить 2\" для улучшения бизнеса"
                    return await env.reply(text)
            else:
                text = "у вас в наличии 2 бизнеса.\nВведите \"Бизнес [1-2]\" для выбора одного из них:\n"
                business1_name = await parse_business_name(msg.from_id, 1)
                business2_name = await parse_business_name(msg.from_id, 2)
                smile1 = await parse_business_smile(msg.from_id, 1)
                smile2 = await parse_business_smile(msg.from_id, 2)
                text += f"1⃣. {smile1}{business1_name}\n2⃣. {smile2}{business2_name}"
                return await env.reply(text)
        else:
            if check[1].lower() == 'улучшить':
                if len(check) < 3:
                    return
                if not check[2].isdigit() or int(check[2]) > 2 or int(check[2]) < 1:
                    return
                if int(check[2]) == 2:
                    if not profile.business2:
                        return
                    if profile.business2_level >= 3:
                        return await env.reply('нет доступных улучшений')
                    price = profile.business2.up_price * (profile.business2_level + 1) if profile.business2_level > 1 else profile.business2.up_price
                    if profile.money < price:
                        return await env.reply('недостаточно средств')
                    profile.business2_level += 1
                    profile.money -= Decimal(price)
                    await db.update(profile)
                    business_name = await parse_business_name(msg.from_id, 2)
                    return await env.reply(f'вы улучшили свой бизнес до "{business_name}"')
                elif int(check[2]) == 1:
                    if not profile.business1:
                        return
                    if profile.business1_level >= 3:
                        return await env.reply('нет доступных улучшений')
                    price = profile.business1.up_price * (profile.business1_level + 1) if profile.business1_level > 1 else profile.business1.up_price
                    if profile.money < price:
                        return await env.reply('недостаточно средств')
                    profile.business1_level += 1
                    profile.money -= Decimal(price)
                    await db.update(profile)
                    business_name = await parse_business_name(msg.from_id, 1)
                    return await env.reply(f'вы улучшили свой бизнес до "{business_name}"')
            elif check[1].lower() == 'снять':
                if len(check) < 4:
                    return
                if not check[2].isdigit() or int(check[2]) > 2 or int(check[2]) < 1:
                    return
                if check[3].lower() == "всё" or check[3].lower() == "все":
                    amount = profile.business2_money if int(check[2]) == 2 else profile.business1_money
                    result = check[3].lower()
                else:
                    value = re.findall(r'\d+', check[3].lower())
                    text = re.sub(r'[^\w\s]+|[\d]+', r'',check[3].lower()).strip()
                    result = text_to_value(value[0], text)
                if int(result) < 1:
                    return await env.reply('число должно быть больше 0.')
                if int(check[2]) == 1:
                    if not profile.business1:
                        return
                    a = time.time()
                    b = time.mktime(profile.business1_run.timetuple())
                    res = (a-b) // 3600
                    if profile.business1_money < result:
                        return await env.reply('на счету бизнеса нет столько средств')
                    profile.business1_money -= Decimal(result)
                    profile.business1_run = datetime.datetime.now()
                    profile.money += Decimal(result)
                else:
                    if not profile.business2:
                        return
                    a = time.time()
                    b = time.mktime(profile.business2_run.timetuple())
                    res = (a-b) // 3600
                    if profile.business2_money < result:
                        return await env.reply('на счету бизнеса нет столько средств')
                    profile.business2_money -= Decimal(result)
                    profile.business2_run = datetime.datetime.now()
                    profile.money += Decimal(result)
                await db.update(profile)
                return await env.reply(f'вы сняли со счета бизнеса #{check[2]} {humanize(result)}$\n\n⚠Учтите, что при найме рабочих время работы бизнеса сбрасывается в связи с предотвращением абуза денег.')
            elif check[1].lower() == 'нанять':
                if len(check) < 4:
                    return
                if not check[2].isdigit() or int(check[2]) > 2 or int(check[2]) < 1:
                    return
                if not check[3].isdigit():
                    return
                if int(check[2]) == 2:
                    if not profile.business2:
                        return
                    if profile.business2_level == 1:
                        works = profile.business2.max_works
                    elif profile.business2_level == 2:
                        works = profile.business2.max_works * 5
                    else:
                        works = profile.business2.max_works * 5 * 3
                    if profile.business2_works >= works or profile.business2_works + int(check[3]) > works:
                        return await env.reply('достигнуто макс. кол-во рабочих или количество превышает максимума')
                    price = 5302 * int(check[3])
                    if profile.money < price:
                        return await env.reply(f'недостаточно средств (требуется {humanize(price)}$)')
                    profile.business2_works += int(check[3])
                    profile.money -= Decimal(price)
                    profile.business2_run = datetime.datetime.now()
                    await db.update(profile)
                    return await env.reply(f"вы наняли {plural_form(int(check[3]), ('рабочего', 'рабочих', 'рабочих'))}\n\n⚠Учтите, что при найме рабочих время работы бизнеса сбрасывается в связи с предотвращением абуза денег.")
                elif int(check[2]) == 1:
                    if not profile.business1:
                        return
                    if profile.business1_level == 1:
                        works = profile.business1.max_works
                    elif profile.business1_level == 2:
                        works = profile.business1.max_works * 5
                    else:
                        works = profile.business1.max_works * 5 * 3
                    if profile.business1_works >= works or profile.business1_works + int(check[3]) > works:
                        return await env.reply('достигнуто макс. кол-во рабочих или количество превышает максимума')
                    price = 5302 * int(check[3])
                    if profile.money < price:
                        return await env.reply(f'недостаточно средств (требуется {humanize(price)}$)')
                    profile.business1_works += int(check[3])
                    profile.money -= Decimal(price)
                    profile.business1_run = datetime.datetime.now()
                    await db.update(profile)
                    return await env.reply(f"вы наняли {plural_form(int(check[3]), ('рабочего', 'рабочих', 'рабочих'))}\n\n⚠Учтите, что при найме рабочих время работы бизнеса сбрасывается в связи с предотвращением абуза денег.")
            if int(check[1]) > 2 or int(check[1]) < 1:
                return
            if int(check[1]) == 1 and not profile.business1 or int(check[1]) == 2 and not profile.business2:
                return
            business_name = await parse_business_name(msg.from_id, int(check[1]))
            text = f"статистика \"{business_name}\":\n"
            if int(check[1]) == 1:
                pay = profile.business1.pay * profile.business1_works * 0.45
                text += f"💸 Прибыль: {humanize(pay)}$/час\n"
                if profile.business1_level == 1:
                    works = profile.business1.max_works
                elif profile.business1_level == 2:
                    works = profile.business1.max_works * 5
                else:
                    works = profile.business1.max_works * 5 * 3
                text += f"💼 Рабочих: {profile.business1_works}/{works}\n"
                a = time.time()
                b = time.mktime(profile.business1_run.timetuple())
                res = (a-b) // 3600
                profile.business1_money += Decimal(pay * res) if (pay) * res != profile.last_bus1_pay else 0
                profile.last_bus1_pay = Decimal(pay * res)
                await db.update(profile)
                text += f"💰 На счёте: {humanize(profile.business1_money)}$\n"
                if profile.business1_works < works:
                    text += "⚠ У вас работает недостаточно людей, от этого уменьшена прибыль. Введите \"Бизнес нанять 1 [кол-во]\""
                if profile.business1_level < 3:
                    text += f"\n✅ Доступно улучшение! ({humanize(profile.business1.up_price * (profile.business1_level + 1) if profile.business1_level > 1 else profile.business1.up_price)}$)\nВведите \"Бизнес улучшить 1\" для улучшения бизнеса"
                return await env.reply(text)
            else:
                pay = profile.business2.pay * profile.business2_works * 0.45
                text += f"💸 Прибыль: {humanize(pay)}$/час\n"
                if profile.business2_level == 1:
                    works = profile.business2.max_works
                elif profile.business2_level == 2:
                    works = profile.business2.max_works * 5
                else:
                    works = profile.business2.max_works * 5 * 3
                text += f"💼 Рабочих: {profile.business2_works}/{works}\n"
                a = time.time()
                b = time.mktime(profile.business2_run.timetuple())
                res = (a-b) // 3600
                profile.business2_money += Decimal(pay * res) if (pay) * res != profile.last_bus2_pay else 0
                profile.last_bus2_pay = Decimal(pay * res)
                await db.update(profile)
                text += f"💰 На счёте: {humanize(profile.business2_money)}$\n"
                if profile.business2_works < works:
                    text += "⚠ У вас работает недостаточно людей, от этого уменьшена прибыль. Введите \"Бизнес нанять 2 [кол-во]\""
                if profile.business2_level < 3:
                    text += f"\n✅ Доступно улучшение! ({humanize(profile.business2.up_price * (profile.business2_level + 1) if profile.business2_level > 1 else profile.business2.up_price)}$)\nВведите \"Бизнес улучшить 2\" для улучшения бизнеса"
                return await env.reply(text)
except:
    pass
