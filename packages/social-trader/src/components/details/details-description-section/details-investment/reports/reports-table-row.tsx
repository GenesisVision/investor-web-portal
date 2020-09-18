import FeeCommission from "components/fee-commission/fee-commission";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { Row } from "components/row/row";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { ProgramPeriodViewModel } from "gv-api-web";
import React from "react";
import styled from "styled-components";
import { formatDate, humanizeDate } from "utils/dates";
import { CurrencyEnum } from "utils/types";

export interface IReportsTableRowProps {
  data: ProgramPeriodViewModel;
  currency: CurrencyEnum;
}

const HelpFees = styled.span`
  cursor: help;
`;

const _ReportsTableRow: React.FC<IReportsTableRowProps> = ({
  currency,
  data: {
    dateFrom,
    periodLength,
    investorStatistic: {
      deposits,
      withdrawals,
      balance,
      profit,
      managerManagementFee,
      managerSuccessFee,
      platformSuccessFee
    }
  }
}) => {
  const fees = platformSuccessFee + managerSuccessFee + managerManagementFee;
  return (
    <TableRow>
      <TableCell>{formatDate(dateFrom)}</TableCell>
      <TableCell>{humanizeDate(0, periodLength)}</TableCell>
      <TableCell>
        {balance} {currency}
      </TableCell>
      <TableCell>
        {profit} {currency}
      </TableCell>
      <TableCell>
        {fees > 0 ? (
          <Tooltip
            horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
            render={() => (
              <TooltipContent>
                {managerSuccessFee > 0 && (
                  <Row size={"small"}>
                    <FeeCommission
                      title={"Success fee"}
                      value={managerSuccessFee}
                      currency={currency}
                    />
                  </Row>
                )}
                {platformSuccessFee > 0 && (
                  <Row size={"small"}>
                    <FeeCommission
                      title={"Platform Success fee"}
                      value={platformSuccessFee}
                      currency={currency}
                    />
                  </Row>
                )}
                {managerManagementFee > 0 && (
                  <Row size={"small"}>
                    <FeeCommission
                      title={"Management fee "}
                      value={managerManagementFee}
                      currency={currency}
                    />
                  </Row>
                )}
              </TooltipContent>
            )}
          >
            <HelpFees>
              {fees} {currency}
            </HelpFees>
          </Tooltip>
        ) : (
          <>
            {fees} {currency}
          </>
        )}
      </TableCell>
      <TableCell>
        {deposits + withdrawals} {currency}
      </TableCell>
    </TableRow>
  );
};

export const ReportsTableRow = React.memo(_ReportsTableRow);
