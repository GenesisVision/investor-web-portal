import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import { InjectedFormikProps, withFormik } from "formik";
import { CloseableAssetType } from "modules/asset-settings/close-asset/close-asset";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { twoFactorValidator } from "shared/utils/validators/validators";
import { SetSubmittingType } from "utils/types";
import { object } from "yup";

const _CloseAssetForm: React.FC<
  InjectedFormikProps<FormProps, ICloseAssetFormValues>
> = ({
  asset,
  t,
  onCancel,
  twoFactorEnabled,
  handleSubmit,
  isSubmitting,
  assetName
}) => (
  <form id="closeAssetForm" onSubmit={handleSubmit} noValidate>
    <DialogTop
      title={t(
        `asset-settings.period-and-closing.close-confirm-title-${asset.toLowerCase()}`
      )}
      subtitle={assetName}
    />
    <DialogBottom>
      {t(
        `asset-settings.period-and-closing.close-confirm-notification-${asset.toLowerCase()}`
      )}
      {twoFactorEnabled && (
        <GVFormikField
          type="tel"
          name={FIELDS.twoFactorCode}
          label={t("wallet-withdraw.two-factor-code-label")}
          autoComplete="off"
          component={GVTextField}
        />
      )}
      <DialogButtons>
        <GVButton type="submit" disabled={isSubmitting}>
          {t("buttons.confirm")}
        </GVButton>
        <GVButton
          color="secondary"
          variant="outlined"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          {t("buttons.cancel")}
        </GVButton>
      </DialogButtons>
    </DialogBottom>
  </form>
);

const CloseAssetForm = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, ICloseAssetFormValues>({
    displayName: "close-asset",
    mapPropsToValues: () => ({ [FIELDS.twoFactorCode]: "" }),
    validationSchema: ({ t, twoFactorEnabled }: FormProps) =>
      object().shape({
        [FIELDS.twoFactorCode]: twoFactorValidator(t, twoFactorEnabled)
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_CloseAssetForm);
export default CloseAssetForm;

enum FIELDS {
  twoFactorCode = "twoFactorCode"
}

interface OwnProps {
  assetName?: string;
  asset: CloseableAssetType;
  onCancel: () => void;
  twoFactorEnabled: boolean;
  onSubmit: (
    values: ICloseAssetFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

export interface ICloseAssetFormValues {
  [FIELDS.twoFactorCode]: string;
}

type FormProps = WithTranslation & OwnProps;
