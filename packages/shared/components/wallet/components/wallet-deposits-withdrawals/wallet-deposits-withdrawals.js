import "./wallet-deposits-withdrawals.scss";

import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import TableModule from "shared/components/table/components/table-module";
import { FilterType } from "shared/components/table/helpers/filtering.helpers";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { reduceFilters } from "shared/components/wallet/components/wallet-transactions/wallet-transaction-type-filter.helpers";

import { fetchMultiTransactionsExternal } from "../../services/wallet.services";

const TRANSACTIONS_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

const DEFAULT_FILTERS = [
  { ...composeDefaultDateRangeFilter() },
  {
    name: "type",
    type: FilterType.general
  }
];

class WalletDepositsWithdrawals extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.updateTime !== prevProps.updateTime) {
      this.ref.current.updateItems();
    }
  }

  ref = React.createRef();

  fetchMultiTransactionsExternal = filters => {
    return fetchMultiTransactionsExternal(this.props.currency, filters);
  };

  render() {
    const {
      t,
      createButtonToolbar,
      renderBodyRow,
      columns,
      filters
    } = this.props;
    return (
      <div className="wallet-deposits-withdrawals">
        <TableModule
          ref={this.ref}
          defaultFilters={DEFAULT_FILTERS}
          paging={DEFAULT_PAGING}
          filtering={{
            ...TRANSACTIONS_FILTERS,
            type: filters[0]
          }}
          createButtonToolbar={createButtonToolbar}
          getItems={this.fetchMultiTransactionsExternal}
          renderFilters={(updateFilter, filtering) => {
            return (
              <Fragment>
                <SelectFilter
                  name={"type"}
                  label="Type"
                  value={filtering["type"]}
                  values={reduceFilters(filters)}
                  onChange={updateFilter}
                />
                <DateRangeFilter
                  name={DATE_RANGE_FILTER_NAME}
                  value={filtering["dateRange"]}
                  onChange={updateFilter}
                  startLabel={t("filters.date-range.account-creation")}
                />
              </Fragment>
            );
          }}
          columns={columns}
          renderHeader={column => (
            <span
              className={`wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--${
                column.name
              }`}
            >
              {t(`wallet-page.deposits-withdrawals.${column.name}`)}
            </span>
          )}
          renderBodyRow={renderBodyRow}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  updateTime: state.wallet.lastUpdate.timestamp
});

export default compose(
  withTranslation(),
  connect(mapStateToProps)
)(WalletDepositsWithdrawals);
