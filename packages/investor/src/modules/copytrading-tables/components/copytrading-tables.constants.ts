import { PROGRAM_TRADES_COLUMNS } from "shared/components/programs/program-details/program-details.constants";
import {
  DEFAULT_DATE_RANGE_FILTER_VALUE,
  DateRangeFilterTypes
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";

export const COPYTRADING_OPEN_TRADES_COLUMNS = [
  ...PROGRAM_TRADES_COLUMNS,
  { name: "providers" }
];

export const COPYTRADING_OPEN_TRADES_COLUMNS_old = [
  {
    name: "program"
  },
  {
    name: "manager"
  },
  {
    name: "open-date"
  },
  {
    name: "symbol"
  },
  {
    name: "volume"
  },
  {
    name: "open-price"
  },
  {
    name: "profit"
  },
  {
    name: "close"
  }
];

export const COPYTRADING_TRADES_HISTORY_COLUMNS = [
  {
    name: "program"
  },
  {
    name: "manager"
  },
  {
    name: "direction"
  },
  {
    name: "open-date"
  },
  {
    name: "close-date"
  },
  {
    name: "symbol"
  },
  {
    name: "volume"
  },
  {
    name: "open-price"
  },
  {
    name: "close-price"
  },
  {
    name: "profit"
  }
];

export const COPYTRADING_TRADES_HISTORY_FILTERS = [
  {
    ...composeDefaultDateRangeFilter({
      // add name prop to fix crush
      defaultValue: {
        ...DEFAULT_DATE_RANGE_FILTER_VALUE,
        type: DateRangeFilterTypes.lastMonth
      }
    })
  }
];

export const COPYTRADING_TRADES_HISTORY_DEFAULT_FILTERING = {
  dateRange: {
    ...DEFAULT_DATE_RANGE_FILTER_VALUE,
    type: DateRangeFilterTypes.lastMonth
  }
};
