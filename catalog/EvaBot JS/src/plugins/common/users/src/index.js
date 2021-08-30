/* eslint-disable no-param-reassign */
import Sequelize from 'sequelize';
import EventEmitter from 'events';
import initUsersMethods from './defaultMethods';
import botHandler from './botHandler';
import initBotcmdType from './botcmdType';

export default class extends EventEmitter {
  constructor(henta) {
    super();
    this.henta = henta;
    this.usersPrototype = {};
    this.userGroups = new Set();
    this.cache = new Map();
    this.userModel = {
      vkId: Sequelize.INTEGER,
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING
    };
  }

  init(henta) {
    const { messageProcessor } = henta.getPlugin('common/bot');
    messageProcessor.handlers.set('connect-user', botHandler.bind(this));

    initUsersMethods(this);
    initBotcmdType(this);
  }

  async start(henta) {
    const dbPlugin = henta.getPlugin('common/db');
    this.User = dbPlugin.define('user', this.userModel, { timestamps: false });
    dbPlugin.applySaveCenter(this.User.prototype);
    await dbPlugin.safeSync(this.User);

    Object.assign(this.User.prototype, this.usersPrototype);
  }

  /**
    Получить пользователя по VkId.

    @param vkId - ID пользователя ВКонтакте.
    @return Экземпляр пользователя.
  */
  async get(vkId) {
    const cachedUser = this.cache.get(vkId);
    const user = cachedUser
      || await this.User.findOne({ where: { vkId } });

    if (user && !cachedUser) {
      this.applyMethodGroups(user);
      this.cache.set(vkId, user);
    }

    return user;
  }

  /**
    Получить пользователя или создать нового по VkId.

    @param vkId - ID пользователя ВКонтакте.
    @return Экземпляр пользователя.
  */
  async getOrCreate(vkId) {
    return await this.get(vkId) || this.create(vkId);
  }

  /**
    Создать нового пользователя.

    @param vkId - ID пользователя ВКонтакте.
    @return Экземпляр пользователя.
  */
  async create(vkId) {
    const vkUser = (await this.henta.vk.api.users.get({ user_ids: vkId }))[0];
    const user = new this.User({ vkId, firstName: vkUser.first_name, lastName: vkUser.last_name });
    this.applyMethodGroups(user);
    this.cache.set(vkId, user);
    this.emit('create', user);
    this.henta.log(`Новый пользователь: ${user.firstName} ${user.lastName} (${user.getUrl()})`);

    return user;
  }

  /**
    Применить группы методов к экземпляру.

    @param user - Экземпляр пользователя.
  */
  applyMethodGroups(user) {
    for (const group of this.userGroups) {
      const groupMethods = {};

      for (const [name, fn] of group.methods) {
        groupMethods[name] = function (...args) {
          return fn(user, ...args);
        };
      }

      user[group.name] = groupMethods;
    }
  }

  /**
    Получить пользователя по строке.

    @param str - Строка (ссылка, пуш, ИД).
    @return Экземпляр пользователя.
  */
  async resolve(str) {
    return this.get(await this.resolveVkId(str));
  }

  /**
    Получить VkId по строке.

    @param str - Строка (ссылка, пуш, ИД).
    @return VkId пользователя.
  */
  async resolveVkId(str) {
    const res = await this.henta.vk.snippets.resolveResource(str);
    return res.type === 'user' && res.id;
  }

  /**
    Добавить метод пользователя.

    @param name - Имя метода.
    @param fn - Функция метода.
  */
  method(name, fn) {
    // eslint-disable-next-line func-names
    this.usersPrototype[name] = function (...args) {
      return fn(this, ...args);
    };
  }

  /**
    Создать группу методов.

    @param groupName - Имя группы.
    @return Группа.
  */
  group(groupName) {
    const { userGroups } = this;

    const GroupClass = class {
      constructor(name) {
        this.name = name;
        this.methods = new Map();
      }

      method(name, func) {
        this.methods.set(name, func);
        return this;
      }

      end() {
        userGroups.add(this);
      }
    };

    return new GroupClass(groupName);
  }

  /**
    Добавить поле в ДБ модель User.

    @param name - Имя поля.
    @param data Данные поля.
  */
  field(name, data) {
    if (this.userModel[name]) {
      throw Error(`Поле ${name} уже занято`);
    }

    this.userModel[name] = data;
  }
}
