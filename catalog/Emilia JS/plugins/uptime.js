var seconds = 0,
    minute  = 0,
    hours   = 0,
    days    = 0;
setInterval(() => {
	++seconds;
	if(seconds === 60){
		++minute;
		seconds = 0;
		if(minute === 60){
			++hours;
			minute = 0;
			if(hours === 24){
				++days;
				hours = 0;
			}
		}
	}
}, 1000);
let plugin         = {};
plugin.name        = 'uptime';
plugin.description = 'получить аптайм';
plugin.usage       = '!uptime';
plugin.commands    = [/^!uptime/i];
plugin.level       = 5;
plugin.onCommand   = async (context) => {
    context.send('Бот работает ' + days + ' дней, ' + hours + ' часов, ' + minute + ' минут, ' + seconds + ' секунд.');
};
plugin.hidden      = true;

module.exports     = plugin;