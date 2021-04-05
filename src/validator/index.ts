import { Request, Response } from "express";
import { routesPath } from "../constants/routes";
import { createCustomerBankAcc, transferAmount } from "./validation";

export async function validator(request: Request, response: Response, next: (error?: any) => void) {
  if (request.route.stack[0].method === "post") {
    switch (request.route.path) {
      case routesPath.CREATE_CUSTOMER_BANK_ACCOUNT:
        await createCustomerBankAcc(request);
        break;
    }
  } else if (request.route.stack[0].method === "put") {
    switch (request.route.path) {
      case routesPath.TRANSFER_AMOUNT:
        await transferAmount(request);
        break;
    }
  } else if (request.route.stack[0].method === "get") {
    switch (request.route.path) {
    }
  }

  const result = await request.getValidationResult();
  if (!result.isEmpty()) {
    return response.status(400).send({ error: result.array()[0].msg });
  } else {
    next();
  }
}
