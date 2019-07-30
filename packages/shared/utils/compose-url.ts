import {
  FUND_NOTIFICATIONS_ROUTE,
  PROGRAM_NOTIFICATIONS_ROUTE
} from "shared/components/notifications/notifications.routes";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { ASSET } from "shared/constants/constants";
import {
  FUNDS_FACET_ROUTE,
  FUNDS_SLUG_URL_PARAM_NAME,
  FUND_DETAILS_FOLDER_ROUTE,
  FUND_DETAILS_ROUTE
} from "shared/routes/funds.routes";
import {
  MANAGER_DETAILS_ROUTE,
  MANAGER_SLUG_URL_PARAM_NAME
} from "shared/routes/manager.routes";
import {
  PROGRAMS_FACET_ROUTE,
  PROGRAM_DETAILS_FOLDER_ROUTE,
  PROGRAM_DETAILS_ROUTE,
  PROGRAM_EDIT,
  PROGRAM_SLUG_URL_PARAM_NAME
} from "shared/routes/programs.routes";

import replaceParams from "./replace-params";

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
  replaceParams(`${PROGRAM_DETAILS_ROUTE}/${PROGRAM_EDIT}`, {
    [`:${PROGRAM_SLUG_URL_PARAM_NAME}`]: slugUrl
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

export const composeProgramFacetUrl = (slugUrl: string): string =>
  replaceParams(PROGRAMS_FACET_ROUTE, {
    [`:${PROGRAM_SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const composeFundFacetUrl = (slugUrl: string): string =>
  replaceParams(FUNDS_FACET_ROUTE, {
    [`:${FUNDS_SLUG_URL_PARAM_NAME}`]: slugUrl
  });
