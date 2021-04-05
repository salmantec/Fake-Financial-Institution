import { routesPath } from "../../constants/routes";
import { Express } from "express";
import { handle } from "../common/request-handler";
import * as Controller from "./controller";

export default function (app: Express) {
  // Routes - To get all seeds individually
  app.get(routesPath.GET_ALL_ACCOUNT_TYPE, handle(Controller.getAllAccountTypes));
  app.get(routesPath.GET_ALL_BANK, handle(Controller.getAllBanks));
  app.get(routesPath.GET_ALL_TRANSACTION_TYPE, handle(Controller.getAllTransactionTypes));
}
