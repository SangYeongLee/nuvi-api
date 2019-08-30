'use strict';

const bulkGenerate = () => {
  let bulk = [];
  for(let day=12; day <14; day++ ){
    for(let studentId=1; studentId< 6; studentId ++) {
      for(let foods=1; foods< 7 ; foods++) {
        const supplyLeft = {
          StudentId:studentId,
          date:new Date(2019,7,day),
          FoodId:foods,
          food_supply:300,
          food_left:100,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        bulk.push(supplyLeft);
      }
    }

    for(let studentId=6; studentId< 11; studentId ++) {
      for(let foods=4; foods< 10 ; foods++) {
        const supplyLeft = {
          StudentId:studentId,
          date:new Date(2019,7,day),
          FoodId:foods,
          food_supply:300,
          food_left:100,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        bulk.push(supplyLeft);
      }
    }
  }
  return bulk;
}

const bulk = bulkGenerate();

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('SupplyAndLefts', bulk, {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('SupplyAndLefts', null, {});
  }
};
