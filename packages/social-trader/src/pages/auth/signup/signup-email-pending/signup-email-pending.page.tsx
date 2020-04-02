import { useEmailPendingState } from "pages/auth/auth.service";
import CaptchaContainer from "pages/auth/captcha-container";
import { sendConfirmationLink } from "pages/auth/signup/services/signup-email-pending.service";
import SignupEmailPendingContainer from "pages/auth/signup/signup-email-pending/signup-email-pending-container";
import React from "react";
import { useTranslation } from "react-i18next";

import "./signup-email-pending.scss";

const _EmailPending: React.FC = () => {
  const [t] = useTranslation();
  const { getEmailPendingState } = useEmailPendingState();
  const { email } = getEmailPendingState();
  return (
    <div className="signup-email">
      <h1>{t("auth.signup.email-confirm-title")}</h1>
      <p className="signup-email-pending__text">
        {t("auth.signup-email-pending.text-section")}
      </p>
      <CaptchaContainer
        request={sendConfirmationLink(email)}
        renderForm={handle => (
          <SignupEmailPendingContainer
            sendConfirmationLink={() => handle({ email })}
          />
        )}
      />
    </div>
  );
};

const EmailPending = React.memo(_EmailPending);
export default EmailPending;
