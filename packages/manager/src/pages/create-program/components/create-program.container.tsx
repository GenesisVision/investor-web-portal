import { push } from "connected-react-router";
import {
  Broker,
  CancelablePromise,
  ManagerProgramCreateResult,
  ProfileHeaderViewModel,
  ProgramsInfo,
  WalletData
} from "gv-api-web";
import ConfirmContainer from "modules/confirm/confirm-container";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { ManagerRootState } from "reducers";
import { compose } from "redux";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { headerSelector } from "shared/reducers/header-reducer";
import { programsInfoSelector } from "shared/reducers/platform-reducer";
import { rateApi } from "shared/services/api-client/rate-api";
import {
  MiddlewareDispatch,
  ResponseError,
  SetSubmittingType
} from "shared/utils/types";

import {
  createProgram,
  fetchBrokers
} from "../services/create-program.service";
import CreateProgramBroker from "./create-program-broker/create-program-broker";
import CreateProgramSettingsSection from "./create-program-settings/create-program-settings-section";

enum TAB {
  BROKER = "BROKER",
  SETTINGS = "SETTINGS"
}

class _CreateProgramContainer extends React.PureComponent<Props, State> {
  state: State = {
    minimumDepositsAmount: undefined,
    tab: TAB.BROKER,
    selectedBroker: undefined,
    brokers: undefined,
    isPending: true,
    isConfirmDialogVisible: false,
    isNavigationDialogVisible: false
  };

  componentDidMount() {
    const { service } = this.props;
    service.fetchWallets();
    fetchBrokers().then(brokers => {
      this.setState({
        brokers: brokers,
        selectedBroker: brokers[0],
        minimumDepositsAmount: brokers[0].accountTypes[0].minimumDepositsAmount,
        isPending: false
      });
    });
  }

  selectBroker = (brokerName: string) => () => {
    const selectedBroker = this.state.brokers!.find(x => x.name === brokerName);
    const minimumDepositsAmount = selectedBroker
      ? selectedBroker.accountTypes[0].minimumDepositsAmount
      : undefined;
    this.setState({ minimumDepositsAmount, selectedBroker });
  };

  confirmNavigateToBroker = (
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    this.setState({ tab: TAB.BROKER, isNavigationDialogVisible: false }, () => {
      setSubmitting(false);
    });
  };

  navigateToSettings = () => {
    this.setState({ tab: TAB.SETTINGS });
  };

  navigateToBroker = () => {
    this.setState({ isNavigationDialogVisible: true });
  };

  fetchRate = (
    fromCurrency: string,
    toCurrency: string
  ): CancelablePromise<number> => {
    return rateApi.v10RateByFromByToGet(fromCurrency, toCurrency);
  };

  createProgram = (data: any, setSubmitting: SetSubmittingType) => {
    const {
      createProgram,
      redirectToDashboard,
      notifyError,
      notifySuccess,
      fetchWallets
    } = this.props.service;
    createProgram(data)
      .then(res => {
        const { programId, twoFactorRequired } = res;
        if (twoFactorRequired)
          this.setState({
            programId,
            twoFactorRequired,
            isConfirmDialogVisible: true
          });
        else {
          redirectToDashboard();
          notifySuccess(
            "manager.create-program-page.notifications.create-success"
          );
          fetchWallets();
          setSubmitting(false);
        }
      })
      .catch((error: ResponseError) => {
        setSubmitting(false);
        notifyError(error.errorMessage);
      });
  };

  closeConfirm = () => {
    this.setState({ isConfirmDialogVisible: false });
    this.props.service.redirectToDashboard();
  };

  render() {
    const {
      minimumDepositsAmount,
      tab,
      selectedBroker,
      isPending,
      brokers,
      twoFactorRequired,
      programId,
      isConfirmDialogVisible,
      isNavigationDialogVisible
    } = this.state;

    const { t, headerData, service, programsInfo, wallets } = this.props;
    if (
      !brokers ||
      !selectedBroker ||
      !programsInfo ||
      !headerData ||
      !wallets.length ||
      !minimumDepositsAmount
    )
      return null;
    return (
      <div className="create-program-page__container">
        <div className="create-program-page__tabs">
          <GVTabs value={tab}>
            <GVTab
              value={TAB.BROKER}
              label={t("manager.create-program-page.tabs.select-broker")}
            />
            <GVTab
              value={TAB.SETTINGS}
              label={t("manager.create-program-page.tabs.settings")}
            />
          </GVTabs>
        </div>
        {!isPending && (
          <div>
            {tab === TAB.BROKER && (
              <CreateProgramBroker
                navigateToSettings={this.navigateToSettings}
                brokers={brokers}
                selectedBroker={selectedBroker}
                selectBroker={this.selectBroker}
                isForexAllowed={headerData.allowForex}
                isKycConfirmed={headerData.kycConfirmed}
              />
            )}
            {tab === TAB.SETTINGS && (
              <CreateProgramSettingsSection
                minimumDepositsAmount={minimumDepositsAmount}
                fetchWallets={service.fetchWallets}
                fetchRate={this.fetchRate}
                wallets={wallets}
                navigateBack={this.navigateToBroker}
                broker={selectedBroker}
                onSubmit={this.createProgram}
                notifyError={service.notifyError}
                author={headerData.name}
                programsInfo={programsInfo}
              />
            )}
            {twoFactorRequired && (
              <ConfirmContainer
                open={isConfirmDialogVisible}
                onClose={this.closeConfirm}
                onApply={this.closeConfirm}
                programId={programId!}
              />
            )}
            <ConfirmPopup
              open={isNavigationDialogVisible}
              onClose={() =>
                this.setState({ isNavigationDialogVisible: false })
              }
              onApply={this.confirmNavigateToBroker}
              body={t("manager.create-program-page.navigation-back-text")}
              applyButtonText={t("buttons.continue")}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ManagerRootState): StateProps => ({
  wallets: walletsSelector(state),
  headerData: headerSelector(state),
  programsInfo: programsInfoSelector(state)
});

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => ({
  service: {
    redirectToDashboard: () => dispatch(push(DASHBOARD_ROUTE)),
    createProgram: (data: any) => dispatch(createProgram(data)),
    fetchWallets: () => dispatch(fetchWallets()),
    notifyError: (message: string) =>
      dispatch(alertMessageActions.error(message)),
    notifySuccess: (message: string) =>
      dispatch(alertMessageActions.success(message, true))
  }
});

const CreateProgramContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect<StateProps, DispatchProps, OwnProps, ManagerRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_CreateProgramContainer);
export default CreateProgramContainer;

interface OwnProps {}

interface State {
  minimumDepositsAmount?: { [key: string]: number };
  selectedBroker?: Broker;
  brokers?: Broker[];
  isPending: boolean;
  tab: TAB.BROKER | TAB.SETTINGS;
  isNavigationDialogVisible: boolean;
  isConfirmDialogVisible: boolean;
  twoFactorRequired?: boolean;
  programId?: string;
}

interface StateProps {
  programsInfo?: ProgramsInfo;
  wallets: WalletData[];
  headerData?: ProfileHeaderViewModel;
}

interface DispatchProps {
  service: {
    fetchWallets: () => void;
    createProgram: (data: any) => CancelablePromise<ManagerProgramCreateResult>;
    notifyError: (message: string) => void;
    notifySuccess: (message: string) => void;
    redirectToDashboard: () => void;
  };
}

interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    InjectedTranslateProps {}
