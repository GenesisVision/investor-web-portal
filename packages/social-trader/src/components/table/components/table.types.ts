import { IDataModel } from "constants/constants";
import { CancelablePromise } from "gv-api-web";
import { Action } from "redux";
import { MiddlewareDispatch, TGetState, VoidFuncType } from "utils/types";

import { FILTER_TYPE } from "../helpers/filtering.helpers";
import { IPaging } from "../helpers/paging.helpers";
import {
  ComposeFiltersAllType,
  FilteringType,
  SortingColumn,
  TFilter
} from "./filtering/filter.type";

export type TRenderHeaderFunc = (
  column: SortingColumn,
  i?: number
) => JSX.Element;

export type Column = {
  name: string;
};

export type UpdateFilterFunc = (filter: TFilter<any>) => void;

export type UpdateItemsFuncType = VoidFuncType;

export type UpdateRowFuncType = (row: any) => void;

export type GetItemsFuncType = (
  filters?: ComposeFiltersAllType
) => CancelablePromise<IDataModel>;

export type GetItemsFuncActionType = (filters: ComposeFiltersAllType) => Action;

export interface IComposeDefaultFilter<T = any> {
  name?: string;
  composeRequestValue?(value: T): Object;
  composeApiRequestValue?(value: T): Object; // temp
  defaultValue?: T;
  type?: FILTER_TYPE;
  validate?(value: T): boolean;
}

export type FiltersType = {
  paging?: IPaging;
  filtering?: FilteringType;
  sorting?: string;
};

export type RenderBodyItemFuncType = (
  item: any,
  updateRow?: UpdateRowFuncType,
  updateItems?: UpdateItemsFuncType
) => JSX.Element;

export type RenderFiltersFuncType = (
  updateFilter: UpdateFilterFunc,
  filtering: FilteringType
) => JSX.Element;

export type UpdateSortingFuncType = (
  opt: string
) => ((dispatch: MiddlewareDispatch, getState: TGetState) => void) | void;

export type RenderSortingFuncType = (
  value: SortingColumn
) => JSX.Element | string;

export type UpdatePagingFuncType = (page: number) => void;

export type TableSelectorType = (opts?: any) => { [keys: string]: any };
