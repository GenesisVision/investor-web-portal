import "./pager.scss";

import * as React from "react";

import PagerButton from "./pager-button";

export const _Pager: React.FC<Props> = ({
  total,
  current,
  countVisiblePages = 3,
  onPageChanged
}) => {
  const handleChange = (page: number) => (): void => onPageChanged(page);

  const half = Math.floor(countVisiblePages / 2);

  const firstPage =
    (current <= half + 1 && 1) ||
    (current >= total - half && total - countVisiblePages + 1) ||
    current - half;

  const visiblePages = generateVisiblePages(firstPage, countVisiblePages);

  return (
    <div className="pager">
      {firstPage > 1 && (
        <div className="pager__pager-block">
          <PagerButton page={1} current={current} clickHandle={handleChange} />
          {firstPage > 2 && <PagerSeparator />}
        </div>
      )}
      <div className="pager__pager-block">
        {visiblePages
          .filter(page => page <= total)
          .map(page => (
            <PagerButton
              key={page}
              page={page}
              current={current}
              clickHandle={handleChange}
            />
          ))}
      </div>
      {total - firstPage >= countVisiblePages && (
        <div className="pager__pager-block">
          {total - firstPage > countVisiblePages && <PagerSeparator />}
          <PagerButton
            page={total}
            current={current}
            clickHandle={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export const PagerSeparator = (): JSX.Element => (
  <div className="pager__separator">...</div>
);

const generateVisiblePages = (first: number, count: number): number[] => {
  const pages = [];
  for (let i = first; i < first + count; i++) pages.push(i);
  return pages;
};

interface Props {
  total: number;
  current: number;
  onPageChanged(page: number): void;
  countVisiblePages?: number;
}

const Pager = React.memo(_Pager);
export default Pager;
