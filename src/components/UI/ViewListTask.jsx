import React from "react";
import { format } from 'date-fns';
import { AiOutlineBarChart } from "react-icons/ai";
import { MdTimerOff, MdTimer, MdMovieEdit } from "react-icons/md";

const ViewListTask = ({ task }) => {
  const formattedDate = format(new Date(task.created_at), "dd-MM-yyyy");
  const formatYear = format(new Date(task.created_at), "yyyy")
  return (
    <div
      className={`bg-tdColor bg-opacity-15 grid md:grid-cols-6 sm:grid-cols-2 gap-4 items-center rounded-md px-4 py-3  text-[14px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out ${task.estado == 4 && "border-l-[6px] border-[#E74C3C]"
        }`}
    >
      <div className="md:col-span-1 sm:col-span-2 text-primaryColor">
        #{task.id}/{formatYear}
        </div>
      <div className="md:col-span-1 sm:col-span-2">
        <strong className="text-darkColor"> {task.name}</strong>,
      </div>
      <div className="md:col-span-1 sm:col-span-2">
        <strong className="text-darkColor"> {task.clients.name}</strong>,
      </div>
      <div
        className={`${task.status.id == 1
            ? "text-[#27AE60]"
            : task.status.id == 2
              ? "text-[#F1C40F]"
              : task.status.id == 3
                ? "text-[#E67E22]"
                : "text-[#E74C3C]"
          } flex gap-4 font-medium items-center col-span-1`}
      >
        <AiOutlineBarChart size={20} />
        {task.status.id == 1
          ? "Fechado"
          : task.status.id == 2
            ? "Em Andamento"
            : task.status.id == 3
              ? "Em Espera"
              : "Por Atribuir"}
      </div>
      <div className="flex gap-4 items-cente col-span-1">
        {task.total == 0 ? <MdTimerOff size={20} /> : <MdTimer size={20} />}
        <p className={`${task.total == 0 ? "text-[#E74C3C]" : ""}`}>
          {task.total}
          <small> Horas{task.total == 0 ? "(100%)" : ""}</small>
        </p>
      </div>
      <div className="flex justify-between items-center md:col-span-1 sm:col-span-2">
        <small>{formattedDate}</small>
        <MdMovieEdit size={20} className="text-primaryColor " />
      </div>
      <div></div>
    </div>
  );
};

export default ViewListTask;
