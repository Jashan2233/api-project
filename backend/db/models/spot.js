'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsToMany(models.User, {
        through: models.Booking,
        foreignKey: 'spotId',
        otherKey: 'userId',
        // onDelete: 'CASCADE',
        // hooks: true
      }),
      Spot.belongsToMany(models.User, {
        through: models.Review,
        foreignKey: 'spotId',
        otherKey: 'userId',
        // onDelete: 'CASCADE',
        // hooks: true
      }),
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner',
        // onDelete: 'CASCADE',
        // hooks: true
      }),
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      })
      Spot.hasMany(models.Booking, {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        })
      Spot.hasMany(models.Review, {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
          hooks: true
        })
    }
  }
  Spot.init({
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
    modelName: 'Spot'
  });
  return Spot;
};
