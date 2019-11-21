import { LevelsParamsInfo } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";

import { FETCH_LEVEL_PARAMETERS } from "../program-details.constants";

export type LevelParametersDataType = LevelsParamsInfo;

export type LevelParametersState = IApiState<LevelParametersDataType>;

export const levelParametersSelector = apiSelector<
  LevelParametersDataType,
  RootState
>(state => state.programDetails.levelParameters);

const levelParametersReducer = apiReducerFactory<LevelParametersDataType>({
  apiType: FETCH_LEVEL_PARAMETERS
});

export default levelParametersReducer;
