"use strict";
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://www.nztravelorganiser.com/wp-content/uploads/2019/09/hobbiton-1024x683.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://i.imgur.com/wRS2Shv.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.imgur.com/mXZX1nm.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.imgur.com/uOEj82R.jpg",
          preview: true,
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(options);
  },
};
