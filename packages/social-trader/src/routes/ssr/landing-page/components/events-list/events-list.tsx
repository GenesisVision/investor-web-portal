import "./events-list.scss";

import classNames from "classnames";
import { PlatformEvent } from "gv-api-web";
import React, { useEffect, useState } from "react";
import EventItem from "routes/ssr/landing-page/components/events-list/event-item";
import EventLastItem from "routes/ssr/landing-page/components/events-list/event-last-item";

interface Props {
  className?: string;
  events: PlatformEvent[];
}

const _EventsList: React.FC<Props> = ({ className, events }) => {
  const counts = events.length;
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex(state => (state === 0 ? counts - 1 : state - 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <ul className={classNames("events-list", className)}>
      {events.map((event, index) => (
        <EventItem
          key={index}
          startIndex={startIndex}
          countList={counts}
          index={index}
          {...event}
        />
      ))}
      <EventLastItem />
    </ul>
  );
};

const EventsList = React.memo(_EventsList);
export default EventsList;
