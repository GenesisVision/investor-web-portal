import { ActionType } from "shared/utils/types";

import { CLEAR_SUFFIX } from "../../actions/clear-data.factory";

export const API_TYPE = "API";
export const REQUEST_SUFFIX = "REQUEST";
export const SUCCESS_SUFFIX = "SUCCESS";
export const FAILURE_SUFFIX = "FAILURE";

export interface IApiState<T>
  extends Readonly<{
    isPending: boolean;
    errorMessage: string;
    code: null;
    data?: T;
  }> {}

const initialState: IApiState<any> = {
  isPending: false,
  errorMessage: "",
  code: null
};

interface IReducerFactoryConfig {
  apiType: string;
  suffixes?: Array<string>;
}

const apiReducerFactory = <T>(
  config: IReducerFactoryConfig = {
    apiType: API_TYPE,
    suffixes: [REQUEST_SUFFIX, SUCCESS_SUFFIX, FAILURE_SUFFIX]
  },
  subReducer?: any
) => (state = initialState, action: ActionType): IApiState<T> => {
  const apiType = config.apiType || API_TYPE;
  const suffixes = config.suffixes || [
    REQUEST_SUFFIX,
    SUCCESS_SUFFIX,
    FAILURE_SUFFIX,
    CLEAR_SUFFIX
  ];
  const [REQUEST, SUCCESS, FAILURE, CLEAR] = suffixes.map(
    x => `${apiType}_${x}`
  );

  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        isPending: true
      };
    case SUCCESS:
      return {
        ...state,
        isPending: false,
        data: action.payload,
        errorMessage: "",
        code: null
      };
    case FAILURE:
      return {
        ...state,
        isPending: false,
        ...action.payload
      };
    case CLEAR:
      return initialState;
    default:
      if (subReducer) {
        return subReducer(state, action);
      }
      return state;
  }
};

export default apiReducerFactory;
