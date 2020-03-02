import withAuthLayout from "decorators/with-auth-layout";
import { useEmailPendingState } from "pages/auth/auth.service";
import LoginFooter from "pages/auth/components/login-footer/login-footer";
import EmailPendingPage from "pages/auth/forgot-password/email-pending/email-pending.page";
import React from "react";
import { SIGNUP_ROUTE } from "routes/app.routes";
import { redirect } from "routes/redirect.helper";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<any> = () => {
  return <EmailPendingPage />;
};

Page.getInitialProps = async ctx => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getEmailPendingState } = useEmailPendingState(ctx);
  const { email } = getEmailPendingState();
  redirect(ctx, email.length === 0);
};

export default withAuthLayout({
  titleKey: "auth.password-restore.title",
  footerAuthRoute: SIGNUP_ROUTE,
  Footer: LoginFooter
})(Page);
