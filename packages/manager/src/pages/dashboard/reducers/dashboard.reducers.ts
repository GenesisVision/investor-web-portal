import { ChartSimple, FundsList, ProgramsList } from "gv-api-web";
import { combineReducers } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { ITableState } from "shared/components/table/reducers/table.reducer";
import { Nullable } from "shared/utils/types";

import dashboardAssetChartReducer from "./dashboard-asset-chart.reducer";
import dashboardAssetReducer, {
  ManagerAssetsState
} from "./dashboard-assets.reducer";
import dashboardEventsReducer, {
  ManagerPortfolioEventsState
} from "./dashboard-events.reducer";
import dashboardFundsReducer from "./dashboard-funds.reducer";
import dashboardInRequestsReducer, {
  ProgramRequestsState
} from "./dashboard-in-requests.reducer";
import dashboardPeriodReducer from "./dashboard-period.reducer";
import dashboardProgramsReducer from "./dashboard-programs.reducer";

export interface IDashboardAssetChart {
  type: ASSETS_TYPES;
  id: string;
  title: string;
  equityChart: ChartSimple[];
  pnLChart?: ChartSimple[];
}

export type ManagerDashboardState = {
  period: ChartDefaultPeriod;
  assets: ManagerAssetsState;
  assetChart: Nullable<IDashboardAssetChart>;
  eventsData: ManagerPortfolioEventsState;
  programs: ITableState<ProgramsList>;
  funds: ITableState<FundsList>;
  inRequestsData: ProgramRequestsState;
};

const dashboardReducer = combineReducers<ManagerDashboardState>({
  period: dashboardPeriodReducer,
  assets: dashboardAssetReducer,
  assetChart: dashboardAssetChartReducer,
  eventsData: dashboardEventsReducer,
  programs: dashboardProgramsReducer,
  funds: dashboardFundsReducer,
  inRequestsData: dashboardInRequestsReducer
});

export default dashboardReducer;
