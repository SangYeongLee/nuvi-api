'use strict';

const preData = require('../seeders_pre');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const schools = preData.schools
    // get current School table's Ids
    const schoolIds = await queryInterface.sequelize.query(
      `SELECT id from Schools;`
    );

    const schoolIdArray = schoolIds[0].map(school=>school.id)

    const schoolsWithId = schools.map((school,i)=>{
      school.id = schoolIdArray[i]
      return school
    })

      return queryInterface.bulkInsert('School_subs',
      preData.schools_sub(schoolsWithId)
      , {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('School_subs', null, {});
  }
};
