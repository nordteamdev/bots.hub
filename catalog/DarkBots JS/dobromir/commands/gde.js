﻿const request = require("request");
const rand = require("../plugins/functions.js").rand
module.exports = {
	    r: /где ([^]+)/i,
		f: function (msg, args, vk, bot){
            var gg = rand(['Мамой клянусь', 'Ну это же очевидно', 'Вангую', 'Ясен хуй что', 'Этот(та)'])
            var smile = rand(['😆', '😉', '😌', '😂', '🤔', '😘', '😈', '😎', '😇', '❤', '💋'])
            var phrases = rand(['дома','купается в бассейне с красивыми пиздами','трахнул суку без гандона','летает в рае на широких пиздаках','в парке запускает воздушную пизду на крылатых хуях','письку шевелит','ему похуй он бухает срет в подьезд и срет в гавно он','ебется 24/7','жаждит получить пизды от Историка','танцует на шлюхе под музыку Вите надо выйти','летает на самолетных письках','катается на катере по морю пиздаков в области районных хуев','работает ганстером и сосет хуи у директора','в тюрьме дрочит пиздыы заключенных','засунул руку в глубину своей пизды','решил заняться сексом с пиздой [briancrazy228|Якимовича]','решил поесть','гоняет собак членом по двору с вонючими трусами','лесбиянит','занимается педофилимозмом','работает проституткой','на автобусе играет в хуи и ебет кондуктора','считает зарплату','бомжует','кодит','катается с горки на пизде','гоняет членом по полу айсбери','аллаху акбар нахой','письку сосет хехаю','в kfc','с моста прыгает на 228 членов негров','играет гавном в покер','говно лижет','есть десерт','завтракает','обедает','спит','негра гоняет','гомункула ростит','шалит','в бальничке','учит физику','делает уроки(ха школота)','письки смотрит','надел durex на член','катается с пизд в море членов','снимается в гей порно с 7 неграми','дрочит на трусики 9 летки','ищет порхуну на ютубе','кушает печеньки со спермой','ветером в хате сосет','хули бабки продувает','бухает с бомжами за углом','пытается насосать 100 рублей ночью','создает свой бизнес по продаже хуев','убивает бомжа','в шараге','едет в автобике','тебя щас ебут в анал','задротит в писю','зашел на pornhub','гоняет лысого','ссыт в туалете','в магните нахой','грызет ручку','в зоопарке','в кафе','гуляет по речке','роняет запад','кидает зиги','пишет хуйню','моет писю в ванночке','проебывает в казино бабки','учится сосать','на остановке ждет автобик','в садике','переходит дорогу','жопу лижет','в макдональдсе','сидит  в кинотеатре и дрочит в 1 ряду','на работе','пилит обнову на члене','задротит в кс го','играет в футбол','ебет старух у подьезда','а так письку лижет','обьебал лицо хуем','прыгает со своего мелкого члена в дыру','гоняет собак членом 5 дм','ебанит проституток','играет в сраяль','пинает хуи','целует вагину девушки','воняет очком на весь квартал','мазолит письку','играет в гандбол', 'в школе','На работе сосет хуи персонала','пьет кончу слона', 'ёбётся', 'сосет хуй','ебет собак','сосет хуй у бомжей','задротит в свой мелкий член', 'на улице', 'ебется с друзьями', 'задротит', 'сосет.............. чупа чупс', 'дрочит']);
            bot({text: gg + ", "+ args[1] +" - "+phrases + " " + smile});
        }, 
        desc:"где [имя] -- 'Определяет' где тот или иной человек",
        rights: 0,
        type: "chat"
}