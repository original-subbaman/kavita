const WeeklyTheme = ({
  title = "✨ Today's writing theme:",
  writingTheme,
  theme,
}) => {
  return (
    <div
      className={`relative 
        w-full p-6 rounded-2xl overflow-hidden 
        border border-gray-300 ${
          theme === ""
            ? "bg-[#F5EEDF]/60 backdrop-blur-sm"
            : "bg-white/80 backdrop-blur-sm"
        }`}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -right-10 w-40 h-40 bg-emerald-200 rounded-full blur-2xl opacity-40"></div>
        <div className="absolute bottom-0 -left-10 w-52 h-52 bg-amber-200 rounded-full blur-2xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-sky-200 rounded-full blur-2xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      {/* Main Theme  */}
      <div className="text-center relative z-10">
        <p className="text-gray-600 text-sm mb-2">{title}</p>
        <h2 className="text-2xl font-semibold text-emerald-700">
          {writingTheme}
        </h2>
      </div>
    </div>
  );
};

export default WeeklyTheme;
