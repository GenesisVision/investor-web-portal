import "./create-program-broker.scss";

import { Broker, BrokerAccountType } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import BrokerCard from "./broker-card/broker-card";
import { BROKER_CARD_EXTRA_STATE } from "./broker-card/broker-card.constants";
import NavigateToSettings from "./navigate-to-settings";

const getLeverageDescription = (
  leverageMin: number,
  leverageMax: number
): string => {
  let result;

  if (leverageMin === leverageMax) {
    result = "1:" + leverageMin;
  } else {
    result = `1:${leverageMin} - 1:${leverageMax}`;
  }

  return result;
};

const getAccountTypes = (accountTypes: BrokerAccountType[]) => {
  if (!accountTypes[0].currencies) return null;
  return accountTypes[0].currencies.join(", ");
};

const getBrokerState = (
  isForex: boolean,
  isForexAllowed: boolean,
  isKycConfirmed: boolean
): BROKER_CARD_EXTRA_STATE => {
  if (isForex && !isKycConfirmed) {
    return BROKER_CARD_EXTRA_STATE.KYC_REQUIRED;
  }
  if (isForex && !isForexAllowed) {
    return BROKER_CARD_EXTRA_STATE.FOREX_DISABLED;
  }
  return BROKER_CARD_EXTRA_STATE.NONE;
};

const _CreateProgramBroker: React.FC<OwnProps & InjectedTranslateProps> = ({
  t,
  brokers,
  selectedBroker,
  selectBroker,
  isForexAllowed,
  isKycConfirmed,
  navigateToSettings
}) => (
  <div className="create-program-broker-container">
    <div className="create-program-broker">
      <div className="create-program-broker__list">
        {brokers.map(broker => (
          <BrokerCard
            logo={broker.logo}
            key={broker.name}
            brokerName={broker.name}
            isSelected={broker === selectedBroker}
            onSelect={selectBroker}
            cardState={getBrokerState(
              broker.isForex,
              isForexAllowed,
              isKycConfirmed
            )}
          />
        ))}
        <div className="create-program-broker__navigation">
          <NavigateToSettings
            isForex={selectedBroker.isForex}
            isKycConfirmed={isKycConfirmed}
            navigateToSettings={navigateToSettings}
          />
        </div>
      </div>
      <Surface className="surface--horizontal-paddings create-program-broker__description">
        <h3 className="create-program-broker__description-heading">
          {selectedBroker.name}
        </h3>
        <div className="create-program-broker__row">
          <div className="create-program-broker__info-title">
            {t("manager.create-program-page.broker-info.about")}
          </div>
          <div className="create-program-broker__info-text">
            {selectedBroker.description}
          </div>
        </div>
        <div className="create-program-broker__row">
          <div className="create-program-broker__info-title">
            {t("manager.create-program-page.broker-info.account-type")}
          </div>
          <div className="create-program-broker__info-text">
            {getAccountTypes(selectedBroker.accountTypes)}
          </div>
        </div>
        <div className="create-program-broker__row">
          <div className="create-program-broker__info-title">
            {t("manager.create-program-page.broker-info.trading-platform")}
          </div>
          <div className="create-program-broker__info-text">
            {selectedBroker.accountTypes[0].type}
          </div>
        </div>
        <div className="create-program-broker__row">
          <div className="create-program-broker__info-title">
            {t("manager.create-program-page.broker-info.terms")}
          </div>
          <div className="create-program-broker__info-text">
            <a
              href={selectedBroker.terms}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("manager.create-program-page.broker-info.read-terms")}
            </a>
          </div>
        </div>
        <div className="create-program-broker__row create-program-broker__row--small">
          <div className="create-program-broker__info-title">
            {t("manager.create-program-page.broker-info.leverage")}
          </div>
          <div className="create-program-broker__info-text">
            {getLeverageDescription(
              selectedBroker.leverageMin,
              selectedBroker.leverageMax
            )}
          </div>
        </div>
        <div className="create-program-broker__row">
          <div className="create-program-broker__info-title">
            {t("manager.create-program-page.broker-info.assets")}
          </div>
          <div className="create-program-broker__info-text">
            {selectedBroker.assets}
          </div>
        </div>
      </Surface>
    </div>
  </div>
);

const CreateProgramBroker = translate()(React.memo(_CreateProgramBroker));
export default translate()(CreateProgramBroker);

interface OwnProps {
  brokers: Broker[];
  navigateToSettings(): void;
  selectedBroker: Broker;
  selectBroker(brokerName: string): () => void;
  isForexAllowed: boolean;
  isKycConfirmed: boolean;
}
