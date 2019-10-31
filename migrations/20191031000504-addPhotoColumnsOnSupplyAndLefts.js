'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('SupplyAndLefts', 'photo_supply', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('SupplyAndLefts', 'photo_left', {
        type: Sequelize.STRING,
      }),
      queryInterface.removeColumn('SupplyAndLefts', 'photo'),

    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('SupplyAndLefts', 'photo_supply'),
      queryInterface.removeColumn('SupplyAndLefts', 'photo_left'),
      queryInterface.addColumn('SupplyAndLefts', 'photo', {
        type: Sequelize.STRING,
      }),
    ]);
  }
};
