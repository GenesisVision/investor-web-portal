import * as React from "react";
import { CardsIcon } from "shared/components/icon/cards-icon";
import { TableIcon } from "shared/components/icon/table-icon";
import SortingFilter from "shared/components/table/components/sorting/sorting-filter/sorting-filter";

import { LIST_VIEW } from "../table.constants";
import { IFiltering, SortingColumn } from "./filtering/filter.type";
import { IUpdateFilterFunc, RenderFiltersFuncType } from "./table.types";

interface OwnProps {
  view: LIST_VIEW;
  isViewSwitchEnabled: boolean;
  onChange(view: LIST_VIEW): void;
}

export interface ITableToolbarBaseProps<TFiltering> {
  disableTitle?: boolean;
  createButtonToolbar?: JSX.Element;
  renderFilters?: RenderFiltersFuncType<TFiltering>;
  columns: SortingColumn[];
}
export interface ITableToolbarProps<TFiltering>
  extends ITableToolbarBaseProps<TFiltering> {
  title?: JSX.Element | string;
  updateFilter?: IUpdateFilterFunc;
  filtering?: IFiltering<TFiltering>;
  sorting?: string;
  updateSorting?(opt: string): ((dispatch: any, getState: any) => void) | void;
  renderSorting?(value: SortingColumn): JSX.Element | string;
}

class TableToolbar<TFiltering> extends React.PureComponent<
  ITableToolbarProps<TFiltering> & OwnProps
> {
  handleIconClick = (view: LIST_VIEW) => () => {
    this.props.onChange(view);
  };

  render() {
    const {
      disableTitle,
      createButtonToolbar,
      title,
      renderFilters,
      updateFilter,
      filtering,
      view,
      columns,
      sorting,
      updateSorting,
      renderSorting,
      isViewSwitchEnabled
    } = this.props;
    return (
      <div className="table__toolbar">
        {title && !disableTitle && <h3 className="table__title">{title}</h3>}
        <div className="table__filters">
          {view === LIST_VIEW.CARDS && sorting !== undefined && (
            <SortingFilter
              sorting={sorting}
              columns={columns}
              updateSorting={updateSorting}
              renderValueText={renderSorting}
            />
          )}
          {renderFilters &&
            updateFilter &&
            filtering &&
            renderFilters(updateFilter, filtering)}
          {createButtonToolbar}
        </div>
        {isViewSwitchEnabled && (
          <div className="table__toggle">
            <div
              className="table__toggle-icon"
              onClick={this.handleIconClick(LIST_VIEW.CARDS)}
            >
              <CardsIcon primary={view === LIST_VIEW.CARDS} />
            </div>
            <div
              className="table__toggle-icon"
              onClick={this.handleIconClick(LIST_VIEW.TABLE)}
            >
              <TableIcon primary={view === LIST_VIEW.TABLE} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TableToolbar;
