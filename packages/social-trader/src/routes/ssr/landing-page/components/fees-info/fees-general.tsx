import "./fees-info.scss";

import React from "react";
import { DoneIcon } from "routes/ssr/landing-page/components/internal-icons/done-icon";

const _FeesGeneral: React.FC = () => (
  <div className="fees-info">
    <div className="fees-info__section">
      <div className="internal__container">
        <div className="fees-info__wrapper">
          <h2 className="fees-info__title">Platform fee</h2>
        </div>
        <div className="fees-info__table-wrapper">
          <div className="fees-info__table-wrapper">
            <table className="fees-table ">
              <thead className="fees-table__head">
                <tr className="fees-table__row">
                  <th className="fees-table__cell">Type</th>
                  <th className="fees-table__cell">Fee</th>
                  <th className="fees-table__cell">Programs</th>
                  <th className="fees-table__cell">Copy Trading</th>
                  <th className="fees-table__cell">Funds</th>
                </tr>
              </thead>
              <tbody>
                <tr className="fees-table__row">
                  <td className="fees-table__cell">Entry Fee</td>
                  <td className="fees-table__cell">0.5%</td>
                  <td className="fees-table__cell fees-table__cell--color-primary">
                    <span>{<DoneIcon />}</span>
                  </td>
                  <td className="fees-table__cell fees-table__cell--color-primary">
                    <b>&mdash;</b>
                  </td>
                  <td className="fees-table__cell fees-table__cell--color-primary">
                    {<DoneIcon />}
                  </td>
                </tr>
                <tr className="fees-table__row">
                  <td className="fees-table__cell">Success Fee</td>
                  <td className="fees-table__cell">0 - 10%*</td>
                  <td className="fees-table__cell fees-table__cell--color-primary">
                    {<DoneIcon />}
                  </td>
                  <td className="fees-table__cell fees-table__cell--color-primary">
                    {<DoneIcon />}
                  </td>
                  <td className="fees-table__cell fees-table__cell--color-primary">
                    <b>&mdash;</b>
                  </td>
                </tr>
                <tr className="fees-table__row">
                  <td className="fees-table__cell">GV Commission</td>
                  <td className="fees-table__cell">15%</td>
                  <td className="fees-table__cell fees-table__cell--color-primary">
                    <b>&mdash;</b>
                  </td>
                  <td className="fees-table__cell fees-table__cell--color-primary">
                    {<DoneIcon />}
                  </td>
                  <td className="fees-table__cell fees-table__cell--color-primary">
                    <b>&mdash;</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="fees-info__notes">
          <ul className="fees-info__list-notes">
            <li className="fees-info__note-item">
              Entry fee is the fee charged by the platform that is a percentage
              of the initial amount invested in a Program or a Fund.
            </li>
            <li className="fees-info__note-item">
              Platform Success fee is the fee charged on profits generated by
              Programs or from a trade transaction when Copy Trading. It is
              calculated according to the HWM system as a percentage of the
              profit received from a program during the reporting period or from
              a trade transaction when copy trading. No profit means no Platform
              Success fee is charged
            </li>
            <li className="fees-info__note-item">
              For external account, GV charges a 15% volume fee from all copied
              trades
            </li>
            <li className="fees-info__note-item fees-info__note-item--star">
              The percentage depends on the amount of GVT stored in the wallet.
              For every 1 000 GVT stored in the wallet, investors receive a 10%
              discount with a maximum discount of 100% (i.e. an investor holding
              1 000 GVT will only pay a 9% Success Fee, an investor holding 10
              000 GVT will pay no Success Fee).
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="fees-info__section--bg-gray fees-info__section">
      <div className="internal__container">
        <div className="fees-info__wrapper">
          <h2 className="fees-info__title">Withdrawal fee</h2>
          <p className="fees-info__text">
            The fee charged upon withdrawing funds from the platform. The
            commission rate depends on the currency used for withdrawing funds
          </p>
        </div>
        <div className="fees-info__table-wrapper">
          <table className="fees-table fees-table--white-head">
            <thead className="fees-table__head">
              <tr className="fees-table__row">
                <th className="fees-table__cell">Wallet</th>
                <th className="fees-table__cell">Genesis Vision Token</th>
                <th className="fees-table__cell">Ethereum</th>
                <th className="fees-table__cell">Bitcoin</th>
                <th className="fees-table__cell">Tether</th>
              </tr>
            </thead>
            <tbody>
              <tr className="fees-table__row">
                <td className="fees-table__cell">Fee</td>
                <td className="fees-table__cell">1 GVT</td>
                <td className="fees-table__cell">0,01 ETH</td>
                <td className="fees-table__cell">0,0005 BTC</td>
                <td className="fees-table__cell">2 USDT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const FeesGeneral = React.memo(_FeesGeneral);
export default FeesGeneral;
