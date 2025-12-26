import quill from "../assets/quill.png";

const AppLogo = () => {
  return (
    <div
      className="cursor-pointer hover:bg-transparent 
        hover:shadow-none md:flex md:items-center 
        md:gap-1 font-primary text-radix-green 
        text-2xl font-bold"
    >
      Kavita
      <img src={quill} className="w-6 h-6" />
    </div>
  );
};

export default AppLogo;
