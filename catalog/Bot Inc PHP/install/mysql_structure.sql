SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


CREATE TABLE `functions` (
  `id`          INT(11)                            NOT NULL,
  `name`        VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
  `path_name`   VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
  `service`     VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL,
  `description` MEDIUMTEXT CHARACTER SET utf8mb4   NOT NULL,
  `publish`     TINYINT(4)                         NOT NULL,
  `date`        DATETIME                           NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `group_join` (
  `id`       INT(11) NOT NULL,
  `group_id` INT(11) NOT NULL,
  `vk_id`    INT(11) NOT NULL,
  `date`     INT(11) NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `group_leave` (
  `id`       INT(11) NOT NULL,
  `group_id` INT(11) NOT NULL,
  `vk_id`    INT(11) NOT NULL,
  `date`     INT(11) NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `message_new` (
  `id`       INT(11)                    NOT NULL,
  `group_id` INT(11)                    NOT NULL,
  `vk_id`    INT(11)                    NOT NULL,
  `message`  TEXT CHARACTER SET utf8mb4 NOT NULL,
  `date`     INT(11)                    NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `wall_repost` (
  `id`            INT(11) NOT NULL,
  `group_id`      INT(11) NOT NULL,
  `wall_id`       INT(11) NOT NULL,
  `wall_owner_id` INT(11) NOT NULL,
  `vk_id`         INT(11) NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `users` (
  `id`                INT(11)      NOT NULL,
  `vk_id`             INT(11)      NOT NULL,
  `group_id`          INT(11)      NOT NULL,
  `work`              INT(11) DEFAULT 1,
  `registration_date` DATETIME     NOT NULL,
  `access_token`      VARCHAR(255) NOT NULL,
  `service_token`     VARCHAR(255) NOT NULL,
  `confirmation_code` VARCHAR(10)  NOT NULL,
  `uniqid`            VARCHAR(15)  NOT NULL,
  `functions`         TEXT         NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `user_db` (
  `id`       INT(11)                           NOT NULL,
  `vk_id`    INT(11)                           NOT NULL,
  `group_id` INT(11)                           NOT NULL,
  `input`    VARCHAR(64) CHARACTER SET utf8mb4 NOT NULL,
  `output`   LONGTEXT CHARACTER SET utf8mb4    NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `user_db_limits` (
  `id`          INT(11)                           NOT NULL,
  `vk_id`       INT(11)                           NOT NULL,
  `group_id`    INT(11)                           NOT NULL,
  `input`       VARCHAR(64) CHARACTER SET utf8mb4 NOT NULL,
  `limit_count` INT(11)                           NOT NULL,
  `limit_time`  INT(11)                           NOT NULL,
  `limit_text`  LONGTEXT CHARACTER SET utf8mb4    NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE `subscribers` (
  `id`       INT(11) NOT NULL,
  `group_id` INT(11) NOT NULL,
  `vk_id`    INT(11) NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;


ALTER TABLE `functions`
  ADD PRIMARY KEY (`id`),
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `group_join`
  ADD PRIMARY KEY (`id`),
  ADD INDEX `group_id_date` (`group_id`, `date`),
  ADD INDEX `group_id` (`group_id`),
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `group_leave`
  ADD PRIMARY KEY (`id`),
  ADD INDEX `group_id_date` (`group_id`, `date`),
  ADD INDEX `group_id` (`group_id`),
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `message_new`
  ADD PRIMARY KEY (`id`),
  ADD INDEX `group_id_date` (`group_id`, `date`),
  ADD INDEX `group_id` (`group_id`),
  ADD INDEX `vk_id` (`vk_id`),
  ADD FULLTEXT (`message`),
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD INDEX `vk_id` (`vk_id`),
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `user_db`
  ADD PRIMARY KEY (`id`),
  ADD INDEX `vk_id_group_id` (`vk_id`, `group_id`),
  ADD FULLTEXT (`input`),
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `user_db_limits`
  ADD PRIMARY KEY (`id`),
  ADD INDEX `vk_id_group_id` (`vk_id`, `group_id`),
  ADD FULLTEXT (`input`),
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vk_id_group_id` (`vk_id`, `group_id`),
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `wall_repost`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `repost` (`group_id`, `wall_id`, `wall_owner_id`, `vk_id`),
  MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT;


INSERT INTO `functions` (`name`, `path_name`, `service`, `description`, `publish`, `date`) VALUES
  (
    'Сообщение при подписке',
    'Subscribe_message',
    'vk',
    'При подписке отправляет пользователю сообщение. Текст настраивается <a href=\"subscribe.php\">тут</a>',
    1,
    '2017-12-24 02:50:00'
  ),

  (
    'Сообщение при отписке',
    'Unsubscribe_message',
    'vk',
    'При отписке отправляет пользователю сообщение. Текст настраивается <a href=\"subscribe.php\">тут</a>',
    1,
    '2017-12-24 02:50:13'
  ),

  (
    'Отвечать только подписчикам',
    'OnlySubscribers;Add_subscriber;Delete_subscriber',
    'vk',
    'Бот будет отвечать только подписчикам. Текст настраивается <a href=\"subscribe.php\">тут</a>',
    1,
    '2017-12-24 02:51:05'
  ),

  (
    'Рандом с исключением',
    'Random_with_exception',
    'vk',
    'Рандом, части которого исключаются. <br>Используется, например, для раздачи ключей(в связке с ограничениями). <br><a href=\"doc_example.php\">Подробнее тут</a>',
    1,
    '2017-12-24 02:53:00'
  ),

  (
    'Ограничения на сообщения',
    'Message_limits',
    'vk',
    'Вы можете ограничивать количество сообщений. Текст настраивается <a href=\"limits.php\">тут</a>',
    1,
    '2017-12-24 03:00:44'
  );