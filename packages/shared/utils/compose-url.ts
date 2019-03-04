import replaceParams from "./replace-params";

export const PROGRAM_SLUG_URL_PARAM_NAME = "programSlugUrl";
export const PROGRAMS_ROUTE = "/programs";
export const PROGRAM_DETAILS_ROUTE = `${PROGRAMS_ROUTE}/:${PROGRAM_SLUG_URL_PARAM_NAME}`;
export const MANAGER_SLUG_URL_PARAM_NAME = "managerSlugUrl";
export const MANAGERS_ROUTE = "/managers";
export const MANAGER_DETAILS_ROUTE = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}`;
export const FUNDS_SLUG_URL_PARAM_NAME = "fundsSlugUrl";
export const FUNDS_ROUTE = "/funds";
export const FUND_DETAILS_ROUTE = `${FUNDS_ROUTE}/:${FUNDS_SLUG_URL_PARAM_NAME}`;
export const NOTIFICATIONS_ROUTE = "/notifications";
export const PROGRAM_NOTIFICATIONS_ROUTE = `${NOTIFICATIONS_ROUTE}/program/:id`;
export const FUND_NOTIFICATIONS_ROUTE = `${NOTIFICATIONS_ROUTE}/fund/:id`;
export const PROGRAMS_FACET_ROUTE = `${PROGRAMS_ROUTE}/facets/:${PROGRAM_SLUG_URL_PARAM_NAME}`;
export const FUNDS_FACET_ROUTE = `${FUNDS_ROUTE}/facets/:${FUNDS_SLUG_URL_PARAM_NAME}`;

export const composeUrl = (route, slugParamName) => slugUrl =>
  replaceParams(route, {
    [`:${slugParamName}`]: slugUrl
  });

export const composeProgramDetailsUrl = (slugUrl: string): string =>
  replaceParams(PROGRAM_DETAILS_ROUTE, {
    [`:${PROGRAM_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeManagerDetailsUrl = (slugUrl: string): string =>
  replaceParams(MANAGER_DETAILS_ROUTE, {
    [`:${MANAGER_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeFundsDetailsUrl = (slugUrl: string): string =>
  replaceParams(FUND_DETAILS_ROUTE, {
    [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeProgramNotificationsUrl = (url: string): string =>
  replaceParams(PROGRAM_NOTIFICATIONS_ROUTE, {
    ":id": url
  });

export const composeFundNotificationsUrl = (url: string): string =>
  replaceParams(FUND_NOTIFICATIONS_ROUTE, {
    ":id": url
  });

export const composeProgramFacetUrl = (url: string): string =>
  replaceParams(PROGRAMS_FACET_ROUTE, {
    [`:${PROGRAM_SLUG_URL_PARAM_NAME}`]: url
  });

export const composeFundFacetUrl = (url: string): string =>
  replaceParams(FUNDS_FACET_ROUTE, {
    [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: url
  });
