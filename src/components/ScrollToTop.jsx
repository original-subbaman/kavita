import { ChevronUp } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-blue-500 text-white 
                     p-3 rounded-full shadow-lg hover:bg-blue-600 
                     transition-all duration-600 ease-in-out 
                     active:scale-95 focus:outline-none 
                     flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ChevronUp />
        </button>
      )}
    </>
  );
}

export default ScrollToTop;
