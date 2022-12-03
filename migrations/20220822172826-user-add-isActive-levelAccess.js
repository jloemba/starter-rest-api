'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'isActived', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Users',
        'levelAccess',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      )
    ]);
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
