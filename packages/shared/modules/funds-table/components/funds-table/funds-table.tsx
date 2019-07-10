import "./funds-table.scss";

import { FundDetails } from "gv-api-web";
import * as React from "react";
import { Table } from "shared/components/table/components";
import { ITableProps } from "shared/components/table/components/table";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";

import FundCard from "./fund-card";
import FundsTableRow from "./fund-table-row";
import FundTableSortingValue from "./fund-table-sorting";
import FundsTableHeaderCell from "./funds-table-header-cell";
import { FUNDS_TABLE_COLUMNS } from "./funds-table.constants";

interface Props extends ITableProps {
  data?: FundDetails[];
  toggleFavorite: TableToggleFavoriteHandlerType;
  isAuthenticated: boolean;
}

const FundsTable: React.FC<Props> = ({
  data,
  sorting,
  updateSorting,
  filtering,
  updateFilter,
  renderFilters,
  paging,
  updatePaging,
  toggleFavorite,
  isAuthenticated,
  title
}) => (
  <Table
    filtering={filtering}
    updateFilter={updateFilter}
    title={title}
    sorting={sorting}
    updateSorting={updateSorting}
    paging={paging}
    updatePaging={updatePaging}
    columns={FUNDS_TABLE_COLUMNS}
    items={data}
    showSwitchView
    renderFilters={renderFilters}
    renderHeader={column => (
      <FundsTableHeaderCell column={column} isAuthenticated={isAuthenticated} />
    )}
    renderSorting={column => (
      <FundTableSortingValue
        column={column}
        isAuthenticated={isAuthenticated}
      />
    )}
    renderBodyRow={fund => (
      <FundsTableRow
        title={title}
        fund={fund}
        toggleFavorite={toggleFavorite}
        isAuthenticated={isAuthenticated}
      />
    )}
    renderBodyCard={fund => (
      <FundCard title={title} fund={fund} toggleFavorite={toggleFavorite} />
    )}
  />
);

export default React.memo(FundsTable);
