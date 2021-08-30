export default function initArgumentType(plugin) {
  const { argumentParser } = plugin.henta.getPlugin('common/botcmd')

  argumentParser.add('clan', async data => {
    const clanId = parseInt(data.word, 10);
    if (Number.isNaN(clanId)) {
      return [true, '⛔ Используйте ID клана'];
    }

    const clan = await plugin.getClanById(clanId);
    if (!clan) {
      return [true, '⛔ Такой клан не найден'];
    }

    return [false, clan];
  });
}
