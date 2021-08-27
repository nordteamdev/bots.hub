
const mysql = require('mysql');
  var bot = {
    mysql: {
        db: null,
        connect: function() {
                    console.log(`Устанавливаю подключение к MySql`); 
                bot.mysql.db = mysql.createPool({
                    host: 'localhost',
                    user: 'пользователь',
                    password: 'пародь',
                    database: 'имя_базы',
                    charset: 'utf8mb4_general_ci',
                    connectionLimit: 100
                });
                bot.mysql.db.getConnection(function(err, connection) {
                    if (err) {
                        return console.error(`Ошибка с подключением к бд`, err);
                    } else {
                        bot.mysql.load();
                    }
                    console.log(`К MySql  подключение установлено`);    
                });
                },
                load: function() {
                },
                }
            }
            bot.mysql.connect();
module.exports = bot;