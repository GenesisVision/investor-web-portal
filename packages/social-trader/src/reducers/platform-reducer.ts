import { PLATFORM_SETTINGS } from "actions/platform-actions";
import { SelectFilterValue } from "components/table/components/filtering/filter.type";
import {
  AmountWithCurrency,
  EventFilters,
  FundCreateAssetPlatformInfo,
  PlatformInfo,
  ProgramAssetPlatformInfo,
  ProgramCreateAssetPlatformInfo,
  ProgramMinInvestAmount,
  TradingAccountMinCreateAmount
} from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { createSelector } from "reselect";
import { apiFieldSelector, apiSelector, fieldSelector } from "utils/selectors";
import { AuthRootState } from "utils/types";

export type PlatformState = IApiState<PlatformInfo>;

export const platformDataSelector = apiSelector<PlatformInfo>(
  state => state.platformData
);

export const gvInvestFeeSelector = apiFieldSelector<PlatformInfo, number>(
  platformDataSelector,
  fieldSelector(state => state.commonInfo.platformCommission.investment),
  0
);

export const tradingAccountMinDepositAmountsSelector = apiFieldSelector<
  PlatformInfo,
  TradingAccountMinCreateAmount[]
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.tradingAccountInfo.minAmounts),
  []
);

export const fundMinDepositAmountSelector = apiFieldSelector<
  PlatformInfo,
  AmountWithCurrency[]
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.fundInfo.minInvestAmountIntoFund),
  []
);

export const programMinDepositAmountsSelector = apiFieldSelector<
  PlatformInfo,
  ProgramMinInvestAmount[]
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.programInfo.minInvestAmounts),
  []
);

export const currenciesSelector = apiFieldSelector(
  // TODO currency-selector-container
  platformDataSelector,
  fieldSelector(
    state => state.assetInfo.programInfo.availableProgramCurrencies
  ), //TODO
  []
);

export const programCurrenciesSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(
    state => state.assetInfo.programInfo.availableProgramCurrencies
  ), //TODO
  []
);

export const platformCurrenciesSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.commonInfo.platformCurrencies),
  []
);

export const programTagsSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.programInfo.tags),
  []
);

export const fundAssetsSelector = apiFieldSelector(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.fundInfo.assets),
  []
);

export const programsInfoSelector = apiFieldSelector<
  PlatformInfo,
  ProgramAssetPlatformInfo
>(platformDataSelector, fieldSelector(state => state.assetInfo.programInfo));

export const createProgramInfoSelector = apiFieldSelector<
  PlatformInfo,
  ProgramCreateAssetPlatformInfo
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.programInfo.createProgramInfo)
);

export const createFundInfoSelector = apiFieldSelector<
  PlatformInfo,
  FundCreateAssetPlatformInfo
>(
  platformDataSelector,
  fieldSelector(state => state.assetInfo.fundInfo.createFundInfo)
);

export const assetTypeValuesSelector = createSelector<
  AuthRootState,
  PlatformInfo | undefined,
  SelectFilterValue<string>[]
>(
  state => platformDataSelector(state),
  data =>
    (data &&
      data.filters.assets.map(({ key, title }) => ({
        value: key,
        label: title
      }))) ||
    []
);

export const allEventsSelector = createSelector<
  RootState,
  PlatformInfo | undefined,
  EventFilters | undefined
>(
  platformDataSelector,
  data => (data && data.filters.events) || undefined
);

export const fundEventsSelector = createSelector<
  RootState,
  EventFilters | undefined,
  SelectFilterValue<string>[]
>(
  allEventsSelector,
  data =>
    (data &&
      data.investmentHistory.fund.map(({ key, title }) => ({
        value: key,
        labelKey: title
      }))) ||
    []
);

export const programEventsSelector = createSelector<
  RootState,
  EventFilters | undefined,
  SelectFilterValue<string>[]
>(
  allEventsSelector,
  data =>
    (data &&
      data.investmentHistory.program.map(({ key, title }) => ({
        value: key,
        labelKey: title
      }))) ||
    []
);

export const followEventsSelector = createSelector<
  RootState,
  EventFilters | undefined,
  SelectFilterValue<string>[]
>(
  allEventsSelector,
  data =>
    (data &&
      data.tradingHistory.follow.map(({ key, title }) => ({
        value: key,
        labelKey: title
      }))) ||
    []
);

const platformReducer = apiReducerFactory<PlatformInfo>({
  apiType: PLATFORM_SETTINGS
});

export default platformReducer;
