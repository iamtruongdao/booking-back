"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("schedules", "date", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        "schedules",
        "date",
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
        {
          transaction,
        }
      ),
    ]);
  },
};
