const wordCoffs = {
  k: 1000,
  m: 1000000,
  r: 1000000000,
  'к': 1000,
  'м': 1000000,
  'р': 1000000000
}

function parseWordChunk (chunk) {
  if (!chunk) {
    return 1
  }

  return Array.from(chunk[0]).reduce((acc, v) => {
    const coff = wordCoffs[v.toLowerCase()];
    return acc * (coff || 1);
  }, 1);
}

export default async function initBotcmdType (plugin) {
  const { argumentParser } = plugin.henta.getPlugin('common/botcmd')

  // User
  argumentParser.add('moneys', (data) => {
    const wordChunk = data.word.match(/[A-Za-zА-ЯЁа-яё]+$/)
    const parsedValue = parseFloat(data.word)
    if (isNaN(parsedValue)) {
      return [true, '⛔ Вы указали не число']
    }

    const coff = parseWordChunk(wordChunk);
    const value = Math.floor(parsedValue * coff);
    if (value > data.ctx.user.money) {
      return [true, '⛔ Недостаточно бит.']
    }

    if (value < (data.min || 1)) {
      return [true, `⛔ Нельзя указывать меньше ${data.min || 1} бит.`]
    }

    return [false, value]
  })
}