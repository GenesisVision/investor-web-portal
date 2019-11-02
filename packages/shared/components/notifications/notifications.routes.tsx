import * as React from "react";
import { ID } from "shared/routes/app.routes";
import { FOLLOW, FUND, PROGRAM } from "shared/routes/invest.routes";

export const NOTIFICATIONS_ROUTE = "/notifications";
export const PROGRAM_NOTIFICATIONS_ROUTE = `${NOTIFICATIONS_ROUTE}/${PROGRAM}/:${ID}`;
export const PROGRAM_NOTIFICATIONS_FOLDER_ROUTE = `${NOTIFICATIONS_ROUTE}/${PROGRAM}/[${ID}]`;
export const FUND_NOTIFICATIONS_ROUTE = `${NOTIFICATIONS_ROUTE}/${FUND}/:${ID}`;
export const FUND_NOTIFICATIONS_FOLDER_ROUTE = `${NOTIFICATIONS_ROUTE}/${FUND}/[${ID}]`;
export const FOLLOW_NOTIFICATIONS_ROUTE = `${NOTIFICATIONS_ROUTE}/${FOLLOW}/:${ID}`;
export const FOLLOW_NOTIFICATIONS_FOLDER_ROUTE = `${NOTIFICATIONS_ROUTE}/${FOLLOW}[${ID}]`;
