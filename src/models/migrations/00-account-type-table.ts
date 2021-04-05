"use strict";
import { QueryInterface } from "sequelize";
import { Sequelize } from "sequelize-typescript";

module.exports = {
  up: function (queryBuilder: QueryInterface) {
    return queryBuilder.createTable("account_type", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: function (queryBuilder: QueryInterface) {
    return queryBuilder.dropTable("account_type");
  },
};
