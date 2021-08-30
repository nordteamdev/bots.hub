const accs = require("../plugins/autosave.js").accs
const rights = {
    0: {
        barons: {
            speed: 2,
            limit: 15
        },
        rabs: {
            farm: 1,
            count: 25,
            limit: 100000000000000
        }
    },
    1: {
        barons: {
            speed: 2,
            limit: 25
        },
        rabs: {
            farm: 1,
            count: 50,
            limit: 100000000000000
        }
    },
    2: {
        barons: {
            speed: 2,
            limit: 40
        },
        rabs: {
            farm: 1,
            count: 75,
            limit: 100000000000000
        }
    },
    3: {
        barons: {
            speed: 2,
            limit: 55
        },
        rabs: {
            farm: 1,
            count: 100,
            limit: 100000000000000
        }
    },
    4: {
        barons: {
            speed: 2,
            limit: 70
        },
        rabs: {
            farm: 1,
            count: 125,
            limit: 100000000000000
        }
    }
}
function rabs(user, colvo){
    var i = accs.filter(a=> a.id == user).map(a=> a.uid)
    var rab = accs[i].inventory.rabs
    var rabss = rights[accs[i].rights].rabs
    return rab + colvo > rabss.count ? false : true 
}
var limiter = (user) => {
    var i = accs.filter(a=> a.id == user).map(a=> a.uid)
    var r = accs[i].rights
    return {limit: rights[r].rabs.limit, farm: rights[r].rabs.farm * (accs[i].inventory.barons == 0 ? 1 : accs[i].inventory.barons * rights[r].barons.speed)}
}
var barons = (user, colvo) => {
    var i = accs.filter(a=> a.id == user).map(a=> a.uid)
    var barons = accs[i].inventory.barons
    var baronss = rights[accs[i].rights].barons
    return barons + colvo >= baronss.limit ? false : true 
}
module.exports = {
    rabs,
    limiter,
    barons
}