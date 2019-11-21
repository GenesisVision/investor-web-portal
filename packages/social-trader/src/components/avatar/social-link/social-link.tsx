import "./social-link.scss";

import SocialLink from "media/social-link.svg";
import * as React from "react";

import ImageBase, { IImageProps } from "../image-base";

const _SocialLinkImage: React.FC<IImageProps> = ({ url, alt }) => (
  <ImageBase
    imageClassName="social-link__image"
    url={url}
    alt={alt}
    defaultImage={SocialLink}
  />
);

const SocialLinkImage = React.memo(_SocialLinkImage);
export default SocialLinkImage;
