import { fetchProfileHeaderInfoAction } from "components/header/actions/header-actions";
import {
  addNotificationsAction,
  addTotalNotificationsAction,
  calculateOptions,
  clearNotificationsAction,
  setNotificationsOptionsAction
} from "components/notifications/actions/notifications.actions";
import { CancelablePromise, NotificationList } from "gv-api-web";
import notificationsApi from "services/api-client/notifications-api";
import authService from "services/auth-service";
import { RootThunk } from "utils/types";

export const serviceGetNotifications = (): RootThunk<
  CancelablePromise<NotificationList>
> => (dispatch, getState): CancelablePromise<NotificationList> => {
  const { notifications } = getState();
  return notificationsApi
    .getNotifications(authService.getAuthArg(), notifications.options)
    .then(response => {
      const options = calculateOptions(notifications.options, response.total);
      dispatch(addTotalNotificationsAction(response.total));
      dispatch(addNotificationsAction(response.notifications));
      dispatch(setNotificationsOptionsAction(options));
      return response;
    });
};

export const serviceClearNotifications = (): RootThunk<void> => dispatch => {
  dispatch(clearNotificationsAction());
  dispatch(addTotalNotificationsAction(0));
  dispatch(setNotificationsOptionsAction(calculateOptions()));
  dispatch(fetchProfileHeaderInfoAction());
};
