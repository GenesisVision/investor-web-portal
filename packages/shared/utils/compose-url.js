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

export const composeProgramDetailsUrl = slugUrl =>
  replaceParams(PROGRAM_DETAILS_ROUTE, {
    [`:${PROGRAM_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeManagerDetailsUrl = slugUrl =>
  replaceParams(MANAGER_DETAILS_ROUTE, {
    [`:${MANAGER_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeFundsDetailsUrl = slugUrl =>
  replaceParams(FUND_DETAILS_ROUTE, {
    [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: slugUrl
  });
