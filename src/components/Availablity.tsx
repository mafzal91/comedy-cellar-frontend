import { NoSymbolIcon, CheckIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export const Availablity = ({
  isEventOver,
  soldout,
  isNearingCapacity,
}: {
  isEventOver: boolean;
  soldout: boolean;
  isNearingCapacity: boolean;
}) => {
  let hoverText = "Seating is available";
  let Component = CheckIcon;
  let color = "text-green-400";
  let text = "Available";

  if (isNearingCapacity) {
    Component = ExclamationCircleIcon;
    color = "text-yellow-400";
    hoverText = "This show is almost sold out";
  }

  if (isEventOver || soldout) {
    Component = NoSymbolIcon;
    color = "text-red-400";
    text = "Evt Ovr.";
    hoverText = "This show is over";
    if (soldout) {
      text = "Sold Out";
      hoverText = "This show is sold out";
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Component
        className={`h-8 w-8 ${color}`}
        aria-hidden="true"
        title={hoverText}
      />
      <span className={color}>{text}</span>
    </div>
  );
};
