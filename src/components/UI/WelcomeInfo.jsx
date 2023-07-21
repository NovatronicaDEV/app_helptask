import React from "react";
import Rectangle_0 from "../../assets/Rectangle_0.png";
import UserLogin from "../../assets/user_login.png";

const WelcomeInfo = () => {
  return (
    <div className="hidden md:block bg-primaryColor h-screen w-full">
      <div className="flex flex-col justify-between items-center h-full">
        <div className="fixed top-0 right-0">
          <img src={Rectangle_0} alt="" />
        </div>
        <div className="h-1/3 flex flex-col justify-center items-center mt-40">
          <p className="w-1/2 text-secudaryColor text-center">
            “Aproveite a praticidade de ter todas as suas atividades em um só
            lugar e nunca mais se preocupe em esquecer algo importante”
          </p>
          <div className="flex gap-2 mt-3">
            <div className="w-2 h-2 bg-secudaryColor rounded-full"></div>
            <div className="w-2 h-2 bg-secudaryColor rounded-full"></div>
            <div className="w-2 h-2 bg-secudaryColor rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img src={UserLogin} alt="" className=" w-[60%]" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeInfo;
