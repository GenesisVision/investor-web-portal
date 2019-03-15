import { withFormik } from "formik";
import { FormikProps } from "formik";
import { WalletData } from "gv-api-web";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { TranslationFunction, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import rateApi from "shared/services/api-client/rate-api";
import filesService from "shared/services/file-service";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { Schema, lazy, number, object } from "yup";

import { IRequestParams } from "./follow-popup-form";

interface IFollowCreateAccountOwnProps {
  wallets: WalletData[];
  currency: string;
  onClick: (values: IRequestParams) => void;
}

interface IFollowCreateAccountProps {
  t: TranslationFunction;
}

interface IFollowCreateAccountState {
  rate: string;
  isPending: boolean;
}

export interface FormValues {
  initialDepositCurrency: string;
  initialDepositAmount: number;
}

type OwnProps = IFollowCreateAccountOwnProps &
  IFollowCreateAccountProps &
  FormikProps<FormValues>;

class FollowCreateAccount extends React.Component<
  OwnProps,
  IFollowCreateAccountState
> {
  state = {
    rate: "1",
    isPending: false
  };

  constructor(props: OwnProps) {
    super(props);
  }

  componentDidMount() {
    this.fetchRate();
  }

  onChangeCurrencyFrom = (name: any, target: any) => {
    const { setFieldValue } = this.props;
    const initialDepositCurrencyNew = target.props.value;
    setFieldValue("initialDepositCurrency", initialDepositCurrencyNew);
    this.fetchRate(initialDepositCurrencyNew);
  };
  fetchRate = (initialDepositCurrency?: any) => {
    const { values, currency } = this.props;
    rateApi
      .v10RateByFromByToGet(
        currency,
        initialDepositCurrency || values.initialDepositCurrency
      )
      .then((rate: string) => {
        if (rate !== this.state.rate) this.setState({ rate });
      });
  };
  handleNext = () => {
    const { values, onClick } = this.props;
    onClick(values);
  };
  render() {
    const {
      errors,
      isValid,
      dirty,
      wallets,
      t,
      currency,
      values,
      setFieldValue
    } = this.props;
    const { initialDepositCurrency, initialDepositAmount } = values;
    const { rate } = this.state;
    if (!rate) return null;
    const wallet = wallets.find(
      (wallet: WalletData) => wallet.currency === initialDepositCurrency
    );
    const availableToWithdraw = (wallet ? wallet.available : 0) / +rate;
    const isAllow = (values: any) => {
      const { formattedValue, value } = values;
      return formattedValue === "" || validateFraction(value, currency);
    };

    const setMaxAmount = () => {
      setFieldValue(
        "initialDepositAmount",
        formatCurrencyValue(availableToWithdraw, currency)
      );
    };
    const disableButton = () => {
      return (
        errors.initialDepositAmount !== undefined ||
        (!dirty && !isValid) ||
        initialDepositAmount > availableToWithdraw
      );
    };
    return (
      <form className="dialog__bottom" id="follow-create-account">
        <div className="dialog-field">
          <GVFormikField
            name="initialDepositCurrency"
            component={GVTextField}
            label={t("follow-program.create-account.from")}
            InputComponent={Select}
            onChange={this.onChangeCurrencyFrom}
          >
            {wallets.map((wallet: WalletData) => {
              return (
                <option value={wallet.currency} key={wallet.currency}>
                  <img
                    src={filesService.getFileUrl(wallet.logo)}
                    className="wallet-transfer-popup__icon"
                    alt={wallet.currency}
                  />
                  {`${wallet.title} | ${wallet.currency}`}
                </option>
              );
            })}
          </GVFormikField>
        </div>
        <div className="dialog-field">
          <StatisticItem label={t("follow-program.create-account.available")}>
            <NumberFormat
              value={formatCurrencyValue(availableToWithdraw, currency)}
              suffix={` ${currency}`}
              displayType="text"
            />
          </StatisticItem>
        </div>
        <div className="dialog-field">
          <InputAmountField
            name="initialDepositAmount"
            label={t("follow-program.create-account.amount")}
            currency={currency}
            setMax={setMaxAmount}
          />
          {currency !== initialDepositCurrency && (
            <div className="invest-popup__currency">
              <NumberFormat
                value={formatCurrencyValue(
                  convertFromCurrency(initialDepositAmount, rate),
                  initialDepositCurrency
                )}
                prefix="≈ "
                suffix={` ${initialDepositCurrency}`}
                displayType="text"
              />
            </div>
          )}
        </div>
        <div className="dialog__buttons">
          <GVButton
            onClick={this.handleNext}
            // id="signUpFormSubmit"
            className="invest-form__submit-button"
            disabled={disableButton()}
          >
            {t("follow-program.create-account.next")}
          </GVButton>
        </div>
      </form>
    );
  }
}

export default compose<React.ComponentType<IFollowCreateAccountOwnProps>>(
  translate(),
  withFormik({
    displayName: "follow-create-account",
    mapPropsToValues: (props: { [key: string]: any }) => {
      const { wallets, currency } = props;
      if (!wallets === undefined || wallets.length <= 1) return {};
      let initialDepositCurrency = currency || "GVT";
      if (
        !wallets.find(
          (wallet: any) => wallet.currency === initialDepositCurrency
        )
      ) {
        initialDepositCurrency = wallets[0].currency;
      }
      return { initialDepositCurrency, initialDepositAmount: "" };
    },
    validationSchema: (params: TranslationFunction & OwnProps) => {
      const getAvailable = (currency: string): number => {
        const wallet = params.wallets.find(
          (wallet: WalletData) => wallet.currency == currency
        );
        return wallet ? wallet.available : 0;
      };
      return lazy(
        (values: FormValues): Schema<any> =>
          object().shape({
            initialDepositAmount: number()
              .required(
                params.t(
                  "follow-program.create-account.validation.amount-required"
                )
              )
              .moreThan(
                0,
                params.t(
                  "follow-program.create-account.validation.amount-is-zero"
                )
              )
              .max(
                getAvailable(values.initialDepositCurrency),
                params.t(
                  "follow-program.create-account.validation.amount-more-than-available"
                )
              )
          })
      );
    },
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.initialDepositAmount);
    }
  })
)(FollowCreateAccount);
