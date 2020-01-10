import { FundDescriptionDataType } from "pages/funds/fund-details/reducers/description.reducer";
import * as React from "react";
import filesService from "services/file-service";
import { SchemaType } from "utils/seo";

export const getFundSchema = (
  details: FundDescriptionDataType
): SchemaType => ({
  context: "https://schema.org",
  "@type": "InvestmentFund",
  name: details.publicInfo.title,
  description: details.publicInfo.description,
  feesAndCommissionsSpecification: "", //TODO
  logo: filesService.getFileUrl(details.publicInfo.logo)
});
