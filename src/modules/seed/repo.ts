import * as Sequelize from "../../models/base";
import * as _ from "lodash";
import AccountType from "./models/AccountType";
import Bank from "./models/Bank";
import TransactionType from "./models/TransactionType";

export default class SeedRepo {
  static getAllAccountTypes = async () => await AccountType.findAll();
  static getAllBanks = async () => await Bank.findAll();
  static getAllTransactionTypes = async () => await TransactionType.findAll();
}
