export default function initUsersMethods (plugin) {
  const usersPlugin = plugin.henta.getPlugin('common/users')
  usersPlugin.group('achievements')
    .method('isUnlocked', async ({ vkId }, slug) =>
      !!await plugin.Achievement.findOne({ where: { vkId, slug } })
    )
    .method('unlock', async (self, slug) => {
      if (await self.achievements.isUnlocked(slug)) {
        return
      }

      await plugin.Achievement.create({ slug, vkId: self.vkId })
      const achievement = plugin.get(slug)
      self.money += achievement.bonus
      self.lvl.addScore(Math.floor(Math.random() * 100))
      plugin.sendNotification(self, achievement)
    })
    .method('unlockIf', async (self, slug, condition) => {
      if (!condition) {
        return
      }

      self.achievements.unlock(slug)
    })
    .end()
}
