import { Box, Text, TextField } from "@radix-ui/themes";
import { Controller } from "react-hook-form";
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
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={""}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <Box className={rootClass}>
            <TextField.Root variant={inputVariant} size={size}>
              {startIcon && (
                <TextField.Slot className="cursor-pointer">
                  {startIcon}
                </TextField.Slot>
              )}
              <TextField.Input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                className={inputClass}
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
