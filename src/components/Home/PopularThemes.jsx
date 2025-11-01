import { Box, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useAppTheme } from "../../hooks/useAppTheme";

const ThemeChip = ({ label, variant = "outlined", onClick }) => {
  const { mode } = useAppTheme();

  const notSelectedColor =
    mode === "dark" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.87)";

  const filledBg = "#F76B15";
  const filledHover = "#F98944";

  return (
    <Chip
      label={label}
      clickable
      variant={variant}
      onClick={onClick}
      sx={{
        backgroundColor: variant === "filled" ? filledBg : "transparent",
        color: variant === "filled" ? "#FFFFFF" : notSelectedColor,
        transition: "background-color 150ms ease",
        "&:hover": {
          backgroundColor: variant === "filled" ? filledHover : undefined,
        },
      }}
    />
  );
};

const chipVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
};

const PopularThemes = ({ seletedTheme, setTheme, themes }) => {
  return (
    <Box display="flex" gap={1} flexWrap="wrap" mx={2}>
      {themes.map((t) => (
        <AnimatePresence key={t.id}>
          <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={chipVariants}
            style={{ display: "inline-block" }}
          >
            <ThemeChip
              label={t?.prompt}
              variant={seletedTheme?.id === t.id ? "filled" : "outlined"}
              onClick={() => setTheme(t)}
            />
          </motion.div>
        </AnimatePresence>
      ))}
    </Box>
  );
};

export default PopularThemes;
