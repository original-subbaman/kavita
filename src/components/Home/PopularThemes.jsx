import { Box, Chip } from "@mui/material";

const COLORS = [
  "#E57373", // red
  "#64B5F6", // blue
  "#81C784", // green
  "#FFD54F", // yellow
  "#BA68C8", // purple
  "#4DB6AC", // teal
  "#FF8A65", // orange
  "#A1887F", // brown
  "#90A4AE", // gray
  "#F06292", // pink
];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const ThemeChip = ({ label, color }) => {
  const randomColor = getRandomColor();

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        backgroundColor: color || randomColor,
        color: "white",
        border: "none",
        fontWeight: 500,
      }}
    />
  );
};

const PopularThemes = () => {
  return (
    <Box display="flex" gap={1} flexWrap="wrap">
      <ThemeChip label="Love" color={COLORS[0]} />
      <ThemeChip label="Loss" />
      <ThemeChip label="Hope" />
      <ThemeChip label="Friendship" />
    </Box>
  );
};

export default PopularThemes;
