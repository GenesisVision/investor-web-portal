import "./wallet-withdraw-form.scss";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import filesService from "shared/services/file-service";
import { formatValue, validateFraction } from "shared/utils/formatter";
import { formatCurrencyValue } from "shared/utils/formatter";
import {
  btcUsdtWalletValidator,
  ethGvtWalletValidator
} from "shared/utils/validators/validators";
import { lazy, object, string } from "yup";

class WalletWithdrawForm extends Component {
  onChangeCurrency = (name, target) => {
    const { setFieldValue } = this.props;
    setFieldValue("currency", target.props.value);
    setFieldValue("amount", "");
  };

  render() {
    const {
      t,
      twoFactorEnabled,
      handleSubmit,
      wallets,
      values,
      disabled,
      isValid,
      dirty,
      errorMessage,
      setFieldValue
    } = this.props;

    const { currency, amount } = values;

    const selected = wallets.find(wallet => wallet.currency === currency) || {};

    const { withdrawalCommission = null, available = null } = selected;

    const willGet = Math.max(parseFloat(amount) - withdrawalCommission, 0);

    const isAllow = values => {
      const { floatValue, formattedValue, value, currency } = values;
      return (
        formattedValue === "" ||
        (validateFraction(value, currency) &&
          floatValue <= parseFloat(available))
      );
    };

    const setMaxAmount = () => {
      setFieldValue("amount", formatCurrencyValue(available, currency));
    };

    return (
      <form
        id="wallet-withdraw"
        className="wallet-withdraw-popup"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{t("wallet-withdraw.title")}</h2>
          </div>
          <div className="dialog-field">
            <div className="gv-text-field__wrapper">
              <StatisticItem label={t("wallet-withdraw.available")} big>
                {`${formatCurrencyValue(available, currency)} ${currency}`}
              </StatisticItem>
            </div>
          </div>
          <GVFormikField
            name="currency"
            component={GVTextField}
            label={t("wallet-withdraw.select-currency")}
            InputComponent={Select}
            onChange={this.onChangeCurrency}
          >
            {wallets.map(wallet => {
              return (
                <option value={wallet.currency} key={wallet.currency}>
                  <img
                    src={filesService.getFileUrl(wallet.logo)}
                    className="wallet-withdraw-popup__icon"
                    alt={wallet.currency}
                  />
                  {`${wallet.title} | ${wallet.currency}`}
                </option>
              );
            })}
          </GVFormikField>
        </div>
        <div className="dialog__bottom">
          <InputAmountField
            name="amount"
            label={t("wallet-withdraw.amount")}
            currency={currency}
            isAllow={isAllow}
            setMax={setMaxAmount}
          />
          <GVFormikField
            name="address"
            label={t("wallet-withdraw.address")}
            component={GVTextField}
            autoComplete="off"
          />
          {twoFactorEnabled && (
            <GVFormikField
              type="text"
              name="twoFactorCode"
              label={t("wallet-withdraw.two-factor-code-label")}
              autoComplete="off"
              component={GVTextField}
            />
          )}
          <ul className="dialog-list">
            <li className="dialog-list__item">
              <span className="dialog-list__title">
                {t("wallet-withdraw.will-get")}
              </span>
              <span className="dialog-list__value">
                <NumberFormat
                  value={formatCurrencyValue(willGet, currency)}
                  suffix={` ${currency}`}
                  displayType="text"
                />
              </span>
            </li>
            <li className="dialog-list__item">
              <span className="dialog-list__title">
                {t("wallet-withdraw.fee")}
              </span>
              <span className="dialog-list__value">
                <NumberFormat
                  value={formatCurrencyValue(withdrawalCommission, currency)}
                  suffix={` ${currency}`}
                  displayType="text"
                />
              </span>
            </li>
          </ul>
          <div className="form-error">{errorMessage}</div>
          <div className="dialog__buttons">
            <GVButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={disabled || !isValid || !dirty}
            >
              {t("buttons.confirm")}
            </GVButton>
          </div>
        </div>
      </form>
    );
  }
}

WalletWithdrawForm.propTypes = {
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      withdrawalCommission: PropTypes.number,
      currency: PropTypes.string,
      title: PropTypes.string,
      logo: PropTypes.string,
      rateToGvt: PropTypes.number
    })
  ),
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func
};

const twoFactorvalidator = (t, twoFactorEnabled) => {
  return twoFactorEnabled
    ? string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"))
        .required(t("wallet-withdraw.validation.two-factor-required"))
    : string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"));
};

export default compose(
  withTranslation(),
  withFormik({
    displayName: "wallet-withdraw",
    mapPropsToValues: props => {
      let currency = props.currentWallet ? props.currentWallet.currency : "GVT";
      if (!props.wallets.find(wallet => wallet.currency === currency)) {
        currency = props.wallets[0] ? props.wallets[0].currency : "";
      }
      return { currency, amount: "", address: "", twoFactorCode: "" };
    },
    validationSchema: (props, a) => {
      const { t, twoFactorEnabled } = props;
      return lazy(values => {
        switch (values.currency) {
          case "GVT":
          case "ETH":
            return object().shape({
              address: ethGvtWalletValidator.required(
                t("wallet-withdraw.validation.address-is-required")
              ),
              twoFactorCode: twoFactorvalidator(t, twoFactorEnabled)
            });
          default:
            return object().shape({
              address: btcUsdtWalletValidator.required(
                t("wallet-withdraw.validation.address-is-required")
              ),
              twoFactorCode: twoFactorvalidator(t, twoFactorEnabled)
            });
        }
      });
    },
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(WalletWithdrawForm);
