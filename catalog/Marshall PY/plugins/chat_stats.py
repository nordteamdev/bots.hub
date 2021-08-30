from kutana import Plugin
import peewee_async, peewee, datetime, time
from kutana.database import *
from kutana.vksm import *

plugin = Plugin(name="Chat statistic", priority=600)
@plugin.on_startup()
async def on_startup(kutana, update):
    plugin.dict = {}
    class chat_stats_vlad(BaseModel):
        chat_id = peewee.IntegerField(default=0)
        messages = peewee.BigIntegerField(default=0)
        clear_messages = peewee.BigIntegerField(default=0)
        clear_symbols = peewee.BigIntegerField(default=0)
        symbols = peewee.BigIntegerField(default=0)
        voice_messages = peewee.BigIntegerField(default=0)
        resend_messages = peewee.BigIntegerField(default=0)
        photos = peewee.BigIntegerField(default=0)
        chat_title = peewee.TextField(default="")
        videos = peewee.BigIntegerField(default=0)
        audios = peewee.BigIntegerField(default=0)
        docs = peewee.BigIntegerField(default=0)
        posts = peewee.BigIntegerField(default=0)
        stickers = peewee.BigIntegerField(default=0)
        mentios = peewee.BigIntegerField(default=0)
        links = peewee.BigIntegerField(default=0)
        leaved = peewee.BigIntegerField(default=0)
        messages_with_sw = peewee.BigIntegerField(default=0)
        last_user_id = peewee.IntegerField(default=0)
    class user_stats_vlad(BaseModel):
        user_id = peewee.IntegerField(default=0)
        chat_id = peewee.IntegerField(default=0)
        last_message_date = peewee.DateTimeField(default=datetime.datetime.now())
        nl_messages = peewee.BigIntegerField(default=0)
        symbols = peewee.BigIntegerField(default=0)
        clear_messages = peewee.BigIntegerField(default=0)
        clear_symbols = peewee.BigIntegerField(default=0)
        messages = peewee.BigIntegerField(default=0)
        messages_with_sw = peewee.BigIntegerField(default=0)
        lvl = peewee.IntegerField(default=1)
        remain_msgs = peewee.BigIntegerField(default=0) 

    user_stats_vlad.create_table(True)
    chat_stats_vlad.create_table(True)   

    plugin.dict['models'] = chat_stats_vlad, user_stats_vlad

def get_level(last_level):
    result = round(100 * 1.3 ** last_level)
    return result

@plugin.on_has_text()
async def disassembly_message(message, attachments, env):
    chat_stats, user_stats = plugin.dict['models']
    if int(message.peer_id) < 2000000000:
        return "GOON"
    chat_id = int(message.peer_id) - int(2000000000)
    test = 0
    u, _ = await db.get_or_create(user_stats, chat_id=chat_id, user_id = message.from_id)
    r, c = await db.get_or_create(chat_stats, chat_id=chat_id)
    u.last_message_date = datetime.datetime.now()
    r.messages += 1
    u.messages += 1
    if r.last_user_id == message.from_id:
        u.nl_messages += 1
    r.last_user_id = message.from_id
    r.symbols += len(message.text)
    u.symbols += len(message.text)
    if message.raw_update['object'].get('action', 0) != 0 and message.raw_update['object']['action']['type'] == 'chat_kick_user':
        r.leaved += 1
    async def check(ats, test):
        for at in ats:
            if at.type == 'photo':
                r.photos += 1
                test += 1
            if at.type == 'video':
                r.videos += 1
                test += 1
            if at.type == 'audio':
                r.audios += 1
                test += 1
            if at.type == 'doc':
                if at.raw_attachment['doc']['ext'] == 'ogg':
                    r.voice_messages += 1
                    test += 1
                else:
                    test += 1
                    r.docs += 1
            if at.type == 'wall':
                test += 1
                r.posts += 1
            if at.type == 'sticker':
                test += 1
                r.stickers += 1
            return test
    if attachments:
        data = await check(attachments, test)
        test += data if data else 0

    if message.raw_update['object']['fwd_messages']:
        r.resend_messages += 1
        test += 1

    if message.text.startswith('[id') or message.text.startswith('[club'):
        r.mentios += 1
        test += 1

    links_check = ['.com','.ru','.net', '.tg', '.pl','.xyz','.pw','https','http','.cl','.ml','.io','.gl','.bet','.pe', '.tk', '.ly']
    for x in links_check:
        if str(message.text).find(x) != -1:
            r.links += 1
            test += 1
            break

    sw = ['бля', 'сука', 'suka', 'пиздец', 'пздц', 'ска', 'ля', 'blya', 'pidor', 'пидор', 'нах', 'еба', 'хуй', 'пизда', 'pizda', 'соси', 'уеб', 'ганд', 'хуес', 'шлюх']
    for z in sw:
        if str(message.text).find(z) != -1:
            r.messages_with_sw += 1
            u.messages_with_sw += 1
            test += 1
            break
    if test == 0:
        r.clear_messages += 1
        r.clear_symbols += len(message.text)
        u.clear_symbols += len(message.text)
        u.clear_messages += 1
    need_messages = get_level(u.lvl)
    if u.messages >= need_messages:
        u.lvl += 1
    await db.update(r)
    await db.update(u)
    return "GOON"
    