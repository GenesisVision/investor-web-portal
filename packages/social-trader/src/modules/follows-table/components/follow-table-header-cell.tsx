import classNames from "classnames";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { SortingColumn } from "components/table/components/filtering/filter.type";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import styles from "modules/programs-table/components/programs-table/programs-table.module.scss";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

const _FollowTableHeaderCell: React.FC<{ column: SortingColumn }> = ({
  column
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { t } = useTranslation();
  if (!isAuthenticated && column.name === "favorite") return null;
  const renderCell = () => (
    <span
      className={classNames(
        styles["programs-table__cell"],
        styles[`programs-table__cell--${column.name}`]
      )}
    >
      {t(`header-fields.${column.name}`)}
    </span>
  );
  return column.tooltip ? (
    <Tooltip
      horizontal={HORIZONTAL_POPOVER_POS.LEFT}
      render={() => (
        <TooltipContent>
          {t(`follows-page.tooltips.${column.name}`)}
        </TooltipContent>
      )}
    >
      {renderCell()}
    </Tooltip>
  ) : (
    renderCell()
  );
};

const FollowTableHeaderCell = React.memo(_FollowTableHeaderCell);
export default FollowTableHeaderCell;
