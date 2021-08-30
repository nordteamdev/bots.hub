from kutana import Plugin
from kutana.vksm import *
plugin = Plugin(name="Prefixer", priority=500)

@plugin.on_has_text()
async def on_has_text(message, attachments, env):
    original_reply = env.eenv.reply

    async def my_reply(*args, **kwargs):
        prefix =  await parse_user_name(env, message.from_id, prefix=True)
        if args:
        	msg_prefix = '@id{} ({}), '.format(message.from_id, prefix)
        	return await original_reply(msg_prefix + args[0], *args[1: ], **kwargs)
        else:
        	return await original_reply('@id{} ({}), '.format(message.from_id, prefix), **kwargs)

    env.eenv.reply = my_reply

    return "GOON"
