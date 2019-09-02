import React from "react";
import { compose } from "redux";
import SecurityPage from "shared/components/profile/security/security.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";

const Security: React.FC = () => {
  return <SecurityPage />;
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Security);
