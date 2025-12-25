const WeeklyTheme = ({
  title = "✨ Today's writing theme:",
  writingTheme,
  theme,
}) => {
  return (
    <div
      className={`
        w-full p-6 rounded-2xl overflow-hidden 
       bg-white drop-shadow-md
        bg-gradient-to-r from-[#209cff33] to-[#68e0cf66]`}
    >
      {/* Main Theme  */}
      <div className="text-center relative z-10">
        <p className="text-gray-700 text-sm mb-2">{title}</p>
        <h2 className="text-2xl font-semibold text-radix-green">
          {writingTheme}
        </h2>
      </div>
    </div>
  );
};

export default WeeklyTheme;
