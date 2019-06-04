import "./managers-table.scss";

import { ManagerProfile } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import GVButton from "shared/components/gv-button";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";

interface IManagersTableRowProps {
  manager: ManagerProfile;
  title: any;
}
const ManagersTableRow: React.FC<
  IManagersTableRowProps & InjectedTranslateProps
> = ({ t, manager, title }) => {
  return (
    <TableRow className="managers-table__row">
      <TableCell className="managers-table__cell--username">
        <ProfileAvatar url={manager.avatar} alt={manager.username} />
        <Link
          to={{
            pathname: composeManagerDetailsUrl(manager.url),
            state: `/ ${title}`
          }}
        >
          <GVButton variant="text" color="secondary">
            {manager.username}
          </GVButton>
        </Link>
      </TableCell>
      <TableCell className="">{manager.assets.join(", ")}</TableCell>
      <TableCell className="">{moment(manager.regDate).format("ll")}</TableCell>
    </TableRow>
  );
};

export default React.memo(translate()(ManagersTableRow));
