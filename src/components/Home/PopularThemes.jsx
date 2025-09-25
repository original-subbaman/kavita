import { Box, Chip } from "@mui/material";
import { useState } from "react";

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

const ThemeChip = ({ label, variant = "outlined", onClick }) => {
  const randomColor = getRandomColor();

  return (
    <Chip
      label={label}
      size="small"
      clickable
      variant={variant}
      onClick={onClick}
      sx={{
        backgroundColor: variant === "filled" ? "#F76B15" : null,
        color: "white",
        fontWeight: 500,
      }}
    />
  );
};

const PopularThemes = ({
  seletedTheme,
  setTheme,
  themes = ["Love", "Loss", "Hope", "Friendship"],
}) => {
  console.log("🚀 ~ PopularThemes ~ seletedTheme:", seletedTheme);
  return (
    <Box display="flex" gap={1} flexWrap="wrap">
      {themes.map((t) => {
        return (
          <ThemeChip
            label={t}
            variant={seletedTheme === t ? "filled" : "outlined"}
            onClick={() => setTheme(t)}
          />
        );
      })}
    </Box>
  );
};

export default PopularThemes;
