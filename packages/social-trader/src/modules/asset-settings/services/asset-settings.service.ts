import { CancelablePromise, ProgramUpdate } from "gv-api-web";
import { Dispatch } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { ASSET } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
// import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";
import { ManagerThunk, ResponseError } from "shared/utils/types";

export const cancelChangeBrokerMethod = (
  programId: string
): ManagerThunk<CancelablePromise<void>> => dispatch =>
  new CancelablePromise<void>(() => {});
// managerApi
//   .cancelChangeBroker(authService.getAuthArg(), {
//     programId
//   })
//   .then(() => {
//     dispatch(
//       alertMessageActions.success(
//         "program-settings.notifications.broker-success",
//         true
//       )
//     );
//   })
//   .catch((error: ResponseError) => {
//     dispatch(alertMessageActions.error(error.errorMessage));
//   });

export const changeBrokerMethod = (
  programId: string,
  newBrokerAccountTypeId: string,
  newLeverage: number
): ManagerThunk<CancelablePromise<void>> => dispatch =>
  new CancelablePromise<void>(() => {});
// managerApi
//   .changeBroker(authService.getAuthArg(), {
//     request: { programId, newBrokerAccountTypeId, newLeverage }
//   })
//   .then(() => {
//     dispatch(
//       alertMessageActions.success(
//         "program-settings.notifications.broker-success",
//         true
//       )
//     );
//   })
//   .catch((error: ResponseError) => {
//     dispatch(alertMessageActions.error(error.errorMessage));
//   });

export const editAsset = (props: {
  id: string;
  editAssetData: IAssetEditFormValues;
  type: ASSET;
}): CancelablePromise<void> => {
  return new CancelablePromise<void>(() => {});
  // const authorization = authService.getAuthArg();
  // let data = editAssetData;
  // let promise = Promise.resolve("") as CancelablePromise<any>;
  // if (data.logo.image)
  //   promise = filesService.uploadFile(
  //     data.logo.image.cropped,
  //     authorization
  //   ) as CancelablePromise<any>;
  //
  // return promise
  //   .then(response => {
  //     data = {
  //       ...data,
  //       logo: response || data.logo.src
  //     };
  //     return managerApi.updateInvestmentProgram(id, authorization, {
  //       model: data as ProgramUpdate
  //     }); //TODO ask backend to change ProgramUpdate logo type
  //   })
  //   .then(() => {
  //     dispatch(
  //       alertMessageActions.success(
  //         (type === ASSET.PROGRAM &&
  //           "edit-program.notifications.edit-success") ||
  //           (type === ASSET.FUND && "edit-fund.notifications.edit-success") ||
  //           "",
  //         true
  //       )
  //     );
  //   })
  //   .catch(({ errorMessage }: { errorMessage: string }) =>
  //     dispatch(alertMessageActions.error(errorMessage))
  //   ) as CancelablePromise<void>;
};

export const closeProgram: TCloseAsset = ({
  onSuccess,
  onError,
  id,
  opts
}) => dispatch => {
  return new CancelablePromise<void>(() => {});
  // const authorization = authService.getAuthArg();
  // managerApi
  //   .closeInvestmentProgram(id, authorization, opts)
  //   .then(() => {
  //     onSuccess();
  //     dispatch(
  //       alertMessageActions.success(
  //         "program-details-page.description.close-program-notification-success",
  //         true
  //       )
  //     );
  //   })
  //   .catch((error: { errorMessage: string }) => {
  //     onError();
  //     dispatch(alertMessageActions.error(error.errorMessage));
  //   });
};

export const closeFund: TCloseAsset = ({
  onSuccess,
  onError,
  id,
  opts
}) => dispatch => {};
// managerApi
//   .closeFund(id, authService.getAuthArg(), opts)
//   .then(() => {
//     onSuccess();
//     dispatch(
//       alertMessageActions.success(
//         "fund-details-page.description.close-fund-notification-success",
//         true
//       )
//     );
//   })
//   .catch((error: { errorMessage: string }) => {
//     onError();
//     dispatch(alertMessageActions.error(error.errorMessage));
//   });

export type TCloseAsset = (opts: {
  onSuccess: () => void;
  onError: () => void;
  id: string;
  opts?: {
    twoFactorCode?: string;
  };
}) => (dispatch: Dispatch) => void;

export enum ASSET_EDIT_FIELDS {
  stopOutLevel = "stopOutLevel",
  title = "title",
  description = "description",
  logo = "logo",
  investmentLimit = "investmentLimit",
  hasInvestmentLimit = "hasInvestmentLimit"
}

export interface IAssetEditFormValues {
  [ASSET_EDIT_FIELDS.title]: string;
  [ASSET_EDIT_FIELDS.description]: string;
  [ASSET_EDIT_FIELDS.logo]: IImageValue;
  [ASSET_EDIT_FIELDS.stopOutLevel]: number;
  [ASSET_EDIT_FIELDS.investmentLimit]: number | null;
}
