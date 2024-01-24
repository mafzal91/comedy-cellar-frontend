import { useState } from "preact/hooks";
import { useQuery } from "react-query";
import { Calendar } from "../../components/Calendar";
import { Event } from "../../components/Event";
import { EventLoader } from "../../components/EventLoader";
import { TODAY } from "../../utils/date";
import { fetchShowDetails, fetchLineUp } from "../../utils/api";

import { Show, LineUp } from "../../types";

function Loader() {
  return (
    <ol className="divide-y divide-gray-100 text-sm leading-6">
      {new Array(10).fill(0).map((_, index) => (
        <li
          key={index}
          className="relative flex space-x-6 xl:static py-4 first:pt-0 last:pb-0 "
        >
          <EventLoader />
        </li>
      ))}
    </ol>
  );
}

export function Home() {
  // TODO: make selected date the timestamp and not the formated string YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(TODAY);

  const showData = useQuery<Show[]>(
    ["shows", selectedDate],
    async () => {
      const showData = await fetchShowDetails({ date: selectedDate });

      return showData.shows;
    },
    {
      enabled: !!selectedDate,
      refetchOnWindowFocus: false,
    }
  );

  const lineUpData = useQuery<LineUp[]>(
    ["lineUps", selectedDate],
    async () => {
      const lineUpsData = await fetchLineUp({ date: selectedDate });

      return lineUpsData.lineUps;
    },
    {
      enabled: !!selectedDate,
      refetchOnWindowFocus: false,
    }
  );

  const findLineUp = (timestamp: number) => {
    return lineUpData.data.find((lineUp) => lineUp.timestamp === timestamp);
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        Upcoming Shows
      </h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-1 lg:col-end-5 lg:row-start-1 lg:mt-9">
          <Calendar value={selectedDate} onChange={setSelectedDate} />
        </div>

        <div className="mt-4 overflow-hidden rounded-lg bg-white shadow ring-1 ring-gray-200 lg:col-span-7 xl:col-span-8 ">
          <div className="px-4 py-5 sm:p-4">
            {showData.isLoading ? (
              <Loader />
            ) : (
              <ol className="divide-y divide-gray-100 text-sm leading-6">
                {showData.data.map((show) => {
                  return (
                    <li
                      key={show.id}
                      className="relative xl:static p-4 first:pt-0 last:pb-0"
                    >
                      <Event
                        show={show}
                        lineUp={
                          (!lineUpData.isLoading &&
                            findLineUp(show.timestamp)) ?? {
                            reservationUrl: "",
                            timestamp: 0,
                            acts: [],
                          }
                        }
                        isLineUpLoading={lineUpData.isLoading}
                      />
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
