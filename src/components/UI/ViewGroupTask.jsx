import React from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import {
  MdMovieEdit,
  MdOutlineSettings,
  MdQueryStats,
  MdTimer,
  MdTimerOff,
} from "react-icons/md";

const ViewGroupTask = ({ task }) => {
  return (
    <div className="bg-tdColor bg-opacity-15 rounded-md p-4 cursor-pointer hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out">
      <div className="flex items-center justify-between">
        <div
          className="w-1/3 h-1 rounded-md"
          style={
            task.estado == 1
              ? { backgroundColor: "#27AE60" }
              : task.estado == 2
              ? { backgroundColor: "#F1C40F" }
              : task.estado == 3
              ? { backgroundColor: "#E67E22" }
              : { backgroundColor: "#E74C3C" }
          }
        ></div>
        <div className="flex gap-2 text-primaryColor">
          {task.tempo == 0 ? <MdTimerOff size={18} /> : <MdTimer size={18} />}
          <MdMovieEdit size={18} />
        </div>
      </div>
      <h1 className="font-bold text-[18px] text-black text-opacity-70 mt-4">
        {task.taskname}
      </h1>
      <p className="text-[14px] text-gray-900">
        Aberto por
        <strong className="text-primaryColor"> {task.abertoNome}</strong>,
        atribuido a
        <strong className="text-primaryColor"> {task.atribuidoName} </strong>-{" "}
        <small>({task.dataAtribuicao})</small>
      </p>
      <div className="flex items-center justify-between mt-4">
        <div
          className={`${
            task.estado == 1
              ? "text-[#27AE60]"
              : task.estado == 2
              ? "text-[#F1C40F]"
              : task.estado == 3
              ? "text-[#E67E22]"
              : "text-[#E74C3C]"
          } flex gap-2 font-medium text-[14px]`}
        >
          <AiOutlineBarChart size={18} />
          {task.estado == 1
            ? "Fechado"
            : task.estado == 2
            ? "Em Andamento"
            : task.estado == 3
            ? "Em Espera"
            : "Por Atribuir"}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className={`flex gap-2 text-[14px] text-gray-700`}>
          <MdQueryStats size={18} />
          {task.faze}
        </div>
        <div className="flex gap-2 text-[14px] text-gray-700">
          <MdOutlineSettings size={18} />
          {task.telefone}
        </div>
      </div>
      <small className="mt-6 flex justify-end text-gray-500 text-[10px]">
        ({task.dataCriacao})
      </small>
    </div>
  );
};

export default ViewGroupTask;
