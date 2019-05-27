import * as React from "react";
import { Route, Switch } from "react-router-dom";
import FundsFacetPage from "shared/components/funds/funds-facet/funds-facet.page";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import PrivateRoute from "shared/components/private-route/private-route";
import { SLUG_URL_REGEXP } from "shared/utils/constants";

import FundDetailsPage from "./fund-details/fund-details.page";
import FundsPage from "./funds/funds.page";

export const FUNDS_FAVORITES_TAB_NAME = "favorites";
export const FUNDS_EXPLORE_TAB_NAME = "";
export const FUNDS_SLUG_URL_PARAM_NAME = "fundsSlugUrl";

export const FUNDS_ROUTE = "/funds";
export const FUND_DETAILS_ROUTE = `${FUNDS_ROUTE}/:${FUNDS_SLUG_URL_PARAM_NAME}`;
export const FUND_DETAILS_ROUTE_REGEX = `${FUNDS_ROUTE}/:${FUNDS_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;

export const FUNDS_FACET_ROUTE = `${FUNDS_ROUTE}/facets/:${FUNDS_SLUG_URL_PARAM_NAME}`;
export const FUNDS_FACET_ROUTE_REGEX = `${FUNDS_ROUTE}/facets/:${FUNDS_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;
export const FUNDS_TAB_ROUTE = `${FUNDS_ROUTE}/:tab`;
export const FUNDS_EXPLORE_TAB_ROUTE = `${FUNDS_ROUTE}/:tab(${FUNDS_EXPLORE_TAB_NAME})`;
export const FUNDS_FAVORITES_TAB_ROUTE = `${FUNDS_ROUTE}/:tab(${FUNDS_FAVORITES_TAB_NAME})`;

const FundsRoutes: React.FC = () => (
  <Switch>
    <Route exact path={FUNDS_ROUTE} component={FundsPage} />
    <PrivateRoute path={FUNDS_FAVORITES_TAB_ROUTE} component={FundsPage} />
    <Route path={FUNDS_FACET_ROUTE_REGEX} component={FundsFacetPage} />
    <Route path={FUND_DETAILS_ROUTE_REGEX} component={FundDetailsPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default FundsRoutes;
