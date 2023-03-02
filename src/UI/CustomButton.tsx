import { FC, ButtonHTMLAttributes } from "react";
import "./customButton.css";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  variant = "primary",
  ...otherProps
}) => {
  return (
    <button
      className={`customButton customButton-${variant}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
