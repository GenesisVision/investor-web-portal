import LoginFooter from "components/auth/components/login-footer/login-footer";
import LoginPage from "components/auth/signin/login/login.page";
import useHistoryContext from "decorators/history-provider/use-history-context";
import withAuthLayout from "decorators/with-auth-layout";
import { NextPage } from "next";
import React from "react";
import { ROLE_HOME_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";

const Page: NextPage = () => {
  const { from } = useHistoryContext();
  return <LoginPage redirectFrom={from || ROLE_HOME_ROUTE} />;
};

export const Login = withAuthLayout({
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter,
  titleKey: "auth.login.title"
})(Page);
