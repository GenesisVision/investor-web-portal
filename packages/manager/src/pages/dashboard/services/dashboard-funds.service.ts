import { CancelablePromise, FundsList } from "gv-api-web";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import authService from "shared/services/auth-service";
import { ActionType } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";

export const getDashboardFunds = (
  requestFilters?: ComposeFiltersAllType
): ActionType<CancelablePromise<FundsList>> =>
  actions.fetchDashboardFunds(authService.getAuthArg(), requestFilters);
