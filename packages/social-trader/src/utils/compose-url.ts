import {
  FOLLOW_NOTIFICATIONS_FOLDER_ROUTE,
  FOLLOW_NOTIFICATIONS_ROUTE,
  FUND_NOTIFICATIONS_FOLDER_ROUTE,
  FUND_NOTIFICATIONS_ROUTE,
  PROGRAM_NOTIFICATIONS_FOLDER_ROUTE,
  PROGRAM_NOTIFICATIONS_ROUTE
} from "components/notifications/notifications.routes";
import { ASSETS_TYPES } from "components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { SLUG_URL_PARAM_NAME } from "routes/app.routes";
import {
  FUND_DETAILS_FOLDER_ROUTE,
  FUND_DETAILS_ROUTE,
  FUND_SETTINGS,
  FUNDS_FACET_ROUTE,
  FUNDS_SLUG_URL_PARAM_NAME
} from "routes/funds.routes";
import {
  FOLLOW_DETAILS_SLUG_ROUTE,
  FOLLOW_FACET_ROUTE,
  FOLLOW_SETTINGS_FOLDER_ROUTE,
  FUND_SETTINGS_FOLDER_ROUTE,
  PROGRAM_SETTINGS_FOLDER_ROUTE,
  SETTINGS
} from "routes/invest.routes";
import {
  MANAGER_DETAILS_ROUTE,
  MANAGER_SLUG_URL_PARAM_NAME
} from "routes/manager.routes";
import {
  PROGRAM_DETAILS_FOLDER_ROUTE,
  PROGRAM_DETAILS_ROUTE,
  PROGRAM_SETTINGS,
  PROGRAM_SLUG_URL_PARAM_NAME,
  PROGRAMS_FACET_ROUTE
} from "routes/programs.routes";
import { ASSET } from "shared/constants/constants";
import replaceParams from "shared/utils/replace-params";

import { ToType } from "../components/link/link";

export const composeUrl = (route: string, slugParamName: string) => (
  slugUrl: string
) =>
  replaceParams(route, {
    [slugParamName]: slugUrl
  });

export const composeAssetDetailsFolderUrl = (assetType: ASSETS_TYPES): string =>
  assetType === ASSETS_TYPES.Program
    ? PROGRAM_DETAILS_FOLDER_ROUTE
    : FUND_DETAILS_FOLDER_ROUTE;

export const composeAssetDetailsUrl = (
  assetType: string,
  slugUrl: string
): string =>
  assetType === ASSETS_TYPES.Program
    ? composeProgramDetailsUrl(slugUrl)
    : composeFundsDetailsUrl(slugUrl);

export const composeFollowDetailsUrl = (slugUrl: string): string =>
  replaceParams(FOLLOW_DETAILS_SLUG_ROUTE, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
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

export const composeProgramNotificationsUrl = (slugUrl: string): string =>
  replaceParams(PROGRAM_NOTIFICATIONS_ROUTE, {
    ":id": slugUrl
  });

export const composeProgramSettingsUrl = (slugUrl: string): string =>
  replaceParams(`${PROGRAM_DETAILS_ROUTE}/${PROGRAM_SETTINGS}`, {
    [`:${PROGRAM_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeFollowNotificationsUrl = (slugUrl: string): string =>
  replaceParams(FOLLOW_NOTIFICATIONS_ROUTE, {
    ":id": slugUrl
  });

export const composeFollowSettingsUrl = (slugUrl: string): string =>
  replaceParams(`${FOLLOW_DETAILS_SLUG_ROUTE}/${SETTINGS}`, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeAssetNotificationsUrl = (
  slugUrl: string,
  asset: ASSET
): string =>
  replaceParams(
    asset === ASSET.PROGRAM
      ? PROGRAM_NOTIFICATIONS_ROUTE
      : FUND_NOTIFICATIONS_ROUTE,
    {
      ":id": slugUrl
    }
  );

export const composeFundNotificationsUrl = (slugUrl: string): string =>
  replaceParams(FUND_NOTIFICATIONS_ROUTE, {
    ":id": slugUrl
  });

export const composeFundSettingsUrl = (slugUrl: string): string =>
  replaceParams(`${FUND_DETAILS_ROUTE}/${FUND_SETTINGS}`, {
    [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeFollowFacetUrl = (slugUrl: string): string =>
  replaceParams(FOLLOW_FACET_ROUTE, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeProgramFacetUrl = (slugUrl: string): string =>
  replaceParams(PROGRAMS_FACET_ROUTE, {
    [`:${PROGRAM_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeFundFacetUrl = (slugUrl: string): string =>
  replaceParams(FUNDS_FACET_ROUTE, {
    [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const createFollowSettingsToUrl = (url: string, title: string): ToType =>
  createToUrl(
    composeFollowSettingsUrl(url),
    FOLLOW_SETTINGS_FOLDER_ROUTE,
    title
  );

export const createFundSettingsToUrl = (url: string, title: string): ToType =>
  createToUrl(composeFundSettingsUrl(url), FUND_SETTINGS_FOLDER_ROUTE, title);

export const createProgramSettingsToUrl = (
  url: string,
  title: string
): ToType =>
  createToUrl(
    composeProgramSettingsUrl(url),
    PROGRAM_SETTINGS_FOLDER_ROUTE,
    title
  );

export const createFollowNotificationsToUrl = (
  url: string,
  title: string
): ToType =>
  createToUrl(
    composeFollowNotificationsUrl(url),
    FOLLOW_NOTIFICATIONS_FOLDER_ROUTE,
    title
  );

export const createFundNotificationsToUrl = (
  url: string,
  title: string
): ToType =>
  createToUrl(
    composeFundNotificationsUrl(url),
    FUND_NOTIFICATIONS_FOLDER_ROUTE,
    title
  );

export const createProgramNotificationsToUrl = (
  url: string,
  title: string
): ToType =>
  createToUrl(
    composeProgramNotificationsUrl(url),
    PROGRAM_NOTIFICATIONS_FOLDER_ROUTE,
    title
  );

export const createToUrl = (
  as: string,
  pathname: string,
  state: string
): ToType => ({
  as,
  pathname,
  state: `/ ${state}`
});
