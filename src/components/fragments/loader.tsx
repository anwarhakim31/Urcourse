import React from "react";

const Loader = () => {
  return (
    <div className=" flex items-center justify-center w-full gap-2">
      <div className="w-3 h-3 rounded-full bg-indigo-700 animate-bounce"></div>
      <div className="w-3 h-3 rounded-full bg-indigo-700  animate-bounce delay-200"></div>
      <div className="w-3 h-3 rounded-full bg-indigo-700  animate-bounce"></div>
    </div>
  );
};

export default Loader;
