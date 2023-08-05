'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      spot.hasMany(
        models.Booking, {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        }
      )
      spot.belongsTo(
        models.User, {
          foreignKey: 'ownerId',
          as: 'Owner'
      }
      );
    }
  }
  spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lat: {
      type: DataTypes.NUMERIC
    },
    lng: {
      type: DataTypes.NUMERIC
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.NUMERIC,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'spot',
    tableName: 'Spots'
  });
  return spot;
};
