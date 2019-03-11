import { FormikProps, withFormik } from "formik";
import { ProgramInvestInfo, WalletData } from "gv-api-web";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ASSET, ROLE } from "shared/constants/constants";
import rateApi from "shared/services/api-client/rate-api";
import {
  calculatePercentage,
  convertFromCurrency,
  convertToCurrency
} from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { lazy, number, object } from "yup";

import WalletImage from "shared/components/avatar/wallet-image/wallet-image";

interface IDepositFormOwnProps {
  wallets: WalletData[];
  role: ROLE;
  asset: ASSET;
  entryFee: boolean;
  info: ProgramInvestInfo;
  currency: string;
  disabled: boolean;
  errorMessage: string;
  onSubmit: (amount: any, currency: object) => {};
}

export interface FormValues {
  rate: number;
  maxAmount: number;
  amount: number;
  walletCurrency: string;
}

type OwnProps = InjectedTranslateProps &
  IDepositFormOwnProps &
  FormikProps<FormValues>;

class DepositForm extends React.Component<OwnProps> {
  componentDidMount(): void {
    this.fetchRate({ currencyFrom: this.props.values.walletCurrency });
  }

  composeEntryFee = (fee: any): number => {
    const { entryFee } = this.props;
    return entryFee ? fee : 0;
  };

  entryFee = (amount: number): number => {
    const { info } = this.props;
    return this.composeEntryFee(calculatePercentage(amount, info.entryFee));
  };

  gvFee = (amount: number): number => {
    const { info } = this.props;
    return calculatePercentage(amount, info.gvCommission);
  };

  investAmount = (amount: number): number => {
    return (
      (amount || 0) -
      (this.props.asset === ASSET.PROGRAM ? this.gvFee(amount) : 0) -
      this.entryFee(amount)
    );
  };

  isAllow = (values: any): boolean => {
    const { role, info } = this.props;
    const { floatValue, formattedValue, value } = values;
    const { availableToInvest, availableInWallet } = info;

    const isValidateFraction = validateFraction(value, "GVT");

    const isAvailableInWallet =
      availableInWallet >= this.investAmount(floatValue);

    const isAvailableToInvest =
      role === ROLE.MANAGER ||
      availableToInvest === undefined ||
      floatValue <= parseFloat(String(availableToInvest));

    return (
      formattedValue === "" ||
      (isValidateFraction && isAvailableInWallet && isAvailableToInvest)
    );
  };

  onChangeCurrencyFrom = (name: any, target: any): void => {
    const { setFieldValue } = this.props;
    const walletCurrency = target.props.value;
    setFieldValue("walletCurrency", walletCurrency);
    this.fetchRate({ currencyFrom: walletCurrency });
  };
  fetchRate = (params: {
    currencyFrom?: string;
    currencyTo?: string;
  }): void => {
    const { values, currency, setFieldValue } = this.props;
    rateApi
      .v10RateByFromByToGet(
        params.currencyFrom || values.walletCurrency,
        params.currencyTo || currency
      )
      .then((rate: "Number") => {
        setFieldValue("rate", rate);
      });
  };
  getMaxAmount = () => {
    const { setFieldValue, info, wallets, values, role } = this.props;
    const { walletCurrency, rate } = values;
    const { availableToInvestBase } = info;
    const wallet = wallets.find(wallet => wallet.currency === walletCurrency);
    const maxFromWallet = wallet ? wallet.available : 0;

    let maxAvailable = Number.MAX_SAFE_INTEGER;
    if (availableToInvestBase !== undefined)
      maxAvailable = availableToInvestBase;
    /*(availableToInvestBase /
          (100 -
            (asset === ASSET.PROGRAM ? info.gvCommission : 0) -
            this.composeEntryFee(info.entryFee))) *
        100;*/
    const maxAvailableInWalletCurrency = convertToCurrency(maxAvailable, rate);
    const maxInvest = formatCurrencyValue(
      role === ROLE.INVESTOR
        ? Math.min(maxFromWallet, maxAvailableInWalletCurrency)
        : maxFromWallet,
      walletCurrency
    );
    if (+maxInvest !== +values.maxAmount) setFieldValue("maxAmount", maxInvest);
  };
  setMaxAmount = (): void => {
    const { setFieldValue, values } = this.props;
    const { maxAmount } = values;
    setFieldValue("amount", maxAmount);
  };

  render() {
    this.getMaxAmount();
    const {
      role,
      wallets,
      t,
      asset,
      entryFee,
      values,
      info,
      currency,
      disabled,
      isValid,
      dirty,
      handleSubmit,
      errorMessage
    } = this.props;
    const { walletCurrency, rate } = values;
    const wallet = wallets.find(wallet => wallet.currency === walletCurrency);
    return (
      <form className="dialog__bottom" id="invest-form" onSubmit={handleSubmit}>
        <GVFormikField
          name="walletCurrency"
          component={GVTextField}
          label={t("follow-program.create-account.from")}
          InputComponent={Select}
          onChange={this.onChangeCurrencyFrom}
        >
          {wallets.map((wallet: WalletData) => {
            return (
              <option value={wallet.currency} key={wallet.currency}>
                <WalletImage
                  imageClassName="wallet-transfer-popup__icon"
                  alt={wallet.currency}
                  url={wallet.logo}
                />
                {`${wallet.title} | ${wallet.currency}`}
              </option>
            );
          })}
        </GVFormikField>
        <StatisticItem label={t("deposit-asset.available-in-wallet")} big>
          {formatCurrencyValue(wallet ? wallet.available : 0, walletCurrency)}{" "}
          {walletCurrency}
        </StatisticItem>
        <InputAmountField
          name="amount"
          label={
            asset === ASSET.PROGRAM
              ? t("deposit-asset.amount")
              : t("deposit-asset.amount")
          }
          currency={walletCurrency}
          // isAllow={this.isAllow}
          setMax={this.setMaxAmount}
        />

        <div className="invest-popup__currency">
          {currency !== walletCurrency && (
            <NumberFormat
              value={formatCurrencyValue(
                convertFromCurrency(values.amount, rate),
                currency
              )}
              prefix="≈ "
              suffix={` ${currency}`}
              displayType="text"
            />
          )}
        </div>
        {role === ROLE.INVESTOR && (
          <ul className="dialog-list">
            {entryFee && (
              <li className="dialog-list__item">
                <span className="dialog-list__title">
                  {t("deposit-asset.entry-fee")}
                </span>
                <span className="dialog-list__value">
                  {info.entryFee} %{" "}
                  <NumberFormat
                    value={formatCurrencyValue(
                      this.entryFee(convertFromCurrency(values.amount, rate)),
                      currency
                    )}
                    prefix=" ("
                    suffix={` ${currency})`}
                    displayType="text"
                  />
                </span>
              </li>
            )}
            {asset === ASSET.PROGRAM && (
              <li className="dialog-list__item">
                <span className="dialog-list__title">
                  {t("deposit-asset.gv-commission")}
                </span>
                <span className="dialog-list__value">
                  {info.gvCommission} %
                  <NumberFormat
                    value={formatCurrencyValue(
                      this.gvFee(convertFromCurrency(values.amount, rate)),
                      currency
                    )}
                    prefix={" ("}
                    suffix={` ${currency})`}
                    displayType="text"
                  />
                </span>
              </li>
            )}
            <li className="dialog-list__item">
              <span className="dialog-list__title">
                {t("deposit-asset.investment-amount")}
              </span>
              <span className="dialog-list__value">
                <NumberFormat
                  value={formatCurrencyValue(
                    this.investAmount(convertFromCurrency(values.amount, rate)),
                    currency
                  )}
                  suffix={` ${currency}`}
                  displayType="text"
                />
              </span>
            </li>
          </ul>
        )}
        <div className="form-error">
          <FormError error={errorMessage} />
        </div>
        <div className="dialog__buttons">
          <GVButton
            type="submit"
            className="invest-form__submit-button"
            disabled={disabled || !isValid || !dirty}
          >
            {t("deposit-asset.confirm")}
          </GVButton>
        </div>
        {asset === ASSET.FUND ? (
          <div className="dialog__info">
            {t("deposit-asset.fund.disclaimer")}
          </div>
        ) : null}
      </form>
    );
  }
}

export default compose<React.ComponentType<IDepositFormOwnProps>>(
  translate(),
  withFormik({
    displayName: "invest-form",
    mapPropsToValues: () => ({
      rate: 1,
      maxAmount: "",
      amount: "",
      walletCurrency: "GVT"
    }),
    validationSchema: (params: InjectedTranslateProps & OwnProps) => {
      const { info, t, currency } = params;
      return lazy((values: any) =>
        object().shape({
          rate: number(),
          maxAmount: number(),
          amount: number()
            .required()
            .min(
              +formatCurrencyValue(
                convertToCurrency(info.minInvestmentAmount, values.rate),
                values.walletCurrency
              ),
              t("deposit-asset.validation.amount-min-value", {
                min: formatCurrencyValue(info.minInvestmentAmount, currency),
                currency,
                walletMin: formatCurrencyValue(
                  convertToCurrency(info.minInvestmentAmount, values.rate),
                  values.walletCurrency
                ),
                walletCurrency: values.walletCurrency
              })
            )
            .max(
              values.maxAmount,
              t("deposit-asset.validation.amount-more-than-available")
            )
        })
      );
    },
    handleSubmit: (values, { props }: { props: OwnProps }) => {
      const { walletCurrency, amount } = values;
      props.onSubmit(amount, { currency: walletCurrency });
    }
  })
)(DepositForm);
