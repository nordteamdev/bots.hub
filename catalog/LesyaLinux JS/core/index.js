const mongoose = require("mongoose");
const chalk = require("chalk");
const Schemas = {
    "User": require("./schemas").User
};

const Constructors = {
    "User": require("./constructors").User
};

function newBot(options) {
    const { VK } = require("vk-io");
    const vk = new VK({
        "token": options.token,
        "apiMode": "parallel",
        "pollingGroupId": options.group_id || null
    });
	
	
	const { updates, api, snippets, collect } = vk;
    const commands = [];
    this.commands = commands;
    this.resolveResource = snippets.resolveResource;
    this.api = api;
	this.collect = collect;
    this.users = {
        getCount: () => Schemas.User.count(),
        get: () => Schemas.User.find(),
        getById: async (user_id, type = false) => {
            let field = {};
            if (type) {
                field.uid = user_id;
            } else {
                field.id = user_id;
            }
            return Schemas.User.findOne(field).then((user) => {
                return new Constructors.User(user);
            });
        },
        isUser: async (user_id, type = false) => {
            let field = {};
            if (type) {
                field.uid = user_id;
            } else {
                field.id = user_id;
            }
            return Schemas.User.findOne(field).then((user) => {
                return new Constructors.User(user);
            }).catch(() => {
                return false;
            });
        },
        add: async (user_ids) => {
            return api.users.get({
                user_ids
            }).then(async ([{
                id,
                first_name,
                last_name
            }]) => {
                let newUser = new Schemas.User({
                    id,
                    first_name,
                    last_name,
                    "register": new Date().getTime(),
                    "uid": ((await Schemas.User.countDocuments())+1)
                });
                return new Constructors.User(await newUser.save());
            });
        }
    };
    this.start = () => {
        mongoose.connect("mongodb://localhost:27017/" + options.db, {
            "useNewUrlParser": true,
        });
        mongoose.set("useCreateIndex", true);
        updates.startPolling();
        updates.on("message", (message) => {
            if (!message.hasText || message.senderId < 0 || message.isOutbox) return;
            this.handleContext(message);
        });
    };
    this.handleContext = (message) => {
        Promise.all([
            new Promise(async (resolve) => {
                this.users.getById(message.senderId).then((user) => {
                    resolve(user);
                }).catch(async () => {
                    let user = await this.users.add(message.senderId);
                    resolve(user);
                });
            })
        ]).then(([user]) => {
            message.text = message.text.replace(new RegExp(`\\[(club|public)(${options.group_id || 1337})\\|([^\\]].*)\\]\\s?`, "i"), "");
            this.handleMessage(message, user);
        });
    };
    this.handleMessage = (message, user) => {
        let cmd = commands.find((x) => x.pattern.test(message.text));
        //if (message.chatId !== 470) return;
        if (user.isBanned) return;
        if (!cmd) return;
        message.$user = user;
        message._send = message.send;
        message.body = [];
        message.send = (text, options) => {
            api.users.get({
                "user_ids": message.senderId
            }).then(([{ first_name, id }]) => {
                if (!options && typeof text === "object") return message._send(text);
                let _text;
                let nickname = user.nickname;
                if (user.nick) {
                    _text = text ? text.replace("%name%", `@id${id} (${nickname || first_name})`) : "";
                } else {
                    _text = text ? text.replace("%name%", `${nickname || first_name}`) : "";
                }
                message._send(_text, options);
            });
        };
        message.append = (text) => message.body.push(text);
        message.apply = () => {
            api.users.get({
                "user_ids": message.senderId
            }).then(([{ first_name, id }]) => {
                let _text;
                let nickname = user.nickname;
                if (user.nick) {
                    _text = message.body.join("\n").replace("%name%", `@id${id} (${nickname || first_name})`);
                } else {
                    _text = message.body.join("\n").replace("%name%", `${nickname || first_name}`);
                }
                message._send(_text, options);
            });
        };
        message.$match = message.text.match(cmd.pattern);
        cmd.callback(message);
    };
	
	this.friendsChecker = () => {
		setInterval(() => {
			vk.api.account.setOnline();
			
			vk.api.friends.getRequests()
			.then((res) => {
				res.items.map((user_id) => {
					vk.api.friends.add({ user_id })
				})
			});
			
			vk.api.friends.getRequests({ out: 1 })
			.then((res) => {
				res.items.map((user_id) => {
					vk.api.friends.delete({ user_id })
				})
			});
		}, 60000);
	} 

    this.addCommand = (pattern, callback, type, description) => {
        commands.push({
            pattern, callback, type, description
        });
    };
    this.drop = () => mongoose.connection.db.dropDatabase();
    console.warn = (data) => {
        console.log(chalk.yellow("[WARN]: ") + data);
    };
    console.info = (data) => {
        console.log(chalk.cyan("[INFO]: ") + data);
    };
    console.error = (data) => {
        console.log(chalk.red("[ERROR]: ") + data);
    };
}
module.exports = newBot;