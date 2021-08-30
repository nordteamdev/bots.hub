<p align="center">
  <a href="https://nodejs.org/">
    <img
      alt="Node.js"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="400"
    />
  </a>
</p>

# Описание
Бот предназначен для игрового бота ВК - World of Clans

# Возможности
* Фарм Золота / Дерева / Руды
* Обход анти-бота ( сам решает примеры )
* Получение статистики при запуске ( по приколу, мб в дальнейшем пригодится )
* Обход капчи вк ( через RuCapcha )

# Настройки
* Получение токена (token):

Откройте [эту](https://vk.cc/9DWTyO) ссылку и нажмите разрешить

После этого в адресной строке будет подобное: **https://api.vk.com/blank.html#access_token=xxxxxxxxxxxx&expires_in=0&user_id=user_id&email=email**

Токеном будет являться строка от **access_token** до **&expires**. В этом случае **xxxxxxxxxxxx**

В настройках нужно указать Ваш токен и токен от RuCapcha (config.js):
```console
token: `токен страницы`, // string
ru_key: `RuCapcha token`, // string
```
