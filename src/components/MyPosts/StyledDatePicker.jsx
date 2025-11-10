import { DatePicker, pickersLayoutClasses } from "@mui/x-date-pickers";

const StyledDatePicker = ({ value, onChanged, mode = "dark", ...rest }) => {
  const isDark = mode === "dark";
  return (
    <DatePicker
      value={value}
      format="DD/MM/YYYY"
      PopperProps={{
        sx: {
          "&.MuiPickersPopper-root": {
            border: isDark ? "4px solid red" : "4px solid #e5e7eb", // light gray border
          },
        },
      }}
      sx={{
        background: isDark ? "#132d23" : "#fff", // white background
        border: `2px solid ${isDark ? "#2f7c57" : "#e5e7eb"}`, // light gray border
        borderRadius: "5px",
        "& .MuiInputBase-input": {
          color: isDark ? "white" : "#222", // black text
        },
        "& .MuiInputBase-input::placeholder": {
          color: isDark ? "#2f7c57" : "#888", // light gray placeholder
        },
        "& .MuiInputAdornment-root .MuiSvgIcon-root": {
          color: isDark ? "#2f7c57" : "#888", // light gray icon
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "transparent",
          },
        },
      }}
      slotProps={{
        textField: {
          size: "small",
        },
        layout: {
          sx: {
            [`.${pickersLayoutClasses.contentWrapper}`]: {
              backgroundColor: isDark ? "#1e1e1e" : "#fff", // white background
              color: isDark ? "white" : "#222", // black text
              "& .MuiButtonBase-root": {
                color: isDark ? "white" : "#222", // black button text
              },
              "& .MuiDayCalendar-weekDayLabel": {
                color: isDark ? "#15803d" : "#888", // light gray label
              },
            },
          },
        },
      }}
      {...rest}
    />
  );
};

export default StyledDatePicker;
