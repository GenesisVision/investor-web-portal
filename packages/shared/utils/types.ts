import {
  AmountWithCurrencyCurrencyEnum,
  CancelablePromise,
  ProgramNotificationSettingList
} from "gv-api-web";
import { InvestorRootState } from "investor-web-portal/src/reducers";
import { ManagerRootState } from "manager-web-portal/src/reducers";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { RootState } from "shared/reducers/root-reducer";

export interface IDispatchable<T> {
  (dispatch: Dispatch<ActionType>): T;
}

export type FavoriteActionProps = { id: string; authorization: string };

type FavoriteActionMeta = {
  id: string;
  isFavorite: boolean;
};
export interface FavoriteActionType<T = any> extends ApiAction<T> {
  meta: FavoriteActionMeta;
}

export interface NotificationsActionType<T = ProgramNotificationSettingList>
  extends ActionType {
  errorMessage?: string;
}

export interface ActionType<T = any, U = any> extends Action {
  type: string;
  payload: T;
  meta?: U;
}

export type ApiAction<T = any, U = any> = ActionType<CancelablePromise<T>, U>;

export type RootThunkAction<R = any> = ThunkAction<R, RootState, any, any>;

export interface DispatchType<R> {
  (asyncAction: ActionType): R;
}

type UnpackApiAction<T> = T extends ApiAction<infer U> ? U : T;

interface ApiActionResponse<T> {
  action: T;
  value: UnpackApiAction<T>;
}

export interface MiddlewareDispatch {
  <A extends ApiAction = ApiAction>(apiAction: A): CancelablePromise<
    ApiActionResponse<A>
  >;
  <A extends ActionType = ActionType>(action: A): A;
  <R, S>(asyncAction: RootThunk<R, S>): R;
}

export type RootThunk<R, S = RootState> = (
  dispatch: MiddlewareDispatch,
  getState: () => S
) => R;

export type InvestorThunk<R> = RootThunk<R, InvestorRootState>;
export type ManagerThunk<R> = RootThunk<R, ManagerRootState>;

export type Nullable<T> = T | null;

export type ResponseError = {
  errorMessage: string;
  code: string;
};

export type SetSubmittingType = (isSubmitting: boolean) => void;
export type HandlePeriodChangeType = (period: ChartDefaultPeriod) => void;

export type CurrencyEnum = AmountWithCurrencyCurrencyEnum;

export type AuthRootState = ManagerRootState | InvestorRootState;

export type TGetState = () => RootState;
export type TGetAuthState = () => AuthRootState;
