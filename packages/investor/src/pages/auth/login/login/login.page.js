import "shared/components/auth/login/login/login.scss";

import { HOME_ROUTE } from "pages/app/app.routes";
import React from "react";
import LoginFormContainer from "shared/components/auth/login/login/login-form-container";

import AuthTabs from "../../components/auth-tabs/auth-tabs";
import { FORGOT_PASSWORD_ROUTE } from "../../forgot-password/forgot-password.routes";
import { LOGIN_ROUTE } from "shared/components/auth/login/login.routes";
import * as loginService from "../services/login.service";

const LoginPage = ({ location }) => {
  const from = location.state || HOME_ROUTE;
  return (
    <div className="login">
      <AuthTabs authPartUrl={LOGIN_ROUTE} />
      <LoginFormContainer
        from={from}
        loginService={loginService}
        FORGOT_PASSWORD_ROUTE={FORGOT_PASSWORD_ROUTE}
      />
    </div>
  );
};

export default LoginPage;
