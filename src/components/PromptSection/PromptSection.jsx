import React from "react";

function PromptSection({ children }) {
  return (
    <div className="flex  flex-col items-center mt-8 mb-4 gap-4">
      {children}
    </div>
  );
}

export default PromptSection;
