# Установка
### Установка NodeJS (Windows)
Переходим на этот сайт: [NodeJS](https://nodejs.org/en/)  
Загружаем NodeJS последней версии.
Устанавливаем, открываем консоль (win+r => cmd) и пишем **node -v**  

### Установка NodeJS (Ubuntu)
Открываем терминал и пишем
```
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Если у вас вдруг нету **curl**, то пишем:
```
sudo apt-get install curl
```

### Установка модулей
Ядро включает в себя следующие модули:  
[vk-io](https://github.com/negezor/vk-io/) - модуль для работы с API ВКонтакте.
[chalk](https://github.com/chalk/chalk) - модуль ради красивого лога
[chalk-animation](https://github.com/bokub/chalk-animation) - анимации для chalk
Установка модулей:
```
npm install vk-io chalk chalk-animation
```

### Настройка
Открываем **config.js**, ищем строку **const TOKEN = "token"**, вставляем место **token** свой токен  
Токен можно получить здесь - [VKHOST](https://vkhost.github.io/)

### Запуск
Открываем терминал/консоль в папке с **index.js**, или переходим с помощью **cd**  
Прописываем **node index** и вуаля, бот работает :)
#### Если хотим чтобы бот сам перезапускался
Устанавливаем модуль **pm2**:
```
npm install pm2 -g
```
Запускаем бота через команду:
```
pm2 start index.js
```

### Добавление новых команд
Добавлять новые команды можно по шаблону:
```javascript
bot.on({
    pattern: RegExp,
    description: String,
    admin: Boolean,
    async run(ctx) => {
        // code
    }
});
```
Название | Описание | Обязательно?
------------ | ------------- | -------------
Pattern | Регулярное выражение, [сайт для теста регулярок](https://regexr.ru/) | Да
Description | Описание команды | Нет
Run | Код команды | Да
Admin | Является ли команда административной | Нет

### Доп. информация
В ядро входят различные полезные утилиты в виде:
* random(x, y) - генерация случайного числа в промежутке, причем y не является обязательным
* randomPick(array) - выбирает случайный элемент из массива
##### Для сообщений:
* ctx.args[] - пустой массив или группы после **match**
* ctx.answer(text) - добавляет first_name к тексту
* ctx.append(text) - добавление новой строки
* ctx.apply(params) - отправка message.body