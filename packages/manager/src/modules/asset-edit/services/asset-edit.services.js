import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

import { FUND, PROGRAM } from "../asset-edit.constants";

export const editAsset = (id, editAssetData, type) => dispatch => {
  const authorization = authService.getAuthArg();
  const editMethod =
    type === PROGRAM
      ? managerApi.v10ManagerProgramsByIdUpdatePost
      : managerApi.v10ManagerFundsByIdUpdatePost;
  let data = editAssetData;
  let promise = Promise.resolve(null);
  if (data.logo.cropped) {
    promise = filesService.uploadFile(data.logo.cropped, authorization);
  }
  return promise
    .then(response => {
      data = {
        ...data,
        logo: response || data.logo.id
      };
      return editMethod(id, authorization, { model: data });
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          (type === PROGRAM &&
            "manager.edit-program.notifications.edit-success") ||
            (type === FUND && "manager.edit-fund.notifications.edit-success"),
          true
        )
      );
    });
};
