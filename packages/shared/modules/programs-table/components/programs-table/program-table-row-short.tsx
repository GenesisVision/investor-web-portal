import classNames from "classnames";
import { ProgramDetails } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import ProgramSimpleChart from "shared/components/program-simple-chart/program-simple-chart";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";
import TagProgramContainer from "shared/components/tags/tag-program-container/tag-program-container";
import Tooltip from "shared/components/tooltip/tooltip";
import { STATUS } from "shared/constants/constants";
import { composeProgramDetailsUrl } from "shared/utils/compose-url";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

interface IProgramTableRowShortProps {
  title: string;
  showRating?: boolean;
  program: ProgramDetails;
  isAuthenticated?: boolean;
  toggleFavorite?: TableToggleFavoriteHandlerType;
  onExpandClick(): void;
}

const ProgramTableRowShort: React.FC<
  IProgramTableRowShortProps & InjectedTranslateProps
> = ({
  t,
  title,
  showRating,
  program,
  isAuthenticated,
  toggleFavorite,
  onExpandClick
}) => {
  const {
    status,
    availableInvestmentBase,
    statistic,
    logo,
    level,
    levelProgress,
    color,
    url,
    currency,
    periodStarts,
    periodEnds,
    chart,
    personalDetails,
    id,
    tags,
    rating
  } = program;
  const stopPropagationEvent = (event: React.MouseEvent) =>
    event.stopPropagation();
  return (
    <TableRow
      className={classNames({
        "table__row--pretender": rating.canLevelUp
      })}
      onClick={onExpandClick}
    >
      {showRating && <TableCell>{rating.rating}</TableCell>}
      <TableCell className="programs-table__cell programs-table__cell--name">
        <div className="programs-table__cell--avatar-title">
          <Link
            to={{
              pathname: composeProgramDetailsUrl(url),
              state: `/ ${title}`
            }}
            onClick={stopPropagationEvent}
          >
            <AssetAvatar
              url={logo}
              level={level}
              levelProgress={levelProgress}
              alt={program.title}
              color={color}
              tooltip={
                <LevelTooltip level={level} canLevelUp={rating.canLevelUp} />
              }
            />
          </Link>
          <div className="programs-table__cell--title">
            <div className="programs-table__cell--top">
              <Link
                className="programs-table__cell--link"
                to={{
                  pathname: composeProgramDetailsUrl(url),
                  state: `/ ${title}`
                }}
                onClick={stopPropagationEvent}
              >
                {program.title}
              </Link>
            </div>
            <div className="programs-table__cell--bottom">
              <TagProgramContainer tags={tags} />
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--equity">
        <Tooltip
          render={() => (
            <div>
              {formatCurrencyValue(statistic.balanceGVT.amount, "GVT")} {"GVT"}
            </div>
          )}
        >
          <NumberFormat
            value={formatCurrencyValue(statistic.balanceBase.amount, currency)}
            suffix={` ${currency}`}
            displayType="text"
          />
        </Tooltip>
      </TableCell>
      {/*<TableCell className="programs-table__cell programs-table__cell--currency">
        {currency}
      </TableCell>*/}
      <TableCell className="programs-table__cell programs-table__cell--investors">
        {statistic.investorsCount}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--available-to-invest">
        {formatCurrencyValue(availableInvestmentBase, currency)} {currency}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--period">
        {periodStarts && (
          <ProgramPeriodPie
            condition={status !== STATUS.CLOSED}
            loader={t("program-period.program-closed")}
            start={periodStarts}
            end={periodEnds}
          />
        )}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--trades">
        {moment(program.creationDate).fromNow(true)}
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--drawdown">
        <NumberFormat
          value={formatValue(statistic.drawdownPercent, 2)}
          suffix="%"
          displayType="text"
        />
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--profit">
        <Profitability
          value={formatValue(statistic.profitPercent, 2)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(statistic.profitPercent, 2)}
            suffix="%"
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </TableCell>
      <TableCell className="programs-table__cell programs-table__cell--chart">
        {chart && <ProgramSimpleChart data={chart} programId={id} />}
      </TableCell>
      {isAuthenticated && personalDetails && (
        <TableCell className="programs-table__cell programs-table__cell--favorite">
          <FavoriteIcon
            id={id}
            selected={personalDetails.isFavorite}
            onClick={toggleFavorite}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

export default translate()(React.memo(ProgramTableRowShort));
