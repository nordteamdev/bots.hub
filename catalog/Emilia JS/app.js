const vk_io = require("vk-io");
const files = require("fs");
const config = require("./config.json");
const logger = require("./utils/logger.js");
const plugins = require("./utils/plugins.js");
const captcha = require("./utils/captcha.js");
const vk = new vk_io.VK(config);
vk.setCaptchaHandler(captcha);
if (config.token == "" && (config.login == undefined || config.login == "") && (config.password == undefined || config.password == "")) {
    logger.error("Токен или логин и пароль не указан");
    return;
}
async function main() {
    if (config.login != "" && config.password != undefined) {
        logger.info('Идет авторизация через логин и пароль');
        let login = undefined;
        if (config.app != undefined && config.app.toLowerCase() == "iphone") {
            login = vk.auth.iphoneApp();
        } else if (config.app != undefined && config.app.toLowerCase() == "windows") {
            login = vk.auth.windowsApp();
        } else {
            login = vk.auth.androidApp();
        }
        logger.info('Платформа - ' + login.app)
        await login.run()
            .then((data) => {
                logger.info('Авторизация прошла успешно.');
                config.token = data.token;
                config.botId = data.user_id;
                files.writeFileSync('config.json', JSON.stringify(config, null, '    '));
            })
            .catch((error) => {
                throw error;
            });
    }
    return config.token;
}
main()
    .then((token) => {
        vk.setToken(token);
        vk.updates.startPolling();
        plugins.load(vk);
        logger.info('Запущен');
    })
    .catch((error) => {
        logger.error(error);
    })