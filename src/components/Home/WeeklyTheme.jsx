const WeeklyTheme = ({
  title = "✨ Today's writing theme:",
  writingTheme,
  theme,
}) => {
  return (
    <div
      className={`
        w-full p-6 rounded-2xl overflow-hidden 
        border border-gray-300 bg-white`}
    >
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
