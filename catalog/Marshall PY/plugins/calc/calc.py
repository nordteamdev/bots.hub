from plugins.calc._calculator import *
from kutana import Plugin,VKController
plugin = Plugin(name="calc")
@plugin.on_startswith_text('посчитай')
async def calc(msg,ats,env):
    if not env.body:
        return await env.reply('используйте \"посчитай\" пример\nпример использования: посчитай 2421*12478')
    success, result = calculate_safe(env.body)
    if success:
        return await env.reply("Результат: " + str(result))

    return await env.reply("Ошибка в выражении")