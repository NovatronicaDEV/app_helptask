import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
//Componentes
import ModalDelete from "../UI/ModalDelete";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import EditTarefa from "../UI/EditTarefa";

const VerTarefa = () => {
  const [showModel, setShowModel] = useState(false);
  const [showOfcanva, setShowOfcanva] = useState(false);
  const [tarefas, setTarefaData] = useState([]);
  const { id } = useParams();

  const getTarefaData = async () => {

    try {

      const token = localStorage.getItem("userToken");
      if (!token) {
        return;
      }
      const response = await axios.get(`http://localhost:3000/task/` + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTarefaData(response.data.tasks);
    } catch (error) {

      console.log("Error ao obter dados da tarefa:", error);
    }
  };
  useEffect(() => {
    // Chamada para a API ao montar o componente
    getTarefaData();
  }, []);
  //Modal Delete
  const showModalHandler = () => {
    setShowModel(true);
  };
  //Modal Ofcanva
  const showOfcanvaHandler = () => {
    setShowOfcanva(true);
  };
  // const formattedDate = format(new Date(tarefas[0]?.created_at), "dd-MM-yyyy");
  return (
    <div className="bg-secudaryColor w-full min-h-screen overflow-auto">
      <div className="p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full ">
          <h1 className="text-2xl font-semibold items-center sm:leading-4 leading-6">
            {tarefas[0]?.name}
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
            {tarefas[0]?.status.name}
          </div>

          <div className="col-span-3 grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700">Info</span>
            {tarefas[0]?.description}
          </div>

          <div className="col-span-2 grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700">Cliente</span>
            {tarefas[0]?.clients.name}
          </div>
          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Grupo</span>
            {tarefas[0]?.groups.name}
          </div>
          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Área</span>
            {tarefas[0]?.areas.name}
          </div>
          <div className="col-span-2 grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700">Observação</span>
            {tarefas[0]?.description}
          </div>
          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Canal De Recepção</span>
            {tarefas[0]?.channels.name}
          </div>
          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Tipo de Tarefa</span>
            {tarefas[0]?.types.name}
          </div>

          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Data de Registro</span>
            {tarefas[0]?.created_at}
          </div>
          <div className=" grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700 ">Anexo</span>
            ...
          </div>
          <div className="col-span-2 grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md mt-4">
            <span className="text-xs text-gray-700">Responsavél</span>
            {tarefas[0]?.user.name}
          </div>
        </div>
      </div>
      {showModel && <ModalDelete setShowModal={setShowModel} />}
      {showOfcanva && <EditTarefa setShowOfcanva={setShowOfcanva} />}
    </div>
  );
};

export default VerTarefa;
