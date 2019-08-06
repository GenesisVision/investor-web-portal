import "./popover.scss";

import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import EventListener from "react-event-listener";
import Modal from "shared/components/modal/modal";

const _Popover: React.FC<Props> = props => {
  const {
    horizontal = HORIZONTAL_POPOVER_POS.LEFT,
    vertical = VERTICAL_POPOVER_POS.BOTTOM,
    anchorEl,
    noPadding,
    className,
    ownWidth,
    children
  } = props;
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const popover = useRef<HTMLDivElement>(null);
  useEffect(
    () => {
      if (popover.current) {
        const width = ownWidth ? "auto" : getAnchorBounds().width;
        popover.current.style.left = getLeft();
        popover.current.style.top = `${parseInt(getTop()) + scrollTop}px`;
        popover.current.style.minWidth = `${width}px`;
        popover.current.style.transform = getTransformPosition();
        popover.current.style.opacity = "1";
      }
    },
    [
      anchorEl,
      getAnchorBounds,
      getLeft,
      getTop,
      getTransformPosition,
      ownWidth,
      scrollTop
    ]
  );

  useEffect(
    () => {
      setWindowHeight(window.innerHeight);
      setScrollTop(window.scrollY);
    },
    [anchorEl]
  );

  const getAnchorBounds = useCallback(
    (): ClientRect => getAnchorEl(anchorEl).getBoundingClientRect()
  );

  const getPopoverBounds = (): ClientRect =>
    popover.current
      ? popover.current.getBoundingClientRect()
      : { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 };

  const getTransformPosition = () => {
    let translateX = `0`;
    let translateY = `0`;
    switch (horizontal) {
      case HORIZONTAL_POPOVER_POS.CENTER:
        translateX = `-50%`;
        break;
      case HORIZONTAL_POPOVER_POS.RIGHT:
        translateX = `-100%`;
        break;
    }
    switch (getVerticalPosition()) {
      case VERTICAL_POPOVER_POS.CENTER:
        translateY = `-50%`;
        break;
      case VERTICAL_POPOVER_POS.TOP:
        translateY = `-100%`;
        break;
    }
    return `translate(${translateX}, ${translateY})`;
  };

  const getTop = () => {
    const { top, height } = getAnchorBounds();
    switch (getVerticalPosition()) {
      case VERTICAL_POPOVER_POS.CENTER:
        return `${top + height / 2}px`;
      case VERTICAL_POPOVER_POS.TOP:
        return `${top - MARGIN_OFFSET}px`;
      default:
        return `${top + height + MARGIN_OFFSET}px`;
    }
  };

  const getLeft = () => {
    const { left, width, right } = getAnchorBounds();
    switch (horizontal) {
      case HORIZONTAL_POPOVER_POS.RELATIVE:
        return null;
      case HORIZONTAL_POPOVER_POS.CENTER:
        return `${left + width / 2}px`;
      case HORIZONTAL_POPOVER_POS.RIGHT:
        return `${right}px`;
      case HORIZONTAL_POPOVER_POS.LEFT:
      default:
        return `${left}px`;
    }
  };

  const getVerticalPosition = (): VERTICAL_POPOVER_POS => {
    const anchorBounds = getAnchorBounds();
    const popoverBounds = getPopoverBounds();
    if (
      windowHeight +
        scrollTop -
        anchorBounds.top -
        anchorBounds.height -
        MARGIN_OFFSET <
        popoverBounds.height &&
      anchorBounds.top + MARGIN_OFFSET > popoverBounds.height
    ) {
      return VERTICAL_POPOVER_POS.TOP;
    }
    return vertical;
  };

  const handleScroll = useCallback(() => setScrollTop(window.scrollY), []);
  return (
    <Modal open={Boolean(anchorEl)} transparentBackdrop {...props}>
      <EventListener target={"window"} onScroll={handleScroll} />
      <div
        className={classNames("popover", className, {
          "popover--no-padding": noPadding
        })}
        ref={popover}
      >
        {children}
      </div>
    </Modal>
  );
};

const MARGIN_OFFSET = 10;

export enum VERTICAL_POPOVER_POS {
  TOP = "top",
  BOTTOM = "bottom",
  CENTER = "center"
}
export enum HORIZONTAL_POPOVER_POS {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  RELATIVE = "relative"
}

const getAnchorEl = (el?: anchorElType) =>
  typeof el === "function" ? el() : el;

const Popover = React.memo(_Popover);
export default Popover;

interface Props {
  onClose?(event: React.MouseEvent<HTMLElement>): void;
  horizontal?: HORIZONTAL_POPOVER_POS;
  vertical?: VERTICAL_POPOVER_POS;
  anchorEl?: anchorElType;
  noPadding?: boolean;
  noAbsolute?: boolean;
  className?: string;
  fixed?: boolean;
  ownWidth?: boolean;
}

export type anchorElType = EventTarget | Function | HTMLElement;
