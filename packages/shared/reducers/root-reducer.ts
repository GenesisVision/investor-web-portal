import { connectRouter } from "connected-react-router";
import passwordRestoreReducer from "shared/components/auth/forgot-password/reducers/password-restore-reducers";
import loginReducer from "shared/components/auth/signin/reducers/login.reducers";
import signUpReducer from "shared/components/auth/signup/reducers/signup.reducers";
import managerReducer from "shared/components/manager/reducers/manager.reducers";
import notificationsReducer, {
  NotificationsState
} from "shared/components/notifications/reducers/notifications.reducers";
import programsRatingReducer, {
  ProgramsRatingState
} from "shared/components/programs-rating/reducers/programs-rating.reducers";
import {
  CopyTradingAccountsReducer,
  CopyTradingAccountsState,
  WalletState,
  walletReducer
} from "shared/components/wallet/reducers/wallet.reducers";
import alertMessagesReducer, {
  AlertMessagesState
} from "shared/modules/alert-message/reducers/alert-message-reducers";
import fundNotificationsReducer, {
  FundNotificationsState
} from "shared/modules/fund-notifications/reducers/fund-notifications.reducers";
import fundsReducer, {
  FundsTableState
} from "shared/modules/funds-table/reducers/funds-table.reducers";
import notificationSettingsReducer, {
  NotificationSettingsState
} from "shared/modules/notification-settings/reducers/notification-settings.reducers";
import programNotificationsReducer, {
  ProgramNotificationsState
} from "shared/modules/program-notifications/reducers/program-notifications.reducers";
import programsReducer, {
  ProgramsListState
} from "shared/modules/programs-table/reducers/programs-table.reducers";
import accountSettingsReducer, {
  AccountSettingsState
} from "shared/reducers/account-settings-reducer";
import { AuthState } from "shared/reducers/auth-reducer";
import { EmailPendingState } from "shared/reducers/email-pending-reducer";
import { PlatformState } from "shared/reducers/platform-reducer";
import { IUiState } from "shared/reducers/ui-reducer";
import history from "shared/utils/history";

import authReducer from "./auth-reducer";
import emailPendingReducer from "./email-pending-reducer";
import headerReducer, { HeaderState } from "./header-reducer";
import platformReducer from "./platform-reducer";
import { RouterState } from "./router-reducer";
import uiReducer from "./ui-reducer";

export const sharedRootReducers = {
  router: connectRouter(history),
  platformData: platformReducer,
  programsData: programsReducer,
  programsRating: programsRatingReducer,
  fundsData: fundsReducer,
  loginData: loginReducer,
  signUpData: signUpReducer,
  authData: authReducer,
  passwordRestoreData: passwordRestoreReducer,
  alertMessages: alertMessagesReducer,
  profileHeader: headerReducer,
  emailPending: emailPendingReducer,
  notifications: notificationsReducer,
  notificationSettings: notificationSettingsReducer,
  programNotifications: programNotificationsReducer,
  fundNotifications: fundNotificationsReducer,
  manager: managerReducer,
  wallet: walletReducer,
  copyTradingAccounts: CopyTradingAccountsReducer,
  accountSettings: accountSettingsReducer,
  ui: uiReducer
};

export type RootState = Readonly<{
  notifications: NotificationsState;
  profileHeader: HeaderState;
  notificationSettings: NotificationSettingsState;
  platformData: PlatformState;
  programsData: ProgramsListState;
  programsRating: ProgramsRatingState;
  fundsData: FundsTableState;
  emailPending: EmailPendingState;
  programNotifications: ProgramNotificationsState;
  fundNotifications: FundNotificationsState;
  authData: AuthState;
  router: RouterState;
  alertMessages: AlertMessagesState;
  accountSettings: AccountSettingsState;
  wallet: WalletState;
  copyTradingAccounts: CopyTradingAccountsState;
  ui: IUiState;
}>;
