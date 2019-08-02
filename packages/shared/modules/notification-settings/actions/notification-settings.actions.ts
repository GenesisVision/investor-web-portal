import { NotificationSettingList } from "gv-api-web";
import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";
import { ActionType } from "shared/utils/types";

export const NOTIFICATION_SETTINGS = "NOTIFICATION_SETTINGS";
export const ADD_NOTIFICATION_SETTINGS = "ADD_NOTIFICATION_SETTINGS";
export const REMOVE_NOTIFICATION_SETTING = "REMOVE_NOTIFICATION_SETTING";
export const ADD_NOTIFICATION_SETTING = "ADD_NOTIFICATION_SETTING";

export const fetchNotificationSettingsAction = (
  auth: string
): ActionType<Promise<NotificationSettingList>> => ({
  type: NOTIFICATION_SETTINGS,
  payload: notificationsApi.v10NotificationsSettingsGet(auth)
});

export interface IRemoveNotificationSettingProps {
  id: string;
  assetId?: string;
  type?: string;
}

export interface IAddNotificationSettingProps {
  assetId?: string;
  managerId?: string;
  type?: string;
  conditionType?: string;
  conditionAmount?: number;
}

export const addNotificationSettingAction = (
  opts: IAddNotificationSettingProps
): ActionType<Promise<string>> => ({
  type: ADD_NOTIFICATION_SETTING,
  payload: notificationsApi.v10NotificationsSettingsAddPost(
    authService.getAuthArg(),
    opts
  )
});

export const removeNotificationSettingAction = (
  id: string
): ActionType<Promise<void>> => ({
  type: REMOVE_NOTIFICATION_SETTING,
  payload: notificationsApi.v10NotificationsSettingsRemoveByIdPost(
    id,
    authService.getAuthArg()
  )
});
