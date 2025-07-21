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
