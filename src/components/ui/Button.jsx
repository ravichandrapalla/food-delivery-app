import clsx from "clsx";

const Button = ({ children, className, variant = "primary", ...props }) => {
  const baseStyles = "w-[calc(100vw-3rem)] px-4 py-2 rounded ";
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-gray-800",
    outline: "border border-gray-300 text-black bg-white hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
