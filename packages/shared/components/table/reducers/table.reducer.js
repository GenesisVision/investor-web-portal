import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";
import clearableReducer from "shared/reducers/clearable.reducer";

import tableFiltersReducer from "./table-filters.reducer";

const tableReducerFactory = ({
  type,
  paging,
  sorting = undefined,
  filtering,
  defaultFilters,
  clearable = false,
  clearableActionType
}) => {
  const clearableWrapper = clearable ? clearableReducer : f => f;

  return clearableWrapper(
    combineReducers({
      itemsData: apiReducerFactory({
        apiType: type
      }),
      filters: tableFiltersReducer({
        type,
        filters: {
          paging,
          sorting,
          filtering
        }
      }),
      defaults: () => ({
        defaultFilters,
        type
      })
    }),
    clearableActionType
  );
};

export default tableReducerFactory;
