import { Request, Response } from "express";
import * as _ from "lodash";

export class RequestHandler {
  private request: Request;
  private response: Response;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  getBody() {
    return this.request.body;
  }

  getRequest() {
    return this.request;
  }

  getResponse() {
    return this.response;
  }

  getQueryParameter(key: string) {
    return this.request.query[key];
  }

  getRequestParameterAsString(key: string) {
    return this.request.params[key];
  }

  getRequestParameterAsNumber(key: string) {
    const value = parseInt(this.request.params[key]);
    return _.isNaN(value) ? undefined : value;
  }

  getRequestParameterAsBoolean(key: string) {
    return this.request.params[key] === "true" ? true : false;
  }
  getRequestQueryParameter(key: string) {
    return this.request.query[key];
  }

  validate(field: string, message: string) {
    return this.request.assert(field, message);
  }

  async performValidation(): Promise<boolean> {
    const result = await this.request.getValidationResult();
    if (!result.isEmpty()) {
      this.sendValidationError({ message: result.array()[0].msg });
      return false;
    }
    return true;
  }

  sendResponse(data?: object) {
    return this.response.status(200).send(data);
  }

  sendNotFoundResponse(data?: object) {
    return this.response.status(404).send(data);
  }

  sendCreatedResponse(data?: object) {
    return this.response.status(201).send(data);
  }

  sendValidationError(error?: any) {
    return this.response.status(400).send({ error });
  }

  sendServerError(error?: any) {
    return this.response.status(500).send({ error });
  }

  handleCreatedResponse(data: { error: boolean; errorText: string; values: any }) {
    if (data.error) return this.sendValidationError(data.errorText);
    else return this.sendCreatedResponse(data.values);
  }

  handleResponse(data: { error: boolean; errorText: string; values: any }) {
    if (data.error === undefined) return this.sendResponse(data);
    if (data.error) return this.sendValidationError(data.errorText);
    else return this.sendResponse(data.values);
  }
}

export function handle(method: (handler: RequestHandler, next?: () => void) => void) {
  return (request: Request, response: Response, next: () => void) => {
    method(new RequestHandler(request, response), next);
  };
}
