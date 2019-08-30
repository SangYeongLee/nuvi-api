'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Posts', [
        {
          title: 'First post',
          description: 'this is the first post',
          userId:1,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          title: 'Second post',
          description: 'this is the second post',
          userId:1,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          title: 'Third post',
          description: 'this is the Third post',
          userId:2,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          title: 'Fourth post',
          description: 'this is the Fourth post',
          userId:2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Posts', null, {});

  }
};
