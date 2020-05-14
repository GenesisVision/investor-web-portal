import FormError from "components/form/form-error/form-error";
import GVButton from "components/gv-button";
import { GVHookFormField } from "components/gv-hook-form-field";
import Link from "components/link/link";
import { Row } from "components/row/row";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import {
  CAPTCHA_STATUS,
  CaptchaStatusContext
} from "pages/auth/captcha-container";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

import { FORGOT_PASSWORD_ROUTE } from "../../forgot-password/forgot-password.routes";
import validationSchema from "./login-form.validators";

enum FIELDS {
  email = "email",
  password = "password"
}

const _LoginForm: React.FC<Props> = ({ errorMessage, onSubmit }) => {
  const [t] = useTranslation();

  const form = useForm<ILoginFormFormValues>({
    defaultValues: {
      [FIELDS.email]: "",
      [FIELDS.password]: ""
    },
    validationSchema: validationSchema(t),
    mode: "onChange"
  });

  const requestStatus = useContext(CaptchaStatusContext);

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <GVHookFormField
        wide
        autoFocus
        type="email"
        name={FIELDS.email}
        label={t("auth.login.placeholder.email")}
        autoComplete="email"
        component={SimpleTextField}
      />
      <Row onlyOffset>
        <GVHookFormField
          wide
          type="password"
          name={FIELDS.password}
          label={t("auth.login.placeholder.password")}
          autoComplete="current-password"
          component={SimpleTextField}
        />
      </Row>

      <Row large>
        <Link to={FORGOT_PASSWORD_ROUTE}>
          <GVButton noPadding variant="text">
            {t("auth.login.forgot")}
          </GVButton>
        </Link>
      </Row>
      {errorMessage && (
        <Row>
          <FormError error={errorMessage} />
        </Row>
      )}

      <Row large>
        <SubmitButton
          checkValid={false}
          checkDirty={false}
          id="loginSubmit"
          disabled={requestStatus === CAPTCHA_STATUS.PENDING}
          isSuccessful={requestStatus === CAPTCHA_STATUS.SUCCESS}
          isPending={requestStatus === CAPTCHA_STATUS.PENDING}
        >
          {t("auth.login.confirm-button-text")}
        </SubmitButton>
      </Row>
    </HookForm>
  );
};

interface Props {
  onSubmit: (data: ILoginFormFormValues) => void;
  errorMessage: string;
}

export interface ILoginFormFormValues {
  [FIELDS.email]: string;
  [FIELDS.password]: string;
}

const LoginForm = React.memo(_LoginForm);
export default LoginForm;
