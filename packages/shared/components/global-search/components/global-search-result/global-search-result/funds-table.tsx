import { FundsList } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Table } from "shared/components/table/components";
import FundsTableRow from "shared/modules/funds-table/components/funds-table/fund-table-row";
import { FUNDS_TABLE_COLUMNS } from "shared/modules/funds-table/components/funds-table/funds-table.constants";

import { SearchTableProps } from "./global-search-result";

const FundsTable: React.FC<
  SearchTableProps<FundsList> & InjectedTranslateProps
> = ({ t, title, data }) => {
  return (
    <Table
      columns={FUNDS_TABLE_COLUMNS}
      items={data.funds}
      renderHeader={column => (
        <span className={`funds-table__cell funds-table__cell--${column.name}`}>
          {t(`funds-page.funds-header.${column.name}`)}
        </span>
      )}
      renderBodyRow={fund => <FundsTableRow title={title} fund={fund} />}
    />
  );
};

export default translate()(React.memo(FundsTable));
