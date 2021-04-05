import { routesPath } from "../../constants/routes";
import { Express } from "express";
import { handle } from "../common/request-handler";
import * as Controller from "./controller";
import { validator } from "../../validator";

export default function (app: Express) {
  // For Get Customers
  app.get(routesPath.GET_ALL_CUSTOMER, handle(Controller.getAllCustomers));

  // To create customer bank account
  app.post(
    routesPath.CREATE_CUSTOMER_BANK_ACCOUNT,
    validator,
    handle(Controller.createCustomerBankAcc)
  );

  app.get(routesPath.GET_ALL_ACCOUNT_DETAILS, handle(Controller.getAllAccountDetails));
  app.get(routesPath.GET_ACCOUNT_DETAILS, handle(Controller.getSpecificAccountDetails));

  // Transfer amounts between two account
  app.put(routesPath.TRANSFER_AMOUNT, validator, handle(Controller.transferAmountBetweenAccounts));

  app.get(routesPath.GET_BALANCE_BY_ACCOUNT_ID, handle(Controller.getBalanceByAccountId));
  app.get(
    routesPath.GET_TRANSACTION_HISTORY_BY_ACC_ID,
    handle(Controller.getTransactionHistorybyAccId)
  );
}
