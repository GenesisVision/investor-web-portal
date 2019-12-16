import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import {
  CancelablePromise,
  ItemsViewModelProgramDetailsListItem
} from "gv-api-web";
import authService from "services/auth-service";
import { ActionType } from "utils/types";

import * as actions from "../actions/dashboard.actions";

export const getDashboardPrograms = (
  requestFilters?: ComposeFiltersAllType
): ActionType<CancelablePromise<ItemsViewModelProgramDetailsListItem>> =>
  actions.fetchDashboardProgramsAction(
    authService.getAuthArg(),
    requestFilters
  );
