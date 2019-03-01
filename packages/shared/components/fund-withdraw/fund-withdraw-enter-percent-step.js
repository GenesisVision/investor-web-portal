import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import { Fragment } from "react";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "shared/utils/formatter";

import InputAmountField from "../input-amount-field/input-amount-field";

const FundWithdrawEnterPercentStep = props => {
  const {
    t,
    onClick,
    disabled,
    exitFee,
    feeInCurrency,
    valueInCurrency,
    withdrawAmount,
    setFieldValue
  } = props;
  const isAllow = values =>
    !values.floatValue ||
    (values.floatValue >= 0.01 && values.floatValue <= 100);

  const setMaxAmount = () => {
    setFieldValue("percent", 100);
  };

  return (
    <Fragment>
      <InputAmountField
        name="percent"
        label={t("withdraw-fund.amount-to-withdraw")}
        currency="%"
        isAllow={isAllow}
        setMax={setMaxAmount}
      />
      <div className="invest-popup__currency">
        <NumberFormat
          value={formatCurrencyValue(valueInCurrency, "GVT")}
          prefix="&asymp; "
          suffix={` GVT`}
          displayType="text"
        />
      </div>
      {exitFee !== 0 && (
        <ul className="dialog-list">
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {t("withdraw-fund.exit-fee")}
            </span>
            <span className="dialog-list__value">
              {exitFee} %{" "}
              <NumberFormat
                value={formatCurrencyValue(feeInCurrency, "GVT")}
                prefix=" &asymp; "
                suffix={" GVT"}
                displayType="text"
              />
            </span>
          </li>
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {t("withdraw-fund.withdraw-amount")}
            </span>
            <span className="dialog-list__value">
              <NumberFormat
                value={formatCurrencyValue(withdrawAmount, "GVT")}
                prefix=" &asymp; "
                suffix={" GVT"}
                displayType="text"
              />
            </span>
          </li>
        </ul>
      )}
      <div className="dialog__buttons">
        <GVButton
          type="submit"
          onClick={onClick}
          id="signUpFormSubmit"
          className="invest-form__submit-button"
          disabled={disabled}
        >
          {t("withdraw-fund.next")}
        </GVButton>
      </div>
    </Fragment>
  );
};

FundWithdrawEnterPercentStep.propTypes = {
  percent: PropTypes.string,
  rate: PropTypes.number,
  currency: PropTypes.string,
  availableToWithdraw: PropTypes.number,
  t: PropTypes.func,
  disabled: PropTypes.bool
};

export default translate()(FundWithdrawEnterPercentStep);
