import { TextField } from "@radix-ui/themes";
const CustomTextField = ({
  placeholder,
  inputVariant = "soft",
  size,
  startIcon,
  endIcon,
  onChange,
  inputClass,
  rootClass,
  type,
}) => {
  return (
    <TextField.Root variant={inputVariant} size={size} className={rootClass}>
      {startIcon && (
        <TextField.Slot className="cursor-pointer">{startIcon}</TextField.Slot>
      )}
      <TextField.Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        inputVariant={inputVariant}
        className={inputClass}
      />
      {endIcon && (
        <TextField.Slot className="cursor-pointer">{endIcon}</TextField.Slot>
      )}
    </TextField.Root>
  );
};

export default CustomTextField;
