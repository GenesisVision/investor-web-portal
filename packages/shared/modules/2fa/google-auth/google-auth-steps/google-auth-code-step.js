import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";
import GVqr from "shared/components/gv-qr/gv-qr";

const GoogleStep2 = ({ t, authenticatorUri, sharedKey, className }) => {
  return (
    <div className={classnames("google-auth__step", className)}>
      <div className="google-auth__count">02</div>
      <div className="google-auth__title">{t("2fa-page.scan-code")}</div>
      <div className="google-auth__qr">
        <GVqr value={authenticatorUri} />
      </div>
      <p className="google-auth__alt-text">{t("2fa-page.alt-code")}</p>
      <div className="google-auth__alt-code">{sharedKey}</div>
    </div>
  );
};

GoogleStep2.propTypes = {
  authenticatorUri: PropTypes.string.isRequired,
  sharedKey: PropTypes.string.isRequired
};

const GoogleCodeStep = withTranslation()(GoogleStep2);

export default GoogleCodeStep;
