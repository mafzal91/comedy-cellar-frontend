import { FunctionalComponent, JSX } from "preact";
import clsx from "clsx";

// Define only the custom props in your interface
interface CustomButtonProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

// Use Preact's JSXInternal.HTMLAttributes for button element attributes
type ButtonProps = CustomButtonProps & JSX.HTMLAttributes<HTMLButtonElement>;

export const Button: FunctionalComponent<ButtonProps> = ({
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseClasses =
    "rounded bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 font-semibold";

  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-2 py-1 text-sm",
    md: "px-2.5 py-1.5 text-sm",
    lg: "px-3 py-2 text-sm",
    xl: "px-3.5 py-2.5 text-sm",
  };

  // Combine classes using clsx
  const buttonClasses = clsx(
    baseClasses,
    sizeClasses[size],
    className // Allow custom class names
  );

  return (
    <button
      type="button"
      className={buttonClasses}
      {...props} // Spread all other props to the button element
    >
      {children}
    </button>
  );
};
