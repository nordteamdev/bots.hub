import { DataTypes } from 'sequelize';

export default class RatingPlugin {
  init (henta) {
    const usersPlugin = henta.getPlugin('common/users');
    usersPlugin.field('rating', DataTypes.INTEGER);
  }
}