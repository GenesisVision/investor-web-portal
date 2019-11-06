import statisticCurrencyReducerCreator from "shared/components/details/reducers/statistic-currency.reducer";
import { fieldSelector } from "shared/utils/selectors";

import { SET_PROGRAM_STATISTIC_CURRENCY } from "../program-details.constants";

export const statisticCurrencySelector = fieldSelector(
  state => state.programDetails.statisticCurrency
);

const statisticCurrencyReducer = statisticCurrencyReducerCreator(
  SET_PROGRAM_STATISTIC_CURRENCY
);
export default statisticCurrencyReducer;
