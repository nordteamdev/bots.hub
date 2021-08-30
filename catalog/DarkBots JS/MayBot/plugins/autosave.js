const db = require('../data/database.json')
const fs = require('fs')
function saving() {
    fs.writeFileSync("./data/database.json", JSON.stringify(db, null, "\t"))
}
module.exports = {
    accs: db.accs,
    banlist: db.banlist,
    clans: db.clans,
    promo: db.promocodes,
    db: db,
    bank: db.bank,
    saving
}