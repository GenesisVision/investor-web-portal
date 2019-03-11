import React from "react";
import { withTranslation } from "react-i18next";

const DisableSuccess = ({ t }) => {
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("2fa-page.disable.title")}</h2>
      </div>
      <p>{t("2fa-page.disable.success")}</p>
    </div>
  );
};

const DisableAuthSuccess = withTranslation()(DisableSuccess);

export default DisableAuthSuccess;
