import {
  addMonths,
  format,
  parse,
  parseISO,
  startOfMonth,
  endOfMonth,
} from "date-fns";
export function getDateToday() {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const year = currentDate.getFullYear();
  const formattedDate = `${day < 10 ? "0" : ""}${day}/${
    month < 10 ? "0" : ""
  }${month}/${year}`;

  return formattedDate;
}

export function convertISOTimeToIST(isoTimeStamp) {
  if (!isoTimeStamp) return "";

  const date = new Date(isoTimeStamp);

  const formattedDate = format(date, "dd MMM yyyy, h:mm a", {
    timeZone: "Asia/Kolkata",
  });

  return formattedDate;
}

export function convertISOTimestamp(timestamp) {
  let formattedDate;
  if (timestamp) {
    const date = parseISO(timestamp);
    formattedDate = format(date, "dd-MM-yyyy");
  }
  return formattedDate;
}

export const StaticDatePickerStyle = {
  backgroundColor: "#1e1e1e",
  color: "white",
  "& .MuiDayCalendar-weekDayLabel": { color: "#15803d" },
  ".MuiButtonBase-root": {
    color: "white",
  },
  ".MuiDayPicker-daySelected": {
    backgroundColor: "#15803d", // Background color for selected date
    color: "#fff", // Text color for selected date
    borderRadius: "8px", // Rounded corners for selected date
  },
  ".MuiPickersDay-root:hover": {
    backgroundColor: "#444",
  },
  ".MuiButtonBase-root.Mui-selected": {
    backgroundColor: "#15803d", // Background color for selected date
  },
  ".MuiPickersToolbar-root": {
    color: "white",
    backgroundColor: "#1e1e1e", // Dark mode calendar background
    borderRadius: "12px", // Rounded corners for the calendar
  },
};

export const getStartMonthDate = (monthsFromNow, dateFormat = "yyyy-MM-dd") => {
  const targetDate = addMonths(new Date(), monthsFromNow);
  return format(startOfMonth(targetDate), dateFormat);
};

export const getEndMonthDate = (monthsFromNow, dateFormat = "yyyy-MM-dd") => {
  const targetDate = addMonths(new Date(), monthsFromNow);
  return format(endOfMonth(targetDate), dateFormat);
};
