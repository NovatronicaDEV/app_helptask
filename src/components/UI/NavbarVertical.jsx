import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

//Icons
import { HiMenuAlt3 } from "react-icons/hi";
import {
  AiOutlineUsergroupAdd,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const NavbarVertical = () => {
  const menus = [
    {
      nome: "Meus Clientes",
      link: "clientes",
      icon: AiOutlineUsergroupAdd,
    },
    {
      nome: "Minhas Tarefas",
      link: "tarefas",
      icon: FaTasks,
    },
    {
      nome: "Configurações",
      link: "configuracoes",
      icon: AiOutlineSetting,
    },
  ];
  //Para pegar as URLs
  const location = useLocation();

  const [open, setOpen] = useState(true);
  const [toggle, setToggle] = useState(false);

  return (
    <section>
      <div
        onClick={() => setToggle(!toggle)}
        className={`${
          toggle && "hidden"
        } md:hidden fixed h-10 w-10 mt-6 ml-8 rounded-full bg-primaryColor z-40 text-white p-2.5 cursor-pointer shadow-2xl hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out`}
      >
        <HiMenuAlt3 size={20} />
      </div>

      <div className={`${!toggle && "hidden "} md:block`}>
        <div
          className={`bg-primaryColor text-secudaryColor ${
            open ? "w-64" : "w-16"
          } duration-500 flex flex-col justify-between md:min-h-screen px-4 menu `}
        >
          <div className="mt-8 flex justify-end">
            <div className="hidden md:block">
              <HiMenuAlt3
                size={26}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className="sm:hidden block">
              <AiOutlineClose
                size={26}
                className="cursor-pointer "
                onClick={() => setToggle(!toggle)}
              />
            </div>
          </div>

          <div className={`flex flex-col gap-1 relative `}>
            {menus?.map((menu, index) => (
              <Link
                key={index}
                to={menu.link}
                onClick={() => setToggle(!toggle)}
                className={`group flex items-center gap-3.5 p-2 font-light ${
                  location.pathname == menu.link && "font-medium bg-hoverColor"
                } hover:font-medium hover:bg-hoverColor rounded-md hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${index + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.nome}
                </h2>

                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-hoverColor text-secudaryColor font- whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {menu?.nome}
                </h2>
              </Link>
            ))}
          </div>

          <div className="mb-5 flex flex-col gap-1 relative text-gray-500">
            <Link
              to={"/"}
              className="group flex items-center gap-3.5 p-2 hover:bg-hoverColor hover:text-secudaryColor rounded-md hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
            >
              <div>{React.createElement(AiOutlineLogout, { size: "20" })}</div>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Terminar Sessão
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-hoverColor text-secudaryColor font- whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-400 group-hover:w-fit`}
              >
                Terminar Sessão
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavbarVertical;
