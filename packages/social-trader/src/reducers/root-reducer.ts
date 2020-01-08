// import { connectRouter } from "connected-react-router";
import passwordRestoreReducer from "components/auth/forgot-password/reducers/password-restore-reducers";
import loginReducer from "components/auth/signin/reducers/login.reducers";
import signUpReducer from "components/auth/signup/reducers/signup.reducers";
import {
  globalSearchReducer,
  GlobalSearchState
} from "components/global-search/reducers/global-search.reducer";
import notificationsReducer, {
  NotificationsState
} from "components/notifications/reducers/notifications.reducers";
import programsRatingReducer, {
  ProgramsRatingState
} from "components/programs-rating/reducers/programs-rating.reducers";
import alertMessagesReducer, {
  AlertMessagesState
} from "modules/alert-message/reducers/alert-message-reducers";
import followNotificationsReducer from "modules/follow-notifications/reducers/follow-notifications.reducers";
import followsReducer, {
  FollowsListState
} from "modules/follows-table/reducers/follows-table.reducers";
import fundNotificationsReducer, {
  FundNotificationsState
} from "modules/fund-notifications/reducers/fund-notifications.reducers";
import fundsReducer, {
  FundsTableState
} from "modules/funds-table/reducers/funds-table.reducers";
import notificationSettingsReducer, {
  NotificationSettingsState
} from "modules/notification-settings/reducers/notification-settings.reducers";
import programNotificationsReducer, {
  ProgramNotificationsState
} from "modules/program-notifications/reducers/program-notifications.reducers";
import programsReducer, {
  ProgramsListState
} from "modules/programs-table/reducers/programs-table.reducers";
import accountDetailsReducer, {
  AccountDetailsState
} from "pages/accounts/account-details/reducers/account-details.reducer";
import dashboardReducer, {
  DashboardState
} from "pages/dashboard/reducers/dashboard.reducers";
import followDetailsReducer, {
  FollowDetailsState
} from "pages/follows/follow-details/reducers/follow-details.reducer";
import fundDetailsReducer, {
  FundDetailsState
} from "pages/funds/fund-details/reducers/fund-details.reducer";
import programDetailsReducer, {
  ProgramDetailsState
} from "pages/programs/program-details/reducers/program-details.reducer";
import {
  walletReducer,
  WalletState
} from "pages/wallet/reducers/wallet.reducers";
import accountSettingsReducer, {
  AccountSettingsState
} from "reducers/account-settings-reducer";
import authReducer, { AuthState } from "reducers/auth-reducer";
import emailPendingReducer, {
  EmailPendingState
} from "reducers/email-pending-reducer";
import headerReducer, { HeaderState } from "reducers/header-reducer";
import platformReducer, { PlatformState } from "reducers/platform-reducer";
import profileReducer, { ProfileState } from "reducers/profile-reducer";
import tablesViewReducer, {
  TablesViewState
} from "reducers/tables-view-reducer";
import uiReducer, { IUiState } from "reducers/ui-reducer";

export const sharedRootReducers = {
  globalSearch: globalSearchReducer,
  tablesView: tablesViewReducer,
  dashboard: dashboardReducer,
  profile: profileReducer,
  accountDetails: accountDetailsReducer,
  fundDetails: fundDetailsReducer,
  followDetails: followDetailsReducer,
  programDetails: programDetailsReducer,
  // router: connectRouter(history),
  platformData: platformReducer,
  followsData: followsReducer,
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
  followNotifications: followNotificationsReducer,
  programNotifications: programNotificationsReducer,
  fundNotifications: fundNotificationsReducer,
  // manager: managerReducer,
  wallet: walletReducer,
  // copyTradingAccounts: CopyTradingAccountsReducer, TODO
  accountSettings: accountSettingsReducer,
  ui: uiReducer
};

export type RootState = Readonly<{
  globalSearch: GlobalSearchState;
  tablesView: TablesViewState;
  dashboard: DashboardState;
  profile: ProfileState;
  accountDetails: AccountDetailsState;
  fundDetails: FundDetailsState;
  followDetails: FollowDetailsState;
  programDetails: ProgramDetailsState;
  notifications: NotificationsState;
  profileHeader: HeaderState;
  notificationSettings: NotificationSettingsState;
  platformData: PlatformState;
  followsData: FollowsListState;
  programsData: ProgramsListState;
  programsRating: ProgramsRatingState;
  fundsData: FundsTableState;
  emailPending: EmailPendingState;
  followNotifications: ProgramNotificationsState;
  programNotifications: ProgramNotificationsState;
  fundNotifications: FundNotificationsState;
  authData: AuthState;
  // // router: RouterState;
  alertMessages: AlertMessagesState;
  accountSettings: AccountSettingsState;
  wallet: WalletState;
  // copyTradingAccounts: CopyTradingAccountsState;
  ui: IUiState;
}>;
