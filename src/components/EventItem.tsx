import { format } from "date-fns";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { Show } from "../types";

type EventItemProps = Show;

export function EventItem(props: EventItemProps) {
  const { showName, description, soldout, roomName, timestamp } = props;
  const dateTime = new Date(timestamp * 1000);
  const dateTimeString = dateTime.toISOString();
  const date = format(dateTime, "EEEE, MMMM do");
  const time = format(dateTime, "h:mm a");
  return (
    <>
      {/* <img src={imageUrl} alt="" className="h-14 w-14 flex-none rounded-full" /> */}
      <div className="flex-auto">
        <h3
          className="pr-10 font-semibold text-gray-900 xl:pr-0"
          title={description}
        >
          {showName}
        </h3>
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
    </>
  );
}
