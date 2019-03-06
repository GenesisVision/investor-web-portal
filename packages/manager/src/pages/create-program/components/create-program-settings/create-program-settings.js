import "./create-program-settings.scss";

import { Field, withFormik } from "formik";
import {
  GVButton,
  GVFormikField,
  GVProgramPeriod,
  GVTextField
} from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import DepositButtonContainer from "shared/components/deposit-button-submit/deposit-button";
import InputImage from "shared/components/form/input-image/input-image";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import Hint from "shared/components/hint/hint";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import rateApi from "shared/services/api-client/rate-api";
import filesService from "shared/services/file-service";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { allowValuesNumberFormat } from "shared/utils/helpers";

import {
  getAccountTypes,
  getCurrencies,
  getLeverages
} from "../../helpers/create-program.helpers";
import AccountTypeField from "../account-type-field/account-type-field";
import createProgramSettingsValidationSchema from "./create-program-settings.validators";
import ProgramDefaultImage from "./program-default-image";
import SignalsFeeFormPartial from "./signals-fee-form.partial";

class CreateProgramSettings extends React.Component {
  componentDidMount() {
    this.fetchRate(
      this.props.values.depositWalletCurrency,
      this.props.values.currency
    );
  }

  allowEntryFee = values => {
    const { managerMaxEntryFee } = this.props.programsInfo;

    return allowValuesNumberFormat({ from: 0, to: managerMaxEntryFee })(values);
  };

  allowSuccessFee = values => {
    const { managerMaxSuccessFee } = this.props.programsInfo;

    return allowValuesNumberFormat({ from: 0, to: managerMaxSuccessFee })(
      values
    );
  };
  fetchRate = (fromCurrency, toCurrency) => {
    rateApi.v10RateByFromByToGet(fromCurrency, toCurrency).then(rate => {
      if (rate !== this.props.values.rate)
        this.props.setFieldValue("rate", rate);
    });
  };
  onChangeDepositWallet = (name, target) => {
    const { setFieldValue, values, wallets, fetchWallets } = this.props;
    const depositWalletCurrency = target.props.value;
    setFieldValue("depositWalletCurrency", depositWalletCurrency);
    setFieldValue(
      "depositWalletId",
      wallets.find(item => item.currency === (values && depositWalletCurrency))
        .id
    );
    fetchWallets();
    this.fetchRate(depositWalletCurrency, values.currency);
  };
  onChangeCurrency = (name, target) => {
    const { setFieldValue, values } = this.props;
    const currency = target.props.value;
    setFieldValue("currency", currency);
    this.fetchRate(values.depositWalletCurrency, currency);
  };
  render() {
    const {
      minimumDepositsAmount,
      wallets,
      t,
      navigateBack,
      broker,
      author,
      isSubmitting,
      handleSubmit,
      values,
      setFieldValue,
      setLeverageChooseAvailable,
      isLeverageChooseAvailable,
      programsInfo,
      notifyError,
      errors,
      onValidateError,
      setSubmitting,
      isValid
    } = this.props;
    if (!wallets) return;
    const {
      rate,
      depositWalletCurrency,
      depositAmount,
      isSignalProgram,
      accountType,
      description,
      title,
      currency
    } = values;
    const imageInputError =
      errors &&
      errors.logo &&
      (errors.logo.width || errors.logo.height || errors.logo.size);

    const onSubmit = () => {
      createProgramSettingsValidationSchema({
        minimumDepositsAmount,
        t,
        wallets,
        programsInfo
      })
        .validate(values)
        .then(res => {}, () => onValidateError());

      handleSubmit(values, {
        setSubmitting
      });
    };
    const selectedWallet = wallets.find(
      item => item.currency === (values && values.depositWalletCurrency)
    );
    return (
      <div className="create-program-settings">
        <form className="create-program-settings__form">
          <div className="create-program-settings__subheading">
            <span className="create-program-settings__block-number">01</span>
            {t("manager.create-program-page.settings.main-settings")}
          </div>
          <div className="create-program-settings__fill-block create-program-settings__fill-block--with-border">
            <div className="create-program-settings__row">
              <div className="create-program-settings__item">
                <GVFormikField
                  type="text"
                  name="title"
                  label={t("manager.create-program-page.settings.fields.name")}
                  autoComplete="off"
                  component={GVTextField}
                />
                <div className="create-program-settings__item-caption">
                  {t(
                    "manager.create-program-page.settings.fields.name-requirements"
                  )}
                </div>
              </div>
              <div className="create-program-settings__item">
                <AccountTypeField
                  accountTypes={getAccountTypes(broker)}
                  label={t(
                    "manager.create-program-page.settings.fields.account-type"
                  )}
                  setLeverageChooseAvailable={setLeverageChooseAvailable}
                  setFieldValue={setFieldValue}
                  broker={broker}
                />
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="currency"
                  component={GVTextField}
                  label={t(
                    "manager.create-program-page.settings.fields.currency"
                  )}
                  InputComponent={Select}
                  disabled={!accountType}
                  onChange={this.onChangeCurrency}
                >
                  {getCurrencies(broker, accountType).map(currency => {
                    return (
                      <option value={currency} key={currency}>
                        {currency}
                      </option>
                    );
                  })}
                </GVFormikField>
              </div>
              <div className="create-program-settings__item create-program-settings__item--wider">
                <GVFormikField
                  type="textarea"
                  name="description"
                  label={t(
                    "manager.create-program-page.settings.fields.description"
                  )}
                  component={GVTextField}
                />
                <div className="create-program-settings__item-caption create-program-settings__description">
                  <span className="create-program-settings__description-requirements">
                    {t(
                      "manager.create-program-page.settings.fields.description-requirements"
                    )}
                  </span>
                  {description.length > 0 && (
                    <span className="create-program-settings__description-chars">
                      {description.length}
                      <GVProgramPeriod
                        start={0}
                        end={500}
                        value={description.length}
                      />
                    </span>
                  )}
                </div>
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="leverage"
                  component={GVTextField}
                  label={t(
                    "manager.create-program-page.settings.fields.brokers-leverage"
                  )}
                  InputComponent={Select}
                  disabled={!accountType || !isLeverageChooseAvailable}
                  className="create-program-settings__leverage"
                >
                  {getLeverages(broker, accountType).map(leverage => {
                    return (
                      <option value={leverage.toString()} key={leverage}>
                        {leverage}
                      </option>
                    );
                  })}
                </GVFormikField>
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="periodLength"
                  component={GVTextField}
                  label={t(
                    "manager.create-program-page.settings.fields.period"
                  )}
                  InputComponent={Select}
                >
                  {programsInfo.periods.map(period => {
                    return (
                      <option value={period.toString()} key={period}>
                        {period +
                          " " +
                          t(
                            "manager.create-program-page.settings.fields.period-option-notation.day",
                            { count: period }
                          )}
                      </option>
                    );
                  })}
                </GVFormikField>
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="stopOutLevel"
                  label={t(
                    "manager.create-program-page.settings.fields.stop-out-level"
                  )}
                  adornment="%"
                  component={GVTextField}
                  InputComponent={NumberFormat}
                  autoComplete="off"
                  decimalScale={4}
                />
                <Hint
                  content={t(
                    "manager.create-program-page.settings.hints.stop-out-level"
                  )}
                  className="create-program-settings__item-caption"
                  vertical={"bottom"}
                  tooltipContent={t(
                    "manager.create-program-page.settings.hints.stop-out-level-description"
                  )}
                />
              </div>
              <div className="create-program-settings__item create-program-settings__item--wider">
                <div className="create-program-settings__logo-title">
                  {t("manager.create-program-page.settings.fields.upload-logo")}
                </div>
                <div className="create-program-settings__logo-notice">
                  {t(
                    "manager.create-program-page.settings.fields.upload-logo-rules"
                  )}
                </div>
              </div>
              <div className="create-program-settings__item create-program-settings__item--wider create-program-settings__logo-section">
                <div className="create-program-settings__file-field-container">
                  <Field
                    name="logo"
                    render={({ field, form }) => (
                      <InputImage
                        {...field}
                        defaultImage={ProgramDefaultImage}
                        onChange={setFieldValue}
                        notifyError={notifyError}
                        alt="Program logo"
                        error={imageInputError}
                      />
                    )}
                  />
                </div>
                <div className="create-program-settings__image-info">
                  <div className="create-program-settings__image-title">
                    {title}
                  </div>
                  <div className="create-program-settings__image-author">
                    {author}
                  </div>
                </div>
              </div>
              {broker.isSignalsAvailable && (
                <div className="create-program-settings__item">
                  <GVFormikField
                    type="checkbox"
                    color="primary"
                    name="isSignalProgram"
                    label={
                      <span>
                        {t(
                          "manager.create-program-page.settings.fields.provide-signals"
                        )}
                      </span>
                    }
                    component={GVCheckbox}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="create-program-settings__subheading">
            <span className="create-program-settings__block-number">02</span>
            {t("manager.create-program-page.settings.fees-settings")}
          </div>
          <div className="create-program-settings__fill-block create-program-settings__fill-block--with-border">
            <div className="create-program-settings__row">
              <div className="create-program-settings__row-title">
                {t(
                  "manager.create-program-page.settings.investment-program-fees"
                )}
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="entryFee"
                  label={t(
                    "manager.create-program-page.settings.fields.entry-fee"
                  )}
                  adornment="%" //isAllowed={this.allowEntryFee}
                  component={GVTextField}
                  InputComponent={NumberFormat}
                  autoComplete="off"
                  decimalScale={4}
                />
                <Hint
                  content={t(
                    "manager.create-program-page.settings.hints.entry-fee"
                  )}
                  className="create-program-settings__item-caption"
                  vertical={"bottom"}
                  tooltipContent={t(
                    "manager.create-program-page.settings.hints.entry-fee-description"
                  )}
                />
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="successFee"
                  label={t(
                    "manager.create-program-page.settings.fields.success-fee"
                  )}
                  adornment="%" //isAllowed={this.allowSuccessFee}
                  component={GVTextField}
                  InputComponent={NumberFormat}
                  autoComplete="off"
                  decimalScale={4}
                />
                <Hint
                  content={t(
                    "manager.create-program-page.settings.hints.success-fee"
                  )}
                  className="create-program-settings__item-caption"
                  vertical={"bottom"}
                  tooltipContent={t(
                    "manager.create-program-page.settings.hints.success-fee-description"
                  )}
                />
              </div>
            </div>
            {isSignalProgram && (
              <SignalsFeeFormPartial
                subscriptionFeeFieldName="signalSubscriptionFee"
                successFeeFieldName="signalSuccessFee"
                maxEntryFee={100}
                maxSuccessFee={50}
              />
            )}
          </div>
          <div className="create-program-settings__subheading">
            <span className="create-program-settings__block-number">03</span>
            {t("manager.create-program-page.settings.deposit-details")}
          </div>
          <div
            className={"deposit-details create-program-settings__fill-block"}
          >
            <div className="create-program-settings__item deposit-details">
              <GVFormikField
                name="depositWalletCurrency" // value={"GVT"}
                component={GVTextField}
                label={t("wallet-transfer.from")}
                InputComponent={Select}
                onChange={this.onChangeDepositWallet}
              >
                {wallets.map(wallet => {
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
              <InputAmountField
                autoFocus={false}
                name="depositAmount"
                label={t("wallet-transfer.amount")}
                currency={depositWalletCurrency}
              />
              {currency !== depositWalletCurrency && (
                <div className="invest-popup__currency">
                  <NumberFormat
                    value={formatCurrencyValue(
                      convertFromCurrency(depositAmount, rate),
                      currency
                    )}
                    prefix="≈ "
                    suffix={` ${currency}`}
                    displayType="text"
                  />
                </div>
              )}
              <div className="deposit-details__available-list">
                <div className="deposit-details__available-amount">
                  {t("manager.create-program-page.settings.fields.min-deposit")}
                  <span className={"deposit-details__available-amount-value"}>
                    <NumberFormat
                      value={minimumDepositsAmount[currency]}
                      thousandSeparator=" "
                      displayType="text"
                      suffix={` ${currency}`}
                    />
                  </span>
                </div>
                <div className="deposit-details__available-amount">
                  {t(
                    "manager.create-fund-page.settings.fields.available-in-wallet"
                  )}
                  <span className={"deposit-details__available-amount-value"}>
                    <NumberFormat
                      value={selectedWallet.available}
                      thousandSeparator=" "
                      displayType="text"
                      suffix={values ? ` ${depositWalletCurrency}` : " GVT"}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="create-program-settings__navigation">
          <DepositButtonContainer
            title={t("buttons.create-program")}
            deposit={programsInfo.managerProgramInvestment}
            onSubmit={onSubmit}
            disabled={isSubmitting || !isValid}
          >
            {t("buttons.create-program")}
          </DepositButtonContainer>
          <GVButton
            variant="text"
            onClick={() => navigateBack(values)}
            className="create-program-settings__navigation-back"
          >
            &larr; {t("buttons.back")}
          </GVButton>
        </div>
      </div>
    );
  }
}

export default translate()(
  withFormik({
    displayName: "CreateProgramSettingsForm",
    mapPropsToValues: props => ({
      rate: 1,
      stopOutLevel: "100",
      depositWalletCurrency: "GVT",
      depositWalletId: props.wallets.find(item => item.currency === "GVT").id,
      isSignalProgram: props.broker.isSignalsAvailable,
      periodLength: "",
      successFee: "",
      signalSuccessFee: props.broker.isSignalsAvailable ? "" : 0,
      leverage: "",
      title: "",
      description: "",
      logo: {
        cropped: null,
        src: "",
        isNew: false,
        isDefault: true,
        width: undefined,
        height: undefined,
        size: undefined
      },
      brokerAccountTypeId: "",
      entryFee: "",
      signalSubscriptionFee: props.broker.isSignalsAvailable ? "" : 0,
      currency: props.broker.name === "Genesis Markets" ? "BTC" : "",
      accountType: ""
    }),
    validationSchema: createProgramSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })(CreateProgramSettings)
);
