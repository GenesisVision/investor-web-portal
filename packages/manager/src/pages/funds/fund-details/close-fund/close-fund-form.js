import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import { object, string } from "yup";

const CloseFundForm = ({
  t,
  onCancel,
  twoFactorEnabled,
  handleSubmit,
  isSubmitting,
  errorMessage
}) => {
  return (
    <form id="closeFundForm" onSubmit={handleSubmit} noValidate>
      <div className="dialog__top">
        <h2>{t("fund-details-page.description.close-fund")}</h2>
        <div className="dialog__text">
          <p>{t("fund-details-page.description.close-fund-notification")}</p>
        </div>
        {twoFactorEnabled && (
          <GVFormikField
            type="text"
            name="twoFactorCode"
            label={t("wallet-withdraw.two-factor-code-label")}
            autoComplete="off"
            component={GVTextField}
          />
        )}
        {errorMessage && <div className="form-error">{errorMessage}</div>}
        <div className="dialog__buttons">
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
        </div>
      </div>
    </form>
  );
};

CloseFundForm.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func
};

const twoFactorvalidator = (t, twoFactorEnabled) => {
  return twoFactorEnabled
    ? string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"))
        .required(t("wallet-withdraw.validation.two-factor-required"))
    : string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"));
};

export default compose(
  withTranslation(),
  withFormik({
    displayName: "close-fund",
    mapPropsToValues: props => {
      return { twoFactorCode: "" };
    },
    validationSchema: ({ t, twoFactorEnabled }) =>
      object().shape({
        twoFactorCode: twoFactorvalidator(t, twoFactorEnabled)
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(CloseFundForm);
