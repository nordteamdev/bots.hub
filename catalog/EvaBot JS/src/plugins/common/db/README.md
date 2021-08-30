# HENTA Плагин: common/db
Адаптер Sequelize для HENTA

```js
const dbPlugin = henta.getPlugin('common/db');
```

## Установка
Используйте консоль HENTA
```
p-install StandardHentaPlugins/db
```

## Настройка
Плагин настраивается в приватном конфиг файле.
```json
"database": {
  "name": "Имя БД",
  "user": "Логин",
  "pass": "Пароль",
  "options": { "foo": "Прочие настройки" }
}
```