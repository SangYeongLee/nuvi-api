'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Schools', [{
        schoolName:"남산초등학교",
        grade:1,
        classNumber:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        schoolName:"남산초등학교",
        grade:1,
        classNumber:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        schoolName:"남산초등학교",
        grade:2,
        classNumber:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        schoolName:"남산초등학교",
        grade:2,
        classNumber:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        schoolName:"동산초등학교",
        grade:1,
        classNumber:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        schoolName:"동산초등학교",
        grade:1,
        classNumber:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        schoolName:"동산초등학교",
        grade:2,
        classNumber:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        schoolName:"동산초등학교",
        grade:2,
        classNumber:2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Schools', null, {});
  }
};
