from kutana import Plugin
from kutana.vksm import *

class ChatData:
    def __init__(self, cid, admin_id, items, users, groups):
        self.id = cid
        self.admin_id = admin_id
        self.users = users
        self.groups = groups
        self.items = items
        self.previous_users = []
        self.previous_items = []
        self.previous_groups = []

plugin = Plugin(name="ChatMetaPlugin", priority=650)

async def get_chat_data(env, peer_id, refresh=False):
    if not 'chats' in env.eenv:
        env.eenv.chats = {}
    if not refresh and peer_id in env.eenv.chats:
        return env.eenv.chats[peer_id]

    req = await env.eenv.request('messages.getConversationMembers', peer_id=peer_id, fields="sex,screen_name,nickname, invited_by")
    if not 'items' in req.response:
        return None
    chat = req.response
    if 'groups' in chat:
        result = chat['groups']
    else:
        result = 0

    chat_id = int(peer_id) - int(2000000000)
    admin_id = await check_admin(env, peer_id, -164822827)
    chat_data = ChatData(chat_id, admin_id, chat['items'], chat["profiles"], result)

    if peer_id in env.eenv.chats:
        chat_data.previous_items = env.eenv.chats[peer_id].items
        chat_data.previous_users = env.eenv.chats[peer_id].users
        chat_data.previous_groups = env.eenv.chats[peer_id].groups

    env.eenv.chats = {peer_id:chat_data}
    return chat_data

def create_refresh(env, peer_id):
    async def func():
        return await get_chat_data(env, peer_id, True)

    return func

@plugin.on_has_text()
async def chat_meta(message, attachments, env):
    if not await check_admin(env, message.peer_id, -164822827):
        env.eenv.meta_data = None
        env.eenv.meta_refresh = None
        return "GOON"
    env.eenv.meta_data = await get_chat_data(env, message.peer_id)
    env.eenv.meta_refresh = create_refresh(env, message.peer_id)
    if message.raw_update['object'].get('action', 0) != 0:
        if message.raw_update['object']['action']['type'] == 'chat_invite_user':
            await env.eenv.meta_refresh()
    return "GOON"