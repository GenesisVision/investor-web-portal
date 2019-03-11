import "./wallet-transfer-form.scss";

import { FormikProps, withFormik } from "formik";
import { WalletData } from "gv-api-web";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import TransferRate from "shared/modules/wallet-transfer/components/transfer-rate";
import filesService from "shared/services/file-service";
import { formatCurrencyValue } from "shared/utils/formatter";
import { DeepReadonly } from "utility-types";
import { Schema, boolean, lazy, number, object } from "yup";

const getWalletsTo = (
  wallets: DeepReadonly<WalletData[]>,
  sourceId: string
): WalletData[] => {
  return wallets.filter(wallet => wallet.id !== sourceId);
};

const getSelectedWallet = (
  wallets: DeepReadonly<WalletData[]>,
  currentWalletId: string
): WalletData =>
  wallets.find(wallet => wallet.id === currentWalletId) || ({} as WalletData);

export interface ITransferFormValues {
  transferAll: boolean;
  sourceId: string;
  destinationId: string;
  amount: string;
}

type IWalletTransferForm = WithTranslation &
  FormikProps<ITransferFormValues> &
  DeepReadonly<{
    wallets: Array<WalletData>;
    currentWallet: WalletData;
  }> & {
    onSubmit(values: ITransferFormValues): void;
    disabled: boolean;
    errorMessage?: string;
  };

class WalletTransferForm extends React.Component<IWalletTransferForm> {
  onChangeSourceId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setFieldValue, values } = this.props;
    const currencyFromNew = event.target.value;
    if (currencyFromNew === values.destinationId) {
      setFieldValue("destinationId", values.sourceId);
    }
    setFieldValue("sourceId", currencyFromNew);
  };
  onChangeAmount = (amount: string) => {
    const { setFieldValue, values, wallets } = this.props;
    const { sourceId } = values;
    const selectedFromWallet = getSelectedWallet(wallets, sourceId);
    const availableToWithdrawalFrom = formatCurrencyValue(
      selectedFromWallet.available,
      selectedFromWallet.currency
    );
    if (amount === availableToWithdrawalFrom)
      setFieldValue("transferAll", true);
    else setFieldValue("transferAll", false);
    setFieldValue("amount", amount);
  };

  onChangeDestinationId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setFieldValue } = this.props;
    setFieldValue("destinationId", event.target.value);
  };

  render() {
    const {
      t,
      handleSubmit,
      wallets,
      values,
      disabled,
      isValid,
      dirty,
      errorMessage,
      setFieldValue
    } = this.props;

    const { sourceId, destinationId } = values;

    const walletsTo = getWalletsTo(wallets, sourceId);
    const selectedFromWallet = getSelectedWallet(wallets, sourceId);

    const selectedToWallet = getSelectedWallet(walletsTo, destinationId);

    const availableToWithdrawalFrom = selectedFromWallet.available;
    const availableToWithdrawalTo = selectedToWallet.available;

    const setMaxAmount = () => {
      setFieldValue(
        "amount",
        formatCurrencyValue(
          availableToWithdrawalFrom,
          selectedFromWallet.currency
        )
      );
      setFieldValue("transferAll", true);
    };

    const disableButton = disabled || !values.amount || !isValid || !dirty;

    return (
      <form
        id="wallet-transfer"
        className="wallet-transfer-popup"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{t("wallet-transfer.title")}</h2>
          </div>
          <GVFormikField
            name="sourceId"
            component={GVTextField}
            label={t("wallet-transfer.from")}
            InputComponent={Select}
            onChange={this.onChangeSourceId}
          >
            {wallets.map(wallet => {
              return (
                <option value={wallet.id} key={`from-${wallet.id}`}>
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
          <StatisticItem label={t("wallet-transfer.availableFrom")}>
            {`${formatCurrencyValue(
              availableToWithdrawalFrom,
              selectedFromWallet.currency
            )} ${selectedFromWallet.currency}`}
          </StatisticItem>
        </div>
        <div className="dialog__bottom">
          <GVFormikField
            name="destinationId"
            component={GVTextField}
            label={t("wallet-transfer.to")}
            InputComponent={Select}
            onChange={this.onChangeDestinationId}
          >
            {walletsTo.map(wallet => {
              return (
                <option value={wallet.id} key={`to-${wallet.id}`}>
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
          <StatisticItem label={t("wallet-transfer.availableTo")}>
            {`${formatCurrencyValue(
              availableToWithdrawalTo,
              selectedToWallet.currency
            )} ${selectedToWallet.currency}`}
          </StatisticItem>
          <div className="dialog-field">
            <InputAmountField
              name="amount"
              label={t("wallet-transfer.amount")}
              currency={selectedFromWallet.currency}
              setMax={setMaxAmount}
              onChange={this.onChangeAmount}
            />
          </div>
          <TransferRate
            destinationCurrency={selectedToWallet.currency}
            sourceCurrency={selectedFromWallet.currency}
          >
            {props => {
              if (values.amount) {
                const value = formatCurrencyValue(
                  props.rate * Number(values.amount),
                  selectedToWallet.currency
                );
                return <span>{`≈ ${value} ${selectedToWallet.currency}`}</span>;
              }
              return null;
            }}
          </TransferRate>
          <div className="form-error">{errorMessage}</div>
          <div className="dialog__buttons">
            <GVButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={disableButton}
            >
              {t("buttons.confirm")}
            </GVButton>
          </div>
          <div className="dialog__info">{t("wallet-transfer.info")}</div>
        </div>
      </form>
    );
  }
}

export default compose<React.FunctionComponent<IWalletTransferForm>>(
  withTranslation(),
  withFormik<IWalletTransferForm, ITransferFormValues>({
    displayName: "wallet-transfer",
    mapPropsToValues: props => {
      const { currentWallet, wallets } = props;
      let sourceId = currentWallet ? currentWallet.id : wallets[0].id;
      const walletTo = getWalletsTo(wallets, sourceId);
      const destinationId = walletTo[0].id;
      return { sourceId, amount: "", destinationId, transferAll: false };
    },
    validationSchema: (params: IWalletTransferForm) => {
      return lazy(
        (values: ITransferFormValues): Schema<any> => {
          const selectedWallet = getSelectedWallet(
            params.wallets,
            values.sourceId
          );
          return object().shape({
            transferAll: boolean(),
            amount: number()
              .moreThan(
                0,
                params.t("wallet-transfer.validation.amount-is-zero")
              )
              .max(
                +formatCurrencyValue(
                  selectedWallet.available,
                  selectedWallet.currency
                ),
                params.t(
                  "wallet-transfer.validation.amount-more-than-available"
                )
              )
          });
        }
      );
    },
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(WalletTransferForm);
