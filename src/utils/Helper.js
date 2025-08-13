import { useNavigate } from "react-router-dom";

export const getRandomDimensions = (count) => {
  const dimensions = [];
  for (let i = 0; i < count; i++) {
    const width = Math.floor(Math.random() * (600 - 300 + 1)) + 300; // Random width between 300px and 600px
    const height = Math.floor(Math.random() * (800 - 400 + 1)) + 400; // Random height between 400px and 800px
    dimensions.push({ width, height });
  }
  return dimensions;
};

export const getInitialsOfName = (name) => {
  if (!name) return "";

  const splitName = name.split(" ");

  // Only first name or last name provided
  if (splitName.length === 1) {
    return splitName[0].charAt(0);
  }

  // When first name and last name is provided
  if (splitName.length === 2) {
    return `${splitName[0].charAt(0)}${splitName[1].charAt(0)}`;
  }

  // When first name + more than one middle name + last name provided
  if (splitName.length > 2) {
    return `${splitName[0].charAt(0)}${splitName[splitName.length - 1].charAt(
      0
    )}`;
  }
};

/**
 * Returns human-readable "time ago" text from a timestamp (timezone-safe).
 * @param {string|number|Date} timestamp - The record timestamp.
 * @returns {string} Time ago text like "3 hours ago", "Yesterday", "2 weeks ago".
 */
export function timeAgoUTC(timestamp) {
  const nowUTC = Date.now(); // UTC ms
  const createdUTC = new Date(timestamp).getTime(); // UTC ms
  const diffMs = nowUTC - createdUTC;

  const seconds = diffMs / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;

  if (seconds < 60) return "just now";
  if (minutes < 60)
    return `${Math.floor(minutes)} minute${
      Math.floor(minutes) !== 1 ? "s" : ""
    } ago`;
  if (hours < 24)
    return `${Math.floor(hours)} hour${Math.floor(hours) !== 1 ? "s" : ""} ago`;
  if (days < 2) return "Yesterday";
  if (days < 7)
    return `${Math.floor(days)} day${Math.floor(days) !== 1 ? "s" : ""} ago`;
  if (weeks < 5)
    return `${Math.floor(weeks)} week${Math.floor(weeks) !== 1 ? "s" : ""} ago`;

  // fallback for older posts
  const date = new Date(createdUTC);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
