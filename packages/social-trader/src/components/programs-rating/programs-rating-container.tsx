import "components/programs/programs-facet/programs-facet.scss";

import DetailsBlock from "components/details/details-block";
import FacetContainer, {
  FACET_ASSET
} from "components/facet-container/facet-container";
import GVButton from "components/gv-button";
import Page from "components/page/page";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { IDataModel } from "constants/constants";
import { CancelablePromise, LevelInfo } from "gv-api-web";
import { fetchPrograms } from "modules/programs-table/services/programs-table.service";
import { fetchInvestmentsLevels } from "pages/programs/program-details/service/program-details.service";
import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import LevelIcon from "../details/details-description-section/about-levels/level-icon";
import ProgramsFacetTable from "../programs/programs-facet/components/programs-facet-table";
import { PROGRAMS_COLUMNS } from "./program-rating.constants";

const RATING_FACET_NAME = "most_reliable";

const _ProgramsRating: React.FC<WithTranslation> = ({ t }) => {
  const [levels, setLevels] = useState<LevelInfo[]>([]);
  const [level, setLevel] = useState<number | undefined>(undefined);

  const updateLevel = (newLevel: number) => {
    newLevel === level ? setLevel(undefined) : setLevel(newLevel);
  };

  useEffect(() => {
    fetchInvestmentsLevels("GVT").then(setLevels);
  }, []);

  const getPrograms = useCallback(
    (filters: ComposeFiltersAllType): CancelablePromise<IDataModel> =>
      fetchPrograms({
        ...filters,
        sorting: "ByLevelProgressDesc",
        levelMin: level,
        levelMax: level
      }),
    [level]
  );

  return (
    <Page title={t("programs-page.title")}>
      <div className="programs-facet__filter">
        {levels.map((lvl, i) => (
          <GVButton
            className={"programs-facet__button"}
            key={i}
            onClick={() => updateLevel(lvl.level)}
            noPadding
            variant={"text"}
          >
            <LevelIcon levelInfo={lvl} current={lvl.level === level} />
          </GVButton>
        ))}
      </div>
      <DetailsBlock table>
        <FacetContainer
          id={RATING_FACET_NAME}
          asset={FACET_ASSET.PROGRAMS}
          TableContainer={props => (
            <ProgramsFacetTable
              {...props}
              level={level}
              columns={PROGRAMS_COLUMNS}
            />
          )}
          getItems={getPrograms}
        />
      </DetailsBlock>
    </Page>
  );
};

const ProgramsRatingContainer = translate()(React.memo(_ProgramsRating));
export default ProgramsRatingContainer;
