import { ActionType } from "shared/utils/types";

import { IMessage } from "../reducers/alert-message-reducers";
import { ALERT_MESSAGE } from "./alert-message-actions.constants";

const success: AlertActionCreator = (text, isUseLocalization = false) => ({
  type: ALERT_MESSAGE.SUCCESS,
  payload: { className: "alert-message--success", text, isUseLocalization }
});

const warning: AlertActionCreator = (text, isUseLocalization = false) => ({
  type: ALERT_MESSAGE.WARNING,
  payload: { className: "alert-message--warning", text, isUseLocalization }
});

const error: AlertActionCreator = (text, isUseLocalization = false) => ({
  type: ALERT_MESSAGE.ERROR,
  payload: {
    className: "alert-message--danger",
    text,
    isUseLocalization
  }
});

const remove = (id: string): IAlertAction => ({
  type: ALERT_MESSAGE.REMOVE_AT,
  payload: { id }
});

const clearAll = (): IAlertAction => ({
  type: ALERT_MESSAGE.CLEAR_ALL,
  payload: {}
});

export enum ALERT_ACTIONS_FIELDS {
  success = "success",
  warning = "warning",
  error = "error",
  remove = "remove",
  clearAll = "clearAll"
}
const alertMessageActions = {
  [ALERT_ACTIONS_FIELDS.success]: success,
  [ALERT_ACTIONS_FIELDS.warning]: warning,
  [ALERT_ACTIONS_FIELDS.error]: error,
  [ALERT_ACTIONS_FIELDS.remove]: remove,
  [ALERT_ACTIONS_FIELDS.clearAll]: clearAll
};

export { alertMessageActions };

export type AlertActionCreator = (
  text: string,
  isUseLocalization?: boolean
) => IAlertAction;

export type IAlertAction = ActionType<IMessage>;
