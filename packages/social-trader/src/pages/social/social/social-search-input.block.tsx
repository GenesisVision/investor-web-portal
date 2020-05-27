import classNames from "classnames";
import { SearchIcon } from "components/icon/search-icon";
import SocialSearchInput from "pages/social/social/social-search-input";
import React from "react";

import styles from "./social-page.module.scss";

interface Props {
  setSearchIsOpen: VoidFunction;
  openSearch: boolean;
  setSearchIsClose: VoidFunction;
}

const _SocialSearchInputBlock: React.FC<Props> = ({
  setSearchIsOpen,
  openSearch,
  setSearchIsClose
}) => {
  return (
    <div
      onClick={setSearchIsOpen}
      className={classNames(styles["social-page__search-container"], {
        [styles["social-page__search-container--search"]]: openSearch
      })}
    >
      {openSearch ? (
        <SocialSearchInput setSearchIsClose={setSearchIsClose} />
      ) : (
        <div className={styles["social-page__search-button"]}>
          <SearchIcon />
        </div>
      )}
    </div>
  );
};

export const SocialSearchInputBlock = React.memo(_SocialSearchInputBlock);