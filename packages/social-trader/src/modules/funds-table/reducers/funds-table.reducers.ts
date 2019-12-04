import { ItemsViewModelFundDetailsList } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { combineReducers } from "redux";
import { apiSelector } from "utils/selectors";

import { FUNDS_TABLE } from "../actions/funds-table.actions";
import fundsFavoritesReducer from "./funds-table-favorites.reducer";

export type FundsTableState = Readonly<{
  readonly items: IApiState<ItemsViewModelFundDetailsList>;
}>;

export const fundsDataSelector = apiSelector<ItemsViewModelFundDetailsList>(
  state => state.fundsData.items
);

const fundsTableReducer = combineReducers<FundsTableState>({
  items: apiReducerFactory({ apiType: FUNDS_TABLE }, fundsFavoritesReducer)
});

export default fundsTableReducer;
