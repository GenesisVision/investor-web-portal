import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { updateFilter } from "shared/components/table/helpers/filtering.helpers";
import RootState from "shared/reducers/root-reducer";

import { IPaging } from "../helpers/paging.helpers";
import { getItems, updateFilters } from "../services/table.service";
import { FilteringType, SortingColumn, TFilter } from "./filtering/filter.type";
import Table from "./table";
import { IDataModel } from "shared/constants/constants";
import {
  GetItemsFuncActionType,
  IUpdateFilterFunc,
  UpdateRowFuncType
} from "./table.types";

interface ITableContainerProps {
  getItems: GetItemsFuncActionType;
  dataSelector: any;
  isFetchOnMount: boolean;
  className?: string;
  renderHeader?(column: SortingColumn): JSX.Element;
  renderSorting?(value: SortingColumn): string;
  renderBodyCard?(
    x: any,
    updateRow?: UpdateRowFuncType,
    updateItems?: () => void
  ): JSX.Element;
  renderBodyRow?(
    x: any,
    updateRow?: UpdateRowFuncType,
    updateItems?: () => void
  ): JSX.Element;
  renderFilters?(
    updateFilter: IUpdateFilterFunc,
    filtering: FilteringType
  ): JSX.Element;
  columns?: SortingColumn[];
  createButtonToolbar?: JSX.Element;
  emptyMessage?: string | JSX.Element;
}

interface ITableContainerStateProps {
  data: IDataModel;
  isPending: boolean;
  sorting: string;
  paging: IPaging;
  filtering: FilteringType;
  fetchItems: GetItemsFuncActionType;
  defaults: any;
}

interface ITableContainerDispatchProps {
  service: {
    getItems(
      fetchItems: GetItemsFuncActionType,
      dataSelector: (opts?: any) => { [keys: string]: any }
    ): (dispatch: Dispatch, getState: any) => void;
    updateFilters(
      filters?: Object,
      type?: string
    ): (dispatch: Dispatch) => void;
  };
}

class TableContainer extends React.Component<
  ITableContainerProps &
    ITableContainerDispatchProps &
    ITableContainerStateProps
> {
  componentDidMount() {
    const { isFetchOnMount } = this.props;
    if (isFetchOnMount) this.updateItems();
  }

  updateItems = (changedFilters?: Object) => {
    const { service, dataSelector, fetchItems, defaults } = this.props;
    service.updateFilters(changedFilters, defaults.type);
    service.getItems(fetchItems, dataSelector);
  };

  handleUpdateSorting = (sorting: string) => (): void => {
    this.updateItems({
      sorting,
      paging: {
        ...this.props.paging,
        currentPage: 1
      }
    });
  };

  handleUpdateFilter = (filter: TFilter<string>) => {
    let changedFilters = {
      filtering: updateFilter(this.props.filtering, filter),
      paging: {
        ...this.props.paging,
        currentPage: 1
      }
    };
    this.updateItems(changedFilters);
  };

  handleUpdatePaging = (nextPageIndex: number) => {
    let changedFilters = {
      paging: {
        ...this.props.paging,
        currentPage: nextPageIndex + 1
      }
    };
    this.updateItems(changedFilters);
  };

  render() {
    const { data, isPending, paging, ...otherProps } = this.props;
    const newPaging = { ...paging, totalItems: data ? data.total : 0 };
    return (
      //@ts-ignore
      <Table
        {...otherProps}
        updateRow={this.updateItems}
        paging={newPaging}
        items={data.items}
        isPending={isPending}
        updateSorting={this.handleUpdateSorting}
        updatePaging={this.handleUpdatePaging}
        updateFilter={this.handleUpdateFilter}
      />
    );
  }
}

const mapStateToProps = (
  state: RootState,
  props: ITableContainerProps
): ITableContainerStateProps => {
  const selector = props.dataSelector(state);
  const { itemsData, filters, defaults } = selector;
  const { sorting, paging, filtering } = filters;
  return {
    data: itemsData.data,
    isPending: itemsData.isPending,
    sorting,
    paging,
    filtering,
    fetchItems: props.getItems,
    defaults
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch
): ITableContainerDispatchProps => ({
  service: bindActionCreators({ getItems, updateFilters }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);
