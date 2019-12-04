import { SortingColumn } from "components/table/components/filtering/filter.type";
import React from "react";
import { useTranslation } from "react-i18next";

const _PortfolioEventsTableHeaderCell: React.FC<{ column: SortingColumn }> = ({
  column
}) => {
  const [t] = useTranslation();
  return (
    <span
      className={`portfolio-events-all-table__cell portfolio-events-all-table__head-cell--${column.name}`}
    >
      {t(`dashboard-page.portfolio-events.table-header.${column.name}`)}
    </span>
  );
};

const PortfolioEventsTableHeaderCell = React.memo(
  _PortfolioEventsTableHeaderCell
);
export default PortfolioEventsTableHeaderCell;
