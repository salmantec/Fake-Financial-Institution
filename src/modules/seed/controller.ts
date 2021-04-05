import Service from "./service";
import { RequestHandler } from "../common/request-handler";

// For Get All Account Types
export const getAllAccountTypes = (handler: RequestHandler) => {
  Service.getAllAccountTypes()
    .then((res: any) => handler.handleResponse(res))
    .catch((err: Error) => handler.sendServerError(err));
};

// For Get All Banks
export const getAllBanks = (handler: RequestHandler) => {
  Service.getAllBanks()
    .then((res: any) => handler.handleResponse(res))
    .catch((err: Error) => handler.sendServerError(err));
};

// For Get All Transaction Types
export const getAllTransactionTypes = (handler: RequestHandler) => {
  Service.getAllTransactionTypes()
    .then((res: any) => handler.handleResponse(res))
    .catch((err: Error) => handler.sendServerError(err));
};
