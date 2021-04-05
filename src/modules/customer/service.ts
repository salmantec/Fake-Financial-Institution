import { MODEL_NAMES, TRANSACTION_TYPES } from "../../constants/variables";
import { ERROR_MESSAGES } from "../../constants/commonMessages";
import CustomerRepo from "./repo";
import _ = require("lodash");

export default class CustomerService {
  static getAllCustomers = async () => CustomerRepo.getAllCustomers();

  // Business logic for create customer bank account flow
  static createCustomerBankAcc = async (customerBankDetails: any) => {
    try {
      const basicReqDataValidation = await CustomerService.createDataValidation(
        customerBankDetails
      );
      if (basicReqDataValidation.error) return basicReqDataValidation;

      const { initialAmount, ...rest } = customerBankDetails;
      const transactionData = {
        transactionTypeId: 1,
        balance: initialAmount,
        transactionAmount: initialAmount,
      };

      return await CustomerRepo.createCustomerBankAcc(rest, transactionData);
    } catch (err) {
      console.log("customer -> service.ts -> createCustomerBankAcc ", err);
      throw ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    }
  };

  static createDataValidation = async (customerBankDetails: any) => {
    try {
      // Initial amount should be positive
      if (customerBankDetails.initialAmount < 100)
        return { error: true, errorText: ERROR_MESSAGES.INVALID_INITIAL_AMOUNT };

      // check the customerId exists or not
      const customerQuery = { where: { id: customerBankDetails.customerId } };
      const checkValidCustomer = await CustomerRepo.checkExistence(
        MODEL_NAMES.CUSTOMER,
        customerQuery
      );
      if (!checkValidCustomer)
        return { error: true, errorText: ERROR_MESSAGES.CUSTOMER_DOES_NOT_EXIST };

      // check the accountNo already exists or not
      const accNoQuery = { where: { accountNo: customerBankDetails.accountNo } };
      const checkValidAccNo = await CustomerRepo.checkExistence(
        MODEL_NAMES.CUSTOMER_ACCOUNT,
        accNoQuery
      );
      if (checkValidAccNo) return { error: true, errorText: ERROR_MESSAGES.ACC_NO_ALREADY_EXISTS };

      // check the bankId exists or not
      const bankQuery = { where: { id: customerBankDetails.bankId } };
      const checkValidBankId = await CustomerRepo.checkExistence(MODEL_NAMES.BANK, bankQuery);
      if (!checkValidBankId) return { error: true, errorText: ERROR_MESSAGES.BANK_DOES_NOT_EXIST };

      // check the accountTypeId exists or not
      const accountTypeQuery = { where: { id: customerBankDetails.accountTypeId } };
      const checkValidAccountType = await CustomerRepo.checkExistence(
        MODEL_NAMES.ACCOUNT_TYPE,
        accountTypeQuery
      );
      if (!checkValidAccountType)
        return { error: true, errorText: ERROR_MESSAGES.ACCOUNT_TYPE_DOES_NOT_EXIST };

      // check the customer and bankId already exists or not
      const customerAndBankQuery = {
        where: { customerId: customerBankDetails.customerId, bankId: customerBankDetails.bankId },
      };
      const checkValidCustAndBank = await CustomerRepo.checkExistence(
        MODEL_NAMES.CUSTOMER_ACCOUNT,
        customerAndBankQuery
      );
      if (checkValidCustAndBank)
        return { error: true, errorText: ERROR_MESSAGES.CUSTOMER_AND_BANK_ALREADY_EXISTS };

      return { error: false };
    } catch (err) {
      console.log("customer -> service.ts -> createDataValidation ", err);
      throw ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    }
  };

  static getAllAccountDetails = async (limit: number, offset: number) =>
    CustomerRepo.getAllAccountDetails(limit, offset);

  static checkIdInCustomerAccount = async (id: number) => {
    try {
      // check the id is already exist or not
      const customerAccountQuery = { where: { id } };
      const checkValidCustAcc = await CustomerRepo.checkExistence(
        MODEL_NAMES.CUSTOMER_ACCOUNT,
        customerAccountQuery
      );
      if (!checkValidCustAcc)
        return { error: true, errorText: ERROR_MESSAGES.CUSTOMER_ACCOUNT_DOES_NOT_EXIST };

      return { error: false };
    } catch (err) {
      console.log("customer -> service.ts -> checkIdInCustomerAccount ", err);
      throw ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    }
  };

  static getSpecificAccountDetails = async (id: number) => {
    try {
      const basicReqDataValidation = await CustomerService.checkIdInCustomerAccount(id);
      if (basicReqDataValidation.error) return basicReqDataValidation;

      return await CustomerRepo.getSpecificAccountDetails(id);
    } catch (err) {
      console.log("customer -> service.ts -> getSpecificAccountDetails ", err);
      throw ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    }
  };

  static transferAmountBetweenAccounts = async (accountId: number, transferAmountDetails: any) => {
    try {
      const basicReqDataValidation = await CustomerService.updateDataValidation(
        accountId,
        transferAmountDetails
      );
      if (basicReqDataValidation.error) return basicReqDataValidation;

      // If the transfer amount is insufficient in sender acc
      const accIdQuery = {
        where: { customerAccountId: accountId },
        order: [["createdAt", "DESC"]],
        limit: 1,
      };
      const retrieveAccIdBal: any = await CustomerRepo.checkExistence(
        MODEL_NAMES.ACCOUNT_TRANSACTION,
        accIdQuery
      );
      if (
        retrieveAccIdBal?.balance &&
        retrieveAccIdBal?.balance < transferAmountDetails.transactionAmount
      )
        return { error: true, errorText: ERROR_MESSAGES.INSUFFICIENT_BALANCE };

      // Fetch the receiver acc balance
      const receiverQuery = {
        where: { customerAccountId: transferAmountDetails.transactionAccountId },
        order: [["createdAt", "DESC"]],
        limit: 1,
      };
      const receiverAccBal: any = await CustomerRepo.checkExistence(
        MODEL_NAMES.ACCOUNT_TRANSACTION,
        receiverQuery
      );

      const requestData = [
        {
          ...transferAmountDetails,
          customerAccountId: accountId,
          transactionTypeId: TRANSACTION_TYPES.WITHDRAWAL,
          balance: retrieveAccIdBal.balance - transferAmountDetails.transactionAmount,
        },
        {
          ...transferAmountDetails,
          customerAccountId: transferAmountDetails.transactionAccountId,
          transactionTypeId: TRANSACTION_TYPES.DEPOSIT,
          transactionAccountId: accountId,
          balance: receiverAccBal.balance + transferAmountDetails.transactionAmount,
        },
      ];

      return await CustomerRepo.createAccountTransaction(requestData);
    } catch (err) {
      console.log("customer -> service.ts -> transferAmountBetweenAccounts ", err);
      throw ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    }
  };

  static updateDataValidation = async (accountId: number, transferAmountDetails: any) => {
    try {
      // check the accountId is already exist or not
      const customerAccountQuery = { where: { id: accountId } };
      const checkValidCustAcc = await CustomerRepo.checkExistence(
        MODEL_NAMES.CUSTOMER_ACCOUNT,
        customerAccountQuery
      );
      if (!checkValidCustAcc)
        return { error: true, errorText: ERROR_MESSAGES.CUSTOMER_ACCOUNT_DOES_NOT_EXIST };

      // check the receiver account Id exist or not
      const receiverAccIdQuery = { where: { id: transferAmountDetails?.transactionAccountId } };
      const checkReceiver = await CustomerRepo.checkExistence(
        MODEL_NAMES.CUSTOMER_ACCOUNT,
        receiverAccIdQuery
      );
      if (!checkReceiver)
        return { error: true, errorText: ERROR_MESSAGES.RECEIVER_ACCOUNT_ID_DOES_NOT_EXIST };

      // accountId and transactionAccountId should not be matching
      if (accountId === transferAmountDetails.transactionAccountId)
        return { error: true, errorText: ERROR_MESSAGES.CANT_TRANSFER_WITHIN_SAME_ACCOUNT };

      return { error: false };
    } catch (err) {
      console.log("customer -> service.ts -> updateDataValidation ", err);
      throw ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    }
  };

  static getBalanceByAccountId = async (accountId: number, limit: number, offset: number) => {
    try {
      const basicReqDataValidation = await CustomerService.checkIdInCustomerAccount(accountId);
      if (basicReqDataValidation.error) return basicReqDataValidation;

      return await CustomerRepo.getBalanceByAccountId(accountId, limit, offset);
    } catch (err) {
      console.log("customer -> service.ts -> getSpecificAccountDetails ", err);
      throw ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    }
  };

  static getTransactionHistorybyAccId = async (
    accountId: number,
    limit: number,
    offset: number
  ) => {
    try {
      const basicReqDataValidation = await CustomerService.checkIdInCustomerAccount(accountId);
      if (basicReqDataValidation.error) return basicReqDataValidation;

      return await CustomerRepo.getTransactionHistorybyAccId(accountId, limit, offset);
    } catch (err) {
      console.log("customer -> service.ts -> getTransactionHistorybyAccId ", err);
      throw ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    }
  };
}
