import "./modal.scss";

import classNames from "classnames";
import React, { useCallback } from "react";
import EventListener from "react-event-listener";
import Portal from "shared/components/portal/portal";

const _Modal: React.FC<Props> = ({
  onClose,
  open,
  noAbsolute,
  transparentBackdrop,
  children,
  fixed
}) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent & React.MouseEvent<HTMLElement>) =>
      event.keyCode === 27 && handleClose(event),
    [onClose]
  );

  const handleBackdropClick = useCallback(
    (event: MouseEvent): void =>
      handleClose((event as unknown) as React.MouseEvent<HTMLElement>),
    [onClose]
  );

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => onClose && onClose(event),
    [onClose]
  );

  return (
    <Portal open={open}>
      <div
        className={classNames("modal", {
          "modal--position-absolute": !noAbsolute,
          "modal--position-fixed": fixed
        })}
      >
        <EventListener
          target={document}
          onKeyUp={handleKeyPress}
          onClick={handleBackdropClick}
        >
          <div
            className={classNames("modal__backdrop", {
              "modal__backdrop--transparent": transparentBackdrop
            })}
          />
        </EventListener>
        {children}
      </div>
    </Portal>
  );
};

interface Props {
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
  noAbsolute?: boolean;
  transparentBackdrop?: boolean;
  fixed?: boolean;
}

const Modal = React.memo(_Modal);
export default Modal;
