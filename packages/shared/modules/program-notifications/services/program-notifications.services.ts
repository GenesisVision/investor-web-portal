import { NextPageContext } from "next";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import {
  TAddNotification,
  TRemoveNotification,
  TToggleNotification
} from "shared/modules/asset-notifications/asset-notifications.types";
import {
  addNotificationSettingAction,
  removeNotificationSettingAction
} from "shared/modules/notification-settings/actions/notification-settings.actions";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";

import {
  addErrorMessageAction,
  addProgramNotificationsAction,
  fetchProgramNotificationsAction,
  toggleProgramNotificationsAction
} from "../actions/program-notifications.actions";

export const fetchProgramNotifications = (
  id: string,
  ctx?: NextPageContext
) => async (dispatch: MiddlewareDispatch) => {
  const authorization = authService.getAuthArg(ctx);
  await dispatch(fetchProgramNotificationsAction(id, authorization)).then(
    data => dispatch(addProgramNotificationsAction(data.value))
  );
};

export const addProgramNotification: TAddNotification = (
  opts,
  message
) => dispatch =>
  dispatch(addNotificationSettingAction(opts))
    .then(() => {
      dispatch(fetchProgramNotifications(opts.assetId!));
      dispatch(alertMessageActions.success(message));
    })
    .catch(data => {
      dispatch(addErrorMessageAction(data.errorMessage));
    });

export const removeProgramNotification: TRemoveNotification = (
  { id, assetId },
  message
) => dispatch =>
  dispatch(removeNotificationSettingAction(id)).then(() => {
    dispatch(fetchProgramNotifications(assetId!));
    dispatch(alertMessageActions.success(message));
  });

export const toggleProgramNotification: TToggleNotification = ({
  id,
  enabled,
  assetId
}) => dispatch =>
  dispatch(toggleProgramNotificationsAction(id, enabled)).then(() => {
    dispatch(fetchProgramNotifications(assetId));
  });
