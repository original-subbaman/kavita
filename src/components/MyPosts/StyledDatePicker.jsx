import { DatePicker, pickersLayoutClasses } from "@mui/x-date-pickers";
const StyledDatePicker = ({ value, onChanged, ...rest }) => {
  return (
    <DatePicker
      value={value}
      format="DD/MM/YYYY"
      PopperProps={{
        sx: { "&.MuiPickersPopper-root": { border: "4px solid red" } },
      }}
      sx={{
        background: "#132d23",
        border: "2px solid #2f7c57",
        borderRadius: "5px",
        "& .MuiInputBase-input": {
          color: "white",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "#2f7c57", // Change to your desired color
        },
        "& .MuiInputAdornment-root .MuiSvgIcon-root": {
          color: "#2f7c57", // Change calendar icon color here
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "transparent", // Remove focus border
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
              backgroundColor: "#1e1e1e", // Dark mode calendar background
              color: "white",
              "& .MuiButtonBase-root": {
                color: "white",
              },

              "& .MuiDayCalendar-weekDayLabel": { color: "#15803d" },
            },
          },
        },
      }}
      {...rest}
    />
  );
};

export default StyledDatePicker;
