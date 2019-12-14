import CurrencySourceSelect from "components/currency-source-select/currency-source-select";
import { ISelectChangeEvent } from "components/select/select";
import { WalletBaseData, WalletData } from "gv-api-web";
import { TransferItemType } from "modules/transfer/transfer.types";
import React from "react";

const _WalletSelect: React.FC<Props> = ({ items, onChange, label, name }) => (
  <CurrencySourceSelect
    label={label}
    items={items}
    name={name}
    onChange={onChange}
  />
);

export type ItemsType = Array<WalletItemType>;
export type WalletItemType = WalletData | WalletBaseData | TransferItemType;

interface Props {
  items: ItemsType;
  label: string;
  name: string;
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
}

const WalletSelect = React.memo(_WalletSelect);
export default WalletSelect;
