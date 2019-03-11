import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import React from "react";
import { withTranslation } from "react-i18next";
import DetailsStatisticsLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-statistic-loader";
import Surface from "shared/components/surface/surface";

import ProgramDetailsStatisticsElements from "./program-details-statistics-elements";

const ProgramDetailsStatistics = ({
  t,
  statistic,
  profitChart,
  period,
  status
}) => {
  return (
    <Surface className="surface--horizontal-paddings details-statistics">
      <h3>{t("program-details-page.statistics.heading")}</h3>
      {!statistic && !profitChart ? (
        <DetailsStatisticsLoader />
      ) : (
        <ProgramDetailsStatisticsElements
          statistic={statistic}
          profitChart={profitChart}
          period={period}
          status={status}
        />
      )}
    </Surface>
  );
};

export default withTranslation()(ProgramDetailsStatistics);
