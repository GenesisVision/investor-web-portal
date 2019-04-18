import "./transaction-details.scss";

import { TransactionDetails, TransactionDetailsTypeEnum } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import ConvertingDetails from "shared/modules/transaction-details/converting-details";
import ExternalDeposit from "shared/modules/transaction-details/external-deposit-details";
import ExternalWithdrawal from "shared/modules/transaction-details/external-withdrawal-details";
import FeeDetails from "shared/modules/transaction-details/fee-details";
import InvestingTransaction from "shared/modules/transaction-details/investment-details";
import OpenCloseTransaction from "shared/modules/transaction-details/open-close-details";
import ProfitDetails from "shared/modules/transaction-details/profit-details";
import WithdrawalTransaction from "shared/modules/transaction-details/withdrawal-details";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { ResponseError } from "shared/utils/types";

const Types: {
  [name in TransactionDetailsTypeEnum]: React.FC<TransactionDetailsProps>
} = {
  Investing: InvestingTransaction,
  Withdrawal: WithdrawalTransaction,
  Open: OpenCloseTransaction,
  Close: OpenCloseTransaction,
  ExternalDeposit: ExternalDeposit,
  ExternalWithdrawal: ExternalWithdrawal,
  Converting: ConvertingDetails,
  Profit: ProfitDetails,
  PlatformFee: FeeDetails
} as {
  [name in TransactionDetailsTypeEnum]: React.FC<TransactionDetailsProps>
};

export interface TransactionDetailsProps extends InjectedTranslateProps {
  data: TransactionDetails;
  handleCancel?(): void;
  handleResend?(): void;
}

interface OwnProps {
  transactionId: string;
  close(): void;
  onAction(): void;
}

interface DispatchProps {
  error(message: string): void;
}

interface State {
  isPending: boolean;
  data?: TransactionDetails;
  errorMessage?: string;
}

interface Props extends OwnProps, DispatchProps, InjectedTranslateProps {}

class _TransactionDetailsDialog extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isPending: false
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    this.setState({ isPending: true });
    walletApi
      .v10WalletTransactionByIdGet(
        this.props.transactionId,
        authService.getAuthArg()
      )
      .then((data: TransactionDetails) =>
        this.setState({ data, isPending: false })
      )
      .catch((errorMessage: ResponseError) => {
        this.props.error(errorMessage.errorMessage);
        this.props.close();
      });
  };

  cancel = () => {
    walletApi
      .v10WalletWithdrawRequestCancelByTxIdPost(
        this.props.transactionId,
        authService.getAuthArg()
      )
      .then(() => {
        this.props.onAction();
      })
      .catch((errorMessage: ResponseError) => {
        this.props.error(errorMessage.errorMessage);
      });
  };
  resendEmail = () => {
    walletApi
      .v10WalletWithdrawRequestResendByTxIdPost(
        this.props.transactionId,
        authService.getAuthArg()
      )
      .then(() => {
        this.props.close();
      })
      .catch((errorMessage: ResponseError) => {
        this.props.error(errorMessage.errorMessage);
      });
  };

  render() {
    if (this.state.isPending || !this.state.data) return <DialogLoader />;
    const Component =
      Types[this.state.data.type] ||
      function() {
        return <p>type isn't define</p>;
      };
    return (
      <Component
        t={this.props.t}
        data={this.state.data}
        handleCancel={this.cancel}
        handleResend={this.resendEmail}
      />
    );
  }
}

const mapDispatchToProps = {
  error: alertMessageActions.error
};

const TransactionDetailsDialog = compose<React.FunctionComponent<OwnProps>>(
  translate(),
  connect<null, DispatchProps>(
    null,
    mapDispatchToProps
  )
)(_TransactionDetailsDialog);
export default TransactionDetailsDialog;
