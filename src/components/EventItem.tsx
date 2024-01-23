import { useState } from "preact/hooks";
import { format, isPast } from "date-fns";
import {
  CalendarIcon,
  MapPinIcon,
  NoSymbolIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { TicketIcon } from "@heroicons/react/24/outline";
import { Show, LineUp } from "../types";

type EventItemProps = {
  show: Show;
  lineUp: LineUp;
  isLineUpLoading: boolean;
};

const Availablity2 = ({
  isEventOver,
  soldout,
}: {
  isEventOver: boolean;
  soldout: boolean;
}) => {
  let Component = CheckIcon;
  let color = "text-green-400";
  let text = "Available";

  if (isEventOver || soldout) {
    Component = NoSymbolIcon;
    color = "text-red-400";
    text = isEventOver ? "Event over" : "Sold Out";
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <Component className={`h-8 w-8 ${color}`} aria-hidden="true" />
      <span className={color}>{text}</span>
    </div>
  );
};

export function EventItem(props: EventItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { showName, description, soldout, roomName, timestamp } = props.show;
  const { acts } = props.lineUp;
  const dateTime = new Date(timestamp * 1000);
  const dateTimeString = dateTime.toISOString();
  const date = format(dateTime, "MMMM do");
  const time = format(dateTime, "h:mm a");
  const isEventOver = isPast(dateTime);

  return (
    <>
      <Availablity2 soldout={soldout} isEventOver={isEventOver} />

      <div className="flex-auto">
        <div className="flex">
          <h3
            className="pr-10 font-semibold text-gray-900 xl:pr-0"
            title={description}
          >
            {showName}
          </h3>
        </div>
        <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
          <div className="flex items-start space-x-3">
            <dt className="mt-0.5">
              <span className="sr-only">Date</span>
              <CalendarIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd>
              <time dateTime={dateTimeString}>
                {date} at {time}
              </time>
            </dd>
          </div>
          <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
            <dt className="mt-0.5">
              <span className="sr-only">Location</span>
              <MapPinIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd>{roomName}</dd>
          </div>
        </dl>
      </div>
      <div className={"mt-0.5 flex items-center"}>
        <button
          className="mr-2 rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUpIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          ) : (
            <ChevronLeftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          )}
        </button>
        {!isEventOver && (
          <a
            target={"_blank"}
            rel="noreferrer noopener"
            href={`https://www.comedycellar.com/reservations-newyork/?showid=${timestamp}`}
            className="mt-0.5 rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <TicketIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          </a>
        )}
      </div>
      {isExpanded && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      )}
    </>
  );
}
