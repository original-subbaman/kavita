function PromptSection({ children }) {
  return (
    <div className="mb-2 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/20 rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-accent/5 rounded-full translate-y-1/2" />
      {children}
    </div>
  );
}

export default PromptSection;
