import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { number, object, string } from "yup";

const DisableAuth = ({ t, handleSubmit, errorMessage, disabled }) => {
  return (
    <form
      id="disable-auth"
      onSubmit={handleSubmit}
      className="dialog__top"
      autoComplete="off"
    >
      <div className="dialog__title">{t("2fa-page.disable.title")}</div>
      <GVFormikField
        name="twoFactorCode"
        type="text"
        label={t("2fa-page.google-code")}
        component={GVTextField}
        autoComplete="off"
        InputComponent={NumberFormat}
        allowNegative={false}
        format="######"
      />
      <GVFormikField
        name="password"
        type="password"
        label={t("2fa-page.password")}
        component={GVTextField}
        autoComplete="new-password"
      />
      <div className="form-error">{errorMessage}</div>
      <div className="dialog__buttons">
        <GVButton
          className="google-auth__button"
          variant="contained"
          color="primary"
          type="submit"
          disabled={disabled}
        >
          {t("buttons.disable")}
        </GVButton>
      </div>
    </form>
  );
};

const DisableAuthForm = compose(
  translate(),
  withFormik({
    displayName: "disable-auth",
    mapPropsToValues: () => ({
      twoFactorCode: "",
      password: ""
    }),
    validationSchema: ({ t }) =>
      object().shape({
        twoFactorCode: number().required(t("2fa-page.code-required")),
        password: string().required(t("2fa-page.password-required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values);
    }
  })
)(DisableAuth);

DisableAuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool
};

export default DisableAuthForm;
