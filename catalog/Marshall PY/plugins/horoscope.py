import time
import random
import lxml.html
from lxml import html
import aiohttp
from kutana import Plugin

plugin = Plugin(name="Astrology")
plugin.category = 'Инфо и прочее'
plugin.desc = {'гороскоп': ['{знак зодиака}', 'гороскоп на текущий день для *знак зодиака*, указывая баллы (богатство, здоровье, бизнес)']}
@plugin.on_startswith_text("гороскоп")
async def on_message(message, attachments, env):
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
    links = {"телец": "https://horo.mail.ru/prediction/taurus/today/",
        "овен": "https://horo.mail.ru/prediction/aries/today/",
        "близнецы": "https://horo.mail.ru/prediction/gemini/today/",
        "рак": "https://horo.mail.ru/prediction/cancer/today/",
        "лев": "https://horo.mail.ru/prediction/leo/today/",
        "дева": "https://horo.mail.ru/prediction/virgo/today/",
        "весы": "https://horo.mail.ru/prediction/libra/today/",
        "скорпион": "https://horo.mail.ru/prediction/scorpio/today/",
        "стрелец": "https://horo.mail.ru/prediction/sagittarius/today/",
        "козерог": "https://horo.mail.ru/prediction/capricorn/today/",
        "водолей": "https://horo.mail.ru/prediction/aquarius/today/",
        "рыбы": "https://horo.mail.ru/prediction/pisces/today/"}
    args = env.body
    smiles = ['😔', '😭', '😩', '😠', '😟', '🙁']
    if not args:
        return await env.reply(f'вы не указали свой знак зодиака {random.choice(smiles)}')
    category = args.strip().lower()
    if category in links:
        url = links[category] 
    else:
        return await env.reply(f'вы указали неверный знак зодиака {random.choice(smiles)}')
    async with aiohttp.ClientSession() as sess:
        async with sess.post(url, data=None) as resp:
            response = await resp.text()
            tree = html.fromstring(response)
            title = tree.xpath('//meta[@property="og:title"]/@content')
            text = tree.xpath('//div[@class="article__item article__item_alignment_left article__item_html"]/p/text()')
            values = tree.xpath('//span[@class="p-score-day__item__value__inner"]/text()')
            message = title[0] + '.\n\n'
            message += text[0] + '\n\n'
            message += f'💰: {num_to_smile(int(values[0]))} | ❤: {num_to_smile(int(values[1]))} | 🏥: {num_to_smile(int(values[2]))}'
            return await env.reply(message)