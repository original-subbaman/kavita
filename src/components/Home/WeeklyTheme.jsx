const WeeklyTheme = ({ theme }) => {
  return (
    <div className="w-[95%] md:w-full md:mx-auto p-4 rounded-2xl bg-[#F5EEDF] border border-gray-300">
      <div className="text-center">
        <p className="text-gray-600 text-sm mb-2">
          ✨ This week's writing theme:
        </p>
        <h2 className="text-2xl font-semibold text-emerald-700">{theme}</h2>
      </div>
    </div>
  );
};

export default WeeklyTheme;
