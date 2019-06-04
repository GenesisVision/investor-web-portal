import { ProgramDetailsFull } from "gv-api-web";
import React, { FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";

interface ISignalProgramInfoProps {
  programDescription: ProgramDetailsFull;
}

const SignalProgramInfo: FunctionComponent<
  InjectedTranslateProps & ISignalProgramInfoProps
> = ({ t, programDescription }) => {
  return (
    <div className="program-details-description__statistic-container">
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t(
              "program-details-page.tooltip.success-fee-signal"
            )}
            labelText={t("program-details-page.description.successFee")}
          />
        }
        className="program-details-description__short-statistic-item"
        accent
      >
        <NumberFormat
          value={programDescription.signalSuccessFee}
          displayType="text"
          suffix=" %"
        />
      </StatisticItem>
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t("program-details-page.tooltip.volume-fee")}
            labelText={t("program-details-page.description.volume-fee")}
          />
        }
        className="program-details-description__short-statistic-item"
        accent
      >
        <NumberFormat
          value={programDescription.signalVolumeFee}
          displayType="text"
          suffix=" %"
        />
      </StatisticItem>
    </div>
  );
};

export default translate()(SignalProgramInfo);
