import { StatisticCurrencyState } from "components/details/reducers/statistic-currency.reducer";
import { StatisticPeriodState } from "components/details/reducers/statistic-period.reducer";
import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

import fundIdReducer, { FundIdState } from "../reducers/id.reducer";
import fundBalanceChartReducer, {
  FundBalanceChartState
} from "./balance-chart.reducer";
import fundDescriptionReducer, {
  FundDescriptionState
} from "./description.reducer";
import fundHistoryReducer, { FundHistoryState } from "./fund-history.reducer";
import fundProfitChartReducer, {
  FundProfitChartState
} from "./profit-chart.reducer";
import statisticCurrencyReducer from "./statistic-currency.reducer";
import statisticPeriodReducer from "./statistic-period.reducer";

type FundDetailsDataType = Readonly<{
  id: FundIdState;
  statisticPeriod: StatisticPeriodState;
  statisticCurrency: StatisticCurrencyState;
  profitChart: FundProfitChartState;
  balanceChart: FundBalanceChartState;
  description: FundDescriptionState;
  fundHistory: FundHistoryState;
}>;

export type FundDetailsState = FundDetailsDataType;

const fundDetailsReducer = clearableReducer(
  combineReducers<FundDetailsState>({
    id: fundIdReducer,
    statisticPeriod: statisticPeriodReducer,
    statisticCurrency: statisticCurrencyReducer,
    description: fundDescriptionReducer,
    profitChart: fundProfitChartReducer,
    balanceChart: fundBalanceChartReducer,
    fundHistory: fundHistoryReducer
  })
);

export default fundDetailsReducer;
