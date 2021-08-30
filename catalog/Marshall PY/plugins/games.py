import datetime, random, time
from kutana.vksm import *
from kutana import Plugin
from kutana.database import *
import aiohttp, json, re, xmltodict
plugin = Plugin(name="other")
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

async def get_diff(a, b):
    if a < b:
        return int(((b-a)/a) * 100)
    elif a > b:
        return int(((a-b)/a) * 100)
    elif a == b:
        return 0

@plugin.on_startup()
async def on_startup(kutana, update):
    plugin.dict = {}
    plugin.min_bet = 50
    plugin.positive = random.choice(['😊','😉','😃','😋','😏','😄'])
    plugin.negative = random.choice(['😩','😰','😒','😔','😢'])
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
    return int(value)

def humanize(value):
    return "{:,}".format(round(value)).replace(",",".")

@plugin.on_startswith_text('шар')
async def shar(msg,ats,env):
    if not env.body:
        return
    answers2 = '''Абсолютно точно!
Да.
Нет.
Бесспорно.
Никаких сомнений.
Определённо да.
Пока не ясно, попробуй снова.
Предрешено.
Скорее да, чем нет.
Сконцентрируйся и спроси опять.
Не уверен...
Сейчас нельзя предсказать.
Однозначно нет!
Можешь быть уверен в этом.
Перспективы не очень хорошие.
А как же иначе?.
Знаки говорят — «да».
Не знаю.
Мой ответ — «нет».
Весьма сомнительно.
Ну может быть.
Приличный вопрос задай :c
Не могу дать точный ответ.
'''.splitlines()
    return await env.reply("🔮" + random.choice(answers2).lower())

@plugin.on_startswith_text('переверни')
async def invert(msg,ats,env):
    flipTable = {
'a' : '\u0250',
'b' : 'q',
'c' : '\u0254',
'd' : 'p',
'e': '\u01DD',
'f': '\u025F',
'g' : '\u0183',
'h' : '\u0265',
'i' : '\u0131',
'j' : '\u027E',
'k' : '\u029E',
'l' : '\u0283',
'm' : '\u026F',
'n' : 'u',
'r' : '\u0279',
't' : '\u0287',
'v' : '\u028C',
'w' : '\u028D',
'y' : '\u028E',
'.' : '\u02D9',
'[' : ']',
'(' : ')',
'{' : '}',
'?' : '\u00BF',
'!' : '\u00A1',
"\'" : ',',
'<' : '>',
'_' : '\u203E',
'\u203F' : '\u2040',
'\u2045' : '\u2046',
'\u2234' : '\u2235',
'\r' : '\n',
'а' : 'ɐ',
'б' : 'ƍ',
'в' : 'ʚ',
'г' : 'ɹ',
'д' : 'ɓ',
'е' : 'ǝ',
'ё' : 'ǝ',
'ж' : 'ж',
'з' : 'ε',
'и' : 'и',
'й' : 'ņ',
'к' : 'ʞ',
'л' : 'v',
'м' : 'w',
'н' : 'н',
'о' : 'о',
'п' : 'u',
'р' : 'd',
'с' : 'ɔ',
'т' : 'ɯ',
'у' : 'ʎ',
'ф' : 'ф',
'х' : 'х',
'ц' : 'ǹ',
'ч' : 'Һ',
'ш' : 'm',
'щ' : 'm',
'ъ' : 'q',
'ы' : 'ıq',
'ь' : 'q',
'э' : 'є',
'ю' : 'oı',
'я' : 'ʁ'
}
    if not env.body:
        return
    result = ""
    for word in env.body:
        result += flipTable.get(word, word)
    return await env.reply(result)

@plugin.on_startswith_text('инфа','шанс','вероятность')
async def info(msg,ats,env):
    if not env.body:
        return
    answers2 = '''17e^3pi/-e%*6,0(3)... Я тут прикинул
Хуерятность
Ровно
Примерно
Звезды говорят, что вероятность
Почти
Наверное
'''.splitlines()
    num = random.randint(1, 100)
    return await env.reply(f"{random.choice(answers2)} {str(num)}%")

@plugin.on_text('анекдот')
async def joke(msg,ats,env):
    async with aiohttp.ClientSession() as sess:
        async with sess.get(f"http://nextjoke.net/Api/GetJoke?format=JSONP&ratingMin=100&NOCACHE={time.time()}") as resp:
            html = await resp.text()
            try:
                html = json.loads(html.replace("window.JokeWidget.parseResponse(", "", 1)[:-2])["text"]
            except:
                return await env.reply("Сегодня без шуток ;(")

            html = re.sub("(\n|^| )-([A-Za-zА-Яа-я])", "- \\2", html)

    return await env.reply(html.replace("\r", ""))

@plugin.on_text('онлайн')
async def members(msg,ats,env):
    if msg.peer_id > 2000000000:
        all_users = await env.request('messages.getConversationMembers', peer_id=msg.peer_id, fields='online')

        text = ""
        x = 0
        numerate = 1
        if not all_users.response:
            return await env.reply('назначьте меня администратором и попробуйте еще раз.')
        for user in all_users.response['profiles']:
            if 'online' in user and user['online'] == 1:
                name = await parse_user_name(env, user['id'])
                text += f"{numerate}. [id{user['id']}|{name}]\n"
                numerate += 1
                x += 1

        plural = plural_form(x, ('пользователя', 'пользователи', 'пользователей'), need_n=True)
        await env.reply(f'онлайн пользователи ({x} из {all_users.response["count"]}):\n' + text)

    else:
        await env.reply("эту команду можно использовать только в беседе.")

@plugin.on_startswith_text('дата')
async def datareg(msg,ats,env):
    async with aiohttp.ClientSession() as sess:
        data = await parse_user_id(msg, env)
        check = 0
        if not data:
            data = msg.from_id
            check = 1
        url = f"http://vk.com/foaf.php?id={data[0] if check == 0 else data}"
        async with sess.get(url) as resp:
            xml = xmltodict.parse(await resp.text())
            items = xml["rdf:RDF"]["foaf:Person"]
            item = items
            reg = item["ya:created"]
            res = reg["@dc:date"].split("T")[0]
            year = res.split("-")[0]
            mounth = res.split("-")[1].replace("01", "января").replace("02", "февраля").replace("03", "марта").replace( "04","апреля").replace( "05","мая").replace( "06", "июня").replace( "07", "июля").replace( "08", "августа").replace( "09", "сентября").replace("10","октября").replace("11","ноября").replace("12","декабря")
            day = res.split("-")[2]
            await env.reply(f'{item["foaf:name"]}\n'
                f'🚀 Дата регистрации: {day} {mounth} {year} года')

@plugin.on_startswith_text('трейд')
async def trade(msg,ats,env):
    if not env.body:
        return await env.reply(f'"Бинарный опцион"\n• Суть игры: Бинарный опцион используется для получения прибыли на движениях цены активов (в нашем случае валют) на мировых финансовых рынках. Пользователь делает прогноз как изменится цена его актива.\n• Помощь: Для того, чтобы начать игру, введите \"трейд [прогноз (вверх/вниз)] [ставка]\"')
    try:
        forecast, bet = env.body.split(" ")
    except Exception as e:
        return await env.reply(f"Недостаточно аргументов.\nДля того, чтобы начать игру, введите \"трейд [прогноз (вверх/вниз)] [ставка]\"")
    if not forecast.lower() in ('вверх','вниз'):
        return
    p = await get_or_create_profile(msg.from_id)
    try:
        value = re.findall(r'\d+', bet)
        text = re.sub(r'[^\w\s]+|[\d]+', r'',bet).strip()
        result = text_to_value(value[0], text)
    except:
        return await env.reply('Что-то пошло не так.')
    if int(result) > p.money:
        return await env.reply("Недостаточно средств на счету.")
    if int(result) < 50:
        return await env.reply('минимальная ставка - 50$')
    course_money = 100
    res = course_money + random.randint(-50, 50)
    data = await get_diff(res, course_money)
    p.money -= int(result)
    if forecast == "вверх" and res >= course_money or forecast == "вниз" and res <= course_money:
        p.money += int(result) + int(result)
    vk_message = f'курс акции {"подорожал⤴" if res >= course_money else "подешевел⤵"} на {data}$\n{"✔ Вы получили" if forecast == "вверх" and res >= course_money or forecast == "вниз" and res <= course_money else "❌ Вы потеряли"}: {humanize(int(result))}$\n💰 | Ваш баланс: {humanize(p.money)}$\n'
    await db.update(p)
    return await env.reply(vk_message)

@plugin.on_startswith_text('кубик')
async def cube(msg,ats,env):
    if not env.body or not env.body.isdigit():
        return await env.reply('для игры в кубик используйте команду "Кубик [1-6]"')
    bot_choice = random.randint(1,6)
    if int(env.body) == int(bot_choice):
        money = random.randint(2000, 10000)
        p = await get_or_create_profile(msg.from_id)
        p.money += money
        await db.update(p)
        return await env.reply(f'вы угадали! Приз {humanize(money)}$ {plugin.positive}')
    else:
        return await env.reply(f'вы не угадали {plugin.negative}\n🎲 Выпало число {bot_choice}')

@plugin.on_startswith_text('стаканчик')
async def stakan(msg,ats,env):
    if not env.body:
        return await env.reply('для игры в стаканчик используйте команду "Стаканчик [1-3] [сумма]"')
    try:
        choice, bet = env.body.split(" ")
        if not choice.isdigit() or int(choice) > 3 or int(choice) < 1:
            raise ValueError
    except Exception as e:
        return await env.reply('для игры в стаканчик используйте команду "Стаканчик [1-3] [сумма]"')
    try:
        value = re.findall(r'\d+', bet)
        text = re.sub(r'[^\w\s]+|[\d]+', r'',bet).strip()
        result = text_to_value(value[0], text)
    except:
        return await env.reply('Что-то пошло не так.')
    p = await get_or_create_profile(msg.from_id)
    if int(result) > p.money:
        return await env.reply("Недостаточно средств на счету.")
    if int(result) < 50:
        return await env.reply('минимальная ставка - 50$')
    bot_choice = random.randint(1,3)
    if int(choice) == int(bot_choice):
        money = random.randint(100,2000)
        p.money += Decimal(int(result) + int(money)) 
        await db.update(p)
        return await env.reply(f'вы угадали! Приз {humanize(int(result) + int(money))}$ {plugin.positive}')
    else:
        p.money -= Decimal(result)
        await db.update(p)
        return await env.reply(f'вы не угадали, это был {bot_choice} стаканчик {plugin.negative}')