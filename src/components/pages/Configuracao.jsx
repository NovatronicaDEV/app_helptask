import React from "react";

import { BiImport } from "react-icons/bi";
import { AiOutlineUsergroupAdd, AiOutlineSchedule } from "react-icons/ai";
import { RiFolderReceivedLine } from "react-icons/ri";
import { TiGroupOutline } from "react-icons/ti";
import { BsListTask } from "react-icons/bs";

const Configuracao = () => {
  const config = [
    {
      texto: "Importar Clientes",
      icon: BiImport,
    },
    {
      texto: "Utilizadores",
      icon: AiOutlineUsergroupAdd,
    },
    {
      texto: "Canal de Recepção",
      icon: RiFolderReceivedLine,
    },
    {
      texto: "Grupos",
      icon: TiGroupOutline,
    },
    {
      texto: "Tipos de Tarefas",
      icon: BsListTask,
    },
    {
      texto: "Agendas",
      icon: AiOutlineSchedule,
    },
  ];
  return (
    <section className="bg-secudaryColor w-full min-h-screen overflow-auto">
      <div className="p-8">
        <h2 className="font-light text-3xl opacity-70 flex justify-end md:justify-start">
          CONFIGURAÇÕES
        </h2>

        <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 mt-5">
          {config?.map((conf, index) => (
            <div
              key={index}
              className="bg-primaryColor bg-opacity-40 rounded-md flex flex-col justify-center items-center p-4  cursor-pointer transition hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
            >
              <div className="bg-primaryColor p-2 rounded-md text-secudaryColor">
                {React.createElement(conf?.icon, { size: "50" })}
              </div>
              <p className="mt-2 text-secudaryColor hover:font-semibold font-medium text-center">
                {conf.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Configuracao;
