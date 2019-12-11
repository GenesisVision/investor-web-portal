import SettingsBlock from "components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import { FundAssetPartWithIcon, PlatformAsset } from "gv-api-web";
import { FundAssetInfo } from "gv-api-web/dist/model/FundAssetInfo";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { compose } from "redux";

import ReallocateForm, {
  IReallocateFormValues
} from "./components/reallocate-form";
import { updateAssets } from "./services/reallocate.services";

const _Reallocation: React.FC<Props> = ({
  availableReallocationPercents,
  onApply,
  platformAssets,
  fundAssets,
  id
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { errorMessage, sendRequest } = useApiRequest({
    middleware: [onApply],
    request: args => dispatch(updateAssets(args))
  });
  const handleApply = useCallback(
    ({ assets }: IReallocateFormValues, isSubmitting) => {
      sendRequest({ id, assets }, isSubmitting);
    },
    [id]
  );
  return (
    <SettingsBlock label={t("fund-settings.reallocation.title")}>
      <ReallocateForm
        condition={!!fundAssets.length}
        availableReallocationPercents={availableReallocationPercents}
        fundAssets={fundAssets}
        platformAssets={platformAssets}
        onSubmit={handleApply}
        errorMessage={errorMessage}
      />
    </SettingsBlock>
  );
};

interface Props {
  availableReallocationPercents: number;
  id: string;
  platformAssets: PlatformAsset[];
  fundAssets: FundAssetInfo[];
  onApply: () => void;
}

const Reallocation = compose<React.ComponentType<Props & WithLoaderProps>>(
  withLoader,
  React.memo
)(_Reallocation);
export default Reallocation;
