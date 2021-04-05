import { SeedsType } from "../typeInterfaces";
import * as Sequelize from "./base";
export async function runSeedFiles() {
  try {
    const seedFiles: Array<SeedsType> = [
      { model: "Customer", file: "customer.json" },
      { model: "AccountType", file: "accountType.json" },
      { model: "Bank", file: "bank.json" },
      { model: "TransactionType", file: "transactionType.json" },
    ];
    for (const seedFile of seedFiles) {
      console.log(`Running Seed File ${seedFile.file}`);
      const datas = require(`./migration_seeds/${seedFile.file}`);
      const sequelize = await Sequelize.getInstance();
      const seedModel = await sequelize.model(seedFile.model);
      for (const data of datas) {
        await seedModel.upsert(data);
      }
    }
  } catch (error) {
    throw error;
  }
}
