import {
  FUNDS_FACET_ROUTE,
  FUNDS_SLUG_URL_PARAM_NAME
} from "pages/funds/funds.routes";
import getParams from "shared/utils/get-params";

export const getCurrentFacet = () => (dispatch, getState) => {
  const { router, platformData } = getState();

  if (!platformData.data) return { isPending: true };

  const { fundsFacets } = platformData.data;
  const facetUrl = getParams(router.location.pathname, FUNDS_FACET_ROUTE)[
    FUNDS_SLUG_URL_PARAM_NAME
  ];
  const facet = fundsFacets.find(x => x.url === facetUrl);
  if (!facet) return { notFound: true };
  return { facet };
};
