'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    await queryInterface.addColumn(
      'Lyrics',
      'songId',
     Sequelize.INTEGER
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
