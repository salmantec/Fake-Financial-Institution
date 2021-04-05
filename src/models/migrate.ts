import * as Sequelize from "./base";
import { migrate } from "./migration";
import { runSeedFiles } from "./seeds";

module.exports = Sequelize.initialize()
  .then((sequelize) => migrate(sequelize)).then(() => runSeedFiles())
  .catch((err) => {
    console.log(err);
    console.log(
      "Postgres connection error. Please make sure Postgres is running."
    );
  })
  .then(function () {
    process.exit();
  });
