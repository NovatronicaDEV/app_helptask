import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//Icons
import { AiOutlineDelete, AiOutlineEdit, AiOutlineUser } from "react-icons/ai";

//Image
import Verificado from "../../assets/Verificado.png";

//Componentes
import PieChartClienteTarefa from "../UI/PieChartClienteTarefa";
import EditCliente from "../UI/EditCliente";
import ModalDelete from "../UI/ModalDelete";

const VerCliente = () => {
  const [showModel, setShowModel] = useState(false);
  const [showOfcanva, setShowOfcanva] = useState(false);
  const [clients, setClienteData] = useState([]);
  const { id } = useParams();

    // Obtém os dados do cliente da API pelo ID
    const getClienteData = async () => {
      try {
        const token = localStorage.getItem("userToken");
      
        if (!token) {
          // Lidar com o cenário em que o token não está disponível
          return;
        }
        
        const response = await axios.get(`http://localhost:3000/clients/`+id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClienteData(response.data.clients); // Armazena os dados do cliente no estado
      } catch (error) {
        navigate("/pages/login");
        console.error("Erro ao obter dados do cliente:", error);
      }
    };
  
    useEffect(() => {
      // Chamada para a API ao montar o componente
      getClienteData();
    }, []);
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
        <div className="flex flex-col md:flex-row gap-2">
          <div className="bg-primaryColor text-white opacity-50 rounded-md w-28 h-28 flex items-center justify-center">
            <AiOutlineUser size={50} />
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full">
            <div>
              <h1 className="flex gap-2 text-2xl font-semibold items-center sm:leading-4 leading-6">
                {clients[0]?.name} <img src={Verificado} className="w-5" />
              </h1>
              <span className="text-xs">{clients[0]?.email1}</span>
            </div>
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
        </div>

        <div className="mt-10">
          <h2 className="w-full border-b-2 border-gray-300">
            Outras Informações
          </h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 mt-4 text-sm">
            <div className="grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md">
              <span className="text-xs text-gray-700">País</span>
              {clients[0]?.country}
            </div>
            <div className="grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md">
              <span className="text-xs text-gray-700">Cidade</span>
              {clients[0]?.city}
            </div>
            <div className="grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md">
              <span className="text-xs text-gray-700">Morada</span>
              {clients[0]?.address}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="w-full border-b-2 border-gray-300">Contactos</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 mt-4 text-sm">
            <div className="grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md">
              <span className="text-xs text-gray-700">Número Primário</span>
              {clients[0]?.phone1}
            </div>
            <div className="grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md">
              <span className="text-xs text-gray-700">Número Opcional</span>
              {clients[0]?.phone2}
            </div>
            <div className="grid bg-primaryColor bg-opacity-15 px-4 py-2 rounded-md">
              <span className="text-xs text-gray-700">E-mail Opcional</span>
            {clients[0]?.email2}
            </div>
          </div>
        </div>
        <div className="mt-10 ">
          <h2 className="w-full border-b-2 border-gray-300">
            Tarefas Associadas
          </h2>
          <PieChartClienteTarefa />
        </div>
      </div>

      {showModel && <ModalDelete setShowModal={setShowModel} />}
      {showOfcanva && <EditCliente setShowOfcanva={setShowOfcanva} />}
    </div>
  );
};

export default VerCliente;
