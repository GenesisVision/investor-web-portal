import { CancelablePromise, LevelUpSummary } from "gv-api-web";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";

import {
  IProgramsGetFilters,
  fetchLevelUpSummary,
  fetchProgramsRating,
  fetchSelfProgramsRating
} from "../actions/programs-rating.actions";

export type TGetProgramsRatingFilters = IProgramsGetFilters & {
  tab: string;
  itemsOnPage: number;
  currentPage: number;
};

export const getProgramsRating = (filters: TGetProgramsRatingFilters) => (
  dispatch: MiddlewareDispatch
): CancelablePromise<number> => {
  const { tab, managerId, itemsOnPage, currentPage } = filters;
  const requestFilters = {
    managerId,
    levelUpFrom: +tab,
    take: itemsOnPage,
    skip: itemsOnPage * (currentPage - 1)
  };
  return dispatch(
    managerId
      ? fetchSelfProgramsRating(requestFilters)
      : fetchProgramsRating(requestFilters)
  ).then(res => res.value.total);
};

export const getLevelUpSummary = () => (
  dispatch: MiddlewareDispatch
): CancelablePromise<LevelUpSummary> => {
  const authorization = authService.getAuthArg();
  return dispatch(fetchLevelUpSummary({ authorization })).then(
    res => res.value
  );
};
