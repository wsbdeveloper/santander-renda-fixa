"use strict";
// eslint-disable-next-line no-undef
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "bussines_id", Sequelize.STRING);
  },

  async down(queryInterface) {
    return queryInterface.removeColumn("Users", "bussines_id");
  },
};
