import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { NextPage } from "next";
import InvestmentsPage from "pages/dashboard/investments.page.tsx";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <InvestmentsPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["asset-details", "dashboard-page"]
});

export default compose(withDefaultLayout, withPrivateRoute)(Page);
