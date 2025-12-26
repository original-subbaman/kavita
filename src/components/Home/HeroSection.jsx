import { motion } from "framer-motion";
import FlowerBook from "../../assets/flower-book.png";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useMediaQuery } from "@mui/material";

const textVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  }),
};

const HeroSection = ({ onReadPoemsClick, onSubmitYoursClick }) => {
  const { mode } = useAppTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isDarkMode = mode === "dark";
  return (
    <section
      className={`flex items-center justify-center ${
        isMobile ? "h-full" : "min-h-[100vh]"
      } `}
    >
      {/* Content */}
      <div className="text-center max-w-2xl flex flex-col items-center justify-center md:mb-40">
        <div className="relative flex flex-col items-center group">
          <a
            href="https://www.freepik.com/free-vector/book-with-flowers-book-day-icon_89158245.htm#fromView=image_search_similar&page=1&position=0&uuid=157381af-cd03-4966-a3c8-7854d7f4e2b8&query=open+book?log-in=google"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-gray-400 mb-2 hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Image by stockgiu on Freepik
          </a>
          <motion.img
            src={FlowerBook}
            alt="Open book with flowers illustration"
            className="mx-auto mb-4 w-40 md:w-56"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        <motion.h1
          className={`text-4xl md:text-6xl font-serif font-semibold ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          custom={0}
        >
          <span className="text-radix-green">Poetry</span> for Sikkim
        </motion.h1>

        <motion.p
          className={`mt-4 text-lg md:text-xl ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } leading-relaxed`}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          custom={1}
        >
          Words inspired by mountains, mist, and quiet moments.
        </motion.p>

        <div className="mt-8 flex justify-center gap-4">
          <motion.button
            onClick={onReadPoemsClick}
            className="px-6 py-3 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={2}
          >
            Read Poems
          </motion.button>

          <motion.button
            onClick={onSubmitYoursClick}
            className={`px-6 py-3 rounded-full border border-emerald-600 text-sm font-medium transition
              ${
                isDarkMode
                  ? "bg-[#222] text-emerald-200 hover:bg-emerald-900 hover:text-white"
                  : "text-emerald-700 hover:bg-emerald-50"
              }`}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            custom={3}
          >
            Submit Yours
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
