
'use strict';
const {Spot} = require('../models')

let options = {}


if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '121 Hobbiton Lane',
        city: 'Hobbiton',
        state: 'The Shire',
        country: 'Middle Earth',
        lat: 122538.234,
        lng: 943928.231,
        name: 'Hobbit Hole',
        description: 'A quaint green mound with a round beautiful door and round windows, surrounded by neighboring green hills and small ponds',
        price: 2500,

      },
      {
        ownerId: 1,
        address: '4 Privet Drive',
        city: 'Little Whinging',
        state: 'Surrey',
        country: 'United Kingdom',
        lat: 51.3667,
        lng: -0.2167,
        name: 'Dursley Residence',
        description: 'An impeccably clean, albeit mundane and unassuming residence in the suburbs.',
        price: 1800,
      },
      {
        ownerId: 1,
        address: '100 Acre Wood',
        city: 'Hundred Acre',
        state: 'Woods',
        country: 'Cartoon World',
        lat: 52.3700,
        lng: -1.2650,
        name: 'Pooh\'s House',
        description: 'A cozy and warm spot located inside a large tree in the forest, filled with pots of honey.',
        price: 1300,
      },
      {
        ownerId: 1,
        address: 'Platform 9 3/4, King\'s Cross Station',
        city: 'London',
        state: 'England',
        country: 'United Kingdom',
        lat: 51.5322,
        lng: -0.1243,
        name: 'Hogwarts Express',
        description: 'The magical train that transports witches and wizards to Hogwarts School of Witchcraft and Wizardry.',
        price: 3000,
      },
      {
        ownerId: 1,
        address: '221B Baker Street',
        city: 'London',
        state: 'England',
        country: 'United Kingdom',
        lat: 51.5237,
        lng: -0.1586,
        name: 'Sherlock Holmes Residence',
        description: 'The apartment of the world-renowned detective, Sherlock Holmes.',
        price: 1900,
      },
      {
        ownerId: 1,
        address: '1 Pallet Town',
        city: 'Pallet',
        state: 'Kanto',
        country: 'Pokemon World',
        lat: 35.6895,
        lng: 139.6917,
        name: 'Ash Ketchum\'s House',
        description: 'The residence of Pokemon Master, Ash Ketchum.',
        price: 1500,
      },
      {
        ownerId: 1,
        address: 'Bikini Bottom',
        city: 'Bikini Bottom',
        state: 'Sea Bed',
        country: 'Under the Sea',
        lat: 13.4451,
        lng: 144.7937,
        name: 'Spongebob Squarepants\' Pineapple House',
        description: 'The underwater pineapple residence of Spongebob Squarepants.',
        price: 1700,
      },
      {
        ownerId: 1,
        address: '123 Seasme Street',
        city: 'Seasame',
        state: 'PBS',
        country: 'Seasame World',
        lat: 40.7128,
        lng: -74.0060,
        name: 'Big Bird\'s Nest',
        description: 'The nest of the friendly and curious Big Bird.',
        price: 2000,
    },
    {
        ownerId: 2,
        address: 'Pawnee, Indiana',
        city: 'Pawnee',
        state: 'Indiana',
        country: 'United States',
        lat: 39.7684,
        lng: -86.1581,
        name: 'Pawnee Parks Department',
        description: 'The main setting of the hilarious and touching Parks and Recreation.',
        price: 2100,
    },
    {
        ownerId: 2,
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'Oregon',
        country: 'United States',
        lat: 44.0462,
        lng: -123.0225,
        name: 'The Simpsons House',
        description: 'The home of the lovable, if dysfunctional, Simpson family.',
        price: 2200,
    },
    {
        ownerId: 2,
        address: 'Asgard, Nine Realms',
        city: 'Asgard',
        state: 'Worlds Center',
        country: 'Asgard',
        lat: 64.9631,
        lng: -19.0208,
        name: 'Asgard Palace',
        description: 'The palace of the god of thunder, Thor.',
        price: 2400,
    },
    {
        ownerId: 2,
        address: 'Tower Bridge Rd',
        city: 'London',
        state: 'England',
        country: 'United Kingdom',
        lat: 51.5074,
        lng: -0.1278,
        name: 'Tower Bridge',
        description: 'Your in for a one of a kind view of London. A great place to stay if you can ignore all the tourists',
        price: 2500,
    },
    {
        ownerId: 2,
        address: 'Atlantis',
        city: 'Atlantis',
        state: 'unknown',
        country: 'Under the Sea',
        lat: 31.6544,
        lng: -64.8530,
        name: 'Atlantis',
        description: 'The ancient lost city, now home to the superhero Aquaman.',
        price: 2600,
    },
    {
        ownerId: 3,
        address: 'Mars',
        city: 'Mars Base 1',
        state: 'Mars Colony',
        country: 'Mars',
        lat: 18.6598,
        lng: -70.9119,
        name: 'Mars Base',
        description: 'The latest base built by SpaceX in their quest to colonize Mars.',
        price: 2700,
    },
    {
        ownerId: 3,
        address: 'Mount Olympus',
        city: 'Olympus',
        state: 'unknown',
        country: 'Greek Mythology',
        lat: 40.0852,
        lng: 22.5497,
        name: 'Mount Olympus',
        description: 'Home to the twelve Olympians in Greek Mythology.',
        price: 2800,
    },
    {
        ownerId: 3,
        address: 'Narnia',
        city: 'Narnia',
        state: 'Wardrobe',
        country: 'Narnia',
        lat: 51.5074,
        lng: -0.1278,
        name: 'Aslan\'s Camp',
        description: 'The headquarters of Aslan and his allies in Narnia.',
        price: 2900,
    },
    {
        ownerId: 3,
        address: 'Skull Island',
        city: 'Skull',
        state: 'Skull Island',
        country: 'Skull Island',
        lat: 0.1864,
        lng: -117.2363,
        name: 'Kong\'s Abode',
        description: 'The home of King Kong, the gigantic ape-like creature who is the king of the Skull Island.',
        price: 3000,
    },
    {
        ownerId: 3,
        address: 'Camp Crystal Lake',
        city: 'Crystal Lake',
        state: 'New Jersey',
        country: 'United States',
        lat: 41.4036,
        lng: -74.3243,
        name: 'Camp Crystal Lake',
        description: 'The infamous setting of the Friday the 13th series.',
        price: 3100,
    },
    {
        ownerId: 3,
        address: '111 Apres Ski Lane',
        city: 'Chamonix',
        state: 'Haute-Savoie',
        country: 'France',
        lat: 56.5141,
        lng: -0.1557,
        name: 'Mont Blanc Chalet',
        description: 'A stunning chalet at the base of Mont Blanc for a year round retreat.',
        price: 60000,
    }
    ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options)
  }
};