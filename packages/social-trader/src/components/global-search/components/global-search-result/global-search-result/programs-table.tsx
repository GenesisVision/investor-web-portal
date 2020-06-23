import classNames from "classnames";
import { Table } from "components/table/components";
import { ProgramDetailsListItemItemsViewModel } from "gv-api-web";
import ProgramTableRowShort from "modules/programs-table/components/programs-table/program-table-row-short";
import styles from "modules/programs-table/components/programs-table/programs-table.module.scss";
import { PROGRAMS_COLUMNS } from "modules/programs-table/components/programs-table/programs.constants";
import React from "react";
import { useTranslation } from "react-i18next";

import { SearchTableProps } from "./global-search-result";

const ProgramsTable: React.FC<SearchTableProps<
  ProgramDetailsListItemItemsViewModel
>> = ({ data }) => {
  const [t] = useTranslation();
  return (
    <Table
      columns={PROGRAMS_COLUMNS}
      items={data.items}
      renderHeader={column => (
        <span
          className={classNames(
            styles["programs-table__cell"],
            styles[`programs-table__cell--${column.name}`]
          )}
        >
          {t(`header-fields.${column.name}`)}
        </span>
      )}
      renderBodyRow={program => <ProgramTableRowShort program={program} />}
    />
  );
};

export default React.memo(ProgramsTable);
