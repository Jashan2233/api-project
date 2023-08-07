'use strict';
const { ReviewImage } = require('../models')
let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await ReviewImage.bulkCreate([
    {
      reviewId: 1,
      url: 'https://source.unsplash.com/random/?airbnb'
    },
    {
      reviewId: 2,
      url: 'https://source.unsplash.com/random/?airbnb'
    },
    {
      reviewId: 3,
      url: 'https://source.unsplash.com/random/?airbnb'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    await queryInterface.bulkDelete(options, null)
  }
};
