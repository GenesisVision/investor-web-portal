import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import React, { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import {
  GetItemsFuncType,
  TableToggleFavoriteType,
  UpdateFilterFunc
} from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { toggleFavoriteFund } from "shared/modules/favorite-asset/services/favorite-fund.service";
import FundsTableModule from "shared/modules/funds-table/components/funds-table/funds-table-module";
import { FUNDS_TABLE_COLUMNS } from "shared/modules/funds-table/components/funds-table/funds-table.constants";

import {
  MANAGER_DEFAULT_FILTERS,
  MANAGER_FILTERING
} from "../manager.constants";
import { fetchManagerFunds } from "../services/manager.service";

interface Props {
  managerId: string;
  title: string;
  isAuthenticated: boolean;
}

const _ManagerFunds: React.FC<Props & InjectedTranslateProps> = ({
  t,
  title,
  isAuthenticated,
  managerId
}) => {
  const getManagerFunds: GetItemsFuncType = useCallback(
    filters => fetchManagerFunds({ ...filters, managerId }),
    [managerId]
  );

  const toggleFavorite: TableToggleFavoriteType = useCallback(
    (asset, updateRow) => () => {
      const isFavorite = asset.personalDetails.isFavorite;
      const newProgram = {
        ...asset,
        personalDetails: { ...asset.personalDetails, isFavorite: !isFavorite }
      };
      updateRow(newProgram);
      toggleFavoriteFund(asset.id, isFavorite).catch(() => {
        updateRow(asset);
      });
    },
    []
  );

  return (
    <FundsTableModule
      disableTitle
      title={title}
      getItems={getManagerFunds}
      defaultFilters={MANAGER_DEFAULT_FILTERS}
      filtering={MANAGER_FILTERING}
      paging={DEFAULT_PAGING}
      columns={FUNDS_TABLE_COLUMNS}
      renderFilters={(
        updateFilter: UpdateFilterFunc,
        filtering: FilteringType
      ) => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.program-start")}
        />
      )}
      toggleFavorite={toggleFavorite}
      isAuthenticated={isAuthenticated}
    />
  );
};

const ManagerFunds = React.memo(translate()(_ManagerFunds));
export default ManagerFunds;
