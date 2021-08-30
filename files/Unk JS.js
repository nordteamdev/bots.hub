const { VK } = require('vk-io');
const vk = new VK();
const commands = [];
const request = require('prequest');
const path = require('path')
const raz = 269941112;
const rq = require("prequest");
const fs = require("fs");
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(800, 800)
const ctx = canvas.getContext('2d')
let Canvas = require('canvas');

const cars = [
	{
		name: 'Самокат',
		cost: 3000,
		id: 1
	},
	{
		name: 'Спермовозка',
		cost: 6000,
		id: 2
	},
	{
		name: 'Ржавое корыто',
		cost: 9000,
		id: 3
	},
	{
		name: 'Велосипед',
		cost: 17000,
		id: 4
	},
	{
		name: 'Гироскутер',
		cost: 45000,
		id: 5
	},
	{
		name: 'Сегвей',
		cost: 98000,
		id: 6
	},
	{
		name: 'Мопед',
		cost: 188000,
		id: 7
	},
	{
		name: 'Квадроцикл',
		cost: 309000,
		id: 8
	},
	{
		name: 'Снегоход',
		cost: 743000,
		id: 9
	},
	{
		name: 'Копейка',
		cost: 880000,
		id: 10
	},
	{
		name: 'Нива',
		cost: 1300000,
		id: 11
	},
	{
		name: 'Волга',
		cost: 3200000,
		id: 12
	},
	{
		name: 'УАЗ Patriot',
		cost: 7400000,
		id: 13
	},
	{
		name: 'ВАЗ-2105',
		cost: 16400000,
		id: 14
	},
	{
		name: 'Ford Crown Victoria',
		cost: 38500000,
		id: 15
	},
	{
		name: 'Lexus ES 350',
		cost: 52400000,
		id: 16
	},
	{
		name: 'Lada Priora',
		cost: 87100000,
		id: 17
	},
	{
		name: 'Hyundai Genesis',
		cost: 161000000,
		id: 18
	},
	{
		name: 'Lada Sedan',
		cost: 3457000000,
		id: 19
	},
	{
		name: 'Chevrolet Cruze',
		cost: 532000000,
		id: 20
	},
	{
		name: 'Honda Accord',
		cost: 645900000,
		id: 21
	},
	{
		name: 'Toyota Corolla',
		cost: 787200000,
		id: 22
	},
	{
		name: 'Chevrolet Silverado',
		cost: 997800000,
		id: 23
	},
	{
		name: 'Chevrolet Lacetti',
		cost: 1300000000,
		id: 24
	},
	{
		name: 'Toyota Tacoma',
		cost: 2300000000,
		id: 25
	},
	{
		name: 'Lada Granta',
		cost: 4800000000,
		id: 26
	},
	{
		name: 'Jeep Wrangler',
		cost: 5000000000,
		id: 27
	},
	{
		name: 'Subaru BRZ',
		cost: 13200000000,
		id: 28
	},
	{
		name: 'Kia Rio',
		cost: 27200000000,
		id: 29
	},
	{
		name: 'BMW X5',
		cost: 59400000000,
		id: 30
	},
	{
		name: 'BMW X6',
		cost: 12150000000,
		id: 31
	},
	{
		name: 'Tоуоtа FT-HS',
		cost: 34630000000,
		id: 32
	},
	{
		name: 'BMW Z4 M',
		cost: 56770000000,
		id: 33
	},
	{
		name: 'Subaru WRX STI',
		cost: 93230000000,
		id: 34
	},
	{
		name: 'SSC Tuatara',
		cost: 1400000000000,
		id: 35
	},
	{
		name: 'Porsche Cayenne',
		cost: 4700000000000,
		id: 36
	},
	{
		name: 'Vеnоm GT',
		cost: 9700000000000,
		id: 37
	},
	{
		name: 'Yаmаhа YZF R6',
		cost: 19600000000000,
		id: 38
	},
	{
		name: 'Tеslа Sеmi',
		cost: 38900000000000,
		id: 39
	},
	{
		name: 'Thrust SSС',
		cost: 67000000000000,
		id: 40
	},
	{
		name: 'Rоlls-Rоусе',
		cost: 110200000000000,
		id: 41
	},
	{
		name: 'Lotus Sirius',
		cost: 264600000000000,
		id: 42
	},
	{
		name: 'Lаmbоrghini Vеnеnо',
		cost: 347000000000000,
		id: 43
	},
	{
		name: 'Bugаtti Сhirоn',
		cost: 446700000000000,
		id: 44
	},
	{
		name: 'Tеslа Rоаdstеr',
		cost: 525400000000000,
		id: 45
	},
	{
		name: 'Fеrrаri LаFеrrаri',
		cost: 635200000000000,
		id: 46
	},
	{
		name: 'Lamborghini Aventador',
		cost: 778700000000000,
		id: 47
	},
	{
		name: 'McLaren P1',
		cost: 867200000000000,
		id: 48
	},
	{
		name: 'Kоеnigsеgg Rеgеrа',
		cost: 934200000000000,
		id: 49
	},
	{
		name: 'Bugatti Veyron 16.4 Super Sport',
		cost: 1000000000000000,
		id: 50
	},

];
const yachts = [
	{
		name: 'Деревянный плот',
		cost: 1000,
		id: 1
	},
	{
		name: 'Ванна',
		cost: 3000,
		id: 2
	},
	{
		name: 'Nаutiсаt 331',
		cost: 5000,
		id: 3
	},
	{
		name: 'Seven Seas',
		cost: 9000,
		id: 4
	},
	{
		name: 'Nоrdhаvn 56 MS',
		cost: 17000,
		id: 5
	},
	{
		name: 'Octopus',
		cost: 53000,
		id: 6
	},
	{
		name: 'Рrinсеss 60',
		cost: 232000,
		id: 7
	},
	{
		name: 'Lady Moura',
		cost: 420000,
		id: 8
	},
	{
		name: 'Аzimut 70',
		cost: 837000,
		id: 9
	},
	{
		name: 'Al Mirqab',
		cost: 1000000,
		id: 10
	},
	{
		name: 'Dоminаtоr 40M',
		cost: 3000000,
		id: 11
	},
	{
		name: 'Pelorus',
		cost: 9000000,
		id: 12
	},
	{
		name: 'Dubai',
		cost: 17000000,
		id: 13
	},
	{
		name: 'Mооnеn 124',
		cost: 38000000,
		id: 14
	},
	{
		name: 'Al Said',
		cost: 92000000,
		id: 15
	},
	{
		name: 'Widеr 150',
		cost: 256000000,
		id: 16
	},
	{
		name: 'Radiant',
		cost: 567000000,
		id: 17
	},
	{
		name: 'Palmer Jоhnsоn',
		cost: 876000000,
		id: 18
	},
	{
		name: 'Супер-яхта A',
		cost: 2000000000,
		id: 19
	},
	{
		name: 'Widеr 165',
		cost: 7000000000,
		id: 20
	},
	{
		name: 'Serene',
		cost: 21000000000,
		id: 21
	},
	{
		name: 'Есliрsе',
		cost: 33000000000,
		id: 22
	},
	{
		name: 'Topaz',
		cost: 75000000000,
		id: 23
	},
	{
		name: 'Maryah',
		cost: 100000000000,
		id: 24
	},
	{
		name: 'Azzam',
		cost: 300000000000,
		id: 25
	},
	{
		name: 'Sailing Yacht A',
		cost: 745000000000,
		id: 26
	},
	{
		name: 'Romea',
		cost: 2000000000000,
		id: 27
	},
	{
		name: 'Palladium',
		cost: 4000000000000,
		id: 28
	},
	{
		name: 'Nirvana',
		cost: 10000000000000,
		id: 29
	},
	{
		name: 'Barbara',
		cost: 34000000000000,
		id: 30
	},
	{
		name: 'Faith',
		cost: 67000000000000,
		id: 31
	},
	{
		name: 'Ecstasea',
		cost: 100000000000000,
		id: 32
	},
	{
		name: 'Project Mars',
		cost: 125000000000000,
		id: 33
	},
	{
		name: 'Luna',
		cost: 157000000000000,
		id: 34
	},
	{
		name: 'Ice',
		cost: 237000000000000,
		id: 35
	},
	{
		name: 'Anastasia',
		cost: 278000000000000,
		id: 36
	},
	{
		name: 'Maltese Falcon',
		cost: 300000000000000,
		id: 37
	},
	{
		name: 'Амброзия',
		cost: 337000000000000,
		id: 38
	},
	{
		name: 'Predator',
		cost: 372000000000000,
		id: 39
	},
	{
		name: 'Alysia',
		cost: 410000000000000,
		id: 40
	},
	{
		name: 'Eos',
		cost: 427000000000000,
		id: 41
	},
	{
		name: 'Le Grand Bleu',
		cost: 463000000000000,
		id: 42
	},
	{
		name: 'Tatoosh',
		cost: 497000000000000,
		id: 43
	},
	{
		name: 'Sailing Yacht A',
		cost: 530000000000000,
		id: 44
	},
	{
		name: 'Katara',
		cost: 574000000000000,
		id: 45
	},
	{
		name: 'Turama',
		cost: 600000000000000,
		id: 46
	},
	{
		name: 'Andromeda',
		cost: 627000000000000,
		id: 47
	},
	{
		name: 'Black Pearl',
		cost: 659000000000000,
		id: 48
	},
	{
		name: 'Areti',
		cost: 689000000000000,
		id: 49
	},
	{
		name: 'History Supreme',
		cost: 1000000000000000,
		id: 50
	}
];
const airplanes = [
	{
		name: 'Бумажный самолётик',
		cost: 1000,
		id: 1
	},
	{
		name: 'Параплан',
		cost: 3000,
		id: 2
	},
	{
		name: 'Wermetta T12',
		cost: 5000,
		id: 3
	},
	{
		name: 'АН-2',
		cost: 10000,
		id: 4
	},
	{
		name: 'Marine-Acvate',
		cost: 23700,
		id: 5
	},
	{
		name: 'Cessna-172E',
		cost: 45400,
		id: 6
	},
	{
		name: 'DBR 25',
		cost: 98100,
		id: 7
	},
	{
		name: 'Supermarine Spitfire',
		cost: 178600,
		id: 8
	},
	{
		name: 'Bollow-81',
		cost: 323900,
		id: 9
	},
	{
		name: 'BRM NG-5',
		cost: 659800,
		id: 10
	},
	{
		name: 'Zenda R310B',
		cost: 1200000,
		id: 11
	},
	{
		name: 'Cessna T210',
		cost: 2600000,
		id: 12
	},
	{
		name: 'Air-Knight DDR200',
		cost: 5300000,
		id: 13
	},
	{
		name: 'Beechcraft 1900D',
		cost: 10700000,
		id: 14
	},
	{
		name: 'Water-marine B11',
		cost: 21500000,
		id: 15
	},
	{
		name: 'Cessna 550',
		cost: 44100000,
		id: 16
	},
	{
		name: 'Mediumjet REDOK',
		cost: 86400000,
		id: 17
	},
	{
		name: 'Hawker 4000',
		cost: 176600000,
		id: 18
	},
	{
		name: 'Growh Z1',
		cost: 357200000,
		id: 19
	},
	{
		name: 'Learjet 31',
		cost: 718300000,
		id: 20
	},
	{
		name: 'SN1V1Z-AD',
		cost: 1600000000,
		id: 21
	},
	{
		name: 'Airbus A318',
		cost: 3400000000,
		id: 22
	},
	{
		name: 'T-65B X',
		cost: 6800000000,
		id: 23
	},
	{
		name: 'F-35A',
		cost: 13800000000,
		id: 24
	},
	{
		name: 'Atomic Blimp',
		cost: 28200000000,
		id: 25
	},
	{
		name: 'Buckingham Shamal',
		cost: 56700000000,
		id: 26
	},
	{
		name: 'Boeing 747 Custom',
		cost: 113300000000,
		id: 27
	},
	{
		name: 'Cargo Plane',
		cost: 224700000000,
		id: 28
	},
	{
		name: 'C-17A Globemaster III',
		cost: 452900000000,
		id: 29
	},
	{
		name: 'JoBuilt Mammatus',
		cost: 907400000000,
		id: 30
	},
	{
		name: 'F-22 Raptor',
		cost: 1400000000000,
		id: 31
	},
	{
		name: 'Western Cuban 800',
		cost: 2900000000000,
		id: 32
	},
	{
		name: 'Airbus 380 Custom',
		cost: 5700000000000,
		id: 33
	},
	{
		name: 'Western Duster',
		cost: 1170000000000,
		id: 34
	},
	{
		name: 'B-2 Spirit Stealth Bomber',
		cost: 2450000000000,
		id: 35
	},
	{
		name: 'Mammoth Dodo',
		cost: 5110000000000,
		id: 36
	},
	{
		name: 'Buckingham Vestra',
		cost: 1038000000000,
		id: 37
	},
	{
		name: 'LF-22 Starling',
		cost: 2072000000000,
		id: 38
	},
	{
		name: 'Mammoth Tula',
		cost: 2870000000000,
		id: 39
	},
	{
		name: 'P-45 Nokota',
		cost: 3321000000000,
		id: 40
	},
	{
		name: 'RM-10 Bombushka',
		cost: 4172000000000,
		id: 41
	},
	{
		name: 'V-65 Molotok',
		cost: 4659000000000,
		id: 42
	},
	{
		name: 'Junkers Ju 88-A',
		cost: 5234000000000,
		id: 43
	},
	{
		name: 'Mosquito F Mk II',
		cost: 5788000000000,
		id: 44
	},
	{
		name: 'Fokker DR1',
		cost: 6182000000000,
		id: 45
	},
	{
		name: 'Lockheed C-5',
		cost: 6873000000000,
		id: 46
	},
	{
		name: 'Hughes H-4',
		cost: 7423000000000,
		id: 47
	},
	{
		name: 'Voss BV 238',
		cost: 8236000000000,
		id: 48
	},
	{
		name: 'Р-8А Poseidon',
		cost: 9278000000000,
		id: 49
	},
	{
		name: 'B-11 Strikeforce',
		cost: 1000000000000000,
		id: 50
	}
];
const helicopters = [
	{
		name: 'Шарик с пропеллером',
		cost: 1000,
		id: 1
	},
	{
		name: 'RotorWay Exec 162F',
		cost: 3000,
		id: 2
	},
	{
		name: 'Mi-26',
		cost: 5000,
		id: 3
	},
	{
		name: 'Robinson R44',
		cost: 12000,
		id: 4
	},
	{
		name: 'Westland Lynx',
		cost: 25000,
		id: 5
	},
	{
		name: 'Hiller UH-12C',
		cost: 57800,
		id: 6
	},
	{
		name: 'Boeing CH-47',
		cost: 128200,
		id: 7
	},
	{
		name: 'AW119 Koala',
		cost: 264500,
		id: 8
	},
	{
		name: 'Bell AH-1',
		cost: 578900,
		id: 9
	},
	{
		name: 'MBB BK 117',
		cost: 1200000,
		id: 10
	},
	{
		name: 'Hind',
		cost: 2700000,
		id: 11
	},
	{
		name: 'Eurocopter EC130',
		cost: 6300000,
		id: 12
	},
	{
		name: 'Sikorsky CH-53E',
		cost: 14200000,
		id: 13
	},
	{
		name: 'Leonardo AW109 Power',
		cost: 42800000,
		id: 14
	},
	{
		name: 'Bell UH-1',
		cost: 97400000,
		id: 15
	},
	{
		name: 'Sikorsky S-76',
		cost: 195800000,
		id: 16
	},
	{
		name: 'Mi-8TV',
		cost: 391600000,
		id: 17
	},
	{
		name: 'Bell 429WLG',
		cost: 783200000,
		id: 18
	},
	{
		name: 'Buckingham Maverick',
		cost: 1700000000,
		id: 19
	},
	{
		name: 'NHI NH90',
		cost: 3200000000,
		id: 20
	},
	{
		name: 'Kazan Mi-35M',
		cost: 6700000000,
		id: 21
	},
	{
		name: 'Bell V-22 Osprey',
		cost: 13600000000,
		id: 22
	},
	{
		name: 'Buckingham Maverick',
		cost: 27200000000,
		id: 23
	},
	{
		name: 'HVY Skylift',
		cost: 47300000000,
		id: 24
	},
	{
		name: 'Maibatsu Frogger',
		cost: 94700000000,
		id: 25
	},
	{
		name: 'Nagasaki Buzzard',
		cost: 129500000000,
		id: 26
	},
	{
		name: 'Western Annihilator',
		cost: 363400000000,
		id: 27
	},
	{
		name: 'Western Cargobob',
		cost: 627400000000,
		id: 28
	},
	{
		name: 'Buckingham Swift',
		cost: 874200000000,
		id: 29
	},
	{
		name: 'Savage',
		cost: 967800000000,
		id: 30
	},
	{
		name: 'Buckingham Valkyrie',
		cost: 1800000000000,
		id: 31
	},
	{
		name: 'FH-1 Hunter',
		cost: 2900000000000,
		id: 32
	},
	{
		name: 'Buckingham Swift Deluxe',
		cost: 4700000000000,
		id: 33
	},
	{
		name: 'SuperVolito Carbon',
		cost: 6200000000000,
		id: 34
	},
	{
		name: 'Nagasaki Havok',
		cost: 9700000000000,
		id: 35
	},
	{
		name: 'Sea Sparrow',
		cost: 18400000000000,
		id: 36
	},
	{
		name: 'Buckingham The Akula',
		cost: 34300000000000,
		id: 37
	},
	{
		name: 'Mammoth Avenger',
		cost: 67200000000000,
		id: 38
	},
	{
		name: 'FH-12 Bizero',
		cost: 92700000000000,
		id: 39
	},
	{
		name: 'Helicopter Killer',
		cost: 137700000000000,
		id: 40
	},
	{
		name: 'Leonardo F130',
		cost: 224300000000000,
		id: 41
	},
	{
		name: 'AH-1Z Viper',
		cost: 267600000000000,
		id: 42
	},
	{
		name: 'UH-1 Iroquois',
		cost: 327200000000000,
		id: 43
	},
	{
		name: 'AH-1G HueyCobra',
		cost: 423900000000000,
		id: 44
	},
	{
		name: 'CH-46 Sea Knight',
		cost: 557100000000000,
		id: 45
	},
	{
		name: 'Denel AH-2 Rooivalk',
		cost: 658800000000000,
		id: 46
	},
	{
		name: 'Fairey Rotodyne',
		cost: 711200000000000,
		id: 47
	},
	{
		name: 'Light Combat Helicopter',
		cost: 877100000000000,
		id: 48
	},
	{
		name: 'Boeing AH-64 «Apache»',
		cost: 992400000000000,
		id: 49
	},
	{
		name: 'Sikorsky UH-60 «Black Hawk»',
		cost: 1000000000000000,
		id: 50
	}
];

const homes = [
	{
		name: 'Коробка из-под холодильника',
		cost: 250,
		id: 1
	},
	{
		name: 'Подвал',
		cost: 3000,
		id: 2
	},
	{
		name: 'Палатка',
		cost: 3500,
		id: 3
	},
	{
		name: 'Домик на дереве',
		cost: 5000,
		id: 4
	},
	{
		name: 'Полуразрушенный дом',
		cost: 10000,
		id: 5
	},
	{
		name: 'Дом в лесу',
		cost: 25000,
		id: 6
	},
	{
		name: 'Деревянный дом',
		cost: 37500,
		id: 7
	},
	{
		name: 'Дача',
		cost: 125000,
		id: 8
	},
	{
		name: 'Кирпичный дом',
		cost: 80000,
		id: 9
	},
	{
		name: 'Коттедж',
		cost: 450000,
		id: 10
	},
	{
		name: 'Особняк',
		cost: 1250000,
		id: 11
	},
	{
		name: 'Дом на Рублёвке',
		cost: 5000000,
		id: 12
	},
	{
		name: 'Личный небоскрёб',
		cost: 7000000,
		id: 13
	},
	{
		name: 'Остров с особняком',
		cost: 12500000,
		id: 14
	},
	{
		name: 'Белый дом',
		cost: 20000000,
		id: 15
	}
];

const apartments = [
	{
		name: 'Чердак',
		cost: 15000,
		id: 1
	},
	{
		name: 'Квартира в общежитии',
		cost: 55000,
		id: 2
	},
	{
		name: 'Однокомнатная квартира',
		cost: 175000,
		id: 3
	},
	{
		name: 'Двухкомнатная квартира',
		cost: 260000,
		id: 4
	},
	{
		name: 'Четырехкомнатная квартира',
		cost: 500000,
		id: 5
	},
	{
		name: 'Квартира в центре Москвы',
		cost: 1600000,
		id: 6
	},
	{
		name: 'Двухуровневая квартира',
		cost: 4000000,
		id: 7
	},
	{
		name: 'Квартира с Евроремонтом',
		cost: 6000000,
		id: 8
	}
];

const phones = [
	{
		name: 'Nokia 108',
		cost: 250,
		id: 1
	},
	{
		name: 'Nokia 3310 (2017)',
		cost: 500,
		id: 2
	},
	{
		name: 'ASUS ZenFone 4',
		cost: 2000,
		id: 3
	},
	{
		name: 'BQ Aquaris X',
		cost: 10000,
		id: 4
	},
	{
		name: 'Sony Xperia XA',
		cost: 15000,
		id: 5
	},
	{
		name: 'Samsung Galaxy S8',
		cost: 30000,
		id: 6
	},
	{
		name: 'Xiaomi Mi Mix',
		cost: 50000,
		id: 7
	},
	{
		name: 'Torex FS1',
		cost: 75000,
		id: 8
	},
	{
		name: 'iPhone X',
		cost: 100000,
		id: 9
	},
	{
		name: 'Мегафон С1',
		cost: 250000,
		id: 10
	}
];
const lic = [
		{			
		smile: '✅',
		cost: 5000,
		id: 1
	},	
	{
		smile: '✅',
		cost: 7000,
		id: 2
	},	
	{
		smile: '✅',
		cost: 10000,
		id: 3
	}
		
];
const pets = [
	{
		name: 'Улитка',
		smile: '🐌',
		cost: 1000,
		min: 100,
		max: 200,
		id: 1
	},
	{
		name: 'Гусеница',
		smile: '🐛',
		cost: 4000,
		min: 250,
		max: 525,
		id: 2
	},
	{
		name: 'Черепаха',
		smile: '🐢',
		cost: 19000,
		min: 1000,
		max: 1750,
		id: 3
	},
	{
		name: 'Хомяк',
		smile: '🐹',
		cost: 49000,
		min: 4750,
		max: 5550,
		id: 4
	},
	{
		name: 'Летучая мышь',
		smile: '🦇',
		cost: 105000,
		min: 6000,
		max: 8250,
		id: 5
	},
	{
		name: 'Золотая рыбка',
		smile: '🐠',
		cost: 235000,
		min: 10000,
		max: 11250,
		id: 6
	},
	{
		name: 'Шиншилла',
		smile: '🐭',
		cost: 600000,
		min: 22500,
		max: 25000,
		id: 7
	},
	{
		name: 'Цыплёнок',
		smile: '🐥',
		cost: 1367000,
		min: 50000,
		max: 54750,
		id: 8
	},
	{
		name: 'Пингвин',
		smile: '🐧',
		cost: 3467000,
		min: 100000,
		max: 175000,
		id: 9
	},
	{
		name: 'Утка',
		smile: '🦆',
		cost: 8425000,
		min: 500000,
		max: 750000,
		id: 10
	},
	{
		name: 'Попугай',
		smile: '🐦',
		cost: 18800000,
		min: 1000000,
		max: 1500000,
		id: 11
	},
	{
		name: 'Хамелеон',
		smile: '🦎',
		cost: 52000000,
		min: 2750000,
		max: 3000000,
		id: 12
	},
	{
		name: 'Заяц',
		smile: '🐰',
		cost: 187220000,
		min: 5000000,
		max: 5750000,
		id: 13
	},
	{
		name: 'Белка',
		smile: '🐿',
		cost: 423440000,
		min: 15000000,
		max: 18750000,
		id: 14
	},
	{
		name: 'Кот',
		smile: '🐈',
		cost: 934000000,
		min: 23750000,
		max: 25000000,
		id: 15
	},
	{
		name: 'Пчела',
		smile: '🐝',
		cost: 2137000000,
		min: 125500000,
		max: 147500000,
		id: 16
	},
	{
		name: 'Сова',
		smile: '🦉',
		cost: 5000000000,
		min: 200000000,
		max: 215750000,
		id: 17
	},
	{
		name: 'Собака',
		smile: '🐕',
		cost: 13880000000,
		min: 500000000,
		max: 515000000,
		id: 18
	},
	{
		name: 'Осьминог',
		smile: '🐙',
		cost: 43230000000,
		min: 850000000,
		max: 875000000,
		id: 19
	},
	{
		name: 'Панда',
		smile: '🐼',
		cost: 94000000000,
		min: 1000000000,
		max: 1150000000,
		id: 20
	},
	{
		name: 'Коала',
		smile: '🐨',
		cost: 204000000000,
		min: 1500000000,
		max: 1625000000,
		id: 21
	},
	{
		name: 'Ястреб',
		smile: '🦅',
		cost: 630000000000,
		min: 2500000000,
		max: 2670000000,
		id: 22
	},
	{
		name: 'Тигр',
		smile: '🐯',
		cost: 2220000000000,
		min: 100000000000,
		max: 115000000000,
		id: 23
	},
	{
		name: 'Чебурашка',
		smile: '😁',
		cost: 3000000000000,
		min: 200000000000,
		max: 250000000000,
		id: 24
	},
	{
		name: 'Слон',
		smile: '🐘',
		cost: 5000000000000,
		min: 50000,
		max: 54750,
		id: 25
	},
	{
		name: 'Динозавр',
		smile: '🦖',
		cost: 10000000000000,
		min: 500000000000,
		max: 525000000000,
		id: 26
	},
	{
		name: 'Корона Вирус',
		smile: '🧬',
		cost: 20000000000000,
		min: 500000000000,
		max: 525000000000,
		id: 27
	}
];
const farms = [
	{
		name: 'Nvidia GeForce GTX 1050 Ti',
		cost: 10000000,
		id: 1
	},
	{
		name: 'GeForce GTX1060 Palit',
		cost: 100000000,
		id: 2
	},
	{
		name: 'Radeon RX 470 Sapphire',
		cost: 500000000,
		id: 3
	},
	{
		name: 'Radeon RX Vega 64',
		cost: 900000000,
		id: 4
	},
	{
		name: 'AMD Radeon RX 580 8gb',
		cost: 2000000000,
		id: 5
	},
	{
		name: 'GeForce GTX1070',
		cost: 6000000000,
		id: 6
	},
	{
		name: 'Radeon R9 Fury X',
		cost: 12000000000,
		id: 7
	},
	{
		name: 'Radeon RX 480 Power',
		cost: 30000000000,
		id: 8
	},
	{
		name: 'MSI Geforce GTX 1080 Ti 11Gb',
		cost: 80000000000,
		id: 9
	}
];

const businesses = [
	{
		name: 'Шаурмичная',
		cost: 50000,
		earn: 400,
		id: 1,
		icon: '🥖'
	},
	{
		name: 'Ларёк',
		cost: 10000,
		earn: 700,
		id: 2,
		icon: '🏪'
	},
	{
		name: 'Ресторан',
		cost: 300000,
		earn: 2500,
		id: 3,
		icon: '🍷'
	},
	{
		name: 'Магазин',
		cost: 500000,
		earn: 3800,
		id: 4,
		icon: '🏫'
	},
	{
		name: 'Завод',
		cost: 1500000,
		earn: 8000,
		id: 5,
		icon: '🏭'
	},
	{
		name: 'Шахта',
		cost: 25000000,
		earn: 70000,
		id: 6,
		icon: '⛏'
	},
	{
		name: 'Офис',
		cost: 80000000,
		earn: 220000,
		id: 7,
		icon: '🏢'
	},
	{
		name: 'Разработка игр',
		cost: 150000000,
		earn: 300000,
		id: 8,
		icon: '🕹'
	},
	{
		name: 'Нефтевышка',
		cost: 500000000,
		earn: 700000,
		id: 9,
		icon: '🏜'
	},
	{
		name: 'Атомная электростанция',
		cost: 800000000,
		earn: 1000000,
		id: 10,
		icon: '💡'
	},
	{
		name: 'Космическое агентство',
		cost: 50000000000,
		earn: 50000000,
		id: 11,
		icon: '🗺'
	}
];

const works = [
	{
		name: 'Сдача бутылок',
		requiredLevel: 1,
		icon: '🍾',
		min: 2250,
		max: 4500,
		id: 1
	},
	{
		name: 'Чистильщик ботинок',
		requiredLevel: 3,
		icon: '👞',
		min: 4650,
		max: 9300,
		id: 2
	},
	{
		name: 'Дворник',
		requiredLevel: 5,
		icon: '👴🏻',
		min: 8750,
		max: 17500,
		id: 3
	},
	{
		name: 'Подопытный',
		requiredLevel: 8,
		icon: '🔬',
		min: 11000,
		max: 22000,
		id: 4
	},
	{
		name: 'Раздача листовок',
		requiredLevel: 10,
		icon: '🗞',
		min: 18500,
		max: 37000,
		id: 5
	},
	{
		name: 'Сантехник',
		requiredLevel: 14,
		icon: '🔧',
		min: 24000,
		max: 48000,
		id: 6
	},
	{
		name: 'Слесарь',
		requiredLevel: 22,
		icon: '⚒',
		min: 34000,
		max: 68000,
		id: 7
	},
	{
		name: 'Электрик',
		requiredLevel: 25,
		icon: '⚡',
		min: 47500,
		max: 95000,
		id: 8
	},
	{
		name: 'Работник завода',
		requiredLevel: 49,
		icon: '🏭',
		min: 99000,
		max: 198000,
		id: 9
	},
	{
		name: 'Медик',
		requiredLevel: 56,
		icon: '💉',
		min: 189000,
		max: 378000,
		id: 10
	},
	{
		name: 'Юрист',
		requiredLevel: 62,
		icon: '👨‍💼',
		min: 342500,
		max: 685000,
		id: 11
	},
	{
		name: 'Гинеколог',
		requiredLevel: 65,
		icon: '🏥',
		min: 469000,
		max: 938000,
		id: 12
	},
	{
		name: 'Бухгалтер',
		requiredLevel: 69,
		icon: '💁‍♂',
		min: 1275000,
		max: 2550000,
		id: 13
	},
	{
		name: 'Адвокат',
		requiredLevel: 76,
		icon: '🙏',
		min: 2650000,
		max: 5300000,
		id: 14
	},
	{
		name: 'Судья',
		requiredLevel: 86,
		icon: '👨‍⚖',
		min: 6000000,
		max: 12000000,
		id: 15
	},
	{
		name: 'Курьер Яндекс Еды',
		requiredLevel: 99,
		icon: '📦',
		min: 18500000,
		max: 37000000,
		id: 16
	},
	{
		name: 'Маникюрщица',
		requiredLevel: 115,
		icon: '💅🏻',
		min: 39500000,
		max: 78700000,
		id: 17
	},
	{
		name: 'Бармен',
		requiredLevel: 136,
		icon: '🥂',
		min: 112500000,
		max: 225000000,
		id: 18
	},
	{
		name: 'Стилист',
		requiredLevel: 160,
		icon: '💇‍♂',
		min: 178750000,
		max: 357700000,
		id: 19
	},
	{
		name: 'Дизайнер',
		requiredLevel: 167,
		icon: '👩‍🎨',
		min: 313500000,
		max: 627000000,
		id: 20
	},
	{
		name: 'Стриптизер',
		requiredLevel: 173,
		icon: '🕺',
		min: 713500000,
		max: 1427000000,
		id: 21
	},
	{
		name: 'FBI',
		requiredLevel: 193,
		icon: '👮‍♂',
		min: 1950000000,
		max: 3900000000,
		id: 22
	},
	{
		name: 'Модель',
		requiredLevel: 265,
		icon: '💃',
		min: 4450000000,
		max: 8960000000,
		id: 23
	},
	{
		name: 'Рэпер',
		requiredLevel: 290,
		icon: '🎤',
		min: 9000000000,
		max: 18000000000,
		id: 24
	},
	{
		name: 'Администратор',
		icon: '🤵',
		requiredLevel: 306,
		min: 24000000000,
		max: 48000000000,
		id: 25
	},
	{
		name: 'Видеоблогер',
		requiredLevel: 365,
		icon: '📹',
		min: 47700000000,
		max: 97400000000,
		id: 26
	},
	{
		name: 'Дегустатор',
		requiredLevel: 405,
		icon: '🍷',
		min: 63500000000,
		max: 127000000000,
		id: 27
	},
	{
		name: 'Программист',
		requiredLevel: 480,
		icon: '👨🏻‍💻',
		min: 77000000000,
		max: 154000000000,
		id: 28
	},
	{
		name: 'Трейдер',
		requiredLevel: 500,
		icon: '💹',
		min: 119000000000,
		max: 238000000000,
		id: 29
	},
	{
		name: 'Банкир',
		requiredLevel: 510,
		icon: '🏦',
		min: 181500000000,
		max: 363000000000,
		id: 30
	},
	{
		name: 'Космонавт',
		requiredLevel: 550,
		icon: '👨‍🚀',
		min: 369000000000,
		max: 738000000000,
		id: 31
	},
	{
		name: 'Президент Российской Федерации',
		requiredLevel: 625,
		icon: '👑',
		min: 1000000000000,
		max: 2000000000000,
		id: 32
	}
];

const utils = {
	sp: (int) => {
		int = int.toString()
		return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join('.').split('').reverse().join('');
	},
	rn: (int, fixed) => {
		if (int === null) return null;
		if (int === 0) return '0';
		fixed = (!fixed || fixed < 0) ? 0 : fixed;
		let b = (int).toPrecision(2).split('e'),
			k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3),
			c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed),
			d = c < 0 ? c : Math.abs(c),
			e = d + ['', ' тыс', ' млн', ' млрд', ' трлн'][k];

			e = e.replace(/e/g, '');
			e = e.replace(/\+/g, '');
			e = e.replace(/Infinity/g, 'ДОХЕРА');

		return e;
	},
	gi: (int) => {
		int = int.toString();

		let text = ``;
		for (let i = 0; i < int.length; i++)
		{
			text += `${int[i]}&#8419;`;
		}

		return text;
	},
	decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] },
	random: (x, y) => {
		return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
	},
	pick: (array) => {
		return array[utils.random(array.length - 1)];
	}
}

let promo = "0";
let dlr = 63

const rotateText = {
	q: 'q',
	w: 'ʍ',
	e: 'ǝ',
	r: 'ɹ',
	t: 'ʇ',
	y: 'ʎ',
	u: 'u',
	i: 'ᴉ',
	o: 'o',
	p: 'p',
	a: 'ɐ',
	s: 's',
	d: 'd',
	f: 'ɟ',
	g: 'ƃ',
	h: 'ɥ',
	j: 'ɾ',
	k: 'ʞ',
	l: 'l',
	z: 'z',
	x: 'x',
	c: 'ɔ',
	v: 'ʌ',
	b: 'b',
	n: 'n',
	m: 'ɯ',

	й: 'ņ',
	ц: 'ǹ',
	у: 'ʎ',
	к: 'ʞ',
	е: 'ǝ',
	н: 'н',
	г: 'ɹ',
	ш: 'm',
	щ: 'm',
	з: 'ε',
	х: 'х',
	ъ: 'q',
	ф: 'ф',
	ы: 'ıq',
	в: 'ʚ',
	а: 'ɐ',
	п: 'u',
	р: 'd',
	о: 'о',
	л: 'v',
	д: 'ɓ',
	ж: 'ж',
	э: 'є',
	я: 'ʁ',
	ч: 'һ',
	с: 'ɔ',
	м: 'w',
	и: 'и',
	т: 'ɯ',
	ь: 'q',
	б: 'ƍ',
	ю: 'oı'
}
let smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);

let users = require('./database/users.json');
let config = require('./database/settings.json');
let clans = require('./database/clans.json');
let botinfo = require('./database/botinfo.json')
let buttons = [];

let giving = false

setInterval(async () => {

smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`, `😩`, `😨`, `😰`, `😐`, `😟`, `😣`, `😖`, `😓`, `😪`, `🤕`, `😿`, `😾`, `☹`, `🙁`]);
smilesuccess = utils.pick([`😯`, `🙂`, `🤑`, `☺`]);

}, 1);

async function saveUsers()
{
	require('fs').writeFileSync('./database/users.json', JSON.stringify(users, null, '\t'));
	return true;
}

async function saveConfig()
{
	require('fs').writeFileSync('./database/settings.json', JSON.stringify(config, null, '\t'));
	return true;
}

vk.setOptions({ token: config.grouptoken, pollingGroupId: config.groupid });
const { updates, snippets } = vk;

updates.startPolling();

updates.on(`new_wall_comment`, async (message) => {
    if(Number(message.userId) <= 0) return;
    let user = users.find(x=> x.id === message.userId)
    if(!user) return
    if(user.ban_time < getUnix()){
    if(message.text == `бонус`){if(user.bonuscomment_t > getUnix()){return vk.api.call("wall.createComment", {
        owner_id: message.ownerId,
        post_id: message.objectId,
        reply_to_comment: message.id,
        message: `🔥 Вы сможете получить бонус через ${unixStampLeft(user.bonuscomment_t - getUnix())}`
    });}}
   	if(user.bonuscomment_t < getUnix()){
   	let rand = utils.random(100000000, 700000000)
   	let a = 0
   	if(user.vip === true & user.premium === false) a += utils.random(50000000, 60000000)
   	if(user.vip === false & user.premium === true) a += utils.random(100000000, 120000000)
   	if(user.vip === true & user.premium === true) a += utils.random(150000000, 170000000)
   	user.rub += (rand + a)
   	user.bonuscomment_t = getUnix() + (60000*60*4)
    return vk.api.call("wall.createComment", {
        owner_id: message.ownerId,
        post_id: message.objectId,
        reply_to_comment: message.id,
        message: `✅ ${name(user.uid)}, вы получили бонус за комментарий! (${utils.sp(rand)}₽${a !== 0 ? ` + ${utils.sp(a)}₽` : ``})`
    });
 	}
 }
});

updates.on('message', async (message) => {
	if(Number(message.senderId) <= 0) return;
	if(/\[club188608231\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club188608231\|(.*)\]/ig, '').trim();
	if(message.chatId === 1){
		let user = users.find(x=> x.id === message.senderId)
		let [user_info] = await vk.api.users.get({user_id: message.senderId})
		if(!user){
			vk.api.call("messages.removeChatUser", {chat_id: 1, user_id: message.senderId })
			vk.api.messages.send({ chat_id: 1, message: `Пользователь ${user_info.first_name} ${user_info.last_name} был исключён из беседы так как не являлся администратором.` })
			return
		}
		if(user.settings.adm === 0){
			vk.api.call("messages.removeChatUser", {chat_id: 1, user_id: message.senderId })
			vk.api.messages.send({ chat_id: 1, message: `Пользователь ${user_info.first_name} ${user_info.last_name} был исключён из беседы так как не являлся администратором.` })
			return
		}
	}
		//if(user.settings.adm !== 0) vk.api.messages.send({ chat_id: 1, message: `${namee(message.user.uid)} добро пожаловать в беседу администрации!
//⚠ Ознакомьтесь с правилами указанные в закреплённом сообщении, чтобы не получить снятие с поста/блокировку/выговор.
// 📚 Узнать свою статистику - команда «стата», удачи!` })
	//}
	//if(users[1].slejkab){ if(message.chatId === users[1].slejkabn){ vk.api.messages.send({ peer_id: raz, message: `Обнаружено действие в беседе №${users[1].slejkabn}\n-> ${message.text} (vk.com/id${message.senderId})` }) } }
	if(!users.find(x=> x.id === message.senderId)) {
		const [user_info] = await vk.api.users.get({ user_id: message.senderId });
		const date = new Date();

		users.push({
			id: message.senderId,
			uid: users.length,
			rub: 10000,
			bank: 0,
			btc: 0,
			farm_btc: 0,
			farms: 0,
			farmslimit: 3000,
			energy: 10,
			opit: 0,
			biz: 0,
			zhelezo: 0,
			zoloto: 0,
			almaz: 0,
			bizlvl: 0,
			nicklimit: 16,
			rating: 0,
			timeReg: timereg(),
			mention: true,
			ban: false,
			permban: false,
			obnuld: false,
			protectban: false,
			ban_time: 0,
			sn_time: 0,
			betatest: false,
			fakep: false,
			faked: false,
			ban_t: 0,
			banklimit: 500000000000,
			klan: false,
			limit: 100000000000,
			warn: 0,
			serebro: 0,
			rubin: 0,
			msg: 0,
			check: false,
			attempt: 0,
			color: false,
			pin: 1111,
			kbana: 0,
			rass: true,
			dcheck: false,
			lim_v: 300000000000,
			sapfir: 0,
			limit_t: 1,
			otvets: 0,
			ban_t: 0,
			ban_l: false,
			report: true,
			vip: false,
			case1: 0,
			case2: 0,
			vef: false,
			bans: 0,
			razbans: 0,
			brs: 0,
			rrs: 0,
			getbans: 0,
			reports: 0,
			premium: false,
			ban_ttime: ``,
			donate: 0,
			banst: 2,
			razbanst: 2,
			logp: ``,
			bezr: false,
			useraz: true,
			useban: true,
			razprotect: false,
			timebrak: 0,
			chill: 0,
			timepit: 0,
			online: true,
			give: false,
			prefix: false,
			protectraz: false,
			timereport: 0,
			dotvet: false,
			daiadm: false,
			daiadm_l: 1,
			bonuscomment: false,
			bonuscomment_t: 0,
			timeraz: 0,
			banday: 0,
			watch: false,
			watcher: null,
			bezb: false,
			tokenqiwi: ``,
			razdacha: false,
			timekaz: 0,
			limit_res: 100000000000,
			sex_t: 0,
			protects: 0,
			limit_time: 0,
			timers: {
				hasWorked: false,
				bonus: false,
				poxod: false,
				poxod2: false,
				kopat: false,
				hack: false,
				bonus_time: 0,
				hasWorked_t: 0,
				poxod_t: 0,
			},
			tag: user_info.first_name,
			work: 0,
			business: 0,
			notifications: true,
			exp: 1,
			level: 1,
			referal: null,
			promo: false,
			transport: {
				car: 0,
				yacht: 0,
				airplane: 0,
				helicopter: 0
			},
			realty: {
				home: 0,
				apartment: 0
			},
			misc: {
				phone: 0,
				farm: 0,
				pet: 0,
			},
			settings: {
				firstmsg: true,
				adm: 0,
				trade: true,
				old: false,
				limit: 1000000,
			},
			pet: {
				lvl: 0,
				poterl: false,
				eda: 100,
				play: 100,
				hp: 100,
				name: false
			},
			marriage: {
				partner: 0,
				requests: []
			}
		});
		saveUsers();
	}

	message.user = users.find(x=> x.id === message.senderId);
	if(message.user.banproject === true & message.isChat == true){
	vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: message.senderId })
	vk.api.messages.send({ chat_id: message.chatId, message: `Пользователь был исключён из беседы так как находиться в чёрном списке проекта.` })
	return
	}
	if(message.user.check === true){
		let user = message.user
		if(Number(message.text) === Number(user.pin)){
			user.check = false
			return message.send(`✅ Вы ввели верный пин-код! Вы можете продолжить игру.`)
		}
		if(Number(message.text) !== Number(user.pin)){
			let user = message.user
			user.attempt -= 1
			if(user.attempt === 0){
				user.kbana += 1
				if(user.kbana === 3){
					user.permban = true
					user.check = false
					user.attempt = 0
					user.color = false
					user.pin = 1111
					return message.send(`Вы заблокированы навсегда так как получали бан за авто-постинг 3 раза.`)
				}
				let srok = 60000*60*24*7
				user.ban_time = srok + getUnix()
				user.ban_ttime = dateban(srok + Date.now())
				user.check = false
				user.attempt = 0
				user.color = false
				user.pin = 1111
				return message.send(`Вы 5 раз ввели неверное число. Вы заблокированы на 7 дней.`)
			}
			return message.send(`Вы ввели неверный код! У вас осталось ${user.attempt} попыток! ${smileerror}\nВнимание! Если вы введёте пин-код не верно ${user.attempt} раз, то вы будете заблокированы! Будьте внимательны!`)
		}
	}
	// message.klan = klans.find(x=> x.id === message.user.klan)

	const bot = (text, params) => {
		if(utils.pick([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]) === 1){
			if(users[1].repost === true){
				if(message.chatId){
					vk.api.messages.send({chat_id: message.chatId, message: `${users[1].reptext}`, attachment: 'wall-188608231_' + users[1].repnum})
				}
				if(!message.chatId){
					vk.api.messages.send({peer_id: message.senderId, message: `${users[1].reptext}`, attachment: 'wall-188608231_' + users[1].repnum})
				}
			}
		}
		return message.send(`${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, ${text}`, params);
	}
	const command = commands.find(x=> x[0].test(message.text));
	if(message.user.settings.firstmsg)
	{

bot(`привет, рад видеть тебя! 💪🏻\n👺 Перед началом игры ознакомься с сводом правил, в ином случае ты можешь получить блокировку!\nСсылка: https://vk.com/topic-191399146_40051900`)
bot(`чтобы узнать полный список команд напиши <<помощь>> без кавычек! Удачи!`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `помощь`
},
"color": "positive"
}
]
]
})
})

		message.user.settings.firstmsg = false;


		saveUsers();
		return;

	}

	if(!command)
	{

		if(!message.isChat) return bot(`такой команды не существует, отправь «помощь» чтобы узнать мои команды. ${smileerror}`);
		if(message.isChat) return;

	}
	if(message.user.exp >= 24)
	{
		message.user.exp = 1;
		message.user.level += 1;
	}
	if(message.user.lim_v === 0){if(message.user.give === true){message.user.give = false}}
	if(message.user.ban_time > getUnix()) return bot(`вы заблокированы! Вы будете разблокированы через ${unixStampLeft(message.user.ban_time - getUnix())} ${smileerror}`)
	if(message.user.permban) return bot(`вы заблокированы навсегда! ${smileerror}`);
	if(message.user.banproject) return
    if(message.user.energy < 0) message.user.energy = 0
    message.user.msg += 1
    message.user.online = true
    if(message.user.msg >= 300){
    	message.user.msg = 0
    	message.user.color = utils.pick([1, 2, 3, 4, 5, 6])
    	message.user.attempt = 5
    	let a = generate_n(6)
    	let b = generate_n(6)
    	let v = generate_n(6)
    	let g = generate_n(6)
    	let d = generate_n(6)
    	let e = generate_n(6)
    	let pin = 0
    	if(message.user.color == 1) pin += a
    	if(message.user.color == 2) pin += b
    	if(message.user.color == 3) pin += v
    	if(message.user.color == 4) pin += g
    	if(message.user.color == 5) pin += d
    	if(message.user.color == 6) pin += e
    	message.user.pin = Number(pin)
    	const { createCanvas, loadImage } = require('canvas');
		const canvas = createCanvas(1776, 1500);
		const ctx = canvas.getContext('2d');
		const Image = Canvas.Image;
		const img = new Image();
		img.src = 'mrak.jpg';
		ctx.drawImage(img, 0, 0);
		ctx.fillStyle = "#FFFFFF";
		ctx.font = 'bold 140px Arial';
		ctx.fillStyle = "#000000";
		ctx.fillText(`\n\n${a}`, 580, 250)
		ctx.fillStyle = "#FF0000"
		ctx.fillText(`\n\n\n${b}`, 580, 250)
		ctx.fillStyle = "#0000FF"
		ctx.fillText(`\n\n\n\n${v}`, 580, 250)
		ctx.fillStyle = "#FFFF00"
		ctx.fillText(`\n\n\n\n\n${g}`, 580, 250)
		ctx.fillStyle = "#00FF00"
		ctx.fillText(`\n\n\n\n\n\n${d}`, 580, 250)
		ctx.fillStyle = "#8B00FF"
		ctx.fillText(`\n\n\n\n\n\n\n${e}`, 580, 250)
		let [user_info] = await vk.api.users.get({ user_id: message.senderId })
		ctx.fillText(`\n\n\n\n\n\n\n\n\n\n\n\n\n\nПроверка для пользователя ${user_info.first_name} ${user_info.last_name}`)
		const attachment = await vk.upload.messagePhoto({
				peer_id: raz,
				source: canvas.toBuffer()
		});
		message.isChat ? vk.api.messages.send({ chat_id: message.chatId, message: `*id${message.senderId}(${message.user.tag}), на вас была включена проверка от Авто-Постинга!\nВам даётся 5 попыток, если вы 5 раз введёте неверное число - вы будете заблокированы на 7 дней.\n‼ Вам необходимо ввести число ${message.user.color.toString().replace(/1/gi, 'чёрного').replace(/2/gi, 'красного').replace(/3/gi, 'синего').replace(/4/gi, 'жёлтого').replace(/5/gi, 'зелёного').replace(/6/gi, 'фиолетового')} цвета!`, attachment: attachment }) : vk.api.messages.send({ peer_id: message.senderId, message: `*id${message.senderId}(${message.user.tag}), на вас была включена проверка от Авто-Постинга!\nВам даётся 5 попыток, если вы 5 раз введёте неверное число - вы будете заблокированы на 7 дней.\n‼ Вам необходимо ввести число ${message.user.color.toString().replace(/1/gi, 'чёрного').replace(/2/gi, 'красного').replace(/3/gi, 'синего').replace(/4/gi, 'жёлтого').replace(/5/gi, 'зелёного').replace(/6/gi, 'фиолетового')} цвета!`, attachment: attachment })
		bot(`либо нажмите на зелёную кнопку!`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": Number(message.user.pin)
},
"color": "positive"
}
]
]
})
})
		message.user.check = true
		return
    }
	message.args = message.text.match(command[0]);
	if(message.user.limit < 0) message.user.limit = 0
	if(message.user.banproject){
		vk.api.call("messages.removeChatUser", {chat_id: 1, user_id: message.senderId })
		vk.api.messages.send({ chat_id: message.chatId, message: `Пользователь был исключён из беседы так как находиться в чёрном списке проекта.`})
		return
	}
	if(message.user.pet.hp < 0){ message.user.pet.hp = 0; message.user.misc.pet = 0; vk.api.messages.send({ peer_id: message.senderId, message: `${namee(message.user.uid)} ваш питомец умер, так как вы его не кормили :(` })}
	if(message.user.rub > 10000000000000000) message.user.rub = 10000000000000000
	if(message.user.rub == null) message.user.rub=0
	if(message.user.btc == null) message.user.btc=0
	// !!! сообщение !!! //
	await command[1](message, bot);
	// !!! сообщение !!! //
	if(message.user.lim_v < 0){
		message.user.lim_v = 0
	}
	if(message.user.settings.adm < 2){
		if(message.user.lim_v > 600000000000) message.user.lim_v = 600000000000
	}

	if(message.user.watch) vk.api.messages.send({ peer_id: message.user.watcher, message: `[WATCHING] Зафиксировано действие от игрока ${name(message.user.uid)}!\nВведённая команда: <<${message.text}>>` })
	saveUsers();
});

const cmd = {
	hear: (p, f) => {
		commands.push([p, f]);
	}
}

cmd.hear(/^(?:снять)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return bot(`требуется ранг заместителя создателя!`)
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
message.args[2] = message.args[2].replace(/(всё)/ig, user.rub);
message.args[2] = Number(message.args[2])
let i = Number(message.args[2])
if(!i) return
if(user.settings.adm > message.user.settings.adm) return bot(`вы не можете забрать это у человека выше своего ранга! ${smileerror}`)
if(user.rub === 0) return bot(`у человека и так нет валюты! ${smileerror}`)
if(i > user.rub) i = user.rub
user.rub -= i
return bot(`вы успешно забрали у *id${user.id}(${user.tag}) ${utils.sp(i)}₽! ${smilesuccess}`)
});

cmd.hear(/^(?:разбан|разбан игрока)$/i, async (message, bot) => {
	if(message.user.settings.adm < 1) return bot(`требуется ранг администратора!`)
return bot(`использование: «разбан [ID игрока] [причина]»
✏ Пример: «разбан ${utils.random(10, 999999)} ошибка» `)
});

cmd.hear(/^(?:рр)$/i, async (message, bot) => {
	if(message.user.settings.adm < 1) return bot(`требуется ранг администратора!`)
return bot(`использование: «рр [ID игрока] [причина]»
✏ Пример: «рр ${utils.random(10, 999999)} ошибка» `)
});

cmd.hear(/^(?:бр)$/i, async (message, bot) => {
	if(message.user.settings.adm < 1) return bot(`требуется ранг администратора!`)
return bot(`использование: «бр [ID игрока] [причина]»
✏ Пример: «бр ${utils.random(10, 999999)} спам» `)
});

cmd.hear(/^(?:бан)$/i, async (message, bot) => {
	if(message.user.settings.adm < 1) return bot(`требуется ранг администратора!`)
return bot(`использование: «бан [ID игрока] [время: 1-9 дней] [причина]»
✏ Пример: «бан ${utils.random(10, 999999)} 7 продажа» `)
});

cmd.hear(/^(?:сн)$/i, async (message, bot) => {
	if(message.user.settings.adm < 1) return bot(`требуется ранг администратора!`)
return bot(`использование: «сн [ID игрока] [причина]»
✏ Пример: «сн ${utils.random(10, 999999)} реклама» `)
});

cmd.hear(/^(?:обнул)$/i, async (message, bot) => {
if(message.user.settings.adm < 1) return bot(`требуется ранг администратора!`)
return bot(`использование:
«обнул [ID игрока] [причина]»
✏ Пример: «обнул ${utils.random(10, 999999)} нарушение» `)
});

/*cmd.hear(/^(?:Клан создать)\s(.*)$/i, async (message, bot) => {
    if(!message.args[1]) return bot(`введите название для клана!`); 
    if(message.user.premium === false) {
    let zaprets1 = message.args[1].toLowerCase();
    var zapret = /(👨‍|🚀️|👩‍⚖️|👨‍⚖️|🎅|👸|🤴|👰|🤵|👼|🤰|🙇‍♀️|🙇|💁|💁‍♂️|🙅|🙅‍♂️|🙆|🙆‍♂️|🙋|🙋‍♂️|🤦‍♀️|🤦‍♂️|🤷‍♀️|🤷‍♂️|🙎|🙎‍♂️|🙍|🙍‍♂️|💇|💇‍♂️|💆|💆‍♂️|🕴|💃|🕺|👯|👯‍♂️|🚶‍♀️|🚶|🏃‍♀️|🏃|👫|👭|👬|💑|💏|👪|👚|👕|👖|👔|👗|👙|👘|👠|👡|👢|👞|👟|👒|🎩|👑|⛑|🎒|👝|👛|👜|💼|👓|🕶|🌂|☂|😀|😃|😄|😁|😆|😅|😂|🤣|☺|😊|😇|🙂|🙃|😉|😌|😍|😘|😗|😙|😚|😋|😜|😝|😛|🤑|🤗|🤓|😎|🤡|🤠|😏|😒|😞|😔|😟|😕|🙁|☹|😣|😖|😫|😩|😤|😠|😡|😶|😐|😑|😯|😦|😧|😮|😲|😵|😳|😱|😨|😰|😢|😥|🤤|😭|😓|😪|😴|🙄|🤔|🤥|😬|🤐|🤢|🤧|😷|🤒|🤕|😈|👿|👹|👺|💩|👻|💀|☠|👽|👾|🤖|🎃|😺|😸|😹|😻|😼|😽|🙀|😿|😾|👐|🙌|👏|🙏|🤝|👍|👎|👊|✊|🤛|🤜|🤞|✌|🤘|👌|👈|👉|👆|👇|☝|✋|🖐|🖖|👋|🤙|💪|🖕|✍|🤳|💅|🖖|💄|💋|👄|👅|👂|👃|👤|👣|👁|👀|🗣|👥|👶|👦|👧|👨|👩|👱‍♀️|👱|👴|👵|👲|👳‍♀️|👳|👮‍♀️|👮|👷‍♀️|👷|💂‍♀️|💂|🕵‍♀️|🕵|👩‍⚕️|👨‍⚕️|👩‍🌾️|👨‍🌾️|👩‍🍳️|👨‍🍳️|👩‍🎓️|👨‍🎓️|👩‍🎤️|👨‍🎤️|👩‍🏫️|👨‍🏫️|👩‍🏭️|👨‍🏭️|👩‍💻️|👨‍💻️|👩‍💼️|👨‍💼️|👩‍🔧️|👨‍🔧️|👩‍🔬️|👨‍🔬️|👩‍🎨️|👨‍🎨️|👩‍🚒️|👨‍🚒️|👩‍✈️|👨‍✈️|👩‍🚀️|👨‍🚀️|👩‍⚖️|👨‍⚖️|🎅|👸|🤴|👰|🤵|👼|🤰|🙇‍♀️|🙇|💁|💁‍♂️|🙅|🙅‍♂️|🙆|🙆‍♂️|🙋|🙋‍♂️|🤦‍♀️|🤦‍♂️|🤷‍♀️|🤷‍♂️|🙎|🙎‍♂️|🙍|🙍‍♂️|💇|💇‍♂️|💆|💆‍♂️|🕴|💃|🕺|👯|👯‍♂️|🚶‍♀️|🚶|🏃‍♀️|🏃|👫|👭|👬|💑|💏|👪|👚|👕|👖|👔|👗|👙|👘|👠|👡|👢|👞|👟|👒|🎩|🎓|👑|⛑|🎒|👝|👛|👜|💼|👓|🕶|🌂|☂|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|момо|momo|#|жопа|проебу|анально|не спит|никогда|сова|наркоторговец|наркота|наркотики|подкладка|подкладки|кокоин|кокаин|порно|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
    var sss = zapret.test(zaprets1) 
if(zapret.test(zaprets1) == true){
    var check = true;
    return message.send(`[🆘] » Ой... Похоже, что вы ввели запрещенные слова/символы/смайлики.`);
}
	let text = message.args[1].toLowerCase();
 	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(text)
	var lol1 = filter1.test(text)
	if(filter0.test(text) == true || filter1.test(text) == true){
		var check = true;
		return message.send(`[🆘] »  Отказ! |-| Подозрительная ссылка.`);
}
	}else{ 
 	let user = message.user;
 	let name = message.args[1];
 	let clanid = message.user.clanid;
 	if(message.user.rub < 500000000000) return bot(`недостаточно средств для покупки! ${smileerror}`)
 	message.user.rub -= 500000000000

 	if(clans[clanid]) return message.send(`[⚠] »  У вас уже создан клан или Вы уже состоите в другом клане.`);
 	if(!clans[clanid]){
 		let smile = utils.pick([`🤘`,`💥`,`💣`,`😻`,`😏`,`🤒`,`🤔`,`💎`,`♻`,`🏆`,`🔥`,`🌚`,`👻`,`💀`,`🎄`,`🎃`,`🚀`,`🎱`,`🍼`,`🍺`,`🐔`,`🐉`,`🌝`])
 	 	botinfo.number += 1;
 	 	clans[botinfo.number] = {
 		owner: message.user,
 		users: {},
 		number: botinfo.number,
 		name: name,
 		balance: 0,
 		smile: smile,
 		open: true,
 		price: 100,
        exs: 0,
        people: 0
 	}
 	user.clanid = botinfo.number;
 	clans[botinfo.number].users[message.user.uid] = {
 	    names: message.user.tag,
        level: 2
    }
 	 

 	return bot(`клан создан!:
 		&#4448;${clans[user.clanid].smile} + ${name} + ${clans[user.clanid].smile}&#4448; 

 		[${clans[user.clanid].smile}] >> Логотип клана: ${clans[user.clanid].smile}
 		[${clans[user.clanid].smile}] >> Тип клана: открытый.

 		[${clans[user.clanid].smile}] >> Команды клана: Кпомощь
 		`);
}}
});

cmd.hear(/^(?:клан покинуть)/i, async (message, bot) => {
	let user = message.user;
	let idclan = message.user.clanid;
	if(!clans[idclan]) return bot(`вы не в клане.`); 
    
	if(message.user.clanid == false) return bot(`вы не состоите в клане.`); 
	if(clans[idclan].users[message.user.uid].level == 2) return bot(`создатель не может выйти из клана.`);
	user.clanid = false;
	delete clans[idclan].users[message.user.uid];
    return bot(`вы добровольно покинули клан. ${smilesuccess}`);
});


cmd.hear(/^(?:Клан открыть)/i, async (message, bot) => {

	let user = message.user;
	let clanid = message.user.clanid;
	if(!clans[clanid]) return bot(`у вас нет клана.`); 
	if(clans[clanid].users[message.user.uid].level < 2) return bot(`вы не создатель клана.`);
    if(clans[clanid].open == true) return bot(`клан уже открытый.`)
    clans[clanid].open = true;
	return bot(`вы открыли клан. Цена за вход: ${clans[clanid].price}₽! ${smilesuccess}`);
});


cmd.hear(/^(?:Клан закрыть)/i, async (message, bot) => {

	let user = message.user;
	let clanid = message.user.clanid;
	if(!clans[clanid]) return bot(`у вас нет клана.`);
	if(clans[clanid].users[message.user.uid].level < 2) return bot(`вы не создатель клана.`);
    if(clans[clanid].open == false) return bot(`клан уже закрытый.`)
    clans[clanid].open = false;
	return bot(`вы закрыли клан. Набор участников могут проводить только зам/создатель! ${smilesuccess}`);
});


cmd.hear(/^(?:Клан вход)\s([0-9]+)$/i, async (message, bot) => {

	let user = message.user;
	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.reply(`У вас нет клана.`);
	if(clans[clanid].users[message.user.uid].level < 2) return message.reply(`Вы не создатель  клана.`);
    if(!message.args[1]) return message.reply(`Укажите сумму для входа в клан.`);
    if(message.args[1] < 100) return message.reply(`Сумма для входа в клан не должна быть < 100 Coins`);
    if(message.args[1] > 50000) return message.reply(`Сумма для входа в клан не должна быть > 50000 Coins`);
    clans[clanid].price = Number(message.args[1]);
    return message.reply(`Вы установили цену за вход в размере ${Number(message.args[1])} Coins`);
});


cmd.hear(/^(?:клан Вступить)\s([0-9]+)$/i, async (message, bot) => {



    let user = message.user;
	let idclan = message.args[1]; 
	if(message.users.clanid != false) return message.reply(`Вы уже состоите в клане.`);
	if(!message.args[1]) return message.reply(`Вы не указали ID клана.`);
	 
	 
	if(!clans[idclan]) return message.reply(`Данного клана не существует.`);
	if(clans[idclan].open == false) return message.reply(`Данный клан закрыт. В него нельзя войти.`);
	if(clans[idclan].open == true){
		if(message.user.rub < clans[idclan].price) return message.reply(`Вход в данный клан стоит: ${spaces(clans[idclan].price)} Coins`);
		message.user.rub -= Number(clans[idclan].price);
		clans[idclan].price += clans[idclan].price;
		message.user.clanid = Number(message.args[1]);
		if(!clans[idclan].users[message.user]){
        	        	clans[idclan].users[message.user.uid] = {
        	        		level: 0
        	        	}
        }
        return message.reply(`Вы вошли в клан за ${spaces(clans[idclan].price)} Coins \n\n Команды клана - Кпомощь`, {attachment: 'photo512809754_456239056'});
	}
});


cmd.hear(/^(?:Клан название)\s([^]+)$/i, async (message, bot) => {


 	if(!message.args[1]) return message.send(`⚠ »  Укажите название для клана.`);
 	if(message.user.vip == false) {
 	    let zaprets1 = message.args[1].toLowerCase();
    var zapret = /(с о в а н е с п и т|сованикогданеспит|сова не спит никогда|красная сова|момо|momo|#|жопа|проебу|анально|не спит|никогда|сова|наркоторговец|наркота|наркотики|подкладка|подкладки|кокоин|кокаин|порно|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
    var sss = zapret.test(zaprets1) 
if(zapret.test(zaprets1) == true){
    var check = true;
 return message.reply(`[🆘] » Ой... Похоже, что вы ввели запрещенные слова/символы/смайлики.`);
}
	let text = message.args[1].toLowerCase();
 	var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
	var lol = filter0.test(text)
	var lol1 = filter1.test(text)
	if(filter0.test(text) == true || filter1.test(text) == true){
		var check = true;
		return message.send(`[🆘] »  Отказ! |-| Подозрительная сслыка.`);
}
	}else{
		 	let user = message.user;
			let clanid = user.clanid;
			if(!clans[clanid]) return message.reply(`У вас нет клана.`);
			if(clans[clanid].users[message.user.uid].level < 2) return message.reply(`Вы не создатель  клана.`);
		    if(clans[clanid].balance < 10000) return message.reply(`На балансе клана нету 10.000 Coins `);
		   	clans[clanid].balance -= 10000;

			if(clans[clanid]){
				if(message.user != clans[clanid].owner) return message.reply(`Изменить название клана может только Создатель!`);
				if(message.user == clans[clanid].owner){
					clans[clanid].name = message.args[1];
					return message.reply(`Вы успешно изменили название клана за 10.000 Coins!`);
				}
			}
	}  

});


cmd.hear(/^(?:Клан лого)/i, async (message, bot) => {

	let user = message.user;
	let clanid = message.user.clanid;
	if(!clans[clanid]) return message.reply(`У вас нет клана.`);
	if(clans[clanid].users[message.user.uid].level < 1) return message.reply(`Вы не создатель/заместитель клана.`);
    if(clans[clanid].balance < 10000) return message.reply(`На балансе клана нету 10.000 Coins`);
    clans[clanid].balance -= 10000;

	if(clans[clanid]){
			let smile = utils.pick([`📺`,`💥`,`💣`,`💎`,`♻`,`🏆`,`🔥`,`🌚`,`👻`,`💀`,`🎄`,`🎃`,`🚀`,`🎱`,`🍼`,`🍺`,`🐔`,`🐉`,`🌈`,`🌝`])
			clans[clanid].smile = smile;
			return message.reply(`Вы успешно изменили логотип клана за 10.000 Coins!`);
	}
});

cmd.hear(/^(?:клан помощь)$/i, async (message, bot) => {

	let user = message.user;
 	let clanid = message.user.clanid;
 	if(!clans[clanid]) return bot(`у вас нет клана. Чтобы создать клан используйте команду <<клан создать [имя клана]>>! ${smileerror}`);

if(clans[clanid].users[message.user.uid].level < 1){
	return bot(`команды:
		[${clans[clanid].smile}] Клан - Информация о вашем клане.
		[${clans[clanid].smile}] Клан Положить <сумма> - положить деньги в банк клана.
		[${clans[clanid].smile}] Клан банк - баланс клана.

		[${clans[clanid].smile}] Покинуть - Выйти из клана(от vip юзера)
		`);
}
if(clans[clanid].users[message.user.uid].level == 1){
	return bot(`команды:
		[${clans[clanid].smile}] Клан - Информация о вашем клане. 
		[${clans[clanid].smile}] Клан Кик ID(user'a) - выгнать из клана.
		[${clans[clanid].smile}] Клан Лого - Сменить логотип клана.
		[${clans[clanid].smile}] Клан Положить <сумма> - положить деньги в банк клана.
		[${clans[clanid].smile}] Калн Банк - баланс клана.

		[${clans[clanid].smile}] Клан Покинуть - Выйти из клана (Только от vip пользователей)
		`);
}
if(clans[clanid].users[message.user.uid].level == 2){
	return bot(`команды:
		[${clans[clanid].smile}] Клан - Информация о вашем клане. 
		[${clans[clanid].smile}] Клан Кик (ID Пользователя) - выгнать из клана.
		[${clans[clanid].smile}] Клан модер (ID Пользователя) - назначить заместителем.
		[${clans[clanid].smile}] Клан Удалить (ID Пользователя) - снять заместителя.
		[${clans[clanid].smile}] Клан Название (name) - изменить название клана.
		[${clans[clanid].smile}] Клан Лого - Сменить логотип клана.

		[${clans[clanid].smile}] Клан Открыть - Открыть клан.
		[${clans[clanid].smile}] Клан Цена - Установить цену за вход.
		[${clans[clanid].smile}] Клан Закрыть - Закрыть клан.

		[${clans[clanid].smile}] Клан Положить <сумма> - положить деньги в банк клана.
		[${clans[clanid].smile}] Клан Снять <сумма> - снять деньги из банка клана.
		[${clans[clanid].smile}] Клан Банк - баланс клана.

		[${clans[clanid].smile}] Clanwar [id клана] [сумма] - Атаковать клан!
		`);
}
});

cmd.hear(/^(?:Клан)/i, async (message, bot) => {

let user = message.user;
	let clanid = message.user.clanid;
if(!clans[clanid]) return bot(`у вас нет клана.`);

let text = ``;
let tipe = ``;
text += `[🏆] | Участники Клана: \n\n`;

text += `[${clans[clanid].smile}] >> [id${clans[clanid].owner.id}|${clans[clanid].owner.tag}] | Создатель.\n\n`;
 	for(let id in clans[clanid].users) {
             let people = clans[clanid].users[id];   
        	 if(clans[clanid].users[id].level == 1) text += `[${clans[clanid].smile}] >> [id${clans[clanid].users[id]}|${people.prefix}] | Заместитель.\n\n`;
        	 if(clans[clanid].users[id].level == 0) text += `[${clans[clanid].smile}] >> [id${clans[clanid].users[id]}|${people.prefix}] | Участник.\n`;
        }

 function indexOfByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] == value) {
                return i;
            }
        }
        return null;
    }
    
    var tops = []
    for (let i in clans) {
        tops.push({
            id: i,
            balance: clans[i].balance
        })
    }
    tops.sort(function(a, b) {
        if (b.balance > a.balance) return 1
        if (b.balance < a.balance) return -1
        return 0
    })
   
    var inTop = indexOfByKey(tops, 'id', message.user);
    inTop++; 


if(clans[clanid].open == true) tipe += `Открытый.`
if(clans[clanid].open == false) tipe += `Закрытый.`
if(clans[clanid]){
    let exs = 0;
    let convert = 0;

    let s = `клане`
    if(clans[clanid].owner.id === message.senderId) s = `вашем клане`
	return bot(`информация о ${s}:

 		[${clans[clanid].smile}] »  Создатель: [id${clans[clanid].owner.id}|${clans[clanid].owner.tag}]
 		[${clans[clanid].smile}] »  Номер клана: ${clans[clanid].number}
 		[${clans[clanid].smile}] »  Логотип клана: ${clans[clanid].smile} 
 		[${clans[clanid].smile}] »  Тип клана: ${tipe}
 		[${clans[clanid].smile}] »  Цена за вход: ${clans[clanid].price}₽

 		[${clans[clanid].smile}] >> Название: ${clans[clanid].name}

        [💰] »  На балансе клана: ${clans[clanid].balance}₽

        [🔥] »  Баланс клана: ${clans[clanid].balance}
        [🌍] »  Место в топе: ${inTop}

 		${text}
		`);
	} 
});

cmd.hear(/^(?:клан банк)$/i, async (message, bot) => {
	let user = message.user;
 	let clanid = message.user.clanid;
	if(!clans[clanid]) return bot(`у вас нет клана. ${smileerror}`);
	return bot(`баланс Вашего клана: ${spaces(clans[clanid].balance)}₽! ${smilesuccess}`);

});



cmd.hear(/^(?:Клан положить)\s?(.*)$/i, async (message, bot) => {

	if(!message.args[1]) return bot(`укажите сумму вклада. ${smileerror}`);
	let user = message.user;
 	let clanid = message.user.clanid;
	if(!clans[clanid]) return bot(`у вас нет клана. ${smileerror}`);
	if(message.args[1] > message.user.rub || message.args[1] <= 0) return message.reply(message.args[1] <= 0 ? `Вклад не может быть меньше 0 или равен 0₽! ${smileerror}` : `Вклад не может превышать Ваш баланс. ${smileerror}`);
	message.user.rub -= Number(message.args[1]);
	clans[clanid].balance += Number(message.args[1]);
	return bot(`вы успешно положили ${spaces(message.args[1])}₽ в банк клана. ${smilesuccess}`);
});


cmd.hear(/^(?:Клан снять)\s?(.*)$/i, async (message, bot) => {

	if(!message.args[1]) return bot(`укажите сумму снятия. ${smileerror}`);
	let user = message.user;
 	let clanid = message.user.clanid;
	if(!clans[clanid]) return bot(`у вас нет клана. ${smileerror}`);
	if(clans[clanid].users[message.user.uid].level < 2) return bot(`снимать деньги может только создатель клана. ${smileerror}`);
    
	if(message.args[1] > clans[clanid].balance) return bot(`данной суммы нет в банке клана. ${smileerror}`);
	if(message.args[1] <= 0) return bot(`сумма не должна быть меньше или равно 0₽! ${smileerror}`);
	message.user.rub += Number(message.args[1]);
	clans[clanid].balance -= Number(message.args[1]);
	return message.send(`[${clans[clanid].smile}] » Вы успешно сняли ${spaces(message.args[1])}₽ с банка клана. ${smilesuccess}`);
});

cmd.hear(/^(?:clanwar)\s?([0-9]+)\s?([^\s	].*)$/i, async (message, bot) => {
		let clanid = message.user.clanid;
		if(!message.args[1]) return bot(`укажите ID клана, который хотите атаковать. ${smileerror}`);
		if(!message.args[2]) return bot(`укажите ставку. ${smileerror}`);
		let id = Number(message.args[1]); 
		let amount = parserInt(message.args[2]);
		if(!Number(amount)) return bot(`укажите корректно ставку. ${smileerror}`);
		if(amount < 1000) return bot(`минимальная сумма для атаки 1.000₽! ${smileerror}`);
		if (clans[clanid].users[message.user.uid].level < 1) return bot(`вы не создатель/заместитель~  клана.`);
		if(id == clanid) return bot(`нельзя нападать на свой клан.`);
		if(amount > clans[clanid].balance) return bot(`на счету вашего клана не хватает денег! ${smileerror}`);
		if(amount > clans[id].balance) return bot(`на счету клана на который вы нападаете не хватает денег! ${smileerror}`); 
		if (clanid == false) return bot(`у вас нет клана. ${smileerror}`);
		if (!clans[clanid]) return bot(`у вас нет клана. ${smileerror}`);
		if (!clans[id]) return bot(`такого клана нет. ${smileerror}`);

if(message.user.premium === false) {
	if(message.user.timers.clanwar) return bot(`в ближайшие 10 минут, Вы сможете ещё раз атаковать клан!`);

	setTimeout(() => {
		message.user.timers.clanwar = false;
	}, 600000);

	message.user.timers.clanwar = true;
}

		let win = rand(1,2);
		if(win == 1){
			clans[id].balance += amount;
			clans[clanid].balance -= amount;
			return message.send(`🛡 Clan War 🛡\n[⚔] >> Клан ${clans[clanid].name} напал на ${clans[id].name}\n[🏆] >> Победу одержал клан: ${clans[id].name}\n💰 >> Выигрыш: ${spaces(amount)} 💰`);
		}else{
			clans[id].balance -= amount;
			clans[clanid].balance += amount;
			return message.send(`🛡 Clan War 🛡\n[⚔] >> Клан ${clans[clanid].name} напал на ${clans[id].name}\n[🏆] >> Победу одержал клан: ${clans[clanid].name}\n💰 >> Выигрыш: ${spaces(amount)} 💰`);
		}
	});	

cmd.hear(/^(?:Клан модер)\s([0-9]+)$/i, async (message, bot) => {

	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		if(user.uid === message.user.uid) return bot(`неверный ID`);

 	let clanid = user.clanid;
 	if(!clans[clanid]) return message.reply(`этот человек не состоит в клане.`);
 	if(clans[clanid].users[message.user.uid].level < 2) return message.reply(`Вы не создатель/заместитель клана.`);
        	        
    if(message.args[4]) {
        var domain = message.args[4].split(" ");
        vk.api.call("utils.resolveScreenName", {
            screen_name: message.args[4]
        })
        .then((res) => {

        	        if(!clans[clanid]) return message.reply(`этот человек не состоит в клане.`);
              	    if(user.clanid != message.user.clanid) return message.reply(`Юзер уже состоит в другом клане.`);
        	       

        	        clans[clanid].users[user.uid].level = 1;
        	        return message.reply(`vk.com/id${user.id} был назначен заместителем в клане.`); 

        })
        return;
    }else{

        if(!clans[clanid]) return message.reply(`этот человек не состоит в клане.`);
        if(user.clanid != message.user.clanid) return message.reply(`Юзер уже состоит в другом клане.`);
          

        	clans[clanid].users[user.uid].level = 1;
        	return message.reply(`vk.com/id${user.id} был назначен заместителем в клане.`); 
    }
});


cmd.hear(/^(?:Клан удалить)\s([0-9]+)$/i, async (message, bot) => {

	let user = users.find(x=> x.uid === Number(message.args[1]));
		if(!user) return bot(`неверный ID игрока`);
		if(user.uid === message.user.uid) return bot(`неверный ID`);


 	let clanid = message.user.clanid;
 	if(!clans[clanid]) return message.reply(`этот человек не состоит в клане.`);
 	if(clans[clanid].users[message.user.uid].level < 2) return message.reply(`Вы не создатель/заместитель клана!`);
        	        
    if(message.args[4]) {
        var domain = message.args[4].split(" ");
        vk.api.call("utils.resolveScreenName", {
            screen_name: message.args[4]
        })
        .then((res) => {

              	    if(user.clanid != acc.users[message.user.uid].clanid) return message.reply(`Юзер уже состоит в другом клане.`);
         			if(!clans[clanid]) return message.reply(`этот человек не состоит в клане.`);
        	        
        	        clans[clanid].users[user.uid].level = 0;
        	        return message.reply(`vk.com/id${user.id} был понижен до "учаАстника" в клане.`);
        })
        return;
    }else{

        if(acc.users[user.uid].clanid != acc.users[message.user].clanid) return message.reply(`Юзер уже состоит в другом клане.`);
         if(!clans[clanid]) return message.reply(`этот человек не состоит в клане.`);

        	clans[clanid].users[user.uid].level = 0;
        	return message.reply(`vk.com/id${user.id} был понижен до "участника" в клане.`);      
    }
});*/

cmd.hear(/^(?:Клан)\s?(.*)$/i, async (message, bot) => {return bot(`кланы временно закрыты на технические работы! Приносим свои извинения! ${smileerror}`)})

cmd.hear(/^(?:снять работу)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 3) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.work === 0) return bot(`игрок и так безработный! ${smileerror}`)
user.work = 0
return bot(`игрок ${name(user.uid)} теперь безработный! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать капчу)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 3) return
let user = users.find(x=> x.uid === Number(message.args[1]))
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.dcheck = true
return bot(`доступ к проверке успешно выдан администратору *id${user.id}(${user.tag})! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать вечноразбаны|выдать вечноразбан)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.protectraz === true) return bot(`у игрока и так есть вечно-разбаны! ${smilesuccess}`)
user.protectraz = true
return bot(`вы успешно выдали игроку ${name(user.uid)} вечные разбаны! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать преф|выдать префикс|выдатьпреф|выдатьпрефикс)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(user.prefixt === message.args[2]) return bot(`у игрока и так такой префикс! ${smileerror}`)
user.prefixt = message.args[2]
user.prefixgot = true
return bot(`игроку установлен личный префикс <<${message.args[2]}>>! ${smilesuccess}`)
});

cmd.hear(/^(?:снять вечноразбаны|снять вечноразбан)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.protectraz === false) return bot(`у игрока и так нету вечных разбанов! ${smilesuccess}`)
user.protectraz = false
return bot(`вы успешно отняли у игрока ${name(user.uid)} вечные разбаны! ${smilesuccess}`)
});

cmd.hear(/^(?:снять работу)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 2) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.work = 0
return bot(`вы успешно сняли у *id${user.id}(${user.tag}) работу! ${smileerror}`)
});

cmd.hear(/^(?:кейс|кейсы)$/i, async (message, bot) => {
let z = ''
let a = false
let f = '🚫 У вас в инвентаре: пусто' // 🧳
if(message.user.case1 !== 0){ a = true; z += `1&#8419; Обычный кейс (x${message.user.case1})` }

if(a === true) f = '🧳 У вас в инвентаре:'
return bot(`кейсы:
1&#8419; Обычный кейс: 200.000.000.000₽
❓ Информация: <<кейс инфо 1>>
🛒 Купить: <<кейс 1 [кол-во]>> \n\n${f} ${`\n${z}`}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `кейс инфо 1`
},
"color": "positive"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": `кейс инфо 2`
},
"color": "positive"
}
]
]
})
})
});

cmd.hear(/^(?:кейс инфо 1)$/i, async (message, bot) => {
return bot(`из «Обычного кейса» может выпасть:

1&#8419; Опыт.
2&#8419; Игровая валюта.
3&#8419; Рейтинг.

🛒 Купить: "кейс 1 [кол-во]"`)
 /*if(message.args[1].toLowerCase() === 2) return
if(message.args[1].toLowerCase() === 3) return
else if(message.args[1].toLowerCase() > 3) return */
});

cmd.hear(/^(?:кейс инфо 2)$/i, async (message, bot) => {
return bot(`из «Супер кейс» может выпасть:

1&#8419; Опыт.
2&#8419; Игровая валюта.
3&#8419; Рейтинг.

🛒 Купить: "кейс 2 [кол-во]"`)
 /*if(message.args[1].toLowerCase() === 2) return
if(message.args[1].toLowerCase() === 3) return
else if(message.args[1].toLowerCase() > 3) return */
});

cmd.hear(/^(?:инд|веф)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return bot(`требуется ранг создателя!`)
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.vef = true
return bot(`${message.user.settings.adm === 0 ? `игрок` : `администратор`} *id${user.id}(${user.tag}) верифицирован! ${smilesuccess}`)
});

cmd.hear(/^(?:снять веф|снять инд)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return bot(`требуется ранг создателя!`)
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.vef = false
return bot(`${message.user.settings.adm === 0 ? `игрок` : `администратор`} *id${user.id}(${user.tag}) анверифицирован! ${smilesuccess}`)
});

cmd.hear(/^(?:внести в чс проекта)$/i, async (message, bot) => {
if(message.user.settings.adm < 4) return
if(!message.forwards[0]) return bot(`перешли сообщение`)
if(message.forwards[0].senderId < 0) return
let user = users.find(x=> x.id === message.forwards[0].senderId)
user.banproject = true
return bot(`игрок теперь находиться в ЧС проекта.`)
});

cmd.hear(/^(?:внести в чс проекта)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 4) return
let user = users.find(x=> x.id === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.banproject = true
return bot(`игрок теперь находиться в ЧС проекта.`)
});

cmd.hear(/^(?:вынести из чс проекта)$/i, async (message, bot) => {
if(message.user.settings.adm < 4) return
if(!message.forwards[0]) return bot(`перешли сообщение`)
if(message.forwards[0].senderId < 0) return
let user = users.find(x=> x.id === message.forwards[0].senderId)
user.banproject = false
return bot(`игрок теперь не находиться в ЧС проекта.`)
});

cmd.hear(/^(?:вынести из чс проекта)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 4) return
let user = users.find(x=> x.id === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.banproject = false
return bot(`игрок теперь не находиться в ЧС проекта.`)
});

cmd.hear(/^(?:кейс открыть 1)$/i, async (message, bot) => {
	if(message.user.case1 === 0){message.user.case1 = 0; return bot(`у вас нет таких кейсов! ${smileerror}`)}
	message.user.case1 -= 1
	let item = utils.pick([1, 2, 3, 2, 3])
	if(item === 1){
		let count = utils.random(100000000000, 225000000000)
		message.user.rub += count
		return bot(`вы выиграли ${utils.sp(count)}₽! ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": message.text
},
"color": "positive"
}
]
]
})
})
}
	if(item === 2){
		let count = utils.random(10, 100)
		message.user.opit += count
		return bot(`вы выиграли ${count} опыта! ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": message.text
},
"color": "negative"
}
]
]
})
})
	}
	if(item === 3){
		let count = utils.random(75, 150)
		message.user.rating += count
		if(message.user.settings.adm !== 0) message.user.rating = 0
		return bot(`${message.user.settings.adm !== 0 ? `вы выиграли рейтинг, но вы админ по этому вы ничего не получили.` : `вы выиграли ${count} рейтинга! ${smilesuccess}`}`,
		{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": message.text
},
"color": "negative"
}
]
]
})
})
}
/*
if(message.args[1] === 2) return
if(message.args[1] === 3) return
else if(message.args[1] !== 1 && message.args[1] !== 2 && message.args[1] !== 3) return */
});

cmd.hear(/^(?:кейс открыть 2)$/i, async (message, bot) => {
	if(message.user.case1 === 0){message.user.case1 = 0; return bot(`у вас нет таких кейсов! ${smileerror}`)}
	message.user.case2 -= 1
	let item = utils.pick([1, 2, 3, 2, 3])
	if(item === 1){
		let count = utils.random(100000000000, 225000000000)
		message.user.rub += count
		return bot(`вы выиграли ${utils.sp(count)}₽! ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": message.text
},
"color": "positive"
}
]
]
})
})
}
	if(item === 2){
		let count = utils.random(10, 100)
		message.user.opit += count
		return bot(`вы выиграли ${count} опыта! ${smilesuccess}`,
		{
			keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": message.text
},
"color": "negative"
}
]
]
})
})
	}
	if(item === 3){
		let count = utils.random(75, 150)
		message.user.rating += count
		if(message.user.settings.adm !== 0) message.user.rating = 0
		return bot(`${message.user.settings.adm !== 0 ? `вы выиграли рейтинг, но вы админ по этому вы ничего не получили.` : `вы выиграли ${count} рейтинга! ${smilesuccess}`}`,
		{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": message.text
},
"color": "negative"
}
]
]
})
})
}
/*
if(message.args[1] === 2) return
if(message.args[1] === 3) return
else if(message.args[1] !== 1 && message.args[1] !== 2 && message.args[1] !== 3) return */
});

cmd.hear(/^(?:кейс 1)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
	if(!message.args[1]) return
	let int = Number(message.args[1])*200000000000
	if(Number(int) > message.user.rub) return bot(`недостаточно средств! ${smileerror}`)
	message.user.rub -= Number(int)
	message.user.case1 += Number(message.args[1])
	return bot(`вы успешно купили ${message.args[1]} обычных кейсов за ${utils.sp(int)}₽! ${smilesuccess}`)
});

cmd.hear(/^(?:кейс 2)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
	if(!message.args[1]) return
	let int = Number(message.args[1])*200000000000
	if(Number(int) > message.user.rub) return bot(`недостаточно средств! ${smileerror}`)
	message.user.rub -= Number(int)
	message.user.case2 += Number(message.args[1])
	return bot(`вы успешно купили ${message.args[1]} Супер кейс за ${utils.sp(int)}₽! ${smilesuccess}`)
});

cmd.hear(/^(?:снять капчу)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 3) return
let user = users.find(x=> x.uid === Number(message.args[1]))
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.dcheck = false
return bot(`доступ к проверке успешно отнят у администратора *id${user.id}(${user.tag})! ${smilesuccess}`)
});

cmd.hear(/^(?:снять выговор|свыговор)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.settings.adm === 0) return bot(`это не админ! ${smileerror}`)
if(user.warn === 0) return bot(`у администратора отсутствуют выговоры! ${smileerror}`)
if(user.uid === message.user.uid) return bot(`вы не можете снимать себе выговоры! ${smileerror}`)
user.warn -= 1
await bot(`вы успешно сняли *id${user.id}(${user.tag}) выговор [${user.warn}/3]! ${smilesuccess}`)
vk.api.messages.send({
	peer_id: user.id,
	message: `✅ С вас было снято админское предупреждение [${user.warn}/3]!`
})
});

cmd.hear(/^(?:установить лвл)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return bot(`требуется ранг создатель!`)
message.args[1] = Number(message.args[1])
message.args[2] = Number(message.args[2])
if(!message.args[1]) return
if(!message.args[2]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(message.user.settings.adm < 3) return
if(message.args[1] !== message.user.uid){
user.level = message.args[2]
return bot(`вы успешно установили *id${user.id}(${user.tag}) ${utils.sp(message.args[2])} уровней! ${smilesuccess}`) }
});

cmd.hear(/^(?:выдать лвл)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return bot(`требуется ранг создатель!`)
message.args[1] = Number(message.args[1])
message.args[2] = Number(message.args[2])
if(!message.args[1]) return
if(!message.args[2]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(message.args[1] === message.user.uid){
message.user.level += message.args[2]
return bot(`вы успешно выдали себе ${utils.sp(message.args[2])} уровней! ${smilesuccess}`)
}
if(message.user.settings.adm < 3) return
if(message.args[1] !== message.user.uid){
user.level += message.args[2]
return bot(`вы успешно выдали *id${user.id}(${user.tag}) ${utils.sp(message.args[2])} уровней! ${smilesuccess}`) }
});

cmd.hear(/^(?:выдать работу)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return bot(`требуется ранг создатель!`)
message.args[1] = Number(message.args[1])
message.args[2] = Number(message.args[2])
if(!Number(message.args[1])) return
if(!Number(message.args[2])) return
let work = works.find(x=> x.id === message.args[2])
if(!work) return bot(`работа не найдена! ${smileerror}`)
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(message.user.uid === message.args[1]){
message.user.work = message.args[2]
return bot(`вы успешно выдали себе работу <<${work.name}>>! ${smilesuccess}`)
}
if(message.user.work !== message.args[1]){
user.work = message.args[2]
return bot(`вы успешно выдали *id${user.id}(${user.tag}) работу <<${work.name}>>! ${smilesuccess}`) }
});

cmd.hear(/^(?:отнять лвл)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
message.args[2] = Number(message.args[2])
if(!message.args[1]) return
if(!message.args[2]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(message.args[1] === message.user.uid){
message.user.level -= message.args[2]
return bot(`вы успешно отняли у себя ${utils.sp(message.args[2])} уровней! ${smilesuccess}`)
}
if(message.user.settings.adm < 3) return
if(message.args[1] !== message.user.uid){
user.level -= message.args[2]
return bot(`вы успешно отняли у *id${user.id}(${user.tag}) ${utils.sp(message.args[2])} уровней! ${smilesuccess}`) }
});

cmd.hear(/^(?:включить проверку)$/i, async (message, bot) => {
if(message.user.settings.adm < 1) return
if(!message.forwards[0]) return bot(`укажите ID или перешлите сообщение.`)
if(message.user.dcheck === false) return bot(`недостаточно прав! ${smileerror}`)
let user = users.find(x=> x.id === message.forwards[0].senderId)
user.msg = 499
return bot(`проверка игроку *id${user.id}(${user.tag}) успешно включена! (сработает после того как игрок использует команду) ${smilesuccess}`)
});

cmd.hear(/^(?:включить проверку)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 1) return
if(message.user.dcheck === false) return bot(`недостаточно прав! ${smileerror}`)
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.msg = 499
return bot(`проверка игроку *id${user.id}(${user.tag}) успешно включена! (сработает после того как игрок использует команду) ${smilesuccess}`)
});

cmd.hear(/^(?:очистить ответы|обнулить ответы)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
user.otvets = 0
return bot(`игроку *id${user.id}(${user.tag}) очищено количество ответов! ${smilesuccess}`)
});

cmd.hear(/^(?:статлист)$/i, async (message, bot) => {
	  if(message.user.settings.adm < 1) return;
	  let z = ""
		let admins, moders, gladmins, zam;
		ZAM = '\nРазработчики:\n';
		gladmins = '\nСоздатели:\n';
		admins = '\nЗаместители создателей:\n';
		moders = '\nАдминистраторы:\n';
		for(let id in users) {
			if(users[id]){
			let user = users[id]
			if(user.settings.adm == 4) ZAM += `👑 » @id${users[id].id}(${users[id].tag}) | ID: ${users[id].uid}\n`;
			if(user.settings.adm == 3) gladmins += `🔱 » @id${users[id].id}(${users[id].tag}) | ID: ${users[id].uid}\n`;
			if(user.settings.adm == 2) admins += `🔸 » @id${users[id].id}(${users[id].tag}) | ID: ${users[id].uid}\n`;
			if(user.settings.adm == 1) moders += `🔹 » @id${users[id].id}(${users[id].tag}) | ID: ${users[id].uid}\n`;
		}
		}
		let text = ``;
		if(ZAM.length !== 26) text += ZAM;
		if(gladmins.length !== 24) text += gladmins;
		if(admins.length !== 24) text += admins;
		if(moders.length !== 24) text += moders;
		return bot(`список администрации: ${text}`);
});

cmd.hear(/^(?:стата)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Number(message.args[1])
	let user = users.find(x=> x.uid === message.args[1])
	if(message.user.settings.adm < 2) return
	if(!user) return bot(`игрок не найден! ${smileerror}`)
	let [user_info] = await vk.api.users.get({ user_id: user.id })
	let zadm = ``
	if(user.vip !== false){zadm += `+ Вип${user.premium ? ` + Премиум` : ` статус`}` }
	if(user.premium === true & user.vip === false){zadm += `+ Премиум статус`}
	return bot(`статистика *id${user.id}(${user.tag})

👤 Игрок: ${user_info.first_name} ${user_info.last_name}
✅ Верификация: ${user.vef ? `✓` : `×`} ${user.settings.adm !== 0 ? `
🤵 	${user.settings.adm.toString().replace(/1/gi, `Администратор`).replace(/2/gi, `Заместитель создателя`).replace(/3/gi, `Создатель`).replace(/4/gi, `Разработчик`)} [${user.warn}/3] ${zadm}

🛂 Кол-во выданных банов: ${user.bans}
🅿 Кол-во выданных разбанов: ${user.razbans}

☮ Кол-во выданных БР: ${user.brs}
⚛ Кол-во выданных РР: ${user.rrs}

💬 Кол-во ответов на репорт: ${user.otvets}
` : `

🆘 Кол-во полученных банов: ${user.getbans}
💬 Кол-во отправленных репортов: ${user.reports}`} 

📆 Дата регистрации: <<${user.timeReg}>>
`)
});
/*let user = message.user
let adm = ``
if(message.user.vip !== false){adm += `+ Вип${message.user.premium ? ` + Премиум` : ` статус`}` }
if(message.user.premium === true & message.user.vip === false){adm += `+ Премиум статус`}
return bot(`ваша статистика:

✅ Верификация: ${user.vef ? `✓` : `×`} ${message.user.settings.adm !== 0 ? `\n🤵 ${message.user.settings.adm.toString().replace(/1/gi, `Администратор`).replace(/2/gi, `Заместитель создателя`).replace(/3/gi, `Создатель`).replace(/4/gi, `Разработчик`)} ${adm}

🛂 Кол-во выданных банов: ${user.bans}
🅿 Кол-во выданных разбанов: ${user.razbans}

☮ Кол-во выданных БР: ${user.brs}
⚛ Кол-во выданных РР: ${user.rrs}

💬 Кол-во ответов на репорт: ${user.otvets}
` : `
🆘 Кол-во полученных банов: ${user.getbans}
💬 Кол-во отправленных репортов: ${user.reports}`}

📆 Дата регистрации: <<${message.user.timeReg}>>`)
}*/

cmd.hear(/^(?:стата)$/i, async (message, bot) => {
	if(!message.forwards[0]){
		let user = message.user
let adm = ``
if(message.user.vip !== false){adm += `+ Вип${message.user.premium ? ` + Премиум` : ` статус`}` }
if(message.user.premium === true & message.user.vip === false){adm += `+ Премиум статус`}
return bot(`ваша статистика:

✅ Верификация: ${user.vef ? `✓` : `×`} ${message.user.settings.adm !== 0 ? `\n🤵 ${message.user.settings.adm.toString().replace(/1/gi, `Администратор`).replace(/2/gi, `Заместитель создателя`).replace(/3/gi, `Создатель`).replace(/4/gi, `Разработчик`)} [${user.warn}/3] ${adm}

🛂 Кол-во выданных банов: ${user.bans}
🅿 Кол-во выданных разбанов: ${user.razbans}

☮ Кол-во выданных БР: ${user.brs}
⚛ Кол-во выданных РР: ${user.rrs}

💬 Кол-во ответов на репорт: ${user.otvets}
` : `
🆘 Кол-во полученных банов: ${user.getbans}
💬 Кол-во отправленных репортов: ${user.reports}`}

💰 Ваш остаток лимита передачи: ${message.user.limit_t === 1 ? `${utils.sp(message.user.limit)}₽` : `∞`}

📆 Дата регистрации: <<${message.user.timeReg}>>`)
	}
	if(message.forwards[0].senderId < 0) return
	let user = users.find(x=> x.id === message.forwards[0].senderId)
	if(message.user.settings.adm < 2) return
	if(!user) return bot(`игрок не найден! ${smileerror}`)
	let [user_info] = await vk.api.users.get({ user_id: user.id })
	let zadm = ``
	if(user.vip !== false){zadm += `+ Вип${user.premium ? ` + Премиум` : ` статус`}` }
	if(user.premium === true & user.vip === false){zadm += `+ Премиум статус`}
	return bot(`статистика *id${user.id}(${user.tag})

👤 Игрок: ${user_info.first_name} ${user_info.last_name}
✅ Верификация: ${user.vef ? `✓` : `×`} ${user.settings.adm !== 0 ? `
🤵 	${user.settings.adm.toString().replace(/1/gi, `Администратор`).replace(/2/gi, `Заместитель создателя`).replace(/3/gi, `Создатель`).replace(/4/gi, `Разработчик`)} [${user.warn}/3] ${zadm}

🛂 Кол-во выданных банов: ${user.bans}
🅿 Кол-во выданных разбанов: ${user.razbans}

☮ Кол-во выданных БР: ${user.brs}
⚛ Кол-во выданных РР: ${user.rrs}

💬 Кол-во ответов на репорт: ${user.otvets}
` : `

🆘 Кол-во полученных банов: ${user.getbans}
💬 Кол-во отправленных репортов: ${user.reports}`}

📆 Дата регистрации: <<${user.timeReg}>>
`)
});

cmd.hear(/^(?:выдать безлимразбаны)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 3) return
let user = users.find(x=> x.uid === message.args[1])
if(user.bezr === true) return bot(`у игрока и так есть безлимитные разбаны! ${smileerror}`)
user.bezr = true
return bot(`игроку ${name(user.uid)} выданы безлимитные разбаны! ${smilesuccess}`)
});

cmd.hear(/^(?:снять безлимразбаны)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 3) return
let user = users.find(x=> x.uid === message.args[1])
if(user.bezr === false) return bot(`у игрока и так нету безлимитных разбанов! ${smileerror}`)
user.bezr = false
return bot(`у игрока ${name(user.uid)} сняты безлимитные разбаны! ${smilesuccess}`)
});

cmd.hear(/^(?:выговор)\s(.*)\s?(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.settings.adm === 0) return bot(`это не админ! ${smileerror}`)
user.warn += 1
if(user.warn === 3){
	bot(`администратор получил 3 выговора и снят с поста!`)
	user.settings.adm = 0
	user.fakep = false
	user.faked = false
	user.rub = 0
	user.bank = 0
	user.btc = 0
	user.farms = 0
	user.farmslimit = 200
	user.energy = 10
	user.opit = 0
	user.biz = 0
	user.zhelezo = 0
	user.zoloto = 0
	user.almaz = 0
	user.bizlvl = 0
	user.nicklimit = 16
	user.rating = 0
	user.work = 0
	user.business = 0
	user.transport.car = 0
	user.transport.yacht = 0
	user.transport.airplane = 0
	user.transport.helicopter = 0
	user.realty.home = 0
	user.realty.apartment = 0
	user.misc.phone = 0
	user.misc.farm = 0
	user.misc.pet = 0
	user.pet.lvl = 0
	user.warn = 0
	vk.api.call("messages.removeChatUser", {chat_id: 1, user_id: user.id })
	let [user_info] = await vk.api.users.get({ user_id: user.id })
	if(message.chatId !== 1) vk.api.messages.send({chat_id: 1, message: `Администратор *id${user.id}(${user_info.first_name} ${user_info.last_name}) был исключён из беседы так как набрал 3 выговора.`})
	vk.api.messages.send({
		peer_id: user.id,
		message: `‼ Вы были сняты с поста администратора набрав 3 выговора!`
	})
	return
}
let asd = ''
if(message.args[2]) asd += message.args[2]
if(!message.args[2]) asd += `не указана`
await bot(`вы успешно выдали *id${user.id}(${user.tag}) +1 выговор [${user.warn}/3]. ${smilesuccess}`)
vk.api.messages.send({
	peer_id: user.id,
	message: `❗ Вы получили админское предупреждение! [${user.warn}/3]\n⚠ Причина: ${asd}!`
})
});

cmd.hear(/^(?:снятьадм)\s([0-9]+)\s?(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 1) return bot(`требуется ранг администратор`)
let i = Number(message.args[1])
if(!i) return
if(i === message.senderId){
	var user = message.user
	if(message.chatId !== 1) return bot(`используйте команду в беседе администрации! ${smileerror}`)
user.rub = 0
user.bank = 0
user.btc = 0
user.farms = 0
user.farmslimit = 3000
user.energy = 10
user.opit = 0
user.biz = 0
user.zhelezo = 0
user.zoloto = 0
user.almaz = 0
user.serebro = 0
user.rubin = 0
user.sapfir = 0
user.bizlvl = 0
user.nicklimit = 16
user.rating = 0
user.work = 0
user.business = 0
user.transport.car = 0
user.transport.yacht = 0
user.transport.airplane = 0
user.transport.helicopter = 0
user.realty.home = 0
user.realty.apartment = 0
user.misc.phone = 0
user.misc.farm = 0
user.misc.pet = 0
user.settings.adm = 0
user.pet.lvl = 0
	await bot(`вы успешно сняли с себя админку, пока-пока! 👋🏻`)
	vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: message.senderId })
	return
}
if(i !== message.senderId){
	if(message.user.settings.adm < 2) return
	var user = users.find(x=> x.uid === i)
	if(!user) return bot(`игрок не найден! ${smileerror}`)
	if(message.user.timesnadm > getUnix()) return bot(`вы сможете снять администратора через ${unixStampLeft(message.user.timesnadm - getUnix())}! ${smileerror}`)
	if(message.user.settings.adm === 2){ if(message.chatId !== 1) return bot(`используйте эту команду в беседе администрации! ${smileerror}`); if(!message.args[2]) return bot(`укажите причину! ${smileerror}`) }
	if(user.settings.adm === 3){ bot(`вы не можете снять создателя! ${smileerror}`); return message.sendSticker(16041) }
	if(user.settings.adm === 4){ bot(`дурак нет..?`); return message.sendSticker(7391) }
	if(user.settings.adm === 0) return bot(`это игрок! ${smileerror}`)
	let admnum = 0
	asdas = 0
	if(user.vip) admnum = user.vip === true & user.premium === false ? '1000000000000' : `${user.premium ? `2000000000000` : ``}`; asdas = user.vip === true & user.premium === false ? '50000000000' : `${message.user.premium ? 100000000000 : ``}`
	user.rub = 0
	user.bank = 0
	user.btc = 0
	user.farms = 0
	user.farmslimit = 3000
	user.energy = 10
	user.opit = 0
	user.biz = 0
	user.zhelezo = 0
	user.zoloto = 0
	user.almaz = 0
	user.serebro = 0
	user.rubin = 0
	user.sapfir = 0
	user.bizlvl = 0
	user.nicklimit = 16
	user.rating = 0
	user.work = 0
	user.business = 0
	user.transport.car = 0
	user.transport.yacht = 0
	user.transport.airplane = 0
	user.transport.helicopter = 0
	user.realty.home = 0
	user.realty.apartment = 0
	user.misc.phone = 0
	user.misc.farm = 0
	user.misc.pet = 0
	user.pet.lvl = 0
	user.banklimit = Number(admnum)
	user.limit = Number(asdas)
	let [user_info] = await vk.api.users.get({ user_id: user.id })
	await bot(`администратор *id${user.id}(${user.tag}) успешно снят с поста! ${smilesuccess}`)
	vk.api.call("messages.removeChatUser", {chat_id: 1, user_id: user.id })
	if(message.chatId !== 1) vk.api.messages.send({ chat_id: 1, message: `Администратор ${user_info.first_name} ${user_info.last_name} был исключён из беседы так как отныне не является администратором.` })
	if(!message.args[2]) message.args[2] = `не указана`
	if(message.user.settings.adm === 2) message.user.timesnadm = getUnix() + 300000
	if(message.user.settings.adm === 2) vk.api.messages.send({ peer_id: config.ownerid, message: `Снят администратор!\nЗаместитель ${name(message.user.uid)} снял администратора ${name(user.uid)}! Причина: ${message.args[2]}`,
		keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": `выдатьадм ${user.uid} ${user.settings.adm}`
},
"color": "positive"
}
]
]
})
})
user.settings.adm = 0
}
});

cmd.hear(/^(?:помощь|команды|📚 Помощь|меню|help|commands|cmds|menu|начать|start|@destinybot 📚 Помощь)$/i, async (message, bot) => {
	await bot(`мои команды:

🍀 Развлекательные:
🙊 Анекдот
↪ Переверни [фраза]
🔮 Шар [фраза]
📊 Инфа [фраза]
⚖ Выбери [фраза] или [фраза2]

🚀 Игры:
⠀⠀🎲 Кубик [1-6]
⠀⠀🎰 Казино [сумма]
⠀⠀📈 Трейд [вверх/вниз] [сумма]
⠀⠀🥛 Стаканчик [1-3] [сумма]
⠀⠀🔦 Сейф [случайные 2 цифры]
⠀⠀🍂 Добывать
⠀⠀🚕 Таксовать
⠀⠀💲 Монетка [орёл/решка]

👔 Работа - список работ
⠀🔨 Работать
⠀❌ Уволиться

💼 Бизнес:
⠀⠀📈 Бизнес - статистика
⠀⠀💵 Бизнес снять
⠀⠀✅ Бизнес улучшить

🌽 Питомцы:
⠀⠀🐒 Питомец - информация
⠀⠀🐪 Питомец прогулка
⠀⠀🌟 Питомец улучшить


🔥 Полезное:
📠 Реши [пример]
📊 Курс

💡 Разное:
📒 Профиль
💲 Баланс
💰 Банк [сумма/снять сумма]
👑 Рейтинг - ваш рейтинг
✒ Ник [ник/вкл/выкл]
🛒 Магазин
➖ Продать [предмет]
🔋 Ферма - Биткоин ферма
🤝 Передать [id] [сумма]
🏆 Топ рейтинг
📚 лицензии

💎 Бонус - ежедневный бонус
👪 Брак [id] - сделать предложение
⠀ ⠀Браки - список предложений
💔 Развод
🔊 Дискорд - ссылка на наш дискорд
🎁 Донат
🆔 Стикерид - узнать айди стикера
🌃 Погода [город/страна] - узнать погоду
💭 Вики [текст] - узнать информацию с вики
💌 Секс [сообщение] - заняться сексом
🤗 Обнять [сообщение] - обняться
😘 Поцеловать [сообщение] - поцеловаться
👺 Дать пощёчину [сообщение] - дать кому-то пощёчину

🚥 Кнопки [вкл/выкл] - вкл./откл. кнопки
🆘 Репорт [фраза] - ошибки или пожелания`)
});
// https://discord.gg/dhbuTx

cmd.hear(/^(?:дискорд|дс|какой дс бота|дайте ссылку на дс бота|дайте ссылку бота на дс|ds|discord|какой дискорд у бота|дайте ссылку дискорда у бота|какая ссылка на дискорд)$/i, async (message, bot) => {
return bot(`держи: https://discord.gg/dhbuTx`)
});

cmd.hear(/^(?:бот время)$/i, async (message, bot) => {return message.send(`⏰ Москва: ${timereg()}! ${smilesuccess}`)});

cmd.hear(/^(?:клан)\s?(.*)$/i, async (message, bot) => {
return bot(`к сожалению раздел кланов временно приостановлен на технические работы! Приносим свои извинения.`)
});

cmd.hear(/^(?:узнать)\s?(https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)$/i, async (message, bot) => {
if(message.args[3]) return message.send(`Требуется ссылка в формате <<https://vk.com/quit_please>>!`)
if(!message.args[4]) return
message.args[4] = message.args[4].split(" ")
vk.api.call("utils.resolveScreenName", {
screen_name: message.args[4]
}).catch((err) => { return message.send(`Произошла ошибка! \nПопробуйте формат <<узнать quit_please>> или <<узнать https://vk.com/quit_please>> (обязательно указывайте <<https://>>!)`) })
.then((res) => {
if(res.object_id === undefined) return message.send(`Пользователь не найден! ${smileerror}`)
return message.send(`Адрес: https://vk.com/${message.args[4]}\nЦифровой адрес: ${res.object_id}`)
})
});

cmd.hear(/^(?:правила бота|!правила|правила|какие правила бота|где можно узнать правила бота)$/i, async (message, bot) => {
return bot(`текущий список правил указан по этой ссылке:\n-> https://vk.com/topic-191399146_40051900`)
});

cmd.hear(/^(?:лицензии)\s?([1-4])?/i, async (message) => { 
if(!message.args[1]) { 
return message.send(`📖 Лицензии 
🚗 Лицензия на автомобиль: ${message.user.lic1 ? '☑' : '❌'} 
⛴ Лицензия на яхту: ${message.user.lic2 ? '☑' : '❌'} 
🛩 Лицензия на самолёт: ${message.user.lic3 ? '☑' : '❌'} 
🚁 Лицензия на вертолёт: ${message.user.lic4 ? '☑' : '❌'} 

Для покупки лицензии используй: лицензия`) 
} else if(message.args[1] && message.args[1] == 1) { 
if(message.user.lic1) return message.send('Вы уже имеете данную лицензию!');
message.user.balance -= 5000;
message.user.lic1 = true 
		
return message.send(`Вы успешно приобрели данную лицензию\n\n📖 Лицензии 
🚗 Лицензия на автомобиль: ${message.user.lic1 ? '☑' : '❌'} 
⛴ Лицензия на яхту: ${message.user.lic2 ? '☑' : '❌'} 
🛩 Лицензия на самолёт: ${message.user.lic3 ? '☑' : '❌'} 
🚁 Лицензия на вертолёт: ${message.user.lic4 ? '☑' : '❌'}`) 
} else if(message.args[1] && message.args[1] == 2) { 
if(message.user.lic2) return message.send('Вы уже имеете данную лицензию!'); 
message.user.lic2 = true 
return message.send(`Вы успешно приобрели данную лицензию\n\n📖 Лицензии 
🚗 Лицензия на автомобиль: ${message.user.lic1 ? '☑' : '❌'} 
⛴ Лицензия на яхту: ${message.user.lic2 ? '☑' : '❌'} 
🛩 Лицензия на самолёт: ${message.user.lic3 ? '☑' : '❌'} 
🚁 Лицензия на вертолёт: ${message.user.lic4 ? '☑' : '❌'}`) 
} else if(message.args[1] && message.args[1] == 3) { 
if(message.user.lic3) return message.send('Вы уже имеете данную лицензию!'); 
message.user.lic3 = true 
return message.send(`Вы успешно приобрели данную лицензию\n\n📖 Лицензии 
🚗 Лицензия на автомобиль: ${message.user.lic1 ? '☑' : '❌'} 
⛴ Лицензия на яхту: ${message.user.lic2 ? '☑' : '❌'} 
🛩 Лицензия на самолёт: ${message.user.lic3 ? '☑' : '❌'} 
🚁 Лицензия на вертолёт: ${message.user.lic4 ? '☑' : '❌'}`) 
} else if(message.args[1] && message.args[1] == 4) { 
if(message.user.lic4) return message.send('Вы уже имеете данную лицензию!'); 
message.user.lic4 = true 
return message.send(`Вы успешно приобрели данную лицензию\n\n📖 Лицензии 
🚗 Лицензия на автомобиль: ${message.user.lic1 ? '☑' : '❌'} 
⛴ Лицензия на яхту: ${message.user.lic2 ? '☑' : '❌'} 
🛩 Лицензия на самолёт: ${message.user.lic3 ? '☑' : '❌'} 
🚁 Лицензия на вертолёт: ${message.user.lic4 ? '☑' : '❌'}`) 
} 
});

cmd.hear(/^(?:раздача)\s?(.*)$/i, async (message, bot) => {
	if(giving) return bot(`раздача уже идёт! ${smileerror}`)
	if(!message.args[1]) message.args[1] = 5000000
	giving = true;
	let id = -181827386
	let iid = config.groupid
	let tok = ``
	bot(`раздача началась! ${smilesuccess}`)
	vk.api.wall.post({
		access_token: tok,
		owner_id: id,
		message: `
        🔥 >> Привет! Рад видеть тебя. Короче делай репост и получай ${utils.sp(message.args[1])}₽ на свой баланс!

		📢 >> Предупреждение:
		⚠ || Перед тем, как репостить, Вы должны написать любое сообщение в ЛС нашему сообществу. Так же необходимо, чтобы у Вас был открыт профиль. 

		💥 >> Ограничение по времени:
		⏰ || Внимание! Раздача будет проходить ТОЛЬКО 10 минут, после того как пост выложен.

		💰 Деньги на баланс будут выданы по окончанию акции. Удачи!`
	}).then((response) => {
		vk.api.messages.send({ access_token: tok, message: `${response.post_id} 💥 Скорей делай репост!` })
		setTimeout(() => {
			vk.api.call('wall.getReposts', { access_token: tok, owner_id: id, post_id: response.post_id, count: 1000 }).then((res) => { 
				res.items.map(x=> {
					if(x.from_id < 0) return;
					let user = users.find(a => a.id === x.from_id);
					if(!user) return; 
					user.rub += message.args[1];
					user.razdacha = true
					if(!a) vk.api.messages.send({ access_token: tok, user_id: id, message: `Спасибо за участие в акции! Вам начислено: ${utils.sp(message.args[1])}₽` })
					user.razdacha = false
				});
			});
			giving = false;
		}, 600000);
	});
});

cmd.hear(/^(?:статистика)$/i, async (message, bot) => {
let a = 0
let b = 0
let c = 0
let d = 0
for(let id in users){
	if(users[id].online === true) a += 1
	if(users[id].vip === true) b += 1
	if(users[id].premium === true) c += 1
	if(users[id].settings.adm !== 0) d += 1
}
return bot(`информация:
	🧩 Текущее состояние: Работает.
	👥 Игроков зарегистрировано: ${utils.sp(users.length - 1)} (${a} онлайн)

	🔝 Время беспрерывной работы: ${unixStampLeft(process.uptime() * 1000)}

	👑 Вип игроков: ${utils.sp(b)} | Премиум игроков: ${utils.sp(c)}
	🤵 Администраторов: ${utils.sp(d)}
	`)
});
//photo-188608231_457239106

cmd.hear(/^(?:уебать|отпиздить|дать пощёчину)$/i, async (message, bot) => {
if(!message.forwards[0]) return; 
let [user_info] = await vk.api.users.get({ user_id: message.forwards[0].senderId, fields: 'first_name,last_name,sex', name_case: 'gen' }); 
let [user_info_sender] = await vk.api.users.get({ user_id: message.senderId, fields: 'first_name,last_name,sex' }); 
return message.isChat ? vk.api.messages.send({chat_id: message.chatId, message: `👺 Новый нокаут! 👺\n${user_info_sender.first_name.substring(0, 1)}. ${user_info_sender.last_name} отпиздил${user_info_sender.sex === 1 ? `а` : ``} ${user_info.first_name.substring(0, 1)}. ${user_info.last_name}!`, attachment: 'photo-188608231_457239106'}) : vk.api.messages.send({peer_id: message.senderId, message: `👺 Новый нокаут! 👺\n${user_info_sender.first_name.substring(0, 1)}. ${user_info_sender.last_name} отпиздил${user_info_sender.sex === 2 ? `а` : ``} ${user_info.first_name.substring(0, 1)}. ${user_info.last_name}!`, attachment: 'photo-188608231_457239106'}) 
})

cmd.hear(/^(?:секс|sex|сэкс|го поскрипим на кровати|заняться сэксом|заняться сексом|перепихнуться|шифтануться|поебаться|го секс|го сэкс|го потрахаемся)$/i, async (message, bot) => {
if(message.user.sex_t > getUnix()) return bot(`вы сможете заняться сексом через ${unixStampLeft(message.user.sex_t - getUnix())}`); 
if(!message.forwards[0]) return; 
let [user_info] = await vk.api.users.get({ user_id: message.forwards[0].senderId, fields: 'first_name,last_name,sex', name_case: 'dat' }); 
let [user_info_sender] = await vk.api.users.get({ user_id: message.senderId, fields: 'first_name,last_name,sex' }); 
if(user_info_sender.sex === 2 & user_info.sex === 2) return bot(`по моему, у неё хуй...`); let user = users.find(x=> x.id === message.forwards[0].senderId); 
if(user.protects !== 0){user.protects -= 1; message.user.sex_t = getUnix() + 60000*10; 
return bot(`у человека была защита и он воспользовался ею! Вы сможете вновь заняться сексом через ${unixStampLeft(message.user.sex_t - getUnix())}`)}
return message.isChat ? vk.api.messages.send({chat_id: message.chatId, message: `💌 Новый движ! 💌\n${user_info_sender.first_name.substring(0, 1)}. ${user_info_sender.last_name} занялся сэксом с ${user_info.first_name.substring(0, 1)}. ${user_info.last_name}!`, attachment: 'photo-188608231_457239101'}) : vk.api.messages.send({peer_id: message.senderId, message: `💌 Новый движ! 💌\n${user_info_sender.first_name.substring(0, 1)}. ${user_info_sender.last_name} занялся сэксом с ${user_info.first_name.substring(0, 1	)}. ${user_info.last_name}!`, attachment: 'photo-188608231_457239101'}) 
})
cmd.hear(/^(?:обнять)$/i, async (message, bot) => {if(!message.forwards[0]) return; let [user_info] = await vk.api.users.get({ user_id: message.forwards[0].senderId, fields: 'first_name,last_name,sex', name_case: 'acc' }); let [user_info_sender] = await vk.api.users.get({ user_id: message.senderId, fields: 'first_name,last_name,sex' }); return message.isChat ? vk.api.messages.send({ chat_id: message.chatId, message: `🤗 Обнимашки-и-и 🤗\n${user_info_sender.first_name.substring(0, 1)}. ${user_info_sender.last_name} обнял ${user_info.first_name.substring(0, 1)}. ${user_info.last_name}!`, attachment: 'photo-188608231_457239102' }) : vk.api.messages.send({ peer_id: message.senderId, message: `🤗 Обнимашки-и-и 🤗\n${user_info_sender.first_name.substring(0, 1)}. ${user_info_sender.last_name} обнял ${user_info.first_name.substring(0, 1)}. ${user_info.last_name}!`, attachment: 'photo-188608231_457239102' })})
cmd.hear(/^(?:поцеловать)$/i, async (message, bot) => {if(!message.forwards[0]) return; let [user_info] = await vk.api.users.get({ user_id: message.forwards[0].senderId, fields: 'first_name,last_name,sex', name_case: 'acc' }); let [user_info_sender] = await vk.api.users.get({ user_id: message.senderId, fields: 'first_name,last_name,sex' }); return message.isChat ? vk.api.messages.send({ chat_id: message.chatId, message: `😘 Поцелучики-и-и 😘\n${user_info_sender.first_name.substring(0, 1)}. ${user_info_sender.last_name} поцеловал ${user_info.first_name.substring(0, 1)}. ${user_info.last_name}!`, attachment: 'photo-188608231_457239103' }) : vk.api.messages.send({ peer_id: message.senderId, message: `😘 Поцелучики-и-и 😘\n${user_info_sender.first_name.substring(0, 1)}. ${user_info_sender.last_name} поцеловал ${user_info.first_name.substring(0, 1)}. ${user_info.last_name}!`, attachment: 'photo-188608231_457239103' })})

cmd.hear(/^(?:бот)$/i, async (message, bot) => {return message.sendSticker(utils.pick([15250, 10402, 8472, 8481, 7387, 16029, 12467, 15884, 16211, 12970, 12992, 11607, 11238, 14272, 13803, 13527, 14085, 14437, 5937, 12296, 13253, 6864]))});

cmd.hear(/^(?:переверни)\s([^]+)$/i, async (message, bot) => {
	let text = ``;
	message.args[1].split('').map(x=> {
		if(rotateText[x])
		{
			text += rotateText[x];
		}
	});

	return bot(`держи: <<${text.split('').reverse().join('')}>>`)
});

cmd.hear(/^(?:шар)\s([^]+)$/i, async (message, bot) => {
	if(message.args[1] == `гоша лох`){
		await bot(`сам лох!`)
		return message.sendSticker(16044)
	}
	if(message.args[1] == `андрей лох`){
		await bot(`себя видел?`)
		return message.sendSticker(16044)
	}
	if(message.args[1] == `админы лохи`){return bot(`а сам-то!`)}
	if(message.args[1] == `мне выпадет х1000`){return bot(`надеюсь что нет. Ой, это же не по сценарию, кхм. Пока не ясно.`)}
	if(message.args[1] == `мне выпадет x1000`){return bot(`надеюсь что нет. Ой, это же не по сценарию, кхм. Пока не ясно.`)}
	const phrase = utils.pick(['перспективы не очень хорошие', 'сейчас нельзя предсказать', 'пока не ясно', 'знаки говорят - "Да"', 'знаки говорят - "Нет"', 'можешь быть уверен в этом', 'мой ответ - "нет"', 'мой ответ - "да"', 'бесспорно', 'мне кажется - "Да"', 'мне кажется - "Нет"']);
	return bot(phrase);
});

cmd.hear(/^(?:инфа|шанс|вероятность)\s([^]+)$/i, async (message, bot) => {
	const phrase = utils.pick(['шанс этого', 'мне кажется около']);
	const percent = utils.random(100);

	return bot(`${phrase} ${percent}%`)
});

cmd.hear(/^(?:выбери)\s([^]+)\s(?:или)\s([^]+)$/i, async (message, bot) => {
	const first = message.args[1];
	const second = message.args[2];

	const phrase = utils.pick([`конечно ${utils.pick([1, 3]).toString().replace(/1/gi, `<<${message.args[1]}>>`).replace(/2/gi, `<<${message.args[2]}>>`)}`, `мне кажется, что ${utils.pick([1, 2]).toString().replace(/1/gi, `<<${message.args[1]}>>`).replace(/2/gi, `<<${message.args[2]}>>`)}`, `боги сказали, что ${utils.pick([1, 2]).toString().replace(/1/gi, `<<${message.args[1]}>>`).replace(/2/gi, `<<${message.args[2]}>>`)}`, `помолившись на святой латыни, курицы сообщили мне что ${utils.pick([1, 2]).toString().replace(/1/gi, `<<${message.args[1]}>>`).replace(/2/gi, `<<${message.args[2]}>>`)}`]);
	return bot(`${phrase}! ${smilesuccess}`);
});

cmd.hear(/^(?:донат)$/i, async (message, bot) => { 
return bot(`❗| Информация о товарах бота - все права защищены. 

🔥 | Верифицированный игрок - (100₽)
Подтвержденный аккаунт 
Галочка в профиле 

🔥 | Вип статус - (200₽) 

Увеличен шанс победы во всех играх в ДВА раза. 
Увеличен лимит передачи другим игрокам до 200.000.000.000$ в сутки. 
Увеличено максимальное количество денег в банке до 100.000.000.000$ 
Максимальное количество ферм увеличено до 6.000 
Увеличена максимальная энергия до 50. 
Получение бонуса командой бонус вип. 
Нету уменьшения прибыли с бизнеса. 
Красивая отметка в профиле. 
Возможность установить длинный ник. 
Время до получения бонуса уменьшено в ДВА РАЗА.
 
🔥 | Премимум - (300₽)

Увеличен шанс победы во всех играх в ТРИ раза. 
Увеличен лимит передачи другим игрокам до 1.000.000.000.000₽ в сутки. 
Увеличено максимальное количество денег в банке до 3.000.000.000.000₽ 
Максимальное количество ферм до 14.000 
Увеличена максимальная энергия до 30! 
Нету уменьшения прибыли с бизнеса. 
Питомец больше никогда не умирает. 
Красивая отметка в профиле. 
Возможность установить ОЧЕНЬ длинный ник. 
Время до получения бонуса уменьшено в ЧЕТЫРЕ РАЗА. 
Возможность просматривать чужие профили. 
Возможность получить бонус командой бонус премиум. 

🔥| Администратор - (450₽). 

[💰] Выдать (ид) (сумма) 
[💵] Проф (ид) 
[🤠] Выдать опыт (ид) (количество) 
[😎] Выдать энергию (ид) (количество) 
[🅰] Ответ (ид) (ответ) 
[❄] Узнать (ссылка) 
[🆘] Бан (ид) (время) (причина) 
[🆘] Бан передачи (ид) (причина) 
[🎃] Фейкпроф 
[🤠] Фейквыкл 

✏| За покупкой - писать сюда @andrei_killer_top1(создателю) `); 
});

cmd.hear(/^(?:админка|панель)$/i, async (message, bot) => { 
if(message.user.settings.adm < 2) return bot(`у вас нет привилегии`) 
if(message.user.vip == true) return bot(`Команды VIP: 
Увеличен шанс победы во всех играх в ДВА раза. 
Увеличен лимит передачи другим игрокам до 200.000.000.000$ в сутки. 
Увеличено максимальное количество денег в банке до 100.000.000.000$ 
Максимальное количество ферм увеличено до 6.000 
Увеличена максимальная энергия до 50. 
Получение бонуса командой бонус вип. 
Нету уменьшения прибыли с бизнеса. 
Красивая отметка в профиле. 
Возможность установить длинный ник. 
Время до получения бонуса уменьшено в ДВА РАЗА.`) 
if(message.user.settings.adm == 3) return bot(`Команды Администратора: 
[💰] Выдать (ид) (сумма) 
[💵] Проф (ид) 
[🤠] Выдать опыт (ид) (количество) 
[😎] Выдать энергию (ид) (количество) 
[🅰] Ответ (ид) (ответ) 
[❄] Узнать (ссылка) 
[🆘] Бан (ид) (время) (причина) 
[🆘] Бан передачи (ид) (причина) 
[🎃] Фейкпроф 
[🤠] Фейквыкл`) 
if(message.user.premium == true) return bot(`Команды премиума: 
Увеличен шанс победы во всех играх в ТРИ раза. 
Увеличен лимит передачи другим игрокам до 1.000.000.000.000₽ в сутки. 
Увеличено максимальное количество денег в банке до 3.000.000.000.000₽ 
Максимальное количество ферм до 14.000 
Увеличена максимальная энергия до 30! 
Нету уменьшения прибыли с бизнеса. 
Питомец больше никогда не умирает. 
Красивая отметка в профиле. 
Возможность установить ОЧЕНЬ длинный ник. 
Время до получения бонуса уменьшено в ЧЕТЫРЕ РАЗА. 
Возможность просматривать чужие профили. 
Возможность получить бонус командой бонус премиум. 
`) 
});

cmd.hear(/^(?:Разрабпанель)$/i, async (message, bot) => { 
if(message.user.settings.adm < 4) return message.send(`у вас нет привилегии`) 
await bot(`Команды Разработчика: 
ᅠᅠ⚙ ВЫДАЧА ⚙ 
⚙ Выдать [переселанное сообщение + сумма] 
⚙ Выдать вечнобан [ID игрока] 
⚙ Выдать безлимбан [ID игрока] 
⚙ Выдать банк [ID игрока] [сумма] 
⚙ Выдать дайадм [ID игрока] - получить доступ к команде «дайадм» 
⚙ Выдать безлимразбаны [ID игрока] 
⚙ Выдать опыт [ID игрока] [сколько] 
⚙ Выдать рейтинг [ID игрока] [сколько] 
⚙ Выдать энергию [ID игрока] [сколько] 
⚙ Выдать биткоин [ID игрока] [сколько] 
⚙ Выдать ответ [ID игрока] - доступ к команде ответ выдать 
⚙ Увл [ID игрока] - выдать у игрока безлимитные переводы 
⚙ Выдатьпремиум [ID игрока] - выдать статус премиум у игрока 
⚙ Выдатьвип [ID игрока] - выдать статус вип у игрока 
⚙ Выдатьадм [ID игрока] [уровень] [причина] - выдать админ у игрока 
⚙ Выдать обнул [ID игрока] - выдать доступ к команде обнуление 
⚙ Тестер [ID игрока] - выдать бета-тестер у игрока 
⚙ Выдать империалы [ID игрока] [сумма] 
⚙ префикс [ID игрока] [любое слово] - выдать префикс у игрока 
⚙ Выдать лвл [ID игрока] [уровень] 
⚙ Отнять лвл [ID игрока] [уровень] 
⚙ Защита [ID игрока] - выдать защищен от банов 
⚙ Веф [ID игрока] - выдать верифицированный игрок 

ᅠᅠ⚙ УСТАНОВЛЕНИЕ ⚙ 
⚙ Ул [ID игрока] [сумма] - установить лимит передачи 
⚙ Установить лвл [ID игрока] [уровень] 
⚙ Промо слово - установить слово на промокод. 

ᅠᅠ⚙ СНИМАНИЕ ⚙ 
⚙ Снять вечнобаны [ID игрока] 
⚙ Снять безлимбаны [ID игрока] 
⚙ Снять банк [ID игрока] [сумма] 
⚙ Снять дайадм [ID игрока] - не может использовать команду «дайадм» 
⚙ Снять защиту [ID игрока] - не защищен от банов 
⚙ Снять безлимразбаны [ID игрока] 
⚙ Снять рейтинг [ID игрока] [сколько] 
⚙ Снять опыт [ID игрока] [сколько] 
⚙ Снять биткоин [ID игрока] [сколько] 
⚙ Снять энергию [ID игрока] [сколько] 
⚙ Снять ответ [ID игрока] - доступ к команде ответ отнять 
⚙ Снять фермы [ID игрока] - отнять у игрока ферм 
⚙ Снятьвп [ID игрока] - снять у игрока все статусы 
⚙ Снятьвип [ID игрока] - снять у игрока статус вип 
⚙ Снятьпремиум [ID игрока] - снять у игрока статус премиум 
⚙ Снять [ID игрока] [сумма] 
⚙ Снять обнул [ID игрока] - снимать доступ к команде обнуление 
⚙ -тестер [ID игрока] - снять тестер у игрока 
⚙ Снятьадм [ID игрока] [ПРИЧИНА] - снять админ у игрока 
⚙ снять империалы [ID игрока] [сумма] 
⚙ -империалы [ID игрока] - отнять империалы у игрока 
⚙ Отнять лвл [ID игрока] [уровень] 
⚙ Снять веф [ID игрока] 
⚙ Вынести из чс проекта - снимать черный список в беседе`) 
await message.send(` 
ᅠᅠ⚙ РАЗРЕШЕНИЕ ⚙ 
⚙ Разрешить бан [ID игрока] - разрешить баны! 
⚙ Разрешить сразбан [ID игрока] - вновь могут разбанить! 
⚙ Разрешить разбаны [ID игрока] - разрешить разбаны! 

ᅠᅠ⚙ ЗАПРЕТ ⚙ 
⚙ Запрет сразбан [ID игрока] - не могут разбанить! 
⚙ Запрет бан [ID игрока] - запретить баны! 
⚙ Запрет разбан [ID игрока] - запретить разбаны!`) 
await message.send(` 
ᅠᅠ⚙ ВКЛЮЧЕНИЕ ⚙ 
⚙ Промо активировать - все игроки смогут использовать промокод. 
⚙ Включить статус - сис-ма автоматической смены статуса включена. 
⚙ Включить промо - сис-ма автоматических промокодов включена. 
⚙ Рр [ID игрока] [причина] - включить репорт 
⚙ Слежка [ID игрока] - включить слежка у игрока 

ᅠᅠ⚙ ВЫКЛЮЧЕНИЕ ⚙ 
⚙ Выключить статус - сис-ма автоматической смены статуса выключена. 
⚙ Бр [ID игрока] [причина] - отключить репорт 
⚙ Выключить промо - сис-ма автоматических промокодов выключена. 
⚙ -слежка [ID игрока] - выключить слежка у игрока`) 
await message.send(` 
ᅠᅠ⚙ ПРОМОКОДЫ ⚙ 
⚙ Промо лимит [число] - лимит игроков, которые смогут использовать промокод. 
⚙ Промо сумма [число] - сумма промокода. 
⚙ Промо тип [биткоин/баланс] - тип промокода. 
⚙ Промо стата - информация о промокодах. 
⚙ Промо слово - установить слово на промокод.`) 
await message.send(` 
ᅠᅠ⚙ ОБНУЛЕНИЕ ⚙ 
⚙ Бобнулить [ID игрока] - обнулить баланс у игрока 
⚙ Обнул [ID
 
игрока] - обнулить профиль`) 
await message.send(` 
ᅠᅠ⚙ ОБЫЧНОЕ ⚙ 
⚙ Стата [ID игрока] 
⚙ Стата 
⚙ узнать [ссылка] - узнать ид страницы 
⚙ Статистика - посмотреть сколько всего пользователей 
⚙ Найти [ссылка] 
⚙ Профиль [ID игрока] 
⚙ Сн [ID игрока] - сменить ник у игрока 
⚙ Созвать - только в беседе 
⚙ Бот онлайн - только в беседе 
⚙ Выговор [ID игрока] - выдать выговор 0/3 
⚙ Убратьпреф - себе убрать префикс 
⚙ Дайпреф - выдать себе префикс 
⚙ Бот смени [ид беседы] [название] - только в беседе 
⚙ Бот смени эту [название] - только в беседе 
⚙ Кик [ссылка] - только в беседе 
⚙ Кик [переселанное сообщение] - только в беседе 
⚙ Ответ [ID игрока] [сообщение] 
⚙ Выдатьспроф [ID игрока] - выдать фейк профиль 
⚙ Снятьспроф [ID игрока] - снимать фейк профиль 
⚙ Вернутьпроф - вернуть профиль 
⚙ Скрытьпроф - скрывать свой профиль 
⚙ Внести из чс проекта - черный список в беседе`) 
await message.send(` 
ᅠᅠ⚙ РАЗДАЧА ⚙ 
⚙ Раздача [сумма] 
`) 
});

cmd.hear(/^(?:фейкпроф|фейкпрофиль)$/i, async (message, bot) => {
	let text = ``;
	if(message.user.settings.adm < 1) return
	let zwork = ''
	if(message.user.transport.car !== 0 || message.user.transport.yacht !== 0 || message.user.transport.airplane !== 0 || message.user.transport.helicopter !== 0||
		message.user.realty.home !== 0 || message.user.realty.apartment !== 0 ||
		message.user.misc.phone !== 0 || message.user.misc.farm !== 0 || message.user.business !== 0 || message.user.misc.pet !== 0)
	{
		text += "\n🔑 Имущество:\n"
		if(message.user.transport.car !== 0) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht !== 0) text += `⠀🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane !== 0) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter !== 0) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;

		if(message.user.realty.home !== 0) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment !== 0) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;

		if(message.user.misc.phone !== 0) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.pet !== 0) text += `⠀${pets[message.user.misc.pet - 1].smile} Питомец: ${pets[message.user.misc.pet - 1].name}\n`;
		if(message.user.misc.farm !== 0) text += `⠀🔋 Фермы: ${farms[message.user.misc.farm - 1].name} (x${message.user.farms})\n`;
		if(message.user.business !== 0) text += `⠀${businesses[message.user.business - 1].icon} ${businesses[message.user.business - 1].name}\n`;
	}
	if(message.user.work !== 0) zwork += `\n\n👔 Работа: ${works[message.user.work - 1].name}`;
	let adm = ''
	let namer = ''
	let bankt = ''
	let btct = ''
	let ratet = ''
	let energyt = ''
	let betat = ''
	let tklan = ''
	let bablo = utils.random(438971, 39084232)
	let bablob = utils.random(982316, 3495734893)
	let byte = utils.random(100, 5000)
	let prefix = ``
	if(message.user.vef === true) prefix = `✓ `
	if(message.user.rating > 0){ratet += `\n👑 Рейтинг: ${utils.sp(message.user.rating)}`}
	if(message.user.betatest === true){betat += `\n⛔ Ђҿτα-Ŧҿςτҿթ`}
	if(message.user.vip){adm += `\n💎 ${prefix}Вип${message.user.premium ? ` + Премиум` : ``}`}
	if(message.user.vip === false & message.user.vef === true){adm += `✅ Верифицированный пользователь`}
	return bot(`твой профиль:
		🔎 ID: ${message.user.uid} ${adm} ${betat} ${tklan}
		💰 Денег: ${utils.sp(bablo)}₽
		💳 В банке: ${utils.sp(bablob)}₽ ${ratet}
		💽 Биткоинов: ${utils.sp(byte)}฿
		🏋‍♂ Энергия: ${message.user.energy} ${zwork}
		⚡ Опыт: ${utils.sp(message.user.opit)}
		${text}
		📚 Дата регистрации: <<${message.user.timeReg}>>`);
});

cmd.hear(/^(?:топ)$/i, async (message, bot) => {
return bot(`выберите необходимый вам топ:`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `топ рейтинг`
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": `топ баланс`
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": `топ Биткоин`
},
"color": "positive"
}]
]
})
});
})

cmd.hear(/^(?:профиль|проф|пpоф|прoф|пpoф|ghja|прлф|ghka|проы)$/i, async (message, bot) => {
	let text = ``;
	if(!message.forwards[0]){
	let zwork = ''
	if(message.user.transport.car !== 0 || message.user.transport.yacht !== 0 || message.user.transport.airplane !== 0 || message.user.transport.helicopter !== 0||
		message.user.realty.home !== 0 || message.user.realty.apartment !== 0 ||
		message.user.misc.phone !== 0 || message.user.misc.farm !== 0 || message.user.business !== 0 || message.user.misc.pet !== 0)
	{
		text += "\n🔑 Имущество:\n"
		if(message.user.transport.car !== 0) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht !== 0) text += `⠀🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane !== 0) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter !== 0) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;

		if(message.user.realty.home !== 0) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment !== 0) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;

		if(message.user.misc.phone !== 0) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.pet !== 0) text += `⠀${pets[message.user.misc.pet - 1].smile} Питомец: ${message.user.pet.name !== false ? message.user.pet.name : pets[message.user.misc.pet - 1].name} (${message.user.pet.lvl} ур.)\n`;
		if(message.user.misc.farm !== 0) text += `⠀🔋 Фермы: ${farms[message.user.misc.farm - 1].name} (x${utils.sp(message.user.farms)} шт.)\n`;
		if(message.user.business !== 0) text += `⠀${businesses[message.user.business - 1].icon} ${businesses[message.user.business - 1].name}\n`;
	}
	if(message.user.work !== 0) zwork += `\n\n${works[message.user.work - 1].icon} Работа: ${works[message.user.work - 1].name}\n🌟 Уровень: ${message.user.level} [${message.user.exp}/24]`;
	let adm = ''
	let namer = ''
	let bankt = ''
	let btct = ''
	let energyt = ''
	let betat = ''
	let tklan = ''
	/*if(message.user.klan !== false){
	let klan = klans.find(x=> x.id === message.user.klan)
	tklan += `\n⚔ Клан: ${klan.name}`
    }*/
    let prefix = ''
    let brak = ''
    let don = ''
    if(message.user.donate !== 0) don += `\n💎 Империалов: ${utils.sp(message.user.donate)}`
    if(message.user.marriage.partner !== 0){ let brakuser = users.find(x=> x.uid === message.user.marriage.partner); brak += `\n\n❤ Состоит в браке с *id${brakuser.id}(${brakuser.tag})` }
	if(message.user.betatest === true){betat += `\n⛔ Бета-тестер`}
	if(message.user.prefix === false){
	if(message.user.vip !== false & message.user.settings.adm === 0){adm += `\n🔥 [Wolfbot15|${prefix}Вип${message.user.premium ? ` + Премиум` : ` статус`}]`}
	if(message.user.premium !== false & message.user.settings.adm === 0 & message.user.vip === false){adm += `\n🔔 [Wolfbot15|${prefix}Премиум статус]`}
	if(message.user.fakep === false){
	if(message.user.premium === true & message.user.settings.adm !== 0 & message.user.vip === false){adm += `\n🔔 [Wolfbot15|${prefix}${message.user.settings.adm.toString().replace(/1/gi, "Администратор").replace(/2/gi, "Заместитель").replace(/3/gi, "Основатель").replace(/4/gi, "Разработчик")} + Премиум]`}
	if(message.user.vip === false & message.user.settings.adm !== 0 & message.user.premium === false){adm += `\n🔔 [Wolfbot15|${prefix}${message.user.settings.adm.toString().replace(/1/gi, "Администратор").replace(/2/gi, "Заместитель").replace(/3/gi, "Основатель").replace(/4/gi, "Разработчик")}]`}
	if(message.user.vip !== false & message.user.settings.adm !== 0){adm += `\n🔥 [Wolfbot15|${prefix}${message.user.settings.adm.toString().replace(/1/gi, "Администратор").replace(/2/gi, "Заместитель").replace(/3/gi, "Основатель").replace(/4/gi, "Разработчик")} + Вип${message.user.premium ? ` + Премиум` : ``}]`}
	}
	if(message.user.fakep === true){
		if(message.user.vip !== false){adm += `\n🔥 [Wolfbot15|${prefix}Вип${message.user.premium ? ` + Премиум` : ` статус`}]` }
		if(message.user.premium === true & message.user.vip === false){adm += `\n🔥 [Wolfbot15|${prefix}Премиум статус]`}
	}
	if(message.user.vip === false & message.user.settings.adm === 0 & message.user.vef === true){adm += `\n✅ [Wolfbot15|Верифицированный пользователь]`}
	}
	if(message.user.prefix !== false){
		adm += `\n🔥 [Wolfbot15|${message.user.prefix}]`
	}
	return message.send(`💥 ${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, твой профиль:

🆔 Игровой ID: ${message.user.uid} ${message.user.vef ? `\n✅ Верифицированный игрок` : ``} ${adm} ${tklan} ${betat}
💵 Кэш: ${utils.sp(message.user.rub)}₽
💳 В банке: ${utils.sp(message.user.bank)}₽
💽 Биткоинов: ${utils.sp(message.user.btc)}฿ ${don}
👑 Рейтинг: ${utils.sp(message.user.rating)}
⚡ Энергия: ${message.user.energy}
🏆 Опыт: ${utils.sp(message.user.opit)} ${brak} ${zwork}
${text}
📆 Дата регистрации: <<${message.user.timeReg}>>`);
}
if(message.forwards[0].senderId < 0) return
	if(message.user.settings.adm < 1) return
	let user = users.find(x=> x.id === message.forwards[0].senderId)
	if(!user) return message.reply(`пользователь не найден.`);
	if(user.transport.car !== 0 || user.transport.yacht !== 0 || user.transport.airplane !== 0 || user.transport.helicopter !== 0||
		user.realty.home !== 0 || user.realty.apartment !== 0 ||
		user.misc.phone !== 0 || user.misc.farm !== 0 || user.business !== 0 || user.misc.pet !== 0){
		text += `\n🔑 Имущество:\n`
		if(user.transport.car !== 0) text += `⠀🚗 Машина: ${cars[user.transport.car - 1].name}\n`;
		if(user.transport.yacht !== 0) text += `⠀🛥 Яхта: ${yachts[user.transport.yacht - 1].name}\n`;
		if(user.transport.airplane !== 0) text += `⠀🛩 Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
		if(user.transport.helicopter !== 0) text += `⠀🚁 Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`;

		if(user.realty.home !== 0) text += `⠀🏠 Дом: ${homes[user.realty.home - 1].name}\n`;
		if(user.realty.apartment !== 0) text += `⠀🌇 Квартира: ${apartments[user.realty.apartment - 1].name}\n`;

		if(user.misc.phone !== 0) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.misc.pet !== 0) text += `⠀${pets[user.misc.pet - 1].smile} Питомец: ${pets[user.misc.pet - 1].name} (${user.pet.lvl} ур.)\n`;
		if(user.misc.farm !== 0) text += `⠀🔋 Фермы: ${farms[user.misc.farm - 1].name} (x${utils.sp(user.farms)} шт.)\n`;
		if(user.business !== 0) text += `⠀${businesses[user.business - 1].icon} ${businesses[user.business - 1].name}\n`;
	}
	let betat = ''
	let energyt = ''
	let adm = ''
	let ban = '\n'
	let pban = ''
	let zwork = ''
	let prefix = ''
	let klant = ''
	/*if(user.klan !== false){
		let klan = klans.find(x=> x.id === Number(user.klan))
		klant += `\n⚔ Клан: ${klan.name}`
	}*/	
	if(user.work !== 0) zwork += `\n\n${works[user.work - 1].icon} Работа: ${works[user.work - 1].name}\n🌟 Уровень: ${user.level} [${user.exp}/24]`;
	if(user.ban_time > getUnix()) ban = `\n——————————————————\n🚫 [Wolfbot15|Временно забанен]\n⏰ (до ${user.ban_ttime})\n——————————————————`
	if(user.permban) pban += `\n——————————————————\n👺 [Wolfbot15|Заблокирован навсегда].\n——————————————————`
	if(user.betatest === true){betat += `\n⛔ Бета-тестер`}
	if(user.prefix === false){
	if(user.vip !== false & user.settings.adm === 0){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}Вип${user.premium ? ` + Премиум` : ` игрок`}]`}
	if(user.premium !== false & user.settings.adm === 0 & user.vip === false){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}Премиум игрок]`}
	 if(user.fakep === false){
	if(user.premium === true & user.settings.adm !== 0 & user.vip === false){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}${user.settings.adm.toString().replace(/1/gi, "Администратор").replace(/2/gi, "Заместитель").replace(/3/gi, "Основатель").replace(/4/gi, "Разработчик")} + Премиум]`}
	if(user.vip === false & user.settings.adm !== 0 & user.premium === false){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}${user.settings.adm.toString().replace(/1/gi, "Администратор").replace(/2/gi, "Заместитель").replace(/3/gi, "Основатель").replace(/4/gi, "Разработчик")}]`}
	if(user.vip !== false & user.settings.adm !== 0){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}${user.settings.adm.toString().replace(/1/gi, "Администратор").replace(/2/gi, "Заместитель").replace(/3/gi, "Основатель").replace(/4/gi, "Разработчик")} + Вип${user.premium ? ` + Премиум` : ``}]`}
	 }
	 if(user.fakep === true){
	if(user.vip !== false){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}Вип${user.premium ? ` + Премиум` : ``}]` }
	if(user.premium === true & message.user.vip === false){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}Премиум]`}
	 }
	if(user.vip === 0 & user.settings.adm === 0 & user.vef === true){adm += `\n💎 Верифицированный пользователь`}
	}
	if(user.prefix !== false) adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${user.prefix}]`
	return bot(`профиль *id${user.id}(${user.tag}):\n
🆔 Игровой ID: ${user.uid} ${user.ban_time > 0 ? ban : user.permban ? pban : adm} ${betat} ${klant}
💵 Кэш: ${utils.sp(user.rub)}₽
💳 В банке: ${utils.sp(user.bank)}₽
💽 Биткоинов: ${utils.sp(user.btc)}฿
👑 Рейтинг: ${utils.sp(user.rating)}
⚡ Энергия: ${user.energy}
🏆 Опыт: ${utils.sp(user.opit)} ${zwork}
${text}
📆 Дата регистрации: <<${user.timeReg}>>`);
});

cmd.hear(/^(?:пост)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
users[1].repost = false
return bot(`репост выключен! ${smilesuccess}`)
});

cmd.hear(/^(?:пост)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
users[1].repost = true
users[1].repnum = message.args[1]
users[1].reptext = message.args[2]
return bot(`репост включён!`)
});

cmd.hear(/^(?:префикс)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(message.args[2] !== `выкл`){
user.prefix=message.args[2]
return bot(`вы успешно выдали игроку ${name(user.uid)} префикс <<${message.args[2]}>> ${smilesuccess}`)
}
if(user.prefix === false) return bot(`у этого игрока и так уже отключен префикс! ${smileerror}`)
user.prefix=false
return bot(`вы успешно отключили игроку ${name(user.uid)} префикс! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать империалы)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
message.args[2] = Number(message.args[2])
user.donate += message.args[2]
return bot(`игроку ${name(message.args[1])} выдано ${utils.sp(message.args[2])} империалов! ${smilesuccess}`)
});

cmd.hear(/^(?:снять империалы)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
message.args[2] = Number(message.args[2])
if(message.args[2] > user.donate) message.args[2] = user.donate
if(user.donate === 0) return bot(`у игрока и так нету империалов! ${smileerror}`)
user.donate = message.args[2]
return bot(`у игроку ${name(message.args[1])} отняно ${utils.sp(message.args[2])} империалов! ${smilesuccess}`)
});

cmd.hear(/^(?:-империалы)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return bot(`требуется ранг создателя!`)
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
message.args[2] = Number(message.args[2])
if(user.donate === 0) return bot(`у игрока и так нету империалов! ${smileerror}`)
user.donate = 0
return bot(`у игрока ${name(message.args[1])} отняны все империалы! ${smilesuccess}`)
});

cmd.hear(/^(?:|проф)\s(.*)$/i, async (message, bot) => {
	let text = ``;
	if(message.user.settings.adm < 1){
	if(!message.user.premium) return
    	}
	/*text += `🔎 ID: ${message.user.uid}\n`;
	text += `💰 Денег: ${utils.sp(message.user.balance)}$\n`;
	text += `💳 В банке: ${utils.sp(message.user.bank)}$\n`;
	text += `💽
	ов: ${utils.sp(message.user.btc)}฿\n`;
	text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
	if(message.user.work !== 0) text += `👔 Работа: ${works[message.user.work - 1].name}\n`;
	text += `🌟 Уровень: ${message.user.level} [${message.user.exp}/24]\n`;

	if(message.user.transport.car !== 0 || message.user.transport.yacht !== 0 || message.user.transport.airplane !== 0 || message.user.transport.helicopter !== 0||
		message.user.realty.home !== 0 || message.user.realty.apartment !== 0 ||
		message.user.misc.phone !== 0 || message.user.misc.farm !== 0 || message.user.business !== 0 || message.user.misc.pet !== 0)
	{
		text += `\n🔑 Имущество:\n`;

		if(message.user.transport.car !== 0) text += `⠀🚗 Машина: ${cars[message.user.transport.car - 1].name}\n`;
		if(message.user.transport.yacht !== 0) text += `⠀🛥 Яхта: ${yachts[message.user.transport.yacht - 1].name}\n`;
		if(message.user.transport.airplane !== 0) text += `⠀🛩 Самолёт: ${airplanes[message.user.transport.airplane - 1].name}\n`;
		if(message.user.transport.helicopter !== 0) text += `⠀🚁 Вертолёт: ${helicopters[message.user.transport.helicopter - 1].name}\n`;

		if(message.user.realty.home !== 0) text += `⠀🏠 Дом: ${homes[message.user.realty.home - 1].name}\n`;
		if(message.user.realty.apartment !== 0) text += `⠀🌇 Квартира: ${apartments[message.user.realty.apartment - 1].name}\n`;

		if(message.user.misc.phone !== 0) text += `⠀📱 Телефон: ${phones[message.user.misc.phone - 1].name}\n`;
		if(message.user.misc.pet !== 0) text += `⠀🐌 Питомец: ${pets[message.user.misc.pet - 1].name}\n`;
		if(message.user.misc.farm !== 0) text += `⠀🔋 Фермы: ${farms[message.user.misc.farm - 1].name} (x${message.user.farms})\n`;
		if(message.user.business !== 0) text += `⠀${businesses[message.user.business - 1].icon} ${businesses[message.user.business - 1].name}\n`;
	}

	text += `\n📗 Дата регистрации: ${message.user.regDate}`;*/
	message.args[1] = Number(message.args[1])
	let user = users.find(x=> x.uid === message.args[1])
	if(!user) return bot(`игрок не найден! ${smileerror}`)
	if(user.transport.car !== 0 || user.transport.yacht !== 0 || user.transport.airplane !== 0 || user.transport.helicopter !== 0||
		user.realty.home !== 0 || user.realty.apartment !== 0 ||
		user.misc.phone !== 0 || user.misc.farm !== 0 || user.business !== 0 || user.misc.pet !== 0){
		text += `\n🔑 Имущество:\n`
		if(user.transport.car !== 0) text += `⠀🚗 Машина: ${cars[user.transport.car - 1].name}\n`;
		if(user.transport.yacht !== 0) text += `⠀🛥 Яхта: ${yachts[user.transport.yacht - 1].name}\n`;
		if(user.transport.airplane !== 0) text += `⠀🛩 Самолёт: ${airplanes[user.transport.airplane - 1].name}\n`;
		if(user.transport.helicopter !== 0) text += `⠀🚁 Вертолёт: ${helicopters[user.transport.helicopter - 1].name}\n`;

		if(user.realty.home !== 0) text += `⠀🏠 Дом: ${homes[user.realty.home - 1].name}\n`;
		if(user.realty.apartment !== 0) text += `⠀🌇 Квартира: ${apartments[user.realty.apartment - 1].name}\n`;

		if(user.misc.phone !== 0) text += `⠀📱 Телефон: ${phones[user.misc.phone - 1].name}\n`;
		if(user.misc.pet !== 0) text += `⠀${pets[user.misc.pet - 1].smile} Питомец: ${pets[user.misc.pet - 1].name} (${user.pet.lvl} ур.)\n`;
		if(user.misc.farm !== 0) text += `⠀🔋 Фермы: ${farms[user.misc.farm - 1].name} (x${utils.sp(user.farms)} шт.)\n`;
		if(user.business !== 0) text += `⠀${businesses[user.business - 1].icon} ${businesses[user.business - 1].name}\n`;
	}
	let betat = ''
	let energyt = ''
	let adm = ''
	let ban = '\n'
	let pban = ''
	let zwork = ''
	let prefix = ''
	let klant = ''
	if(user.work !== 0) zwork += `\n\n${works[user.work - 1].icon} Работа: ${works[user.work - 1].name}\n🌟 Уровень: ${user.level} [${user.exp}/24]`;
	if(user.ban_time > getUnix()) ban = `\n——————————————————\n🚫 [Wolfbot15|Временно забанен]\n⏰ (до ${user.ban_ttime})\n——————————————————`
	if(user.permban) pban += `\n——————————————————\n👺 [Wolfbot15|Заблокирован навсегда].\n——————————————————`
	if(user.betatest === true){betat += `\n⛔ Бета-тестер`}
	if(user.prefix === false){
	if(user.vip !== false & user.settings.adm === 0){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}Вип${user.premium ? ` + Премиум` : ` игрок`}]`}
	if(user.premium !== false & user.settings.adm === 0 & user.vip === false){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}Премиум игрок]`}
	 if(user.fakep === false){
	if(user.premium === true & user.settings.adm !== 0 & user.vip === false){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}${user.settings.adm.toString().replace(/1/gi, "Администратор").replace(/2/gi, "Заместитель").replace(/3/gi, "Основатель").replace(/4/gi, "Разработчик")} + Премиум]`}
	if(user.vip === false & user.settings.adm !== 0 & user.premium === false){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}${user.settings.adm.toString().replace(/1/gi, "Администратор").replace(/2/gi, "Заместитель").replace(/3/gi, "Основатель").replace(/4/gi, "Разработчик")}]`}
	if(user.vip !== false & user.settings.adm !== 0){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}${user.settings.adm.toString().replace(/1/gi, "Администратор").replace(/2/gi, "Заместитель").replace(/3/gi, "Основатель").replace(/4/gi, "Разработчик")} + Вип${user.premium ? ` + Премиум` : ``}]`}
	 }
	 if(user.fakep === true){
	if(user.vip !== false){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}Вип${user.premium ? ` + Премиум` : ``}]` }
	if(user.premium === true & message.user.vip === false){adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${prefix}Премиум]`}
	 }
	if(user.vip === 0 & user.settings.adm === 0 & user.vef === true){adm += `\n💎 Верифицированный пользователь`}
	}
	if(user.prefix !== false) adm += `\n${user.vef ? `✅` : `🔥`} [Wolfbot15|${user.prefix}]`
	return bot(`профиль *id${user.id}(${user.tag}):\n
🆔 Игровой ID: ${user.uid} ${user.ban_time > 0 ? ban : user.permban ? pban : adm} ${betat} ${klant}
💵 Кэш: ${utils.sp(user.rub)}₽
💳 В банке: ${utils.sp(user.bank)}₽
💽 Биткоинов: ${utils.sp(user.btc)}฿
👑 Рейтинг: ${utils.sp(user.rating)}
⚡ Энергия: ${user.energy}
🏆 Опыт: ${utils.sp(user.opit)} ${zwork}
${text}
📆 Дата регистрации: <<${user.timeReg}>>`);
});

cmd.hear(/^(?:settoken)\s?(.*)$/i, (message, bot) => {
if(message.isChat) return bot(`используйте эту команду в ЛС!`)
if(!message.args[1]) return bot(`введите токен!`)
message.user.tokenqiwi = message.args[1]
return bot(`токен успешно привязан к вашему аккаунту!`)
});
/* cmd.hear(/^(?:узнать)\s?(https\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message, bot) => {
if(!message.args[4]) return
message.args[4] = message.args[4].split(" ")
vk.api.call("utils.resolveScreenName", {
screen_name: message.args[4]
}).catch((err) => { return message.send(`Произошла ошибка! Возможные способы решения: \nПопробуйте формат <<узнать quit_please>> или <<узнать https://vk.com/quit_please>> (обязательно указывайте <<https://>>!)\nВозможно такой страницы не существует, проверьте правильность ссылки!`) })
.then((res) => {
if(res.object_id === undefined) return message.send(`Произошла ошибка! Возможные способы решения: \nПопробуйте формат <<узнать quit_please>> или <<узнать https://vk.com/quit_please>> (обязательно указывайте <<https://>>!)\nВозможно такой страницы не существует, проверьте правильность ссылки!`)
return message.send(`${res.object_id}`)
})
}); */

cmd.hear(/^(?:найти)\s?(?:https\:\/\/vk\.com\/)\s?(?:id)?([0-9]+)$/i, (message, bot) => {
			message.args[1] = Number(message.args[1])
			var user = users.find(x=> x.id === message.args[1])
			if(!user) return bot(`игрок не найден! ${smileerror}`)
			let smile = ''
				if(user.settings.adm === 0) smile = '🔹'
				if(user.settings.adm > 0) smile = '🔸'
	        return bot(`информация о найденном игроке:

${smile} Ник: *id${user.id}(${user.tag})
${smile} ID: ${user.uid}

📅 Дата регистрации: ${user.timeReg}`)
			 /*message.args[4] = message.args[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.args[4]
			}).then((res) => {
				res.object_id = Number(res.object_id)
				var user = users.find(x=> x.id === res.object_id)
				let smile = ''
				if(!user) return bot(`игрок не найден! ${smileerror}`)
				if(user.settings.adm === 0) smile = '🔹'
				if(user.settings.adm > 0) smile = '🔸'
	            return bot(`информация о найденном игроке:

${smile} Ник: *id${user.id}(${user.tag})
${smile} ID: ${user.uid}

📅 Дата регистрации: ${user.timeReg}`)
			})
			return; */
});

cmd.hear(/^(?:обнять)\s?(?:https\:\/\/vk\.com\/)\s?(?:id)?([0-9]+)$/i, (message, bot) => {
let user = users.find(x=> x.id === message.args[1])
let name = ``
if(user) name = name(user.uid)
return message.isChat ? vk.api.messages.send({ chat_id: message.chatId, message: `🤗 Обнимашки-и-и 🤗\n${user_info_sender.first_name.substring(0, 1)}. ${user_info_sender.last_name} обнял ${user_info.first_name.substring(0, 1)}. ${name}!`, attachment: 'photo-188608231_457239102' }) : vk.api.messages.send({ peer_id: message.senderId, message: `🤗 Обнимашки-и-и 🤗\n${user_info_sender.first_name.substring(0, 1)}. ${user_info_sender.last_name} обнял ${name}!`, attachment: 'photo-188608231_457239102' })
});

cmd.hear(/^(?:обнять)\s?(?:https\:\/\/vk\.com\/)\s?(?:id)?([^]+)$/i, (message, bot) => {
var domain = message.args[1].split(" ");
vk.api.call("utils.resolveScreenName", {
screen_name: domain
}).then((res) => {
let user = users.find(x=> x.id === res.object_id)
let name = ``
if(user) name = name(user.uid)
return message.isChat ? vk.api.messages.send({ chat_id: message.chatId, message: `🤗 Обнимашки-и-и 🤗\n${user_info_sender.first_name.substring(0, 1)}. ${user_info_sender.last_name} обнял ${user_info.first_name.substring(0, 1)}. ${name}!`, attachment: 'photo-188608231_457239102' }) : vk.api.messages.send({ peer_id: message.senderId, message: `🤗 Обнимашки-и-и 🤗\n${user_info_sender.first_name.substring(0, 1)}. ${user_info_sender.last_name} обнял ${name}!`, attachment: 'photo-188608231_457239102' })
})
});

cmd.hear(/^(?:найти)\s?(?:https\:\/\/vk\.com\/)\s?(?:id)?([^]+)$/i, (message, bot) => {
var domain = message.args[1].split(" ");
vk.api.call("utils.resolveScreenName", {
screen_name: domain
}).then((res) => {
var user = users.find(x=> x.id === res.object_id)
if(!user) return bot(`игрок не найден! ${smileerror}`)
let smile = ''
if(user.settings.adm === 0) smile = '🔹'
if(user.settings.adm > 0) smile = '🔸'
return bot(`информация о найденном игроке:

${smile} Ник: *id${user.id}(${user.tag})
${smile} ID: ${user.uid}

📅 Дата регистрации: ${user.timeReg}`)
})
});

cmd.hear(/^(?:найти)$/i, async (message, bot) => {
	if(!message.forwards[0]) return
	if(message.forwards[0].senderId < 0) return
	let user = users.find(x=> x.id === message.forwards[0].senderId)
	if(!user) return message.reply(`пользователь не найден.`);
	let smile = ''
	if(user.settings.adm === 0) smile = '🔹'
	if(user.settings.adm > 0) smile = '🔸'
	return bot(`информация о найденном игроке:

${smile} Ник: *id${user.id}(${user.tag})
${smile} ID: ${user.uid}

📅 Дата регистрации: ${user.timeReg}`)
});


cmd.hear(/^(?:eval)\s([^]+)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
try {
const result = eval(message.args[1]);
if(typeof(result) === 'Œ')
{
return bot(`string: ${result}`);
} else if(typeof(result) === 'Œ')
{
return bot(`кол-во: ${result}`);
} else {
let z = ''
if(typeof(result) === `string`){z += `строка`}
if(typeof(result) === `number`){z += `число`}
if(typeof(result) === `boolean`){z += `переменная`}
if(typeof(result) === `object`){z += `объект`}
if(typeof(result) === `undefined`){z += `неизвестно`}
return bot(`${z}: ${JSON.stringify(result, null, '　\t')}`).catch((err) => {
	return bot(`ошибка: ${err.toString()}`)
})
}
} catch (e) {
return bot(`ошибка:
${e.toString()}`);
}
});

cmd.hear(/^(?:снятьспроф)\s(.*)$/i, async (message, bot) => {
	if(message.user.settings.adm < 3) return
	message.args[1] = Number(message.args[1])
	let user = users.find(x=> x.uid === message.args[1])
	if(!user) return bot(`игрок не найден! ${smileerror}`)
	user.faked = false
	return bot(`теперь *id${user.id}(${user.tag}) не может пользоваться фейк-профилем! ${smilesuccess}`)
});

cmd.hear(/^(?:выдатьспроф)\s(.*)$/i, async (message, bot) => {
	if(message.user.settings.adm < 3) return
	message.args[1] = Number(message.args[1])
	let user = users.find(x=> x.uid === message.args[1])
	user.faked = true
	return bot(`теперь *id${user.id}(${user.tag}) может пользоваться фейк-профилем! ${smilesuccess}`)
});

cmd.hear(/^(?:скрытьпроф)$/i, async (message, bot) => {
if(message.user.settings.adm < 1) return
if(message.user.faked === false) return bot(`недостаточно прав! ${smileerror}`)
if(message.user.fakep === true) return bot(`надпись и так скрыта! Чтобы вернуть надпись используйте команду <<вернутьпроф>>! ${smileerror}`)
message.user.fakep = true
return bot(`надпись админа скрыта! ${smilesuccess}\n❗ Чтобы вернуть надпись используйте команду <<вернутьпроф>>`)
});

cmd.hear(/^(?:осн)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
let i = Number(message.args[1])
if(!i) return
let user = users.find(x=> x.uid === i)
if(user.settings.adm === 3) return bot(`вы не можете сменить ник у создателя! ${smileerror}`)
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.settings.adm > 2) return bot(`не тронь!`)
await bot(`вы успешно выдали *id${user.id}(${user.tag}) ник <<${message.args[2]}>>! ${smilesuccess}`)
user.tag = message.args[2]
});

cmd.hear(/^(?:вернутьпроф)$/i, async (message, bot) => {
if(message.user.settings.adm < 1) return
if(message.user.faked === false) return bot(`недостаточно прав! ${smileerror}`)
if(message.user.fakep === false) return bot(`профиль не скрыт! ${smileerror}`)
message.user.fakep = false
return bot(`надпись админа успешно возвращена! ${smilesuccess}`)
});

cmd.hear(/^(?:кнопки вкл)$/i, async (message, bot) => {
if(message.chatId === 1) return bot(`кнопки не могут быть включены в админ беседе! ${smileerror}`)
bot(`кнопки включены!`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": false,
			"buttons": [
			[{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"1\"}",
				"label": "🔑 Бонус"
		},
			"color": "positive"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"2\"}",
				"label": "📚 Помощь"
		},
			"color": "primary"
		},
		{
				"action": {
				"type": "text",
				"payload": "{\"button\": \"3\"}",
				"label": "🔋 Ферма"
		},
			"color": "primary"
		}
]
		]
			})
		});
return
});

cmd.hear(/^(?:кнопки выкл)$/i, async (message, bot) => {
if(message.chatId === 1) return bot(`кнопки не могут быть отключены в админ беседе! ${smileerror}`)
bot(`кнопки выключены!`,
	{
			keyboard:JSON.stringify(
		{
			"one_time": true,
			"buttons": []
	})
		});
return
});


cmd.hear(/^(?:снятьадм)$/i, async (message, bot) => {
if(message.user.settings.adm < 1) return bot(`требуется ранг администратор!`)
return bot(`вы уверены что хотите снять с себя администратора? Введите <<снятьадм ${message.senderId}>> для подтверждения.`)
});

cmd.hear(/^(?:-тестер)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
let i = Number(message.args[1])
if(!i) return
let user = users.find(x=> x.uid === i)
if(!user) return bot(`игрок не найден! ${smileerror}`);
user.betatest = false
return bot(`теперь игрок *id${user.id}(${user.tag}) больше не бета-тестер! ${smilesuccess}`)
});

cmd.hear(/^(?:тестер)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
let i = Number(message.args[1])
if(!i) return
let user = users.find(x=> x.uid === i)
if(!user) return bot(`игрок не найден! ${smileerror}`);
user.betatest = true
return bot(`теперь игрок *id${user.id}(${user.tag}) бета-тестер! ${smilesuccess}`)
});

cmd.hear(/^(?:сн)\s([0-9]+)\s?(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 1) return bot(`требуется ранг администратор!`)
if(message.user.settings.adm < 2){if(message.user.sn_time > getUnix()) return bot(`вы сможете сменить ник через ${unixStampLeft(message.user.sn_time - getUnix())}! ${smileerror}`)}
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 2){if(!message.args[2]) return bot(`укажите причину! ${smileerror}`)}
let reason = message.args[2]
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.settings.adm > 1) return bot(`вы не можете сменить ник этому пользователю! ${smileerror}`)
message.user.sn_time = getUnix() + 3600000
await bot(`вы успешно выдали *id${user.id}(${user.tag}) ник <<СМЕНИТЕ НИК>>! ${smilesuccess}`)
if(message.user.settings.adm < 2) vk.api.messages.send({ peer_id: config.ownerid, message: `Новая смена ника!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} сменил ник игроку ${name(user.uid)}\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "бан " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": `осн ${user.uid} ${user.tag}`
},
"color": "positive"
}
]
]
})
})
if(message.user.settings.adm < 2){
users.filter(x=> x.id !== message.senderId & x.settings.adm === 2).map(zz => {
vk.api.messages.send({ user_id: zz.id, message: `Новая смена ника!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} сменил ник игроку ${name(user.uid)}\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`})
});
}
user.tag = `СМЕНИТЕ НИК`
});

cmd.hear(/^(?:выдать обнул)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
let i = Number(message.args[1])
if(!i) return
let user = users.find(x=> x.uid === i)
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.obnuld = true
return bot(`вы успешно выдали *id${user.id}(${user.tag}) доступ к обнулению! ${smilesuccess}`)
});

cmd.hear(/^(?:снять обнул)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
let i = Number(message.args[1])
if(!i) return
let user = users.find(x=> x.uid === i)
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.obnuld = false
return bot(`вы успешно отобрали у *id${user.id}(${user.tag}) доступ к обнулению! ${smilesuccess}`)
});

cmd.hear(/^(?:энергия)$/i, async (message, bot) => {
if(message.user.energy === 0) return bot(`у вас нет энергии! ${smileerror}`)
return bot(`у вас ${message.user.energy} энергии! ${smilesuccess}`)
});

/*cmd.hear(/^(?:клан удалить)\s?(.*)$/i, async (message, bot) => {
let klan = klans.find(x=> x.id === message.user.klan)
message.args[1] = Number(message.args[1])
if(!klan) return bot(`вы не состоите в клане! ${smileerror}`)
if(klan.owner !== message.senderId) return bot(`вы не являетесь создателем клана! ${smileerror}`)
if(message.args[1] !== message.user.klan){return bot(`вы действительно хотите удалить клан? Для подтверждения введите <<клан удалить ${message.user.klan}>>!`)}
if(message.args[1] === message.user.klan){klan.owner = false; a = klan.name; message.user.klan = false; await bot(`вы успешно удалили клан <<${a}>>! ${smilesuccess}`); message.sendSticker(13505)}
});*/

cmd.hear(/^(?:обнул)\s([0-9]+)\s?(.*)$/i, async (message, bot) => {
if(message.user.obnuld === false) return bot(`недостаточно прав! ${smileerror}`)
let i = Number(message.args[1])
if(!i) return
if(message.user.settings.adm < 1){if(!message.args[2]) return bot(`укажите причину! ${smileerror}`)}
let user = users.find(x=> x.uid === i)
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.rub = 0
user.bank = 0
user.btc = 0
user.farms = 0
user.farmslimit = 3000
user.energy = 10
user.opit = 0
user.biz = 0
user.zhelezo = 0
user.zoloto = 0
user.almaz = 0
user.bizlvl = 0
user.nicklimit = 16
user.rating = 0
user.work = 0
user.business = 0
user.transport.car = 0
user.transport.yacht = 0
user.transport.airplane = 0
user.transport.helicopter = 0
user.realty.home = 0
user.realty.apartment = 0
user.misc.phone = 0
user.misc.farm = 0
user.misc.pet = 0
user.pet.lvl = 0
await bot(`аккаунт *id${user.id}(${user.tag}) успешно обнулён! ${smilesuccess}`)
if(message.user.settings.adm < 3) vk.api.messages.send({ peer_id: config.ownerid, message: `Новый обнул!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} обнулил игрока ${name(user.uid)}!\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${message.args[2]}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьобнул " + message.user.uid
},
"color": "primary"
}
]
]
})
})
});

cmd.hear(/^(?:анекдот)$/i, async (message, bot) => {
		let filter = (text) => { 
			text = text.replace('&quot;', '"');
			text = text.replace('!&quot;', '"');
			text = text.replace('?&quot;', '"');
			text = text.replace(/(&quot;)/ig, '"');
			return text;
		}

    let anek = await getAnek();
    return bot(`держи:\n\n ${filter(anek)}`);

function getAnek() {
    return rq('https://www.anekdot.ru/random/anekdot/').then(body => {
        		let res = body.match(/(?:<div class="text">([^]+)<\/div>)/i);
        		res = res[0].split('</div>');
        		return res[0].split(`<div class="text">`).join('').split('<br>').join('\n');
        	});
   
	}
});

cmd.hear(/^(?:баланс|бабло)$/i, async (message, bot) => {
	let text = `на руках ${utils.sp(message.user.rub)}₽ 💸`;
	if(message.user.bank) text += `\n💳 В банке ${utils.sp(message.user.bank)}₽`;
	if(message.user.btc) text += `\n💽 Биткоинов ${utils.sp(message.user.btc)}฿`;
	if(message.user.zhelezo) text += `\n🎛 ${utils.sp(message.user.zhelezo)} железа`;
	if(message.user.serebro) text += `\n⚙ ${utils.sp(message.user.serebro)} серебра`
	if(message.user.zoloto) text += `\n🏵 ${utils.sp(message.user.zoloto)} золота`;
	if(message.user.almaz) text += `\n💎 ${utils.sp(message.user.almaz)} алмаза`;
	if(message.user.rubin) text += `\n🌀 ${utils.sp(message.user.rubin)} рубинов`
	if(message.user.sapfir) text += `\n🔮 ${utils.sp(message.user.sapfir)} сапфиров`

	return bot(text,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "open_link",
"link": "https://vk.com/market-191399146",
"label": "💎 Увеличить деньги"
}
}],
]
})
})
});

cmd.hear(/^(?:банк)$/i, async (message, bot) => {
	if(message.user.bank < 1) return bot(`ваш банковский счет пуст.`);
	return bot(`на балансе в банке ${utils.sp(message.user.bank)}₽
✍🏻 Введите "Банк [кол-во]" для пополнения`);
});

cmd.hear(/^(?:банк снять)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].toString().replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].toString().replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].toString().replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].toString().replace(/(вабанк|вобанк|все|всё)/ig, message.user.bank);
	if(!Number(message.args[1])) return;
	message.args[1] = Number(message.args[1]);

	if(message.args[1] <= 0) return;
	if(message.args[1] > message.user.bank) return bot(`у вас нет данной суммы ${smileerror}`);
	else if(message.args[1] <= message.user.bank)
	{
		let z = ''
		if(message.args[1] === message.user.bank) z += `все деньги со счёта! ${smilesuccess}\n💳 Остаток в банке: 0₽`
		if(message.args[1] !== message.user.bank) z += `${utils.sp(message.args[1])}₽\n💳 Остаток в банке: ${utils.sp(message.user.bank - message.args[1])}₽`
		message.user.rub += message.args[1];
		message.user.bank -= message.args[1];
		message.user.banklimit += message.args[1]
		return bot(`вы сняли ${z}
💰 Ваш баланс: ${utils.sp(message.user.rub)}₽`);
	}
});

cmd.hear(/^(?:слежка)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.watch = true
user.watcher = message.user.id
return bot(`слежка за ${name(message.args[1])} включена! ${smilesuccess}`)
});

cmd.hear(/^(?:-слежка)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.watch = false
return bot(`слежка за ${name(message.args[1])} выключена! ${smilesuccess}`)
});

cmd.hear(/^(?:выдатьадм)\s(.*)\s([1-3])\s?(.*)$/i, async (message, bot) => {
let i = Number(message.args[1]);
if(!i) return
if(message.user.settings.adm < 2) return
if(message.user.settings.adm < 2){if(Number(message.args[2]) === 3) return bot(`вы не можете выдавать ранг администратора выше своего! ${smileerror}`); if(Number(message.args[2]) === 2) return bot(`вы не можете выдавать ранг равный своему! ${smileerror}`); if(!message.args[3]) return bot(`укажите причину! ${smileerror}`)}
let user = users.find(x=> x.uid === i)
if(user.settings.adm === 3) return bot(`вы не можете менять роль создателю! ${smileerror}`)
if(!user) return bot(`игрок не найден! ${smileerror}`);
if(user.settings.adm === Number(message.args[2])) return bot(`этот игрок и так уровня ${message.args[2].toString().replace(/1/gi, `администратора`).replace(/2/gi, `заместителя основателя`)}! ${smileerror}`)
let textbannk = 0
kjsg = 0
if(Number(message.args[2]) === 1) textbannk = 5000000000000; kjsg = 1000000000000
if(Number(message.args[2]) === 2) textbannk = 50000000000000; kjsg = 50000000000000
if(Number(message.args[2]) === 3) textbannk = 500000000000000; kjsg = 500000000000000
if(Number(message.args[2]) === 1) kjsg = 1000000000000
if(Number(message.args[2]) === 2) kjsg = 50000000000000
if(Number(message.args[2]) === 3) kjsg = 500000000000000
let a=600000000000
if(message.args[2] === 1) a = 3000000000000
user.farmslimit = 100000
user.banklimit = textbannk
user.limit = Number(kjsg)
user.settings.adm = Number(message.args[2])
user.energy=0
user.lim_v = a
if(message.args[2] === 1) user.limit_res = 1500000000000
if(user.vip) user.limit_res += 500000000000
if(user.premium) user.limit_res += 1000000000000
await bot(`вы успешно выдали *id${user.id}(${user.tag}) права ${message.args[2].toString().replace(/1/gi, "администратора").replace(/2/gi, "заместителя основателя").replace(/3/gi, "основателя")}! ${smilesuccess}`)
vk.api.messages.send({ peer_id: user.id, message: `${name(user.uid)}, теперь вы ${message.args[2].toString().replace(/1/gi, "администратор").replace(/2/gi, "заместитель основателя").replace(/3/gi, "основатель")}!\n` })
if(message.user.settings.adm === 2) vk.api.messages.send({ peer_id: config.ownerid, message: `Новый администратор!\nЗаместитель ${name(message.user.uid)} выдал игроку ${name(user.uid)} права администратора. Причина: ${message.args[3]}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": `снятьадм ${user.uid}`
},
"color": "positive"
}
]
]
})
})
});
/* // -ул
админ
if(Number(message.args[2]) === 1) textbannk = 5000000000000; kjsg = 1000000000000
if(Number(message.args[2]) === 2) textbannk = 50000000000000; kjsg = 50000000000000
if(Number(message.args[2]) === 3) textbannk = 500000000000000; kjsg = 500000000000000
if(Number(message.args[2]) === 1) kjsg = 1000000000000
if(Number(message.args[2]) === 2) kjsg = 50000000000000
if(Number(message.args[2]) === 3) kjsg = 500000000000000
user.limit = Number(kjsg)
вип
kgknfsg = 100000000000
if(user.premium) user.limit = Number(kgknfsg); user.banklimit = Number(textvipb); user.farmslimit = Number(okfkd)
if(!user.premium) user.limit = 20000000000; user.banklimit = 500000000000; user.farmslimit = 3000
прем
let kgknfsg = 50000000000
if(user.vip) user.limit = Number(kgknfsg); user.banklimit = Number(textvipb); user.farmslimit = Number(okfkd)
if(!user.vip) user.limit = 20000000000; user.banklimit = 500000000000; user.farmslimit = 3000
! -> ! <- | user.limit = Number(kjsg) | -> ! <- !
*/
cmd.hear(/^(?:-ул)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return bot(`требуется ранг создателя!`)
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
let a=0
if(user.settings.adm !== 0){
	if(user.settings.adm === 1){
		user.limit_res = 1500000000000
		user.limit = 1500000000000
		a = 1500000000000
		return bot(`администратору ${name(user.uid)} установлен лимит передачи ${utils.sp(a)}₽! ${smilesuccess}`)
	}
}
if(user.vip === true){
	kgknfsg = 1500000000000
if(user.premium) user.limit = Number(kgknfsg); a = Number(kgknfsg); user.limit_res = 1500000000000
if(!user.premium) user.limit = 500000000000; a = 500000000000; user.limit_res = 500000000000
user.limit = kgknfsg
return bot(`игроку ${name(user.uid)} установлен лимит передачи ${utils.sp(a)}₽! ${smilesuccess}`)
}
if(user.premium === true){
	let kgknfsg = 1000000000000
	a = 1000000000000
	user.limit = kgknfsg
	return bot(`игроку ${name(user.uid)} установлен лимит передачи ${utils.sp(a)}₽! ${smilesuccess}`)
}
});

cmd.hear(/^(?:выдатьвип)\s(.*)$/i, async (message, bot) => {
let i = Number(message.args[1]);
if(!i) return
if(message.user.settings.adm < 2) return
let user = users.find(x=> x.uid === i)
if(!user) return bot(`игрок не найден! ${smileerror}`);
if(user.vip === true) return bot(`игрок и так вип! ${smilesuccess}`)
let textvipb = 1000000000000
let kgknfsg = 50000000000
let okfkd = 6000
okfkd = 6000
// if(Number(message.args[2]) === 2) okfkd = 12000
textvipb = 1000000000000;
// if(Number(message.args[2]) === 2) textvipb = 2000000000000;
kgknfsg = 50000000000
// if(Number(message.args[2]) === 2) kgknfsg = 100000000000
user.vip = true
if(user.premium) user.limit += Number(kgknfsg); user.farmslimit += Number(okfkd)
if(!user.premium) user.limit = Number(kgknfsg); user.farmslimit = Number(okfkd)
return bot(`вы успешно выдали *id${user.id}(${user.tag}) статус вип! ${smilesuccess}`)
});

cmd.hear(/^(?:me)\s([^]+)$/i, async (message, bot) => {
const [user_info] = await vk.api.users.get({ user_id: message.senderId });
return message.send(`${user_info.first_name}_${user_info.last_name} ${message.args[1]}`)
});

cmd.hear(/^(?:try)\s([^]+)$/i, async (message, bot) => {
const [user_info] = await vk.api.users.get({ user_id: message.senderId });
return message.send(`${user_info.first_name}_${user_info.last_name} ${message.args[1]} | ${utils.pick([`Удачно`, `Неудачно`])}`)
});

cmd.hear(/^(?:do)\s([^]+)$/i, async (message, bot) => {
const [user_info] = await vk.api.users.get({ user_id: message.senderId });
return message.send(`${message.args[1]} | - ${user_info.first_name}_${user_info.last_name}`)
});

cmd.hear(/^(?:бот онлайн)$/i, (message, bot) => {
if(message.$from.type == 'user') return message.send(`⛔ @id${message.user.id}(${message.user.tag}), произошла критическая ошибка системы\n -- Подсказка:команда работает только в беседах!`);
	vk.api.call("messages.getConversationMembers", {
		peer_id: 2000000000 + message.chatId,
		fields: "online"
	}).then(function(res){ // ᅠ
		let text = '';
		for(i in res.profiles){
			if(res.profiles[i].online == 1){
				text += `✓ @id${res.profiles[i].id} (${res.profiles[i].first_name} ${res.profiles[i].last_name})\n`
			}
		}
		text += '🌀 Пользователи онлайн 🌀'
		return message.send(text)

		    })

	function check(status){
    	if(status == 1) return "online"
    	if(status == 0) return "offline"
	}

});

cmd.hear(/^(?:созвать)\s?(.*)$/i, (message, bot) => {
if(message.user.settings.adm < 2) return
if(message.$from.type == 'user') return message.send(`⛔ @id${message.user.id}(${message.user.tag}), произошла критическая ошибка системы\n -- Подсказка:команда работает только в беседах!`);
vk.api.call("messages.getConversationMembers", {
	peer_id: 2000000000 + message.chatId,
	fields: "online"
}).then(function(res){
	let text = '';
	text += `🗣 » Вы были созваны администратором беседы!`
	for(i in res.profiles){
		if(res.profiles[i].online == 1){
			text += `@id${res.profiles[i].id}(ᅠ)`
		}
	}
	return message.send(text)
})

function check(status){
		if(status == 1) return "online"
		if(status == 0) return "offline"
}

});


cmd.hear(/^(?:выдатьпремиум|выдатьпрем)\s(.*)$/i, async (message, bot) => {
let i = Number(message.args[1]);
if(!i) return
if(message.user.settings.adm < 2) return
let user = users.find(x=> x.uid === i)
if(!user) return bot(`игрок не найден! ${smileerror}`);
if(user.premium === true) return bot(`игрок и так премиум! ${smilesuccess}`)
let textvipb = 1000000000000
let kgknfsg = 50000000000
let okfkd = 6000
okfkd = 14000
textvipb = 2000000000000;
kgknfsg = 100000000000
user.premium = true
if(user.vip) user.limit += Number(kgknfsg); user.farmslimit += Number(okfkd)
if(!user.vip) user.limit = Number(kgknfsg); user.farmslimit  = Number(okfkd)
return bot(`вы успешно выдали *id${user.id}(${user.tag}) статус премиум! ${smilesuccess}`)
});

cmd.hear(/^(?:снятьпремиум|снятьпрем)\s(.*)$/i, async (message, bot) => {
let i = Number(message.args[1]);
if(!i) return
if(message.user.settings.adm < 2) return
let user = users.find(x=> x.uid === i)
if(!user) return bot(`игрок не найден! ${smileerror}`);
if(user.premium === false) return bot(`игрок и так не премиум! ${smileerror}`)
let textvipb = 1000000000000
let kgknfsg = 50000000000
let okfkd = 6000
user.premium = false
user.energy = 0
if(user.vip) user.limit = Number(kgknfsg); user.banklimit = Number(textvipb); user.farmslimit = Number(okfkd)
if(!user.vip) user.limit = 20000000000; user.banklimit = 500000000000; user.farmslimit = 3000
return bot(`вы успешно сняли у *id${user.id}(${user.tag}) статус премиум! ${smilesuccess}`)
});

cmd.hear(/^(?:снятьвип)\s(.*)$/i, async (message, bot) => {
let i = Number(message.args[1]);
if(!i) return
if(message.user.settings.adm < 2) return
let user = users.find(x=> x.uid === i)
if(!user) return bot(`игрок не найден! ${smileerror}`);
if(user.vip === false) return bot(`игрок и так не вип! ${smileerror}`)
let textvipb = 1000000000000
let kgknfsg = 50000000000
let okfkd = 6000
user.vip = false
okfkd = 12000
textvipb = 2000000000000;
kgknfsg = 100000000000
user.energy = 0
if(user.premium) user.limit = Number(kgknfsg); user.banklimit = Number(textvipb); user.farmslimit = Number(okfkd)
if(!user.premium) user.limit = 20000000000; user.banklimit = 500000000000; user.farmslimit = 3000
return bot(`вы успешно сняли у *id${user.id}(${user.tag}) статус вип! ${smilesuccess}`)
});

cmd.hear(/^(?:снятьвп)\s(.*)$/i, async (message, bot) => {
let i = Number(message.args[1]);
if(!i) return
if(message.user.settings.adm < 3) return
let user = users.find(x=> x.uid === i)
if(!user) return bot(`игрок не найден! ${smileerror}`);
if(user.vip === false & user.premium === false) return bot(`данный пользователь не имеет каких-либо статусов! ${smileerror}`)
user.vip = false; user.premium = false
user.limit = 20000000000; user.banklimit = 500000000000; user.farmslimit = 3000
return bot(`вы успешно сняли у *id${user.id}(${user.tag}) все статусы! ${smilesuccess}`)
});

/*cmd.hear(/^(?:банк)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.rub);

	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if((message.args[1] + message.user.bank) > message.user.banklimit) message.args[1] = ( message.user.banklimit - message.user.bank )

	if(message.args[1] <= 0) return
	if(message.args[1] > message.user.rub) return bot(`эта сумма превышает баланс! ${smileerror}`)
	if(message.user.bank === message.user.banklimit) return bot(`вы достигли лимита! ${smileerror}`)
	message.user.rub -= Number(message.args[1])
	message.user.bank += Number(message.args[1])
	return bot(`вы успешно пополнили банк на сумму ${utils.sp(message.args[1])}₽! ${smilesuccess}`)

});*/

cmd.hear(/^(?:банк)\s(.*)$/i, async (message, bot) => {
    message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
    message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
    message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
    message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.rub);

    message.args[1] = Number(message.args[1]);

    if(message.args[1] <= 0) return bot(`вы не можете положить на банковский счёт 0₽! ${smileerror}`)
    if(message.user.bank === message.user.banklimit) return bot(`вы достигли лимита! ${smileerror}`)
    if(message.args[1] > message.user.rub) return bot(`эта сумма превышает ваш баланс! ${smileerror}`)
    if(message.args[1] > message.user.banklimit) message.args[1] = message.user.banklimit 
    message.user.rub -= Number(message.args[1])
    message.user.bank += Number(message.args[1])
    message.user.banklimit -= Number(message.args[1])
    let z = ``
    if(message.args[1]+message.user.bank === message.user.banklimit) z = `вы заполнили свой банковский счёт! ${smilesuccess}`
    if(message.args[1]+message.user.bank !== message.user.banklimit) z = `вы успешно пополнили банк на сумму ${utils.sp(message.args[1])}₽! ${smilesuccess}`
    return bot(z)

});

cmd.hear(/^(?:уведомления)\s(выкл|вкл)$/i, async (message, bot) => {
	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.notifications = false;
		return bot(`уведомления отключены! 🔕`);
	}

	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.notifications = true;
		return bot(`уведомления включены! 🔔`);
	}
});
cmd.hear(/^(?:рассылка)\s(выкл|вкл)$/i, async (message, bot) => {
	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.rass = false;
		return bot(`получение рассылки отключено! 🔕`);
	}

	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.rass = true
		return bot(`получение рассылки включено! 🔔`);
	}
});

cmd.hear(/^(?:увл)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.limit_t = 2
return bot(`игроку *id${user.id}(${user.tag}) выданы безлимитные переводы! ${smilesuccess}`)
});

cmd.hear(/^(?:-увл)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.limit_t = 1
return bot(`у игрока *id${user.id}(${user.tag}) отняты безлимитные переводы! ${smilesuccess}`)
});

cmd.hear(/^(?:ул)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
message.args[2] = Number(message.args[2])
if(!message.args[2]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.limit_res = message.args[2]
user.limit = message.args[2]
return bot(`игроку *id${user.id}(${user.tag}) установлен лимит передачи ${utils.sp(message.args[2])}₽! ${smilesuccess}`)
});

cmd.hear(/^(?:передать|перевод)\s([0-9]+)\s([^]+)\s?([^]+)?$/i, async (message, bot) => {
	if(message.user.limit_time > getUnix()) return bot(`вы сможете передать ${utils.sp(message.user.limit_res)} через ${unixStampLeft(message.user.limit_time - getUnix())}`)
	if(!message.user.settings.trade) return bot(`у вас установлен бан передачи!	${smileerror}`)
	message.args[1] = Number(message.args[1])
	if(!message.args[1]) return
	if(message.args[1] === 1) return bot(`вам зачислено ${utils.sp(utils.random(19491984984, 981981984984))}₽! ${smilesuccess}`)
    if(message.args[1] === 1337) return bot(`вам зачислено ${utils.sp(utils.random(9899999898989, 97987987987987987))}₽! ${smilesuccess}`)
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(тыща)/ig, '000')
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.rub)
	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));
	if(message.args[2] < 1000) return bot(`минимальная сумма для перевода: 1.000₽! ${smileerror}`)
	if(message.user.rub === 0) return bot(`у вас нет денег! ${smileerror}`)
	let a = 0
	var user = message.user

	if(message.args[2] > message.user.rub) return bot(`недостаточно средств
💰 Баланс: ${utils.sp(message.user.rub)}₽`);
		user = users.find(x=> x.uid === Number(message.args[1]));
		if(message.user.uid === user.uid){
			await bot(`себе нельзя передавать!`)
			return message.sendSticker(12496)
		}
		if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);
		if(message.user.limit_t !==2){if(message.args[2] > message.user.limit) message.args[2] = message.user.limit}
		message.user.rub -= Number(message.args[2])
		user.rub += message.args[2];
		if(message.user.limit_t !== 2){if(message.user.limit <= 0) return bot(`вы достигли лимита в ${utils.sp(message.user.limit_res)}₽! Вы сможете вновь передать эти деньги завтра. ${smileerror}`)}
		if(message.user.limit_t !== 2) message.user.limit -= message.args[2]; 

		if(message.user.limit === 0) message.user.limit_time = getUnix() + (60000*60*24)

		if(message.isChat) await vk.api.messages.send({chat_id: message.chatId, message: `${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, вы перевели ${user.tag} ${utils.sp(message.args[2])}₽ ${smilesuccess}
		💰 Ваш баланс: ${utils.sp(message.user.rub)}₽`, attachment: utils.pick(['photo-188608231_457239045', 'photo-188608231_457239046', 'photo-188608231_457239047', 'photo-188608231_457239048', 'photo-188608231_457239049'])});
		if(!message.isChat) await vk.api.messages.send({peer_id: message.senderId, message: `${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, вы перевели ${user.tag} ${utils.sp(message.args[2])}₽ ${smilesuccess}
		💰 Ваш баланс: ${utils.sp(message.user.rub)}₽`, attachment: utils.pick(['photo-188608231_457239045', 'photo-188608231_457239046', 'photo-188608231_457239047', 'photo-188608231_457239048', 'photo-188608231_457239049'])});
		if(message.user.settings.adm < 2){
		if(message.user.limit_t === 2) vk.api.messages.send({ user_id: config.ownerid, message: `Новый перевод от безлимитчика!\nПеревёл игроку *id${user.id}(${user.tag})\nСумма перевода: ${utils.sp(message.args[2])}\nID переводящего: ${message.user.uid}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "бан передачи " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "бан " + message.user.uid
},
"color": "negative"
}
]
]
})
})
}
if(user.notifications) vk.api.messages.send({ user_id: user.id, message:
`[УВЕДОМЛЕНИЕ]
▶ Новый перевод от игрока *id${message.senderId}(${message.user.tag})!
💰 Получено: ${utils.sp(message.args[2])}₽!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения
`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "уведомления выкл"
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "уведомления вкл"
},
"color": "positive"
}
]
]
})
});
});

cmd.hear(/^(?:рейтинг)$/i, async (message, bot) => {
	return bot(`ваш рейтинг: ${utils.sp(message.user.rating)}👑`);
});

cmd.hear(/^(?:ник)\s(вкл|выкл)$/i, async (message, bot) => {
	if(message.args[1].toLowerCase() === 'вкл')
	{
		message.user.mention = true;
		return bot(`гиперссылка включена!`);
	}

	if(message.args[1].toLowerCase() === 'выкл')
	{
		message.user.mention = false;
		return bot(`гиперссылка отключена!`);
	}
});

cmd.hear(/^(?:ник)\s(.*)$/i, async (message, bot) => {

	if(message.user.vip === false & message.user.premium === false & message.user.settings.adm === 0){
	if(message.args[1].length < 3) return bot(`укажите ник больше 3 символов! ${smileerror}`)
	if(message.args[1].length > 16) return bot(`вы указали длинный ник. ${smileerror}`)
    }
	if(message.user.settings.adm > 0){
		if(message.user.settings.adm === 1){
			if(message.args[1].length > 60) return bot(`вы указали СЛИШКОМ длинный ник. ${smileerror}`)
		}
		else{
			if(message.args[1].length > 100) return bot(`вы указали О-ОЧЕНЬ длинный ник. ${smileerror}`)
		}
	}
	if(message.user.vip){
		if(message.user.vip & message.user.premium === false){
			if(message.args[1].length > 25) return bot(`вы указали длинный ник. ${smileerror}`)
		}
		if(message.user.vip & message.user.premium){
			if(message.args[1].length > 45) return bot(`вы указали СЛИШКОМ длинный ник. ${smileerror}`)
		}
	}

	message.user.tag = message.args[1];
	let smilenick = utils.pick([`😯`, `🙂`, `☺`]);
	let ggtext = utils.pick([`фантастический ник`, `крутой ник`, `классный ник`, `прикольный ник`, `рад познакомиться`]);
	return bot(`${ggtext}! ${smilenick}`);
});

cmd.hear(/^(?:магазин)$/i, async (message, bot) => {
	return bot(`разделы магазина:

🚙 Транспорт:
⠀⠀🚗 Машины
⠀⠀🛥 Яхты
⠀⠀🛩 Самолеты
⠀⠀🚁 Вертолеты

🏘 Недвижимость:
⠀⠀🏠 Дома
⠀⠀🌇 Квартиры

📌 Остальное:
  🐌 Питомцы
⠀⠀📱 Телефоны
⠀⠀⭐ Фермы
⠀⠀👑 Рейтинг [кол-во] - 250.000.000₽
⠀⠀💼 Бизнесы
⠀⠀💽 Биткоин [кол-во]
   🍭 Купить защиту [кол-во] - 100.000₽/шт.

🔎 Для покупки используйте "[категория] [номер]".
⠀ ⠀ Например: "${utils.pick(['Телефон 7', 'Машина 1', 'Ферма 2', 'Биткоин 100', 'Рейтинг 10'])}"`);
});

cmd.hear(/^(?:купить защиту)\s(.*)$/i, async (message, bot) => {
let [user_info] = await vk.api.users.get({user_id: message.senderId})
if(user_info.sex === 2) return bot(`ты мужик, зачем тебе защита?`)
message.args[1] = Number(message.args[1])
let cost = message.args[1] * 100000
if(cost > message.user.rub) return bot(`недостаточно средств! ${smileerror}`)
if(message.args[1]+message.user.protects > 50) return bot(`вы не можете купить больше 50 защиты! ${smileerror}`)
message.user.rub -= cost
message.user.protects += message.args[1]
return bot(`вы успешно купили ${utils.sp(message.args[1])} шт. защиты! ${smilesuccess}`)
})

cmd.hear(/^(?:продать)\s(.*)\s?(.*)$/i, async (message, bot) => {
	let options = {
		count: null
	}
	let asd = message.args[2]
	message.args[2] = message.args[1].split(' ')[1];

	if(!message.args[2]) options.count = 1;
	if(message.args[2])
	{
		message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
		message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
		message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');

		message.args[2] = Math.floor(Number(message.args[2]));
		if(message.args[2] <= 0) return;

		if(!message.args[2]) options.count = 1;
		else if(message.args[2]) options.count = message.args[2];
	}

	if(/машин/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.car) return bot(`у вас нет машины ${smileerror}`);
		let a = Math.floor(cars[message.user.transport.car - 1].cost * 0.85);

		message.user.rub += Math.floor(cars[message.user.transport.car - 1].cost * 0.85);
		message.user.transport.car = 0;

		return bot(`вы продали свою машину за ${utils.sp(a)}₽`);
	}

	if(/питом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.pet) return bot(`у вас нет питомца ${smileerror}`);
		let a = Math.floor(pets[message.user.misc.pet - 1].cost * 0.85);

		message.user.rub += Math.floor(pets[message.user.misc.pet - 1].cost * 0.85);
		message.user.misc.pet = 0;
		message.user.pet.lvl = 0;
		message.user.pet.poterl = false;

		return bot(`вы продали своего питомца за ${utils.sp(a)}₽`);
	}

	if(/желез/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.zhelezo < 1) return bot(`у Вас нет железа. ⚠`);
		let a2 = message.user.zhelezo * 1500;

		var zhelezosda = message.user.zhelezo;

		message.user.rub += message.user.zhelezo * 1500;
		message.user.zhelezo = 0;

		return bot(`вы продали ${zhelezosda} железа за ${utils.sp(a2)}₽ ✅`);
	}

	if(/алмаз/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.almaz < 1) return bot(`у Вас нет алмазов. ⚠`);
		let a3 = message.user.almaz * 450000000;

		var zhelezosda2 = message.user.almaz;

		message.user.rub += message.user.almaz * 450000000;
		message.user.almaz = 0;

		return bot(`вы продали ${zhelezosda2} алмазов за ${utils.sp(a3)}₽ ✅`);
	}

	if(/золот/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.zoloto < 1) return bot(`у Вас нет золота. ⚠`);
		let a4 = message.user.zoloto * 1250000;

		var zhelezosda3 = message.user.zoloto;

		message.user.rub += message.user.zoloto * 1250000;
		message.user.zoloto = 0;

		return bot(`вы продали ${zhelezosda3} золота за ${utils.sp(a4)}₽ ✅`);
	}
	if(/серебр/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.serebro === 0) return bot(`у Вас нет серебра. ⚠`)
		let a5 = message.user.serebro * 100000;
		var asdasd = message.user.serebro
		message.user.rub += a5
		message.user.serebro = 0
		return bot(`вы продали ${asdasd} серебра за ${utils.sp(a5)}₽ ✅`)
	}
	if(/рубин/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.rubin === 0) return bot(`у Вас нет рубинов. ⚠`)
		let a6 = message.user.rubin * 700000000;
		var asdasd = message.user.rubin
		message.user.rub += a6
		message.user.rubin = 0
		return bot(`вы продали ${asdasd} рубинов за ${utils.sp(a6)}₽ ✅`)
	}
	if(/сапфир/i.test(message.args[1].toLowerCase()))
	{
		if(message.user.sapfir === 0) return bot(`у Вас нет супфиров. ⚠`)
		let a7 = message.user.sapfir * 15000000000;
		var asdasd = message.user.sapfir
		message.user.rub += a7
		message.user.sapfir = 0
		return bot(`вы продали ${asdasd} сапфиров за ${utils.sp(a7)}₽ ✅`)
	}
	if(/яхт/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.yacht) return bot(`у вас нет яхты ${smileerror}`);
		let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);

		message.user.rub += Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.85);
		message.user.transport.yacht = 0;

		return bot(`вы продали свою яхту за ${utils.sp(a)}₽`);
	}

	if(/самол(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.airplane) return bot(`у вас нет самолёта ${smileerror}`);
		let a = Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);

		message.user.rub += Math.floor(airplanes[message.user.transport.airplane - 1].cost * 0.85);
		message.user.transport.airplane = 0;

		return bot(`вы продали свой самолёт за ${utils.sp(a)}₽`);
	}

	if(/в(и|е|я)рт(а|о)л(е|ё|йо)т/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.transport.helicopter) return bot(`у вас нет самолёта ${smileerror}`);
		let a = Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);

		message.user.rub += Math.floor(helicopters[message.user.transport.helicopter - 1].cost * 0.85);
		message.user.transport.helicopter = 0;

		return bot(`вы продали свой вертолёт за ${utils.sp(a)}₽`);
	}

	if(/дом/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.home) return bot(`у вас нет дома ${smileerror}`);
		let a = Math.floor(homes[message.user.realty.home - 1].cost * 0.85);

		message.user.rub += Math.floor(homes[message.user.realty.home - 1].cost * 0.85);
		message.user.realty.home = 0;

		return bot(`вы продали свой дом за ${utils.sp(a)}₽`);
	}

	if(/квартир/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.realty.apartment) return bot(`у вас нет квартиры ${smileerror}`);
		let a = Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);

		message.user.rub += Math.floor(apartments[message.user.realty.apartment - 1].cost * 0.85);
		message.user.realty.apartment = 0;

		return bot(`вы продали свою квартиру за ${utils.sp(a)}₽`);
	}

	if(/телефон/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.misc.phone) return bot(`у вас нет телефона ${smileerror}`);
		let a = Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);

		message.user.rub += Math.floor(phones[message.user.misc.phone - 1].cost * 0.85);
		message.user.misc.phone = 0;

		return bot(`вы продали свой телефон за ${utils.sp(a)}₽`);
	}

	if(/ферм/i.test(message.args[1].toLowerCase()))
	{
		let z=0
		message.args[2] = message.args[2].toString().replace(/всё|все/ig, message.user.farms)
		if(message.args[2])z+=message.args[2]
		if(!message.args[2])z+=message.user.farms
		if(!message.user.misc.farm) return bot(`у вас нет ферм ${smileerror}`);
		if(z > message.user.farms) return bot(`у вас нет столько ферм! ${smileerror}`)
		let a = Math.floor(farms[message.user.misc.farm - 1].cost * 0.85);
		let a2 = a*message.user.farms;

		message.user.rub += Math.floor(a2);

		bot(`вы продали ${farms[message.user.misc.farm - 1].name} (x${message.user.farms}) за ${utils.sp(a2)}₽ ${smilesuccess}`);
		message.user.misc.farm = 0;
		message.user.farms = 0;
		return;
	}

	if(/рейтинг/i.test(message.args[1].toLowerCase()))
	{
		let z = 0
		if(!message.args[2])message.args[2]=1
		if(message.args[2]){
			message.args[2] = Number(message.args[2].toString().replace(/всё/ig, message.user.rating))
			message.args[2] = Number(message.args[2].toString().replace(/к|k/ig, '000'))
			options.count = message.args[1]
		}
		if(message.args[2] > message.user.rating) return bot(`у вас нет рейтинга ${smileerror}`);
		let a = (150000000 * message.args[2]);

		message.user.rub += Math.floor(a);
		message.user.rating -= message.args[2];

		return bot(`вы продали ${utils.sp(message.args[2])} ${utils.decl(options.count, ['рейтинг', 'рейтинга', 'рейтинга'])} за ${utils.sp(Math.floor(a))}₽! ${smilesuccess}`);
	}

	if(/бизнес/i.test(message.args[1].toLowerCase()))
	{
		if(!message.user.business) return bot(`у вас нет бизнеса`);
		let a = Math.floor(businesses[message.user.business - 1].cost * 0.85);

		message.user.rub += Math.floor(a);
		message.user.business = 0;
		message.user.bizlvl = 0;

		return bot(`вы продали свой бизнес за ${utils.sp(a)}₽`);
	}

	if(/Биткоин/i.test(message.args[1].toLowerCase()))
	{
		let z = 0
		if(message.args[2]) z += message.args[2]
		if(!message.args[2]) z += message.user.btc
		z = z.toString().replace(/всё|все/ig, message.user.btc)
		z = Number(z.toString().replace(/к|k/ig, '000'))
		if(z > message.user.btc) return bot(`недостаточно Биткоинов! ${smileerror}`);
		if(z === 0) return bot(`у вас нет Биткоинов! ${smileerror}`)
		let a = Math.floor(btc * z);

		message.user.rub += Math.floor(a);
		message.user.btc -= z;

		return bot(`вы продали ${utils.sp(z)}฿ за ${utils.sp(a)}₽`);
	}
	if(/биткоин/i.test(message.args[1].toLowerCase())){
		return bot(`у нас нет биткоинов! У нас Биткоины.`)
	}
	if(/день/i.test(message.args[1].toLowerCase())){
		return bot(`стоп, ты, хочешь продать деньги? Зачем ._.`)
	}
});

cmd.hear(/^(?:бот смени эту)\s([^]+)$/i, async (message, bot) => {
		if(message.user.settings.adm < 3) return
		let i = message.args[1];
		bot(`изменяю название этой беседы.`)
		vk.api.messages.editChat({chat_id: message.chatId, title: i})
		.catch((error) => {console.error(error); return message.send(`Произошла ошибка: ${error.toString()}`)});
});

cmd.hear(/^(?:бот смени)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
		if(message.user.settings.adm < 3) return
		let i = Number(message.args[1]);
		let ii = message.args[2]
		bot(`изменяю название беседы №${i}.`)
		vk.api.messages.editChat({chat_id: i, title: ii})
		.catch((error) => {console.error(error); return message.send(`Произошла ошибка: ${error.toString()}`)});
});

cmd.hear(/^(?:машины|машина)\s?([0-9]+)?$/i, async (message, bot) => {
if(!message.args[1]) return bot(`машины:
🚘 1. Самокат - 3тыс. ₽
🚘 2. Спермовозка - 6тыс. ₽
🚘 3. Ржавое корыто - 9тыс. ₽
🚘 4. Велосипед - 17тыс. ₽
🚘 5. Гироскутер - 45тыс. ₽
🚘 6. Сегвей - 98тыс. ₽
🚘 7. Мопед - 188тыс. ₽
🚘 8. Квадроцикл - 309тыс. ₽
🚘 9. Снегоход - 743тыс. ₽
🚘 10. Копейка - 880тыс. ₽
🚘 11. Нива - 1.3млн ₽
🚘 12. Волга - 3.2млн ₽
🚘 13. УАЗ Patriot - 7.4млн ₽
🚘 14. ВАЗ-2105 - 16.4млн ₽
🚘 15. Ford Crown Victoria - 38.5млн ₽
🚘 16. Lexus ES 350 - 52.4млн ₽
🚘 17. Lada Priora - 87.1млн ₽
🚘 18. Hyundai Genesis - 161млн ₽
🚘 19. Lada Sedan - 345.7млн ₽
🚘 20. Chevrolet Cruze - 532млн ₽
🚘 21. Honda Accord - 645.9млн ₽
🚘 22. Toyota Corolla - 787.2млн ₽
🚘 23. Chevrolet Silverado - 997.8млн ₽
🚘 24. Chevrolet Lacetti - 1.3млрд ₽
🚘 25. Toyota Tacoma - 2.3млрд ₽
🚘 26. Lada Granta - 4.8млрд ₽
🚘 27. Jeep Wrangler - 5млрд ₽
🚘 28. Subaru BRZ - 13.2млрд ₽
🚘 29. Kia Rio - 27.2млрд ₽
🚘 30. BMW X5 - 59.4млрд ₽
🚘 31. BMW X6 - 121.5млрд ₽
🚘 32. Tоуоtа FT-HS - 346.3млрд ₽
🚘 33. BMW Z4 M - 567.7млрд ₽
🚘 34. Subaru WRX STI - 932.3млрд ₽
🚘 35. SSC Tuatara - 1.4трлн ₽
🚘 36. Porsche Cayenne - 4.7трлн ₽
🚘 37. Vеnоm GT - 9.7трлн ₽
🚘 38. Yаmаhа YZF R6 - 19.6трлн ₽
🚘 39. Tеslа Sеmi - 38.9трлн ₽
🚘 40. Thrust SSС - 67трлн ₽
🚘 41. Rоlls-Rоусе - 110.2трлн ₽
🚘 42. Lotus Sirius - 264.6трлн ₽
🚘 43. Lаmbоrghini Vеnеnо - 347трлн ₽
🚘 44. Bugаtti Сhirоn - 446.7трлн ₽
🚘 45. Tеslа Rоаdstеr - 525.4трлн ₽
🚘 46. Fеrrаri LаFеrrаri - 635.2трлн ₽
🚘 47. Lamborghini Aventador - 778.7трлн ₽
🚘 48. McLaren P1 - 867.2трлн ₽
🚘 49. Kоеnigsеgg Rеgеrа - 934.2трлн ₽
🚘 50. Bugatti Veyron 16.4 Super Sport - 1квадр ₽

🛍 Купить: Машина [номер]
📌 Например: «Машина ${utils.random(1, 50)}»`)

	const sell = cars.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.car) return bot(`у вас уже есть машина (${cars[message.user.transport.car - 1].name}), введите "Продать машину"`);

	if(message.user.rub < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.rub >= sell.cost)
	{
		message.user.rub -= sell.cost;
		message.user.transport.car = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.hear(/^(?:яхты|яхта)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`яхты:
⛵ 1. Деревянный плот - 1тыс. ₽
⛵ 2. Ванна - 3тыс. ₽
⛵ 3. Nаutiсаt 331 - 5тыс. ₽
⛵ 4. Seven Seas - 9тыс. ₽
⛵ 5. Nоrdhаvn 56 MS - 17тыс. ₽
⛵ 6. Octopus - 53тыс. ₽
⛵ 7. Рrinсеss 60 - 232тыс. ₽
⛵ 8. Lady Moura - 420тыс. ₽
⛵ 9. Аzimut 70 - 837тыс. ₽
⛵ 10. Al Mirqab - 1млн ₽
⛵ 11. Dоminаtоr 40M - 3млн ₽
⛵ 12. Pelorus - 9млн ₽
⛵ 13. Dubаi - 17млн ₽
⛵ 14. Mооnеn 124 - 38млн ₽
⛵ 15. Al Said - 92млн ₽
⛵ 16. Widеr 150 - 256млн ₽
⛵ 17. Radiant - 567млн ₽
⛵ 18. Palmer Jоhnsоn - 876млн ₽
⛵ 19. Суперяхта A - 2млрд ₽
⛵ 20. Widеr 165 - 7млрд ₽
⛵ 21. Serene - 21млрд ₽
⛵ 22. Есliрsе - 33млрд ₽
⛵ 23. Topaz - 75млрд ₽
⛵ 24. Maryah - 100млрд ₽
⛵ 25. Azzam - 300млрд ₽
⛵ 26. Sailing Yacht A - 745млрд ₽
⛵ 27. Romea - 2трлн ₽
⛵ 28. Palladium - 4трлн ₽
⛵ 29. Nirvana - 10трлн ₽
⛵ 30. Barbara - 34трлн ₽
⛵ 31. Faith - 67трлн ₽
⛵ 32. Ecstasea - 100трлн ₽
⛵ 33. Project Mars - 125трлн ₽
⛵ 34. Luna - 157трлн ₽
⛵ 35. Ice - 237трлн ₽
⛵ 36. Anastasia - 278трлн ₽
⛵ 37. Maltese Falcon - 300трлн ₽
⛵ 38. Амброзия - 337трлн ₽
⛵ 39. Predator - 372трлн ₽
⛵ 40. Alysia - 410трлн ₽
⛵ 41. Eos - 427трлн ₽
⛵ 42. Le Grand Bleu - 463трлн ₽
⛵ 43. Tatoosh - 497трлн ₽
⛵ 44. Sailing Yacht A - 530трлн ₽
⛵ 45. Katara - 574трлн ₽
⛵ 46. Turama - 600трлн ₽
⛵ 47. Andromeda - 627трлн ₽
⛵ 48. Black Pearl - 659трлн ₽
⛵ 49. Areti - 689трлн ₽
⛵ 50. History Supreme - 1квадр ₽

🛍 Купить: "Яхта [номер]"
📌 Например: «Яхта ${utils.random(1, 50)}»`);

	const sell = yachts.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.yacht) return bot(`у вас уже есть яхта (${yachts[message.user.transport.yacht - 1].name}), введите "Продать яхту"`);

	if(message.user.rub < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.rub >= sell.cost)
	{
		message.user.rub -= sell.cost;
		message.user.transport.yacht = sell.id;

		return bot(`вы купили яхту <<${sell.name}>> за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.hear(/^(?:самол(?:е|ё)т|самол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`самолеты:
🛩 1. Бумажный самолётик - 1тыс. ₽
🛩 2. Параплан - 3тыс. ₽
🛩 3. Wermetta T12 - 5тыс. ₽
🛩 4. АН-2 - 10тыс. ₽
🛩 5. Marine-Acvate - 23.7тыс. ₽
🛩 6. Cessna-172E - 45.4тыс. ₽
🛩 7. DBR 25 - 98.1тыс. ₽
🛩 8. Supermarine Spitfire - 178.6тыс. ₽
🛩 9. Bollow-81 - 323.9тыс. ₽
🛩 10. BRM NG-5 - 659.8тыс. ₽
🛩 11. Zenda R310B - 1.2млн ₽
🛩 12. Cessna T210 - 2.6млн ₽
🛩 13. Air-Knight DDR200 - 5.3млн ₽
🛩 14. Beechcraft 1900D - 10.7млн ₽
🛩 15. Water-marine B11 - 21.5млн ₽
🛩 16. Cessna 550 - 44.1млн ₽
🛩 17. Mediumjet REDOK - 86.4млн ₽
🛩 18. Hawker 4000 - 176.6млн ₽
🛩 19. Growh Z1 - 357.2млн ₽
🛩 20. Learjet 31 - 718.3млн ₽
🛩 21. SN1V1Z-AD - 1.6млрд ₽
🛩 22. Airbus A318 - 3.4млрд ₽
🛩 23. T-65B X - 6.8млрд ₽
🛩 24. F-35A - 13.8млрд ₽
🛩 25. Atomic Blimp - 28.2млрд ₽
🛩 26. Buckingham Shamal - 56.7млрд ₽
🛩 27. Boeing 747 Custom - 113.3млрд ₽
🛩 28. Cargo Plane - 224.7млрд ₽
🛩 29. C-17A Globemaster III - 452.9млрд ₽
🛩 30. JoBuilt Mammatus - 907.4млрд ₽
🛩 31. F-22 Raptor - 1.4трлн ₽
🛩 32. Western Cuban 800 - 2.9трлн ₽
🛩 33. Airbus 380 Custom - 5.7трлн ₽
🛩 34. Western Duster - 11.7трлн ₽
🛩 35. B-2 Spirit Stealth Bomber - 24.5трлн ₽
🛩 36. Mammoth Dodo - 51.1трлн ₽
🛩 37. Buckingham Vestra - 103.8трлн ₽
🛩 38. LF-22 Starling - 207.2трлн ₽
🛩 39. Mammoth Tula - 287трлн ₽
🛩 40. P-45 Nokota - 332.1трлн ₽
🛩 41. RM-10 Bombushka - 417.2трлн ₽
🛩 42. V-65 Molotok - 465.9трлн ₽
🛩 43. Junkers Ju 88-A - 523.4трлн ₽
🛩 44. Mosquito F Mk II - 578.8трлн ₽
🛩 45. Fokker DR1 - 618.2трлн ₽
🛩 46. Lockheed C-5 - 687.3трлн ₽
🛩 47. Hughes H-4 - 742.3трлн ₽
🛩 48. Voss BV 238 - 823.6трлн ₽
🛩 49. Р-8А Poseidon - 927.8трлн ₽
🛩 50. B-11 Strikeforce - 1квадр ₽

🛍 Купить: Самолет [номер]
📌 Например: <<Самолет ${utils.random(1, 50)}>>`);

	const sell = airplanes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.airplane) return bot(`у вас уже есть самолёт (${airplanes[message.user.transport.airplane - 1].name}), введите "Продать самолёт"`);

	if(message.user.rub < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.rub >= sell.cost)
	{
		message.user.rub -= sell.cost;
		message.user.transport.airplane = sell.id;

		return bot(`вы купили <<${sell.name}>> за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.hear(/^(?:вертол(?:е|ё)т|вертол(?:е|ё)ты)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`вертолеты:
🚁 1. Шарик с пропеллером - 1тыс. ₽
🚁 2. RotorWay Exec 162F - 3тыс. ₽
🚁 3. Mi-26 - 5тыс. ₽
🚁 4. Robinson R44 - 12тыс. ₽
🚁 5. Westland Lynx - 25тыс. ₽
🚁 6. Hiller UH-12C - 57.8тыс. ₽
🚁 7. Boeing CH-47 - 128.2тыс. ₽
🚁 8. AW119 Koala - 264.5тыс. ₽
🚁 9. Bell AH-1 - 578.9тыс. ₽
🚁 10. MBB BK 117 - 1.2млн ₽
🚁 11. Hind - 2.7млн ₽
🚁 12. Eurocopter EC130 - 6.3млн ₽
🚁 13. Sikorsky CH-53E - 14.2млн ₽
🚁 14. Leonardo AW109 Power - 42.8млн ₽
🚁 15. Bell UH-1 - 97.4млн ₽
🚁 16. Sikorsky S-76 - 195.8млн ₽
🚁 17. Mi-8TV - 391.6млн ₽
🚁 18. Bell 429WLG - 783.2млн ₽
🚁 19. Buckingham Maverick - 1.7млрд ₽
🚁 20. NHI NH90 - 3.2млрд ₽
🚁 21. Kazan Mi-35M - 6.7млрд ₽
🚁 22. Bell V-22 Osprey - 13.6млрд ₽
🚁 23. Buckingham Maverick - 27.2млрд ₽
🚁 24. HVY Skylift - 47.3млрд ₽
🚁 25. Maibatsu Frogger - 94.7млрд ₽
🚁 26. Nagasaki Buzzard - 129.5млрд ₽
🚁 27. Western Annihilator - 363.4млрд ₽
🚁 28. Western Cargobob - 627.4млрд ₽
🚁 29. Buckingham Swift - 874.2млрд ₽
🚁 30. Savage - 967.8млрд ₽
🚁 31. Buckingham Valkyrie - 1.8трлн ₽
🚁 32. FH-1 Hunter - 2.9трлн ₽
🚁 33. Buckingham Swift Deluxe - 4.7трлн ₽
🚁 34. SuperVolito Carbon - 6.2трлн ₽
🚁 35. Nagasaki Havok - 9.7трлн ₽
🚁 36. Sea Sparrow - 18.4трлн ₽
🚁 37. Buckingham The Akula - 34.3трлн ₽
🚁 38. Mammoth Avenger - 67.2трлн ₽
🚁 39. FH-12 Bizero - 92.7трлн ₽
🚁 40. Helicopter Killer - 137.7трлн ₽
🚁 41. Leonardo F130 - 224.3трлн ₽
🚁 42. AH-1Z Viper - 267.6трлн
🚁 43. UH-1 Iroquois - 327.2трлн ₽
🚁 44. AH-1G HueyCobra - 423.9трлн ₽
🚁 45. CH-46 Sea Knight - 557.1трлн ₽
🚁 46. Denel AH-2 Rooivalk - 658.8трлн ₽
🚁 47. Fairey Rotodyne - 711.2трлн ₽
🚁 48. Light Combat Helicopter - 877.1трлн ₽
🚁 49. Boeing AH-64 «Apache» - 992.4трлн ₽
🚁 50. Sikorsky UH-60 «Black Hawk» - 1квадр ₽

🛍 Купить: Вертолет [номер]
📌 Например: Вертолет 1`);

	const sell = helicopters.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.transport.helicopter) return bot(`у вас уже есть вертолёт (${homes[message.user.transport.helicopter - 1].name}), введите "Продать вертолёт"`);

	if(message.user.rub < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.rub >= sell.cost)
	{
		message.user.rub -= sell.cost;
		message.user.transport.helicopter = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`дома:
${message.user.realty.home === 1 ? '🔹' : '🔸'} 1. Коробка из-под холодильника (250₽)
${message.user.realty.home === 2 ? '🔹' : '🔸'} 2. Подвал (3.000₽)
${message.user.realty.home === 3 ? '🔹' : '🔸'} 3. Палатка (3.500₽)
${message.user.realty.home === 4 ? '🔹' : '🔸'} 4. Домик на дереве (5.000₽)
${message.user.realty.home === 5 ? '🔹' : '🔸'} 5. Полуразрушенный дом (10.000₽)
${message.user.realty.home === 6 ? '🔹' : '🔸'} 6. Дом в лесу (25.000₽)
${message.user.realty.home === 7 ? '🔹' : '🔸'} 7. Деревянный дом (37.500₽)
${message.user.realty.home === 8 ? '🔹' : '🔸'} 8. Дача (125.000₽)
${message.user.realty.home === 9 ? '🔹' : '🔸'} 9. Кирпичный дом (80.000₽)
${message.user.realty.home === 10 ? '🔹' : '🔸'} 10. Коттедж (450.000₽)
${message.user.realty.home === 11 ? '🔹' : '🔸'} 11. Особняк (1.250.000₽)
${message.user.realty.home === 12 ? '🔹' : '🔸'} 12. Дом на Рублёвке (5.000.000₽)
${message.user.realty.home === 13 ? '🔹' : '🔸'} 13. Личный небоскрёб (7.000.000₽)
${message.user.realty.home === 14 ? '🔹' : '🔸'} 14. Остров с особняком (12.500.000₽)
${message.user.realty.home === 15 ? '🔹' : '🔸'} 15. Белый дом (20.000.000₽)

Для покупки введите "Дом [номер]"`);

	const sell = homes.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.home) return bot(`у вас уже есть дом (${homes[message.user.realty.home - 1].name}), введите "Продать дом"`);

	if(message.user.rub < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.rub >= sell.cost)
	{
		message.user.rub -= sell.cost;
		message.user.realty.home = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.hear(/^(?:квартира|квартиры)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`квартиры:
${message.user.realty.apartment === 1 ? '🔹' : '🔸'} 1. Чердак (15.000₽)
${message.user.realty.apartment === 2 ? '🔹' : '🔸'} 2. Квартира в общежитии (55.000₽)
${message.user.realty.apartment === 3 ? '🔹' : '🔸'} 3. Однокомнатная квартира (175.000₽)
${message.user.realty.apartment === 4 ? '🔹' : '🔸'} 4. Двухкомнатная квартира (260.000₽)
${message.user.realty.apartment === 5 ? '🔹' : '🔸'} 5. Четырехкомнатная квартира (500.000₽)
${message.user.realty.apartment === 6 ? '🔹' : '🔸'} 6. Квартира в центре Москвы (1.600.000₽)
${message.user.realty.apartment === 7 ? '🔹' : '🔸'} 7. Двухуровневая квартира (4.000.000₽)
${message.user.realty.apartment === 8 ? '🔹' : '🔸'} 8. Квартира с Евроремонтом (6.000.000₽)

Для покупки введите "Квартира [номер]"`);

	const sell = apartments.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.realty.apartment) return bot(`у вас уже есть квартира (${apartments[message.user.realty.apartment - 1].name}), введите "Продать квартиру"`);

	if(message.user.rub < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.rub >= sell.cost)
	{
		message.user.rub -= sell.cost;
		message.user.realty.apartment = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}$`);
	}
});

cmd.hear(/^(?:телефон|телефоны)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`телефоны:
${message.user.misc.phone === 1 ? '🔹' : '🔸'} 1. Nokia 108 (250₽)
${message.user.misc.phone === 2 ? '🔹' : '🔸'} 2. Nokia 3310 (2017) (500₽)
${message.user.misc.phone === 3 ? '🔹' : '🔸'} 3. ASUS ZenFone 4 (2.000₽)
${message.user.misc.phone === 4 ? '🔹' : '🔸'} 4. BQ Aquaris X (10.000₽)
${message.user.misc.phone === 5 ? '🔹' : '🔸'} 5. Sony Xperia XA (15.000₽)
${message.user.misc.phone === 6 ? '🔹' : '🔸'} 6. Samsung Galaxy S8 (30.000₽)
${message.user.misc.phone === 7 ? '🔹' : '🔸'} 7. Xiaomi Mi Mix (50.000₽)
${message.user.misc.phone === 8 ? '🔹' : '🔸'} 8. Torex FS1 (75.000₽)
${message.user.misc.phone === 9 ? '🔹' : '🔸'} 9. iPhone X (100.000₽)
${message.user.misc.phone === 10 ? '🔹' : '🔸'} 10. Мегафон С1 (250.000₽)

Для покупки введите "Телефон [номер]"`);

	const sell = phones.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.misc.phone) return bot(`у вас уже есть телефон (${phones[message.user.misc.phone - 1].name}), введите "Продать телефон"`);

	if(message.user.rub < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.rub >= sell.cost)
	{
		message.user.rub -= sell.cost;
		message.user.misc.phone = sell.id;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.hear(/^(?:qinfo|киви)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
var Wallet = new Qiwi(message.user.tokenqiwi);
if(!Wallet) return bot(`у вас не привязан QIWI-токен к вашему аккаунту! ('settoken')`)
Wallet.getBalance((err, balance) => {
Wallet.getAccountInfo((err, info) => {
var nick = info.contractInfo.nickname.nickname
var number = info.contractInfo.contractId
var ball = balance.accounts[0].balance.amount
var pin = info.authInfo.mobilePinInfo.mobilePinUsed
var oper = info.userInfo.operator
var mail = info.authInfo.boundEmail
let znick = ""
if(nick !== null){znick += nick}
if(nick == null){znick += "отсутствует"}
let zoper = ""
if(oper == "Unknown"){zoper += "неизвестно"}
if(oper !== "Unknown"){zoper += oper}
let zmail = ""
if(mail == null){zmail += "отсутствует"}
if(mail !== null){zmail += mail}
if(message.isChat){
	vk.api.messages.send({chat_id: message.chatId, message: `
🔱 Информация о вашем аккаунте QIWI:

👤 Ник QIWI: «${znick}»
📞 Номер QIWI: +${number}.
💸 Баланс QIWI: ${ball}₽
☎ Оператор номера QIWI: «${zoper}»
🔐 Мобильный Пин-код: ${pin.toString().replace(/false/gi, "не используется").replace(/true/gi, "используется")}.
✉ Почта: «${zmail}»`})
	return message.sendPhoto('нахуй скачал м.png')
}
if(!message.isChat){
	vk.api.messages.send({peer_id: message.user.senderId, message: `
🔱 Информация о вашем аккаунте QIWI:

👤 Ник QIWI: «${znick}»
📞 Номер QIWI: +${number}.
💸 Баланс QIWI: ${ball}₽
☎ Оператор номера QIWI: «${zoper}»
🔐 Мобильный Пин-код: ${pin.toString().replace(/false/gi, "не используется").replace(/true/gi, "используется")}.
✉ Почта: «${zmail}»`})
	return message.sendPhoto('нахуй скачал м.png')
}
return
});
});
});

cmd.hear(/^(?:qbal|киви баланс|кбаланс)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
var Wallet = new Qiwi(message.user.tokenqiwi);
if(!Wallet) return bot(`у вас не привязан QIWI-токен к вашему аккаунту! ('settoken')`)
Wallet.getBalance((err, balance) => {
var ball = balance.accounts[0].balance.amount;
return bot(`баланс вашего QIWI кошелька составляет: ${utils.sp(ball)}₽`);
});
});

cmd.hear(/^(?:qpay|кперевод|киви перевод)\s([0-9]+)\s(.*)\s?([^]+)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
let number = Number(message.args[1])
let count = Number(message.args[2])
let comm = message.args[3];
var Wallet = new Qiwi(message.user.tokenqiwi);
if(!Wallet) return bot(`у вас не привязан QIWI-токен к вашему аккаунту! ('settoken')`)
// Условия:
if(!number) return bot(`вы не указали номер QIWI`);
if(number.length > 12) return bot(`номер QIWI должен состоять из 11 (12) цифр!`);
if(!count) return bot(`вы не указали сумму перевода.`);
if(!comm) return bot(`вы не указали комментарий к переводу.`);

Wallet.getBalance((err, balance) => {
var ball = balance.accounts[0].balance.amount;
Wallet.toWallet({ amount: count, comment: `
🔔 Поступил перевод от компании Bot Elliot!
Добавленный комментарий: <<${comm}>>
`, account: '+'+number}, (err, data) => {

if(ball < count) {
message.send(`
⛔ [QIWI Wallet RUS]: Произошла критическая ошибка системы.
💰 На вашем балансе недостаточно средств.
- На вашем балансе: ${utils.sp(ball)}₽.
Вы пытаетесть совершить перевод на сумму: ${utils.sp(count)}₽.
Пополните баланс и повторите попытку.
`);
return
};

return message.send(`
[QIWI Wallet RUS] Зачисление на QIWI счёт: +${number} проведено успешно.
💰 Сумма зачисления: ${count}₽
✉ Комментарий к зачислению: ${comm}.
`);

});
});
});

cmd.hear(/^(?:питомец лечить|💉 лечить)$/i, async (message, bot) => {
if(message.user.misc.pet < 1) return bot(`у Вас нет питомца! ${smileerror}`);
if(message.user.pet.hp === 100) return bot(`ваш питомец здоров! ${smilesuccess}`)
let a = 20000000000
if(a > message.user.rub) return bot(`недостаточно средств для лечения питомца! ${smileerror}`)
message.user.rub -= a
message.user.pet.hp += 20
if(message.user.pet.hp > 100) message.user.pet.hp = 100
return bot(`вы успешно вылечили своего питомца! Здоровье увеличилось на 20 % ${smilesuccess}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `💉 Лечить`
},
"color": "positive"
}
]
]
})
});
});

cmd.hear(/^(?:питомец)$/i, async (message, bot) => {
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца! ${smileerror}`);
	const sell = pets.find(x=> x.id === message.user.misc.pet)
	var priceupd = message.user.pet.lvl * sell.cost
	let z = ``
	if(message.user.misc.pet === 1)z=`photo-188608231_457239072`
	if(message.user.misc.pet === 2)z=`photo-188608231_457239073`
	if(message.user.misc.pet === 3)z=`photo-188608231_457239078`
	if(message.user.misc.pet === 4)z=`photo-188608231_457239077`
	if(message.user.misc.pet === 5)z=`photo-188608231_457239074`
	if(message.user.misc.pet === 6)z=`photo-188608231_457239076`
	if(message.user.misc.pet === 7)z=`photo-188608231_457239075`
	if(message.user.misc.pet === 8)z=`photo-188608231_457239071`
	if(message.user.misc.pet === 9)z=`photo-188608231_457239079`
	if(message.user.misc.pet === 10)z=`photo-188608231_457239080`
	if(message.user.misc.pet === 11)z=`photo-188608231_457239081`
	if(message.user.misc.pet === 12)z=`photo-188608231_457239082`
	if(message.user.misc.pet === 13)z=`photo-188608231_457239084`
	if(message.user.misc.pet === 14)z=`photo-188608231_457239085`
	if(message.user.misc.pet === 15)z=`photo-188608231_457239086`
	if(message.user.misc.pet === 16)z=`photo-188608231_457239087`
	if(message.user.misc.pet === 17)z=`photo-188608231_457239088`
	if(message.user.misc.pet === 18)z=`photo-188608231_457239089`
	if(message.user.misc.pet === 19)z=`photo-188608231_457239090`
	if(message.user.misc.pet === 20)z=`photo-188608231_457239091`
	if(message.user.misc.pet === 21)z=`photo-188608231_457239092`
	if(message.user.misc.pet === 22)z=`photo-188608231_457239093`
	if(message.user.misc.pet === 23)z=`photo-188608231_457239094`
	if(message.user.misc.pet === 24)z=`photo-188608231_457239095`
	if(message.user.misc.pet === 25)z=`photo-188608231_457239096`
	if(message.user.misc.pet === 26)z=`photo-188608231_457239097`
	if(message.user.misc.pet === 27)z=`photo-180330998_457239371`
if(message.isChat) vk.api.messages.send({chat_id: message.chatId, message: `${namee(message.user.uid)} информация о вашем питомце:
${pets[message.user.misc.pet - 1].smile} Питомец: «${message.user.pet.name !== false ? message.user.pet.name : pets[message.user.misc.pet - 1].name}», ${utils.sp(message.user.pet.lvl)} ур.
🐾 Возраст: ${unixStampLeft(getUnix() - message.user.pet.timebuy)}

💳 Стоимость улучшения: ${utils.sp(priceupd)}₽

🥰 Радость: ${message.user.pet.play} %
&#127831; Сытость: ${message.user.pet.eda} %
❤ Здоровье: ${message.user.pet.hp} %

🔍 Команды: питомец помощь
`,

keyboard:JSON.stringify( 
{ 
"inline": true, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\":\"1\"}", 
"label": `⏫ Улучшить` 
}, 
"color": "positive" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\":\"1\"}", 
"label": `👣 Прогулка` 
}, 
"color": "primary" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\":\"3\"}", 
"label": `🔥 Команды питомца` 
}, 
"color": "secondary" 
}]
] 
}), attachment: z
})
if(!message.isChat) vk.api.messages.send({peer_id: message.senderId, message: `${namee(message.user.uid)} информация о вашем питомце:
${pets[message.user.misc.pet - 1].smile} Питомец: «${message.user.pet.name !== false ? message.user.pet.name : pets[message.user.misc.pet - 1].name}», ${utils.sp(message.user.pet.lvl)} ур.
🐾 Возраст: ${unixStampLeft(getUnix() - message.user.pet.timebuy)}

💳 Стоимость улучшения: ${utils.sp(priceupd)}₽

🥰 Радость: ${message.user.pet.play} %
&#127831; Сытость: ${message.user.pet.eda} %
❤ Здоровье: ${message.user.pet.hp} %

🔍 Команды: питомец помощь
`,
keyboard:JSON.stringify( 
{ 
"inline": true, 
"buttons": [ 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\":\"1\"}", 
"label": `⏫ Улучшить` 
}, 
"color": "positive" 
}, 
{ 
"action": { 
"type": "text", 
"payload": "{\"button\":\"1\"}", 
"label": `👣 Прогулка` 
}, 
"color": "primary" 
}], 
[{ 
"action": { 
"type": "text", 
"payload": "{\"button\":\"3\"}", 
"label": `🔥 Команды питомца` 
}, 
"color": "secondary" 
}]
] 
}), attachment: z
})
if(message.user.pet.hp < 30) bot(`у вашего питомца низкий уровень здоровья! \n💊 Вылечите его командой <<питомец лечить>>! ${smileerror}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `💉 Лечить`
},
"color": "positive"
}
]
]
})
});
smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`, `😩`, `😨`, `😰`, `😐`, `😟`, `😣`, `😖`, `😓`, `😪`, `🤕`, `😿`, `😾`, `☹`, `🙁`]);
if(message.user.pet.eda < 20) bot(`ваш питомец хочет кушать! \n🍖 Покормите его командой <<питомец кормить>>! ${smileerror}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `🍗 Кормить`
},
"color": "positive"
}
]
]
})
});
	smileerror = utils.pick([`😒`, `😯`, `😔`, `🤔`, `😩`, `😨`, `😰`, `😐`, `😟`, `😣`, `😖`, `😓`, `😪`, `🤕`, `😿`, `😾`, `☹`, `🙁`]);
if(message.user.pet.play < 20) bot(`ваш питомец очень хочет поиграть! \n⚾ Поиграйте с ним командой <<питомец поиграть>>! ${smileerror}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `🍭 Поиграть`
},
"color": "positive"
}
]
]
})
});
	return
});
// 🔥 Команды питомца
cmd.hear(/^(?:🔥 Команды питомца)$/i, async (message, bot) => {
return bot(`помощь по питомцам:

🏷 Сменить имя: питомец кличка [новое имя]
⏫ Улучшить: питомец улучшить
👣 Заработать: питомец прогулка

🧸⠀Не забывайте следить за показателями питомца, чтобы он мог приносить доход!

❤ Так-же следите за показателем сытости, ведь если уровень сытости достигнет нуля то у вашего питомца начнут отниматься жизни! А если и жизни достигнут нуля, то ваш питомец вовсе умрёт.

🍗 Покормить: питомец кормить
🎾 Поиграть: питомец поиграть`)
})	

cmd.hear(/^(?:питомцы|питомец)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`Питомцы
🐌 1. Улитка - 1.000 ₽ ${message.user.misc.pet === 1 ? '⬅' : ''}
🐛 2. Гусеница - 4.000 ₽ ${message.user.misc.pet === 2 ? '⬅' : ''}
🐢 3. Черепаха - 19.000 ₽ ${message.user.misc.pet === 3 ? '⬅' : ''}
🐹 4. Хомяк - 49.000 ₽ ${message.user.misc.pet === 4 ? '⬅' : ''}
🦇 5. Летучая мышь - 105.000 ₽ ${message.user.misc.pet === 5 ? '⬅' : ''}
🐠 6. Золотая рыбка - 235.000 ₽ ${message.user.misc.pet === 6 ? '⬅' : ''}
🐭 7. Шиншилла - 600.000 ₽ ${message.user.misc.pet === 7 ? '⬅' : ''}
🐥 8. Цыплёнок - 1.367.000 ₽ ${message.user.misc.pet === 8 ? '⬅' : ''}
🐧 9. Пингвин - 3.467.000 ₽ ${message.user.misc.pet === 9 ? '⬅' : ''}
🦆 10. Утка - 8.425.000 ₽ ${message.user.misc.pet === 10 ? '⬅' : ''}
🐦 11. Попугай - 18.800.000 ₽ ${message.user.misc.pet === 11 ? '⬅' : ''}
🦎 12. Хамелеон - 52.000.000 ₽ ${message.user.misc.pet === 12 ? '⬅' : ''}
🐰 13. Заяц - 187.220.000 ₽ ${message.user.misc.pet === 13 ? '⬅' : ''}
🐿 14. Белка - 423.440.000 ₽ ${message.user.misc.pet === 14 ? '⬅' : ''}
🐈 15. Кот - 934.000.000 ₽ ${message.user.misc.pet === 15 ? '⬅' : ''}
🐝 16. Пчела - 2.137.000.000 ₽ ${message.user.misc.pet === 16 ? '⬅' : ''}
🦉 17. Сова - 5.000.000.000 ₽ ${message.user.misc.pet === 17 ? '⬅' : ''}
🐕 18. Собака - 13.880.000.000 ₽ ${message.user.misc.pet === 18 ? '⬅' : ''}
🐙 19. Осьминог - 43.230.000.000 ₽ ${message.user.misc.pet === 19 ? '⬅' : ''}
🐼 20. Панда - 94.000.000.000 ₽ ${message.user.misc.pet === 20 ? '⬅' : ''}
🐨 21. Коала - 204.000.000.000 ₽ ${message.user.misc.pet === 21 ? '⬅' : ''}
🦅 22. Ястреб - 630.000.000.000 ₽ ${message.user.misc.pet === 22 ? '⬅' : ''}
🐯 23. Тигр - 2.220.000.000.000 ₽ ${message.user.misc.pet === 23 ? '⬅' : ''}
😁 24. Чебурашка - 3.000.000.000.000 ₽ ${message.user.misc.pet === 24 ? '⬅' : ''}
🐘 25. Слон - 5.000.000.000.000 ₽ ${message.user.misc.pet === 25 ? '⬅' : ''}
🦖 26. Динозавр - 10.000.000.000.000 ₽ ${message.user.misc.pet === 26 ? '⬅' : ''}
🧬 27. Корона Вирус - 20.000.000.000.000 ₽ ${message.user.misc.pet === 27 ? '⬅' : ''}

🛍 Купить: питомец [номер]

🖼 Информация о Вашем питомце: питомец`);
	if(message.user.misc.pet) return bot(`у вас уже есть питомец! ${smileerror}`)

	const sell = pets.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;

	if(message.user.rub < sell.cost) return bot(`вам нужно ${utils.sp(sell.cost)}₽ для покупки. ${smileerror}`);
	else if(message.user.rub >= sell.cost)
	{
	message.user.rub -= sell.cost;
	message.user.misc.pet = sell.id;
	if(message.user.misc.pet === 1)z=`photo-188608231_457239072`
	if(message.user.misc.pet === 2)z=`photo-188608231_457239073`
	if(message.user.misc.pet === 3)z=`photo-188608231_457239078`
	if(message.user.misc.pet === 4)z=`photo-188608231_457239077`
	if(message.user.misc.pet === 5)z=`photo-188608231_457239074`
	if(message.user.misc.pet === 6)z=`photo-188608231_457239076`
	if(message.user.misc.pet === 7)z=`photo-188608231_457239075`
	if(message.user.misc.pet === 8)z=`photo-188608231_457239071`
	if(message.user.misc.pet === 9)z=`photo-188608231_457239079`
	if(message.user.misc.pet === 10)z=`photo-188608231_457239080`
	if(message.user.misc.pet === 11)z=`photo-188608231_457239081`
	if(message.user.misc.pet === 12)z=`photo-188608231_457239082`
	if(message.user.misc.pet === 13)z=`photo-188608231_457239084`
	if(message.user.misc.pet === 14)z=`photo-188608231_457239085`
	if(message.user.misc.pet === 15)z=`photo-188608231_457239086`
	if(message.user.misc.pet === 16)z=`photo-188608231_457239087`
	if(message.user.misc.pet === 17)z=`photo-188608231_457239088`
	if(message.user.misc.pet === 18)z=`photo-188608231_457239089`
	if(message.user.misc.pet === 19)z=`photo-188608231_457239090`
	if(message.user.misc.pet === 20)z=`photo-188608231_457239091`
	if(message.user.misc.pet === 21)z=`photo-188608231_457239092`
	if(message.user.misc.pet === 22)z=`photo-188608231_457239093`
	if(message.user.misc.pet === 23)z=`photo-188608231_457239094`
	if(message.user.misc.pet === 24)z=`photo-188608231_457239095`
	if(message.user.misc.pet === 25)z=`photo-188608231_457239096`
	if(message.user.misc.pet === 26)z=`photo-188608231_457239097`
	if(message.user.misc.pet === 27)z=`photo-180330998_457239371`
		message.user.pet.lvl += 1;
		message.user.pet.timebuy = getUnix()
		message.user.pet.eda = 100
		if(message.user.pet.hp === 0) message.user.pet.hp = 100
		message.user.pet.play = 100

		if(message.isChat) return vk.api.messages.send({chat_id: message.chatId, message: `${namee(message.user.uid)} вы успешно купили себе питомца <<${sell.name}>>, отправляйте его на прогулку и прокачивайте его уровень. ${smilesuccess}`, attachment: z })
		if(!message.isChat) return vk.api.messages.send({peer_id: message.senderId, message: `${namee(message.user.uid)} вы успешно купили себе питомца <<${sell.name}>>, отправляйте его на прогулку и прокачивайте его уровень. ${smilesuccess}`, attachment: z })
}
});


cmd.hear(/^(?:питомец кличка)\s([^]+)$/i, async (message, bot) => {
if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
if(message.args[1].length > 20){bot(`кличка вашего питомца не должна превышать 20 символов! ${smileerror}`); return message.sendSticker(14268)}
if(message.args[1] === `нет`){ message.user.pet.name = false; return bot(`вы дали своему питомцу стандартную кличку! ${smilesuccess	}`) }
message.user.pet.name = message.args[1]
return bot(`вы дали своему питомцу кличку <<${message.args[1]}>>`)
});

cmd.hear(/^(?:питомец поиграть|🍭 поиграть)$/i, async (message, bot) => {
if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
if(message.user.pet.play < 0) message.user.pet.play = 0
if(message.user.pet.play === 100) return bot(`ваш питомец не хочет играть! ${smileerror}`)
let a = 2000000000
if(message.user.rub < a) return bot(`недостаточно средств чтобы поиграть с питомцем! ${smileerror}`)
message.user.rub -= a
message.user.pet.play += 20
if(message.user.pet.play > 100) message.user.pet.play = 100
bot(`вы успешно поигрались со своим питомцем! Счастье увеличено на 20 % ${smilesuccess}`,
	{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `🍭 Поиграть`
},
"color": "positive"
}
]
]
})
});
return message.sendSticker(utils.pick([8615, 20, 13917, 13609, 6334, 6337]))
})

cmd.hear(/^(?:питомец кормить|🍗 кормить)$/i, async (message, bot) => {
if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
if(message.user.pet.eda === 100){bot(`ваш питомец обожрался! ${smileerror}`); return message.sendSticker(14315)}
//if(message.user.rub < 1000000) return bot(`недостаточно средств для того чтобы покормить питомца! ${smileerror}`)
let a = 2000000000
if(message.user.rub < a) return bot(`недостаточно средств чтобы покормить питомца! ${smileerror}`)
message.user.rub -= a
message.user.pet.eda += 20
if(message.user.pet.eda > 100) message.user.pet.eda = 100
bot(`вы успешно покормили своего питомца! Сытость увеличена на 20 % ${smilesuccess}`,
	{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `🍗 Кормить`
},
"color": "positive"
}
]
]
})
});
return message.sendSticker(utils.pick([16077, 10017, 13207, 3573]))
})

/* улитка photo-188608231_457239072
photo-188608231_457239073 гусеница
photo-188608231_457239074 мышь летучая
photo-188608231_457239075 щиншилла
photo-188608231_457239076 золотая рыбка
photo-188608231_457239077 хомяк
photo-188608231_457239078 черепаха
photo-188608231_457239079 пингвин
photo-188608231_457239071 цыплёнокк
photo-188608231_457239080 утка */
cmd.hear(/^(?:питомец улучшить|⏫ Улучшить)\s?(.*)$/i, async (message, bot) => {
	if(!message.args[1]) message.args[1] = 1
	message.args[1] = Number(message.args[1])
	if(!message.args[1]) return
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
	else {
		const sell = pets.find(x=> x.id === message.user.misc.pet)
		var priceupd = (message.user.pet.lvl+message.args[1]) * sell.cost
		if(message.user.rub < priceupd) return bot(`недостаточно денег. ${smileerror}`);
		var lvlpoupd = message.user.pet.lvl+message.args[1];

		message.user.rub -= priceupd;
		message.user.pet.lvl += message.args[1];

		return bot(`питомец был прокачен до ${lvlpoupd} уровня (+${message.args[1]} ${utils.decl(message.args[1], ['уровень', 'уровня', 'уровней'])}) за ${utils.sp(priceupd)}₽
💰 Ваш баланс: ${utils.sp(message.user.rub)}₽`);


}

});

cmd.hear(/^(?:питомец прогулка|прогулка|👣 Прогулка)$/i, async (message, bot) => {
	if(message.user.misc.pet < 1) return bot(`у Вас нет питомца. ${smileerror}`);
	else {

		if(message.user.timers.poxod_t > getUnix()) return bot(`вы сможете отправить питомца на прогулку через ${unixStampLeft(message.user.timers.poxod_t - getUnix())}! Ваш питомец довольно сильно устал! ${smileerror}`);
		const sell = pets.find(x=> x.id === message.user.misc.pet)
		let cashfind = utils.random(sell.min, sell.max);
		if(!message.user.premium){
		if(utils.pick([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]) === 1){
			message.user.misc.pet = 0
			await bot(`во время похода ваш питомец потерялся! ${smileerror}`)
			return message.sendSticker(13550)
		}
	}
		message.user.rub += cashfind;
		message.user.timers.poxod_t = getUnix() + (60*60000)
		message.user.pet.eda -= utils.random(7, 15)
		message.user.pet.play -= utils.random(5, 9)

		return bot(`ваш питомец нашёл на прогулке ${utils.sp(cashfind)}₽. Улучшайте своего питомца! ${smilesuccess}`);
}

});

cmd.hear(/^(?:фермы)$/i, async (message, bot) => {
return bot(`майнинг фермы:
🔋 1. Nvidia GeForce GTX 1050 Ti 2฿/час (10.000.000₽) ${message.user.misc.farm === 1 ? '⬅' : ''}
🔋 2. GeForce GTX1060 Palit 7฿/час (100.000.000₽) ${message.user.misc.farm === 2 ? '⬅' : ''}
🔋 3. Radeon RX 470 Sapphire 10฿/час (500.000.000₽) ${message.user.misc.farm === 3 ? '⬅' : ''}
🔋 4. Radeon RX Vega 64 15฿/час (900.000.000₽) ${message.user.misc.farm === 4 ? '⬅' : ''}
🔋 5. AMD Radeon RX 580 8gb 30฿/час (2.000.000.000₽) ${message.user.misc.farm === 5 ? '⬅' : ''}
🔋 6. GeForce GTX1070 70฿/час (6.000.000.000₽) ${message.user.misc.farm === 6 ? '⬅' : ''}
🔋 7. Radeon R9 Fury X 100฿/час (12.000.000.000₽) ${message.user.misc.farm === 7 ? '⬅' : ''}
🔋 8. Radeon RX 480 Power 500฿/час (30.000.000.000₽) ${message.user.misc.farm === 8 ? '⬅' : ''}
🔋 9. MSI Geforce GTX 1080 Ti 11Gb 1000฿/час (80.000.000.000₽) ${message.user.misc.farm === 9 ? '⬅' : ''}

🛒 Для покупки введите "Фермы [номер] [кол-во]"`)
});

cmd.hear(/^(?:фермы)\s([0-9]+)\s([0-9]+)$/i, async (message, bot) => {
/*	if(!message.args[1]) return bot(`Майнинг фермы:
${message.user.misc.farm === 1 ? '🔹' : '🔸'} 1. 6U Nvidia 2฿/час (20.500.000₽)
${message.user.misc.farm === 2 ? '🔹' : '🔸'} 2. AntminerS9 5฿/час (100.000.000₽)
${message.user.misc.farm === 3 ? '🔹' : '🔸'} 3. FM2018-BT200 7฿/час (900.000.000₽)
Для покупки введите "Фермы [номер] [кол-во]"`); */
	const sell = farms.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;

	if(Number(message.args[1]) !== message.user.misc.farm) { if(message.user.misc.farm !== 0) return bot(`у вас уже есть фермы другого типа! Продайте текущие и сможете купить новые! ${smileerror}`) }
		if(message.user.rub < sell.cost * message.args[2]) return bot(`недостаточно денег ${smileerror}`);
	else if(message.user.rub >= sell.cost)
	{

		if(Number(message.args[2])){

		message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
		message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
		message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
		message.args[2] = Number(message.args[2])
			if(message.user.settings.adm === 0){ if((message.args[2] + message.user.farms) > message.user.farmslimit) message.args[2] = message.user.farmslimit - message.user.farms }
			if(message.user.settings.adm === 0){ if(message.user.farms === message.user.farmslimit) return bot(`вы достигли лимита! ${smileerror}`) }
			message.user.rub -= sell.cost * message.args[2];
			message.user.misc.farm = sell.id;
			message.user.farms += message.args[2];

			saveUsers();
			return bot(`вы купили ${sell.name} (x${message.args[2]}) за ${utils.sp(sell.cost * message.args[2])}₽
💰 Ваш баланс: ${utils.sp(message.user.rub)}₽`);

		}
		else{

		message.user.rub -= sell.cost;
		message.user.misc.farm = sell.id;
		message.user.farms += 1;

		saveUsers();
		return bot(`вы купили ${sell.name} (x1) за ${utils.sp(sell.cost)}₽
💰 Ваш баланс: ${utils.sp(message.user.rub)}₽`);
		}
	}
});

cmd.hear(/^(?:реши)\s([^]+)(\+|\-|\/|\*|\:)([^]+)?/i, async (message, bot) => {
	if(message.args[2].toLowerCase() == ":") return message.send(`Используйте <<реши ${message.args[1]} / ${message.args[3]}>>.`)
	message.args[1] = message.args[1].replace(/,/gi, `.`)
	let result = eval(`${message.args[1]}${message.args[2]}${message.args[3]}`);
	let z = utils.pick(["Не скажу.", "Не помню.", "Секрет.", "Секретная информация.", "К сожалению ФБР мне не разрешает отвечать на этот вопрос.", "Информация засекречена ЦРУ."])
	if(result == null){message.send("Ой, возникла ошибка при решении этого примера, попробуйте сопоставить пример как-нибудь по другому :)")
    return message.send({sticker_id: 13647})
	}
	if(result == undefined){message.send("Ой, возникла ошибка при решении этого примера, попробуйте сопоставить пример как-нибудь по другому :)")
    return message.send({sticker_id: 13647})
	}
	if(result == NaN){message.send("Ой, возникла ошибка при решении этого примера, попробуйте сопоставить пример как-нибудь по другому :)")
    return message.send({sticker_id: 13647})
	}
	//if(result < 0){return message.send(`⚙ >> Ответ: -${utils.sp(result)}`)}
	if(result === Infinity) return message.send(`⚙ >> Ответ: бесконечность.`)
	if(message.args[1] == "0"){if(message.args[2] == "/"){if(message.args[3] == "0"){ return message.send(z)}}}
    return message.send(`⚙ >> Ответ: ${result}`);
	});


cmd.hear(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	if(message.user.settings.adm !== 0){
		bot(`администрации запрещено покупать рейтинг!`)
		return message.sendSticker(6875)
	}
	if(!Number(message.args[1])) return;
	message.args[1] = Math.floor(Number(message.args[1]));

	if(message.args[1] <= 0) return;

	if(( message.args[1] * 250000000 ) > message.user.rub) return bot(`у вас недостаточно денег`);
	else if(( message.args[1] * 250000000 ) <= message.user.rub)
	{
		message.user.rub -= ( message.args[1] * 250000000 );
		message.user.rating += message.args[1];

		return bot(`вы повысили свой рейтинг на ${utils.sp(message.args[1])}👑 за ${utils.sp(message.args[1] * 250000000)}₽`);
	}
});

cmd.hear(/^(?:бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`бизнесы:
${message.user.business === 1 ? '🔸' : '🔹'} 1. Шаурмичная - 50.000₽
⠀ ⠀ ⠀ Прибыль: 400₽/час
${message.user.business === 2 ? '🔸' : '🔹'} 2. Ларёк - 100.000₽
⠀ ⠀ ⠀ Прибыль: 700₽/час
${message.user.business === 3 ? '🔸' : '🔹'} 3. Ресторан - 300.000₽
⠀ ⠀ ⠀ Прибыль: 2.500₽/час
${message.user.business === 4 ? '🔸' : '🔹'} 4. Магазин - 500.000₽
⠀ ⠀ ⠀ Прибыль: 3.800₽/час
${message.user.business === 5 ? '🔸' : '🔹'} 5. Завод - 1.500.000₽
⠀ ⠀ ⠀ Прибыль: 8.000₽/час
${message.user.business === 6 ? '🔸' : '🔹'} 6. Шахта - 25.000.000₽
⠀ ⠀ ⠀ Прибыль: 70.000₽/час
${message.user.business === 7 ? '🔸' : '🔹'} 7. Офис - 80.000.000₽
⠀ ⠀ ⠀ Прибыль: 220.000₽/час
${message.user.business === 8 ? '🔸' : '🔹'} 8. Разработка игр - 150.000.000₽
⠀ ⠀ ⠀ Прибыль: 300.000₽/час
${message.user.business === 9 ? '🔸' : '🔹'} 9. Нефтевышка - 500.000.000₽
⠀ ⠀ ⠀ Прибыль: 700.000₽/час
${message.user.business === 10 ? '🔸' : '🔹'} 10. Атомная электростанция - 800.000.000₽
⠀ ⠀ ⠀ Прибыль: 1.000.000₽/час
${message.user.business === 11 ? '🔸' : '🔹'} 11. Космическое агентство - 50.000.000.000₽
⠀ ⠀ ⠀ Прибыль: 50.000.000₽/час
Для покупки введите "Бизнесы [номер]"`);

	const sell = businesses.find(x=> x.id === Number(message.args[1]));
	if(!sell) return;
	if(message.user.business) return bot(`у вас уже есть бизнес (${businesses[message.user.business - 1].name}), введите "Продать бизнес"`);

	if(message.user.rub < sell.cost) return bot(`недостаточно денег`);
	else if(message.user.rub >= message.args[1])
	{
		message.user.rub -= sell.cost;
		message.user.business = sell.id;
		message.user.bizlvl = 1;

		return bot(`вы купили "${sell.name}" за ${utils.sp(sell.cost)}₽`);
	}
});

cmd.hear(/^(?:курс)$/i, async (message, bot) => {
	return bot(`курс валют на данный момент:
💸 Биткоин: ${utils.sp(btc)}₽`);
});

cmd.hear(/^(?:Биткоин)$/i, async (message, bot) => {return bot(`у вас: ${utils.sp(message.user.btc)} Биткоинов. ${smilesuccess}`)})

cmd.hear(/^(?:Биткоин)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = Number(message.args[1])
	if(!Number(message.args[1])) return;

	if(message.args[1] <= 0) return;

	if( ( message.args[1] * btc ) > message.user.rub) return bot(`недостаточно рублей!
Курс Биткоина: ${btc}₽`);
	else if( ( message.args[1] * btc ) <= message.user.rub)
	{
		message.user.rub -= ( message.args[1] * (btc));
		message.user.btc += message.args[1];

		return bot(`вы купили ${utils.sp(message.args[1])}฿ за ${utils.sp(message.args[1] * (btc))}₽`);
	}
});

cmd.hear(/^(?:топ ЫЫЫ)$/i, async (message, bot) => {
	if(message.senderId !== raz) return
	let top = [];

	users.map(x=> {
		top.push({ uid: x.uid, balance: x.rub, rating: x.rating, tag: x.tag, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.rating - a.rating;
	});

	let text = ``;
	const find = () => {
		let pos = 1000;

		for (let i = 0; i < top.length; i++)
		{
			if(top[i].id === message.senderId) return pos = i;
		}

		return pos;
	}

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) (${user.uid}) — ${user.rating} 👑
		`;
	}

	return bot(`топ игроков:
${text}
${message.user.settings.adm !== 0 ? `` : `—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — ${message.user.rating} 👑`}`);
});

cmd.hear(/^(?:топ рейтинг)$/i, async (message, bot) => {
	let top = [];

	users.map(x=> {
		top.push({ balance: x.rub, rating: x.rating, tag: x.tag, id: x.id, mention: x.mention });
	});

	top.sort((a, b) => {
		return b.rating - a.rating;
	});

	let text = ``;
	const find = () => {
		let pos = 1000;

		for (let i = 0; i < top.length; i++)
		{
			if(top[i].id === message.senderId) return pos = i;
		}

		return pos;
	}

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag})
${utils.sp(user.rating)} 👑
		`;
	}

	return bot(`топ игроков:
${text}
${message.user.settings.adm !== 0 ? `` : `—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — ${utils.sp(message.user.rating)} 👑`}`);
});

cmd.hear(/^(?:топ баланс)$/i, async (message, bot) => {

	let top = [];

	users.map(x=> {
		if(x.settings.adm === 0){top.push({ balance: x.rub, rating: x.rating, tag: x.tag, id: x.id, mention: x.mention });}
	});
	top.sort((a, b) => {
		return b.balance - a.balance;
	});

	let text = ``;
	const find = () => {
		let pos = 1000;

		for (let i = 0; i < top.length; i++)
		{
			if(top[i].id === message.senderId) return pos = i;
		}

		return pos;
	}

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag})
${utils.sp(user.balance)}₽
		`;
	}
	return bot(`топ игроков по деньгам:
		${text}
${message.user.settings.adm !== 0 ? `` : `—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — ${utils.sp(message.user.rub)}₽`}`);
});

cmd.hear(/^(?:топ Биткоин)$/i, async (message, bot) => {

	let top = [];

	users.map(x=> {
		if(x.settings.adm === 0){top.push({ btc: x.btc, balance: x.rub, rating: x.rating, tag: x.tag, id: x.id, mention: x.mention });}
	});
	top.sort((a, b) => {
		return b.btc - a.btc;
	});

	let text = ``;
	const find = () => {
		let pos = 1000;

		for (let i = 0; i < top.length; i++)
		{
			if(top[i].id === message.senderId) return pos = i;
		}

		return pos;
	}

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return;
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) 
${utils.sp(user.btc)}฿
		`;
	}
	return bot(`топ игроков по Биткоинам:
		${text}
${message.user.settings.adm !== 0 ? `` : `—————————————————
${utils.gi(find() + 1)} ${message.user.tag} — ${utils.sp(message.user.btc)}฿`}`);
});


cmd.hear(/^(?:топ2)$/i, async (message, bot) => {
	if(message.user.settings.adm < 2) return
	let top = [];

	users.map(x=> {
		top.push({ balance: x.rub, rating: x.rating, tag: x.tag, id: x.id, mention: x.mention, uid: x.uid });
	});

	top.sort((a, b) => {
		return b.rating - a.rating;
	});

	let text = ``;
	const find = () => {
		let pos = 1000;

		for (let i = 0; i < top.length; i++)
		{
			if(top[i].id === message.senderId) return pos = i;
		}

		return pos;
	}

	for (let i = 0; i < 10; i++)
	{
		if(!top[i]) return
		const user = top[i];

		text += `${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} @id${user.id} (${user.tag}) — ID: ${user.uid} | ₽${utils.rn(user.balance)} (👑${utils.sp(user.rating)})
		`;
	}

	return bot(`топ игроков:
${text}`);
});

cmd.hear(/^(?:дайпреф|дайпрефикс)$/i, async (message, bot) => {
if(message.user.prefixgot == false) return
if(message.user.prefixt == message.user.prefix) return bot(`у вас уже есть такой префикс! ${smileerror}`)
message.user.prefix = message.user.prefixt
return bot(`готово! ${smilesuccess}`)
});

cmd.hear(/^(?:убратьпреф|убратьпрефикс|убрать преф|убрать префикс|снять преф|снятьпреф)$/i, async (message, bot) => {
if(message.user.prefixgot == false) return
message.user.prefix = false
return bot(`готово! ${smilesuccess}`)
});

cmd.hear(/^(?:бонус|🔑 Бонус)$/i, async (message, bot) => {
	if(message.user.timers.bonus_time > getUnix()) return bot(`вы сможете получить бонус через ${unixStampLeft(message.user.timers.bonus_time - Date.now())}! ${smileerror}`);

	let prize = utils.pick([1, 2, 3]);

	message.user.timers.bonus_time = getUnix() + 86400000
	let money = utils.random(10000000000, 1000000000000)
	let rate = utils.random(1, 20)
	let btc = utils.random(1000, 100000000)

	if(prize === 1)
	{
		message.user.rub += money;
		return bot(`вы выиграли ${utils.sp(money)}₽ ${smilesuccess}`);
	}

	if(prize === 2)
	{
		message.user.btc += btc;
		return bot(`вы выиграли ${utils.sp(btc)}฿ ${smilesuccess}`);
	}

	if(prize === 3)
	{
		message.user.rating += rate;
		return bot(`вы выиграли ${rate}👑`);
	}
});

cmd.hear(/^(?:поход)$/i, async (message, bot) => {

	if(message.user.timers.poxod2 > getUnix()) return bot(`вы сможете пойти в поход через ${unixStampLeft(message.user.timers.poxod2 - getUnix())} ${smileerror}`);

	let prize2 = utils.pick([1, 2, 3, 4, 5, 6, 7, 8]);

	message.user.timers.poxod2 = getUnix() + 7200000;


	if(prize2 === 1)
	{
		message.user.rub += 50000;
		return bot(`находясь в походе, вы нашли 50.000$ ${smilesuccess}`);
	}

	if(prize2 === 2)
	{
		message.user.btc += 1000;
		return bot(`находясь в походе, вы нашли 1.000₿ ${smilesuccess}`);
	}

	if(prize2 === 3)
	{
		message.user.rating += 5;
		return bot(`находясь в походе, вы нашли 5👑`);
	}

	if(prize2 === 4)
	{
		message.user.rating += 1;
		return bot(`находясь в походе, вы нашли 1👑`);
	}

	if(prize2 === 5)
	{
		message.user.rating += 10;
		return bot(`находясь в походе, вы нашли 10👑`);
	}

	if(prize2 === 6)
	{
		message.user.rating += 2;
		return bot(`находясь в походе, вы нашли 2👑`);
	}
	if(prize2 === 7)
	{
		message.user.rating += 3;
		return bot(`находясь в походе, вы нашли 3👑`);
	}
	if(prize2 === 8)
	{
		message.user.rating += 4;
		return bot(`находясь в походе, вы нашли 4👑`);
	}
});

cmd.hear(/^(?:брак)$/i, async (message, bot) => {
	if(message.user.marriage.partner === 0) return bot(`у тебя нет второй половинки! ${smileerror}

    Вступить в брак:
    ✏ брак [ID игрока]`)

	if(message.isChat){
	let brakuser = users.find(x=> x.uid === message.user.marriage.partner)
	vk.api.messages.send({ chat_id: message.chatId, message: `
	${namee(message.user.uid)} ваш партнёр: *id${brakuser.id}(${brakuser.tag})!\n🗓 Вы состоите в браке ${unixStampLeft(getUnix() - message.user.timebrak)}!\n\n💔 Чтобы развестись с партнером: развод\n🤰 Чтобы завести ребёнка: брак ребенок\n👶 Детей в семье: ${message.user.chill} шт.`, attachment: 'photo-188608231_457239053'
    })
  }
	if(!message.isChat){
	let brakuser = users.find(x=> x.uid === message.user.marriage.partner)
	vk.api.messages.send({ peer_id: message.senderId, message: `
	${namee(message.user.uid)} ваш партнёр: *id${brakuser.id}(${brakuser.tag})!\n🗓 Вы состоите в браке ${unixStampLeft(getUnix() - message.user.timebrak)}!\n\n💔 Чтобы развестись с партнером: развод\n🤰 Чтобы завести ребёнка: брак ребенок\n👶 Детей в семье: ${message.user.chill} шт.`, attachment: 'photo-188608231_457239053'
    })
  }

});

cmd.hear(/^(?:брак)\s([0-9]+)$/i, async (message, bot) => {
	if(!message.args[1]) return bot(`используйте <<брак [ID]>>!`)
	if(message.user.marriage.partner) return bot(`вы уже в браке с игроком ${users[message.user.marriage.partner].tag}`);
	if(Number(message.args[1]) === message.user.uid) return bot(`вы не можете жениться/выйти замуж за себя`);

	let user = users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);

	if(user.marriage.partner) return bot(`этот человек уже состоит в браке`);

	if(user.marriage.requests.find(x=> x == message.user.uid)) return bot(`вы уже делали предложение этому игроку`);

	if(message.user.marriage.requests.find(x=> x == message.args[1]))
	{
		message.user.marriage.requests = [];
		message.user.marriage.partner = user.uid;

		user.marriage.requests = [];
		user.marriage.partner = message.user.uid;

		message.user.timebrak = getUnix()
		user.timebrak = getUnix()

		return bot(`вы вступили в брак с игроком "${user.tag}"`);
	}

	user.marriage.requests.push(message.user.uid);
	return bot(`вы сделали предложение игроку "${user.tag}"`);
});

cmd.hear(/^(?:браки)$/i, async (message, bot) => {
	if(message.user.marriage.partner) return bot(`вы уже состоите в браке`);
	return bot(`предложения:
		${message.user.marriage.requests.map(x=> `от игрока "${users[x].tag}" (ID: ${x})`).join('\n')}`);
});

cmd.hear(/^(?:развод)$/i, async (message, bot) => {
	if(!message.user.marriage.partner) return bot(`вы не состоите в браке`);

	let user = users.find(x=> x.uid === message.user.marriage.partner);

	message.user.marriage.partner = 0;
	vk.api.messages.send({ peer_id: user.id, message: `${namee(user.uid)} ваш [id${message.user.id}|партнёр] подал развод. Ваш брак разорван ${smileerror}` })
	user.marriage.partner = 0;

	return bot(`вы теперь свободный человек`);
});

cmd.hear(/^(?:выговор)\s?(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
if(!message.forwards[0]) return
let user = users.find(x=> x.id === message.forwards[0].senderId)
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.settings.adm === 0) return bot(`это не админ! ${smileerror}`)
user.warn += 1
if(user.warn === 3){
	bot(`администратор получил 3 выговора и снят с поста!`)
	user.settings.adm = 0
	user.fakep = false
	user.faked = false
	user.rub = 0
	user.bank = 0
	user.btc = 0
	user.farms = 0
	user.farmslimit = 200
	user.energy = 10
	user.opit = 0
	user.biz = 0
	user.zhelezo = 0
	user.zoloto = 0
	user.almaz = 0
	user.bizlvl = 0
	user.nicklimit = 16
	user.rating = 0
	user.work = 0
	user.business = 0
	user.transport.car = 0
	user.transport.yacht = 0
	user.transport.airplane = 0
	user.transport.helicopter = 0
	user.realty.home = 0
	user.realty.apartment = 0
	user.misc.phone = 0
	user.misc.farm = 0
	user.misc.pet = 0
	user.pet.lvl = 0
	user.warn = 0
	user.serebro = 0
	user.rubin = 0
	user.sapfir = 0
	vk.api.call("messages.removeChatUser", {chat_id: 1, user_id: user.id })
	let [user_info] = await vk.api.users.get({ user_id: user.id })
	if(message.chatId !== 1) vk.api.messages.send({chat_id: 1, message: `Администратор *id${user.id}(${user_info.first_name} ${user_info.last_name}) был исключён из беседы так как набрал 3 выговора.`})
	vk.api.messages.send({
		peer_id: user.id,
		message: `‼ Вы были сняты с поста администратора набрав 3 выговора!`
	})
	return
}
let asd = ''
if(!message.args[1]) message.args[1] = `не указана`
await bot(`вы успешно выдали *id${user.id}(${user.tag}) +1 выговор [${user.warn}/3]. ${smilesuccess}`)
vk.api.messages.send({
	peer_id: user.id,
	message: `❗ Вы получили админское предупреждение! [${user.warn}/3]\n⚠ Причина: ${message.args[1]}!`
})
});

cmd.hear(/^(?:монетка)\s(.*)$/i, async (message, bot) => {
if(message.args[1] !== `орёл`){if(message.args[1] !== `решка`){if(message.arsg[1] !== `орел`){return}}}
message.args[1] = message.args[1].replace(/орёл|орел/ig, 1).replace(/решка/ig, 2)
message.args[1] = Number(message.args[1])
let z = utils.pick([1, 2])
if(z === message.args[1]) message.user.rub += 10000000
if(z === message.args[1]) return bot(`выпала: ${z.toString().replace(/1/gi, `орёл`).replace(/2/gi, `решка`)}.\nВы угадали и получили 10.000.000₽! ${smilesuccess}\n💰 Ваш баланс: ${utils.sp(message.user.rub)}₽`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `монетка ${utils.pick([`орёл`, `решка`])}`
},
"color": "positive"
}
]
]
})
});
if(z !== message.args[1]) return bot(`выпала: ${z.toString().replace(/1/gi, `орёл`).replace(/2/gi, `решка`)}.\nВы не угадали. ${smileerror}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `монетка ${utils.pick([`орёл`, `решка`])}`
},
"color": "positive"
}
]
]
})
});
});

cmd.hear(/^(?:cid)/i, message => {
return message.send(`Ид беседы: ${message.chatId}`)	
});

cmd.hear(/^(?:репорт|жалоба|вопрос)$/i, async (message, bot) => {
return bot(`используйте команду <<репорт [текст]>>! ${smileerror}`)
});

cmd.hear(/^(?:репорт|жалоба|вопрос)\s([^]+)$/i, async (message, bot) => {
	if(message.user.report === false) return bot(`вы не можете использовать команду <<репорт>>! ${smileerror}`)
	if(message.user.timereport > getUnix()) return bot(`вы сможете использовать репорт через ${unixStampLeft(message.user.timereport - Date.now())}! ${smileerror}`)
	message.user.reports += 1
	if(message.args[1] == `как положить деньги в банк`){ bot(`ваш репорт успешно отправлен! ${smilesuccess}`); return vk.api.messages.send({ peer_id: message.senderId, message: `⚙ Ответ на ваш репорт от [[Wolfbot15|Wolf INC]]\n-> Для того чтобы пополнить ваш банк используйте команду <<банк [сумма]>>. Для того чтобы снять с банка какую-либо сумму (не превышающую ваш текущий счёт в банке) используйте команду <<банк снять [сумма]>>.` }) }
	if(message.args[1] == `как передать другому человеку деньги`){ bot(`ваш репорт успешно отправлен! ${smilesuccess}`); return message_l(message.user.uid, `⚙ Ответ на ваш репорт от [[Wolfbot15|Wolf INC]]\n-> Для того чтобы передать другому пользователю какую-либо сумму денег, используйте команду <<передать [ID] [сумма]>>. Сумма не должна превышать ваш баланс.`) }
	if(message.args[1] == `как устроиться на работу`){bot(`ваш репорт успешно отправлен! ${smilesuccess}`); return message_l(message.user.uid, `⚙ Ответ на ваш репорт от [[Wolfbot15|Wolf INC]]\n-> Для того чтобы устроиться на работу используйте команду <<работа>>, перед вами выйдет список из 32-ух работ. Для начала вам необходимо устроиться на самую первую работу (<<работа 1>>), после каждого 24-ого использования команды <<работать>> ваш уровень будет повышаться, и соответственно работы, на которые вы сможете устроиться, тоже будут увеличены.`)}
	if(message.args[1] == `как устроится на работу`){bot(`ваш репорт успешно отправлен! ${smilesuccess}`); return message_l(message.user.uid, `⚙ Ответ на ваш репорт от [[Wolfbot15|Wolf INC]]\n-> Для того чтобы устроиться на работу используйте команду <<работа>>, перед вами выйдет список из 32-ух работ. Для начала вам необходимо устроиться на самую первую работу (<<работа 1>>), после каждого 24-ого использования команды <<работать>> ваш уровень будет повышаться, и соответственно работы, на которые вы сможете устроиться, тоже будут увеличены.`)}
	message.user.timereport = getUnix() + 300000
	let a = false
	message.args[1] = message.args[1].replace(/(\n|\r|\r\n)\\1{3,}/is);
	if(message.attachments.find((x) => typeof(x) !== "string")) {
		let att = message.attachments.filter((x) => typeof(x) !== "string");
		att.map(async (x) => {
			const { largePhoto } = x;

			const attachment = await vk.upload.messagePhoto({
				peer_id: raz,
				source: largePhoto
			});
			vk.api.messages.send({
			chat_id: 2,
			message: `[Фотография из репорта ${name(message.user.uid)}]`,
			attachment: attachment
	    })
	});
}
	vk.api.messages.send({
		chat_id: 2,
		message: `Поступил новый ${message.user.premium === true ? `ПРЕМИУМ-` : ``}репорт!\n${message.user.premium === true ? `👑` : `👤`} ID: ${message.user.uid}\n💬 *id${message.senderId}(${message.user.tag}): ${message.args[1]}`,
	})
	return bot(`ваш репорт успешно отправлен! ${smilesuccess}`)
});

cmd.hear(/^(?:снять фермы)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 2) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.farms = 0
user.misc.farm = 0
return bot(`вы успешно отняли у *id${user.id}(${user.tag}) все фермы! ${smilesuccess}`)
});

cmd.hear(/^(?:снять фермы)\s(.*)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
message.args[2] = Number(message.args[2])
if(!message.args[1]) return
if(!message.args[2]) return
if(message.user.settings.adm < 2) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.settings.adm < 1){ if(message.args[2] > user.farmslimit) message.args[2] = user.farmslimit}
user.farms -= message.args[2]
return bot(`вы успешно отняли у *id${user.id}(${user.tag}) ${utils.sp(message.args[2])} ферм! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать фермы)\s(.*)\s([1-9])\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
message.args[3] = message.args[3].replace(/(\.|\,)/ig, '');
message.args[3] = message.args[3].replace(/(к|k)/ig, '000');
message.args[3] = message.args[3].replace(/(м|m)/ig, '000000');
message.args[3] = Number(message.args[3])
if(!message.args[1]) return
if(!message.args[3]) return
if(message.user.settings.adm < 2) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.settings.adm < 1){ if(message.args[3] > user.farmslimit) message.args[3] = user.farmslimit}
user.farms = message.args[3]
user.misc.farm = Number(message.args[2])
const sell = farms.find(x=> x.id === Number(message.args[2]))
return bot(`вы успешно выдали *id${user.id}(${user.tag}) ${utils.sp(message.args[3])} ферм ${sell.name}! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать фермы)\s(.*)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
message.args[2] = Number(message.args[2])
if(!message.args[1]) return
if(!message.args[2]) return
if(message.user.settings.adm < 2) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.settings.adm < 1){ if(message.args[2] > user.farmslimit) message.args[2] = user.farmslimit}
user.farms += message.args[2]
return bot(`вы успешно выдали *id${user.id}(${user.tag}) ${utils.sp(message.args[2])} ферм! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать ответ|выдать ответы)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 3) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.dotvet = true
return bot(`доступ к ответам [id${user.id}|${user.tag}] успешно выдан! ${smilesuccess}`)
});

cmd.hear(/^(?:снять ответ|снять ответы)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 3) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.dotvet = false
return bot(`доступ к ответам у [id${user.id}|${user.tag}] успешно отнят! ${smilesuccess}`)
});

cmd.hear(/^(?:бр)\s?([0-9]+)\s?(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 1) return
if(!message.args[1]) return bot(`использование: «бр [ID игрока] [причина]»
✏ Пример: «бр ${utils.rand(10, 999999)} спам»`)
if(message.user.settings.adm < 3){ if(message.chatId !== 1) return bot(`БР и РР можно использовать только в беседе администрации! ${smileerror}`) }
if(message.user.settings.adm < 2){ if(!message.args[2]) return bot(`укажите причину! ${smileerror}`)}
let reason = ``
if(message.args[2]) reason += message.args[2]
if(!message.args[2]) reason += `не указана`
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.report === false) return bot(`у игрока и так отключён репорт! ${smileerror}`)
if(user.settings.adm > message.user.settings.adm) return bot(`вы не можете заблокировать репорт этому пользователю! ${smileerror}`)
user.report = false
message.user.brs += 1
await bot(`репорт *id${user.id}(${user.tag}) успешно отключён! ${smilesuccess}\n${message.user.settings.adm < 2 ? `‼ Бан репорта игроку просто так запрещён и карается снятием с поста админа. Заблокировать репорт можно только в том случае, если на протяжении часа или больше - пишет бессмысленные репорты, а так же за оскорбление администрации.` : ``}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `рр ${user.uid} ошибка`
},
"color": "positive"
}
]
]
})
});
if(message.user.settings.adm !== 3) vk.api.messages.send({ peer_id: config.ownerid, message: `Новый БР!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} заблокировал репорт игроку ${name(user.uid)}.\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`,
	keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "рр " + user.uid
},
"color": "positive"
}
]
]
})
})
users.filter(x=> x.id !== message.senderId & x.settings.adm === 2).map(zz => {
vk.api.messages.send({ user_id: zz.id, message: `Новый БР!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} заблокировал репорт игроку ${name(user.uid)}.\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`})
});
});

cmd.hear(/^(?:рр)\s([0-9]+)\s?(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 1) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 3){ if(message.chatId !== 1) return bot(`БР и РР можно использовать только в беседе администрации! ${smileerror}`) }
if(message.user.settings.adm < 2){ if(!message.args[2]) return bot(`укажите причину! ${smileerror}`) }
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
let reason = ``
if(message.args[2]) reason += message.args[2]
if(!message.args[2]) reason += `не указана`
reason = message.args[2]
if(user.report === true) return bot(`у игрока и так включён репорт! ${smileerror}`)
if(user.settings.adm > message.user.settings.adm) return bot(`вы не можете разблокировать репорт этому пользователю! ${smileerror}`)
user.report = true
message.user.rrs += 1
await bot(`репорт *id${user.id}(${user.tag}) успешно включён! ${smilesuccess}\n${message.user.settings.adm < 2 ? `‼ Разбан репорта просто так запрещён и карается снятием с поста администратора. Разбанить репорт можно только в том случае, если этот человек получил БР по ошибке.` : ``}`)
if(message.user.settings.adm !== 3) vk.api.messages.send({ peer_id: config.ownerid, message: `Новый РР!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} разблокировал репорт игроку ${name(user.uid)}.\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "бр " + user.uid
},
"color": "positive"
}
]
]
})
})
users.filter(x=> x.id !== message.senderId & x.settings.adm === 2).map(zz => {
vk.api.messages.send({ user_id: zz.id, message: `Новый РР!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} разблокировал репорт игроку ${name(user.uid)}.\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`})
});
});

cmd.hear(/^(?:ответ)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Number(message.args[1])
	if(message.user.settings.adm < 1) return;
	if(message.user.dotvets === false) return bot(`для того чтобы отвечать требуется доступ к ответам! ${smileerror}`)
	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;
	let z = ''
	if(message.user.settings.adm === 1) z += 'администратора'
	if(message.user.settings.adm === 2) z += 'заместителя создателя'
	if(message.user.settings.adm === 3) z += 'создателя'
	if(message.user.settings.adm === 4) z += 'разработчика'
	await bot(`ответ успешно отправлен! ${smilesuccess}`)
	message.user.otvets += 1
	user.timereport = 0
	vk.api.messages.send({ user_id: user.id, message: `⚙ Ответ на ваш репорт от [id${message.senderId}|${z}]!:
	✉ ${message.args[2]}`});
	if(message.user.settings.adm < 3){
	vk.api.messages.send({ user_id: config.ownerid, message: `Новый ответ!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} ответил: ${name(user.uid)}.\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nТекст ответа: ${message.args[2]}`,
		keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "снять ответ " + message.user.uid
},
"color": "primary"
}
]
]
})
})
}
if(message.user.settings.adm < 2){
users.filter(x=> x.id !== 1 & x.settings.adm === 2).map(zz => {
vk.api.messages.send({ user_id: zz.id, message: `Новый ответ!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} ответил: ${name(user.uid)}.\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nТекст ответа: ${message.args[2]}`})
});
}
})
// ------
cmd.hear(/^(?:сообщение)\s([0-9]+)\s([^]+)$/i, async (message, bot) => {
	if(message.user.settings.adm < 2) return;

	const user = await users.find(x=> x.uid === Number(message.args[1]));
	if(!user) return;
	let z = ''
	await bot(`сообщение успешно отправлено! ${smilesuccess}`)
	vk.api.messages.send({ user_id: user.id, message: `✉ Сообщение от администрации: ${message.args[2]}` });
});

cmd.hear(/^(?:работа)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Number(message.args[1])
	if(message.user.work) return bot(`ваша профессия - ${works[message.user.work - 1].name}
	${message.user.timers.hasWorked ? `Вы уже работали в эти 10 минут` : ``}`);

	const work = works.find(x=> x.id === Number(message.args[1]));
	if(!work) return console.log(message.args[1]);

	if(work.requiredLevel > message.user.level) return bot(`вы не можете устроиться на эту работу!`);
	else if(work.requiredLevel <= message.user.level)
	{
		message.user.work = work.id;
			if(message.isChat) vk.api.messages.send({ chat_id: message.chatId, message: `${namee(message.user.uid)} вы устроились на работу <<${work.name}>>
		👔 Введите команду "Работать"`, attachment: message.args[1] === 32 ? 'photo-188608231_457239055' : '' })
			if(!message.isChat) vk.api.messages.send({ peer_id: message.senderId, message: `${namee(message.user.uid)} вы устроились на работу <<${work.name}>>
		👔 Введите команду "Работать"`, attachment: message.args[1] === 32 ? 'photo-188608231_457239055' : '' })
	}
});

cmd.hear(/^(?:работа|работы)$/i, async (message, bot) => {
	work = ''
	for(i in works){
		work += `${works[i].icon} ${works[i].id}. ${works[i].name} - от ${utils.sp(works[i].min)}₽ до ${utils.sp(works[i].max)}₽ [${works[i].requiredLevel}] ${message.user.work === works[i].id ? `⬅` : ``}\n`
	}
	return bot(`профессии:
	${work}

	📜 Чтобы устроиться введите <<работа [номер]>>!
	⚠ Чтобы работать введите команду <<работать>>!`);
});

cmd.hear(/^(?:работать|🤑 Работать)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете! ${smileerror}
📌 Для трудоустройства введите Работа [номер]`);
	const work = works.find(x=> x.id === message.user.work);
	if(work.requiredLevel > message.user.level) return bot(`недостаточно уровня для работы! ${smileerror}`)
	if(message.user.timers.hasWorked_t > getUnix()) return bot(`рабочий день закончен.
	⏳ Вы сможете работать через ${unixStampLeft(message.user.timers.hasWorked_t - getUnix())}! ${smileerror}`);

	message.user.timers.hasWorked = true;
	message.user.timers.hasWorked_t = getUnix() + 60000*10;
	const earn = utils.random(work.min, work.max);

	message.user.rub += earn;
	message.user.exp += 1;

	if(message.isChat) vk.api.messages.send({ chat_id: message.chatId, message: `${namee(message.user.uid)} ${message.user.work === 32 ? `издан новый закон! Заработано: ${utils.sp(earn)}₽! ${smilesuccess}` : `рабочий день закончен! Заработано: ${utils.sp(earn)}₽! ${smilesuccess}`}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "🤑 Работать"
},
"color": "secondary"
}
]
]
}), attachment: message.user.work === 32 ? 'photo-188608231_457239057' : ''
})
	if(!message.isChat) vk.api.messages.send({ peer_id: message.senderId, message: `${namee(message.user.uid)} ${message.user.work === 32 ? `издан новый закон! Заработано: ${utils.sp(earn)}₽! ${smilesuccess}` : `рабочий день закончен! Заработано: ${utils.sp(earn)}₽! ${smilesuccess}`}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "🤑 Работать"
},
"color": "secondary"
}
]
]
}), attachment: message.user.work === 32 ? 'photo-188608231_457239057' : ''
})
});

cmd.hear(/^(?:уволиться)$/i, async (message, bot) => {
	if(!message.user.work) return bot(`вы нигде не работаете`);

	message.user.work = 0;
	return bot(`вы уволились со своей работы`);
});

cmd.hear(/^(?:кубик|куб)\s([1-6])$/i, async (message, bot) => {
	const int = utils.pick([1, 2, 3, 4, 5, 6]);
	if(int == message.args[1])
	{
		message.user.rub += 10000000;
		return bot(`вы угадали!\nПриз: 10.000.000₽ ${smilesuccess}`);
	} else return bot(`вы не угадали! ${smileerror}
	🎲 Выпало число ${int}`);
});

cmd.hear(/^(?:кик)\s?(?:https\:\/\/vk\.com\/)?([^]+)$/i, (message, bot) => {
	if(message.user.settings.adm == 0) return
	if(message.$from.type == 'user') return message.send(`⛔ Произошла критическая ошибка системы\n -- Подсказка:команда работает только в беседах!`);
	if(message.chatId === 1){ if(message.user.settings.adm < 2) return bot(`для использования этой команды в админ-беседе необходимо иметь ранг заместителя создателя!`) }
		vk.api.call("utils.resolveScreenName", {
		screen_name: message.args[1]
	  }).then((res) => {
	  	var user = users.find(x=> x.id === res.object_id)
	  	if(user.settings.adm > message.user.settings.adm) return bot(`вы не можете исключить данного пользователя! ${smileerror}`)
		vk.api.call("messages.removeChatUser", {chat_id: message.chatId, user_id: res.object_id }).
		catch((error) => {return message.send(`⛔ @id${message.user.id}(${message.user.tag}), произошла критическая ошибка системы! Возможные причины:\n 1&#8419; В данной беседе группа не Администратор\n 2&#8419; @id${message.args[1]} (Пользователь) администратор беседы\n 3&#8419; Такого игрока нет в беседе.\n 4&#8419; @id${message.args[1]} (Пользователь) является создателем беседы!`);
		});
		return
		})
});

cmd.hear(/^(?:кик)\s?(?:https\:\/\/vk\.com\/)(?:id)([0-9]+)$/i, (message, bot) => {
	if(message.user.settings.adm == 0) return
	if(message.$from.type == 'user') return message.send(`⛔ Произошла критическая ошибка системы\n -- Подсказка:команда работает только в беседах!`);
	if(message.chatId === 1){ if(message.user.settings.adm < 2) return bot(`для использования этой команды в админ-беседе необходимо иметь ранг заместителя создателя!`) }
	message.args[1] = Number(message.args[1])
	if(!message.args[1]) return message.reply('⛔ Произошла критическая ошибка системы\n -- Ссылка/ID/Домен не указан, либо указан неверно.');
	var user = users.find(x=> x.id === message.args[1])
	if(user.settings.adm > message.user.settings.adm) return bot(`вы не можете исключить данного пользователя! ${smileerror}`)
	vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.args[1] }).
	catch((error) => {return message.send(`⛔ @id${message.user.id}(${message.user.tag}), произошла критическая ошибка системы! Возможные причины:\n 1&#8419; В данной беседе группа не Администратор\n 2&#8419; @id${message.args[1]} (Пользователь) администратор беседы\n 3&#8419; Такого игрока нет в беседе.\n 4&#8419; @id${message.args[1]} (Пользователь) является создателем беседы!`);});
	return
});

cmd.hear(/^(?:кик)$/i, (message, bot) => {
	if(message.user.settings.adm == 0) return
	if(message.$from.type == 'user') return message.send(`⛔ Произошла критическая ошибка системы\n -- Подсказка:команда работает только в беседах!`);
	if(message.chatId === 1){ if(message.user.settings.adm < 2) return bot(`для использования этой команды в админ-беседе необходимо иметь ранг заместителя создателя!`) }
	if(!message.forwards[0]) return bot(`чтобы кикнуть игрока необходимо ответом на другое сообщение написать эту команду.`)
	message.args[1] = message.forwards[0].senderId
	if(!message.args[1]) return message.reply('⛔ Произошла критическая ошибка системы\n -- Ссылка/ID/Домен не указан, либо указан неверно.');
	var user = users.find(x=> x.id === message.args[1])
	if(user.settings.adm > message.user.settings.adm) return bot(`вы не можете исключить данного пользователя! ${smileerror}`)
	vk.api.call("messages.removeChatUser", { chat_id: message.chatId, user_id: message.forwards[0].senderId }).
	catch((error) => {return message.send(`⛔ @id${message.user.id}(${message.user.tag}), произошла критическая ошибка системы! Возможные причины:\n 1&#8419; В данной беседе группа не Администратор\n 2&#8419; @id${message.args[1]} (Пользователь) администратор беседы\n 3&#8419; Такого игрока нет в беседе.\n 4&#8419; @id${message.args[1]} (Пользователь) является создателем беседы!`);});
	return
});

cmd.hear(/^(?:эллиот говно|говно эллиот|еллиот говно|говно еллиот|бот говно|хуйня а не бот|бот говно слитое)$/i, async (message, bot) => {
await bot(`да кто бы говорил!`)
return message.sendSticker(15927)
});

cmd.hear(/^( |азино|ставка)$/i, async (message, bot) => {
return bot(`используйте: <<казино [ставка]>>! (без кавычек)`)
})

cmd.hear(/^(?:бобнулить)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.rub=0
user.rating=0
user.btc=0
user.bank=0
return bot(`баланс игрока ${name(user.uid)} обнулён! ${smilesuccess}`)
})

cmd.hear(/^(?:казино|азино|ставка)\s(.*)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.rub);
	let smilekazinobad2 = utils.pick([`😒`, `😯`, `😔`]);
	message.args[1] = Math.floor(Number(message.args[1]));
	if(!Number(message.args[1])) return;
	if(message.args[1] < 1000) return bot(`ставка должна быть не ниже 1.000₽! ${smileerror}`)
	if(message.args[1] > message.user.rub) return bot(`на вашем балансе нет столько денег! ${smileerror}`);
		const multiply = utils.pick([0, 0.25, 0.25,  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25,  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 2, 2, 1, 0.5, 0.5, 2, 2, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.75, 1, 0.5, 0.5, 0.75, 0.25, 0.25, 0.5, 2, 0.25, 0.75, 1, 0.5, 0.5, 0.75]);
		if(multiply === 0){
		message.user.rub -= message.args[1];
		bot(`вы проиграли ${utils.sp(Math.floor(message.args[1]))}₽! (x0) ❌
		💰 Ваш баланс: ${utils.sp(message.user.rub)}₽`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": message.text
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": `казино всё`
},
"color": "negative"
}]
]
})
});
		return message.sendSticker(utils.pick([16039, 14267, 14392, 13813, 10223, 13257, 3363])) 
}
		if(multiply === 0.25) message.user.rub -= Math.floor(message.args[1] * multiply);
		if(multiply === 0.75) message.user.rub -= Math.floor(message.args[1] * multiply);
		if(multiply === 0.5) message.user.rub -= Math.floor(message.args[1] * multiply);
		if(multiply !== 0.25 & multiply !== 0.75 & multiply !== 1 & multiply !== 0.5) message.user.rub += Math.floor(message.args[1] * multiply);
		await bot(`${multiply === 1 ? `ваши деньги остаются при вас (x${multiply}) ${smilesuccess}` : `${multiply < 1 ? `вы проиграли ${utils.sp(Math.floor(message.args[1] * multiply))}₽ (x${multiply}) ${smileerror}` : `вы выиграли ${utils.sp(Math.floor(message.args[1] * multiply))}₽ (x${multiply}) ${smilesuccess}`}`}
		💰 Ваш баланс: ${utils.sp(message.user.rub)}₽`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": message.text
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": `казино всё`
},
"color": "negative"
}]
]
})
});
let stick = utils.pick([13508, 6666, 15559, 15135, 7156])
if(multiply === 50) return message.sendSticker(stick)
if(multiply === 500) return message.sendSticker(stick)
if(multiply === 1000) return message.sendSticker(stick)
})

cmd.hear(/^(?:дайте денег|скиньте бабла|скиньте бабло|дайте бабла|дайте бабло|подкиньте ведьмаку чеканной монетой)$/i, async (message, bot) => {
return message.sendSticker(12493)
})

cmd.hear(/^(?:дайте денег пж|дайте денег пожалуйста|скиньте бабла пж|скиньте бабла пожалуйста|скиньте бабло пж|скиньте бабло пожалуйста|дайте бабла пж|дайте бабло пж|дайте бабло пожалуйста|подкиньте ведьмаку чеканной монетой пж|подкиньте ведьмаку чеканной монетой пожалуйста)$/i, async (message, bot) => {
return message.sendPhoto('обман.jpg')
})

cmd.hear(/^(?:трейд)$/i, async (message, bot) => {
return bot(`используйте команду <<трейд вверх/вниз [ставка]>>! ${smileerror}`)
});

/*msg.attachments.map(async function(a) {
    if(a.type == 'sticker'){
      await msg.send(`
🆔 ID Стикера: ${a.id}
📖 Id Стикер-Пака: ${a.productId}

🔗 Ссылка на стикер: ${a.images[0].url}
🌌 Фотография стикера:
`);
  await msg.sendPhotos(`https://vk.com/sticker/1-${a.id}-352`);
     }
    })*/
cmd.hear(/^(?:стикерид|stickerid)$/i, async (message, bot) => {if(!message.forwards[0]) return bot(`перешлите сообщение с стикером! ${smileerror}`); message.forwards[0].attachments.map(async function(a) {if(a.type == 'sticker'){await message.send(`🆔 ID Стикера: ${a.id}`);}})})

cmd.hear(/^(?:трейд вверх)\s([^]+)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.rub);
	const multiply = utils.pick([0.75, 0.80, 0.90, 0.95, 1.25, 1.5, 1.75, 2, 2.5]);
	const win = utils.pick(["da", "da", "net", "net", "da"]);
	let summa = 0;
	message.args[2] = Number(message.args[1])
	if(!message.args[2]) return
	if(message.args[1] < 1000) return bot(`ставка должна быть не ниже 1.000₽! ${smileerror}`)
	if(message.args[2] > message.user.rub) return bot(`ставка не должна превышать ваш баланс! ${smileerror}`)
	summa += message.args[2]
	if(win == "da"){
		message.user.rub += Math.floor(summa * multiply)
		if(message.isChat) return vk.api.messages.send({ chat_id: message.chatId, message: `${namee(message.user.uid)} курс подорожал 📈 на ${utils.random(1, 50)}₽\n✅ Вы заработали ${utils.sp(Math.floor(summa * multiply))}₽\n💰 Баланс: ${utils.sp(message.user.rub)}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вверх ${utils.sp(message.args[2])}`
},
"color": 'primary'
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вниз ${utils.sp(message.args[2])}`
},
"color": 'primary'
}]
]
}), attachment: utils.pick(['photo-188608231_457239098', 'photo-188608231_457239099', 'photo-188608231_457239100'])
});
		if(!message.isChat)	return vk.api.messages.send({ peer_id: message.senderId, message: `${namee(message.user.uid)} курс подорожал 📈 на ${utils.random(1, 50)}₽\n✅ Вы заработали ${utils.sp(Math.floor(summa * multiply))}₽\n💰 Баланс: ${utils.sp(message.user.rub)}`,
			
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вверх ${utils.sp(message.args[2])}`
},
"color": 'primary'
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вниз ${utils.sp(message.args[2])}`
},
"color": 'primary'
}]
]
}), attachment: utils.pick(['photo-188608231_457239098', 'photo-188608231_457239099', 'photo-188608231_457239100'])
});
}
    if(win == "net"){
    	message.user.rub -= summa
    	if(message.isChat) return vk.api.messages.send({ chat_id: message.chatId, message: `${namee(message.user.uid)} курс подешевел 📉 на ${utils.random(1, 50)}₽\n❌ Вы проиграли ${utils.sp(Math.floor(summa))}₽\n💰 Баланс: ${utils.sp(message.user.rub)}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вверх ${utils.sp(message.args[2])}`
},
"color": 'primary'
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вниз ${utils.sp(message.args[2])}`
},
"color": 'primary'
}]
]
}), attachment: utils.pick(['photo-188608231_457239098', 'photo-188608231_457239099', 'photo-188608231_457239100'])
});
	    if(!message.isChat) return vk.api.messages.send({ peer_id: message.senderId, message: `${namee(message.user.uid)} курс подешевел 📉 на ${utils.random(1, 50)}₽\n❌ Вы проиграли ${utils.sp(Math.floor(summa))}₽\n💰 Баланс: ${utils.sp(message.user.rub)}`,
			
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вверх ${utils.sp(message.args[2])}`
},
"color": 'primary'
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вниз ${utils.sp(message.args[2])}`
},
"color": 'primary'
}]
]
}), attachment: utils.pick(['photo-188608231_457239098', 'photo-188608231_457239099', 'photo-188608231_457239100'])
});
}
});

cmd.hear(/^(?:трейд вниз)\s([^]+)$/i, async (message, bot) => {
	message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
	message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
	message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
	message.args[1] = message.args[1].replace(/(вабанк|вобанк|все|всё)/ig, message.user.rub);
	const multiply = utils.pick([0.75, 0.80, 0.90, 0.95, 1.25, 1.5, 1.75, 2, 2.5]);
	const win = utils.pick(["da", "da", "net", "net", "da"]);
	let summa = 0;
	message.args[2] = Number(message.args[1])
	if(!message.args[1]) return
	if(message.args[1] < 1000) return bot(`ставка должна быть не ниже 1.000₽! ${smileerror}`)
	if(message.args[1] > message.user.rub) return bot(`ставка не должна превышать ваш баланс! ${smileerror}`)
	summa += message.args[1]
	if(win == "da"){
		message.user.rub += Math.floor(summa * multiply)
		if(message.isChat) return vk.api.messages.send({ chat_id: message.chatId, message: `${namee(message.user.uid)} курс подешевел 📉 на ${utils.random(1, 50)}₽\n✅ Вы заработали ${utils.sp(Math.floor(summa * multiply))}₽\n💰 Баланс: ${utils.sp(message.user.rub)}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вверх ${utils.sp(message.args[1])}`
},
"color": 'primary'
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вниз ${utils.sp(message.args[1])}`
},
"color": 'primary'
}]
]
}), attachment: utils.pick(['photo-188608231_457239098', 'photo-188608231_457239099', 'photo-188608231_457239100'])
});
		if(!message.isChat)	return vk.api.messages.send({ peer_id: message.senderId, message: `${namee(message.user.uid)} курс подешевел 📉 на ${utils.random(1, 50)}₽\n✅ Вы заработали ${utils.sp(Math.floor(summa * multiply))}₽\n💰 Баланс: ${utils.sp(message.user.rub)}`,
			
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вверх ${utils.sp(message.args[1])}`
},
"color": 'primary'
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вниз ${utils.sp(message.args[1])}`
},
"color": 'primary'
}]
]
}), attachment: utils.pick(['photo-188608231_457239098', 'photo-188608231_457239099', 'photo-188608231_457239100'])
});
}
    if(win == "net"){
    	message.user.rub -= summa
    	if(message.isChat) return vk.api.messages.send({ chat_id: message.chatId, message: `${namee(message.user.uid)} курс подорожал 📈 на ${utils.random(1, 50)}₽\n❌ Вы проиграли ${utils.sp(Math.floor(summa))}₽\n💰 Баланс: ${utils.sp(message.user.rub)}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вверх ${utils.sp(message.args[1])}`
},
"color": 'primary'
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вниз ${utils.sp(message.args[1])}`
},
"color": 'primary'
}]
]
}), attachment: utils.pick(['photo-188608231_457239098', 'photo-188608231_457239099', 'photo-188608231_457239100'])
});
	    if(!message.isChat) return vk.api.messages.send({ peer_id: message.senderId, message: `${namee(message.user.uid)} курс подорожал 📈 на ${utils.random(1, 50)}₽\n❌ Вы проиграли ${utils.sp(Math.floor(summa))}₽\n💰 Баланс: ${utils.sp(message.user.rub)}`,
			
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вверх ${utils.sp(message.args[1])}`
},
"color": 'primary'
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": `трейд вниз ${utils.sp(message.args[1])}`
},
"color": 'primary'
}]
]
}), attachment: utils.pick(['photo-188608231_457239098', 'photo-188608231_457239099', 'photo-188608231_457239100'])
});
}
});

cmd.hear(/^(?:стаканчик)\s([1-3])\s(.*)$/i, async (message, bot) => {
	message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
	message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
	message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
	message.args[2] = message.args[2].replace(/(вабанк|вобанк|все|всё)/ig, message.user.rub);

	if(!Number(message.args[2])) return;
	message.args[2] = Math.floor(Number(message.args[2]));

	if(message.args[2] <= 0) return;
	if(message.args[2] < 1000) return bot(`минимальная ставка: 1.000₽! ${smileerror}`)

	if(message.args[2] > message.user.rub) return bot(`у Вас недостаточно денег ${smileerror}
💰 Ваш баланс: ${message.user.rub}₽`);
	else if(message.args[2] <= message.user.rub)
	{
		message.user.rub -= message.args[2];

		const multiply = utils.pick([0.95, 0.90, 0.85, 0.80, 0.75, 0.70, 0.65, 1.5, 2]);
		const cup = utils.random(1, 3);

		if(cup == message.args[1])
		{
			message.user.rub += Math.floor(message.args[2] * multiply);
			return bot(`вы угадали! \nПриз ${utils.sp(message.args[2] * multiply)}₽! ${smilesuccess}`);
		} else {
			return bot(`вы не угадали, это был ${cup}-ый стаканчик ${smileerror}`);
		}
	}
});

cmd.hear(/^(?:бизнес)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у Вас нет бизнеса! ${smileerror}
Для выбора бизнеса отправьте «Бизнесы»`);
	const biz = businesses.find(x=> x.id === message.user.business);
	var lvlcash = biz.earn*message.user.bizlvl;
var updprice2 = Math.floor(businesses[message.user.business - 1].cost * 2)*message.user.bizlvl
	return bot(`статистика "${biz.name}":
	💸 Прибыль: ${utils.sp(lvlcash)}₽/час
	💰 На счёте: ${utils.sp(message.user.biz)}₽
	🌟 Уровень: ${message.user.bizlvl}
	✅ Стоимость улучшения: ${utils.sp(updprice2)}₽/1 лвл`);
});

cmd.hear(/^(?:бизнес улучшить)\s?(.*)$/i, async (message, bot) => {
	if(!message.args[1]) message.args[1]=1
	message.args[1] = Number(message.args[1])
	if(!message.args[1]) return
	if(!message.user.business) return bot(`у Вас нет бизнеса! ${smileerror}
Для выбора бизнеса отправьте «Бизнесы»`);
	const biz = businesses.find(x=> x.id === message.user.business);

	var updprice = Math.floor(businesses[message.user.business - 1].cost * 2) * message.args[1]*message.user.bizlvl;

	if(message.user.rub < updprice) return bot(`недостаточно денег. ${smileerror}`);

	message.user.bizlvl += message.args[1];
	message.user.rub -= updprice;

	return bot(`вы успешно улучшили бизнес до ${message.user.bizlvl} уровня (+${message.args[1]} ${utils.decl(message.args[1], ['уровень', 'уровня', 'уровней'])}) за ${utils.sp(updprice)}₽! ${smilesuccess}
💰 Ваш баланс: ${utils.sp(message.user.rub)}₽`);


});

cmd.hear(/^(?:бизнес снять)\s?(.*)$/i, async (message, bot) => {
	if(!message.user.business) return bot(`у Вас нет бизнеса! ${smileerror}
Для выбора бизнеса отправьте «Бизнесы»`);
	if(!message.user.biz) return bot(`у вас нет денег на счёте бизнеса. ${smileerror}`);


	var cashlvlbiz = message.user.biz*message.user.bizlvl;

	message.user.rub += cashlvlbiz;
	message.user.biz = 0;

	bot(`вы сняли со счёта своего бизнеса ${utils.sp(cashlvlbiz)}₽ ${smilesuccess}`)

	return;
});

cmd.hear(/^(?:ферма|🔋 Ферма|@destinybot 🔋 Ферма)$/i, async (message, bot) => {
	let smileerror2 = utils.pick([`😒`, `😯`, `😔`, `🤔`]);

	if(!message.user.misc.farm) return bot(`у Вас нет майнинговых ферм. ${smileerror2}`);
	if(message.user.misc.farm_btc === 0) return bot(`на ваших фермах еще нет Биткоинов. Новые Биткоины появятся через час! 🔎`);

	message.user.btc += message.user.misc.farm_btc;
	message.isChat ? vk.api.messages.send({ chat_id: message.chatId, message: `${namee(message.user.uid)} вы собрали со своих ферм ${utils.sp(message.user.misc.farm_btc)}฿`, attachment: 'photo-188608231_457239104' }) : vk.api.messages.send({ peer_id: message.senderId, message: `${namee(message.user.uid)} вы собрали со своих ферм ${utils.sp(message.user.misc.farm_btc)}฿`, attachment: 'photo-188608231_457239104' })
	message.user.misc.farm_btc = 0
	return
});

cmd.hear(/^(?:restart|куыефке)$/i, async (message, bot) => {
	if(message.user.settings.adm < 4) return
	await saveUsers();
	process.exit(-1);
});

cmd.hear(/^(?:сейф)\s(.*)$/i, async (message, bot) => {
	message.args[1] = Number(message.args[1])
	if(!message.args[1]) return
	let int = utils.random(1, 100)
	if(message.args[1] > 100) return bot(`число должно быть не больше 100! ${smileerror}`)
	if(message.args[1] !== int) return bot(`вы не угадали число, но не переживайте, количество попыток неограничено. Число было: ${int} ${smileerror}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `сейф ${utils.random(1, 100)}`
},
"color": "primary"
}
]
]
})
});
	if(message.args[1] === int){
		await bot(`невероятно! Вы угадали число!\n💲 На ваш аккаунт зачислено 5.000.000.000₽!`,
		{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": `сейф ${utils.random(1, 100)}`
},
"color": "primary"
}
]
]
})
});
		message.user.rub += 5000000000
	}
});

cmd.hear(/^(?:снять энергию)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
let i = Number(message.args[2])
message.args[1] = Number(message.args[1])
if(!i) return
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(user.settings.adm > message.user.settings.adm) return bot(`вы не можете забрать это у человека выше своего ранга! ${smileerror}`)
if(i > user.energy) i = user.energy
if(user.energy === 0) return bot(`у человека и так нету энергии! ${smileerror}`)
user.energy -= i
return bot(`вы успешно забрали у *id${user.id}(${user.tag}) ${utils.sp(i)} энергии! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать Биткоин|выдать Биткоины)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
let i = Number(message.args[2])
message.args[1] = Number(message.args[1])
if(!i) return
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(message.args[1] === message.user.uid){
	user.btc += i
	return bot(`вы успешно выдали себе ${utils.sp(i)} Биткоинов! ${smilesuccess}`)
}
user.btc += i
return bot(`вы успешно выдали *id${user.id}(${user.tag}) ${utils.sp(i)} Биткоинов! ${smilesuccess}`)
});

cmd.hear(/^(?:снять Биткоин|снять Биткоины)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
let i = Number(message.args[2])
message.args[1] = Number(message.args[1])
if(!i) return
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(user.settings.adm > message.user.settings.adm) return bot(`вы не можете забрать это у человека выше своего ранга! ${smileerror}`)
if(user.btc === 0) return bot(`у человека и так нету Биткоинов! ${smileerror}`)
if(i > user.btc) i = user.btc
user.btc -= i
return bot(`вы успешно забрали у *id${user.id}(${user.tag}) ${utils.sp(i)} Биткоинов! ${smilesuccess}`)
});

cmd.hear(/^(?:снять опыт)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
let i = Number(message.args[2])
message.args[1] = Number(message.args[1])
if(!i) return
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(user.settings.adm > message.user.settings.adm) return bot(`вы не можете забрать это у человека выше своего ранга! ${smileerror}`)
if(user.opit === 0) return bot(`у человека и так нету опыта! ${smileerror}`)
if(i > user.opit) i = user.opit
user.opit -= i
return bot(`вы успешно забрали у *id${user.id}(${user.tag}) ${utils.sp(i)} опыта! ${smilesuccess}`)
});

cmd.hear(/^(?:снять рейтинг)\s(.*)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
let i = Number(message.args[2])
message.args[1] = Number(message.args[1])
if(!i) return
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(user.settings.adm === 3) return bot(`вы не можете забрать рейтинг у создателя! ${smileerror}`)
if(user.rating === 0) return bot(`у человека и так нету рейтинга! ${smileerror}`)
if(i > user.rating) i = user.rating
user.rating -= i
return bot(`вы успешно забрали у *id${user.id}(${user.tag}) ${utils.sp(i)} рейтинга! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать энергию)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 2) return
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
let i = Number(message.args[2])
let user = users.find(x=> x.uid === Number(message.args[1]))
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.uid === message.user.uid){
	user.energy += i
	return bot(`вы успешно выдали себе ${utils.sp(i)} энергии! ${smilesuccess}`)
}
user.energy += i
return bot(`вы успешно выдали *id${user.id}(${user.tag}) ${utils.sp(i)} энергии! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать рейтинг)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
let i = Number(message.args[2])
let user = users.find(x=> x.uid === Number(message.args[1]))
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.rating += i
return bot(`вы успешно выдали *id${user.id}(${user.tag}) ${utils.sp(i)} рейтинга! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать опыт)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
let i = Number(message.args[2])
let user = users.find(x=> x.uid === Number(message.args[1]))
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(message.user.settings.adm < 1) return	
if(user.uid === message.user.uid){
	if(message.user.settings.adm === 1){
	if(i > 1000000) i = 1000000
	if(user.opit > 1000000) return bot(`у вас лимит опыта! ${smileerror}`)  }
	user.opit += i
	return bot(`готово! ${smilesuccess}`)
}
if(message.user.settings.adm < 2) return
user.opit += i
return bot(`готово! ${smilesuccess}`)
});

cmd.hear(/^(?:ник)$/i, async (message, bot) => {
return bot(`используйте команду <<ник [фраза]>>! ${smilesuccess}`)
});

cmd.hear(/^(?:create post)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
await bot(`создаю пост...`)
vk.api.wall.post({ access_token: ``, owner_id: -188608231, from_group: 1, mark_as_ads: 0, message: message.args[1] })
return bot(`пост создан!`)
});

cmd.hear(/^(?:set status)\s(.*)\s?(-res|--res)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
await bot(`устанавливаю статус...`)
if(users[1].infostatus === true){users[1].infostatus = false; if(message.args[2] === `-res`){setTimeout(() => {users[1].infostatus = true}, 600000)}; if(message.args[2] === `--res`){users[1].infostatus = false}}
vk.api.status.set({access_token: ``, group_id: Number(config.groupid), text: message.args[1]})
return bot(`статус установлен!`)
});

cmd.hear(/^(?:бан передачи)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.settings.adm > message.user.settings.adm) return bot(`вы не можете заблокировать передачу этому пользователю! ${smileerror}`)
user.settings.trade = false
return bot(`теперь *id${user.id}(${user.tag}) не может передавать валюту! ${smilesuccess}`)
});

cmd.hear(/^(?:разбан|разбан игрока)\s([0-9]+)\s?(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 1) return
if(!message.user.useraz) return bot(`вам запрещено использование разбана! ${smileerror}`)
if(message.user.settings.adm < 3){ if(!message.args[2]) return bot(`укажите причину! ${smileerror}`)}
let reason = message.args[2]
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(message.user.uid === user.uid){ await bot(`ты хочешь разблокировать себя, но при этом ты не в бане. Что?`); return message.sendSticker(7374) }
if(message.user.settings.adm < 1){if(message.chatId !== 1) return bot(`вы можете выдать разбан только в беседе администрации! ${smileerror}`) }
if(!message.user.bezr){if(message.user.timeraz > getUnix()) return bot(`разбан доступен только 2 раза в день! Вы сможете использовать команду через ${unixStampLeft(message.user.timeraz - getUnix())} ${smileerror}`)}
if(user.ban_time === 0 & user.permban === false) return bot(`игрок не заблокирован! ${smileerror}`)
message.user.razbanst -= 1
if(message.user.razbanst === 0) message.user.timeraz = getUnix()+86400000
	if(user.ban_time > 0 & user.permban === false){
	if(message.user.settings.adm < 3){ if(user.razprotect) return bot(`у вас нет доступа к вечным разбанам! ${smileerror}`) }
	user.ban_time = 0
	message.user.razbans += 1
	await bot(`игрок *id${user.id}(${user.tag}) разблокирован! ${smilesuccess}\n${message.user.settings.adm < 2 ? `‼ Разбан без причины запрещён и карается снятием с поста администратора, ознакомьтесь с правилами: https://vk.com/topic-188608231_39940058 ${smilesuccess}` : ``}`)
	if(message.user.settings.adm < 3 & message.user.bezr === true) vk.api.messages.send({ peer_id: config.ownerid, message: `Новый разбан от безлимитчика!\n[id${message.senderId}|${message.user.settings.adm === 1 ? `Администратор` : `Заместитель создателя`}] разбанил игрока ${name(user.uid)}.\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": `бан ${user.uid} ${user.banday}`
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{\"button\":\"4\"}",
"label": "снять безлимразбаны " + message.user.uid
},
"color": "secondary"
}
]
]
})
})
	if(message.user.settings.adm < 3 & message.user.bezr === false) vk.api.messages.send({ user_id: 312355107, message: `Новый разбан!\n[id${message.senderId}|${message.user.settings.adm === 1 ? `Администратор` : `Заместитель создателя`}] разбанил *id${users[Number(message.args[1])].id} (${users[Number(message.args[1])].tag})\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": `бан ${user.uid} ${user.banday}`
},
"color": "positive"
}
]
]
})
})
if(message.user.settings.adm < 3){
users.filter(x=> x.id !== 1 & x.settings.adm === 2).map(zz => {
vk.api.messages.send({ user_id: zz.id, message: `Новый разбан!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} разбанил *id${user.id}(${user.tag}).\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`})
});
}
vk.api.messages.send({ user_id: user.id, message: `${namee(user.uid)} вы были разблокированы.` })
}
if(user.permban){
	if(!message.user.protectraz){ if(user.razprotect) return bot(`у вас нет доступа к вечным разбанам!! ${smileerror}`) }
	user.permban = false
	await bot(`игрок ${name(message.args[1])} разблокирован! ${smilesuccess}`)
	if(message.user.settings.adm < 3 & message.user.bezr === true) vk.api.messages.send({ peer_id: config.ownerid, message: `Новый ${user.razprotect ? `вечно-` : ``}разбан от безлимитчика!\n[id${message.senderId}|${message.user.settings.adm === 1 ? `Администратор` : `Заместитель создателя`}] разбанил игрока ${name(user.uid)}.\n(игрок был в вечном бане)\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "бан " + user.uid
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снять вечноразбаны " + message.user.uid
},
"color": "secondary"
}
]
]
})
})
	if(message.user.settings.adm < 3 & message.user.bezr === false) vk.api.messages.send({ user_id: 312355107, message: `Новый ${user.razprotect === true ? `вечно-` : ``}разбан!\n[id${message.senderId}|${message.user.settings.adm === 1 ? `Администратор` : `Заместитель создателя`}] разбанил *id${users[Number(message.args[1])].id} (${users[Number(message.args[1])].tag})\n(игрок был в вечном бане).\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "бан " + user.uid
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снять вечноразбаны " + message.user.uid
},
"color": "secondary"
}]
]
})
})
if(user.razprotect) user.razprotect = false
}
})

cmd.hear(/^(?:запрет сразбан|запрет снятьразбан|запрет снять разбан|запрет разбана)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.razprotect = true
return bot(`игрока ${name(user.uid)} теперь не могут разбанить! ${smilesuccess}`)
});

cmd.hear(/^(?:разрешить сразбан|разр сразб|разрешить сразбаны)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.razprotect = false
return bot(`игрока ${name(user.uid)} вновь могут разбанить! ${smilesuccess}`)
});

cmd.hear(/^(?:запрет разбан|запретить разбаны)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.useraz = false
return bot(`игроку ${name(user.uid)} запрещены разбаны! ${smilesuccess}`)
});

cmd.hear(/^(?:разрешить разбаны|разр разб)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.useraz = true
return bot(`игроку ${name(user.uid)} разрешены разбаны! ${smilesuccess}`)
});

cmd.hear(/^(?:запрет бан|запретить баны)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.useban = false
return bot(`игроку ${name(user.uid)} запрещены баны! ${smilesuccess}`)
});

cmd.hear(/^(?:разрешить бан|разр бан)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.useban = true
return bot(`игроку ${name(user.uid)} разрешены баны! ${smilesuccess}`)
});

cmd.hear(/^(?:разбан передачи)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.settings.adm > message.user.settings.adm) return bot(`вы не можете разблокировать передачу этому пользователю! ${smileerror}`)
user.settings.trade = true
return bot(`теперь *id${user.id}(${user.tag}) вновь может передавать валюту! ${smilesuccess}`)
});

cmd.hear(/^(?:снять вечнобаны|снять вечнобан)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return;
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.dvech === false) return bot(`у игрока и так нету вечнобанов! ${smileerror}`)
user.dvech = false
user.razbanst = 0
user.banst = 0
return bot(`у игрока *id${user.id}(${user.tag}) отнят доступ к вечным банам! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать вечнобан|выдать вечнобаны)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return;
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.dvech === true) return bot(`у игрока и так есть вечнобаны! ${smilesuccess}`)
user.dvech = true
user.razbanst = 9999999999999
user.banst = 9999999999999
return bot(`игроку *id${user.id}(${user.tag}) выдан доступ к вечным банам! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать безлимбан|выдать безлимбаны)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.bezb === true) return bot(`у игрока и так есть безлимитные баны! ${smilesuccess}`)
user.bezb = true
return bot(`игроку *id${user.id}(${user.tag}) выданы безлимитные баны! ${smilesuccess}`)
});

cmd.hear(/^(?:снять безлимбаны|снять безлимбан)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(user.bezb === false) return bot(`у игрока и так нету безлимитных банов! ${smileerror}`)
user.bezb = false
return bot(`у игрока *id${user.id}(${user.tag}) отняты безлимитные баны! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать банк)\s(.*)\s(.*)$/i, async (message, bot) => {
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
message.args[1] = Number(message.args[1])
if(message.user.settings.adm < 3) return
if(!Number(message.args[2])) return;
message.args[2] = Number(message.args[2]);
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(message.args[2]+user.bank > user.banklimit) message.args[2] = user.bank-user.banklimit
if(user.bank === user.banklimit) return bot(`у этого игрока и так полный банк! ${smilesuccess}`)
if(message.args[2] <= 0) return;
user.bank += message.args[2]
return bot(`вы успешно выдали игроку ${name(user.uid)} ${utils.sp(message.args[2])}₽ на банковский счёт! ${smilesuccess}`)
});

cmd.hear(/^(?:снять банк)\s(.*)\s(.*)$/i, async (message, bot) => {
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
message.args[1] = Number(message.args[1])
if(message.user.settings.adm < 3) return
if(!Number(message.args[2])) return;
message.args[2] = Number(message.args[2]);
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(message.args[2] > user.bank) message.args[2] = user.bank
if(message.args[2] <= 0) return;
if(user.bank === 0) return bot(`нечего снимать! ${smileerror}`)
user.bank -= message.args[2]
return bot(`вы успешно отняли у игрока ${name(user.uid)} ${utils.sp(message.args[2])}₽ с банковского счёта! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать дайадм)\s(.*)\s([1-2])$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 3) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.daiadm = true
user.daiadm_l = Number(message.args[2])
return bot(`игрок ${name(user.uid)} получил доступ к команде <<дайадм>> ${message.args[2]} уровня! ${smilesuccess}`)
});

cmd.hear(/^(?:снять дайадм)\s(.*)$/i, async (message, bot) => {
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
if(message.user.settings.adm < 3) return
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.daiadm = false
return bot(`игрок ${name(user.uid)} теперь не может использовать команду <<дайадм>>! ${smilesuccess}`)
});

cmd.hear(/^(?:выдать)\s(.*)\s(.*)$/i, async (message, bot) => {
message.args[2] = message.args[2].replace(/(\.|\,)/ig, '');
message.args[2] = message.args[2].replace(/(к|k)/ig, '000');
message.args[2] = message.args[2].replace(/(м|m)/ig, '000000');
message.args[1] = Number(message.args[1])
if(message.user.settings.adm < 1) return
if(!Number(message.args[2])) return;
message.args[2] = Math.floor(Number(message.args[2]));
if(message.args[2] <= 0) return;
if(message.args[2] > 10000000000000000) message.args[2] = 10000000000000000
// if(message.args[2] > 1000000000000){ if(!message.args[3]) return bot(`укажите причину! ${smileerror}`) }

{
let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);
let a = false
if(user.uid === message.user.uid){
	user.rub += message.args[2]
	if(message.isChat) return vk.api.messages.send({ chat_id: message.chatId, message: `${namee(message.user.uid)} на ваш счёт успешно зачислено ${utils.sp(message.args[2])}₽! ${smilesuccess}`, attachment: 'photo-188608231_457239050' })
	if(!message.isChat) return vk.api.messages.send({ peer_id: message.senderId, message: `${namee(message.user.uid)} на ваш счёт успешно зачислено ${utils.sp(message.args[2])}₽! ${smilesuccess}`, attachment: 'photo-188608231_457239050' })
}
if(user.uid !== message.user.uid){
	if(message.user.settings.adm < 3){if(message.args[2] > message.user.lim_v) message.args[2] = message.user.lim_v }
	if(message.user.settings.adm < 3){if(message.user.lim_v === 0) return bot(`вы сможете выдать ${message.user.settings.adm === 1 ? `300.000.000.000₽` : `600.000.000.000₽`} другому человеку через 3 часа! ${smileerror}`)}
	message.user.give = true
	user.rub += message.args[2]
	if(message.user.settings.adm < 3){ message.user.lim_v -= message.args[2] }
	a = true
	if(message.args[2] > 1000000000000 & message.user.settings.adm < 3) vk.api.messages.send({ peer_id: config.ownerid, message: `Новая выдача!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} выдал ${utils.sp(message.args[2])}₽ ${name(user.uid)}\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}.`,
		keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": `снять ${user.uid} ${message.args[2]}`
},
"color": "positive"
}
]
]
})
})
	if(message.isChat) await vk.api.messages.send({chat_id: message.chatId, message: `${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, вы успешно выдали ${name(user.uid)} ${utils.sp(message.args[2])}₽ ${smilesuccess}`, attachment: utils.pick(['photo-188608231_457239045', 'photo-188608231_457239046', 'photo-188608231_457239047', 'photo-188608231_457239048', 'photo-188608231_457239049'])});
	if(!message.isChat) await vk.api.messages.send({peer_id: message.senderId, message: `${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, вы успешно выдали ${name(user.uid)} ${utils.sp(message.args[2])}₽ ${smilesuccess}`, attachment: utils.pick(['photo-188608231_457239045', 'photo-188608231_457239046', 'photo-188608231_457239047', 'photo-188608231_457239048', 'photo-188608231_457239049'])});
}
if(user.notifications === true & a === true) vk.api.messages.send({ user_id: user.id, message: `[УВЕДОМЛЕНИЕ]
Администратор выдал вам ${utils.sp(message.args[2])}₽!
🔕 Введите "Уведомления выкл", если не хотите получать подобные сообщения` });
}
});

cmd.hear(/^(?:выдать)\s(.*)$/i, async (message, bot) => {
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
if(!message.forwards[0]) return bot(`укажите ID или ответьте на сообщение используя эту команду. ${smileerror}`)
if(message.user.settings.adm < 1) return
if(!Number(message.args[1])) return;
message.args[1] = Math.floor(Number(message.args[1]));
if(message.args[1] <= 0) return;
if(message.args[1] > 10000000000000000) message.args[1] = 10000000000000000
// if(message.args[2] > 1000000000000){ if(!message.args[3]) return bot(`укажите причину! ${smileerror}`) }

{
let user = users.find(x=> x.id === message.forwards[0].senderId);
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);
let a = false
if(user.uid === message.user.uid){
	user.rub += message.args[1]
	if(message.isChat) return vk.api.messages.send({ chat_id: message.chatId, message: `${namee(message.user.uid)} на ваш счёт успешно зачислено ${utils.sp(message.args[1])}₽! ${smilesuccess}`, attachment: 'photo-188608231_457239050' })
	if(!message.isChat) return vk.api.messages.send({ peer_id: message.senderId, message: `${namee(message.user.uid)} на ваш счёт успешно зачислено ${utils.sp(message.args[1])}₽! ${smilesuccess}`, attachment: 'photo-188608231_457239050' })
}
if(user.uid !== message.user.uid){
	if(message.user.settings.adm < 2){if(message.args[1] > message.user.lim_v) message.args[1] = message.user.lim_v }
	if(message.user.settings.adm < 2){if(message.user.lim_v === 0) return bot(`вы сможете выдать ${message.user.settings.adm === 1 ? `300.000.000.000₽` : `600.000.000.000₽`} другому человеку через 3 часа! ${smileerror}`)}
	message.user.give = true
	user.rub += message.args[1]
	if(message.user.settings.adm < 3){ message.user.lim_v -= message.args[1] }
	a = true
	if(message.args[1] > 1000000000000 & message.user.settings.adm < 3) vk.api.messages.send({ peer_id: config.ownerid, message: `Новая выдача!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} выдал ${utils.sp(message.args[2])}₽ ${name(user.uid)}\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}.`,
		keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": `снять ${user.uid} ${message.args[1]}`
},
"color": "positive"
}
]
]
})
})
	if(message.isChat) await vk.api.messages.send({chat_id: message.chatId, message: `${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, вы успешно выдали ${name(user.uid)} ${utils.sp(message.args[1])}₽ ${smilesuccess}`, attachment: utils.pick(['photo-188608231_457239045', 'photo-188608231_457239046', 'photo-188608231_457239047', 'photo-188608231_457239048', 'photo-188608231_457239049'])});
	if(!message.isChat) await vk.api.messages.send({peer_id: message.senderId, message: `${message.user.mention ? `@id${message.user.id} (${message.user.tag})` : `${message.user.tag}`}, вы успешно выдали ${name(user.uid)} ${utils.sp(message.args[1])}₽ ${smilesuccess}`, attachment: utils.pick(['photo-188608231_457239045', 'photo-188608231_457239046', 'photo-188608231_457239047', 'photo-188608231_457239048', 'photo-188608231_457239049'])});
}
}
});

cmd.hear(/^(?:wiki|вики)\s(.*)$/i, async (message, bot) => {
    let args = message.text.match(/^(?:wiki|вики)\s?(.*)/i);
    function isEmpty( str ) { if (str.trim() == '') return true; return false; }
        rq("https://ru.wikipedia.org/w/api.php?action=opensearch&search="+encodeURIComponent((args[1] ? args[1] : "ВКонтакте"))+"&meta=siteinfo&rvprop=content&format=json")
        .then((res) => {
            if(isEmpty(res[2][0])) {
                if(isEmpty(res[2][1])) {
                    if(isEmpty(res[2][2])) return message.reply('Статья не полная, либо отсутствует.\n\nСсылка: ' + res[3][0]);
                } else {
                    return message.reply(`Я нашла то, что Вы попросили найти! \n\nСсылка: ${res[3][1]}`);
                }
            } else {
                return message.reply(`Я нашла то, что Вы попросили найти!\n\nСсылка: ${res[3][0]}`);
            }
        });
});

cmd.hear(/^(?:погода|weather)/i, async (message, bot) => {
    let args = message.text.match(/^(?:погода|weather)\s?(.*)/i);
    if(args[1].toLowerCase() == "") return message.send(nope)
    rq("http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(args[1]) + "&appid=fe198ba65970ed3877578f728f33e0f9&units=metric").catch((err) => {return message.send(`Упс! Произошла ошибочка.`)})
        .then((res) => {
    let Utils = {
    	filter: (text) => { 
    	text = text.replace(/^(RU)/i, 'Россия')
        text = text.replace(/^(UA)/i, 'Украина')
        text = text.replace(/^(BY)/i, 'Беларусь')
        text = text.replace(/^(KZ)/i, 'Казахстан')
        text = text.replace(/^(AE)/i, 'Объединенные Арабские Эмираты')
        return text;
    }};
    function TempTo () {
    	if(res.main.temp < -10) return 'очень холодно'
    	else if(res.main.temp < -5) return 'холодно'
    	else if(res.main.temp < 5) return 'холодновато'
    	else if(res.main.temp < 20) return 'комфортно'
    	else if(res.main.temp < 25) return 'тепло'
    	else if(res.main.temp < 30) return 'жарко'
        else if(res.main.temp < 50) return 'Очень жарко'
    };
    function Timer () {
    	let now = new Date(res.dt*1000).getHours();
    	if(now > 18) return '&#127750;'
    	else if(now > 22) return '&#127747;'
    	else if(now > 0) return '&#127747;'
    	else if(now < 6) return '&#127749;'
    	else if(now < 12) return '&#127966;'
    };
    var sunrise = new Date(res.sys.sunrise*1000);
    var sunset = new Date(res.sys.sunset*1000);
    function sunmin () {
    	if(sunrise.getMinutes() < 10) "0" + sunrise.getMinutes();
    	return sunset.getMinutes();
    };
    function sunsmin () {
    	if(sunset.getMinutes() < 10) "0" + sunset.getMinutes();
    	return sunset.getMinutes();
    };
    function daterh () {
    	if(date.getHours() < 10) "0" + date.getHours();
    	return date.getHours()
    };
    function daterm () {
    	if(date.getMinutes() < 10) "0" + date.getMinutes();
    	return date.getMinutes();
    };
    var date = new Date(res.dt*1000);
    return message.reply(`${Timer()} ${res.name}, ${Utils.filter(res.sys.country)}

➖ Сейчас там ${TempTo()}: ${res.main.temp}°С
➖ Рассвет: ${sunrise.getHours()}:${sunmin()}
➖ Закат: ${sunset.getHours()}:${sunsmin()}
➖ Скорость ветра: ${res.wind.speed} м/с`)})
});


cmd.hear(/^(?:защита)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.protectban = true
return bot(`игрок *id${user.id}(${user.tag}) теперь защищён от банов! ${smilesuccess}`)
});

cmd.hear(/^(?:снять защиту)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return bot(`требуется ранг создателя!`)
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
user.protectban = false
return bot(`игрок *id${user.id}(${user.tag}) теперь не защищён от банов! ${smilesuccess}`)
});

cmd.hear(/^(?:бан)\s(.*)\s([1-9])\s?(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 1) return
if(!message.user.useban) return bot(`вам запрещено использование бана! ${smileerror}`)
message.args[1] = Number(message.args[1])
let user = users.find(x=> x.uid === message.args[1])
if(!user) return bot(`игрок не найден! ${smileerror}`)
if(message.args[2] === 0) return
if(message.user.settings.adm < 3){if(message.args[2] > 10) message.args[2] = 10}
if(message.user.uid === user.uid){ await bot(`вы хотите заблокировать себя?`); return message.sendSticker(14369) }
if(message.user.dvech === false){ if(user.settings.adm > 0) return bot(`это администратор! ${smileerror}`) }
if(user.protectban === true) return bot(`пользователь защищён! ${smileerror}`)
if(!message.user.bezb){if(message.user.ban_t > getUnix()) return bot(`банить можно только 2 раза в день! Вы сможете использовать команду через ${unixStampLeft(message.user.ban_t - getUnix())} ${smileerror}`)}
let z = ''
if(message.user.settings.adm < 1){ if(message.chatId !== 1) return bot(`вы можете выдать бан только в беседе администрации! ${smileerror}`); if(!message.args[3]) return bot(`укажите причину! ${smileerror}`) }
// if(!message.user.bezb){
// if(message.user.ban_l){ if(message.user.ban_t === 48){z += `2 дня`}; if(message.user.ban_t > 24 & message.user.ban_t !== 48){z += `1 день ${message.user.ban_t - 24} часов`}; if(message.user.ban_t === 24){z += `1 день`}; if(message.user.ban_t < 24){z += `${message.user.ban_t} часов`} }
// if(message.user.ban_l) return bot(`вы сможете банить через ${z}! ${smileerror}`) }
if(user.ban_time > getUnix() & user.permban === false) return bot(`игрок уже заблокирован! ${smileerror}`)
if(user.permban === true & user.ban_time < getUnix()) return bot(`игрок уже заблокирован! ${smileerror}`)
if(!message.user.bezb){ if(message.user.banst === 0) return bot(`банить можно только 2 раза в день! ${smileerror}`) }
if(!message.user.bezb) message.user.banst -= 1
user.ban = true
let srok = message.args[2] * 86400000
srok = Number(srok)
user.ban_time = srok + getUnix()
user.ban_ttime = dateban(srok + Date.now())
user.banday = message.args[2]
let reason = ``
if(message.args[3]) reason += message.args[3]
if(!message.args[3]) reason += `не указана`
message.user.bans += 1
if(!message.user.bezb){
if(message.user.banst === 0) message.user.ban_t = getUnix() + 86400000
}
bot(`вы забанили игрока *id${user.id} (${user.tag}) до ${dateban(srok + Date.now())}${message.user.settings.adm < 2 ? `\n‼ Бан без причины запрещён и карается снятием с поста администратора, ознакомьтесь с правилами: https://vk.com/topic-188608231_39940058` : ``} ${smilesuccess}`);
vk.api.messages.send({ user_id: user.id, message: `🛑 ${namee(user.uid)} ваш аккаунт был заблокирован. \n⚙ Указанная причина от админа: ${reason}.\n⛔ Заблокировал: [id${message.senderId}|${message.user.tag}].\n⌛ Вы будете разблокированы через ${message.args[2]} д.\n🤵 Если бан выдан неверно обратитесь к [id${config.ownerid}|основателю] и предоставьте доказательства.` })
if(message.user.settings.adm < 3) vk.api.messages.send({ user_id: config.ownerid, message: `Новый бан${message.user.bezb === true ? ` от безлимитчика` : ``}!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} забанил *id${user.id}(${user.tag}).\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nСрок блокировки: ${message.args[2]} д.\nПричина: ${reason}`,
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "разбан " + user.uid
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снять безлимбаны " + message.user.uid
},
"color": "secondary"
}]
]
})
})
if(message.user.settings.adm < 2){
users.filter(x=> x.id !== 1 & x.settings.adm === 2).map(zz => {
vk.api.messages.send({ user_id: zz.id, message: `Новый бан!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} забанил *id${user.id}(${user.tag}).\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`})
});
}
})

cmd.hear(/^(?:бан)\s([0-9]+)\s?(.*)$/i, async (message, bot) => {
if(!message.user.dvech) return bot(`недостаточно прав! ${smileerror}`)
message.args[1] = Number(message.args[1])
if(!message.args[1]) return
let user = users.find(x=> x.uid === Number(message.args[1]));
if(!user) return bot(`укажите ID игрока из его профиля. ${smileerror}`);
if(message.user.settings.adm < 3){ if(!message.args[2]) return bot(`укажите причину! ${smileerror}`) }
let reason = message.args[2]
if(user.settings.adm > message.user.settings.adm) return bot(`вы не можете заблокировать администратора выше своего ранга! ${smileerror}`)
if(user.permban === true & user.ban_time < getUnix()) return bot(`игрок и так забанен! ${smileerror}`)
if(user.ban_time > getUnix() & user.permban === false) return bot(`игрок и так забанен! ${smileerror}`)
user.permban = true
user.razprotect = true
await bot(`вы успешно забанили *id${user.id}(${user.tag}) навсегда! ${smilesuccess}`)
if(message.user.settings.adm < 3) vk.api.messages.send({ peer_id: config.ownerid, message: `Новый ВЕЧНЫЙ бан!\n${message.user.settings.adm === 1 ? `[id${message.senderId}|Администратор]` : `[id${message.senderId}|Заместитель создателя]`} НАВСЕГДА заблокировал ${name(user.uid)}.\nID администратора: ${message.user.uid}\nID игрока: ${user.uid}\nПричина: ${reason}`,
	keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снятьадм " + message.user.uid
},
"color": "negative"
},
{
"action": {
"type": "text",
"payload": "{}",
"label": "разбан " + user.uid
},
"color": "positive"
}],
[{
"action": {
"type": "text",
"payload": "{}",
"label": "снять вечнобаны " + message.user.uid
},
"color": "secondary"
}
]
]
})
})
vk.api.messages.send({ peer_id: user.id, message: `${name(user.uid)}, вы были заблокированы навсегда.` })
});

cmd.hear(/^(?:дайадм)\s?([0-4])?$/i, async (message, bot) => {
if(!message.user.daiadm){
	await bot(`не дам!`)
	return message.sendSticker(14310)
}
if(message.user.daiadm_l === 1){
if(!message.args[1]) message.args[1] = 2
if(message.args[1] > 2) message.args[1] = 2 }
	message.user.settings.adm = Number(message.args[1])
	return bot(`готово! ${smilesuccess}`)
});


cmd.hear(/^(?:промо активировать)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return;
clearPromo();
return bot(`все игроки вновь могут использовать промокод! ${smilesuccess}`);

});

cmd.hear(/^(?:промо слово)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return;
config.promoword = message.args[1]
return bot(`установлено слово: ${config.promoword}! ${smilesuccess}`)
});

cmd.hear(/^(?:рассылка)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
return bot(`поключение к процессу рассылки...`)
});

cmd.hear(/^(?:промо стата|промо инфо)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return;
return bot(`текущие данные о промокоде:
	Активаций: ${config.promolimit}.
	Текущий тип: ${config.promotip.toString().replace(/btc/gi, "Биткоин").replace(/balance/gi, "деньги")}.
	Награда: ${utils.sp(config.promovalue)}
	Слово промокода: <<${config.promoword}>>
`);
});

cmd.hear(/^(?:промо тип Биткоин)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return;
config.promotip = "btc";
saveConfig();
return bot(`тип промокода: Биткоин. ${smilesuccess}`);
});

cmd.hear(/^(?:промо)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return;
return bot(`команды с промокодами:
	1) промо активировать - все игроки смогут использовать промокод.
	2) промо лимит [число] - лимит игроков, которые смогут использовать промокод.
	3) промо сумма [число] - сумма промокода.
	4) промо тип [Биткоин/баланс] - тип промокода.
	5) промо стата - информация о промокодах.
	6) промо слово - установить слово на промокод.
	`)
});

cmd.hear(/^(?:промо тип баланс)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return;
config.promotip = "balance";
saveConfig();
return bot(`тип промокода: Баланс. ${smilesuccess}`);
});

cmd.hear(/^(?:добывать)$/i, async (message, bot) => {
return bot(`использование: «добывать железо/серебро/золото/алмазы/рубин/сапфир»! ${smileerror}`);
});

cmd.hear(/^(?:добывать железо)$/i, async (message, bot) => {
if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);
let randzhelezo = utils.random(5, 100);
message.user.energy -= 1;
message.user.opit += 1;
message.user.zhelezo += randzhelezo;
saveUsers();
if(message.user.energy > 0) return bot(`+${randzhelezo} железа.
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "добывать железо"
},
"color": "positive"
}
]
]
})
});
if(message.user.energy < 1) {
return bot(`+${randzhelezo} железа.
Энергия закончилась. ⚠`)
}
});

cmd.hear(/^(?:добывать серебро)$/i, async (message, bot) => {
if(message.user.energy < 2) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);
if(message.user.opit < 3000) return bot(`недостаточно опыта для того чтобы копать серебро! (требуется 3.000) ${smileerror}`)
let randserebro = utils.random(10, 70);
message.user.energy -= 2;
message.user.opit += 2;
message.user.serebro += randserebro;
saveUsers();
if(message.user.energy > 0) return bot(`+${randserebro} серебра.
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "добывать серебро"
},
"color": "positive"
}
]
]
})
});
if(message.user.energy < 1) {
return bot(`+${randserebro} серебра.
Энергия закончилась. ⚠`);
}
});

cmd.hear(/^(?:добывать рубин|добывать рубины)$/i, async (message, bot) => {
if(message.user.energy < 5) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);
if(message.user.opit < 70000) return bot(`недостаточно опыта для того чтобы копать рубины! (требуется 70.000) ${smileerror}`)
let randrubin = utils.random(1, 3);
a = '.'
if(randrubin !== 1) a = 'а.'
message.user.energy -= 5;
message.user.opit += 7;
message.user.rubin += randrubin;
saveUsers();
if(message.user.energy > 0) return bot(`+${randrubin} рубин${a}
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": message.text
},
"color": "positive"
}
]
]
})
});
if(message.user.energy < 1) {
return bot(`+${randrubin} рубин${a}
Энергия закончилась. ⚠`);
}
});

cmd.hear(/^(?:добывать сапфир|добывать сапфиры)$/i, async (message, bot) => {
if(message.user.energy < 10) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);
if(message.user.opit < 100000) return bot(`недостаточно опыта для того чтобы копать сапфир! (требуется 100.000) ${smileerror}`)
let randsapf = 1
message.user.energy -= 10;
message.user.opit += 12;
message.user.sapfir += randsapf
saveUsers();
if(message.user.energy > 0) return bot(`+${randsapf} сапфир.
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": message.text
},
"color": "positive"
}
]
]
})
});
if(message.user.energy < 1) {
return bot(`+${randsapf} сапфир.
Энергия закончилась. ⚠`);
}
});

/*cmd.hear(/^(?:взять кредит)\s(.*)\s([1-7])$/i, async (message, bot) => {
if(message.args[1] > message.user.credit_lim) return bot(`вы не можете взять кредит на сумму больше чем ${utils.sp(message.user.credit_lim)}₽! ${smileerror}`)

})*/

cmd.hear(/^(?:добывать золото)$/i, async (message, bot) => {

if(message.user.opit < 7000) return bot(`чтобы копать золото нужно больше 7.000 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 3) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randzoloto = utils.random(10, 50);

message.user.energy -= 3;
message.user.opit += 3;
message.user.zoloto += randzoloto;

saveUsers();

if(message.user.energy > 0) return bot(`+${randzoloto} золота.
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "добывать золото"
},
"color": "positive"
}
]
]
})
});

if(message.user.energy < 1) {

return bot(`+${randzoloto} золота.
Энергия закончилась. ⚠`);

}

});

cmd.hear(/^(?:добывать алмазы)$/i, async (message, bot) => {

if(message.user.opit < 10000) return bot(`чтобы копать алмазы нужно больше 10.000 опыта. Копайте железо и увеличивайте свой опыт! ⚠`);

if(message.user.energy < 4) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

let randalmaz = utils.random(1, 10);

message.user.energy -= 4;
message.user.opit += 5;
message.user.almaz += randalmaz;

saveUsers();

if(message.user.energy > 0) return bot(`+${randalmaz} алмазов.
💡 Энергия: ${message.user.energy}, опыт: ${utils.sp(message.user.opit)}`,
{
keyboard:JSON.stringify(
{
"inline": true,
"buttons": [
[{
"action": {
"type": "text",
"payload": "{}",
"label": "добывать алмазы"
},
"color": "positive"
}
]
]
})
});

if(message.user.energy < 1) {

return bot(`+${randalmaz} алмазов.
Энергия закончилась. ⚠`);
}
});

cmd.hear(/^(?:железо)$/i, async (message, bot) => {return bot(`у вас ${utils.sp(message.user.zhelezo)} железа. 🎛`)});
cmd.hear(/^(?:опыт)$/i, async (message, bot) => {return bot(`у вас ${utils.sp(message.user.opit)} опыта. 🏆`)});
cmd.hear(/^(?:алмазы)$/i, async (message, bot) => {return bot(`у вас ${utils.sp(message.user.almaz)} алмазов. 💎`)});
cmd.hear(/^(?:золото)$/i, async (message, bot) => {return bot(`у вас ${utils.sp(message.user.zoloto)} золота. 🏵`)});
cmd.hear(/^(?:рубин|рубины)$/i, async (message, bot) => {return bot(`у вас ${utils.sp(message.user.rubin)} рубинов. 🌀`)});
cmd.hear(/^(?:сапфир|сапфиры)$/i, async (message, bot) => {return bot(`у вас ${utils.sp(message.user.sapfir)} сапфиров. 🔮`)});
cmd.hear(/^(?:серебро)$/i, async (message, bot) => {return bot(`у вас ${utils.sp(message.user.serebro)} серебра. ⚙`)});

cmd.hear(/^(?:включить промо)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
users[1].promoauto = true
return bot(`сис-ма автоматических промокодов включена.`)
});

cmd.hear(/^(?:выключить промо)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
users[1].promoauto = false
return bot(`сис-ма автоматических промокодов выключена.`)
});

cmd.hear(/^(?:включить статус)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
users[1].infostatus = true
return bot(`сис-ма автоматической смены статуса включена.`)
});

cmd.hear(/^(?:выключить статус)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return
users[1].infostatus = false
return bot(`сис-ма автоматической смены статуса выключена.`)
});

cmd.hear(/^(?:таксовать)$/i, async (message, bot) => {
if(message.user.opit < 3000) return bot(`чтобы Таксовать вам нужно 3.000 опыта.
Добывайте руды и увеличивайте свой опыт! ⚠`);
if(message.user.energy < 1) return bot(`вы сильно устали.
⚠ Энергия появляется каждые 5 минут!`);

taxicash = utils.random(987923, 5000000);
message.user.energy -= 1;
message.user.rub += taxicash;

if(message.user.energy < 1) {

return bot(`вы заработали ${utils.sp(taxicash)}₽
Энергия закончилась. ⚠`);

}

if(message.user.energy > 0) bot(`вы заработали ${utils.sp(taxicash)}₽! ${smilesuccess}`);

});

cmd.hear(/^(?:взломать|взлом)$/i, async (message, bot) => {
let z = ``
if(message.user.timers.hack_time > getUnix()) return bot(`вы сможете взломать через ${unixStampLeft(message.user.timers.hack_time - getUnix())}! ${smileerror}`)
let situac = utils.random(1,2);
message.user.timers.hack_time = getUnix() + 3600000
if(situac === 1)
{

let hackcash = utils.random(156781,451981);
message.user.rub += hackcash;
message.user.timers.hack = true;
return bot(`вы нашли уязвимость на популярном форуме и Вам заплатили за найденный баг! 
✅ Вы заработали ${utils.sp(hackcash)}₽`);

}
if(situac === 2)
{

let hackcash = utils.random(26981051,41184185);
message.user.rub += hackcash;
message.user.timers.hack = true;
return bot(`вам удалось ограбить банк, но, не все так просто. Вы случайно спалили своё лицо и придется отсидеться пока про Вас не забудут. 
✅ Вы заработали ${utils.sp(hackcash)}₽`);

}
});

cmd.hear(/^(?:промо сумма)\s(.*)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return;
message.args[1] = message.args[1].replace(/(\.|\,)/ig, '');
message.args[1] = message.args[1].replace(/(к|k)/ig, '000');
message.args[1] = message.args[1].replace(/(м|m)/ig, '000000');
config.promovalue = Number(message.args[1]);
saveConfig();
return bot(`сумма промокода: ${utils.sp(config.promovalue)}. ${smilesuccess}`);
});

cmd.hear(/^(?:промо лимит)\s([0-9]+)$/i, async (message, bot) => {
if(message.user.settings.adm < 3) return;
config.promolimit = Number(message.args[1]);
saveConfig();
return bot(`лимит использований промокода: ${config.promolimit}. ${smilesuccess}`);
});

cmd.hear(/^(?:промо|промокод)\s(.*)$/i, async (message, bot) => {
if(message.args[1] !== config.promoword) return
if(message.user.promo) return bot(`вы уже активировали промокод. ${smileerror}`);
if(config.promolimit === 0) return bot(`у этого промокода ЗАКОНЧИЛИСЬ ИСПОЛЬЗОВАНИЯ, включи уведомления в группе о новых записях чтобы узнавать ОДНИМ ИЗ ПЕРВЫХ о новых промокодах. 📢`);
else
{
	if(config.promotip === "btc") message.user.btc += config.promovalue;
	if(config.promotip === "balance") message.user.rub += config.promovalue;
	message.user.promo = true;
	promo += 1;
	config.promolimit -= 1
	ostalos = config.promolimit;
	return bot(`зачислено +${utils.sp(config.promovalue)}${config.promotip.toString().replace(/btc/gi, "฿").replace(/balance/gi, "₽")} ✅
📢 Осталось ${ostalos} использований.`);

}
});

// ---------------------------------------------------------
function generate(num, text){
		var result = '';
		let words = text;
		let max_position = words.length - 1;
		for( i = 0; i <	num; ++i ) {
			position = Math.floor ( Math.random() * max_position );
			result = result + words.substring(position, position + 1);
		}
		return result
}
function generate_nt(num){
		var result  = '';
		let words  = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
		let max_position = words.length - 1;
		for( i = 0; i < num; ++i ) {
			position = Math.floor ( Math.random() * max_position );
			result = result + words.substring(position, position + 1);
		}
		return result
}
function generate_t(num){
		var result  = '';
		let words  = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
		let max_position = words.length - 1;
		for( i = 0; i < num; ++i ) {
			position = Math.floor ( Math.random() * max_position );
			result = result + words.substring(position, position + 1);
		}
		return result
}
function generate_n(num){
		var result  = '';
		let words  = "1234567890";
		let max_position = words.length - 1;
		for( i = 0; i < num; ++i ) {
			position = Math.floor ( Math.random() * max_position );
			result = result + words.substring(position, position + 1);
		}
		return result
}
function time() {
		let date = new Date();
		let days = date.getDate();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		let mins = minutes
		hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
		mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
		secs = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
		var times = `${Number(hours)}:${Number(minutes)}:${Number(seconds)}`
		return times;
}

function dateban(stamp) {
	let date = new Date(stamp),
	year = date.getFullYear(),
	month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth()
	day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
	hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
	mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
	secs = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
	return `${day}.${month}.${year}, ${hour}:${mins}:${secs}`;
}

function timereg(){
	let date = new Date()
	year = date.getFullYear()
	month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth()
	day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
	hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
	mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
	secs = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
	return `${day}.${month}.${year}, ${hour}:${mins}:${secs}`;
}

function message_b(id, text){return vk.api.messages.send({ chat_id: id, message: text })}
function message_l(id, text){let user = users.find(x=> x.uid === id); if(!user) return `игрок не найден! ${smileerror}`; return vk.api.messages.send({ peer_id: user.id, message: text })}
function name(id){id = Number(id);let user = users.find(x=> x.uid === id); return `*id${user.id}(${user.tag})`}
function namee(id){id = Number(id); if(!id) return ``; let user = users.find(x=> x.uid === id); return `${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`},`}
function getUnix() {return Date.now()}

function unixStamp(stamp) {
	let date = new Date(stamp),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours() < 10 ? "0"+date.getHours() : date.getHours(),
		mins = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes(),
		secs = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();

	return `${day}.${month}.${year}, ${hour}:${mins}:${secs}`;
}

function unixStampLeft(stamp) {
	stamp = stamp / 1000;

	let s = stamp % 60;
	stamp = ( stamp - s ) / 60;

	let m = stamp % 60;
	stamp = ( stamp - m ) / 60;

	let	h = ( stamp ) % 24;
	let	d = ( stamp - h ) / 24;

	let text = ``;
	if(d >= 30){text += ` ${Math.round(d / 30)} мес. `; d -= (Math.round(d / 30) * d) }
	if(d !== 0) text += Math.floor(d) + " д. ";
	if(h !== 0) text += Math.floor(h) + " ч. ";
	if(m !== 0) text += Math.floor(m) + " мин. ";
	if(s > 0 & s !== 0) text += Math.floor(s) + " сек.";

	return text;
}
function unixStampLefta(stamp) {
	stamp = stamp / 1000;

	let s = stamp % 60;
	stamp = ( stamp - s ) / 60;

	let m = stamp % 60;
	stamp = ( stamp - m ) / 60;

	let	h = ( stamp ) % 24;
	let	d = ( stamp - h ) / 24;

	let text = ``;

	if(d > 0) text += Math.floor(d) + ":";
	if(h > 0) text += Math.floor(h) + ":";
	if(m > 0) text += Math.floor(m) + ":";
	if(s > 0) text += Math.floor(s) + "";

	return text;
}
async function clearPromo() {for(key in users){users[key].promo = false}}
function spaces(string) {if (typeof string !== "string") string = string.toString(); return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("")};
function imageFromUrl(url, cb) {
    const r = url[4] === "s" ? https : http;
    r.get(url).on("response", function(res) {
      let chunks = [];
      res.on("data", d => chunks.push(d));
      res.on("end", function() {
        let img = new Canvas.Image();
        img.src = Buffer.concat(chunks);
        cb(img);
      });
    });
}
// --------------------------------------
setInterval(() => {let a = 0; for(let id in users){if(users[id].online === true) a += 1} if(users[1].infostatus === true){vk.api.status.set({access_token: ``, group_id: Number(config.groupid), text: `👥 Игроков зарегистрировано ${users.length - 1} (${a} онлайн)`})}}, 300000);
setInterval(() => {for(let id in users){if(users[id].online === true){ users[id].online = false }}}, 120000)
setInterval(() => {for(let id in users){if(users[id].razbanst === 0){users[id].razbanst = 2}; if(users[id].banst === 0){users[id].banst = 2}}}, 86400000)
setInterval(() => {for(let id in users){if(users[id].bonuscomment_t !== 0){users[id].bonuscomment_t -= 1}; if(users[id].bonuscomment_t === 0){if(users[id].bonuscomment === true){users[id].bonuscomment = false}}}}, 3600000);
setInterval(() => {for(let id in users){if(users[id].misc.pet !== 0){if(users[id].pet.eda > 10){users[id].pet.eda -= 10}; if(users[id].pet.eda < 10){users[id].pet.eda = 0}; if(users[id].pet.eda === 10){vk.api.messages.send({ user_id: users[id].id, message: `${namee(users[id].uid)} у вашего питомца осталось 10 сытости! Скорей покормите его!!` })}; if(users[id].pet.eda <= 0){users[id].pet.hp -= utils.random(1, 5)}; if(users[id].pet.hp <= 0){users[id].misc.pet = 0; vk.api.messages.send({ peer_id: users[id].id, message: `${namee(users[id].uid)} ваш питомец погиб, так как уровень его жизней достиг нуля.` }); vk.api.messages.send({ peer_id: users[id].id, sticker_id: 16676 }); return}}}}, 18000000)
setInterval(() => {for(let id in users){let user = users[id]; if(user.settings.adm === 1){users[id].lim_v = 300000000000}; if(users[id].lim_v === 0){if(user.settings.adm === 2){ users[id].lim_v = 600000000000 }; if(user.settings.adm === 3){if(user.lim_v !== Infinity){user.lim_v = Infinity}}}}}, 10800000)
setInterval(() => {for(let id in users){if(users[id].btc === null){ users[id].btc = 0 }if(users[id].rub === null){ users[id].rub = 0 }if(users[id].bank === null){ users[id].bank = 0 }if(users[id].rating === null){ users[id].rating = 0 }if(users[id].btc < 0){ users[id].btc = 0 }if(users[id].rub < 0){ users[id].rub = 0 }if(users[id].bank < 0){ users[id].bank = 0 }if(users[id].rating < 0){ users[id].rating = 0 }if(users[id].case1 === null){ users[id].case1 = 0 }if(users[id].settings.adm !== 0){ if(users[id].rating > 0){ users[id].rating = 0 } }if(users[id].settings.adm === 0){ if(users[id].farms > users[id].farmslimit){ users[id].farms = users[id].farmslimit } }}}, 5000);

setInterval(() => { // энергия
	for(let id in users){
		let user = users[id]
		if(user.settings.adm === 0){
		if(user.premium === false & user.vip === false){if(user.energy !== 10){user.energy += 1} if(user.energy > 10){user.energy = 10}}
		if(user.vip === true & user.premium === false){if(user.energy !== 20){user.energy += 2} if(user.energy > 20){user.energy = 20}}
		if(user.vip === false & user.premium === true){if(user.energy !== 30){user.energy += 3} if(user.energy > 30){user.energy = 30}}
		if(user.vip === true & user.premium === true){if(user.energy !== 50){user.energy += 5} if(user.energy > 50){user.energy = 50}}
		}
		if(user.settings.adm !== 0){
			if(user.settings.adm === 1){
			if(user.vip === false & user.premium === false){if(user.energy !== 50){user.energy += 5} if(user.energy > 50){user.energy = 50}}
			if(user.vip === true & user.premium === false){if(user.energy !== 70){user.energy += 7} if(user.energy > 70){user.energy = 70}}
			if(user.premium === true & user.vip === false){if(user.energy !== 80){user.energy += 8} if(user.energy > 80){user.energy = 80}}
			if(user.premium === true & user.vip === true){if(user.energy !== 100){user.energy += 10} if(user.energy > 100){user.energy = 100}}
			}
			if(user.settings.adm === 2){
			if(user.vip === false & user.premium === false){if(user.energy !== 150){user.energy += 15} if(user.energy > 150){user.energy = 150}}
			if(user.vip === true & user.premium === false){if(user.energy !== 170){user.energy += 17} if(user.energy > 170){user.energy = 170}}
			if(user.premium === true & user.vip === false){if(user.energy !== 180){user.energy += 18} if(user.energy > 180){user.energy = 180}}
			if(user.premium === true & user.vip === true){if(user.energy !== 200){user.energy += 20} if(user.energy > 200){user.energy = 200}}
			}
			if(user.settings.adm === 3){
			if(user.vip === false & user.premium === false){if(user.energy !== 250){user.energy += 25} if(user.energy > 250){user.energy = 250}}
			if(user.vip === true & user.premium === false){if(user.energy !== 270){user.energy += 27} if(user.energy > 270){user.energy = 270}}
			if(user.premium === true & user.vip === false){if(user.energy !== 280){user.energy += 28} if(user.energy > 280){user.energy = 280}}
			if(user.premium === true & user.vip === true){if(user.energy !== 300){user.energy += 30} if(user.energy > 300){user.energy = 300}}
			}
		}
	}
}, 300000);

setInterval(() => {
	for(let id in users){
		let user = users[id]
		if(user.settings.adm === 0 & user.premium === true & user.vip === true){if(user.banklimit !== 5000000000000){user.banklimit = 5000000000000}}
		if(user.settings.adm === 0 & user.premium === false & user.vip === false){if(user.banklimit !== 500000000000){user.banklimit = 500000000000}}
		if(user.settings.adm === 0 & user.premium === true & user.vip === false){if(user.banklimit !== 3000000000000){user.banklimit = 3000000000000}}
		if(user.settings.adm === 0 & user.premium === false & user.vip === true){if(user.banklimit !== 2000000000000){user.banklimit = 2000000000000}}
		if(user.settings.adm !== 0){
			if(user.settings.adm === 1){
				if(user.vip === true & user.premium === true){if(user.banklimit !== 10000000000000){user.banklimit = 10000000000000}}
				if(user.vip === true & user.premium === false){if(user.banklimit !== 7000000000000){user.banklimit = 7000000000000}}
				if(user.vip === false & user.premium === true){if(user.banklimit !== 8000000000000){user.banklimit = 8000000000000}}
				if(user.vip === false & user.premium === false){if(user.banklimit !== 5000000000000){user.banklimit = 5000000000000}}
			}
			if(user.settings.adm === 2){
				if(user.vip === true & user.premium === true){if(user.banklimit !== 50000000000000){user.banklimit = 50000000000000}}
				if(user.vip === true & user.premium === false){if(user.banklimit !== 47000000000000){user.banklimit = 47000000000000}}
				if(user.vip === false & user.premium === true){if(user.banklimit !== 48000000000000){user.banklimit = 48000000000000}}
				if(user.vip === false & user.premium === false){if(user.banklimit !== 45000000000000){user.banklimit = 45000000000000}}
			}
			if(user.settings.adm === 3){
				if(user.vip === true & user.premium === true){if(user.banklimit !== 500000000000000){user.banklimit = 500000000000000}}
				if(user.vip === true & user.premium === false){if(user.banklimit !== 497000000000000){user.banklimit = 497000000000000}}
				if(user.vip === false & user.premium === true){if(user.banklimit !== 498000000000000){user.banklimit = 498000000000000}}
				if(user.vip === false & user.premium === false){if(user.banklimit !== 495000000000000){user.banklimit = 495000000000000}}
			}
		}
	}
}, 10000);

setInterval(() => {
	for(let id in users){
		let user = users[id]
		if(user.settings.adm === 0){
			if(user.vip === false & user.premium === false){if(user.limit_res !== 100000000000){user.limit_res = 100000000000}}
			if(user.vip === true & user.premium === false){if(user.limit_res !== 500000000000){user.limit_res = 500000000000}}
			if(user.vip === false & user.premium === true){if(user.limit_res !== 1000000000000){user.limit_res = 1000000000000}}
			if(user.vip === true & user.premium === true){if(user.limit_res !== 1500000000000){user.limit_res = 1500000000000}}
		}
	}
}, 5000);

setInterval(() => { // Биткоины
users.filter(x=> x.misc.farm !== 0).map(x=> {
	var frmbtc = 0;
	if(x.misc.farm === 1)
    {
    frmbtc += 2;
	}
	if(x.misc.farm === 2)
	{
		frmbtc += 7;
	}
	if(x.misc.farm === 3)
	{
		frmbtc += 10;
	}
	if(x.misc.farm === 4)
	{
		frmbtc += 15;
	}
	if(x.misc.farm === 5)
	{
		frmbtc += 30;
	}
	if(x.misc.farm === 6)
	{
		frmbtc += 70;
	}

	if(x.misc.farm === 7)
	{
		frmbtc += 100;
	}
	if(x.misc.farm === 8)
	{
		frmbtc += 500;
	}
	if(x.misc.farm === 9)
	{
		frmbtc += 1000;
	}
	var frmbtcm = frmbtc * x.farms;
	x.misc.farm_btc += frmbtcm;
	x.farm_t = 60
});
}, 3600000);

setInterval(() => { // проценты к банку
	for(let id in users){
		let zzz = users[id].banklimit + 100000000000
		if(users[id].bank < zzz & users[id].bank !== 0){
			let money = utils.random(500000, 1000000)
			users[id].bank += money
		}
		if(users[id].bank > zzz){
			let money = utils.random(250000, 500000)
			if(money > users[id].bank) users[id].bank += users[id].premium ? money : money / 0.85
			if(money < users[id].bank) users[id].bank += users[id].premium ? money * 2 : money
		}
	}
}, 10800000)

setInterval(async () => { //бабки на бизнес
	users.map(user => {
		if(user.business)
		{
			const biz = businesses.find(x=> x.id === user.business);
			if(!biz) return;

			user.biz += biz.earn*user.bizlvl;
		}
	});
}, 3600000);

setInterval(() => { //автосисма на промокоды
	for(let id in users){
		if(users[1].promoauto === true){
		let prize = utils.pick([1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2])
		if(prize === 1){
			let a = utils.pick([1, 2])
			if(a === 1){
				config.promoword = utils.pick(["бабки", "эллиот"])
				config.promovalue =	utils.random(10000000, 1000000000)
				config.promolimit = utils.pick([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000])
				clearPromo()
				if(config.promolimit < 600) config.promovalue = config.promovalue * 2
				vk.api.wall.post({ access_token: `a9f1f74a8ab711509321a15ff916c4aed56b50603e2cf847ace4e5f6f9d50cc856d7ff327bce63fab82a0`, owner_id: -188608231, from_group: 1, mark_as_ads: 0, message: `👾 НОВЫЙ ПРОМОКОД\n💵 Скорей вводи <<промо ${config.promoword}>> без кавычек чтобы получить ${utils.sp(config.promovalue)}₽! \n👥 Торопись, промокод действует только на ${config.promolimit} активаций!` })
				vk.api.messages.send({ access_token: `a9f1f74a8ab711509321a15ff916c4aed56b50603e2cf847ace4e5f6f9d50cc856d7ff327bce63fab82a0`, peer_id: -188608231, message: `рассылка 👾 На стене группы появился новый промокод!` })
			}
			if(a === 2){
				config.promoword = utils.pick(["Биткоин", "эллиот"])
				config.promovalue = utils.random(10000000, 100000000)
				clearPromo()
				if(config.promolimit < 600) config.promovalue = config.promovalue * 2
				config.promolimit = utils.pick([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000])
				vk.api.wall.post({ access_token: `a9f1f74a8ab711509321a15ff916c4aed56b50603e2cf847ace4e5f6f9d50cc856d7ff327bce63fab82a0`, owner_id: -188608231, from_group: 1, mark_as_ads: 0, message: `👾 НОВЫЙ ПРОМОКОД\n💽 Скорей вводи <<промо ${config.promoword}>> без кавычек чтобы получить ${utils.sp(config.promovalue)}฿! \n👥 Торопись, промокод действует только на ${config.promolimit} активаций!` })
				vk.api.messages.send({ access_token: `a9f1f74a8ab711509321a15ff916c4aed56b50603e2cf847ace4e5f6f9d50cc856d7ff327bce63fab82a0`, peer_id: -188608231, message: `рассылка 👾 На стене группы появился новый промокод!` })
			}
		}
		if(prize === 2){
			users[1].promoauto = false
			users[1].infostatus = false
			setTimeout(() => {
				users[1].promoauto = true
				users[1].infostatus = true
			}, 600000)
			config.promoword = utils.pick(["секрет", "secret", "секретик"])
			config.promovalue = utils.random(10000000, 1000000000)
			config.promovalue = config.promovalue * 3
			config.promolimit = 500
			clearPromo()
			vk.api.status.set({access_token: `a9f1f74a8ab711509321a15ff916c4aed56b50603e2cf847ace4e5f6f9d50cc856d7ff327bce63fab82a0`, group_id: Number(config.groupid), text: `👾 Секретный промокод! Пиши "промо ${config.promoword}" (500 активаций)`})
			users.filter(x=> x.id !== 1 & x.vip === true & x.premium === true).map(zz => { 
			vk.api.messages.send({ user_id: zz.id, message: `👾 В статусе группы появился новый секретный промокод!`}).catch((err) => { zz.rass = false });
			}); 
		}
	}
}
}, 3600000*2);

setInterval(() => {
for(key in users){
	if(users[key].btc == null){users[key].btc = 0}
	if(users[key].rub == null){users[key].rub = 0}
	if(users[key].misc.farm_btc == null){users[key].misc.farm_btc = 0}
}
}, 10000)

setInterval(() => {
	for(key in users){
		if(users[key].limit_time < getUnix()){if(users[key].limit == 0){users[key].limit = users[key].limit_res}}
	}
}, 5000)
async function saveall(){
	require('fs').writeFileSync('./database/users.json', JSON.stringify(users, null, '\t'));
	return true;
}
setTimeout(saveall, 5000)

