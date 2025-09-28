import { Box, Chip } from "@mui/material";

const ThemeChip = ({ label, variant = "outlined", onClick }) => {
  return (
    <Chip
      label={label}
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

const PopularThemes = ({ seletedTheme, setTheme, themes }) => {
  return (
    <Box display="flex" gap={1} flexWrap="wrap" mx={2}>
      {themes.map((t) => {
        return (
          <ThemeChip
            label={t?.prompt}
            variant={seletedTheme.id === t.id ? "filled" : "outlined"}
            onClick={() => setTheme(t)}
          />
        );
      })}
    </Box>
  );
};

export default PopularThemes;
