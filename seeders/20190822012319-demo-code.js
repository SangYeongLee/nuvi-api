'use strict';

function makeId(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

let bulk = [];
for (let i =0; i<10; i++){
  bulk.push({
    code:makeId(5),
    occupied:false,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Codes', bulk, {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Codes', null, {});

  }
};
