import { ASSET_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { composeDefaultAssetTypeFilter } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.helpers";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import { composeDefaultEventTypeFilter } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.helpers";
import {
  FilteringType,
  SortingColumn
} from "shared/components/table/components/filtering/filter.type";
import { IComposeDefaultFilter } from "shared/components/table/components/table.types";

export const PORTFOLIO_EVENTS_COLUMNS: SortingColumn[] = [
  {
    name: "date"
  },
  {
    name: "description"
  },
  {
    name: "amount"
  }
];

export const PORTFOLIO_EVENTS_INVESTOR_COLUMNS: SortingColumn[] = [
  {
    name: "date"
  },
  {
    name: "description"
  },
  {
    name: "fee"
  },
  {
    name: "amount"
  }
];

export const PORTFOLIO_EVENTS_FILTERS: IComposeDefaultFilter[] = [
  {
    ...composeDefaultDateRangeFilter()
  },
  { ...composeDefaultAssetTypeFilter() },
  { ...composeDefaultEventTypeFilter() }
];

export const PORTFOLIO_EVENTS_DEFAULT_FILTERING: FilteringType = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  assetType: ASSET_TYPE_FILTER_DEFAULT_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE
};

export const PORTFOLIO_EVENTS_TYPES_ENUM = {
  All: "all",
  Invest: "invest",
  Withdraw: "withdraw",
  Profit: "profit",
  Loss: "loss",
  Reinvest: "reinvest",
  Canceled: "canceled",
  Ended: "ended",
  ManagerInvest: "ManagerInvest",
  EntranceFee: "EntranceFee",
  AssetStarted: "AssetStarted",
  InvestorInvest: "InvestorInvest",
  AssetFinished: "AssetFinished",
  ProgramPeriodStarts: "ProgramPeriodStarts",
  ProgramPeriodEnds: "ProgramPeriodEnds"
};

export enum PORTFOLIO_EVENTS_TYPES {
  All = "all",
  Invest = "invest",
  Withdraw = "withdraw",
  Profit = "profit",
  Loss = "loss",
  Reinvest = "reinvest",
  Canceled = "canceled",
  Ended = "ended",
  ManagerInvest = "ManagerInvest",
  EntranceFee = "EntranceFee",
  AssetStarted = "AssetStarted",
  InvestorInvest = "InvestorInvest",
  AssetFinished = "AssetFinished",
  ProgramPeriodStarts = "ProgramPeriodStarts",
  ProgramPeriodEnds = "ProgramPeriodEnds"
}
