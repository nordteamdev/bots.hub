from kutana import Plugin
from geopy.geocoders import Photon, Yandex, Nominatim
import aiohttp, json, time, datetime
plugin = Plugin(name="Weather Plugin")
plugin.category = 'Инфо и прочее'
plugin.limit = {'погода':6}
plugin.desc = {'погода':['{город}','прогноз погоды для *город*']}
@plugin.on_startup()
async def on_startup(kutana, update):
    plugin.dict = {}
    plugin.dict['token'] = '4e72572d631723e8854c3cd2e692937b'
    plugin.dict['geocoders'] = []
    plugin.dict['coords_cache'] = {}
    plugin.dict['weather_cache'] = {}
    plugin.dict['weather_clear'] = time.time() + 12 * 60 * 60
    plugin.dict['api_lim'] = 95
    plugin.dict['api_lim_clear'] = time.time() + 24 * 60 * 60
    plugin.dict['api_lim_count'] = 0
    for coder in [Photon, Yandex, Nominatim]:
        plugin.dict['geocoders'].append(coder())

async def get_weather(result):
    if plugin.dict['weather_clear'] - time.time() <= 0:
        plugin.dict['weather_clear'] = time.time() + 12 * 60 * 60
        plugin.dict['weather_cache'].clear()

    if f"{result.latitude}_{result.longitude}" in plugin.dict['weather_cache']:
        return plugin.dict['weather_cache'][f"{result.latitude}_{result.longitude}"]
    url = f"https://api.darksky.net/forecast/{plugin.dict['token']}/{result.latitude},{result.longitude}?lang=ru&units=si&exclude=minutely,currently,alerts,flags"

    if plugin.dict['api_lim_clear'] - time.time() <= 0:
        plugin.dict['api_lim_clear'] = time.time() + 24 * 60 * 60
        plugin.dict['api_lim_count'] = 0

    if plugin.dict['api_lim_count'] >= plugin.dict['api_lim']:
        return "LIMIT EX"

    plugin.dict['api_lim_count'] += 1

    async with aiohttp.ClientSession() as sess:
        async with sess.get(url.format(token=plugin.dict['token'],
                                           latitude=result.latitude,
                                           longitude=result.longitude)) as resp:
            try:
                w = json.loads(await resp.text())
            except:
                return None

    if len(plugin.dict['weather_cache']) > 400 and plugin.dict['api_lim_count'] < plugin.dict['api_lim']:
        plugin.dict['weather_cache'].clear()

    plugin.dict['weather_cache'][f"{result.latitude}_{result.longitude}"] = w

    return w

async def get_coords(text):
    if text in plugin.dict['coords_cache']:
        return plugin.dict['coords_cache'][text]

    for i, coder in enumerate(list(plugin.dict['geocoders'])):
        result = plugin.dict['geocoders'][-1].geocode(text)

        if not result: continue

        if i != 0:
            plugin.dict['geocoders'][0], plugin.dict['geocoders'][i] = plugin.dict['geocoders'][i], plugin.dict['geocoders'][0]

        if len(plugin.dict['coords_cache']) > 400:
            plugin.dict['coords_cache'].clear()

        plugin.dict['coords_cache'][text] = result

        return result
    else:
        return None

async def what_day(day, month, year):
    a = (14 - month) // 12
    y = year - a
    m = month + 12 * a - 2
    result = (((day + y + y // 4 - y // 100 + y // 400 + (31 * m) // 12)) % 7) - 1
    return result

@plugin.on_startswith_text('погода')
async def weather_send(message,attachments,env):
    icons = {
    "clear-day": "☀️",
    "clear-night": "🌙",
    "cloudy": "☁️",
    "fog": "🌁",
    "partly-cloudy-day":   "⛅️",
    "partly-cloudy-night": "🌙",
    "rain": "☔️",
    "sleet": "❄️ ☔️",
    "snow": "❄️",
    "wind": "🍃",
    "error": "🤔",
    }
    text = env.body
    if not text:
        return await env.reply("укажите город для получения данных.")
    result = await get_coords(text)
    cc = text.split(" ")[-1].title()
    if not result: return await env.reply("указанные координаты не найдёны!")
    w = await get_weather(result)
    if w == "LIMIT EX": return await env.reply("больше новых прогнозов сегодня не будет! Приходите завтра.")
    if not w: return await env.reply("ошибка! Погода не найдена!")
    d = datetime.datetime.now()
    num = datetime.datetime(int(d.year), int(d.month), int(d.day)).weekday()
    h = w['daily']
    hd = h["data"][num]
    d = w['hourly']
    dh = d['data'][0]
    precip = ""
    if "precipType" in hd:
        if hd["precipType"] == "rain":
            precip = "(дождь)"
        elif hd["precipType"] == "snow":
            precip = "(снег)"
    days = ["понедельник", "вторник", "среду", "четверг", "пятницу", "субботу", "воскресенье"]
    text2 = f"Погода в городе {cc} на {days[num]}:\n"
    if "sunriseTime" in hd:
        text2 += f"&#12288;⛅{datetime.datetime.fromtimestamp(int(hd['sunriseTime'])).strftime('%H:%M')}\n"
    if "sunsetTime" in hd:
        text2 += f"&#12288;🌥{datetime.datetime.fromtimestamp(int(hd['sunsetTime'])).strftime('%H:%M')}\n"        
    if "apparentTemperatureMin" in hd:
        text2 += f"&#12288;🌡{dh['temperature']}°C\n"
    if "precipIntensity" in hd:
        text2 += f"&#12288;💦{round((hd['precipIntensity'] * 1000), 2)}% {precip}\n"
    if "humidity" in hd:
        text2 += f"&#12288;💧{round(hd['humidity'] * 100, 2)}%\n"
    if "cloudCover" in hd:
        text2 += f"&#12288;☁{round(hd['cloudCover'] * 100, 2)}%\n"
    if "pressure" in hd:
        text2 += f"&#12288;📐{round(hd['pressure'] * 0.750062, 2)} мм.рт.ст\n"
    if "windSpeed" in hd:
        text2 += f"&#12288;💨{hd['windSpeed']} м/с\n"
    if "visibility" in hd:
        text2 += f"&#12288;👀{hd['visibility']} км\n"
    text2 += f"&#12288;{icons[hd['icon']]}{dh['summary'].lower()}\n"

    return await env.reply(text2)