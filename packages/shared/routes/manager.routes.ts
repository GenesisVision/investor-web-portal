import { SLUG_URL_REGEXP } from "shared/utils/constants";

export const MANAGER_SLUG_URL_PARAM_NAME = "managerSlugUrl";

export const MANAGERS_ROUTE = "/managers";
export const MANAGER_DETAILS_ROUTE = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}`;
export const MANAGER_DETAILS_ROUTE_REGEXP = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;
