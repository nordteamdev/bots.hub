const rights = {
    0: {
        barons: {
            speed: 2,
            limit: 15
        },
        rabs: {
            farm: 1,
            count: 25,
            limit: 1000000
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
            limit: 1250000
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
            limit: 1500000
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
            limit: 1750000
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
            limit: 2000000
        }
    },
    5: {
        barons: {
            speed: 2,
            limit: 100
        },
        rabs: {
            farm: 1,
            count: 150,
            limit: 2250000
        }
    }
}
function rabs(user, colvo){
    return rab + colvo > rabss.count ? false : true 
}
var limiter = (user) => {
}
var barons = (user, colvo) => {
    return barons + colvo >= baronss.limit ? false : true 
}
module.exports = {
    rabs,
    limiter,
    barons
}