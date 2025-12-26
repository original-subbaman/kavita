import { Box, Text, TextField } from "@radix-ui/themes";
import { Controller } from "react-hook-form";
import { useAppTheme } from "../hooks/useAppTheme";
const CustomTextField = ({
  name,
  placeholder,
  control,
  inputVariant = "soft",
  size,
  startIcon,
  endIcon,
  onChange,
  onBlur: onFocusLoss,
  inputClass,
  rootClass,
  rules,
  type,
  error,
}) => {
  const { mode } = useAppTheme();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <Box className={rootClass}>
            <TextField.Root variant={inputVariant} size={size}>
              {startIcon && (
                <TextField.Slot
                  className={`cursor-pointer ${
                    mode === "dark" ? " text-white" : "text-black"
                  }`}
                >
                  {startIcon}
                </TextField.Slot>
              )}
              <TextField.Input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value ?? ""}
                onBlur={onBlur}
                className={`${inputClass} ${
                  mode === "dark"
                    ? "text-white placeholder:text-gray-300"
                    : "text-black placeholder:text-gray-500"
                }`}
              />
              {endIcon && (
                <TextField.Slot className="cursor-pointer">
                  {endIcon}
                </TextField.Slot>
              )}
            </TextField.Root>
            {error && <Text className="text-red-500 text-sm">{error}</Text>}
          </Box>
        );
      }}
    />
  );
};

export default CustomTextField;
