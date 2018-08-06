import RestorePasswordLayout from "components/reset-layout/reset-layout";
import ResetPasswordContainer from "modules/password-reset/components/reset-password-container/reset-password-container";
import qs from "qs";
import React from "react";

const ResetPassword = ({ location }) => {
  const queryParams = qs.parse(location.search.slice(1));
  return (
    <RestorePasswordLayout>
      <p>Just enter new password</p>
      <ResetPasswordContainer queryParams={queryParams} />
    </RestorePasswordLayout>
  );
};

export default ResetPassword;
