import { goBack } from "connected-react-router";
import { PlatformAsset, PlatformInfo, WalletData } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ResolveThunks, connect } from "react-redux";
import { ManagerRootState } from "reducers";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import useIsOpen from "shared/hooks/is-open.hook";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { nameSelector } from "shared/reducers/header-reducer";
import {
  fundAssetsSelector,
  platformDataSelector
} from "shared/reducers/platform-reducer";
import { rateApi } from "shared/services/api-client/rate-api";
import { SetSubmittingType } from "shared/utils/types";

import {
  createFund,
  fetchMinimumDepositAmount
} from "../services/create-fund.service";
import { ICreateFundSettingsFormValues } from "./create-fund-settings/create-fund-settings";
import CreateFundSettingsSection from "./create-fund-settings/create-fund-settings-section";

const _CreateFundContainer: React.FC<Props> = ({
  t,
  author,
  service,
  platformSettings,
  fundAssets,
  wallets
}) => {
  const [isPending, setIsPending, setNotIsPending] = useIsOpen();
  const [
    isNavigationDialogVisible,
    setIsNavigationDialogVisible,
    setNotIsNavigationDialogVisible
  ] = useIsOpen();
  const [minimumDepositAmount, setMinimumDepositAmount] = useState<
    number | undefined
  >(undefined);
  useEffect(() => {
    setIsPending();
    service.fetchWallets();
    fetchMinimumDepositAmount()
      .then(setMinimumDepositAmount)
      .then(setNotIsPending); // TODO change to finally
  }, []);
  const handleSubmit = useCallback(
    (values: ICreateFundSettingsFormValues, setSubmitting: SetSubmittingType) =>
      service.createFund(values, setSubmitting),
    []
  );
  if (!platformSettings || !wallets.length || !minimumDepositAmount)
    return null;
  return (
    <div className="create-fund-container">
      <div>
        {!isPending && (
          <CreateFundSettingsSection
            fetchWallets={service.fetchWallets}
            wallets={wallets}
            navigateBack={setIsNavigationDialogVisible}
            onSubmit={handleSubmit}
            author={author}
            assets={fundAssets}
            minimumDepositAmount={minimumDepositAmount}
            managerMaxExitFee={platformSettings.programsInfo.managerMaxExitFee}
            managerMaxEntryFee={
              platformSettings.programsInfo.managerMaxEntryFee
            }
            notifyError={service.notifyError}
            fetchRate={rateApi.v10RateByFromByToGet}
          />
        )}
        <ConfirmPopup
          open={isNavigationDialogVisible}
          onClose={setNotIsNavigationDialogVisible}
          onApply={service.goBack}
          body={t("manager.create-fund-page.navigation-back-text")}
          applyButtonText={t("buttons.continue")}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: ManagerRootState): StateProps => ({
  wallets: walletsSelector(state),
  author: nameSelector(state),
  platformSettings: platformDataSelector(state),
  fundAssets: fundAssetsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      goBack,
      createFund,
      fetchWallets,
      notifyError: alertMessageActions.error
    },
    dispatch
  )
});

const CreateFundContainer = compose<React.ComponentType>(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_CreateFundContainer);
export default CreateFundContainer;

interface StateProps {
  wallets: WalletData[];
  author: string;
  platformSettings: PlatformInfo | undefined;
  fundAssets: PlatformAsset[];
}

interface ServiceThunks extends ActionCreatorsMapObject {
  goBack: typeof goBack;
  createFund: typeof createFund;
  fetchWallets: typeof fetchWallets;
  notifyError: typeof alertMessageActions.error;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends StateProps, DispatchProps, InjectedTranslateProps {}
