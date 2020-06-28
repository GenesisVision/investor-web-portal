import { DataStorageContext } from "components/data-storage/data-storage";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import {
  fetchDashboardInvestmentsFundsAction,
  fetchDashboardInvestmentsProgramsAction
} from "pages/dashboard/actions/dashboard.actions";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardInvestingMostProfitable from "pages/dashboard/components/dashboard-investing/dashboard-most-profitable";
import { getInvestingMostProfitable } from "pages/dashboard/services/dashboard.service";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const _DashboardInvestingMostProfitableContainer: React.FC = () => {
  const { updateData } = useContext(DataStorageContext);
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const currency = useAccountCurrency();
  const { data, sendRequest } = useApiRequest({
    request: () => getInvestingMostProfitable({ showIn: currency }),
    fetchOnMount: true
  });
  const handleUpdateItems = useCallback(() => {
    dispatch(fetchDashboardInvestmentsProgramsAction());
    dispatch(fetchDashboardInvestmentsFundsAction({ showIn: currency }));
    updateData();
    sendRequest();
  }, [currency]);
  return (
    <DashboardBlock label={t("dashboard-page.investing.most-profitable")}>
      <DashboardInvestingMostProfitable
        onApply={handleUpdateItems}
        data={data?.items!}
        loaderData={[]}
      />
    </DashboardBlock>
  );
};

const DashboardInvestingMostProfitableContainer = React.memo(
  _DashboardInvestingMostProfitableContainer
);
export default DashboardInvestingMostProfitableContainer;
