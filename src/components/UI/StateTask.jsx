import React from "react";

const StateTask = ({ cor, estado }) => {
  return (
    <div className="flex justify-between items-center gap-3">
      <div
        className="h-4 w-4 rounded-full"
        style={{ backgroundColor: cor }}
      ></div>
      <div className="font-normal text-[14px]">{estado}</div>
    </div>
  );
};

export default StateTask;
