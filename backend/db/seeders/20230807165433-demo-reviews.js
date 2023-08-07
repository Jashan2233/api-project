'use strict';

const { Review } = require('../models');

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await Review.bulkCreate([
  {
    spotId: 1,
    userId: 1,
    review: 'Was very good stay at LA',
    stars: 4
  },
  {
    spotId: 2,
    userId: 2,
    review: 'Great place!, but a bit more of cleaning is needed!',
    stars: 4
  },
  {
    spotId: 3,
    userId: 3,
    review: 'not bad, too many stick-throwing games.',
    stars: 2
  },
], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, null)

  }
};
