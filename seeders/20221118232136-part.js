'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Parts', [
    {
      label: 'Strophe 1',
    },
    {
      label: 'Strohpe 2',
    },
    {
      label: 'Strophe 3',
    },
    {
      label: 'Strophe 4',
    },
    {
      label: 'Strophe 5',
    },
    {
      label: 'Strophe 6',
    },
    {
      label: 'Strophe 7',
    },
    {
      label: 'Strophe 8',
    },
    {
      label: 'Strophe 9',
    },
    {
      label: 'Refrain',
    },
    {
      label: 'Refrain 1',
    },
    {
      label: 'Refrain 2',
    },
    {
      label: 'Refrain 3',
    },
    {
      label: 'Refrain 4',
    },
    {
      label: 'Strophe 1A',
    },
    {
      label: 'Strophe 1B',
    },
    {
      label: 'Strophe 2A',
    },
    {
      label: 'Strophe 2B',
    },
    {
      label: 'Strophe 3A',
    },
    {
      label: 'Strophe 3B',
    },
    {
      label: 'Intro',
    },
    {
      label: 'Strophe 1(Lead)',
    },
    {
      label: 'Strophe 2(Lead)',
    },
    {
      label: 'Strophe 3(Lead)',
    },
    {
      label: 'Strophe 4(Lead)',
    },
    {
      label: 'Pont',
    },
    {
      label: 'Pont 1',
    },
    {
      label: 'Pont 2',
    }
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
