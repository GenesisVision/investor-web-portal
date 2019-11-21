import { Push } from "components/link/link";
import { normalizeUrlString } from "components/link/link.helper";
import { NextPageContext } from "next";

import { PROGRAMS_ROUTE } from "./programs.routes";

export const redirect = (
  ctx: NextPageContext,
  condition: boolean,
  route: string = PROGRAMS_ROUTE
): any => {
  if (ctx.req && ctx.res && condition) {
    ctx.res.writeHead(302, { Location: normalizeUrlString(route) });
    ctx.res.end();
    return;
  }

  if (condition) {
    Push(route);
    return;
  }
};
