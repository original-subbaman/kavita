import { format, parse, parseISO } from "date-fns";
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
  const date = new Date(isoTimeStamp);

  const formattedDate = format(date, "dd MMM yyyy, HH:mm:ss", {
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
