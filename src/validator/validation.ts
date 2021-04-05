import { Request } from "express";
import { ERROR_MESSAGES } from "../constants/commonMessages";

export async function createCustomerBankAcc(request: Request) {
  request.assert("customerId", ERROR_MESSAGES.CUSTOMER_ID_VALIDATION).notEmpty().isNumeric();
  request.assert("bankId", ERROR_MESSAGES.BANK_ID_VALIDATION).notEmpty().isNumeric();
  request.assert("accountTypeId", ERROR_MESSAGES.ACCOUNT_TYPE_ID_VALIDATION).notEmpty().isNumeric();
  request.assert("accountNo", ERROR_MESSAGES.ACCOUNT_NO_VALIDATION).notEmpty().isNumeric();
  request.assert("initialAmount", ERROR_MESSAGES.INITIAL_AMOUNT_VALIDATION).notEmpty().isNumeric();
}

export async function transferAmount(request: Request) {
  request
    .assert("transactionAccountId", ERROR_MESSAGES.TRANSACTION_ACC_ID_VALIDATION)
    .notEmpty()
    .isNumeric();
  request
    .assert("transactionAmount", ERROR_MESSAGES.TRANSACTION_AMOUNT_VALIDATION)
    .notEmpty()
    .isNumeric();
}
