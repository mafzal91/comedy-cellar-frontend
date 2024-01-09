import { useState } from "preact/hooks";
import { useQuery } from "react-query";
import { Calendar } from "../../components/Calendar";
import { EventItem } from "../../components/EventItem";
import { fetchShowDetails } from "../../utils/api";

import { Show } from "../../types";

const today = new Date().toISOString().slice(0, 10);

export function Home() {
  // TODO: make selected date the timestamp and not the formated string YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(today);

  const { isLoading, data } = useQuery<Show[]>(
    ["shows", selectedDate],
    async () => {
      const { shows } = await fetchShowDetails({ date: selectedDate });
      return shows;
    },
    {
      enabled: !!selectedDate,
    }
  );

  return (
    <div className="px-4 py-5 sm:p-6">
      <h2 className="text-base font-semibold leading-6 text-gray-900">
        Upcoming Shows
      </h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <Calendar value={selectedDate} onChange={setSelectedDate} />
        </div>

        <div className="mt-4 overflow-hidden rounded-lg bg-white shadow ring-1 ring-gray-200 lg:col-span-7 xl:col-span-8 ">
          <div className="px-4 py-5 sm:p-6">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <ol className="divide-y divide-gray-100 text-sm leading-6">
                {data.map((show) => (
                  <li
                    key={show.id}
                    className="relative flex space-x-6 xl:static"
                  >
                    <EventItem {...show} />
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
