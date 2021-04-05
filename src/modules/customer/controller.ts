import Service from "./service";
import { RequestHandler } from "../common/request-handler";

// For Get Customers
export const getAllCustomers = (handler: RequestHandler) => {
  Service.getAllCustomers()
    .then((res: any) => handler.handleResponse(res))
    .catch((err: any) => handler.sendServerError(err));
};

// Controller for create customer bank account
export const createCustomerBankAcc = (handler: RequestHandler) => {
  const customerBankDetails = handler.getBody();
  Service.createCustomerBankAcc(customerBankDetails)
    .then((res: any) => handler.handleResponse(res))
    .catch((err: any) => handler.sendServerError(err));
};

export const getAllAccountDetails = (handler: RequestHandler) => {
  const limit = handler.getRequestParameterAsNumber("limit");
  const offset = handler.getRequestParameterAsNumber("offset");
  Service.getAllAccountDetails(limit, offset)
    .then((res: any) => handler.handleResponse(res))
    .catch((err: any) => handler.sendServerError(err));
};

export const getSpecificAccountDetails = (handler: RequestHandler) => {
  const id = handler.getRequestParameterAsNumber("id");
  Service.getSpecificAccountDetails(id)
    .then((res: any) => handler.handleResponse(res))
    .catch((err: any) => handler.sendServerError(err));
};

export const transferAmountBetweenAccounts = (handler: RequestHandler) => {
  const accountId = handler.getRequestParameterAsNumber("accountId");
  const transferAmountDetails = handler.getBody();
  Service.transferAmountBetweenAccounts(accountId, transferAmountDetails)
    .then((res: any) => handler.handleResponse(res))
    .catch((err: any) => handler.sendServerError(err));
};

export const getBalanceByAccountId = (handler: RequestHandler) => {
  const accountId = handler.getRequestParameterAsNumber("accountId");
  const limit = handler.getRequestParameterAsNumber("limit");
  const offset = handler.getRequestParameterAsNumber("offset");
  Service.getBalanceByAccountId(accountId, limit, offset)
    .then((res: any) => handler.handleResponse(res))
    .catch((err: any) => handler.sendServerError(err));
};

export const getTransactionHistorybyAccId = (handler: RequestHandler) => {
  const accountId = handler.getRequestParameterAsNumber("accountId");
  const limit = handler.getRequestParameterAsNumber("limit");
  const offset = handler.getRequestParameterAsNumber("offset");
  Service.getTransactionHistorybyAccId(accountId, limit, offset)
    .then((res: any) => handler.handleResponse(res))
    .catch((err: any) => handler.sendServerError(err));
};
