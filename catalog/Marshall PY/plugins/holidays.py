import time
import random
import lxml.html
from lxml import html
import aiohttp
from kutana import Plugin

plugin = Plugin(name="Holidays")
plugin.category = 'Инфо и прочее'
plugin.desc = {'праздники':[0, 'праздники сегодня']}
plugin.limit = {'праздники':6}

@plugin.on_text('праздники')
async def wiki_search(message,attachments,env):
    endpoint = f'http://kakoysegodnyaprazdnik.ru'
    async with aiohttp.ClientSession() as sess:
        async with sess.post(endpoint, data=None) as resp:
            response = await resp.text()
            tree = html.fromstring(response)
            holidays = tree.xpath('//span[@itemprop="text"]/text()')
            numbers = tree.xpath('//span[@class="super"]/text()')
            vk_message = 'праздники сегодня:\n'
            for num, i in enumerate(holidays[:5], start=0):
                vk_message += '• {} ({})\n'.format(i, numbers[num])
            return await env.reply(vk_message)
