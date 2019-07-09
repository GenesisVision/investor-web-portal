import "./asset-status.scss";

import * as React from "react";
import { useCallback } from "react";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import { STATUS } from "shared/constants/constants";
import useAnchor from "shared/hooks/anchor.hook";

import AssetStatusLabel from "./asset-status-label";
import AssetStatusRequests from "./asset-status-requests";

const _AssetStatus: React.FC<Props> = ({
  className,
  status,
  id,
  asset,
  onCancel
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleOpenDropdown = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      if (status === STATUS.INVESTING || status === STATUS.WITHDRAWING)
        setAnchor(event);
    },
    [status]
  );
  return (
    <>
      <AssetStatusLabel
        status={status}
        className={className}
        onClick={handleOpenDropdown}
      />
      <Popover
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        anchorEl={anchor}
        noPadding
        onClose={clearAnchor}
      >
        <div className="dashboard-request-popover">
          <AssetStatusRequests
            id={id}
            asset={asset}
            handleCloseDropdown={clearAnchor}
            onCancel={onCancel}
          />
        </div>
      </Popover>
    </>
  );
};

interface Props {
  className?: string;
  status: STATUS;
  id: string;
  asset: any;
  onCancel: any;
}

const AssetStatus = React.memo(_AssetStatus);
export default AssetStatus;
