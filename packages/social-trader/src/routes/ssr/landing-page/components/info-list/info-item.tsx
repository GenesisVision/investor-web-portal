import classNames from "classnames";
import React from "react";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import { TInfoItem } from "routes/ssr/landing-page/static-data/info";

const _InfoItem: React.FC<TInfoItem> = ({ texts, image, button }) => (
  <li
    className={classNames("info-list__item", {
      "info-list__item--bg-transparent": image
    })}
  >
    {image && <img src={image} alt="" className="info-list__item-image" />}
    {texts && (
      <div className="info-list__item-text">
        {texts.map((item, index) =>
          item.bold ? (
            <b key={index}>{item.text}</b>
          ) : (
            <span key={index}>{item.text}</span>
          )
        )}
      </div>
    )}
    {button && (
      <div className="info-list__item-btn">
        <LPButton href={button.link}>{button.text}</LPButton>
      </div>
    )}
  </li>
);
const InfoItem = React.memo(_InfoItem);
export default InfoItem;
