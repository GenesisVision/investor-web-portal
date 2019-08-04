import "./wallet-select.scss";

import { CopyTradingAccountInfo, WalletData } from "gv-api-web";
import React from "react";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select, { ISelectChangeEvent } from "shared/components/select/select";
import filesService from "shared/services/file-service";

const _WalletSelect: React.FC<Props> = ({
  items,
  onChange,
  label,
  name,
  value
}) => (
  <GVFormikField
    name={name}
    component={GVTextField}
    label={label}
    InputComponent={Select}
    onChange={onChange}
    value={value}
  >
    {items.map(({ id, logo, currency, title }) => (
      <option value={id} key={id}>
        <img
          src={filesService.getFileUrl(logo)}
          className="wallet-select__icon"
          alt={currency}
        />
        {`${title} | ${currency}`}
      </option>
    ))}
  </GVFormikField>
);

export type ItemsType = Array<ItemType>;
export type ItemType = CopyTradingAccountInfo | WalletData;

interface OwnProps {
  items: ItemsType;
  onChange: (event: ISelectChangeEvent, child: JSX.Element) => void;
  label: string;
  name: string;
  value?: string;
}

interface Props extends OwnProps {}

const WalletSelect = React.memo(_WalletSelect);
export default WalletSelect;
