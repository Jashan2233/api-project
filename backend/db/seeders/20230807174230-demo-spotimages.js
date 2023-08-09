'use strict';
const {SpotImage} = require('../models')
let options = {}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://www.nztravelorganiser.com/wp-content/uploads/2019/09/hobbiton-1024x683.jpg',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://www.ancient-origins.net/sites/default/files/field/image/Mount-Olympus.jpg',
        preview: true,
      },

    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options)

  }
};
