const accs = require("../data/accs.json")

function addmoney(){
        const accs = require("../data/accs.json")
		if (accs[s].inventory.rabs > 0){
			accs[s].spots += accs[s].inventory.rabs
		}else if (accs[s].inventory.barons > 0){
			accs[s].spots += Math.round(accs[s].inventory.rabs*Math.round(accs[s].inventory.rabs*2))
		}
}			
module.exports = {
    addmoney
}