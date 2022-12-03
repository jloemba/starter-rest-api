'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Songs', [
      {
        title: 'Les alléluias pour mon Dieu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Koluka elongi na nkolo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Nzapä baba  ayeke nzönî',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'De courage et de force',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Par ta toute puissance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'AKOSAKA TE (RW)',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'JE TE CÉLÈBRE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'ALLELUYA ! , ALLELUYA ! (RW)',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
