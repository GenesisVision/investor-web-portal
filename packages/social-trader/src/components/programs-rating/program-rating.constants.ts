import { SortingColumn } from "../table/components/filtering/filter.type";

export const PROGRAMS_COLUMNS: SortingColumn[] = [
  {
    name: "title"
  },
  {
    name: "equity"
  },
  {
    name: "investors"
  },
  {
    name: "available-to-invest"
  },
  {
    name: "period"
  },
  {
    name: "age"
  },
  {
    name: "drawdown"
  },
  {
    name: "profit"
  },
  {
    name: "chart"
  }
];

export const COLUMNS = [
  {
    name: "position"
  },
  ...PROGRAMS_COLUMNS
];

export const SELF_PROGRAMS = "selfPrograms";

export const PROGRAMS = "programs";
