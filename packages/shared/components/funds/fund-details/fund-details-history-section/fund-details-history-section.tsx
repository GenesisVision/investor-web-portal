import "shared/components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import FundStructure from "./fund-structure/fund-structure";

interface IFundDetailsHistorySectionProps {
  id: string;
  fetchFundStructure(): void;
}
class FundDetailsHistorySection extends React.PureComponent<
  IFundDetailsHistorySectionProps
> {
  render() {
    const { t, id, fetchFundStructure } = this.props;
    return (
      <Surface className="details-history">
        <div className="details-history__header">
          <h3 className="details-history__heading">
            {t("fund-details-page.history.structure.title")}
          </h3>
        </div>
        <div>
          <FundStructure id={id} fetchStructure={fetchFundStructure} />
        </div>
      </Surface>
    );
  }
}

export default translate()(FundDetailsHistorySection);
