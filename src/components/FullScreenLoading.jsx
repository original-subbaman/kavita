import React from "react";
import Loading from "./Loading";
function FullScreenLoading(props) {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-aurora">
      <Loading />
    </div>
  );
}

export default FullScreenLoading;
