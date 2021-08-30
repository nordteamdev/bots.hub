module.exports = async function (captcha, retry) {
    //Соеденяйтесь с сервисом антикапчи сами =)
    //captcha.src = капча
    //captcha.type = тип капчи (допустим, при авторизации)
    const key = 'ключ решения';
    try {
        await retry(key);
    } catch (error) {
        console.log(captcha.type + ' провалена. (' + captcha.src + ', ответ: ' + key + ')')
    }
}