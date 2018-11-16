import { fetchProfileHeaderInfo } from "modules/header/actions/header-actions";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { push } from "react-router-redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import brokersApi from "shared/services/api-client/brokers-api";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

import { getDataWithoutSuffixes } from "../helpers/create-program.helpers";

export const fetchBrokers = () => brokersApi.v10BrokersGet();

export const fetchBalance = () => dispatch =>
  dispatch(fetchProfileHeaderInfo());

export const createProgram = (createProgramData, setSubmitting) => dispatch => {
  const authorization = authService.getAuthArg();

  let data = getDataWithoutSuffixes(createProgramData, [
    "periodLength",
    "successFee",
    "entryFee",
    "leverage"
  ]);

  let promise = Promise.resolve(null);
  if (data.logo.cropped) {
    promise = filesService.uploadFileProxy(data.logo.cropped, authorization);
  }
  promise
    .then(response => {
      data = {
        ...data,
        logo: response || ""
      };

      return managerApi.v10ManagerProgramsCreatePost(authorization, {
        request: data
      });
    })
    .then(() => {
      setSubmitting(false);
      dispatch(
        alertMessageActions.success(
          "create-program-page.notifications.create-success",
          true
        )
      );
      dispatch(push(DASHBOARD_ROUTE));
    })
    .catch(error => {
      setSubmitting(false);
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};
