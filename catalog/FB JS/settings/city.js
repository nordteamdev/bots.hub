var city = [
{
	name: "FreeCity",
	works: [
	{
		text: "Пустая ячейка, нет работы!"
		},
     {
     	name: "Дворник",
         min_salary: 5000,
         max_salary: 7000,
         min_exp: 50,
         max_exp: 100,
         exps: 0,
         id: 1
     },
      {
     	name: "Водитель",
         min_salary: 6000,
         max_salary: 8000,
         min_exp: 100,
         max_exp: 200,
         exps: 100,
         id: 2
     },
      {
     	name: "Таксист",
         min_salary: 8000,
         max_salary: 10000,
         min_exp: 200,
         max_exp: 300,
         exps: 250,
         id: 3
     },
      {
     	name: "Продавец",
         min_salary: 10000,
         max_salary: 12000,
         min_exp: 300,
         max_exp: 400,
         exps: 500,
         id: 4
     },
      {
     	name: "Местный гопарь",
         min_salary: 15000,
         max_salary: 20000,
         min_exp: 500,
         max_exp: 700,
         exps: 1000,
         id: 5
     }
     ],
    drugs: true,
    cases: [
    {
    	name: "Бумажный",
        cost: 100,
        prizes: [
        {
        	name: "50$",
            cmd: "i.money += 50"
        	},
        {
        	name: "10$",
            cmd: "i.money += 10"
        	},
        {
        	name: "10 опыта",
            cmd: "i.level.exp += 10"
            },
         {
         	name: "Ничего",
             cmd: "",
         	},
         {
         	name: "190$",
             cmd: "i.money += 190"
         	},
         {
         	name: "120$",
             cmd: "i.money += 120"
         	},
         {
         	name: "20 опыта",
             cmd: "i.level.exp += 20"
         	}
        ],
        id: 0
    	},
    {
    	name: "На районе",
        cost: 500,
        prizes: [
        {
        	name: "5$",
            cmd: "i.money += 5"
        	},
        {
        	name: "1$",
            cmd: "i.money += 1"
        	},
        {
        	name: "Ничего",
            cmd: ""
            },
         {
         	name: "Ничего",
             cmd: "",
         	},
         {
         	name: "2500$",
             cmd: "i.money += 2500"
         	},
         {
         	name: "20$",
             cmd: "i.money += 20"
         	},
         {
         	name: "2 опыта",
             cmd: "i.level.exp += 2"
         	}
        ],
        id: 1
    	},
    {
    	name: "БЫДЛО",
        cost: 5000,
        prizes: [
        {
        	name: "Пирожок(+10 Энергии)",
            cmd: "i.energy += (i.energy <= 90) ? 10: 100-i.energy;"
        	},
        {
        	name: "1000$",
            cmd: "i.money += 1000"
        	},
        {
        	name: "9999$",
            cmd: "i.money += 9999"
            },
         {
         	name: "Ничего",
             cmd: "",
         	},
         {
         	name: "4000$",
             cmd: "i.money += 4000"
         	},
         {
         	name: "15000$",
             cmd: "i.money += 15000"
         	},
         {
         	name: "100 опыта",
             cmd: "i.level.exp += 100"
         	}
        ],
        id: 2
    	}
    ],
    text: "Город для бедняков. Развито занятие: Производство/Продажа наркотиков.",
    cost: 25000,
	id: 0
	},
{
	name: "OldTown",
	works: [
	{
		text: "Пустая ячейка, нет работы!"
		},
	 {
     	name: "Гадалка",
         min_salary: 8000,
         max_salary: 10000,
         min_exp: 100,
         max_exp: 200,
         exps: 0,
         id: 1
     },
      {
     	name: "Таксист",
         min_salary: 10000,
         max_salary: 12000,
         min_exp: 200,
         max_exp: 300,
         exps: 200,
         id: 2
     },
      {
     	name: "Продавец",
         min_salary: 12000,
         max_salary: 15000,
         min_exp: 300,
         max_exp: 400,
         exps: 400,
         id: 3
     },
      {
     	name: "Повар",
         min_salary: 15000,
         max_salary: 20000,
         min_exp: 400,
         max_exp: 500,
         exps: 700,
         id: 4
     },
      {
     	name: "Бизнесмен",
         min_salary: 20000,
         max_salary: 30000,
         min_exp: 500,
         max_exp: 600,
         exps: 1000,
         id: 5
     }
	],
	drugs: true,
	cases: [
    {
    	name: "Грозный",
        cost: 250,
        prizes: [
        {
        	name: "500$",
            cmd: "i.money += 500"
        	},
        {
        	name: "100$",
            cmd: "i.money += 100"
        	},
        {
        	name: "Яблочко(+25 энергии)",
            cmd: "i.energy += (i.energy <= 75) ? 25: 100-i.energy;"
            },
         {
         	name: "Ничего",
             cmd: "",
         	},
         {
         	name: "150$",
             cmd: "i.money += 150"
         	},
         {
         	name: "299$",
             cmd: "i.money += 299"
         	},
         {
         	name: "55 опыта",
             cmd: "i.level.exp += 55"
         	}
        ],
        id: 0
    	},
    {
    	name: "ПулЯ",
        cost: 1111,
        prizes: [
        {
        	name: "5$",
            cmd: "i.money += 5"
        	},
        {
        	name: "1$",
            cmd: "i.money += 1"
        	},
        {
        	name: "Ничего",
            cmd: ""
            },
         {
         	name: "Ничего",
             cmd: "",
         	},
         {
         	name: "4444$",
             cmd: "i.money += 4444"
         	},
         {
         	name: "2 опыта",
             cmd: "i.level.exp += 2"
         	},
         {
         	name: "100 опыта",
             cmd: "i.level.exp += 100"
         	}
        ],
        id: 1
    	},
    {
    	name: "Старый",
        cost: 10000,
        prizes: [
        {
        	name: "Пивко(+50 Энергии)",
            cmd: "i.energy += (i.energy <= 50) ? 50: 100-i.energy;"
        	},
        {
        	name: "1000$",
            cmd: "i.money += 1000"
        	},
        {
        	name: "19999$",
            cmd: "i.money += 19999"
            },
         {
         	name: "Ничего",
             cmd: "",
         	},
         {
         	name: "8000$",
             cmd: "i.money += 8000"
         	},
         {
         	name: "1 наркотик",
             cmd: "i.drugs += 1"
         	},
         {
         	name: "150 опыта",
             cmd: "i.level.exp += 150"
         	}
        ],
        id: 2
    	}
    ],
	text: "Старый город, для людей с деньгами. Наркоторговцев много.",
	cost: 50000,
	id: 1
	},
{
	name: "AnimeMP",
	works: [
	{
		text: "Пустая ячейка, нет работы!"
		},
	{
     	name: "Продавец",
         min_salary: 20000,
         max_salary: 30000,
         min_exp: 500,
         max_exp: 700,
         exps: 500,
         id: 1
     },
     {
     	name: "Бизнесмен",
         min_salary: 30000,
         max_salary: 40000,
         min_exp: 700,
         max_exp: 900,
         exps: 600,
         id: 2
     },
     {
     	name: "Администратор ТЦ",
         min_salary: 40000,
         max_salary: 50000,
         min_exp: 900,
         max_exp: 1100,
         exps: 900,
         id: 3
     },
     {
     	name: "Программист",
         min_salary: 50000,
         max_salary: 70000,
         min_exp: 1200,
         max_exp: 1500,
         exps: 1300,
         id: 4
     },
     {
     	name: "Анемешник",
         min_salary: 70000,
         max_salary: 100000,
         min_exp: 2000,
         max_exp: 5000,
         exps: 3000,
         id: 5
     }
	],
	drugs: false,
	cases: [
    {
    	name: "neW",
        cost: 1000,
        prizes: [
        {
        	name: "500$",
            cmd: "i.money += 500"
        	},
        {
        	name: "100$",
            cmd: "i.money += 100"
        	},
        {
        	name: "Медикоменты(+25 здоровья)",
            cmd: "i.hp += (i.energy <= 75) ? 25: 100-i.energy;"
            },
         {
         	name: "Ничего",
             cmd: "",
         	},
         {
         	name: "1500$",
             cmd: "i.money += 1500"
         	},
         {
         	name: "2000$",
             cmd: "i.money += 2000"
         	},
         {
         	name: "100 опыта",
             cmd: "i.level.exp += 100"
         	}
        ],
        id: 0
    	},
    {
    	name: "INFINITY",
        cost: 10000,
        prizes: [
        {
        	name: "5555$",
            cmd: "i.money += 5555"
        	},
        {
        	name: "1 биткоин",
            cmd: "i.bitcoins += 1"
        	},
        {
        	name: "1 наркотик",
            cmd: "i.drugs += 1"
            },
         {
         	name: "Ничего",
             cmd: "",
         	},
         {
         	name: "1000$",
             cmd: "i.money += 1000"
         	},
         {
         	name: "20 опыта",
             cmd: "i.level.exp += 20"
         	},
         {
         	name: "150 опыта",
             cmd: "i.level.exp += 150"
         	}
        ],
        id: 1
    	},
    {
    	name: "ANIME",
        cost: 1000000,
        prizes: [
        {
        	name: "Аниме(+100 Энергии)",
            cmd: "i.energy = 100"
        	},
        {
        	name: "543210$",
            cmd: "i.money += 543210"
        	},
        {
        	name: "100 биткоинов",
            cmd: "i.bitcoins += 100"
            },
         {
         	name: "Аниме(+100 Здоровья)",
             cmd: "i.hp = 100",
         	},
         {
         	name: "1500000$",
             cmd: "i.money += 1500000"
         	},
         {
         	name: "1000 опыта",
             cmd: "i.level.exp += 1000"
         	},
         {
         	name: "10101 опыта",
             cmd: "i.level.exp += 10101"
         	}
        ],
        id: 2
    	}
    ],
	text: "Самый крутой город, для самых топовых челиков. В городе много анемешников. Наркоторговля запрещена. Только избранные живут в этом городе.",
	cost: 1000000,
	id: 2
	},
	{
	name: "LosFingeles",
	works: [
	{
		text: "Пустая ячейка, нет работы!"
		},
	{
     	name: "Механик",
         min_salary: 20000,
         max_salary: 30000,
         min_exp: 100,
         max_exp: 200,
         exps: 0,
         id: 1
     },
     {
     	name: "Работник забегаловки",
         min_salary: 50000,
         max_salary: 60000,
         min_exp: 150,
         max_exp: 300,
         exps: 150,
         id: 2
     },
     {
     	name: "Торговец у Ашота",
         min_salary: 80000,
         max_salary: 90000,
         min_exp: 200,
         max_exp: 400,
         exps: 300,
         id: 3
     },
     {
     	name: "Пилот",
         min_salary: 100000,
         max_salary: 120000,
         min_exp: 300,
         max_exp: 600,
         exps: 450,
         id: 4
     },
     {
     	name: "Продавец ОриФлейм",
         min_salary: 120000,
         max_salary: 180000,
         min_exp: 500,
         max_exp: 1000,
         exps: 750,
         id: 5
     }
	],
	drugs: false,
	cases: [
    {
    	name: "FingelesCase",
        cost: 2500000,
        prizes: [
        {
        	name: "1.000.000$",
            cmd: "i.money += 1000000"
        	},
        {
        	name: "7.000.000$",
            cmd: "i.money += 7000000"
        	},
        {
        	name: "Лещ(+100 здоровья)",
            cmd: "i.hp = 100"
            },
         {
         	name: "Ничего",
             cmd: "",
         	},
         {
         	name: "10000000$",
             cmd: "i.money += 10000000"
         	},
         {
         	name: "250 опыта",
             cmd: "i.level.exp += 250"
         	},
         {
         	name: "45 опыта",
             cmd: "i.level.exp += 45"
         	}
        ],
        id: 0
    	}
 ],
	text: "Крутой город для жизни, добрые люди, и т.д. В городе присутствуют анимешники. Наркоторговля запрещена. Крутые челики, залетайте.",
	cost: 10000000,
	id: 3
	}
];

module.exports = {
	city
	}
