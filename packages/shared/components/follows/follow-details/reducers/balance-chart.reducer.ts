import { ProgramBalanceChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { apiSelector } from "shared/utils/selectors";

import { FETCH_FOLLOW_BALANCE_CHART } from "../follow-details.constants";

export type FollowBalanceChartDataType = ProgramBalanceChart;

export type FollowBalanceChartState = IApiState<FollowBalanceChartDataType>;

export const followBalanceChartSelector = apiSelector<
  FollowBalanceChartDataType,
  RootState
>(state => state.followDetails.balanceChart);

const followBalanceChartReducer = apiReducerFactory<FollowBalanceChartDataType>(
  {
    apiType: FETCH_FOLLOW_BALANCE_CHART
  }
);

export default followBalanceChartReducer;
