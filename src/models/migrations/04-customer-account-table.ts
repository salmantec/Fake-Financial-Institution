"use strict";
import { QueryInterface } from "sequelize";
import { Sequelize } from "sequelize-typescript";

module.exports = {
  up: function (queryBuilder: QueryInterface) {
    return queryBuilder.createTable("customer_account", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customer",
          key: "id",
        },
      },
      bankId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "bank",
          key: "id",
        },
      },
      accountTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "account_type",
          key: "id",
        },
      },
      accountNo: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      branchName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: function (queryBuilder: QueryInterface) {
    return queryBuilder.dropTable("customer_account");
  },
};
