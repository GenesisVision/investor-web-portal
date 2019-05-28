import { MomentInput } from "moment";

export const DATE_RANGE_FILTER_NAME = "dateRange";

export const SERVER_STATISTIC_DATE_RANGE_MIN_FILTER_NAME = "statisticDateFrom";
export const SERVER_STATISTIC_DATE_RANGE_MAX_FILTER_NAME = "statisticDateTo";
export const SERVER_DATE_RANGE_MIN_FILTER_NAME = "from";
export const SERVER_DATE_RANGE_MAX_FILTER_NAME = "to";

export type SERVER_DATE_NAME =
  | "from"
  | "to"
  | "dateFrom"
  | "dateTo"
  | "statisticDateFrom"
  | "statisticDateTo";

export enum DATA_RANGE_FILTER_TYPES {
  ALL = "all",
  LAST_MOUTH = "lastMonth",
  LAST_WEEK = "lastWeek",
  CUSTOM = "custom"
}

export interface IDataRangeFilterValue {
  type: DATA_RANGE_FILTER_TYPES;
  dateStart: MomentInput;
  dateEnd: MomentInput;
}

export const DEFAULT_DATE_RANGE_FILTER_VALUE: IDataRangeFilterValue = {
  type: DATA_RANGE_FILTER_TYPES.ALL,
  dateStart: undefined,
  dateEnd: undefined
};

export type DateRangeFilterType = IDataRangeFilterValue;

export type ComposedRequestDataRangeNames = SERVER_DATE_NAME;
export type ComposedRequestDataRangeValues = string | Date;
export type ComposedRequestDataRangeValue = {
  [key in SERVER_DATE_NAME]?: ComposedRequestDataRangeValues
};
