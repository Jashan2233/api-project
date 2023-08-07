'use strict';
// options
let options = {};
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    spotId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots'
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users'
      }
    },
    review : {
      type: Sequelize.TEXT,
      allowNull: false
    },
    stars: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.literal('CURRENT_DATE')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.literal('CURRENT_DATE')
    }
  }, options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.dropTable(options)
  }
};
