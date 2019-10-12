'use strict';

const bulkGenerate = (studentsIdArray, foodsIdArray) => {
  let bulk = [];
  studentsIdArray.forEach(studentId =>{
    foodsIdArray.forEach(foodId =>{
      bulk.push(
        {
          date:new Date(),
          bld:"l",
          food_supply:300,
          food_left:100,
          supply_time: new Date(),
          left_time: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),

          StudentId:studentId,
          FoodId:foodId,
          KioskId: null
        }
      )
    })
  })

  return bulk;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const studentIds = await queryInterface.sequelize.query(
      `SELECT id from Students;`
    );

    const studentIdArray = studentIds[0].map(student=>student.id)


    const foodIds = await queryInterface.sequelize.query(
      `SELECT id from Food;`
    );

    const foodIdArray = foodIds[0].map(food=>food.id)
      return queryInterface.bulkInsert('SupplyAndLefts', bulkGenerate([1,2,3,4,5,6,7,8,9,10],[1,2,3,4,5,6]), {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('SupplyAndLefts', null, {});
  }
};
