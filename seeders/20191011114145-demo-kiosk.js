'use strict';
const preData = require('../seeders_pre');

const kioskPerSchool =3;

const getAllKiosk = ((kioskPerSchool) => {
  let kioskArray = [];
  preData.schools.forEach((school,j) =>{
    let i = 3;
    while(i>0){
      kioskArray.push({
        identify_num:i,
        SchoolId:j+1
      })
      i--
    }
  })
  return kioskArray
})(kioskPerSchool)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Kiosks',
    getAllKiosk
    , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Kiosks', null, {});
  }
};
