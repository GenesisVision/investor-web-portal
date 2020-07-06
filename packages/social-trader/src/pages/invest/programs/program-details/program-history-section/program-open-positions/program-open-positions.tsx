import clsx from "clsx";
import styles from "components/details/details-description-section/details-statistic-section/details-history/trades.module.scss";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { TRADE_ASSET_TYPE } from "constants/constants";
import {
  getOpenPositionsColumns,
  OpenPositionsColumnsEmptyObject
} from "pages/invest/programs/program-details/program-history-section/program-open-positions/program-open-positions.helpers";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { CurrencyEnum } from "utils/types";

import { TradesDelayHint } from "../trades-delay-hint";
import ProgramOpenPositionsRow from "./program-open-positions-row";

const _ProgramOpenPositions: React.FC<Props> = ({
  assetType,
  canCloseOpenPositions,
  itemSelector,
  getItems,
  dataSelector,
  currency,
  programId
}) => {
  const [t] = useTranslation();
  const openPositions = useSelector(itemSelector);
  const {
    itemsData: { data }
  } = openPositions;
  const delay = data ? data.tradesDelay : "None";

  const renderCell = useCallback(
    (name: string) => (
      <span
        className={clsx(
          styles["details-trades__head-cell"],
          styles[`program-details-trades__cell--${name}`]
        )}
      >
        {t(`program-details-page:history.open-positions.${name}`)}
      </span>
    ),
    []
  );

  const exportButtonToolbarRender = useCallback(
    () => <TradesDelayHint delay={delay} />,
    [delay]
  );

  const tooltipRender = useCallback(
    (name: string) => () => (
      <TooltipContent>
        {t(`program-details-page:history.open-positions.tooltips.${name}`)}
      </TooltipContent>
    ),
    []
  );

  const renderHeader = useCallback(
    column =>
      column.tooltip ? (
        <Tooltip
          horizontal={HORIZONTAL_POPOVER_POS.LEFT}
          render={tooltipRender(column.name)}
        >
          {renderCell(column.name)}
        </Tooltip>
      ) : (
        renderCell(column.name)
      ),
    []
  );
  const renderBodyRow = useCallback(
    (position, _, updateItems) => (
      <ProgramOpenPositionsRow
        programId={programId}
        assetType={assetType}
        canCloseOpenPositions={canCloseOpenPositions}
        updateItems={updateItems}
        data={data!}
        position={position}
        currency={currency}
      />
    ),
    [data, programId, assetType, canCloseOpenPositions, currency]
  );

  const { showDate, showDirection, showPrice, showPriceOpen, showProfit } =
    data || OpenPositionsColumnsEmptyObject;

  const columns = useMemo(
    () =>
      getOpenPositionsColumns({
        showDate,
        showDirection,
        showPrice,
        showPriceOpen,
        showProfit
      }),
    [showDate, showDirection, showPrice, showPriceOpen, showProfit]
  );

  if (!programId) return null;

  return (
    <TableContainer
      exportButtonToolbarRender={exportButtonToolbarRender}
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      columns={columns}
      renderHeader={renderHeader}
      renderBodyRow={renderBodyRow}
    />
  );
};

interface Props {
  assetType: TRADE_ASSET_TYPE;
  canCloseOpenPositions?: boolean;
  getItems: GetItemsFuncActionType;
  itemSelector: (state: RootState) => { [keys: string]: any };
  dataSelector: TableSelectorType;
  currency: CurrencyEnum;
  programId: string;
}

const ProgramOpenPositions = React.memo(_ProgramOpenPositions);
export default ProgramOpenPositions;
