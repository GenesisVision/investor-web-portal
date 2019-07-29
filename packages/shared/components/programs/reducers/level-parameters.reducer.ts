import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { apiSelector } from "shared/utils/selectors";

import { FETCH_PROGRAM_DESCRIPTION } from "../actions/program-details.actions";

export type LevelParametersDataType = LevelsParamsInfo;

export type LevelParametersState = IApiState<LevelParametersDataType>;

export const levelParametersSelector = apiSelector<
  LevelParametersDataType,
  RootState
>(state => state.programDetails.levelParameters);

const levelParametersReducer = apiReducerFactory<LevelParametersDataType>({
  apiType: FETCH_PROGRAM_DESCRIPTION
});

export default levelParametersReducer;
