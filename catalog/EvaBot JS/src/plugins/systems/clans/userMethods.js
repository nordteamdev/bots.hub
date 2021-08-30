module.exports = function ({ getPlugin }) {
  const usersPlugin = getPlugin('common/users')

  usersPlugin.addMethod('getClan', async (self) => {
    const member = await this.ClanMember.findOne({ where: {vkId: self.vkId} })
    return member ? this.getClanById(member.clanId) : null
  })

  usersPlugin.addMethod('hasClan', async (self) => {
    return await this.ClanMember.findOne({ where: {vkId: self.vkId} }) != null
  })

  usersPlugin.addMethod('isClanOwner', async (self) => {
    const clan = await self.getClan()
    return clan ? self.vkId == clan.ownerVkId : false
  })

  usersPlugin.addMethod('assertClan', async (self, ctx, type) => {
    switch (type) {
      case 'has':
        return ctx.assert(
          await self.getClan(),
          [ `⛔ Вы должны состоять в клане.`, "➤ Вступите в клан с помощью меню." ],
        )
      case 'free':
        ctx.assert(
          !await self.hasClan(),
          [ `⛔ Вы уже состоите в клане.`, "➤ Покиньте его с помощью меню." ]
        )
        break
      case 'owner':
        const clan = await self.assertClan(ctx, 'has')
        ctx.assert(
          clan.ownerVkId == self.vkId,
          [
            `⛔ Вы должны быть владельцем клана.`,
            "➤ Можно создать свой клан или попросить владельца передать вам права."
          ]
        )

        return clan
    }
  })
}