import classNames from "classnames";
import { ProgramDetails } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import NumberFormat from "react-number-format";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import { Icon } from "shared/components/icon/icon";
import LevelTooltip from "shared/components/level-tooltip/level-tooltip";
import Link from "shared/components/link/link";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import ProgramPeriodPie from "shared/components/program-period/program-period-pie/program-period-pie";
import TableRow from "shared/components/table/components/table-row";
import { TableToggleFavoriteHandlerType } from "shared/components/table/components/table.types";
import TagProgramContainer from "shared/components/tags/tag-program-container/tag-program-container";
import Tooltip from "shared/components/tooltip/tooltip";
import { useTranslation } from "shared/i18n";
import {
  composeManagerDetailsUrl,
  composeProgramDetailsUrl
} from "shared/utils/compose-url";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

import ProgramBigChart from "./program-big-chart/program-big-chart";
import NextLink from "next/link";

const _ProgramTableRowDetailed: React.FC<Props> = ({
  title,
  program,
  isAuthenticated,
  toggleFavorite,
  onCollapseClick
}) => {
  const { t } = useTranslation();
  const programLinkProps = {
    state: `/ ${title}`,
    pathname: composeProgramDetailsUrl(program.url)
  };
  console.log(composeManagerDetailsUrl(program.manager.url));
  return (
    <TableRow>
      <td
        className={classNames("program-detailed", {
          "program-detailed--pretender": program.rating.canLevelUp
        })}
        colSpan={11}
      >
        <div className="program-detailed__container program-detailed__container--outer">
          <div className="program-detailed__container program-detailed__container--inner">
            <div className="program-detailed__info">
              <div className="program-detailed__avatar">
                <Link to={programLinkProps}>
                  <AssetAvatar
                    url={program.logo}
                    level={program.level}
                    levelProgress={program.levelProgress}
                    alt={program.title}
                    size="medium"
                    color={program.color}
                    tooltip={
                      <LevelTooltip
                        level={program.level}
                        canLevelUp={program.rating.canLevelUp}
                      />
                    }
                  />
                </Link>
                <div className="program-detailed__avatar--name">
                  <div className="program-detailed__title">
                    <Link
                      className="program-detailed__title-link"
                      to={programLinkProps}
                    >
                      {program.title}
                    </Link>
                  </div>
                  <div className="program-detailed__manager">
                    <NextLink
                      href="/managers/[id]"
                      as={composeManagerDetailsUrl(program.manager.url)}
                      // to={{
                      //   pathname: composeManagerDetailsUrl(program.manager.url),
                      //   state: programLinkProps.state
                      // }}
                    >
                      <a className="program-detailed__manager-link">
                        {program.manager.username}
                      </a>
                    </NextLink>
                  </div>
                  <TagProgramContainer tags={program.tags} />
                </div>
              </div>
              <div className="program-detailed__strategy">
                {t("programs-page.programs-header.strategy")}
              </div>
              <div className="program-detailed__scroll">
                <div className="program-detailed__description">
                  {program.description}
                </div>
              </div>
            </div>
            <div className="program-detailed__statistic">
              <div className="program-detailed__chart">
                {program.chart.length && (
                  <ProgramBigChart
                    data={program.chart}
                    programId={program.id}
                  />
                )}
              </div>
              <div className="program-detailed__statistic-data">
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.equity")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    <Tooltip
                      render={() => (
                        <div>
                          {formatCurrencyValue(
                            program.statistic.balanceGVT.amount,
                            "GVT"
                          )}{" "}
                          {"GVT"}
                        </div>
                      )}
                    >
                      <NumberFormat
                        value={formatCurrencyValue(
                          program.statistic.balanceBase.amount,
                          program.currency
                        )}
                        suffix={` ${program.currency}`}
                        displayType="text"
                      />
                    </Tooltip>
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.currency")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.currency}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.investors")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {program.statistic.investorsCount}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.available-to-invest")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {`${formatCurrencyValue(
                      program.availableInvestmentBase,
                      program.currency
                    )} ${program.currency}`}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.period")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    <ProgramPeriodPie
                      start={program.periodStarts}
                      end={program.periodEnds}
                    />
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.age")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    {moment(program.creationDate).format("ll")}
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.drawdown")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
                    <NumberFormat
                      value={formatValue(program.statistic.drawdownPercent, 2)}
                      suffix="%"
                      displayType="text"
                    />
                  </div>
                </div>
                <div>
                  <div className="program-detailed__statistic-data--label">
                    {t("programs-page.programs-header.profit")}
                  </div>
                  <div className="program-detailed__statistic-data--value">
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
                  </div>
                </div>
              </div>
              {isAuthenticated && program.personalDetails && (
                <div className="program-detailed__favorites-block">
                  <span className="program-detailed__favorites-text">
                    {t("program-details-page.description.addToFavorites")}
                  </span>
                  <FavoriteIcon
                    onClick={toggleFavorite}
                    id={program.id}
                    selected={program.personalDetails.isFavorite}
                  />
                </div>
              )}
              <div className="program-detailed__bottom-block">
                <div className="program-detailed__details">
                  <Link
                    className="program-detailed__details-link"
                    to={programLinkProps}
                  >
                    {t("program-actions.details")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="program-detailed__collapse" onClick={onCollapseClick}>
            <Icon type="collapse" className="program-detailed__collapse-icon" />
          </div>
        </div>
      </td>
    </TableRow>
  );
};

interface Props {
  title: string;
  program: ProgramDetails;
  isAuthenticated?: boolean;
  toggleFavorite: TableToggleFavoriteHandlerType;
  onCollapseClick(): void;
}

const ProgramTableRowDetailed = React.memo(_ProgramTableRowDetailed);
export default ProgramTableRowDetailed;
