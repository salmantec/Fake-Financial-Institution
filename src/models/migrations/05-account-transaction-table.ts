"use strict";
import { QueryInterface } from "sequelize";
import { Sequelize } from "sequelize-typescript";

module.exports = {
  up: function (queryBuilder: QueryInterface) {
    return queryBuilder.createTable("account_transaction", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customer_account",
          key: "id",
        },
      },
      transactionTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "transaction_type",
          key: "id",
        },
      },
      transactionAccountId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "customer_account",
          key: "id",
        },
      },
      balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      transactionAmount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      summary: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: function (queryBuilder: QueryInterface) {
    return queryBuilder.dropTable("account_transaction");
  },
};
