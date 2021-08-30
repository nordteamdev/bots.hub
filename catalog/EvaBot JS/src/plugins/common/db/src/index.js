import Sequelize from 'sequelize';

export default class extends Sequelize {
  constructor(henta) {
    // eslint-disable-next-line object-curly-newline
    const { name, user, pass, options } = henta.config.private.database;
    super(name, user, pass, options);
    this.henta = henta;

    const markedASave = new Set();
    function markASave() {
      markedASave.add(this);
    }

    this.markedASave = markedASave;
    this.markASave = markASave;
  }

  async preInit(henta) {
    try {
      await super.authenticate();
      henta.log('База данных успешно подключена.');

      setInterval(() => this.saveAllData(), 60000);
      henta.onShutdown(() => this.saveAllData());
    } catch (err) {
      throw Error(`Ошибка авторизации в базе данных (${err.message})`);
    }
  }

  defineCached(name, model, settings, cacheSettings) {
    return this.sequelizeRedis.getModel(
      super.define(name, model, settings),
      cacheSettings || { ttl: 60 * 60 * 24 }
    );
  }

  applySaveCenter(modelPrototype) {
    modelPrototype.$save = modelPrototype.save;
    modelPrototype.save = this.markASave;
  }

  async saveAllData() {
    const savesArray = Array.from(this.markedASave).filter(v => !!v.changed());
    this.markedASave.clear();
    if (savesArray.length === 0) {
      return;
    }

    this.henta.log(`Сохранение информации в БД (${savesArray.length} шт.)...`);
    await Promise.all(savesArray.map(v => v.$save()));
  }

  async safeSync(model) {
    // TODO: REWRITE

    await model.sync();
    const { options } = model;
    const queryInterface = model.QueryInterface;
    const tableName = model.getTableName(options);

    const columns = await queryInterface.describeTable(tableName);

    for (const columnName of Object.keys(model.tableAttributes)) {
      if (columns[columnName]) continue;

      const answer = await this.henta.cmdline.questionYN(`Добавить "${columnName}" в таблицу "${tableName}"`);
      if (answer) {
        this.henta.log(`Добавляю "${columnName}" в таблицу "${tableName}"...`);
        await queryInterface.addColumn(tableName, columnName, model.tableAttributes[columnName]);
      } else {
        this.henta.logger.log('Пропускаю...');
      }
    }

    for (const columnName of Object.keys(columns)) {
      if (model.tableAttributes[columnName]) continue;

      const answer = await this.henta.cmdline.questionYN(`Удалить "${columnName}" из таблицы "${tableName}"`);
      if (answer) {
        this.henta.log(`Удаляю "${columnName}" из таблицы "${tableName}"...`);
        await queryInterface.removeColumn(tableName, columnName, options);
      } else {
        this.henta.logger.log('Пропускаю...');
      }
    }
  }
}
