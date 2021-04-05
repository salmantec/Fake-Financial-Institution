import * as Sequelize from "./base";
import { rollback } from "./migration";

Sequelize.initialize()
  .then((sequelize) => rollback(sequelize))
  .catch((err) => {
    console.log(err);
    console.log("Postgres connection error. Please make sure Postgres is running.");
    process.exit();
  });
