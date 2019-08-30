import ProgramReinvestingContainer from "modules/program-reinvesting/components/program-reinvesting-container";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw.container";
import * as React from "react";
import { connect } from "react-redux";
import { InvestorRootState } from "reducers";
import ProgramDetailsPageCommon from "shared/components/programs/program-details/program-details.page";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { programEventsSelector } from "shared/reducers/platform-reducer";

import ProgramControls from "./components/program-controls";

const _ProgramDetailsPage: React.FC<StateProps> = ({ events }) => {
  const descriptionSection = {
    ProgramControls: ProgramControls,
    ProgramWithdrawContainer: ProgramWithdrawContainer,
    ProgramReinvestingWidget: ProgramReinvestingContainer
  };

  return (
    <ProgramDetailsPageCommon
      descriptionSection={descriptionSection}
      eventTypeFilterValues={events}
    />
  );
};

const mapStateToProps = (state: InvestorRootState): StateProps => ({
  events: programEventsSelector(state)
});

interface StateProps {
  events: SelectFilterValue<string>[];
}

const ProgramDetailsPage = connect(mapStateToProps)(
  React.memo(_ProgramDetailsPage)
);
export default ProgramDetailsPage;
