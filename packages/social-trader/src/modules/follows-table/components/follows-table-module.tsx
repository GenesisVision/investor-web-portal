import TableModule, {
  ITableModuleProps
} from "components/table/components/table-module";
import * as React from "react";

import FollowTableHeaderCell from "./follow-table-header-cell";
import FollowTableRow from "./follow-table-row-short";
import { followListLoaderData } from "./follow-table.loader-data";
import { FAVORITE_COLUMN_NAME } from "./follows-table";
import { FOLLOW_COLUMNS } from "./follows.constants";

const FollowsTableModule: React.FC<Props> = React.memo(
  ({
    renderMappings,
    getItems,
    renderFilters,
    sorting,
    filtering,
    defaultFilters,
    paging,
    isAuthenticated,
    showRating,
    title,
    disableTitle,
    columns
  }) => {
    return (
      <TableModule
        loaderData={followListLoaderData}
        renderMappings={renderMappings}
        disableTitle={disableTitle}
        getItems={getItems}
        defaultFilters={defaultFilters}
        filtering={filtering}
        sorting={sorting}
        renderFilters={renderFilters}
        paging={paging}
        title={title}
        columns={columns || FOLLOW_COLUMNS}
        renderHeader={column => (
          <FollowTableHeaderCell
            condition={
              !isAuthenticated ||
              (isAuthenticated && column.name !== FAVORITE_COLUMN_NAME)
            }
            column={column}
          />
        )}
        renderBodyRow={(
          follow,
          updateRow: any //TODO fix updateRow
        ) => (
          <FollowTableRow
            updateRow={updateRow}
            showRating={showRating}
            title={title}
            follow={follow}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
    );
  }
);

interface Props extends ITableModuleProps {
  isAuthenticated?: boolean;
  showRating?: boolean;
  title: string;
}

export default FollowsTableModule;
