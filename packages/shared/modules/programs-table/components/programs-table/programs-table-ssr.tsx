import { ProgramsList, ProgramTag } from "gv-api-web";
import { useRouter } from "next/router";
import qs from "qs";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose, Dispatch } from "redux";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import LevelFilter from "shared/components/table/components/filtering/level-filter/level-filter";
import { LevelFilterType } from "shared/components/table/components/filtering/level-filter/level-filter.constants";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TagFilter from "shared/components/table/components/filtering/tag-filter/tag-filter";
import {
  TAG_FILTER_DEFAULT_VALUE,
  TAG_FILTER_NAME
} from "shared/components/table/components/filtering/tag-filter/tag-filter.constants";
import { composeFilters } from "shared/components/table/helpers/filtering.helpers";
import {
  calculateSkipAndTake,
  calculateTotalPages
} from "shared/components/table/helpers/paging.helpers";
import { useTranslation } from "shared/i18n";
import { ToggleFavoriteDispatchableType } from "shared/modules/favorite-asset/services/favorite-fund.service";
import { toggleFavoriteProgramDispatchable } from "shared/modules/favorite-asset/services/favorite-program.service";
import {
  PROGRAMS_TABLE_FILTERS,
  SORTING_FILTER_NAME,
  SORTING_FILTER_VALUE
} from "shared/modules/programs-table/components/programs-table/programs.constants";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import {
  programCurrenciesSelector,
  programTagsSelector
} from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { LOGIN_ROUTE } from "shared/routes/app.routes";
import { PROGRAMS_ROUTE } from "shared/routes/programs.routes";

import useRouteFilters from "../../../../hooks/route-filters.hook";
import { NextPageWithReduxContext } from "../../../../utils/types";
import { DEFAULT_ITEMS_ON_PAGE } from "../../../funds-table/components/funds-table/funds-table.constants";
import { FetchProgramsFiltersType } from "../../actions/programs-table.actions";
import { programsDataSelector } from "../../reducers/programs-table.reducers";
import { composeCurrencyFilter } from "./program-table.helpers";
import ProgramsTable from "./programs-table";
import {
  CURRENCY_FILTER_NAME,
  CURRENCY_FILTER_VALUE,
  LEVEL_FILTER_NAME,
  LEVEL_MAX_FILTER_VALUE,
  LEVEL_MIN_FILTER_VALUE
} from "./programs.constants";

const ITEMS_ON_PAGE = 12;

const DEFAULT_FILTERS = {
  [DATE_RANGE_FILTER_NAME]: DEFAULT_DATE_RANGE_FILTER_VALUE,
  [TAG_FILTER_NAME]: TAG_FILTER_DEFAULT_VALUE,
  [LEVEL_FILTER_NAME]: [LEVEL_MIN_FILTER_VALUE, LEVEL_MAX_FILTER_VALUE],
  [CURRENCY_FILTER_NAME]: CURRENCY_FILTER_VALUE
};

export const getFiltersFromContext = ({
  asPath = "",
  pathname,
  reduxStore
}: NextPageWithReduxContext): FetchProgramsFiltersType => {
  const { page, sorting = SORTING_FILTER_VALUE, ...other } = qs.parse(
    asPath.slice(pathname.length + 1)
  );
  const { currency } = reduxStore.getState().accountSettings;
  const skipAndTake = calculateSkipAndTake({
    itemsOnPage: DEFAULT_ITEMS_ON_PAGE,
    currentPage: page
  });
  return {
    ...skipAndTake,
    ...composeFilters(PROGRAMS_TABLE_FILTERS, { ...DEFAULT_FILTERS, ...other }),
    currencySecondary: currency,
    sorting
  } as FetchProgramsFiltersType;
};

const _ProgramsTableSSR: React.FC<Props> = ({
  title,
  data,
  showSwitchView,
  isAuthenticated,
  programTags,
  currencies,
  service
}) => {
  const { t } = useTranslation();

  const [filtering, sorting, page, update] = useRouteFilters(DEFAULT_FILTERS);

  const { push } = useRouter();
  if (!data) return null;
  const totalPages = calculateTotalPages(data.total, ITEMS_ON_PAGE);
  return (
    <ProgramsTable
      showSwitchView={showSwitchView}
      title={title}
      data={data.programs}
      sorting={sorting || SORTING_FILTER_VALUE}
      updateSorting={value => update({ name: SORTING_FILTER_NAME, value })}
      filtering={filtering}
      updateFilter={update}
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
            name={CURRENCY_FILTER_NAME}
            label="Currency"
            value={filtering[CURRENCY_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
            values={composeCurrencyFilter(currencies)}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
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
      toggleFavorite={service.toggleFavoriteProgram}
      redirectToLogin={() => push(LOGIN_ROUTE)}
      isAuthenticated={isAuthenticated}
      currencies={currencies}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  isAuthenticated: isAuthenticatedSelector(state),
  currencies: programCurrenciesSelector(state),
  programTags: programTagsSelector(state),
  data: programsDataSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      toggleFavoriteProgram: toggleFavoriteProgramDispatchable
    },
    dispatch
  )
});

const ProgramsTableSSR = compose<React.FC<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(_ProgramsTableSSR);

export default ProgramsTableSSR;

interface OwnProps {
  showSwitchView: boolean;
  title: string;
}

interface StateProps {
  isAuthenticated: boolean;
  currencies: string[];
  programTags: ProgramTag[];
  data?: ProgramsList;
}

interface DispatchProps {
  service: {
    toggleFavoriteProgram: ToggleFavoriteDispatchableType;
  };
}

interface Props extends OwnProps, StateProps, DispatchProps {}
