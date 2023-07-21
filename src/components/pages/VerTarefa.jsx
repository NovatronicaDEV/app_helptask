import React, { useState } from "react";

//Componentes
import ModalDelete from "../UI/ModalDelete";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import EditTarefa from "../UI/EditTarefa";

const VerTarefa = () => {
  const [showModel, setShowModel] = useState(false);
  const [showOfcanva, setShowOfcanva] = useState(false);
  //Modal Delete
  const showModalHandler = () => {
    setShowModel(true);
  };
  //Modal Ofcanva
  const showOfcanvaHandler = () => {
    setShowOfcanva(true);
  };
  return (
    <div className="bg-secudaryColor w-full min-h-screen overflow-auto">
      <div className="p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full ">
          <h1 className="text-2xl font-semibold items-center sm:leading-4 leading-6">
            Samsung
          </h1>
          <div className="flex items-center sm:justify-end gap-2">
            <button
              onClick={() => showOfcanvaHandler()}
              className="bg-primaryColor text-secudaryColor flex gap-2 rounded-md hover:bg-hoverColor px-4 py-2 items-center shadow-2xl hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
              type="button"
            >
              <AiOutlineEdit /> Editar
            </button>

            <button
              className="bg-[#EF5858] text-secudaryColor flex gap-2 rounded-md hover:bg-[#E74C3C] px-4 py-2 items-center shadow-2xl hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
              onClick={() => showModalHandler()}
            >
              <AiOutlineDelete /> Apagar
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4 mt-4 text-sm border-t-2 border-gray-300">
          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Estado</span>
            ...
          </div>

          <div className="col-span-3 grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700">Info</span>
            ...
          </div>

          <div className="col-span-2 grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700">Assunto</span>
            ...
          </div>
          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Grupo</span>
            ...
          </div>
          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Área</span>
            ...
          </div>
          <div className="col-span-2 grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700">Observação</span>
            ...
          </div>
          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Canal De Recepção</span>
            ...
          </div>
          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Tipo de Tarefa</span>
            ...
          </div>

          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Data de Registro</span>
            ...
          </div>
          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Anexo</span>
            ...
          </div>
          <div className="col-span-2 grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700">Cliente</span>
            ...
          </div>
        </div>
      </div>
      {showModel && <ModalDelete setShowModal={setShowModel} />}
      {showOfcanva && <EditTarefa setShowOfcanva={setShowOfcanva} />}
    </div>
  );
};

export default VerTarefa;
