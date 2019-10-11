'use strict';

const preData = require('../seeders_pre');

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Schools',
      preData.allSchoolClassGrade
      , {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Schools', null, {});
  }
};
