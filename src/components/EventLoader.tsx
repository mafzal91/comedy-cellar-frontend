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

export function EventLoader() {
  return (
    <div class="animate-pulse grow flex space-x-4">
      <div class="flex-1 space-y-4 py-1">
        <div class="grid grid-cols-6 gap-4">
          <div class="h-4 bg-gray-300	rounded col-span-4" />
        </div>

        <div class="space-y-3">
          <div class="grid grid-cols-6 gap-4 divide-x divide-gray-100">
            <div class="h-4 bg-gray-300	rounded col-span-2" />
            {/* <div class="xl:border-l xl:border-gray-400 xl:border-opacity-50" /> */}
            <div class="h-4 bg-gray-300 rounded col-span-2" />
          </div>
        </div>
      </div>

      <div className="mt-0.5 flex items-center">
        <button
          disabled
          className="mr-2 rounded bg-gray-300 px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
        >
          <div className="-ml-0.5 h-5 w-5"></div>
          {/* <ChevronLeftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" /> */}
        </button>
        <span
          target={"_blank"}
          rel="noreferrer noopener"
          className="rounded bg-gray-300 px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
        >
          <div className="-ml-0.5 h-5 w-5"></div>
        </span>
      </div>
    </div>
  );
}
