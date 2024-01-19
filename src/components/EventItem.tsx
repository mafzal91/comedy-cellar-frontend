import { useState } from "preact/hooks";
import { format } from "date-fns";
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

type EventItemProps = Show &
  LineUp & {
    isLineUpLoading: boolean;
  };

const Availablity = ({ soldout }: { soldout: boolean }) => {
  if (soldout) {
    return (
      <div className="flex">
        <NoSymbolIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        <br />
        <dd className="text-red-400">Sold Out</dd>
      </div>
    );
  } else {
    return (
      <div className="flex">
        <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        <br />
        <dd className="text-green-400">Available</dd>
      </div>
    );
  }
};

export function EventItem(props: EventItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { showName, description, soldout, roomName, timestamp, acts } = props;
  const dateTime = new Date(timestamp * 1000);
  const dateTimeString = dateTime.toISOString();
  const date = format(dateTime, "MMMM do");
  const time = format(dateTime, "h:mm a");
  console.log(acts);
  // const imageUrl = lineUp?.[0].img;

  return (
    <>
      {/* <img src={imageUrl} alt="" className="h-14 w-14 flex-none rounded-full" /> */}

      <div className="flex-auto">
        <div className="flex">
          <h3
            className="pr-10 font-semibold text-gray-900 xl:pr-0"
            title={description}
          >
            {showName}
          </h3>
          <Availablity soldout={soldout} />
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
      <div className={"flex items-center"}>
        <button className="mt-0.5 rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {isExpanded ? (
            <ChevronUpIcon
              onClick={() => setIsExpanded(false)}
              className="-ml-0.5 h-5 w-5"
              aria-hidden="true"
            />
          ) : (
            <ChevronLeftIcon
              onClick={() => setIsExpanded(true)}
              className="-ml-0.5 h-5 w-5"
              aria-hidden="true"
            />
          )}
        </button>
        <a
          target={"_blank"}
          rel="noreferrer noopener"
          href={`https://www.comedycellar.com/reservations-newyork/?showid=${timestamp}`}
          className="mt-0.5 rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <TicketIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        </a>
      </div>
      {isExpanded && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      )}
    </>
  );
}
