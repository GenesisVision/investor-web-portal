import { InjectedFormikProps, withFormik } from "formik";
import Link from "next/link";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import { SetSubmittingType } from "shared/utils/types";

import { FORGOT_PASSWORD_ROUTE } from "../../forgot-password/forgot-password.routes";
import validationSchema from "./login-form.validators";

const _LoginForm: React.FC<
  InjectedFormikProps<Props, ILoginFormFormValues>
> = ({ t, isSubmitting, handleSubmit, error, isValid }) => (
  <form
    id="loginForm"
    className="login-form"
    onSubmit={handleSubmit}
    noValidate
  >
    <GVFormikField
      type="email"
      name={FIELDS.email}
      label={t("auth.login.placeholder.email")}
      autoComplete="email"
      component={GVTextField}
    />
    <GVFormikField
      type="password"
      name={FIELDS.password}
      label={t("auth.login.placeholder.password")}
      autoComplete="current-password"
      component={GVTextField}
    />

    <div className="login-form__forgot">
      <Link href={FORGOT_PASSWORD_ROUTE}>
        <a>
          <GVButton variant="text">{t("auth.login.forgot")}</GVButton>
        </a>
      </Link>
    </div>
    <FormError error={error} />

    <div className="login__submit-block">
      <GVButton
        className="login__submit-button"
        id="loginSubmit"
        disabled={isSubmitting || !isValid}
        type="submit"
      >
        {t("auth.login.confirm-button-text")}
      </GVButton>
    </div>
  </form>
);

enum FIELDS {
  email = "email",
  password = "password"
}

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  onSubmit(data: ILoginFormFormValues, setSubmitting: SetSubmittingType): void;
  error: string;
}

export interface ILoginFormFormValues {
  [FIELDS.email]: string;
  [FIELDS.password]: string;
}

const LoginForm = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, ILoginFormFormValues>({
    displayName: "loginForm",
    isInitialValid: true,
    mapPropsToValues: () => ({
      [FIELDS.email]: "",
      [FIELDS.password]: ""
    }),
    validationSchema: validationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_LoginForm);
export default LoginForm;
