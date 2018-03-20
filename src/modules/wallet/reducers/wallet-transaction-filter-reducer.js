import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import { WALLET_TRANSACTION_PROGRAM_FILTER } from "../actions/wallet-actions.constants";

const walletTransactionProgramFilterRequestReducer = apiReducerFactory({
  apiType: WALLET_TRANSACTION_PROGRAM_FILTER
});

export default walletTransactionProgramFilterRequestReducer;
