const { Command, Utils } = require('cocoscore')
const moment = require('moment')
require('moment/locale/ru');

module.exports = new Command({
trigger: /^moment/i,
handler(ctx, bot) {
ctx.send(`${moment().unix()}\n${moment.unix(moment().unix())}`)
}
})