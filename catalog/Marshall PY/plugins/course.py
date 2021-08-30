from kutana import Plugin
import aiohttp, json
from kutana.vksm import *

plugin = Plugin()
async def get_rate(to):
    async with aiohttp.ClientSession() as sess:
        async with sess.get(f"https://www.cbr-xml-daily.ru/daily_json.js") as resp:
            try:
                data = await resp.text()
                res = json.loads(data)
                return res['Valute'][to]['Value']
            except (KeyError, IndexError):
                raise ValueError('Курса данной валюты не найдено')

async def get_btc():
    async with aiohttp.ClientSession() as sess:
        async with sess.get(f"https://blockchain.info/ru/ticker") as resp:
            res = await resp.json()
            return toFixed(res['RUB']['sell'], 2), toFixed(res['USD']['sell'], 2)

def toFixed(f: float, n=0):
    a, b = str(f).split('.')
    return '{}.{}{}'.format(a, b[:n], '0'*(n-len(b)))

@plugin.on_startswith_text("курс")
async def course(message, attachments, env):
    data = []
    for cur in ('USD', 'EUR'):
        data.append(await get_rate(cur))
    usd, eur = data
    btc = await get_btc()
    vk_message = 'курс валют на данный момент:\n'
    vk_message += f'💵 Доллар США: {toFixed(usd,2)}₽\n💶 Евро: {toFixed(eur,2)}₽\n💸 Биткоин: {btc[1]}$ или {btc[0]}₽'
    return await env.reply(vk_message)
