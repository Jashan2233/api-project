"use strict";
const { Spot } = require("../models");

let options = {};

if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "121 Hobbiton Lane",
          city: "Hobbiton",
          state: "The Shire",
          country: "Middle Earth",
          lat: 122538.234,
          lng: 943928.231,
          name: "Hobbit Hole",
          description:
            "A quaint green mound with a round beautiful door and round windows, surrounded by neighboring green hills and small ponds",
          price: 2500,
        },
        {
          ownerId: 1,
          address: "4 Privet Drive",
          city: "Little Whinging",
          state: "Surrey",
          country: "United Kingdom",
          lat: 51.3667,
          lng: -0.2167,
          name: "Dursley Residence",
          description:
            "An impeccably clean, albeit mundane and unassuming residence in the suburbs.",
          price: 1800,
        },
        {
          ownerId: 1,
          address: "100 Acre Wood",
          city: "Hundred Acre",
          state: "Woods",
          country: "Cartoon World",
          lat: 52.37,
          lng: -1.265,
          name: "Pooh's House",
          description:
            "A cozy and warm spot located inside a large tree in the forest, filled with pots of honey.",
          price: 1300,
        },
        {
          ownerId: 1,
          address: "Platform 9 3/4, King's Cross Station",
          city: "London",
          state: "England",
          country: "United Kingdom",
          lat: 51.5322,
          lng: -0.1243,
          name: "Hogwarts Express",
          description:
            "The magical train that transports witches and wizards to Hogwarts School of Witchcraft and Wizardry.",
          price: 3000,
        },
        {
          ownerId: 2,
          address: "Pawnee, Indiana",
          city: "Pawnee",
          state: "Indiana",
          country: "United States",
          lat: 39.7684,
          lng: -86.1581,
          name: "Pawnee Parks Department",
          description:
            "The main setting of the hilarious and touching Parks and Recreation.",
          price: 2100,
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.bulkDelete(options);
  },
};
