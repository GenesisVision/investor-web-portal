import {
  ACTION_STATUS_FILTER_NAME,
  ACTION_STATUS_FILTER_VALUES
} from "components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import { DataStorageContext } from "components/data-storage/data-storage";
import { FilteringType } from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "components/table/components/filtering/select-filter/select-filter.constants";
import TableModule from "components/table/components/table-module";
import {
  GetItemsFuncType,
  RenderBodyItemFuncType,
  UpdateFilterFunc
} from "components/table/components/table.types";
import { LIST_VIEW } from "components/table/table.constants";
import { useAccountCurrency } from "hooks/account-currency.hook";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const _DashboardInvestingTable: React.FC<Props> = ({
  getItemsFunc,
  title,
  renderBodyCard
}) => {
  const { data } = useContext(DataStorageContext);
  const [timestamp, setTimestamp] = useState<number | undefined>();
  const [updateData, setUpdateData] = useState<any[]>([]);
  const [t] = useTranslation();
  const showIn = useAccountCurrency();

  const getItems = useCallback(
    filters => {
      return getItemsFunc({
        ...filters,
        showIn
      });
    },
    [showIn]
  );

  useEffect(() => {
    if (data) setUpdateData([...updateData, data]);
  }, [data]);

  useEffect(() => {
    if (updateData.length > 1) setTimestamp(+new Date());
  }, [updateData]);

  return (
    <DashboardBlock>
      <TableModule
        timestamp={timestamp}
        renderFilters={(
          updateFilter: UpdateFilterFunc,
          filtering: FilteringType
        ) => (
          <SelectFilter
            name={ACTION_STATUS_FILTER_NAME}
            label={t(`dashboard-page:actions-status-filter.label`)}
            value={filtering[ACTION_STATUS_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
            values={ACTION_STATUS_FILTER_VALUES}
            onChange={updateFilter}
          />
        )}
        title={title}
        loaderData={[]}
        getItems={getItems}
        outerView={LIST_VIEW.CARDS}
        showSwitchView={false}
        renderBodyCard={renderBodyCard}
      />
    </DashboardBlock>
  );
};

interface Props {
  getItemsFunc: GetItemsFuncType;
  title: string;
  renderBodyCard?: RenderBodyItemFuncType;
}

const DashboardInvestingTable = React.memo(_DashboardInvestingTable);
export default DashboardInvestingTable;
