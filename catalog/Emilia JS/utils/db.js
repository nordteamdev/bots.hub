const fs = require('fs');

function prettyJSON(str) {
    return JSON.stringify(str, null, 4);
}

function toObj(json) {
    return JSON.parse(json);
}

class Config {
    constructor(fileName) {
        this.file   = fileName;
        if (!fs.existsSync(fileName)) {
            this.config = {};
            this.save();
        }
        this.config = toObj(fs.readFileSync(fileName));
    }
    
    save(async = false) {
        if (async) {
            fs.writeFile(this.file, prettyJSON(this.config), (err, res) => {
                if (err) {
                    console.log(err);
                }
            });
        } else {
            fs.writeFileSync(this.file, prettyJSON(this.config));
        }
    }
    
    get(key, def = null) {
        return this.config[key] !== undefined ? this.config[key] : def;
    }
    
    set(key, val) {
        this.config[key] = val;
    }
    
    getNested(k, def) {
        let parts = k.split(".");
        if (!this.config[parts[0]]) {
            return def;
        }

        let config = this.config[parts.shift()];

        while (parts.length > 0) {
            let part = parts.shift();
            if (typeof config[part] !== "undefined") {
                config = config[part];
            } else {
                return def;
            }
        }

        return config;
    }
    
    setNested(k, v) {
        let parts = k.split(".");
        let base = parts.shift();

        if (typeof this.config[base] === "undefined") {
            this.config[base] = {};
        }

        base = this.config[base];

        while (parts.length > 0) {
            let part = parts.shift();

            if (typeof this.config[part] === "undefined") {
                base[part] = {};
            }

            if (parts.length > 0) {
                base = base[part];
            } else {
                base[part] = v;
            }
        }
    }
    
    getAll() {
        return this.config;
    }
    
    setAll(v) {
        this.config = v;
    }
}
module.exports = {
    users: new Config('users.json')
}