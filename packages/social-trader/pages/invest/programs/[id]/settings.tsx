import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import {
  dispatchProgramDescription,
  dispatchProgramId
} from "pages/programs/program-details/service/program-details.service";
import ProgramSettingsPage from "pages/programs/programs-settings/program-settings.page";
import React from "react";
import { compose } from "redux";
import { NextPageWithRedux } from "utils/types";

const ProgramSettings: NextPageWithRedux<void> = () => {
  return <ProgramSettingsPage />;
};

ProgramSettings.getInitialProps = async ctx => {
  const { id } = ctx.query;
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchProgramId(id as string)),
    ctx.reduxStore.dispatch(dispatchProgramDescription(ctx))
  ]);
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(ProgramSettings);
