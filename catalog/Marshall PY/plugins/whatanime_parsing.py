from kutana import Plugin
import aiohttp, asyncio
import requests, random, datetime, time
import base64
from kutana.database import *
plugin = Plugin(name="WhatAnime")
plugin.category = 'Инфо и прочее'
plugin.limit = {'что за аниме':6}
plugin.desc = {'что за аниме': ['{картинка}','поиск аниме по базе данных, ориентируюясь на картинку']}
async def parse_whatanime_ga(token, image):
    endpoint="https://whatanime.ga/api/search"
    form = aiohttp.FormData()
    form.add_field('image', image, content_transfer_encoding='base64')
    async with aiohttp.ClientSession() as sess:
        async with sess.post(endpoint, data=form, params={'token':token}) as resp:
            r = await resp.json()
            if 'status_code' in r:
                if r['status_code']==403:
                    raise Exception("API token invalid")
                elif r['status_code']==401:
                    raise Exception("API token missing")
                elif r['status_code']==413:
                    raise Exception("The image is too large, please reduce the image size to below 1MB")
                elif r['status_code']==429:
                    raise Exception("You have exceeded your quota. Please wait and try again soon.")
                elif r['status_code']==200:
                    return r
            else:
                return r



@plugin.on_text('что за аниме')
async def on_message(message, attachments, env):
    if await get_or_none(user_info, user_info.user_id==message.from_id, user_info.status < 1):
        return await env.reply('данная команда доступна с VIP+ статуса\nЧтобы узнать все возможности донат-статусов, введите "донат".')
    token = '12adf25ed3f39d9b599c16462b661addfbf59d9b'
    image = None
    smiles = ['😔', '😭', '😩', '😠', '😟', '🙁']
    try:
        photo_url = attachments[0].link
        if not photo_url:
            return await env.reply('вы не приложили фотку вместе с данной командой ' + str(random.choice(smiles)))
    except:
        return await env.reply('вы не приложили фотку вместе с данной командой ' + str(random.choice(smiles)))
    async with aiohttp.ClientSession() as sess:
        async with sess.get(photo_url) as resp:
            image = await resp.read()
            if not image:
                return await env.reply('что-то пошло не так ')
    parse_result = await parse_whatanime_ga(token, image)
    vk_message = ''
    vk_message += f'''{"🔞" if parse_result['docs'][0]['is_adult'] is True else ""}{parse_result['docs'][0]['title_english']} [{parse_result['docs'][0]['title']}]
эпизод: {parse_result['docs'][0]['episode']} [{parse_result['docs'][0]['season']}]
время: {time.strftime("%H:%M:%S", time.localtime(int(parse_result['docs'][0]['at'])))}
шанс попадания: {round((parse_result['docs'][0]['similarity'] * 100), 2)}%
кадр с данного аниме:
'''
    attach_url = f"https://whatanime.ga/thumbnail.php?anilist_id={parse_result['docs'][0]['anilist_id']}&file={parse_result['docs'][0]['filename']}&t={parse_result['docs'][0]['at']}&token={parse_result['docs'][0]['tokenthumb']}"
    async with aiohttp.ClientSession() as sess:
        async with sess.get(attach_url) as resp:
            image2 = await resp.read()
            if image2 is None:
                return await env.reply('что-то пошло не так :c\n' + str(random.choice(answers)))
            attach = await env.upload_photo(image2)
    return await env.reply(vk_message, attachment=(attach))

