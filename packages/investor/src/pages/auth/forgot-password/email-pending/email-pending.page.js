import "shared/components/auth/forgot-password/email-pending/email-pending.scss";

import React from "react";
import { withTranslation } from "react-i18next";
import EmailPendingContainer from "shared/components/auth/forgot-password/email-pending/email-pending-container";

import forgotPasswordService from "../services/forgot-password.service";

const EmailPendingPage = ({ t }) => {
  return (
    <div className="password-pending">
      <p className="password-pending__text">
        {t("auth.password-restore.email-pending.text-section-1")}
      </p>
      <p className="password-pending__text">
        {t("auth.password-restore.email-pending.text-section-2")}
      </p>
      <p className="password-pending__text">
        {t("auth.password-restore.email-pending.text-section-3")}
      </p>
      <EmailPendingContainer forgotPasswordService={forgotPasswordService} />
    </div>
  );
};

export default withTranslation()(EmailPendingPage);
