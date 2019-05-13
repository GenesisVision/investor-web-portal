import "./dashboard-programs.scss";

import classNames from "classnames";
import { ProgramDetails } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetStatus from "shared/components/asset-status/asset-status";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import GVButton from "shared/components/gv-button";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramPeriodEnd from "shared/components/program-period/program-period-end/program-period-end";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  FilteringType,
  SortingColumn
} from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TableCell from "shared/components/table/components/table-cell";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import {
  Column,
  GetItemsFuncActionType,
  UpdateFilterFunc
} from "shared/components/table/components/table.types";
import { PROGRAM, ROLE, ROLE_ENV, STATUS } from "shared/constants/constants";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import {
  ACTION_STATUS_FILTER_NAME,
  ACTION_STATUS_FILTER_VALUES
} from "./dashboard-programs.helpers";
import dashboardProgramsTableSelector from "./dashboard-programs.selector";

const _DashboardPrograms: React.FC<InjectedTranslateProps & Props> = ({
  t,
  getDashboardPrograms,
  createButtonToolbar,
  createProgram,
  title,
  columns
}) => {
  return (
    <TableContainer
      createButtonToolbar={createButtonToolbar}
      emptyMessage={createProgram}
      getItems={getDashboardPrograms}
      dataSelector={dashboardProgramsTableSelector}
      isFetchOnMount={true}
      columns={columns}
      renderFilters={(
        updateFilter: UpdateFilterFunc,
        filtering: FilteringType
      ) => (
        <>
          <SelectFilter
            name={ACTION_STATUS_FILTER_NAME}
            label={t(`${ROLE_ENV}.dashboard-page.actions-status-filter.label`)}
            value={filtering[ACTION_STATUS_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
            values={ACTION_STATUS_FILTER_VALUES}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            startLabel={t("filters.date-range.program-start")}
          />
        </>
      )}
      renderHeader={(column: Column) => (
        <span
          className={`programs-table__cell dashboard-programs__cell dashboard-programs__cell--${
            column.name
          }`}
        >
          {t(`${ROLE_ENV}.dashboard-page.programs-header.${column.name}`)}
        </span>
      )}
      renderBodyRow={(program: ProgramDetails, updateRow: any) => (
        <TableRow
          className={classNames({
            "table__row--pretender": program.rating.canLevelUp
          })}
        >
          <TableCell className="programs-table__cell dashboard-programs__cell--title">
            <div className="dashboard-programs__cell--avatar-title">
              <Link
                to={{
                  pathname: composeProgramDetailsUrl(program.url),
                  state: `/ ${title}`
                }}
              >
                <AssetAvatar
                  url={program.logo}
                  level={program.level}
                  alt={program.title}
                  color={program.color}
                  tooltip={
                    <LevelTooltip
                      level={program.level}
                      canLevelUp={program.rating.canLevelUp}
                    />
                  }
                />
              </Link>
              <Link
                to={{
                  pathname: composeProgramDetailsUrl(program.url),
                  state: `/ ${title}`
                }}
              >
                <GVButton variant="text" color="secondary">
                  {program.title}
                </GVButton>
              </Link>
            </div>
          </TableCell>
          {ROLE_ENV === ROLE.MANAGER ? (
            <TableCell className="programs-table__cell dashboard-programs__cell--login">
              {program.personalDetails.login}
            </TableCell>
          ) : null}
          <TableCell className="programs-table__cell dashboard-programs__cell--share">
            {formatValue(program.dashboardAssetsDetails.share, 2)}%
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--period">
            <ProgramPeriodEnd periodEnds={program.periodEnds} />
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--value">
            <NumberFormat
              value={formatCurrencyValue(
                program.personalDetails.value,
                program.currency
              )}
              displayType="text"
            />
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--currency">
            {program.currency}
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--profit">
            <Profitability
              value={formatValue(program.statistic.profitPercent, 2)}
              prefix={PROFITABILITY_PREFIX.SIGN}
            >
              <NumberFormat
                value={formatValue(program.statistic.profitPercent, 2)}
                suffix="%"
                allowNegative={false}
                displayType="text"
              />
            </Profitability>
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--chart">
            {program.chart.length && (
              <ProgramSimpleChart data={program.chart} programId={program.id} />
            )}
          </TableCell>
          <TableCell className="programs-table__cell dashboard-programs__cell--status">
            <AssetStatus
              status={program.personalDetails.status as STATUS}
              id={program.id}
              asset={PROGRAM}
              onCancel={updateRow}
            />
          </TableCell>
        </TableRow>
      )}
    />
  );
};

const DashboardPrograms = React.memo(translate()(_DashboardPrograms));
export default DashboardPrograms;

interface Props {
  title: string;
  columns: SortingColumn[];
  getDashboardPrograms: GetItemsFuncActionType;
  createButtonToolbar: JSX.Element;
  createProgram: JSX.Element;
}
