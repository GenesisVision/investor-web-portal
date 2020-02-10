import withDefaultLayout from "decorators/with-default-layout";
import { NextPage, NextPageContext } from "next";
import EmailConfirmPage from "pages/auth/email-confirm/email-confirm.page";
import React from "react";
import { getParamsFromCtx } from "utils/ssr-helpers";

const Page: NextPage<Props> = ({ userId, code }) => {
  return <EmailConfirmPage userId={userId} code={code} />;
};
Page.getInitialProps = async (ctx: NextPageContext) => {
  const { userId, code } = getParamsFromCtx(ctx);
  return { userId, code };
};
interface Props {
  userId: string;
  code: string;
}

export default withDefaultLayout(Page);
