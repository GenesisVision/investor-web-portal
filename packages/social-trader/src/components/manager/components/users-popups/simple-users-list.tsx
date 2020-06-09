import { DialogTop } from "components/dialog/dialog-top";
import { UsersListItem } from "components/manager/components/users-popups/users-list";
import { UsersListItemType } from "components/manager/components/users-popups/users-popups.types";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { ProfilePublicShort } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";

import styles from "./users-popups.module.scss";

export interface ISimpleUserListProps {
  onChange: VoidFunction;
  onClick?: VoidFunction;
}

interface Props extends ISimpleUserListProps {
  request: () => Promise<UsersListItemType[]>;
  title: string;
}

export const useUsersList = (request: () => Promise<UsersListItemType[]>) => {
  const { data: users } = useApiRequest({ request, fetchOnMount: true });
  const handleChange = useCallback(
    (user: ProfilePublicShort) => {
      // const updatedUsers = users.filter(({ id }) => user.id !== id);
      // setUsers([...updatedUsers, user]);
    },
    [users]
  );
  const usersList = users
    ? [...users].sort((a, b) => (a.id > b.id ? 1 : -1))
    : undefined;
  return { usersList, handleChange };
};

const _SimpleUserList: React.FC<Props> = ({
  onChange,
  request,
  onClick,
  title
}) => {
  const { usersList } = useUsersList(request);
  if (!usersList) return null;
  return (
    <>
      <DialogTop title={title} />
      <PopoverContentCardBlock size={null} fixed={false}>
        <div className={styles["users-list"]}>
          {usersList.map(user => (
            <UsersListItem onChange={onChange} onClick={onClick} user={user} />
          ))}
        </div>
      </PopoverContentCardBlock>
    </>
  );
};

const SimpleUserList = React.memo(_SimpleUserList);
export default SimpleUserList;
