export const ACCOUNTS_FAVORITES_TAB_NAME = "favorites";
export const ACCOUNTS_EXPLORE_TAB_NAME = "";
export const ACCOUNT_SLUG_URL_PARAM_NAME = "accountSlugUrl";

export const ACCOUNTS = "trading-accounts";
export const ACCOUNTS_ROUTE = `/${ACCOUNTS}`;
export const ACCOUNT_DETAILS_ROUTE = `${ACCOUNTS_ROUTE}/:${ACCOUNT_SLUG_URL_PARAM_NAME}`;
export const ACCOUNT_DETAILS_FOLDER_ROUTE = `${ACCOUNTS_ROUTE}/[id]`;
export const ACCOUNT_SETTINGS = `settings`;
export const ACCOUNT_SETTINGS_FOLDER_ROUTE = `${ACCOUNTS_ROUTE}/[id]/${ACCOUNT_SETTINGS}`;

export const FACETS = "facets";
export const ACCOUNTS_FACET_ROUTE = `${ACCOUNTS_ROUTE}/${FACETS}/:${ACCOUNT_SLUG_URL_PARAM_NAME}`;
export const ACCOUNTS_FACET_FOLDER_ROUTE = `${ACCOUNTS_ROUTE}/${FACETS}/[id]`;
export const ACCOUNTS_TAB_ROUTE = `${ACCOUNTS_ROUTE}/:tab`;
