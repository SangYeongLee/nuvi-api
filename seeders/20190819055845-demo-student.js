'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Students', [{
        name:"홍길동",
        gender:"male",
        SchoolId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name:"이순신",
        gender:"male",
        SchoolId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name:"곽재우",
        gender:"male",
        SchoolId:3,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name:"김세종",
        gender:"male",
        SchoolId:3,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name:"김태종",
        gender:"male",
        SchoolId:4,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name:"김정종",
        gender:"male",
        SchoolId:5,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name:"김문종",
        gender:"male",
        SchoolId:5,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name:"김예종",
        gender:"male",
        SchoolId:6,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name:"홍범도",
        gender:"male",
        SchoolId:7,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name:"김철수",
        gender:"male",
        SchoolId:8,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Students', null, {});

  }
};
