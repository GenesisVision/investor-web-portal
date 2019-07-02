import { InjectedFormikProps, withFormik } from "formik";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";
import { object, string } from "yup";

const _RecoveryCodeForm: React.FC<
  InjectedFormikProps<Props, IRecoveryCodeFormValues>
> = ({ t, handleSubmit, isSubmitting, error }) => (
  <form
    id="recoveryForm"
    className="recovery-form"
    onSubmit={handleSubmit}
    noValidate
  >
    <h3>{t("auth.login.recovery.title")}</h3>
    <p className="recovery-form__text">{t("auth.login.recovery.text")}</p>
    <GVFormikField
      name={FIELDS.code}
      placeholder="Recovery code"
      autoFocus
      component={GVTextField}
    />
    <FormError error={error} />
    <GVButton
      id="recoverySubmit"
      disabled={isSubmitting}
      type="submit"
      className="recovery-form__submit"
    >
      {t("auth.login.recovery.continue")}
    </GVButton>
  </form>
);

enum FIELDS {
  code = "code",
  email = "email"
}

interface Props extends OwnProps, InjectedTranslateProps {}

interface OwnProps {
  email: string;
  onSubmit(
    data: IRecoveryCodeFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  error: string;
}

export interface IRecoveryCodeFormValues {
  [FIELDS.code]: string;
  [FIELDS.email]: string;
}

const RecoveryCodeForm = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, IRecoveryCodeFormValues>({
    displayName: "recoveryForm",
    mapPropsToValues: ({ email }) => ({
      [FIELDS.code]: "",
      [FIELDS.email]: email
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        [FIELDS.code]: string()
          .trim()
          .required(t("auth.login.recovery.validation.recovery-is-required"))
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_RecoveryCodeForm);
export default RecoveryCodeForm;
