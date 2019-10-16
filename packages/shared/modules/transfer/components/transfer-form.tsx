import "./transfer-form.scss";

import { FormikProps, withFormik } from "formik";
import { InternalTransferRequestSourceTypeEnum } from "gv-api-web";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogField } from "shared/components/dialog/dialog-field";
import { DialogTop } from "shared/components/dialog/dialog-top";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { ISelectChangeEvent } from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import WalletSelect, {
  ItemsType,
  ItemType
} from "shared/components/wallet-select/wallet-select";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import TransferRate from "shared/modules/transfer/components/transfer-rate";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { SetSubmittingType } from "shared/utils/types";
import { lazy, number, object, Schema } from "yup";

import * as service from "../services/transfer.services";
import { TRANSFER_CONTAINER } from "../transfer.types";

const _TransferForm: React.FC<Props> = ({
  title,
  sourceType,
  destinationType,
  sourceItems,
  destinationItems,
  t,
  handleSubmit,
  values,
  isValid,
  dirty,
  errorMessage,
  setFieldValue,
  isSubmitting
}) => {
  const onChangeSourceId = useCallback(
    (event: ISelectChangeEvent) => {
      const currencyFromNew = event.target.value;
      if (currencyFromNew === values[FIELDS.destinationId]) {
        setFieldValue(FIELDS.destinationId, values[FIELDS.sourceId]);
      }
      setFieldValue(FIELDS.amount, "");
      setFieldValue(FIELDS.sourceId, currencyFromNew);
    },
    [setFieldValue, values]
  );

  const onChangeDestinationId = useCallback(
    (event: ISelectChangeEvent) =>
      setFieldValue(FIELDS.destinationId, event.target.value),
    [setFieldValue]
  );

  const isAllow = useCallback(
    (inputValues: NumberFormatValues) => {
      const { floatValue, formattedValue, value } = inputValues;
      const selectedSourceItem = service.getSelectedItem(
        sourceItems,
        values[FIELDS.sourceId]
      );
      const { currency, available } = selectedSourceItem;
      return (
        formattedValue === "" ||
        (validateFraction(value, currency) && floatValue <= available)
      );
    },
    [sourceItems, values]
  );

  const destinationItemWithoutCurrent = service.getDestinationItems(
    destinationItems,
    values[FIELDS.sourceId]
  );
  const selectedSourceItem = service.getSelectedItem(
    sourceItems,
    values[FIELDS.sourceId]
  );
  const formattedAvailableSourceItem = formatCurrencyValue(
    selectedSourceItem.available,
    selectedSourceItem.currency
  );
  const selectedDestinationItem = service.getSelectedItem(
    destinationItemWithoutCurrent,
    values[FIELDS.destinationId]
  );
  const formattedAvailableDestinationItem = formatCurrencyValue(
    selectedDestinationItem.available,
    selectedDestinationItem.currency
  );

  const setMaxAmount = () => {
    setFieldValue(FIELDS.amount, formattedAvailableSourceItem);
  };

  const disableButton =
    isSubmitting || !values[FIELDS.amount] || !isValid || !dirty;

  return (
    <form
      id="transfer"
      className="transfer-popup"
      onSubmit={handleSubmit}
      noValidate
    >
      <DialogTop title={title || t("transfer.title")}>
        <WalletSelect
          name={FIELDS.sourceId}
          label={t("transfer.from")}
          items={sourceItems}
          onChange={onChangeSourceId}
        />
        <DialogField>
          <StatisticItem label={t(`transfer.available${sourceType}From`)} big>
            {`${formattedAvailableSourceItem} ${selectedSourceItem.currency}`}
          </StatisticItem>
        </DialogField>
      </DialogTop>
      <DialogBottom>
        <DialogField>
          <WalletSelect
            name={FIELDS.destinationId}
            label={t("transfer.to")}
            items={destinationItemWithoutCurrent}
            onChange={onChangeDestinationId}
          />
        </DialogField>
        <DialogField>
          <StatisticItem
            label={t(`transfer.available${destinationType}To`)}
            big
          >
            {`${formattedAvailableDestinationItem} ${
              selectedDestinationItem.currency
            }`}
          </StatisticItem>
        </DialogField>
        <DialogField>
          <InputAmountField
            name={FIELDS.amount}
            label={t("transfer.amount")}
            currency={selectedSourceItem.currency}
            setMax={setMaxAmount}
            isAllow={isAllow}
          />
        </DialogField>
        {!!values[FIELDS.amount] && (
          <TransferRate
            destinationCurrency={selectedDestinationItem.currency}
            sourceCurrency={selectedSourceItem.currency}
          >
            {props => (
              <span>{`≈ ${formatCurrencyValue(
                props.rate * Number(values[FIELDS.amount]),
                selectedDestinationItem.currency
              )} ${selectedDestinationItem.currency}`}</span>
            )}
          </TransferRate>
        )}
        <FormError error={errorMessage} />
        <DialogButtons>
          <GVButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={disableButton}
          >
            {t("buttons.confirm")}
          </GVButton>
        </DialogButtons>
        <div className="dialog__info">{t("transfer.info")}</div>
      </DialogBottom>
    </form>
  );
};

const TransferForm = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  withFormik<OwnProps, TransferFormValues>({
    displayName: "transfer",
    mapPropsToValues: props => {
      const {
        destinationType,
        sourceType,
        sourceItems,
        destinationItems,
        currentItem,
        currentItemContainer
      } = props;
      let sourceId, destinationId;
      if (currentItemContainer === TRANSFER_CONTAINER.DESTINATION) {
        destinationId = currentItem.id;
        const sourceItemWithoutCurrent = service.getDestinationItems(
          sourceItems,
          destinationId
        );
        sourceId = sourceItemWithoutCurrent[0].id;
      } else {
        sourceId = currentItem.id;
        const destinationItemWithoutCurrent = service.getDestinationItems(
          destinationItems,
          sourceId
        );
        destinationId = destinationItemWithoutCurrent[0].id;
      }
      return {
        [FIELDS.sourceId]: sourceId,
        [FIELDS.amount]: undefined,
        [FIELDS.destinationId]: destinationId,
        [FIELDS.sourceType]: sourceType,
        [FIELDS.destinationType]: destinationType,
        [FIELDS.transferAll]: false
      };
    },
    validationSchema: (props: Props) => {
      const { sourceItems, t } = props;
      return lazy(
        (values: TransferFormValues): Schema<any> => {
          const selectedSourceItem = service.getSelectedItem(
            sourceItems,
            values[FIELDS.sourceId]
          );
          return object().shape({
            [FIELDS.amount]: number()
              .moreThan(0, t("transfer.validation.amount-is-zero"))
              .max(
                +formatCurrencyValue(
                  selectedSourceItem.available,
                  selectedSourceItem.currency
                ),
                t("transfer.validation.amount-more-than-available")
              )
          });
        }
      );
    },
    handleSubmit: (values, { props, setSubmitting }) => {
      const { amount, sourceId } = values;

      const transferAll = service.getTransferAll(
        { amount: amount!, sourceId },
        props.sourceItems
      );
      props.onSubmit({ ...values, transferAll }, setSubmitting);
    }
  }),
  React.memo
)(_TransferForm);
export default TransferForm;

enum FIELDS {
  sourceId = "sourceId",
  sourceType = "sourceType",
  destinationId = "destinationId",
  destinationType = "destinationType",
  amount = "amount",
  transferAll = "transferAll"
}

interface OwnProps {
  onSubmit(values: TransferFormValues, setSubmitting: SetSubmittingType): void;
  currentItem: ItemType;
  sourceType: InternalTransferRequestSourceTypeEnum;
  destinationType: InternalTransferRequestSourceTypeEnum;
  sourceItems: ItemsType;
  destinationItems: ItemsType;
  errorMessage?: string;
  title?: string;
  currentItemContainer?: TRANSFER_CONTAINER;
}

export interface TransferFormValues {
  sourceId: string;
  sourceType: InternalTransferRequestSourceTypeEnum;
  destinationId: string;
  destinationType: InternalTransferRequestSourceTypeEnum;
  amount?: number;
  transferAll: boolean;
}

interface Props
  extends WithTranslation,
    FormikProps<TransferFormValues>,
    OwnProps {}
