export const routesPath = {
  // Seeds
  GET_ALL_ACCOUNT_TYPE: "/accountTypes",
  GET_ALL_BANK: "/banks",
  GET_ALL_TRANSACTION_TYPE: "/transactionTypes",

  GET_ALL_CUSTOMER: "/customers",
  // Create new bank account for a customer
  CREATE_CUSTOMER_BANK_ACCOUNT: "/customerBankAccount",
  GET_ALL_ACCOUNT_DETAILS: "/accountDetails/:limit/:offset",
  GET_ACCOUNT_DETAILS: "/accountDetail/:id",

  TRANSFER_AMOUNT: "/transferAmount/:accountId",

  GET_BALANCE_BY_ACCOUNT_ID: "/balance/:accountId/:limit/:offset",
  GET_TRANSACTION_HISTORY_BY_ACC_ID: "/transactionHistory/:accountId/:limit/:offset",
};
