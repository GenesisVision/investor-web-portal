import "./image-base.scss";
import "lazysizes";
import "lazysizes/plugins/attrchange/ls.attrchange";

import classNames from "classnames";
import { IAmpImgProps } from "components/avatar/image-base";
import useIsOpen from "hooks/is-open.hook";
import { useAmp } from "next/amp";
import * as React from "react";
import { useCallback, useEffect } from "react";

const emptyImg =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAQAAAA3fa6RAAAADklEQVR42mNkAANGCAUAACMAA2w/AMgAAAAASUVORK5CYII=";

const _ImageBaseElement: React.FC<IImageBaseElementProps> = ({
  ampProps,
  title,
  color,
  DefaultImageComponent,
  src = "",
  alt,
  defaultImage,
  className,
  defaultImageClassName
}) => {
  const isAmp = useAmp();
  const hasUrl = src && src.length !== 0;
  const [isError, setIsError, setIsNotError] = useIsOpen();
  useEffect(() => {
    if (src) setIsNotError();
    else setIsError();
  }, [src]);
  const handleError = useCallback((e: any) => {
    e.target.onerror = null;
    setIsError();
  }, []);
  const currentSrc = isError ? (defaultImage ? defaultImage : emptyImg) : src;
  if (isError || !hasUrl)
    return DefaultImageComponent ? (
      <DefaultImageComponent
        color={color}
        imageClassName={classNames(defaultImageClassName, className)}
      />
    ) : (
      // eslint-disable-next-line jsx-a11y/img-redundant-alt
      <img
        src={defaultImage || emptyImg}
        alt="Image not found"
        className={classNames(defaultImageClassName, className)}
      />
    );
  const height = ampProps ? ampProps.height : 0;
  const width = ampProps ? ampProps.width : 0;
  return isAmp ? (
    // @ts-ignore
    <amp-img
      src={currentSrc}
      width={width}
      height={height}
      title={title}
      alt={alt}
      className={className}
    />
  ) : (
    <img
      src={emptyImg}
      data-src={currentSrc}
      title={title}
      alt={alt || "Image loading"}
      className={classNames("lazyload", className)}
      onError={handleError}
    />
  );
};

const ImageBaseElement = React.memo(_ImageBaseElement);
export default ImageBaseElement;

export interface IImageBaseElementProps {
  ampProps?: IAmpImgProps;
  title?: string;
  color?: string;
  DefaultImageComponent?: React.ComponentType<any>;
  src?: string;
  alt?: string;
  defaultImage?: string;
  className?: string;
  defaultImageClassName?: string;
}
