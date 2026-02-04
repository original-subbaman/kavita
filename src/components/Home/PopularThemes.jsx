import { Box, Chip } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useAppTheme } from "../../hooks/useAppTheme";
import { cn } from "../../utils/Helper";
import { Button } from "../ui/Button";

const ThemeChip = ({ theme, variant = "outlined", isSelected, onClick }) => {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={cn(
        "gap-2 relative",
        isSelected
          ? "bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {theme}
    </Button>
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
    <Box display="flex" gap={1} flexWrap="wrap">
      {themes.map((t) => {
        const isSelected = seletedTheme?.id === t.id;
        return (
          <AnimatePresence key={t.id}>
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={chipVariants}
              style={{ display: "inline-block" }}
            >
              <ThemeChip
                theme={t?.prompt}
                variant={isSelected ? "filled" : "outlined"}
                isSelected={isSelected}
                onClick={() => setTheme(t)}
              />
            </motion.div>
          </AnimatePresence>
        );
      })}
    </Box>
  );
};

export default PopularThemes;
