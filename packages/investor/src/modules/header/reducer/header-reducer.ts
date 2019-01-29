import { ProfileHeaderViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import { PROFILE_HEADER } from "shared/components/header/header.constants";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";
import { IApiReducerFactory } from "shared/reducers/api-reducer/api-reducer";

export interface IHeaderReducer {
  info: IApiReducerFactory<ProfileHeaderViewModel>;
}

const headerReducer = combineReducers<IHeaderReducer>({
  info: apiReducerFactory<ProfileHeaderViewModel>({
    apiType: PROFILE_HEADER
  })
});

export default headerReducer;
