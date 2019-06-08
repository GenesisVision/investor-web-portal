import {
  ChartDefaultPeriod,
  getDefaultPeriod
} from "shared/components/chart/chart-period/chart-period.helpers";

import { DASHBOARD_PERIOD, TSetPeriodAction } from "../actions/dashboard.actions";

const dashboardPeriodReducer = (
  state: ChartDefaultPeriod = getDefaultPeriod(),
  action: TSetPeriodAction
): ChartDefaultPeriod => {
  switch (action.type) {
    case DASHBOARD_PERIOD:
      return action.payload;
    default:
      return state;
  }
};

export default dashboardPeriodReducer;
