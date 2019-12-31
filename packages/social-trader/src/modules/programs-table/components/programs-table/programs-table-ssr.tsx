import { Push } from "components/link/link";
import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "components/table/components/filtering/filter.type";
import LevelFilter from "components/table/components/filtering/level-filter/level-filter";
import { LevelFilterType } from "components/table/components/filtering/level-filter/level-filter.constants";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "components/table/components/filtering/select-filter/select-filter.constants";
import TagFilter from "components/table/components/filtering/tag-filter/tag-filter";
import { TAG_FILTER_NAME } from "components/table/components/filtering/tag-filter/tag-filter.constants";
import { calculateTotalPages } from "components/table/helpers/paging.helpers";
import useRouteFilters from "hooks/route-filters.hook";
import { useTranslation } from "i18n";
import {
  CURRENCY_MAP_NAME,
  DEFAULT_PROGRAM_TABLE_FILTERS,
  SORTING_FILTER_NAME,
  SORTING_FILTER_VALUE
} from "modules/programs-table/components/programs-table/programs.constants";
import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import {
  platformCurrenciesSelector,
  programCurrenciesSelector,
  programTagsSelector
} from "reducers/platform-reducer";
import { LOGIN_ROUTE } from "routes/app.routes";

import { programsDataSelector } from "../../reducers/programs-table.reducers";
import {
  composeCurrencyFilter,
  composeCurrencyMap
} from "./program-table.helpers";
import ProgramsTable from "./programs-table";
import {
  LEVEL_FILTER_NAME,
  PROGRAM_CURRENCY_FILTER_NAME
} from "./programs.constants";

const ITEMS_ON_PAGE = 12;

const _ProgramsTableSSR: React.FC<Props> = ({ title, showSwitchView }) => {
  const programCurrencies = useSelector(programCurrenciesSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const currencies = useSelector(platformCurrenciesSelector);
  const programTags = useSelector(programTagsSelector);
  const data = useSelector(programsDataSelector);
  const { t } = useTranslation();

  const [filtering, sorting, page, update] = useRouteFilters(
    DEFAULT_PROGRAM_TABLE_FILTERS
  );

  if (!data) return null;
  const totalPages = calculateTotalPages(data.total, ITEMS_ON_PAGE);
  return (
    <ProgramsTable
      showSwitchView={showSwitchView}
      title={title}
      data={data.items}
      sorting={sorting || SORTING_FILTER_VALUE}
      updateSorting={value => update({ name: SORTING_FILTER_NAME, value })}
      filtering={filtering}
      updateFilter={update}
      renderMappings={(updateFilter, filtering) => (
        <>
          <SelectFilter
            name={CURRENCY_MAP_NAME}
            label={t("filters.currency.show-in")}
            value={filtering && filtering[CURRENCY_MAP_NAME]}
            values={composeCurrencyMap(currencies)}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering && filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            label={t("filters.date-range.for")}
            startLabel={t("filters.date-range.fund-start")}
          />
        </>
      )}
      renderFilters={(updateFilter, filtering: FilteringType) => (
        <>
          <TagFilter
            name={TAG_FILTER_NAME}
            value={filtering[TAG_FILTER_NAME] as string[]}
            values={programTags}
            onChange={updateFilter}
          />
          <LevelFilter
            name={LEVEL_FILTER_NAME}
            value={filtering[LEVEL_FILTER_NAME] as LevelFilterType} //TODO fix filtering types
            onChange={updateFilter}
          />
          <SelectFilter
            name={PROGRAM_CURRENCY_FILTER_NAME}
            label="Currency"
            value={filtering[PROGRAM_CURRENCY_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
            values={composeCurrencyFilter(programCurrencies)}
            onChange={updateFilter}
          />
        </>
      )}
      paging={{
        totalPages: totalPages,
        currentPage: page,
        itemsOnPage: ITEMS_ON_PAGE,
        totalItems: data.total
      }}
      updatePaging={page => update({ name: "page", value: page + 1 })}
      redirectToLogin={() => Push(LOGIN_ROUTE)}
      isAuthenticated={isAuthenticated}
      currencies={programCurrencies}
    />
  );
};

interface Props {
  showSwitchView: boolean;
  title: string;
}

const ProgramsTableSSR = React.memo(_ProgramsTableSSR);
export default ProgramsTableSSR;
