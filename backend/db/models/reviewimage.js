'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviewimage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reviewimage.belongsTo(models.Review, {
        foreignKey: 'reviewId'
      })
    }
  }
  Reviewimage.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
     type: DataTypes.TEXT,

    },
  }, {
    sequelize,
    modelName: 'Reviewimage',
  });
  return Reviewimage;
};
