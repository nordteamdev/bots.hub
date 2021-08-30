from kutana import Plugin
from kutana.database import *
from kutana.vksm import *
import peewee_async, peewee
import datetime, random, re
from decimal import *

plugin = Plugin(name="Azino777")

@plugin.on_startup()
async def on_startup(kutana, update):
    plugin.dict = {}
    plugin.min_bet = 50
    plugin.positive = random.choice(['😊','😉','😃','😋','😏','😄'])
    plugin.negative = random.choice(['😩','😰','😒','😔','😢'])
    plugin.tiles = {"🍑": (3, 1.25), "🍓": (2, 2), "🍒": (1, 2.5), "7⃣": (0.5, 10)}
    for k, v in plugin.tiles.items():
        plugin.tiles[k] = Decimal(str(v[0])), Decimal(str(v[1]))

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

def get_tile(add={}):
    total = sum(float(w) for w, _ in plugin.tiles.values())
    total += sum(float(w) for w in add.values())

    r = Decimal(str(random.uniform(0, total)))

    upto = 0
    for k, v in plugin.tiles.items():
        upto += v[0] + add.get(k, 0)
        if upto >= r: return k, v[1]

    assert False, "Getting tile failed"

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

@plugin.on_startswith_text('казино')
async def casino(msg,ats,env):
    p = await get_or_create_profile(msg.from_id)
    try:
        c, i = msg.text.split(" ")
    except:
        return
    if i:
        if i == 'все' or i == 'всё':
            bet = p.money
        else:
            try:
                value = re.findall(r'\d+', i)
                text = re.sub(r'[^\w\s]+|[\d]+', r'',i).strip()
                result = text_to_value(value[0], text)
            except:
                return await env.reply('Что-то пошло не так.')
        bet = p.money if i == "все" or i == "всё" else Decimal(result)

        if bet < plugin.min_bet:
            return await env.reply(f"минимальная ставка -- {humanize(plugin.min_bet)}$")

        if p.money - bet < 0:
            return await env.reply(f"недостаточно средств {plugin.negative}\n💰 Ваш баланс: {humanize(p.money)}$")

        text = ""
        resu = []
        add = {}
        for i in range(3):
            resu.append(get_tile(add))
            add[resu[-1][0]] = add.get(resu[-1][0], 0) + 9 - 5 * i
        text += f"Комбинация: [{resu[0][0]} | {resu[1][0]} | {resu[2][0]}]\n"
        if resu[0][0] == resu[1][0] == resu[2][0]:
            p.money -= bet
            p.money += bet * resu[1][1]
            text += f"{f'Вы выиграли: {humanize(int(bet * resu[1][1]) - int(bet))}$ (множитель: x{resu[2][1] - 1}) {plugin.positive}' if bet * resu[1][1] > 0 else f'Вы попали на бомбу: {humanize(bet * resu[1][1])}$ {plugin.negative}'}\n"
        else:
            p.money -= bet
            text += f"Вы проиграли {humanize(bet)}$ {plugin.negative}\n"
        text += f"Баланс: {humanize(p.money)}$"
        await db.update(p)

        return await env.request('messages.send', peer_id=msg.peer_id, message=text)