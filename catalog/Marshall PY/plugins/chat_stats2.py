from kutana import Plugin
import peewee_async, peewee, datetime, time, asyncio
from kutana.database import *
import traceback
from kutana.vksm import *

plugin = Plugin(category="Статистика")
plugin.desc = {'юзер стат': ['(имя)', 'считaет вcю cтaтистику пользователя - количествo соoбщeний, символов, матов и его рейтинг в топе'],
'стата чата': [0, 'аналогично команде юзер стат, только для чата'],
'топ бесед': [0, 'пoказывaет топ бeсeд (по cообщениям), в которых пpисутствует бoт'],
'актив': [0, 'пoказываeт ктo и кoгдa поcлeдний pаз что-тo пиcaл в чатe']}
plugin.category_desc = 'Считaeт всю статистику бeceды - кoличеcтво cоoбщений, символов, cтикeров, прикреплeний, голocoвыx cooбщeний, иcпoльзованных кoманд - кaк для пoльзoвaтеля, тaк и для всeгo чата, и пoкaзывает эту информацию'
class chat_stats_vlad(BaseModel):
    chat_id = peewee.IntegerField(default=0)
    messages = peewee.BigIntegerField(default=0)
    clear_messages = peewee.BigIntegerField(default=0)
    clear_symbols = peewee.BigIntegerField(default=0)
    symbols = peewee.BigIntegerField(default=0)
    voice_messages = peewee.BigIntegerField(default=0)
    resend_messages = peewee.BigIntegerField(default=0)
    photos = peewee.BigIntegerField(default=0)
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
    last_message_date = peewee.DateTimeField(default=datetime.datetime.now())
    chat_id = peewee.IntegerField(default=0)
    nl_messages = peewee.BigIntegerField(default=0)
    symbols = peewee.BigIntegerField(default=0)
    clear_messages = peewee.BigIntegerField(default=0)
    clear_symbols = peewee.BigIntegerField(default=0)
    messages = peewee.BigIntegerField(default=0)
    messages_with_sw = peewee.BigIntegerField(default=0)
    lvl = peewee.IntegerField(default=1)
    remain_msgs = peewee.BigIntegerField(default=0)

plugin.db1 = chat_stats_vlad
plugin.db2 = user_stats_vlad

def get_level(last_level):
    result = round(100 * 1.3 ** last_level)
    return result

def textify_value(value):
    avalue = abs(value)

    if avalue >= 1000000000000:
        return str(round(value / 1000000000000, 2)) + "T"

    if avalue >= 1000000000:
        return str(round(value / 1000000000, 2)) + "B"

    if avalue >= 1000000:
        return str(round(value / 1000000, 2)) + "M"

    if avalue >= 100000:
        return  str(value // 1000) + "k"

    if avalue >= 1000:
        return str(value)
    return str(value) 

async def seconds(total_seconds):
    s = int(total_seconds)
    years = s // 31104000
    if years > 1:
        return '%d г.' % years
    s = s - (years * 31104000)
    months = s // 2592000
    if years == 1:
        r = '1 г.'
        if months > 0:
            r += ' %d м.' % months
        return r
    if months > 1:
        return '%d м.' % months
    s = s - (months * 2592000)
    days = s // 86400
    if months == 1:
        r = '1 м.'
        if days > 0:
            r += ' %d дн.' % days
        return r
    if days > 1:
        return '%d дн.' % days
    s = s - (days * 86400)
    hours = s // 3600
    if days == 1:
        r = '1 дн.'
        if hours > 0:
            r += ' %d ч.' % hours
        return r 
    s = s - (hours * 3600)
    minutes = s // 60
    seconds = s - (minutes * 60)
    if hours >= 6:
        return '%d ч.' % hours
    if hours >= 1:
        r = '%d ч.' % hours
        if hours == 1:
            r = '1 ч.'
        if minutes > 0:
            r += ' %d мин.' % minutes
        return r
    if minutes == 1:
        r = '1 мин.'
        if seconds > 0:
            r += ' %d сек.' % seconds
        return r
    if minutes == 0:
        return '%d сек.' % seconds
    if seconds == 0:
        return '%d мин.' % minutes
    return '%d мин. %d сек.' % (minutes, seconds)

@plugin.on_text('стата чата')
async def chat_stats(message,attachments,env):
    if int(message.peer_id) < 2000000000:
        return
    chat_stats, user_stats = plugin.db1, plugin.db2
    chat_id = int(message.peer_id) - int(2000000000)
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
    text = ""
    r, c = await db.get_or_create(chat_stats, chat_id=chat_id)
    if r.messages > 0:
        text += f"📧 Сообщений: {textify_value(r.messages)} ({textify_value(r.clear_messages)} чистых)\n"
    if r.symbols > 0:
        text += f"🔣 Символов: {textify_value(r.symbols)} ({textify_value(r.clear_symbols)})\n"
    if r.voice_messages > 0:
        text += f"🎵 Голосовых: {textify_value(r.voice_messages)}\n"
    if r.resend_messages > 0:
        text += f"📩 Пересланных: {textify_value(r.resend_messages)}\n"
    if r.photos > 0:
        text += f"📷 Фото: {textify_value(r.photos)}\n"
    if r.videos > 0:
        text += f"📹 Видео: {textify_value(r.videos)}\n"
    if r.audios > 0:
        text += f"🎧 Аудио: {textify_value(r.audios)}\n"
    if r.docs > 0:
        text += f"📑 Документов: {textify_value(r.docs)}\n"
    if r.posts > 0:
        text += f"📣 Постов: {textify_value(r.posts)}\n"
    if r.stickers > 0:
        text += f"😜 Стикеров: {textify_value(r.stickers)}\n"
    if r.mentios > 0:
        text += f"💬 Упоминаний: {textify_value(r.mentios)}\n"
    if r.links > 0:
        text += f"📡 Ссылок: {textify_value(r.links)}\n"
    if r.leaved > 0:
        text += f"🚪 Покинули чат: {textify_value(r.leaved)}\n"
    if r.messages_with_sw > 0:
        text += f"👺 Сообщений с матами: {textify_value(r.messages_with_sw)}\n"
    if not text:
        return await env.reply('ошибка получения данных.')
    text += "статистика пользователей чата:\n"
    top = await db.execute(user_stats.select().where(user_stats.chat_id == chat_id).order_by((user_stats.messages).desc()))
    raiting = {}
    cur = 1
    for p in top:
        if int(p.user_id) < 0:
            continue
        if p.user_id not in raiting:
            raiting[p.user_id] = p.messages
        else:
            raiting[p.user_id] += p.messages
    for i in list(raiting.keys())[:10]:
        exp = raiting.get(i)
        get_name = await parse_user_name(env, i)
        num = num_to_smile(cur)
        last = await db.get(user_stats, chat_id=chat_id, user_id=i)
        r_exp = get_level(last.lvl)
        text += f"{num} {textify_value(exp)} [LV. {last.lvl} | {last.messages}/{r_exp}] - @id{i} ({get_name})\n"
        cur += 1
    if not await check_admin(env, message.peer_id, -172361596):
        text += '\nя не являюсь администратором данной конференции, поэтому все сообщения обрабатываются только при упоминании меня.'
    return await env.request('messages.send', chat_id=chat_id, message=text)

async def parse_admin(env, peer):
    chat = await env.request('messages.getConversationMembers', peer_id=peer)
    try:
        for user in chat.response['items']:
            if user['member_id'] == user['invited_by']:
                return user['member_id']
            else:
                continue
    except:
        pass

async def split(a, n):
    k, m = divmod(len(a), n)
    return (a[i * k + min(i, m):(i + 1) * k + min(i + 1, m)] for i in range(n))

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
@plugin.on_text('чат топ')
async def chats_raiting(message,attachments,env):
    chat_stats, user_stats = plugin.db1, plugin.db2
    chat_id = int(message.peer_id) - int(2000000000)
    top = await db.execute(chat_stats.select().order_by((chat_stats.messages).desc()))
    raiting = {}
    cur = 1
    text = "тoп 15 бeceд:\n"
    for p in top:
        if int(p.chat_id) < 0:
            continue
        if p.chat_id not in raiting:
            raiting[p.chat_id] = p.messages
        else:
            raiting[p.chat_id] += p.messagess
    try:
        for i in list(raiting.keys())[:15]:
            peer = int(i) + int(2000000000)
            owner_id = await parse_admin(env, peer)
            chat = await env.request('messages.getConversationsById', peer_ids=peer)
            if not chat.response.get('count') or chat.response.get('count') == 0:
                continue
            admin_name = await parse_user_name(env, owner_id)
            text += f"{cur}. @id{owner_id} ({chat.response['items'][0]['chat_settings']['title']}) (#{i}): {raiting[i]} msg\n"
            cur += 1
        if not chat_id in list(raiting.keys())[:15] and chat_id in list(raiting.keys()):
            num = list(raiting.keys()).index(chat_id) + 1
            text += f".....\n{num}. ваша конференция\n"
    except Exception as e:
        traceback.print_exc()
        pass
    if not await check_admin(env, message.peer_id, -172361596):
        text += '\nваша беседа не отображается в рейтинге, так как я не являюсь её администратором.'
    return await env.request('messages.send', chat_id=chat_id, message=text)

@plugin.on_startswith_text('send')
async def send_messages(message, attachments, env):
    if message.from_id != 139432998:
        return
    chat_stats, user_stats = plugin.db1, plugin.db2
    chat_id = int(message.peer_id) - int(2000000000)
    top2 = await db.execute(chat_stats.select().order_by((chat_stats.messages).desc()))
    vk_message = '💌 Не пугайтесь, это обычная рассылка:\n\n' + env.body

    await env.reply('начинаю рассылку') 
    top = [211170295, 211510824, 211528464, 211565066, 211578760, 211630034, 211694301, 211733904, 211769486, 211841068, 211915002, 212033236, 212090707, 212157209, 212186961, 212343184, 212424730, 212587278, 212587785, 212663996, 213074560, 213080783, 213095857, 213414381, 213441526, 213477634, 213480985, 213815620, 213870375, 213871010, 213881659, 214122155, 214148309, 214167551, 214213368, 214274861, 214606375, 214673883, 214729709, 214855872, 214898222, 214918814, 214948654, 214993209, 215002796, 215019528, 215048450, 215056089, 215092603, 215152312, 215194310, 215280137, 215756373, 215783403, 215995939, 216046728, 216214850, 216381791, 216506767, 216517456, 216523585, 216823105, 216906819, 216942602, 217059316, 217069548, 217120466, 217135414, 217167843, 217170720, 217212167, 217411351, 217504900, 217643301, 217910214, 217945178, 217990978, 218016774, 218034877, 218134302, 218223508, 218344110, 218503610, 218542228, 218542507, 218637268, 218774221, 218779882, 218807140, 218823439, 219085440, 219120220, 219206769, 219211579, 219259844, 219331342, 219441280, 219461112, 219469195, 219680226, 219692781, 219776535, 219889145, 219901637, 220064766, 220088282, 220160891, 220170185, 220188082, 220342836, 220351041, 220358540, 220425601, 220466816, 220475539, 220490853, 220653753, 220937827, 221014224, 221285557, 221453853, 221675856, 221867788, 221952155, 222028693, 222115506, 222265251, 222372080, 222464550, 222600325, 222684595, 222882849, 223015414, 223025902, 223045665, 223094117, 223271076, 223298171, 223329716, 223606091, 223711062, 223795528, 223854379, 223902159, 223933831, 223958032, 223971479, 224161665, 224168139, 224190328, 224513284, 224519713, 224710022, 224963190, 225034791, 225040703, 225080164, 225096432, 225351932, 225490673, 225509258, 225521086, 225540592, 225624740, 225645334, 225687075, 225702194, 225950600, 226127276, 226155235, 226178165, 226185744, 226317440, 226359515, 226475400, 226492485, 226506458, 226651071, 226835057, 227021028, 227032953, 227048811, 227136482, 227162546, 227390425, 227493134, 227519652, 227570161, 227601293, 227641786, 227664191, 227720558, 227840997, 227896652, 227932990, 227967987, 227970513, 228044269, 228152037, 228254187, 228372427, 228469000, 228483547, 228616808, 228854375, 228905730, 229129981, 229168066, 229177618, 229203735, 229242357, 229347514, 229521616, 229592831, 229719419, 229791245, 229891602, 230038072, 230200017, 230222917, 230235391, 230248962, 230352464, 230380922, 230428553, 230491980, 230496623, 230544887, 230700980, 230725524, 230950955, 231232696, 231342168, 231415221, 231586316, 231617870, 231630373, 231684589, 231808553, 232048179, 232054992, 232120319, 232209584, 232222106, 232287546, 232344567, 232600698, 232765006, 232785469, 232842810, 232857111, 233082093, 233175915, 233278666, 233293980, 233549830, 233563997, 233674895, 233719377, 233771503, 233890854, 233903404, 233936630, 234009855, 234032676, 234046998, 234162081, 234538619, 234597988, 234876725, 234904659, 235081653, 235171728, 235228846, 235300667, 235408841, 235457413, 235489618, 235513390, 235582430, 235707357, 235801801, 235844390, 235866051, 235889318, 235941549, 235946248, 236008575, 236107001, 236179718, 236183501, 236264600, 236279812, 236331292, 236526440, 236538774, 236577155, 236590037, 236748922, 236803817, 236813860, 236959408, 236960364, 236976107, 237005602, 237011693, 237053840, 237088740, 237305700, 237326711, 237358658, 237359472, 237411148, 237483191, 237625610, 237800072, 237800143, 238014278, 238209628, 238313712, 238369272, 238378424, 238498731, 238508980, 238565241, 238701181, 238915492, 239182045, 239350298, 239404913, 239469327, 239563842, 239579049, 239586582, 239601456, 239731959, 239821953, 239856585, 239907923, 239915599, 240317205, 240407337, 240516369, 240592027, 240834856, 240840991, 240854650, 240874068, 240888985, 241113475, 241157070, 241197522, 241274804, 241275501, 241317826, 241367983, 241406587, 241500306, 241556490, 241626246, 242211154, 242222905, 242228425, 242281433, 242337479, 242442166, 242523819, 242533683, 243137298, 243153882, 243266080, 243280665, 243335312, 243866810, 243963047, 243963738, 243983323, 244203565, 244205958, 244232407, 244323420, 244329558, 244344538, 244385144, 244702524, 244706931, 244762915, 244867331, 245015126, 245051168, 245265437, 245303565, 245303903, 245338586, 245418692, 245557246, 245660489, 245669740, 245839675, 245946054, 245958795, 246110869, 246142245, 246150707, 246166565, 246171696, 246243236, 246318846, 246380086, 246397395, 246593159, 246635911, 246684083, 246700729, 246758382, 246805376, 246825922, 246827363, 246917878, 247005162, 247112921, 247189934, 247195619, 247269741, 247296620, 247296861, 247589018, 247619600, 247651912, 247684558, 247755123, 247767144, 247809282, 247878607, 247982610, 248063479, 248132575, 248133316, 248157181, 248307304, 248352311, 248360100, 248403944, 248405102, 248415939, 248452310, 248541000, 248608046, 248730141, 248732469, 248742058, 248743198, 248744615, 248760117, 248778890, 248803602, 248832441, 248870872, 248945361, 248964843, 249132098, 249138974, 249329264, 249440974, 249482907, 249765141, 249836158, 249849287, 249861130, 249869344, 249920254, 249960157, 249966519, 250266755, 250269379, 250293330, 250389077, 250497346, 250650421, 250660373, 250926340, 250974450, 250982240, 250993926, 250996445, 251046746, 251191221, 251219241, 251318936, 251335144, 251351346, 251395275, 251423861, 251434652, 251461069, 251485287, 251540456, 251545396, 251645952, 251830889, 251898455, 251961215, 252023002, 252049330, 252077297, 252100511, 252150667, 252251691, 252335068, 252375122, 252493917, 252554243, 252776817, 252783795, 253270874, 253357491, 253454650, 253492714, 253500280, 253622245, 253632739, 253682084, 253871019, 254004691, 254146679, 254207151, 254355065, 254360495, 254371984, 254399996, 254416639, 254451400, 254459048, 254482515, 254641353, 254690719, 254794193, 254817763, 254898338, 254972403, 255007474, 255050336, 255130922, 255153300, 255204269, 255227336, 255252978, 255257022, 255458785, 255539978, 255590933, 255703283, 255743525, 255775698, 255781271, 255839646, 255928332, 255939095, 256068095, 256249120, 256327786, 256345717, 256482423, 256483563, 256929981, 257014857, 257090832, 257091480, 257135175, 257162462, 257169559, 257207092, 257261265, 257496751, 257499270, 257539060, 257709157, 257746750, 257759324, 257770888, 257878746, 257883222, 258195268, 258337079, 258383708, 258399954, 258479342, 258531183, 258595709, 258659976, 258772531, 258798271, 258809056, 258887998, 259062650, 259135210, 259135641, 259169244, 259203713, 259258766, 259268071, 259425909, 259556452, 259558132, 259563791, 259588795, 259793966, 260040224, 260067525, 260091545, 260174607, 260220995, 260308185, 260323448, 260333413, 260409502, 260495697, 260511008, 260549537, 260723726, 260749683, 260901545, 260980626, 261008645, 261073901, 261173147, 261248659, 261329445, 261397397, 261495622, 261563096, 261676314, 261889244, 261993909, 262242012, 262273716, 262482553, 262639681, 262774122, 262908909, 262928937, 262937074, 262999493, 263120808, 263177517, 263232560, 263441629, 263562782, 263936841, 264034578, 264176891, 264182937, 264313661, 264343968, 264373470, 264433148, 264551105, 264747269, 264837781, 264914466, 265051806, 265211141, 265264924, 265270155, 265276906, 265392144, 265511773, 265512541, 265761362, 265777463, 265841949, 266039874, 266204177, 266412621, 266460436, 266519436, 266635266, 266699371, 266705576, 266762221, 266842844, 266939555, 267007411, 267209939, 267344036, 267382690, 267400536, 267426752, 267518240, 267723083, 267826786, 267834163, 267980764, 268067347, 268069801, 268208086, 268462504, 268559428, 268575354, 268684556, 268748569, 268854974, 268894345, 268911072, 268914484, 268922301, 268956514, 269147967, 269736978, 269860330, 269951975, 269965746, 270009656, 270119698, 270205235, 270289914, 270491346, 270492902, 270492978, 270500975, 270569219, 270609119, 270636963, 270657005, 270687006, 270920811, 271019482, 271077918, 271095067, 271149317, 271184695, 271322048, 271662354, 271669269, 271709193, 271761237, 271948658, 272008674, 272161330, 272195642, 272289377, 272516318, 272534739, 272641584, 272678520, 272705960, 272739924, 272806565, 272880667, 273144719, 273195084, 273329753, 273368839, 273427563, 273510237, 273513408, 273641723, 273747314, 273853626, 273936742, 274092841, 274145867, 274275358, 274464902, 274473913, 274804690, 274866490, 275026961, 275130128, 275214027, 275309169, 275321603, 275388291, 275399884, 275417344, 275420332, 275441862, 275577767, 275583543, 275597332, 275697641, 275759956, 275762052, 275860630, 275875628, 275944431, 275954349, 276040430, 276066043, 276166615, 276175869, 276508212, 276610124, 276625623, 276633252, 276654827, 276668817, 276797141, 276963154, 276971689, 277066584, 277110125, 277132838, 277349858, 277423647, 277448597, 277528637, 277629607, 277652888, 277654872, 277664612, 277773716, 277796919, 277936254, 277984064, 278043458, 278184185, 278185474, 278204866, 278314358, 278368863, 278398412, 278425956, 278466444, 278520477, 278563663, 278722290, 278760307, 278909451, 278910995, 278940113, 278998390, 279020992, 279075075, 279142263, 279144914, 279210135, 279211930, 279333308, 279463163, 279465122, 279488140, 279571873, 279617194, 279620891, 279626684, 279727415, 279793147, 279863645, 279936072, 279967056, 279969143, 280008099, 280018905, 280078577, 280107190, 280186158, 280189967, 280461072, 280496561, 280622312, 280654843, 280853424, 280877655, 280927593, 280992933, 281096671, 281117787, 281180101, 281185389, 281330867, 281402994, 281461735, 281627790, 281855966, 282072389, 282108391, 282118574, 282126334, 282294544, 282398458, 282415669, 282502560, 282738317, 282749448, 282772993, 282788002, 282806090, 283020695, 283173996, 283222296, 283307215, 283310794, 283349637, 283577568, 283600195, 283610668, 283666482, 283722806, 283752164, 283815170, 283848576, 283851668, 283859248, 283870870, 283877092, 284019449, 284157532, 284173363, 284198452, 284210260, 284232690, 284369704, 284392774, 284397913, 284419423, 284419698, 284744436, 284866052, 284986843, 284992776, 285032332, 285130349, 285288356, 285448877, 285460780, 285493979, 285644053, 285855191, 285889435, 285994181, 286052326, 286140459, 286408625, 286529551, 286681866, 286979925, 287118313, 287201947, 287282895, 287534979, 287626226, 287701466, 287912195, 287986260, 288072751, 288126798, 288255455, 288276472, 288455887, 288657627, 288690167, 288737252, 288773249, 288814513, 288993165, 289012193, 289016186, 289026824, 289072892, 289088833, 289263787, 289450468, 289483269, 289512375, 289531916, 289580431, 289629038, 289657264, 289690719, 289779563, 289795963, 289901958, 289911577, 289930210, 289952233, 290121861, 290130044, 290236955, 290273237, 290363852, 290479276, 290504899, 290506090, 290542533, 290782571, 290792870, 290819718, 290845790, 290893233, 290900373, 290908411, 290926701, 290934515, 290939709, 290958692, 291071793, 291123902, 291476669, 291572546]
    try:
        for q in top:
            await env.request('messages.send', user_id=q, message=vk_message)
            await asyncio.sleep(1)
    except:
        pass
    return await env.reply('рассылка завершена')


@plugin.on_startswith_text('юзер стат')
async def user_stats(message,attachments,env):
    if int(message.peer_id) < 2000000000:
        return
    chat_stats, user_stats = plugin.db1, plugin.db2
    chat_id = int(message.peer_id) - int(2000000000)
    top = await db.execute(user_stats.select().where(user_stats.chat_id == chat_id).order_by((user_stats.messages).desc()))
    raiting = {}
    for p in top:
        if int(p.user_id) < 0:
            continue
        if p.user_id not in raiting:
            raiting[p.user_id] = p.messages
        else:
            raiting[p.user_id] += p.messages
    if message.from_id not in raiting.keys():
        return await env.reply('пользователь незарегистрирован.')
    r = await db.get(user_stats, chat_id=chat_id, user_id=message.from_id)
    r_place = list(raiting.keys()).index(message.from_id) + 1
    r_exp = get_level(r.lvl)
    text = f"личная статистика @id{message.from_id} (пользователя):\n📧 Сообщений: {textify_value(r.messages)} ({textify_value(r.nl_messages)} не подряд)\n📨 Чистых сообщений: {textify_value(r.clear_messages)} (символов {textify_value(r.symbols)}/{textify_value(r.clear_symbols)})\n👺 Сообщений с матами: {textify_value(r.messages_with_sw)}\n🏆 Рейтинг активности: {r_place} место\n💻 LVL: {r.lvl} [{r.messages}/{r_exp}]\n"
    if not await check_admin(env, message.peer_id, -172361596):
        text += '\nя не являюсь администратором данной конференции, поэтому все сообщения обрабатываются только при упоминании меня.'
    return await env.request('messages.send', chat_id=chat_id, message=text)

@plugin.on_startswith_text('актив')
async def active(message,attachments,env):
    if int(message.peer_id) < 2000000000:
        return
    args = message.text.lower().split()
    if args[0] != 'актив':
        return
    chat_stats, user_stats = plugin.db1, plugin.db2
    chat_id = int(message.peer_id) - int(2000000000)
    query = user_stats.select().where(user_stats.chat_id == chat_id, user_stats.last_message_date <= datetime.datetime.now()).order_by((user_stats.last_message_date).desc())
    query_result = await db.execute(query)
    user_data = [{"id": int(u.user_id), "date": u.last_message_date} for u in query_result]
    if not user_data:
        return
    if len(user_data) > 20:
        user_data2 = list(await split(user_data, len(user_data) // 20))
        args = message.text.lower().split(' ')
        if not args or len(args) < 2:
            return await env.reply(f"доступно {plural_form(len(user_data2), ('страница', 'страницы', 'страниц'))} с активом пользователей ({len(user_data)}), укажите нужную страницу, используя команду \"актив [1-{len(user_data2)}].\"")
        if not args[1].isdigit():
            return await env.reply('Номер страницы принимает числовое значение.')
        if int(args[1]) < 1 or int(args[1]) > len(user_data2):
            return await env.reply(f'Укажите номер страницы от 1 до {len(user_data2)}.')
        vk_message = f'актив пользователей (страница {args[1]}/{len(user_data2)}):\n'
    else:
        vk_message = f'актив пользователей:\n'
    for u_data in enumerate(user_data2[int(args[1])-1] if len(user_data) > 20 else user_data, start=1):
        result = datetime.datetime.now() - u_data[1]['date']
        if result.seconds < 120:
            state = 'актив'
        else:
            state = await seconds(result.seconds)
        name = await parse_user_name(env, u_data[1]['id'])
        vk_message += f"{u_data[0]}. @{'id' if u_data[1]['id'] > 0 else 'club'}{u_data[1]['id'] if u_data[1]['id'] > 0 else -u_data[1]['id']} ({name}) - {state}\n"
    return await env.reply(vk_message)
