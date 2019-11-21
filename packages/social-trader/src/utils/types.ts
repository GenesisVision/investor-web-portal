import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import {
  CancelablePromise,
  Currency,
  FundAssetPart,
  PlatformAsset,
  ProgramNotificationSettingList
} from "gv-api-web";
import { NextPage, NextPageContext } from "next";
import { AppContextType } from "next/dist/next-server/lib/utils";
import React from "react";
import { AuthRootState as SocialTraderAuthRootState } from "reducers";
import { RootState } from "reducers/root-reducer";
import { Action, AnyAction, Dispatch, Store } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export type ReduxDispatch = ThunkDispatch<RootState, any, Action>;

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
  payload?: T;
  meta?: U;
}

export type ApiAction<T = any, U = any> = ActionType<CancelablePromise<T>, U>;

export type RootThunkAction<R = any> = ThunkAction<R, AuthRootState, any, any>;

export interface DispatchType<R> {
  (asyncAction: ActionType): R;
}

type UnpackApiAction<T> = T extends ApiAction<infer U> ? U : T;

interface ApiActionResponse<T> {
  action: T;
  value: UnpackApiAction<T>;
}

export interface MiddlewareDispatch {
  <A extends ApiAction = ApiAction>(apiAction: A): Promise<
    ApiActionResponse<A>
  >;
  <A extends ActionType = ActionType>(action: A): A;
  <R, S>(asyncAction: RootThunk<R, S>): R;
}

export type RootThunk<R, S = AuthRootState> = (
  dispatch: MiddlewareDispatch,
  getState: () => S
) => R;

export type InvestorThunk<R> = RootThunk<R, AuthRootState>;
export type ManagerThunk<R> = RootThunk<R, AuthRootState>;

export type Nullable<T> = T | null;

export type ResponseError = {
  errorMessage: string;
  code: string;
};

export type SetSubmittingType = (isSubmitting: boolean) => void;
export type HandlePeriodChangeType = (period: ChartDefaultPeriod) => void;

export type CurrencyEnum = Currency;

export type AuthRootState = SocialTraderAuthRootState;

export type TGetState = () => RootState;
export type TGetAuthState = () => AuthRootState;

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type InitializeStoreType = (initialState?: {}) => Store<
  any,
  ActionType<any, any>
> & {
  dispatch: any;
};

export interface RootStore<S = any, A extends Action = AnyAction>
  extends Store<S, A> {
  dispatch: MiddlewareDispatch;
}

export interface NextPageWithReduxContext extends NextPageContext {
  // @ts-ignore
  reduxStore: RootStore<AuthRootState, RootThunkAction>; //TODO error
}

export interface AppWithReduxContext extends AppContextType {
  ctx: NextPageWithReduxContext;
}

export interface NextPageWithRedux<P = void, IP = P> extends NextPage<P, IP> {
  getInitialProps?(ctx: NextPageWithReduxContext): Promise<IP>;
}
export type DispatchDescriptionType = () => (
  dispatch: MiddlewareDispatch,
  getState: () => RootState
) => ReturnType<MiddlewareDispatch>;

export type PlatformAssetFull = PlatformAsset & FundAssetPart;

export type FeesType = {
  entryFee?: number;
  entryFeeSelected?: number;
  entryFeeCurrent?: number;
  successFee?: number;
  successFeeSelected?: number;
  successFeeCurrent?: number;
  successFeePersonal?: number;
  exitFee?: number;
  exitFeePersonal?: number;
};

export type TagType =
  | React.ComponentType<{ className?: string; style?: any }>
  | string;
