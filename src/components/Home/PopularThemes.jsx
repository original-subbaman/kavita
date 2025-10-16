import { Box, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

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

const chipVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  show: (i = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
      delay: i * 0.09,
    },
  }),
};

const PopularThemes = ({ seletedTheme, setTheme, themes }) => {
  return (
    <Box display="flex" gap={1} flexWrap="wrap" mx={2}>
      {themes.map((t, i) => (
        <AnimatePresence key={t.id}>
          <motion.div
            custom={i}
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
