import "./details-investment.scss";

import { DetailsInvestmentBlock } from "components/details/details-description-section/details-investment/blocks/details-investment-block";
import { DetailsInvestmentFooter } from "components/details/details-description-section/details-investment/blocks/details-investment-footer";
import { DetailsInvestmentHeading } from "components/details/details-description-section/details-investment/blocks/details-investment-title";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import { SignalSubscription } from "gv-api-web";
import EditFollowButton from "pages/follows/follow-details/edit-follow-button";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _Subscription: React.FC<Props> = ({
  id,
  updateInfo,
  data: subscriptionInfo,
  assetCurrency
}) => {
  const [t] = useTranslation();
  return (
    <DetailsInvestmentBlock>
      <DetailsInvestmentHeading>
        {t("follow-details-page.current-investment.title")}
      </DetailsInvestmentHeading>
      <StatisticItemList>
        <StatisticItem
          accent
          label={t("follow-details-page.current-investment.fields.profit")}
        >
          <NumberFormat
            value={formatCurrencyValue(
              subscriptionInfo.totalProfit,
              assetCurrency
            )}
            suffix={` ${assetCurrency}`}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem
          accent
          label={t("follow-details-page.current-investment.fields.status")}
        >
          ???
        </StatisticItem>
        <StatisticItem
          accent
          label={t("follow-details-page.current-investment.fields.type")}
        >
          {subscriptionInfo.mode}
        </StatisticItem>
        <StatisticItem
          accent
          label={t("follow-details-page.current-investment.fields.percentage")}
        >
          <NumberFormat
            value={subscriptionInfo.openTolerancePercent}
            suffix={` %`}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem
          accent
          label={t(
            "follow-details-page.current-investment.fields.fixed-volume"
          )}
        >
          <NumberFormat
            value={subscriptionInfo.fixedVolume}
            suffix={` ${subscriptionInfo.fixedCurrency}`}
            displayType="text"
          />
        </StatisticItem>
      </StatisticItemList>
      <DetailsInvestmentFooter>
        <EditFollowButton
          onApply={updateInfo}
          currency={assetCurrency}
          tradingAccountId={subscriptionInfo.subscriberInfo.tradingAccountId}
          id={id}
        />
      </DetailsInvestmentFooter>
    </DetailsInvestmentBlock>
  );
};

interface Props {
  assetCurrency: CurrencyEnum;
  data: SignalSubscription;
  updateInfo: VoidFunction;
  id: string;
}

const Subscription = withBlurLoader(React.memo(_Subscription));
export default Subscription;
