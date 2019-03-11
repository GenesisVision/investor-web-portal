import React, { Fragment } from "react";
import { withTranslation } from "react-i18next";

import ProgramsRatingStats from "./programs-rating-stats";
import ProgramsRatingTable from "./programs-rating-table";

const ProgramsRatingTables = ({ t, id, tab, title }) => (
  <Fragment>
    {id && (
      <ProgramsRatingTable
        tab={tab.level}
        title={t("rating-page.self-pretendents-title")}
        managerId={id}
      />
    )}
    <ProgramsRatingStats levelData={tab} />
    <ProgramsRatingTable tab={tab.level} title={title} disableTitle />
  </Fragment>
);

export default withTranslation()(ProgramsRatingTables);
