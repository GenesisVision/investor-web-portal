import ImageBase from "components/avatar/image-base";
import {
  DetailsBroker,
  DetailsPerformanceData
} from "components/details/details-description-section/details-description/details-structure-blocks";
import Leverage from "components/leverage/leverage";
import PieContainerSmall from "components/pie-container/pie-container-small";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { STATUS } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import {
  BrokerDetails,
  LevelsParamsInfo,
  ProgramDetailsFull
} from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const _PerformanceData: React.FC<Props> = ({
  leverageMin,
  leverageMax,
  currency,
  programDetails,
  brokerDetails,
  status,
  data: levelsParameters
}) => {
  const [t] = useTranslation();
  return (
    <DetailsPerformanceData>
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t("asset-details.description.tooltips.broker")}
            labelText={t("asset-details.description.broker")}
          />
        }
      >
        <DetailsBroker
          name={brokerDetails.name}
          logoUrl={brokerDetails.logoUrl}
        />
      </StatisticItem>
      {currency && (
        <StatisticItem
          label={
            <TooltipLabel
              tooltipContent={t("asset-details.description.tooltips.currency")}
              labelText={t("asset-details.description.currency")}
            />
          }
        >
          {currency}
        </StatisticItem>
      )}
      {!!leverageMin && !!leverageMax && (
        <StatisticItem
          label={
            <TooltipLabel
              tooltipContent={t("asset-details.description.tooltips.leverage")}
              labelText={t("asset-details.description.leverage")}
            />
          }
        >
          <Leverage min={leverageMin} max={leverageMax} />
        </StatisticItem>
      )}
      {programDetails && (
        <>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("asset-details.description.tooltips.period")}
                labelText={t("asset-details.description.period")}
              />
            }
          >
            <ProgramPeriodPie
              condition={status !== STATUS.CLOSED}
              loader={t("program-period.program-closed")}
              start={programDetails.periodStarts}
              end={programDetails.periodEnds}
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("asset-details.description.tooltips.age")}
                labelText={t("asset-details.description.age")}
              />
            }
          >
            <PieContainerSmall
              end={levelsParameters.programAgeMax}
              value={programDetails.ageDays}
              suffix={"days"}
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.genesis-ratio")}
                labelText={t("asset-details.description.genesis-ratio")}
              />
            }
          >
            <PieContainerSmall
              start={levelsParameters.genesisRatioMin}
              end={levelsParameters.genesisRatioMax}
              value={programDetails.genesisRatio}
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t(
                  "program-details-page.tooltip.investment-scale"
                )}
                labelText={t("asset-details.description.investment-scale")}
              />
            }
          >
            <PieContainerSmall
              start={levelsParameters.investmentScaleMin}
              end={levelsParameters.investmentScaleMax}
              value={programDetails.investmentScale}
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.volume-scale")}
                labelText={t("asset-details.description.volume-scale")}
              />
            }
          >
            <PieContainerSmall
              start={levelsParameters.volumeScaleMin}
              end={levelsParameters.volumeScaleMax}
              value={programDetails.volumeScale}
            />
          </StatisticItem>
        </>
      )}
    </DetailsPerformanceData>
  );
};

interface Props {
  leverageMin: number;
  leverageMax: number;
  currency?: CurrencyEnum;
  data: LevelsParamsInfo;
  status: string;
  brokerDetails: BrokerDetails;
  programDetails?: ProgramDetailsFull;
}

const PerformanceData = withBlurLoader(React.memo(_PerformanceData));
export default PerformanceData;
