import React, { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "orange" | "black" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "orange",
  fullWidth = false,
  className = "",
  ...props
}) => {
  // Base button styles
  let baseStyles =
    "p-[10px] font-normal text-[18px] leading-[22px] cursor-pointer transition-colors duration-200 focus:outline-none rounded-[24px]";

  // Full width
  if (fullWidth) baseStyles += " w-full";

  // Variant styles
  let variantStyles = "";
  switch (variant) {
    case "orange":
      variantStyles =
        "bg-[#f59f1d] text-black hover:bg-[#d98813]";
      break;
    case "black":
      variantStyles =
        "bg-black text-white border border-black hover:bg-white hover:text-black";
      break;
    case "outline":
      variantStyles =
        "bg-transparent text-black border border-black hover:bg-black hover:text-white";
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className} prod_btn_size`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
