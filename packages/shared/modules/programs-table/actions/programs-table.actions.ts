import { CancelablePromise, ProgramsList } from "gv-api-web";
import programApi from "shared/services/api-client/programs-api";
import { ActionType } from "shared/utils/types";

export const PROGRAMS = "PROGRAMS";

export const fetchProgramsAction = (
  filters: FetchProgramsFiltersType // TODO change api to create interface to this
): ActionType<CancelablePromise<ProgramsList>> => ({
  type: PROGRAMS,
  payload: programApi.v10ProgramsGet(filters)
});

export type FetchProgramsFiltersType = {
  authorization?: string;
  levelMin?: number;
  levelMax?: number;
  levelsSet?: number[];
  profitAvgMin?: number;
  profitAvgMax?: number;
  sorting?: string;
  programCurrency?: string;
  currencySecondary?: string;
  levelUpFrom?: number;
  tags?: string[];
  isSignal?: boolean;
  statisticDateFrom?: Date;
  statisticDateTo?: Date;
  chartPointsCount?: number;
  mask?: string;
  facetId?: string;
  isFavorite?: boolean;
  isEnabled?: boolean;
  hasInvestorsForAll?: boolean;
  hasInvestorsForClosed?: boolean;
  ids?: string[];
  managerId?: string;
  programManagerId?: string;
  status?: string[];
  skip?: number;
  take?: number;
};
