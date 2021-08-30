import Sequelize from 'sequelize'

export default async function initDb (plugin) {
  const dbPlugin = plugin.henta.getPlugin('common/db')

  plugin.Achievement = dbPlugin.define('achievement', {
    slug: Sequelize.STRING(16),
    vkId: Sequelize.INTEGER
  }, { timestamps: false })

  await dbPlugin.safeSync(plugin.Achievement)
}
