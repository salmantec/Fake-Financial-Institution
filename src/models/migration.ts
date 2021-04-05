import * as Umzug from "umzug";
import { Sequelize as Sequelize } from "sequelize-typescript";

function getMigrateInstance(sequelize: Sequelize) {
  return new Umzug({
    storage: "sequelize",
    storageOptions: {
      sequelize: sequelize,
    },

    // see: https://github.com/sequelize/umzug/issues/17
    migrations: {
      params: [
        sequelize.getQueryInterface(), // queryInterface
        sequelize.constructor, // DataTypes
        function () {
          throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
        }
      ],
      path: __dirname + "/migrations"
    },

    logging: function () {
      console.log.apply(undefined, arguments);
    },
  });
}

export function migrate(sequelize: Sequelize) {
  return getMigrateInstance(sequelize).up();
}

export function rollback(sequelize: Sequelize) {
  return getMigrateInstance(sequelize).down();
}
