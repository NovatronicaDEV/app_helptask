import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

const Info = () => {
  return (
    <div className="pr-8 right-0 top-64 fixed">
      <div className="flex flex-col bg-primaryColor rounded-full shadow-lg">
        <div className="w-12 h-12 flex items-center justify-center  bg-secudaryColor text-primaryColor rounded-full mb-5 cursor-pointer scale-[103%]">
          <BiUserCircle size={20} />
        </div>
        <div className="w-12 h-12 flex items-center justify-center bg-secudaryColor text-primaryColor rounded-full cursor-pointer scale-[103%]">
          <AiOutlineBell size={20} />
        </div>
      </div>
    </div>
  );
};

export default Info;
