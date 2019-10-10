import "./download-button.scss";

import { format } from "date-fns";
import { saveAs } from "file-saver";
import * as React from "react";
import { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import { ExportIcon } from "shared/components/icon/export-icon";
import { DateRangeFilterType } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import filesService from "shared/services/file-service";

const _DownloadButtonToolbarAuth: React.FC<Props> = ({
  t,
  dateRange,
  programId,
  title
}) => {
  const loadFile = useCallback(() => {
    const dateNow = format(new Date(), "YYYY-MM-DD_HH-mm-ss");
    filesService
      .getStatisticExportFile(programId, dateRange)
      .then((blob: Blob) => saveAs(blob, `${title}_statistic_${dateNow}.xlsx`));
  }, [programId, dateRange, title]);
  return (
    <div className="dashboard__button">
      <GVButton
        className="download-button"
        color="primary"
        variant="text"
        onClick={loadFile}
      >
        <>
          {t("program-details-page.history.trades.download")}
          <ExportIcon />
        </>
      </GVButton>
    </div>
  );
};

interface Props extends WithTranslation {
  dateRange: DateRangeFilterType;
  programId: string;
  title: string;
}

const DownloadButtonToolbarAuth = translate()(
  React.memo(_DownloadButtonToolbarAuth)
);

export default DownloadButtonToolbarAuth;
