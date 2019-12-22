import "./traders-container.scss";

import * as React from "react";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import TradersList from "routes/ssr/landing-page/components/traders/traders-list";

const TradersContainer: React.FC = () => (
  <div className="traders-container">
    <div className="traders-container__info">
      <h2 className="traders-container__title">Trades</h2>
      <p className="traders-container__text">
        Receive a 100% bonus on any deposit made on Genesis Markets. The bonus
        is unlocked as soon as you start trading!
      </p>
      <LPButton href="/">Discover</LPButton>
    </div>
    <TradersList className="traders-container__list" />
  </div>
);

export default TradersContainer;
