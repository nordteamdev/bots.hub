from kutana import Plugin,VKController
import random, asyncio, aiohttp, json
plugin = Plugin(name="randompost")
plugin.category = 'Картинки'
plugin.category_desc = 'Присылает в чат случайные картинки определенной тематики'
plugin.desc = {"мемы":[0,0], 'няша':[0,0], 'цензура':[0,0]}

commgroups = {"мемы": "-45745333","няша": "-118445684","цензура":"-137905638"}
plugin.limit = {'посоветуй аниме':8, 'мемы':5, 'няша':5, 'цензура':5}
async def get_posts(group_id, count, offset):
    async with VKController('f68c8bdf80628aff5e02739338f8c8fd948b6c05dd7b89f731739819c30137e5508ca323f34789c01d155') as group:
        result = await group.raw_request('wall.get', count=count, offset=offset, owner_id=group_id)
        return result.response

@plugin.on_text(*commgroups)
async def on_post(message,attachments,env):
    group_id = commgroups[message.text.lower()]
    smiles = ['😔', '😭', '😩', '😠', '😟', '🙁']
    vk_message, attachments = "", ""
    data1 = await get_posts(group_id, 100, 0)
    if not data1:
        return await env.reply("я не могу получить посты " + str(random.choice(smiles)))
    data = data1
    posts = data["items"]
    count = data["count"]
    if count < 1 or len(posts) < 1:
        return await env.reply("не найдено ни одного поста " + str(random.choice(smiles)))
    for _ in range(10):
        if count > 100:
            data = await get_posts(group_id,100, int(random.random() * (count - 90)))
            posts = data['items']
        random.shuffle(posts)
        for i in posts:
            if i.get("marked_as_ads") or i.get("post_type") == "copy":
                continue
            if i.get("text"):
                if any(bad in i["text"] for bad in ("vk.com/", "vk.cc/", " подпишись ", "www.", "http://", "https://", '.com', '.net', '.ru')):
                    continue
                vk_message = i["text"]
            for a in i.get("attachments", []):
                if a["type"] in ("photo", "video", "audio", "doc"):
                    atta = a[a["type"]]
                    attachments += a["type"] + str(atta["owner_id"]) + "_" + str(atta["id"])
                    if "access_key" in atta:
                        attachments += "_" + atta["access_key"]
                    attachments += ","
            if vk_message or attachments:
                return await env.reply(vk_message, attachment=attachments)
    return await env.reply("не найдено ни одного поста " + str(random.choice(smiles)))

@plugin.on_text("посоветуй аниме")
async def shikimoro_parse(message,attachments,env):
    endpoint = 'https://shikimori.org/api/animes/'
    async with aiohttp.ClientSession() as sess:
        async with sess.get(endpoint + str(random.randint(1,3000))) as resp:
            res = await resp.json()
            if 'Страница не найдена' in res:
                return await env.reply('cейчас я не знаю, что тебе посоветовать ' + str(random.choice(['😔', '😭', '😩', '😠', '😟', '🙁'])))
            description = res.get('description')
            g = ''
            if res.get('genres'):
                for genre in res['genres']:
                    g += '#{} '.format(genre['russian'].lower())
            link = ""
            player = ""
            if res.get('url'):
                url = f"play.shikimori.org{res['url']}/video_online/1"
                link = await env.request("utils.getShortLink", url=url)
                player = link.response['short_url']
            nl = '\n'
            vk_message = f"""{res['name']} [{res['russian']}]{nl + nl + description + nl if not description is None else ''}
Рейтинг: {res['score']}/10
{f'Ссылка: {player}{nl}{g}' if link else g}"""
            async with aiohttp.ClientSession() as sess:
                async with sess.get('https://shikimori.org' + str(res['image']['original'])) as resp:
                    image2 = await resp.read()
                    if image2 is None:
                        return await env.reply('что-то пошло не так')
                    attach = await env.upload_photo(image2)
    return await env.reply(vk_message, attachment=(attach))
