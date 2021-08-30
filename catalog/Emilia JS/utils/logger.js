const colors = require('colors/safe');
const EOL = require('os').EOL;
const datebase = require('./db.js');
class Logger {
    error (messages) {
        if (messages instanceof Error) {
            messages = messages.stack.split(EOL);
        } else if (typeof(messages) == "string") {
            messages = messages.split(EOL);
        }
        messages.unshift(colors.white('-'.repeat(20)));
        messages.push(colors.white('-'.repeat(20)))
        console.log(messages.map((str) => {
            return colors.yellow(String(new Date()).split(/([0-9]+:[0-9]+:[0-9]+)/)[1]) + colors.blue(' » ') + colors.red(str);
        }).join(EOL));
        //TODO: Error will be push into errors datebase
    }
    
    info (messages) {
        if (typeof(messages) == "string") {
            messages = messages.split(EOL);
        }
        console.log(messages.map((str) => {
            return colors.yellow(String(new Date()).split(/([0-9]+:[0-9]+:[0-9]+)/)[1]) + colors.blue(' » ') + colors.green(str);
        }).join(EOL));
    }
}
module.exports = new Logger;