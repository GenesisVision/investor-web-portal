import {
  DATE_RANGE_FILTER_TYPE,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  composeDefaultDateRangeFilter,
  composeRequestValueFunc,
  validateDateRange
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import { programsTagFilter } from "shared/components/table/components/filtering/tag-filter/tag-filter.helpers";
import {
  FILTER_TYPE,
  FilterType
} from "shared/components/table/helpers/filtering.helpers";

import { IComposeDefaultFilter } from "../../../../components/table/components/table.types";

export const LEVEL_FILTER_NAME = "level";
export const CURRENCY_FILTER_NAME = "programCurrency";
export const DATE_RANGE_FILTER_NAME = "dateRange";
export const SORTING_FILTER_NAME = "sorting";

export const SERVER_LEVEL_MIN_FILTER_NAME = "levelMin";
export const SERVER_LEVEL_MAX_FILTER_NAME = "levelMax";
export const SERVER_DATE_RANGE_MIN_FILTER_NAME = "statisticDateFrom";
export const SERVER_DATE_RANGE_MAX_FILTER_NAME = "statisticDateTo";

export const LEVEL_MIN_FILTER_VALUE = 1;
export const LEVEL_MAX_FILTER_VALUE = 7;

export const SORTING_FILTER_VALUE = "ByProfitDesc";
export const CURRENCY_FILTER_VALUE = undefined;

const programsLevelFilter = {
  name: LEVEL_FILTER_NAME,
  type: FILTER_TYPE.RANGE,
  defaultValue: [LEVEL_MIN_FILTER_VALUE, LEVEL_MAX_FILTER_VALUE],
  validate: (value: string[]) => {
    const levelRegex = /[0-7]/;
    if (Array.isArray(value) && value.length === 2) {
      const [a, b] = value;
      return levelRegex.test(a) && levelRegex.test(b) && a < b;
    }
    return false;
  }
};

const programsCurrencyFilter = {
  name: CURRENCY_FILTER_NAME,
  type: FILTER_TYPE.GENERAL,
  defaultValue: CURRENCY_FILTER_VALUE
  //validate: value => CURRENCY_FILTER_VALUES.includes(value) <--fetched from server
};

export const programsDateRangeFilter = {
  ...composeDefaultDateRangeFilter({
    composeApiRequestValue: composeRequestValueFunc(
      SERVER_DATE_RANGE_MIN_FILTER_NAME,
      SERVER_DATE_RANGE_MAX_FILTER_NAME
    ),
    defaultValue: {
      ...DEFAULT_DATE_RANGE_FILTER_VALUE,
      type: DATE_RANGE_FILTER_TYPE.LAST_MONTH
    }
  }),
  validate: validateDateRange
};

export const PROGRAMS_TABLE_FILTERS: any[] = [
  programsTagFilter,
  programsLevelFilter,
  programsCurrencyFilter,
  programsDateRangeFilter
];

export const PROGRAMS_COLUMNS: SortingColumn[] = [
  {
    name: "title"
  },
  {
    name: "equity",
    sortingName: "ByBalance"
  },
  /*{
    name: "currency"
  },*/
  {
    name: "investors",
    sortingName: "ByInvestors"
  },
  {
    name: "available-to-invest"
  },
  {
    name: "period",
    sortingName: "ByEndOfPeriod"
  },
  {
    name: "trades",
    sortingName: "ByTrades"
  },
  {
    name: "drawdown",
    sortingName: "ByDrawdown"
  },
  {
    name: "profit",
    sortingName: "ByProfit"
  },
  {
    name: "chart"
  },
  {
    name: "favourite"
  }
];
