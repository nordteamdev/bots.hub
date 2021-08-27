-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 10.0.0.57
-- Время создания: Дек 09 2018 г., 18:36
-- Версия сервера: 5.7.22-22
-- Версия PHP: 7.1.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `a0270070_alina`
--

-- --------------------------------------------------------

--
-- Структура таблицы `buisness`
--

CREATE TABLE `buisness` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `income` double NOT NULL,
  `price` double NOT NULL,
  `lvl_1` double DEFAULT NULL,
  `lvl_2` double DEFAULT NULL,
  `lvl_3` double DEFAULT NULL,
  `lvl_4` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `buisness`
--

INSERT INTO `buisness` (`id`, `name`, `income`, `price`, `lvl_1`, `lvl_2`, `lvl_3`, `lvl_4`) VALUES
(1, 'Лавка на рынке', 500, 90000, 500, 750, 1000, 1500),
(2, 'Магазин', 4000, 720000, 4000, 6000, 8000, 1000),
(3, 'Автосервис', 32000, 5760000, 32000, 64000, 86000, 118000),
(4, 'Завод', 250000, 46000000, 250000, 375000, 500000, 625000),
(5, 'Компьютерные технологии', 2000000, 368000000, 2000000, 3000000, 4000000, 5000000),
(6, 'Компания Abble', 16000000, 3000000000, 16000000, 24000000, 32000000, 40000000),
(7, 'Компания Foofle', 130000000, 20000000000, 130000000, 195000000, 260000000, 325000000),
(8, 'Научная лаборатория', 1000000000, 200000000000, 1000000000, 1500000000, 2000000000, 2500000000),
(9, 'Компания по производству технологий будущего', 8300000000, 1500000000000, 8300000000, 12450000000, 16600000000, 25750000000);

-- --------------------------------------------------------

--
-- Структура таблицы `car`
--

CREATE TABLE `car` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `sell_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `car`
--

INSERT INTO `car` (`id`, `name`, `price`, `sell_price`) VALUES
(1, 'Ferrari Enzo V5 ', 10200000, 5100000),
(2, 'Bugatti Chiron', 22000000, 11000000),
(3, 'McLaren F1 ', 30000000, 15000000),
(4, 'Lamborghini Avendator LP70 ', 41000000, 20500000),
(5, 'SSC Tuatara', 59000000, 28000000),
(6, 'Buggati Veyron Super ', 80000000, 40000000);

-- --------------------------------------------------------

--
-- Структура таблицы `Clans`
--

CREATE TABLE `Clans` (
  `id` int(11) NOT NULL,
  `lvl` int(11) NOT NULL DEFAULT '1',
  `name` text COLLATE utf8_unicode_ci,
  `balance` double DEFAULT NULL,
  `members` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `admin` int(11) NOT NULL,
  `exp` double NOT NULL DEFAULT '0',
  `private` int(11) NOT NULL DEFAULT '1',
  `date_reg` text COLLATE utf8_unicode_ci,
  `zam` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `races_points` double DEFAULT NULL,
  `race_balance` double DEFAULT NULL,
  `silent` int(11) NOT NULL DEFAULT '0',
  `last_notif` text COLLATE utf8_unicode_ci,
  `bonuse_job_lvl` double NOT NULL DEFAULT '1',
  `bonuse_games_lvl` double NOT NULL DEFAULT '1',
  `bonuse_farm_lvl` double NOT NULL DEFAULT '1',
  `bonuse_buisness_lvl` double NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `costume`
--

CREATE TABLE `costume` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `mask_id` int(11) NOT NULL,
  `stamp_production` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `costume`
--

INSERT INTO `costume` (`id`, `name`, `price`, `mask_id`, `stamp_production`) VALUES
(1, 'Dark Costume', 10000000000, 1, 1),
(2, 'Light Costume', 15000000000, 2, 2),
(3, 'Lucky Costume', 40000000000, 3, 4),
(4, 'Red Costume', 60000000000, 4, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `farm`
--

CREATE TABLE `farm` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `production` int(11) NOT NULL,
  `price` double NOT NULL,
  `sell_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `farm`
--

INSERT INTO `farm` (`id`, `name`, `production`, `price`, `sell_price`) VALUES
(1, 'MainFarm240', 5, 200000000, 100000000),
(2, 'MainFarm480', 25, 600000000, 300000000),
(3, 'MainFarm720', 50, 1120000000, 660000000),
(4, 'MainFarm1080', 110, 2000000000, 1000000000),
(5, 'XMainFarm1080', 250, 6500000000, 2147483647);

-- --------------------------------------------------------

--
-- Структура таблицы `farmTPC`
--

CREATE TABLE `farmTPC` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `production` int(11) NOT NULL,
  `price` double NOT NULL,
  `sell_price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `farmTPC`
--

INSERT INTO `farmTPC` (`id`, `name`, `production`, `price`, `sell_price`) VALUES
(1, 'TaiFarmx5', 5, 200000000000, 100000000000),
(2, 'TaiFarmx10', 10, 1000000000000, 500000000000),
(3, 'TaiFarmx50', 50, 5000000000000, 2500000000000),
(1028, 'Тайпанская ферма', 10901090, 4000000000000, 4000000000000);

-- --------------------------------------------------------

--
-- Структура таблицы `house`
--

CREATE TABLE `house` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `sell_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `house`
--

INSERT INTO `house` (`id`, `name`, `price`, `sell_price`) VALUES
(1, 'Шкаф', 500, 250),
(2, 'Гараж ', 100000, 50000),
(3, 'Общага', 500000, 250000),
(4, 'Двушка на окраине ', 10000000, 5000000),
(5, 'Трёшка в центре ', 40000000, 20000000),
(6, 'Усадьба Рыболовлева', 95000000, 47000000),
(7, 'Fleur De Lys', 125000000, 62000000),
(8, 'The Manor ', 150000000, 75000000),
(9, 'Pinnacle ', 155000000, 77000000),
(10, 'Franchuk Villa', 161000000, 80000000),
(11, 'The Hearst Mansion ', 165000000, 82000000),
(12, 'Fairfield Pond', 198000000, 99000000),
(13, 'Villa Leopolda ', 736000000, 368000000),
(14, 'Antilla', 1000000000, 500000000);

-- --------------------------------------------------------

--
-- Структура таблицы `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci,
  `income` double NOT NULL,
  `exp` int(11) NOT NULL,
  `type` text COLLATE utf8_unicode_ci NOT NULL,
  `job_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `jobs`
--

INSERT INTO `jobs` (`id`, `name`, `income`, `exp`, `type`, `job_id`) VALUES
(1, 'Водитель', 2000, 0, 'transport', 1),
(2, 'Диспетчер', 3000, 224, 'transport', 2),
(3, 'Инструктор по вождению', 4000, 343, 'transport', 3),
(4, 'Механик-водитель', 5333.3333333332, 406, 'transport', 4),
(5, 'Транспортный инженер', 6666.6666666668, 497, 'transport', 5),
(6, 'Актёр', 8333.3333333332, 637, 'kino', 1),
(7, 'Актёр озвучивания', 10000, 714, 'kino', 2),
(8, 'Каскадёр', 13333.333333333, 805, 'kino', 3),
(9, 'Гримёр', 15555.555555556, 910, 'kino', 4),
(10, 'Кинорежиссёр', 23333.333333334, 987, 'kino', 5),
(11, 'Кинопродюсер', 29166.666666666, 1099, 'kino', 6),
(12, 'Кинооператор', 38888.888888888, 1218, 'kino', 7),
(13, 'Постановщик трюков', 51851.851851852, 1302, 'kino', 8),
(14, 'Дегустатор', 77777.777777776, 1393, 'kulinar', 1),
(15, 'Бармен', 97222.222222224, 1505, 'kulinar', 2),
(16, 'Официант', 129629.62962963, 1617, 'kulinar', 3),
(17, 'Пекарь', 151234.56790124, 1708, 'kulinar', 4),
(18, 'Повар', 189043.20987654, 1799, 'kulinar', 5),
(19, 'Ресторанный критик', 252057.61316872, 1869, 'kulinar', 6),
(20, 'Барабанщик', 378086.41975308, 2009, 'music', 1),
(21, 'Басист', 504115.22633744, 2100, 'music', 2),
(22, 'Пианист', 672153.6351166, 2198, 'music', 3),
(23, 'Певец', 896204.84682212, 2282, 'music', 4),
(24, 'Автор песен', 1344307.2702332, 2373, 'music', 5),
(25, 'Диджей', 1792409.6936443, 2457, 'music', 6),
(26, 'Аптекарь', 2150891.6323732, 2576, 'medic', 1),
(27, 'Архиятр', 2458161.8655692, 2695, 'medic', 2),
(28, 'Врач', 3687242.798354, 2765, 'medic', 3),
(29, 'Врач-ординатор', 4916323.7311384, 2870, 'medic', 4),
(30, 'Диетолог', 5618655.6927296, 2961, 'medic', 5),
(31, 'Лекарь', 6555098.3081848, 3066, 'medic', 6),
(32, 'Невролог', 7866117.9698216, 3150, 'medic', 7),
(33, 'Токсиколог', 11799176.954732, 3276, 'medic', 8),
(34, 'Хирург', 17698765.432099, 3353, 'medic', 9),
(35, 'Инженер', 20648559.670782, 3458, 'ingineer', 1),
(36, 'Изобретатель', 25810699.588478, 3577, 'ingineer', 2),
(37, 'Инженер-геодезист', 30972839.506172, 3647, 'ingineer', 3),
(38, 'Инженер-конструктор', 38716049.382716, 3731, 'ingineer', 4),
(39, 'Инженер-прочнист', 46459259.25926, 3836, 'ingineer', 5),
(40, 'Инженер-сметчик', 61945679.012344, 3969, 'ingineer', 6),
(41, 'Инженер-технолог', 77432098.765432, 4025, 'ingineer', 7),
(42, 'Инженер-электроник', 116148148.14815, 4151, 'ingineer', 8),
(43, 'Юрист', 145185185.18518, 4256, 'yr', 1),
(44, 'Адвокат', 169382716.04938, 4340, 'yr', 2),
(45, 'Военный юрист', 254074074.07408, 4459, 'yr', 3),
(46, 'Дознаватель', 296419753.08642, 4529, 'yr', 4),
(47, 'Королевский адвокат', 338765432.09876, 4634, 'yr', 5),
(48, 'Следователь', 387160493.82716, 4746, 'yr', 6),
(49, 'Следственный судья', 516213991.76956, 4809, 'yr', 7),
(50, 'Судебный писарь', 774320987.65432, 4928, 'yr', 8),
(51, 'Судебный пристав', 884938271.60492, 5033, 'yr', 9),
(52, 'Судья', 1106172839.5062, 5138, 'yr', 10),
(53, 'Мировой судья', 1382716049.3827, 5215, 'yr', 11),
(54, 'Аналитик программного обеспечения', 1843621399.177, 5306, 'it', 1),
(55, 'Архитектор программного обеспечения', 2304526748.9712, 5404, 'it', 2),
(56, 'Администратор вычислительной сети', 2688614540.4664, 5509, 'it', 3),
(57, 'Администратор баз данных', 3136716963.8774, 5621, 'it', 4),
(58, 'Администратор защиты', 3920896204.8468, 5691, 'it', 5),
(59, 'Контент-менеджер', 4574378905.6548, 5824, 'it', 6),
(60, 'Тестировщик', 5227861606.4624, 5894, 'it', 7),
(61, 'Системный аналитик', 6970482141.95, 5999, 'it', 8),
(62, 'ИТ-евангелист', 8364578570.34, 6090, 'it', 9),
(63, 'Ведущий программист', 10455723212.925, 6202, 'it', 10),
(64, 'Разработчик видеоигр', 13940964283.9, 6286, 'it', 11);

-- --------------------------------------------------------

--
-- Структура таблицы `keyss`
--

CREATE TABLE `keyss` (
  `keyd` text COLLATE utf8_unicode_ci NOT NULL,
  `reward` double NOT NULL,
  `countactive` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `keyss`
--

INSERT INTO `keyss` (`keyd`, `reward`, `countactive`) VALUES
('ETXH-IWXQ-NQSI-IRSK', 20000000000, 62);

-- --------------------------------------------------------

--
-- Структура таблицы `kvart`
--

CREATE TABLE `kvart` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `sell_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `kvart`
--

INSERT INTO `kvart` (`id`, `name`, `price`, `sell_price`) VALUES
(1, 'Коробка с ватой', 50, 25),
(2, 'Апартаменты в Италии ', 8000000, 4000000),
(3, 'Квартира в Дубае ', 12000000, 6000000),
(4, 'Пентхаус у моря ', 20000000, 10000000),
(5, 'Квартира в Токио ', 21000000, 10500000),
(6, 'Пентхаус в Нью-Йорке', 31000000, 15500000),
(7, 'Квартира в Moscow City', 39500000, 20000000),
(8, 'Мусорка на Рублёвке', 43300000, 21500000);

-- --------------------------------------------------------

--
-- Структура таблицы `machgun`
--

CREATE TABLE `machgun` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `prozent_study` int(11) NOT NULL,
  `prozent_time` int(11) NOT NULL,
  `min_lvl` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `mask`
--

CREATE TABLE `mask` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `bonuse_bank` int(11) NOT NULL,
  `bonuse_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `mask`
--

INSERT INTO `mask` (`id`, `name`, `price`, `bonuse_bank`, `bonuse_time`) VALUES
(1, 'Mask Cabal', 2000000000, 1, 20),
(2, 'Mask Corvo Attano', 10000000000, 1, 30),
(3, 'Shadow Mask', 50000000000, 2, 45),
(4, 'Jack Mask', 100000000000, 3, 60);

-- --------------------------------------------------------

--
-- Структура таблицы `monetka`
--

CREATE TABLE `monetka` (
  `id` int(11) NOT NULL,
  `stavka` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `summa` double NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `moto`
--

CREATE TABLE `moto` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `sell_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `moto`
--

INSERT INTO `moto` (`id`, `name`, `price`, `sell_price`) VALUES
(1, 'Honda Motor CO', 100000, 50000),
(2, 'Yamaha Black Co', 295000, 150000),
(3, 'Suzuki Motor New', 500000, 250000),
(4, 'Kawasaki Heavy GreenSport', 1000000, 500000),
(5, 'Ducati Motor Exclusion', 1200000, 600000);

-- --------------------------------------------------------

--
-- Структура таблицы `samolet`
--

CREATE TABLE `samolet` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `sell_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `samolet`
--

INSERT INTO `samolet` (`id`, `name`, `price`, `sell_price`) VALUES
(1, 'Typolev Ty-144 ', 3000000, 1500000),
(2, 'Gen Dynamics F-111 ', 7000000, 3500000),
(3, 'McDonell Douglas Eagle', 12000000, 6000000),
(4, 'MigC-131 ', 17000000, 8500000),
(5, 'XB-70 Rhyno ', 21000000, 10500000),
(6, 'Bell X-2', 29000000, 15000000),
(7, 'Lockheed YF-12 ', 3100000, 1550000),
(8, 'SR-71 Blackbird ', 34000000, 17000000),
(9, 'North American X-15 ', 40000000, 2000000);

-- --------------------------------------------------------

--
-- Структура таблицы `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `value` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `skills`
--

INSERT INTO `skills` (`id`, `name`, `price`, `value`) VALUES
(1, 'Автосбор с ферм', 10, 'auto_farm'),
(2, 'Автосбор с бизнеса', 5, 'auto_buisness');

-- --------------------------------------------------------

--
-- Структура таблицы `table`
--

CREATE TABLE `table` (
  `id` int(11) NOT NULL,
  `summ` double DEFAULT NULL,
  `players` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `table`
--

INSERT INTO `table` (`id`, `summ`, `players`) VALUES
(1, 32530643996.56, '[\"2607\",\"2495\",\"2707\",\"2749\",\"2074\",\"348\",\"1577\",\"2985\",\"3005\",\"2797\"]');

-- --------------------------------------------------------

--
-- Структура таблицы `telephone`
--

CREATE TABLE `telephone` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `sell_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `telephone`
--

INSERT INTO `telephone` (`id`, `name`, `price`, `sell_price`) VALUES
(1, 'Huawei P-8 Lite 5000', 5000, 2500),
(2, 'Nokia 3310 ', 6500, 3200),
(3, 'Xiaomi MiMax-2 ', 9000, 4500),
(4, 'Sony XA1 Black ', 11000, 5500),
(5, 'LG G6 ', 15000, 7500),
(6, 'Samsung Galaxy C5 Pro ', 21000, 10500),
(7, 'OnePlus5 ', 27000, 13500),
(8, 'Huawei Honor S9', 32000, 18000),
(9, 'HTC U11 ', 36000, 18000),
(10, 'Samsung Galaxy S8 ', 42000, 21000),
(11, 'Iphone 8 ', 51000, 25500),
(12, 'Iphone X ', 100000, 50000),
(13, 'Nokia GoldX ', 291000, 150000);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `banned` int(11) NOT NULL DEFAULT '0',
  `bans` json DEFAULT NULL,
  `banned_tr` int(11) NOT NULL DEFAULT '0',
  `role` int(11) NOT NULL DEFAULT '1',
  `name` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `skills` json DEFAULT NULL,
  `id_VK` int(11) NOT NULL,
  `BTC` double DEFAULT NULL,
  `donate_balance` double DEFAULT NULL,
  `TPC` double NOT NULL DEFAULT '0',
  `balance` double NOT NULL,
  `invisible_role` int(11) DEFAULT NULL,
  `bank` double DEFAULT '0',
  `rating` double NOT NULL DEFAULT '0',
  `bank_time` int(11) DEFAULT NULL,
  `mask_id` int(11) DEFAULT NULL,
  `costume_id` int(11) DEFAULT NULL,
  `nicknf` int(2) DEFAULT NULL,
  `time_bonuse` int(11) NOT NULL DEFAULT '1',
  `job_exp` int(11) NOT NULL DEFAULT '1',
  `count_job` int(11) DEFAULT NULL,
  `time_job` int(11) DEFAULT '0',
  `limit_assemble` int(11) NOT NULL DEFAULT '24',
  `date_reg` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `time_transfer` int(11) DEFAULT NULL,
  `date_transfer` mediumtext COLLATE utf8mb4_bin,
  `summ_transfer` double DEFAULT NULL,
  `one_limit_transfer` double NOT NULL DEFAULT '5000000000',
  `id_transfer` mediumtext COLLATE utf8mb4_bin,
  `monetka` int(11) NOT NULL DEFAULT '0',
  `count_alarm` int(11) DEFAULT NULL,
  `time_alarm` int(11) DEFAULT '1',
  `chance_set` int(11) DEFAULT '1',
  `roulette_chance` int(11) DEFAULT '0',
  `active` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `keyd` int(11) NOT NULL DEFAULT '0',
  `key_time` mediumtext COLLATE utf8mb4_bin,
  `ref` mediumtext COLLATE utf8mb4_bin,
  `gowin` int(11) DEFAULT '0',
  `markertop` int(11) NOT NULL DEFAULT '0',
  `gift_day` int(11) NOT NULL DEFAULT '1',
  `gift_time` int(11) DEFAULT NULL,
  `fl_count` int(11) DEFAULT NULL,
  `fl_summ` double DEFAULT NULL,
  `fl_field` int(11) DEFAULT NULL,
  `kbd` int(11) DEFAULT '0',
  `notif` int(11) NOT NULL DEFAULT '1',
  `img` int(11) NOT NULL DEFAULT '0',
  `pet` mediumtext COLLATE utf8mb4_bin,
  `pet_id` int(11) NOT NULL DEFAULT '0',
  `lvl_exp` double NOT NULL DEFAULT '0',
  `lvl` int(11) DEFAULT '1',
  `need_exp` double NOT NULL DEFAULT '10',
  `marry_list` longtext COLLATE utf8mb4_bin,
  `marry_parther` int(11) NOT NULL DEFAULT '0',
  `fl_admin` int(11) NOT NULL DEFAULT '0',
  `automate_on` int(11) NOT NULL DEFAULT '0',
  `stakan_on` int(11) NOT NULL DEFAULT '0',
  `bank_on` int(11) DEFAULT '0',
  `prefix` int(11) NOT NULL DEFAULT '1',
  `invisible` int(11) DEFAULT '0',
  `nelegal_role` int(11) DEFAULT '0',
  `nelegal_time` int(11) NOT NULL DEFAULT '0',
  `bantime` double NOT NULL DEFAULT '0',
  `ban_text` mediumtext COLLATE utf8mb4_bin,
  `clan_id` int(11) NOT NULL DEFAULT '0',
  `tasks` longtext COLLATE utf8mb4_bin,
  `task_nf` int(11) NOT NULL DEFAULT '0',
  `like_nf` int(11) NOT NULL DEFAULT '0',
  `active_day` text COLLATE utf8mb4_bin,
  `keyb` longtext COLLATE utf8mb4_bin,
  `stamp` double DEFAULT NULL,
  `car` text COLLATE utf8mb4_bin,
  `car_id` int(11) DEFAULT NULL,
  `house` text COLLATE utf8mb4_bin,
  `house_id` int(11) DEFAULT NULL,
  `moto` text COLLATE utf8mb4_bin,
  `moto_id` int(11) DEFAULT NULL,
  `samolet` text COLLATE utf8mb4_bin,
  `samolet_id` int(11) DEFAULT NULL,
  `telephone` text COLLATE utf8mb4_bin,
  `telephone_id` int(11) DEFAULT NULL,
  `name_farm` text COLLATE utf8mb4_bin,
  `id_farm` int(11) DEFAULT NULL,
  `count_farm` int(11) DEFAULT NULL,
  `time_farm` int(11) DEFAULT NULL,
  `name_farmTPC` text COLLATE utf8mb4_bin,
  `id_farmTPC` int(11) DEFAULT NULL,
  `count_farmTPC` int(11) DEFAULT NULL,
  `time_farmTPC` int(11) DEFAULT NULL,
  `graphics_card` int(11) NOT NULL DEFAULT '1',
  `motherboard` int(11) NOT NULL DEFAULT '1',
  `block_power` int(11) NOT NULL DEFAULT '1',
  `cpu` int(11) NOT NULL DEFAULT '1',
  `ram` int(11) NOT NULL DEFAULT '1',
  `buisness` text COLLATE utf8mb4_bin,
  `buisness_time` double DEFAULT NULL,
  `buisness_income` double NOT NULL,
  `buisness_lvl` int(11) NOT NULL DEFAULT '1',
  `buisness_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `kvart_id` int(11) DEFAULT NULL,
  `kvart` text COLLATE utf8mb4_bin,
  `vert` text COLLATE utf8mb4_bin,
  `vert_id` int(11) DEFAULT NULL,
  `credit` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `banned`, `bans`, `banned_tr`, `role`, `name`, `skills`, `id_VK`, `BTC`, `donate_balance`, `TPC`, `balance`, `invisible_role`, `bank`, `rating`, `bank_time`, `mask_id`, `costume_id`, `nicknf`, `time_bonuse`, `job_exp`, `count_job`, `time_job`, `limit_assemble`, `date_reg`, `time_transfer`, `date_transfer`, `summ_transfer`, `one_limit_transfer`, `id_transfer`, `monetka`, `count_alarm`, `time_alarm`, `chance_set`, `roulette_chance`, `active`, `keyd`, `key_time`, `ref`, `gowin`, `markertop`, `gift_day`, `gift_time`, `fl_count`, `fl_summ`, `fl_field`, `kbd`, `notif`, `img`, `pet`, `pet_id`, `lvl_exp`, `lvl`, `need_exp`, `marry_list`, `marry_parther`, `fl_admin`, `automate_on`, `stakan_on`, `bank_on`, `prefix`, `invisible`, `nelegal_role`, `nelegal_time`, `bantime`, `ban_text`, `clan_id`, `tasks`, `task_nf`, `like_nf`, `active_day`, `keyb`, `stamp`, `car`, `car_id`, `house`, `house_id`, `moto`, `moto_id`, `samolet`, `samolet_id`, `telephone`, `telephone_id`, `name_farm`, `id_farm`, `count_farm`, `time_farm`, `name_farmTPC`, `id_farmTPC`, `count_farmTPC`, `time_farmTPC`, `graphics_card`, `motherboard`, `block_power`, `cpu`, `ram`, `buisness`, `buisness_time`, `buisness_income`, `buisness_lvl`, `buisness_id`, `job_id`, `kvart_id`, `kvart`, `vert`, `vert_id`, `credit`) VALUES
(1, 0, NULL, 0, 6, 'RIconc', NULL, 336041508, 100, 0, 100, 9.99999993001e20, NULL, 0, 0, 1544370210, NULL, NULL, NULL, 1544416361, 1, NULL, 0, 24, '08.12.2018, 12:11', NULL, NULL, 0, 5000000000, NULL, 0, NULL, 1, 1, 0, '09.12.18,05:12', 0, NULL, NULL, 0, 0, 1, NULL, NULL, NULL, NULL, 0, 1, 0, NULL, 0, 40, 5, 20, NULL, 0, 0, 0, 0, 0, 0, 1, 6, 0, 0, NULL, 0, '{\"every_day_tasks\":[{\"id\":10,\"count_task\":6000,\"complete\":0},{\"id\":8,\"count_task\":35,\"complete\":0},{\"id\":9,\"count_task\":5,\"complete\":2},{\"id\":9,\"count_task\":1,\"complete\":2},{\"id\":11,\"count_task\":3000,\"complete\":0}]}', 0, 1, '09.12.2018, 18:31:45', '{\"one_time\":false,\"buttons\":[[{\"action\":{\"type\":\"text\",\"label\":\"Команды\"},\"color\":\"primary\"},{\"action\":{\"type\":\"text\",\"label\":\"Очистить кнопки\"},\"color\":\"negative\"}]]}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'MainFarm1080', 4, 1000, 1544366985, 'TaiFarmx50', 3, 1, 1544366945, 1, 1, 1, 1, 1, NULL, NULL, 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `vert`
--

CREATE TABLE `vert` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `sell_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Дамп данных таблицы `vert`
--

INSERT INTO `vert` (`id`, `name`, `price`, `sell_price`) VALUES
(1, 'Sikorsky S-70C ', 5000000, 2500000),
(2, 'Robinson R-44(sV) ', 9000000, 4500000),
(3, 'Eurocopter V135 ', 20000000, 10000000),
(4, 'Bell V-402 ', 22000000, 11000000),
(5, 'Agusta A.10-9 ', 25000000, 12500000),
(6, 'Hughes-500 ', 31000000, 15500000),
(7, 'Bell V-Cell Osprey', 43000000, 21500000);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `buisness`
--
ALTER TABLE `buisness`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Clans`
--
ALTER TABLE `Clans`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `costume`
--
ALTER TABLE `costume`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `farm`
--
ALTER TABLE `farm`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `farmTPC`
--
ALTER TABLE `farmTPC`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `house`
--
ALTER TABLE `house`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `kvart`
--
ALTER TABLE `kvart`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `machgun`
--
ALTER TABLE `machgun`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `mask`
--
ALTER TABLE `mask`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `monetka`
--
ALTER TABLE `monetka`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `moto`
--
ALTER TABLE `moto`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `samolet`
--
ALTER TABLE `samolet`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `telephone`
--
ALTER TABLE `telephone`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idvk` (`id_VK`);

--
-- Индексы таблицы `vert`
--
ALTER TABLE `vert`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `buisness`
--
ALTER TABLE `buisness`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `car`
--
ALTER TABLE `car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `Clans`
--
ALTER TABLE `Clans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT для таблицы `costume`
--
ALTER TABLE `costume`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `farm`
--
ALTER TABLE `farm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `farmTPC`
--
ALTER TABLE `farmTPC`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1029;

--
-- AUTO_INCREMENT для таблицы `house`
--
ALTER TABLE `house`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT для таблицы `kvart`
--
ALTER TABLE `kvart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `machgun`
--
ALTER TABLE `machgun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `mask`
--
ALTER TABLE `mask`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `moto`
--
ALTER TABLE `moto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `samolet`
--
ALTER TABLE `samolet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `telephone`
--
ALTER TABLE `telephone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `vert`
--
ALTER TABLE `vert`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
