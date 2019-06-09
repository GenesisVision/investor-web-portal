import { FundNotificationSettingList } from "gv-api-web";
import defaultReducer from "shared/reducers/reducer-creators/default-reducer";
import { NotificationsActionType } from "shared/utils/types";

import {
  ADD_FUND_NOTIFICATIONS,
  TAddFundNotificationsAction
} from "../actions/fund-notifications.actions";

export type FundNotificationsState = Readonly<{
  [name: string]: FundNotificationSettingList | undefined;
}>;

const initialState: FundNotificationsState = {};

const fundNotificationsReducer = (
  state: FundNotificationsState = initialState,
  action: NotificationsActionType<FundNotificationSettingList>
): FundNotificationsState =>
  defaultReducer<TAddFundNotificationsAction, FundNotificationsState>(
    action,
    state,
    initialState,
    ADD_FUND_NOTIFICATIONS,
    true
  );

export default fundNotificationsReducer;
