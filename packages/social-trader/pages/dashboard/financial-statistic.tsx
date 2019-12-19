import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { NextPage } from "next";
import FinancialStatisticPage from "pages/dashboard/financial-statistic.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <FinancialStatisticPage />;
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);
