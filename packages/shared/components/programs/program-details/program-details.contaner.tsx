import "shared/components/details/details.scss";

import { LevelsParamsInfo, ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { ProgramDetailContext } from "shared/components/details/helpers/details-context";
import Page from "shared/components/page/page";
import ProgramDetailsDescriptionSection from "shared/components/programs/program-details/program-details-description/program-details-description-section";
import ProgramDetailsStatisticSection from "shared/components/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import {
  fetchOpenPositions,
  fetchPeriodHistory,
  fetchProgramTrades,
  getProgramStatistic
} from "shared/components/programs/program-details/services/program-details.service";
import { ProgramStatisticResult } from "shared/components/programs/program-details/services/program-details.types";
import { STATUS } from "shared/constants/constants";
import withLoader from "shared/decorators/with-loader";
import { CurrencyEnum } from "shared/utils/types";

import { GM_NAME } from "./program-details.constants";
import { IDescriptionSection, IHistorySection } from "./program-details.types";
import ProgramDetailsHistorySection from "./program-history/program-details-history-section";

const _ProgramDetailsContainer: React.FC<Props> = ({
  levelsParameters,
  updateDescription,
  isKycConfirmed,
  currency,
  isAuthenticated,
  redirectToLogin,
  descriptionSection,
  historySection,
  description,
  statistic
}) => {
  const fetchHistoryPortfolioEvents = (filters: any) =>
    historySection.fetchPortfolioEvents({
      ...filters,
      assetId: description.id
    });
  const isInvested =
    description.personalProgramDetails &&
    description.personalProgramDetails.isInvested;
  return (
    <Page title={description.title}>
      <ProgramDetailContext.Provider
        value={{ updateDescription, isKycConfirmed }}
      >
        <div className="details">
          <div className="details__section">
            <ProgramDetailsDescriptionSection
              levelsParameters={levelsParameters}
              accountCurrency={currency}
              programDescription={description}
              isAuthenticated={isAuthenticated}
              redirectToLogin={redirectToLogin}
              ProgramControls={descriptionSection.ProgramControls}
              ProgramWithdrawContainer={
                descriptionSection.ProgramWithdrawContainer
              }
              ProgramReinvestingWidget={
                descriptionSection.ProgramReinvestingWidget
              }
            />
          </div>
          <div className="details__section">
            <ProgramDetailsStatisticSection
              status={description.status as STATUS}
              getProgramStatistic={getProgramStatistic}
              programId={description.id}
              currency={currency}
              statistic={statistic}
            />
          </div>
          <div className="details__history">
            <ProgramDetailsHistorySection
              isOwnProgram={
                description.personalProgramDetails
                  ? description.personalProgramDetails.isOwnProgram
                  : false
              }
              showSwaps={description.brokerDetails.showSwaps}
              showTickets={description.brokerDetails.showTickets}
              isSignalProgram={description.isSignalProgram}
              fetchOpenPositions={fetchOpenPositions}
              fetchPeriodHistory={fetchPeriodHistory}
              fetchTrades={fetchProgramTrades}
              fetchPortfolioEvents={fetchHistoryPortfolioEvents}
              fetchHistoryCounts={historySection.fetchHistoryCounts}
              programId={description.id}
              programCurrency={description.currency}
              currency={currency}
              isInvested={isInvested}
              eventTypeFilterValues={historySection.eventTypeFilterValues}
              isGMProgram={description.brokerDetails.name === GM_NAME}
              title={description.title}
            />
          </div>
        </div>
      </ProgramDetailContext.Provider>
    </Page>
  );
};

interface OwnProps {
  updateDescription: () => any;
  redirectToLogin: () => void;
  historySection: IHistorySection;
  descriptionSection: IDescriptionSection;
  description: ProgramDetailsFull;
  levelsParameters: LevelsParamsInfo;
  isAuthenticated: boolean;
  isKycConfirmed: boolean;
  currency: CurrencyEnum;
  statistic?: ProgramStatisticResult;
}

interface Props extends OwnProps {}

const ProgramDetailsContainer = React.memo(
  withLoader(_ProgramDetailsContainer)
);
export default ProgramDetailsContainer;
