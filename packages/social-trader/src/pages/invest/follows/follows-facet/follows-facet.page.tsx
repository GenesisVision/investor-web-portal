import { DefaultTableBlock } from "components/default.block/default-table.block";
import FacetContainer, {
  FACET_ASSET
} from "components/facet-container/facet-container";
import Page from "components/page/page";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { FollowDetailsListItemItemsViewModel } from "gv-api-web";
import { fetchFollows } from "modules/follows-table/services/follows-table.service";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import FollowsFacetTable from "./components/follows-facet-table";

const _ProgramsFacetPage: React.FC<Props> = ({ t, id }) => {
  const getFollows = useCallback(
    (
      filters: ComposeFiltersAllType
    ): Promise<FollowDetailsListItemItemsViewModel> =>
      fetchFollows({
        ...filters
      }),
    []
  );

  return (
    <Page
      description={`${t("follows-page:title")} ${t(
        `asset-list:facets.${id}`
      )} facet list`}
      showTitle
      title={`${t("follows-page:title")} ${t(`asset-list:facets.${id}`)}`}
    >
      <DefaultTableBlock>
        <FacetContainer
          id={id}
          asset={FACET_ASSET.FOLLOWS}
          TableContainer={FollowsFacetTable}
          getItems={getFollows}
        />
      </DefaultTableBlock>
    </Page>
  );
};

interface Props extends WithTranslation {
  id: string;
}

const FollowsFacetPage = translate()(React.memo(_ProgramsFacetPage));
export default FollowsFacetPage;
