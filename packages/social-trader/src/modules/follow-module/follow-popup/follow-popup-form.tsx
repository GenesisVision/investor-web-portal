import "./follow-popup.scss";

import { withBlurLoader } from "decorators/with-blur-loader";
import {
  AttachToSignalProvider,
  SubscriptionMode,
  TradingAccountDetails,
  WalletData
} from "gv-api-web";
import useTab from "hooks/tab.hook";
import FollowCreateExternalAccount from "modules/follow-module/follow-popup/follow-popup-create-external-account";
import React, { useCallback, useEffect, useState } from "react";
import { CurrencyEnum, SetSubmittingType } from "utils/types";

import FollowCreateAccount from "./follow-popup-create-account";
import FollowParams, { FollowParamsFormValues } from "./follow-popup-params";
import FollowTop from "./follow-popup-top";
import FollowSelectAccount, {
  SelectAccountFormValues
} from "./follow-select-account";

const initRequestParams = {
  tradingAccountId: "",
  mode: "ByBalance" as SubscriptionMode,
  percent: 10,
  openTolerancePercent: 0.5,
  fixedVolume: 100,
  fixedCurrency: "USD" as CurrencyEnum
};

const _FollowForm: React.FC<Props> = ({
  isExternal,
  data: accounts,
  id,
  wallets,
  currency,
  hasSignalAccount,
  minDeposit,
  rate = 1,
  submitMethod
}) => {
  const hasAccounts = !!accounts.length;
  const [tradingAccountId, setTradingAccountId] = useState<string | undefined>(
    undefined
  );
  const { tab, setTab } = useTab<TABS>(TABS.SELECT_ACCOUNT);
  const [requestParams, setRequestParams] = useState<AttachToSignalProvider>(
    initRequestParams
  );
  useEffect(() => {
    hasSignalAccount && setTab(null, TABS.PARAMS);
  }, [setTab, hasSignalAccount]);
  const createdCopytradingAccount = useCallback(
    values => {
      setTab(null, TABS.PARAMS);
      setRequestParams({ ...requestParams, ...values });
    },
    [requestParams]
  );
  const selectCopytradingAccount = useCallback(
    ({ account }: SelectAccountFormValues) => {
      setTab(null, TABS.PARAMS);
      setTradingAccountId(account);
    },
    []
  );
  const returnToCreateCopytradingAccount = useCallback(
    () => setTab(null, TABS.SELECT_ACCOUNT),
    []
  );
  const submit = useCallback(
    (
      {
        mode,
        openTolerancePercent,
        percent,
        fixedVolume
      }: FollowParamsFormValues,
      setSubmitting: SetSubmittingType
    ) => {
      const params = {
        ...requestParams,
        tradingAccountId: tradingAccountId!,
        mode,
        openTolerancePercent,
        percent,
        fixedVolume
      };
      setRequestParams(params);
      submitMethod(id, params, setSubmitting);
    },
    [id, requestParams, submitMethod, tradingAccountId]
  );
  const adaptStep =
    tab === TABS.SELECT_ACCOUNT
      ? hasAccounts
        ? isExternal
          ? "select-external-account"
          : "select-account"
        : "create-account"
      : "params";

  return (
    <>
      <FollowTop step={adaptStep} />
      {hasAccounts && tab === TABS.SELECT_ACCOUNT && (
        <FollowSelectAccount
          accounts={accounts}
          onSelect={selectCopytradingAccount}
        />
      )}
      {!hasAccounts &&
        tab === TABS.SELECT_ACCOUNT &&
        (isExternal ? (
          <FollowCreateExternalAccount onClick={createdCopytradingAccount} />
        ) : (
          <FollowCreateAccount
            minDeposit={minDeposit}
            wallets={wallets}
            followCurrency={currency}
            onClick={createdCopytradingAccount}
          />
        ))}
      {tab === TABS.PARAMS && (
        <FollowParams
          rate={rate}
          currency={currency}
          onSubmit={submit}
          onPrevStep={returnToCreateCopytradingAccount}
        />
      )}
    </>
  );
};

enum TABS {
  SELECT_ACCOUNT = "CREATE_ACCOUNT",
  PARAMS = "PARAMS"
}

interface Props {
  hasSignalAccount: boolean;
  isExternal: boolean;
  data: TradingAccountDetails[];
  rate: number;
  minDeposit: number;
  submitMethod: (
    programId: string,
    requestParams: AttachToSignalProvider,
    setSubmitting: SetSubmittingType
  ) => void;
  id: string;
  wallets: WalletData[];
  currency: CurrencyEnum;
}

const FollowForm = withBlurLoader(React.memo(_FollowForm));
export default FollowForm;
