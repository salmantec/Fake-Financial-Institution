import { Sequelize } from "sequelize-typescript";

let sequelize: Sequelize;

export function getInstance(): Promise<Sequelize> {
  if (!sequelize) {
    sequelize = new Sequelize({
      url: process.env.DATABASE_URL,
      logging: false,
      dialect: "postgres",
      modelPaths: [
        __dirname + "/../modules/customer/models/",
        __dirname + "/../modules/seed/models/",
      ],
      pool: {
        min: 1,
        max: 20,
        idle: 10000,
      },
    });
  }
  return Promise.resolve(sequelize);
}

export function initialize(): Promise<Sequelize> {
  return getInstance();
}
