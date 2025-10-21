// Button.tsx
import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "third";
  text: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  text,
  onClick,
}) => {
  const baseStyles = `
  rounded-[1.25rem] 
  font-playfair font-semibold
  px-6 py-2 
  cursor-pointer
  flex items-center justify-center
  w-auto
  transition-transform duration-200 ease-in-out
  transform
  hover:scale-105
`;

  const variantKey: NonNullable<ButtonProps["variant"]> = variant ?? "primary";

  const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-[#D3AF37] text-black border-none",
    secondary: "bg-white text-black border border-black",
    third: "bg-white text-black border border-black",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variantKey]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
