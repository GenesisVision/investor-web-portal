import { LoginViewModel } from "gv-api-web";
import authApi from "shared/services/api-client/auth-api";
import { ActionType, ApiAction } from "shared/utils/types";

import { ITwoFactorState } from "./reducers/two-factor.reducer";

export const LOGIN = "LOGIN";
export const LOGIN_TWO_FACTOR = "LOGIN_TWO_FACTOR";
export const TWO_FACTOR_CODE = "twoFactorCode";
export const RECOVERY_CODE = "recoveryCode";

export enum CODE_TYPE {
  TWO_FACTOR = "twoFactorCode",
  RECOVERY = "recoveryCode"
}

export type TStoreTwoFactorAction = ActionType<ITwoFactorState>;
export const storeTwoFactorAction = ({
  email,
  password,
  from
}: ITwoFactorState): TStoreTwoFactorAction => ({
  type: LOGIN_TWO_FACTOR,
  payload: {
    email,
    password,
    from
  }
});

export const loginUserManagerAction = (
  loginData: LoginViewModel
): ApiAction<string> => ({
  type: LOGIN,
  payload: authApi.v10AuthSigninManagerPost({
    model: loginData
  })
});

export const loginUserInvestorAction = (
  loginData: LoginViewModel
): ApiAction<string> => ({
  type: LOGIN,
  payload: authApi.v10AuthSigninInvestorPost({
    model: loginData
  })
});
