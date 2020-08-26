import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DetailsTags } from "components/details/details-description-section/details-description/details-tags.block";
import DetailsInvestment from "components/details/details-description-section/details-investment/details-investment";
import { DetailsDivider } from "components/details/details-divider.block";
import { DETAILS_TYPE } from "components/details/details.types";
import Page from "components/page/page";
import { ASSET, TRADE_ASSET_TYPE } from "constants/constants";
import { LevelsParamsInfo } from "gv-api-web";
import dynamic from "next/dynamic";
import { mapProgramFollowToTransferItemType } from "pages/dashboard/services/dashboard.service";
import FollowDetailsStatisticSection from "pages/invest/follows/follow-details/follow-details-statistic-section/follow-details-statistic-section";
import PerformanceData from "pages/invest/programs/program-details/program-details-description/performance-data";
import ProgramDetailsStatisticSection from "pages/invest/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import { levelsParamsLoaderData } from "pages/invest/programs/program-details/program-details.loader-data";
import { ProgramDescriptionDataType } from "pages/invest/programs/program-details/program-details.types";
import { getSchema } from "pages/invest/programs/program-details/program-schema";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  composeProgramBannerUrl,
  createFollowNotificationsToUrl,
  createProgramNotificationsToUrl,
  createProgramSettingsToUrl
} from "utils/compose-url";

import ProgramDetailsHistorySection, {
  TProgramTablesData
} from "./program-history-section/program-details-history-section";
import {
  financialStatisticTableSelector,
  openPositionsSelector,
  openPositionsTableSelector,
  periodHistoryTableSelector,
  programEventsTableSelector,
  subscriptionsTableSelector,
  tradesSelector,
  tradesTableSelector
} from "./reducers/program-history.reducer";
import {
  dispatchProgramDescriptionWithId,
  getFinancialStatistics,
  getOpenPositions,
  getPeriodHistory,
  getProgramHistoryCounts,
  getSubscriptions,
  getTrades
} from "./service/program-details.service";

const InvestmentAccountControls = dynamic(() =>
  import("pages/accounts/account-details/investment-account-controls")
);
const InvestmentProgramControls = dynamic(() =>
  import("./program-controls/investment-program-controls")
);
const FollowControls = dynamic(() =>
  import("pages/invest/follows/follow-details/follow-controls/follow-controls")
);

const _ProgramDetailsContainer: React.FC<Props> = ({
  levelsParameters,
  data: description,
  route
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const {
    programDetails,
    followDetails,
    publicInfo: { isOwnAsset, title, url, logoUrl, color },
    owner: { username, url: ownerUrl, socialLinks },
    tradingAccountInfo: { currency },
    tags,
    id,
    brokerDetails,
    ownerActions
  } = description;
  const isExchange = programDetails.type === "DailyPeriod";
  const programPersonalDetails =
    programDetails && programDetails.personalDetails;
  const followPersonalDetails = followDetails && followDetails.personalDetails;
  const assetType = !!followDetails ? ASSET.FOLLOW : ASSET.PROGRAM;
  const personalDetails = followPersonalDetails || programPersonalDetails;
  const showFollowStatistic =
    (route === ASSET.FOLLOW && !!followPersonalDetails) ||
    (!!followDetails && !programDetails);
  const showProgramStatistic =
    (route === ASSET.PROGRAM && !!programDetails) ||
    (!!programDetails && !followDetails);

  const handleDispatchDescription = useCallback(() => {
    dispatch(dispatchProgramDescriptionWithId(id, undefined, assetType));
  }, [id]);

  const tablesData: TProgramTablesData = useMemo(
    () => ({
      financialStatistic: programDetails
        ? {
            dataSelector: financialStatisticTableSelector,
            getItems: getFinancialStatistics
          }
        : undefined,
      openPositions: {
        itemSelector: openPositionsSelector,
        dataSelector: openPositionsTableSelector,
        getItems: getOpenPositions
      },
      periodHistory: programDetails
        ? {
            dataSelector: periodHistoryTableSelector,
            getItems: getPeriodHistory
          }
        : undefined,
      subscriptions: {
        dataSelector: subscriptionsTableSelector,
        getItems: getSubscriptions
      },
      trades: {
        itemSelector: tradesSelector,
        dataSelector: tradesTableSelector,
        getItems: getTrades
      }
    }),
    []
  );

  const banner = useMemo(() => {
    // return composeProgramBannerUrl(url);
    return description.publicInfo.logoUrl;
  }, [url]);
  const schemas = useMemo(() => [getSchema(description)], [description]);

  const renderAssetDetailsExtraBlock = useCallback(
    () => <DetailsTags tags={tags} />,
    [tags]
  );

  const renderPerformanceData = useCallback(
    () => (
      <PerformanceData
        isExchange={isExchange}
        leverageMax={description.tradingAccountInfo.leverageMax}
        leverageMin={description.tradingAccountInfo.leverageMin}
        currency={description.tradingAccountInfo.currency}
        status={description.publicInfo.status}
        brokerDetails={description.brokerDetails}
        loaderData={levelsParamsLoaderData}
        data={levelsParameters!}
        programDetails={description.programDetails}
      />
    ),
    [description, levelsParamsLoaderData, levelsParameters]
  );

  const renderControls = useCallback(
    () => (
      <>
        {description.programDetails && (
          <InvestmentProgramControls
            isExchange={isExchange}
            currency={description.tradingAccountInfo.currency}
            id={description.id}
            programDetails={description.programDetails}
            publicInfo={description.publicInfo}
            brokerDetails={description.brokerDetails}
            tradingAccountInfo={description.tradingAccountInfo}
            onApply={handleDispatchDescription}
            isOwnProgram={isOwnAsset}
            levelsParameters={levelsParameters!}
          />
        )}
        {description.followDetails &&
          description.followDetails.signalSettings && (
            <FollowControls
              isOwnAsset={isOwnAsset}
              onApply={handleDispatchDescription}
              publicInfo={description.publicInfo}
              tradingAccountInfo={description.tradingAccountInfo}
              followDetails={description.followDetails}
              id={description.id}
              brokerDetails={description.brokerDetails}
            />
          )}
        {isOwnAsset && description.ownerActions?.canTransferMoney && (
          <InvestmentAccountControls
            transferableItem={mapProgramFollowToTransferItemType(description)}
            accountType={description.publicInfo.typeExt}
            onApply={handleDispatchDescription}
          />
        )}
      </>
    ),
    [description, handleDispatchDescription, isOwnAsset, levelsParameters]
  );

  const settingsUrl = useMemo(
    () =>
      description.publicInfo.status !== "Disabled" &&
      description.publicInfo.status !== "Closed"
        ? createProgramSettingsToUrl(
            description.publicInfo.url,
            description.publicInfo.title
          )
        : undefined,
    [description]
  );

  const notificationsUrl = useMemo(
    () =>
      assetType === "Follow"
        ? createFollowNotificationsToUrl(url, title)
        : createProgramNotificationsToUrl(url, title),
    [assetType, url, title]
  );

  const fees = useMemo(
    () => ({
      managementFeePersonal: !isOwnAsset
        ? programPersonalDetails?.managementFeePersonal
        : undefined,
      successFee: programDetails?.successFeeCurrent,
      successFeePersonal: programPersonalDetails?.successFeePersonal
    }),
    [isOwnAsset, programPersonalDetails, programDetails]
  );

  const hasProgramDetails = !!programDetails;
  const getHistoryCounts = useMemo(
    () => getProgramHistoryCounts(hasProgramDetails),
    [hasProgramDetails]
  );

  return (
    <Page
      type={"article"}
      title={`${
        assetType === ASSET.FOLLOW
          ? t("follow-details-page:title")
          : t("program-details-page:title")
      } - ${title}`}
      description={`${assetType} ${description.publicInfo.title} - ${description.publicInfo.description}`}
      previewImage={banner}
      schemas={schemas}
    >
      <DetailsDescriptionSection
        detailsType={DETAILS_TYPE.ASSET}
        personalDetails={personalDetails}
        isOwnAsset={isOwnAsset}
        logo={logoUrl}
        title={title}
        id={id}
        subtitle={username}
        socialLinks={socialLinks}
        subtitleUrl={ownerUrl}
        currency={currency}
        color={color}
        asset={assetType}
        programDetails={programDetails || followDetails}
        description={description.publicInfo.description}
        notificationsUrl={notificationsUrl}
        settingsUrl={settingsUrl}
        AssetDetailsExtraBlock={renderAssetDetailsExtraBlock}
        PerformanceData={renderPerformanceData}
        Controls={renderControls}
      />
      <DetailsDivider />
      <DetailsInvestment
        isExchange={isExchange}
        isProcessingRealTime={
          programDetails.dailyPeriodDetails.isProcessingRealTime
        }
        isOwnAsset={isOwnAsset}
        fees={fees}
        dispatchDescription={handleDispatchDescription}
        asset={assetType}
        selector={programEventsTableSelector}
        id={id}
        currency={currency}
        programPersonalDetails={programPersonalDetails}
        followPersonalDetails={followPersonalDetails}
      />
      {showFollowStatistic && <FollowDetailsStatisticSection />}
      {showProgramStatistic && (
        <ProgramDetailsStatisticSection showPeriod={!isExchange} />
      )}
      <ProgramDetailsHistorySection
        isExchange={isExchange}
        assetType={(route as unknown) as TRADE_ASSET_TYPE}
        canCloseOpenPositions={ownerActions?.canCloseOpenPositions}
        getHistoryCounts={getHistoryCounts}
        tablesData={tablesData}
        showCommissionRebateSometime={
          brokerDetails.showCommissionRebateSometime
        }
        isOwnProgram={isOwnAsset}
        showSwaps={brokerDetails.showSwaps}
        showTickets={brokerDetails.showTickets}
        programId={id}
        programCurrency={currency}
        title={title}
      />
    </Page>
  );
};

interface Props {
  levelsParameters?: LevelsParamsInfo;
  route: ASSET;
  data: ProgramDescriptionDataType;
}

const ProgramDetailsContainer = React.memo(_ProgramDetailsContainer);
export default ProgramDetailsContainer;
