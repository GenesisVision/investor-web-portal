import { HookFormWalletField as WalletField } from "components/deposit/components/form-fields/wallet-field";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import { Row } from "components/row/row";
import StatisticItem from "components/statistic-item/statistic-item";
import { SubmitButton } from "components/submit-button/submit-button";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { WalletData } from "gv-api-web";
import { useGetRate } from "hooks/get-rate.hook";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import {
  convertToCurrency,
  CURRENCY_FRACTIONS
} from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import {
  allowPositiveValuesNumberFormat,
  safeGetElemFromArray
} from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import CreateAccountFormValidationSchema, {
  CREATE_ACCOUNT_FORM_FIELDS
} from "./follow-popup-create-account.validators";

const _FollowCreateAccount: React.FC<CreateAccountFormProps> = ({
  minDeposit,
  onClick,
  wallets,
  followCurrency
}) => {
  const { rate, getRate } = useGetRate();
  const followCurrencyWalletId = safeGetElemFromArray(
    wallets,
    wallet => wallet.currency === followCurrency
  ).id;
  const [t] = useTranslation();

  const form = useForm<CreateAccountFormValues>({
    defaultValues: {
      [CREATE_ACCOUNT_FORM_FIELDS.depositWalletId]: followCurrencyWalletId
    },
    validationSchema: CreateAccountFormValidationSchema({
      rate,
      minDeposit,
      wallets,
      t
    }),
    mode: "onChange"
  });
  const { reset, watch, setValue } = form;

  const { depositWalletId, depositAmount } = watch();

  const wallet = safeGetElemFromArray(
    wallets,
    ({ id }) => id === depositWalletId
  );
  const { currency } = wallet;

  useEffect(() => {
    followCurrency &&
      currency &&
      getRate({ from: followCurrency as CurrencyEnum, to: currency });
  }, [followCurrency, currency]);

  const onChangeCurrencyFrom = useCallback(
    ({ id }: WalletItemType) => {
      reset({
        [CREATE_ACCOUNT_FORM_FIELDS.depositWalletId]: id,
        [CREATE_ACCOUNT_FORM_FIELDS.depositAmount]: ""
      });
    },
    [wallets]
  );
  const setMaxAmount = useCallback(() => {
    setValue(
      CREATE_ACCOUNT_FORM_FIELDS.depositAmount,
      formatCurrencyValue(wallet.available, followCurrency),
      true
    );
  }, [followCurrency, wallet]);

  return (
    <HookForm form={form} onSubmit={onClick}>
      <DialogBottom>
        <Row>
          <WalletField
            wallets={wallets}
            name={CREATE_ACCOUNT_FORM_FIELDS.depositWalletId}
            label={t("follow-program.create-account.from")}
            onChange={onChangeCurrencyFrom}
          />
        </Row>
        <InputAmountField
          wide
          isAllowed={allowPositiveValuesNumberFormat(
            CURRENCY_FRACTIONS(currency)
          )}
          name={CREATE_ACCOUNT_FORM_FIELDS.depositAmount}
          label={t("follow-program.create-account.amount")}
          currency={currency}
          setMax={setMaxAmount}
        />
        {followCurrency !== currency && (
          <Row small>
            <NumberFormat
              value={formatCurrencyValue(
                convertToCurrency(+depositAmount, rate),
                followCurrency
              )}
              prefix="≈ "
              suffix={` ${followCurrency}`}
              displayType="text"
            />
          </Row>
        )}
        <DialogButtons>
          <SubmitButton wide className="invest-form__submit-button">
            {t("follow-program.create-account.next")}
          </SubmitButton>
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

export interface CreateAccountFormProps {
  minDeposit: number;
  wallets: WalletData[];
  followCurrency: CurrencyEnum;
  onClick: (values: CreateAccountFormValues) => void;
}

export interface CreateAccountFormValues {
  [CREATE_ACCOUNT_FORM_FIELDS.depositWalletId]: string;
  [CREATE_ACCOUNT_FORM_FIELDS.depositAmount]: number | string;
}

const FollowCreateAccount = React.memo(_FollowCreateAccount);
export default FollowCreateAccount;
