import { Broker } from "gv-api-web";
import { TFunction } from "i18next";
import { object, string } from "yup";

import {
  ATTACH_ACCOUNT_FIELDS,
  IAttachAccountSettingsFormValues
} from "./attach-account-settings";

export const attachAccountSettingsValidationSchema = (t: TFunction) =>
  object<IAttachAccountSettingsFormValues>().shape({
    [ATTACH_ACCOUNT_FIELDS.secret]: string().required(
      t("attach-account-page.settings.validation.api-secret")
    ),
    [ATTACH_ACCOUNT_FIELDS.key]: string().required(
      t("attach-account-page.settings.validation.api-key")
    )
  });

export const attachAccountSettingsMapPropsToValues = ({
  exchanges,
  requestBrokerName = ""
}: {
  requestBrokerName?: string;
  exchanges: Broker[];
}) => {
  const requestBroker = exchanges.find(
    ({ name }) => name.toLowerCase() === requestBrokerName.toLowerCase()
  );
  const requestBrokerAccountTypeId = requestBroker
    ? requestBroker.accountTypes[0].id
    : "";
  const firstBrokerAccountTypeId = exchanges.length
    ? exchanges[0].accountTypes[0].id
    : "";
  return {
    [ATTACH_ACCOUNT_FIELDS.secret]: "",
    [ATTACH_ACCOUNT_FIELDS.brokerName]: exchanges.length
      ? exchanges[0].name
      : "",
    [ATTACH_ACCOUNT_FIELDS.brokerAccountTypeId]:
      requestBrokerAccountTypeId || firstBrokerAccountTypeId,
    [ATTACH_ACCOUNT_FIELDS.key]: ""
  };
};
