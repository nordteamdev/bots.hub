Установка
***
### NodeJS
Качаем и устанавливаем последний NodeJS с оф.сайта: https://nodejs.org/en/

### Установка модулей
```
npm install tcp-ping
npm install bugurt
npm install VK-Promise
npm install passwoid
npm install steam-web
```
И остальное, что попросит бот.

### Настройка
Открываем vk.js
Ищем строку 
```JavaScript
var token = '';
```
Переходим на сайт https://vkhost.github.io, выбираем любое приложение.
Жмем "Разрешить", после в адресной строке будет текст вида:
access_token=ТУТЕКСТ, копируем то, что после "=" и вставляем в переменную token.

### Запуск
```
cd /путьДоПапкиСБотом/
node vk.js
```
В консоли напишет какие модули надо доустановить, пишите:
```
npm install НазваниеМодуля
```
