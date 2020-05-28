import AssetField from "components/assets/asset-fields/asset-field";
import useAssetValidate from "components/assets/asset-validate.hook";
import { getBrokerId } from "components/assets/asset.helpers";
import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
import DepositDetailsBlock from "components/assets/fields/deposit-details-block";
import { GVHookFormField } from "components/gv-hook-form-field";
import GVTextField from "components/gv-text-field";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { ExchangeInfo } from "gv-api-web";
import { KycRequiredBlock } from "pages/create-account/components/create-account-settings/kyc-required-block";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { kycConfirmedSelector } from "reducers/header-reducer";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";

import CreateExchangeAccountSettingsValidationSchema from "./create-exchange-account-settings.validators";

export enum CREATE_EXCHANGE_ACCOUNT_FIELDS {
  depositWalletId = "depositWalletId",
  depositAmount = "depositAmount",
  brokerAccountTypeId = "brokerAccountTypeId"
}

const _CreateExchangeAccountSettings: React.FC<Props> = ({
  errorMessage,
  exchange,
  onSubmit
}) => {
  const currency = "BTC";
  const [available, setAvailable] = useState(0);
  const [rate, setRate] = useState(1);
  const [t] = useTranslation();

  const form = useForm<ICreateExchangeAccountSettingsFormValues>({
    defaultValues: {
      [CREATE_EXCHANGE_ACCOUNT_FIELDS.brokerAccountTypeId]: getBrokerId(
        exchange.accountTypes
      ),
      [CREATE_EXCHANGE_ACCOUNT_FIELDS.depositWalletId]: "",
      [CREATE_EXCHANGE_ACCOUNT_FIELDS.depositAmount]: undefined
    },
    validationSchema: CreateExchangeAccountSettingsValidationSchema({
      currency,
      rate,
      t,
      exchange,
      available
    }),
    mode: "onChange"
  });
  const {
    watch,
    setValue,
    formState: { isValid, dirty }
  } = form;
  const { brokerAccountTypeId, depositAmount } = watch();

  const accountType = safeGetElemFromArray(
    exchange.accountTypes,
    ({ id }) => brokerAccountTypeId === id
  );

  const disabled = accountType.isDepositRequired && !dirty;

  const isKycConfirmed = useSelector(kycConfirmedSelector);
  const kycRequired = !isKycConfirmed && accountType.isKycRequired;

  const minimumDepositAmount = accountType.minimumDepositsAmount[currency];
  const validateAndSubmit = useAssetValidate({
    handleSubmit: onSubmit,
    isValid
  });

  return (
    <HookForm form={form} onSubmit={validateAndSubmit}>
      <SettingsBlock blockNumber={"01"} label={t("Exchange")}>
        <AssetField hide>
          <GVHookFormField
            name={CREATE_EXCHANGE_ACCOUNT_FIELDS.brokerAccountTypeId}
            component={GVTextField}
          />
        </AssetField>
        <h5>{exchange.name}</h5>
      </SettingsBlock>
      {kycRequired ? (
        <KycRequiredBlock />
      ) : (
        <>
          <DepositDetailsBlock
            hide={!accountType.isDepositRequired}
            blockNumber={2}
            setAvailable={setAvailable}
            setRate={setRate}
            walletFieldName={CREATE_EXCHANGE_ACCOUNT_FIELDS.depositWalletId}
            inputName={CREATE_EXCHANGE_ACCOUNT_FIELDS.depositAmount}
            depositAmount={depositAmount}
            minimumDepositAmount={minimumDepositAmount}
            setFieldValue={setValue}
            assetCurrency={currency}
          />
          <Row large>
            <CreateAssetNavigation
              asset={"ACCOUNT"}
              isSuccessful={!errorMessage}
              disabled={disabled}
            />
          </Row>
        </>
      )}
    </HookForm>
  );
};

export interface ICreateExchangeAccountSettingsFormValues {
  [CREATE_EXCHANGE_ACCOUNT_FIELDS.brokerAccountTypeId]: string;
  [CREATE_EXCHANGE_ACCOUNT_FIELDS.depositWalletId]: string;
  [CREATE_EXCHANGE_ACCOUNT_FIELDS.depositAmount]?: number | string;
}

interface Props {
  errorMessage?: string;
  exchange: ExchangeInfo;
  onSubmit: (values: ICreateExchangeAccountSettingsFormValues) => void;
}

const CreateExchangeAccountSettings = React.memo(
  _CreateExchangeAccountSettings
);
export default CreateExchangeAccountSettings;
