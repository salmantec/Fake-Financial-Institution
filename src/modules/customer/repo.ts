import * as Sequelize from "../../models/base";
import * as _ from "lodash";
import Customer from "./models/Customer";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../constants/commonMessages";
import CustomerAccount from "./models/CustomerAccount";
import AccountTransaction from "./models/AccountTransaction";
import Bank from "../seed/models/Bank";
import AccountType from "../seed/models/AccountType";
import TransactionType from "../seed/models/TransactionType";
import { TransactionData } from "../../typeInterfaces";

export default class CustomerRepo {
  static getAllCustomers = async () => await Customer.findAll();

  // Common function to check the data existence with modelName and query
  static checkExistence = async (modelName: string, query: any) => {
    try {
      const sequelize = await Sequelize.getInstance();
      const model = sequelize.model(modelName);
      return await model.findOne(query);
    } catch (error) {
      throw error;
    }
  };

  // Create customer bank account details
  static createCustomerBankAcc = async (
    customerBankDetails: any,
    transactionData: TransactionData
  ) => {
    try {
      const sequelize = await Sequelize.getInstance();
      return await sequelize.transaction(async (transaction) => {
        const customerAcc = await CustomerAccount.create(customerBankDetails, { transaction });
        const accTransactionData = {
          ...transactionData,
          customerAccountId: customerAcc.id,
          transactionAccountId: customerAcc.id,
        };
        await AccountTransaction.create(accTransactionData, { transaction });
        return {
          error: false,
          values: { message: SUCCESS_MESSAGES.CUSTOMER_ACC_CREATED_SUCCESSFULLY },
        };
      });
    } catch (err) {
      console.log("customer -> repo.ts -> createCustomerBankAcc ", err);
      throw ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    }
  };

  static getAllAccountDetails = async (limit: number, offset: number) =>
    await CustomerAccount.findAndCountAll({
      include: [{ model: Customer, attributes: ["id", "name"] }, Bank, AccountType],
      limit: limit || 10,
      offset: offset || 0,
    });

  static getSpecificAccountDetails = async (id: number) =>
    await CustomerAccount.findOne({
      where: { id },
      include: [{ model: Customer, attributes: ["id", "name"] }, Bank, AccountType],
    });

  static createAccountTransaction = async (inputData: any) => {
    try {
      await Promise.all(
        inputData.map(async (data: any) => {
          const sequelize = await Sequelize.getInstance();
          return await sequelize.transaction(async (transaction) => {
            await AccountTransaction.create(data, { transaction });
          });
        })
      );
      return {
        error: false,
        values: { message: SUCCESS_MESSAGES.TRANSFERRED_SUCCESSFULLY },
      };
    } catch (err) {
      console.log("customer -> repo.ts -> createAccountTransaction ", err);
      throw ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    }
  };

  static getBalanceByAccountId = async (customerAccountId: number, limit: number, offset: number) =>
    await AccountTransaction.findAndCountAll({
      where: { customerAccountId },
      attributes: ["balance", "createdAt"],
      order: [["createdAt", "DESC"]],
      limit: limit || 10,
      offset: offset || 0,
    });

  static getTransactionHistorybyAccId = async (
    customerAccountId: number,
    limit: number,
    offset: number
  ) =>
    await AccountTransaction.findAndCountAll({
      where: { customerAccountId },
      include: [
        {
          model: CustomerAccount,
          as: "customerAccount",
          include: [{ model: Customer, attributes: ["id", "name"] }, Bank, AccountType],
        },
        TransactionType,
        {
          model: CustomerAccount,
          as: "transactionAccount",
          include: [{ model: Customer, attributes: ["id", "name"] }, Bank, AccountType],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: limit || 10,
      offset: offset || 0,
    });
}
