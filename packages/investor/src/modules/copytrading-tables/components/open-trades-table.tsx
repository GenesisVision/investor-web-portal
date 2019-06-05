import "./open-trades-table.scss";

import { OrderSignalModel } from "gv-api-web";
import React, { ComponentType } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { Action, Dispatch, bindActionCreators, compose } from "redux";
import TableContainer from "shared/components/table/components/table-container";

import { clearCopytradingTable } from "../actions/copytrading-tables.actions";
import { getCopytradingOpenTrades } from "../services/copytrading-tables.service";
import { COPYTRADING_OPEN_TRADES_COLUMNS } from "./copytrading-tables.constants";
import { dashboardOpenTradesTableSelector } from "./copytrading-tables.selectors";
import TradeRow from "./trade-row";

class OpenTradesTable extends React.PureComponent<
  OwnProps & DispatchProps & InjectedTranslateProps
> {
  componentWillUnmount() {
    this.props.service.clearCopytradingTable();
  }

  render() {
    const { t, title, currency } = this.props;
    return (
      <TableContainer
        className="open-trades-table"
        getItems={getCopytradingOpenTrades(currency)}
        dataSelector={dashboardOpenTradesTableSelector}
        isFetchOnMount={true}
        columns={COPYTRADING_OPEN_TRADES_COLUMNS}
        renderHeader={column => (
          <span
            className={`details-trades__head-cell program-details-trades__cell--${
              column.name
            }`}
          >
            {t(`investor.copytrading-tables.open-trades-header.${column.name}`)}
          </span>
        )}
        renderBodyRow={(trade: OrderSignalModel) => (
          <TradeRow trade={trade} title={title} />
        )}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  service: bindActionCreators({ clearCopytradingTable }, dispatch)
});

export default compose<ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(OpenTradesTable);

interface OwnProps {
  title: string;
  currency?: string;
}

interface DispatchProps {
  service: {
    clearCopytradingTable(): void;
  };
}
