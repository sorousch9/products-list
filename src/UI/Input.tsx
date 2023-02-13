import { useState, useEffect } from "react";

const TimeoutedInput = ({
  value: initialValue,
  onChange,
  timeoutMs = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  timeoutMs?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, timeoutMs);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
export default TimeoutedInput;
