'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Food', [
        {
          name:"쌀밥",
          from:"국내산",
          allergy:false,
          special:null,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          name:"된장국",
          from:"국내산",
          allergy:false,
          special:null,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          name:"불고기",
          from:"국내산",
          allergy:false,
          special:null,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          name:"김치",
          from:"국내산",
          allergy:false,
          special:null,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          name:"멸치볶음",
          from:"국내산",
          allergy:false,
          special:null,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          name:"토마토",
          from:"국내산",
          allergy:false,
          special:null,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          name:"황태해장국",
          from:"국내산",
          allergy:false,
          special:null,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          name:"제육볶음",
          from:"국내산",
          allergy:false,
          special:null,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          name:"시금치",
          from:"국내산",
          allergy:false,
          special:null,
          createdAt: new Date(),
          updatedAt: new Date()
        },{
          name:"오이무침",
          from:"국내산",
          allergy:false,
          special:null,
          createdAt: new Date(),
          updatedAt: new Date()
        }

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      Example:
      return queryInterface.bulkDelete('Food', null, {});
  }
};
