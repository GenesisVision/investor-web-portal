import "./referral-program.scss";

import DetailsBlock from "components/details/details-block";
import ProfileLayout from "components/profile/profile-layout";
import { REFERRAL_PROGRAM } from "components/profile/profile.constants";
import SettingsBlock from "components/settings-block/settings-block";
import { ProfileFullViewModel } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { getRandomInteger } from "utils/helpers";

import { InviteBlock, inviteBlockLoaderData } from "./invite-block";
import { ReferralFriendsTable } from "./referral-friends-table";
import { ReferralHistoryTable } from "./referral-history-table";
import { ReferralRewardsBlock } from "./referral-reward-block";
import {
  getProfile,
  getReferralDetails
} from "./services/referral-program-services";

const _ReferralProgramPage: React.FC = () => {
  const currency = useAccountCurrency();
  const { data: profile } = useApiRequest<ProfileFullViewModel>({
    fetchOnMount: true,
    request: getProfile
  });
  const { data: rewards } = useApiRequest({
    fetchOnMount: true,
    fetchOnMountData: currency,
    request: getReferralDetails
  });
  return (
    <ProfileLayout route={REFERRAL_PROGRAM}>
      <SettingsBlock>
        <InviteBlock data={profile!} loaderData={inviteBlockLoaderData} />
      </SettingsBlock>
      <SettingsBlock>
        <ReferralRewardsBlock
          data={rewards!}
          loaderData={{
            totalReferralsL1: getRandomInteger(1, 50),
            totalReferralsL2: getRandomInteger(1, 50),
            totalAmount: getRandomInteger(1, 50)
          }}
          currency={currency}
        />
      </SettingsBlock>
      <div className="referral-program__tables">
        <DetailsBlock table>
          <ReferralFriendsTable />
        </DetailsBlock>
        <DetailsBlock table>
          <ReferralHistoryTable />
        </DetailsBlock>
      </div>
    </ProfileLayout>
  );
};

const ReferralProgramPage = React.memo(_ReferralProgramPage);
export default ReferralProgramPage;
