import { ErrorViewModel } from "gv-api-web";
import authService from "services/auth-service";

export type ResponseError = {
  errorMessage: string;
  code: string;
};

export const SERVER_CONNECTION_ERROR_CODE = "ServerConnectionError";

interface IResponse {
  statusCode: number;
  body: ErrorViewModel | null;
}

interface IHandleErrorResponseFunc {
  (response: IResponse | Error): ResponseError;
}

const isServerError = (response: IResponse | Error): response is Error => {
  return response instanceof Error;
};

const handleErrorResponse: IHandleErrorResponseFunc = response => {
  if (response && !isServerError(response)) {
    if (response.statusCode === 401) {
      authService.removeToken();
      window.location.reload();
    }
    if (response.body !== null && response.body.errors) {
      return {
        errorMessage: response.body.errors
          .filter((x: any) => !x.property)
          .map((x: any) => x.message)
          .join(", "),
        code: response.body.code
      };
    }
  }

  return {
    errorMessage:
      "Server error occurred. Please try again later or contact the support department.",
    code: SERVER_CONNECTION_ERROR_CODE
  };
};

export default handleErrorResponse;
