import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogTop } from "components/dialog/dialog-top";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isTwoFactorEnabledSelector } from "reducers/header-reducer";

import { editApiKey } from "../../services/api-keys.service";
import { ApiKeyForm } from "../form/api-key.form";
import { ADD_API_KEY_FORM_FIELDS, IApiKeyFormValues } from "../form/api-key.helpers";

export interface IEditApiKeyContainerProps {
  defaultValues: Partial<IApiKeyFormValues>;

  onClose: (param?: any) => void;
}

const _EditApiKeyContainer: React.FC<IEditApiKeyContainerProps> = ({
  onClose,
  defaultValues
}) => {
  const [t] = useTranslation();

  const isTwoFactorEnabled = useSelector(isTwoFactorEnabledSelector);

  const { sendRequest } = useApiRequest({
    request: editApiKey,
    middleware: [onClose]
  });

  const handleSubmit = useCallback((values: IApiKeyFormValues) => {
    return sendRequest({
      ...values,
      isTradingEnabled: !values[ADD_API_KEY_FORM_FIELDS.isTradingDisabled],
      id: defaultValues.id || "",
      twoFactorCode: values[ADD_API_KEY_FORM_FIELDS.twoFactorCode] || ""
    });
  }, []);

  return (
    <>
      <DialogTop title={t("api-keys:key-dialog.edit-title")} />
      <DialogBottom fixed={false}>
        <ApiKeyForm
          defaultValues={defaultValues}
          isTwoFactorEnabled={isTwoFactorEnabled}
          onSubmit={handleSubmit}
          submitLabel={t("api-keys:key-dialog.confirm")}
        />
      </DialogBottom>
    </>
  );
};

export const EditApiKeyContainer = React.memo(_EditApiKeyContainer);
