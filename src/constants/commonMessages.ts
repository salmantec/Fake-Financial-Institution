export const ERROR_MESSAGES = {
  // Common errors
  SOMETHING_WENT_WRONG: "Something went wrong!",

  // Customer and bank accounts errors
  CUSTOMER_DOES_NOT_EXIST: "Customer does not exist",
  BANK_DOES_NOT_EXIST: "Bank does not exist",
  ACCOUNT_TYPE_DOES_NOT_EXIST: "Account type does not exist",
  CUSTOMER_AND_BANK_ALREADY_EXISTS: "This customer already have an account in the same bank",
  CUSTOMER_ACCOUNT_DOES_NOT_EXIST: "Customer account Id does not exist",
  CANT_TRANSFER_WITHIN_SAME_ACCOUNT: "Cannot transfer the amount within same account",
  RECEIVER_ACCOUNT_ID_DOES_NOT_EXIST: "Receiver account id does not exist",
  INSUFFICIENT_BALANCE: "Insufficient balance",
  ACC_NO_ALREADY_EXISTS: "Account number already exists",
  INVALID_INITIAL_AMOUNT: "Invalid initial amount",

  // Validation messages
  CUSTOMER_ID_VALIDATION: "Customer Id is mandatory and should be number",
  BANK_ID_VALIDATION: "Bank Id is mandatory and should be number",
  ACCOUNT_TYPE_ID_VALIDATION: "Account type Id is mandatory and should be number",
  ACCOUNT_NO_VALIDATION: "Account number is mandatory and should be number",
  INITIAL_AMOUNT_VALIDATION: "Initial amount is mandatory and should be number",
  TRANSACTION_ACC_ID_VALIDATION: "Transaction account id is mandatory and should be number",
  TRANSACTION_AMOUNT_VALIDATION: "Transaction amount is mandatory and should be number",
};

export const SUCCESS_MESSAGES = {
  CUSTOMER_ACC_CREATED_SUCCESSFULLY: "Customer bank account created successfully",
  TRANSFERRED_SUCCESSFULLY: "Amount transferred successfully",
};
