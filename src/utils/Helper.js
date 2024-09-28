export const getRandomDimensions = (count) => {
  const dimensions = [];
  for (let i = 0; i < count; i++) {
    const width = Math.floor(Math.random() * (600 - 300 + 1)) + 300; // Random width between 300px and 600px
    const height = Math.floor(Math.random() * (800 - 400 + 1)) + 400; // Random height between 400px and 800px
    dimensions.push({ width, height });
  }
  return dimensions;
};
