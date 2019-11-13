import {
  dispatchFundDescription,
  dispatchFundId
} from "pages/funds/fund-details/services/fund-details.service";
import FundSettingsPage from "pages/funds/fund-settings/fund-settings.page";
import React from "react";
import { compose } from "redux";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";
import { NextPageWithRedux } from "shared/utils/types";

const Page: NextPageWithRedux<void> = () => {
  return <FundSettingsPage />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const {
    accountSettings: { currency }
  } = ctx.reduxStore.getState();
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchFundId(id as string)),
    ctx.reduxStore.dispatch(dispatchFundDescription(ctx, currency))
  ]);
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);
