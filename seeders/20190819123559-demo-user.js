'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Users', [
        {
          name:'이선생',
          emailAddress:'lee@naver.com',
          password:'lee',
          code:"a11",
          SchoolId:1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name:"김선생",
          emailAddress:'kim@naver.com',
          password:'kim',
          code:"b11",
          SchoolId:5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
