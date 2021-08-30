updates.hear(/([^])/, (context) => {

    if (!context.isChat) {

        let task = ``
        let ans = `Упс... Я не знаю такой команды`
        if (context.text.includes(`пр`)) {
            task += `\n⠀➖ Промо [промокод]`
            task += `\n⠀➖ Профиль`
            task += `\n⠀➖ Продать [предмет]`
        }
        if (context.text.includes(`бе`)) {
            task += `\n⠀➖ Беседы`
        }
        if (context.text.includes(`ан`)) {
            task += `\n⠀➖ Анекдот`
        }
        if (context.text.includes(`пер`)) {
            task += `\n⠀➖ Переверни [фраза]`
        }
        if (context.text.includes(`ш`)) {
            task += `\n⠀➖ Шар [фраза]`
        }
        if (context.text.includes(`ин`)) {
            task += `\n⠀➖ Инфа [фраза]`
        }
        if (context.text.includes(`выб`)) {
            task += `\n⠀➖ Выбери [фраза] или [фраза2]`
        }
        if (context.text.includes(`ру`)) {
            task += `\n⠀➖ Рулетка`
        }
        if (context.text.includes(`ку`)) {
            task += `\n⠀➖ Кубик [1-6]`
        }
        if (context.text.includes(`ка`)) {
            task += `\n⠀➖ Казино [сумма]`
        }
        if (context.text.includes(`тр`)) {
            task += `\n⠀➖ Трейд [вверх/вниз] [сумма]`
        }
        if (context.text.includes(`по`)) {
            task += `\n⠀➖ Поле [сумма/1-3]`
            task += `\n⠀➖ Помощь`
        }
        if (context.text.includes(`ст`)) {
            task += `\n⠀➖ Стаканчик [1-3] [сумма]`
        }
        if (context.text.includes(`мо`)) {
            task += `\n⠀➖ Монетка [орёл/решка] [сумма]`
        }
        if (context.text.includes(`ув`)) {
            task += `\n⠀➖ Уволиться`
        }
        if (context.text.includes(`до`)) {
            task += `\n⠀➖ Донат`
        }
        if (context.text.includes(`би`)) {
            task += `\n⠀➖ Бизнес`
            task += `\n⠀➖ Бизнес нанять [кол-во]`
            task += `\n⠀➖ Бизнес снять [кол-во]`
            task += `\n⠀➖ Бизнес улучшить`
        }
        if (context.text.includes(`ре`)) {
            task += `\n⠀➖ Реши [пример]`
        }
        if (context.text.includes(`ку`)) {
            task += `\n⠀➖ Курс`
        }
        if (context.text.includes(`ба`)) {
            task += `\n⠀➖ Баланс`
            task += `\n⠀➖ Банк`
            task += `\n⠀➖ Банк помощь`
        }
        if (context.text.includes(`ре`)) {
            task += `\n⠀➖ Рейтинг`
        }
        if (context.text.includes(`ни`)) {
            task += `\n⠀➖ Ник [ник/вкл/выкл]`
        }
        if (context.text.includes(`ма`)) {
            task += `\n⠀➖ Магазин`
        }
        if (context.text.includes(`фе`)) {
            task += `\n⠀➖ Ферма`
        }
        if (context.text.includes(`пе`)) {
            task += `\n⠀➖ Передать [ID] [сумма]`
        }
        if (context.text.includes(`то`)) {
            task += `\n⠀➖ Топ`
        }
        if (context.text.includes(`бо`)) {
            task += `\n⠀➖ Бонус`
        }
        if (context.text.includes(`ва`)) {
            task += `\n⠀➖ Валюта`
        }
        if (context.text.includes(`бр`)) {
            task += `\n⠀➖ Брак [ID]`
            task += `\n⠀➖ Браки`
        }
        if (context.text.includes(`ра`)) {
            task += `\n⠀➖ Развод`
        }
        if (context.text.includes(`да`)) {
            task += `\n⠀➖ Дата [VK ID/ссылка]`
        }
        if (context.text.includes(`ме`)) {
            task += `\n⠀➖ Меню [вкл/выкл]`
        }
        if (context.text.includes(`ре`)) {
            task += `\n⠀➖ Репорт [фраза]`
        }
        if (context.text.includes(`пи`)) {
            task += `\n⠀➖ Питомцы`
        }
        if (context.text.includes(`ре`)) {
            task += `\n⠀➖ Реф`
        }
        if (task !== ``) ans += `\n▶ Возможно вы имели в виду:${task}`
        return context.send(ans)
    }
})