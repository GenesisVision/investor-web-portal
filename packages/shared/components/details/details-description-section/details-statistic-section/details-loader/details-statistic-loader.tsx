import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import StatisticItemLoader from "shared/components/statistic-item/statistic-item.loader";

const _DetailsStatisticsLoader: React.FC<InjectedTranslateProps> = ({ t }) => (
  <>
    <div className="details-statistics__subheading">
      {t("fund-details-page.statistics.current")}
    </div>
    <div className="details-statistics__particular-information">
      <div className="details-statistics__vertical-info-block">
        <StatisticItemLoader />
        <StatisticItemLoader />
      </div>
      <div className="details-statistics__vertical-info-block">
        <StatisticItemLoader />
      </div>
    </div>
    <div className="details-statistics__subheading">
      {t("fund-details-page.statistics.for")} {t(`chart-period.month`)}
    </div>
    <div className="details-statistics__particular-information">
      <div className="details-statistics__column">
        <StatisticItemLoader />
        <StatisticItemLoader />
        <StatisticItemLoader />
      </div>
      <div className="details-statistics__column">
        <StatisticItemLoader />
        <StatisticItemLoader />
      </div>
    </div>
  </>
);

const DetailsStatisticsLoader = translate()(_DetailsStatisticsLoader);
export default DetailsStatisticsLoader;
