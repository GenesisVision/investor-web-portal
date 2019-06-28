import * as React from "react";
import { Route, Switch } from "react-router-dom";
import {
  DASHBOARD_EVENTS_ROUTE,
  DASHBOARD_ROUTE
} from "shared/routes/dashboard.routes";

import PortfolioEventsAllComponent from "./components/dashboard-portfolio-events-all/dashboard-portfolio-events-all";
import DashboardPage from "./dashboard.page";

const DashboardRoutes: React.FC = () => (
  <Switch>
    <Route exact path={DASHBOARD_ROUTE} component={DashboardPage} />
    <Route
      path={DASHBOARD_EVENTS_ROUTE}
      component={PortfolioEventsAllComponent}
    />
  </Switch>
);

export default DashboardRoutes;
