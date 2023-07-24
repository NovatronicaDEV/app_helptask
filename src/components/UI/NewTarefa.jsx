import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//Icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

const schema = object({
  clienteName: string()
    .required("Campo Obrigatório.")
    .max(50, "Nome deve conter no máximo 50 caracteres."),
  atribuir: string()
    .required("Campo Obrigatório.")
    .max(50, "Atribuir deve conter no máximo 50 caracteres."),
  assunto: string()
    .required("Campo Obrigatório.")
    .max(50, "Assunto deve conter no máximo 50 caracteres."),
  canalRecepcao: string()
    .required("Campo Obrigatório.")
    .max(30, "Canal deve conter no máximo 30 caracteres."),
  tipoTarefa: string()
    .required("Campo Obrigatório.")
    .max(30, "Tipo de tarefa deve conter no máximo 30 caracteres."),
  grupo: string()
    .required("Campo Obrigatório.")
    .max(30, "Grupo deve conter no máximo 30 caracteres."),
  area: string()
    .required("Campo Obrigatório.")
    .max(30, "Área deve conter no máximo 30 caracteres."),
  obs: string(),
});

const NewTarefa = ({ setShowOfcanva }) => {
  const [inputData, setInputData] = useState(
    {
      name: "",
      description: "",
      user_id: "",
      client_id: "",
      status_id: "",
      type_id: "",
      group_id: "",
      area_id: "",
      channel_id: "",
      files: ""

    }
  );
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [status, setStatus,] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [types, setTypes,] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const navigat = useNavigate();
  const [clienteName, setClienteName] = useState("");
  const [atribuir, setAtribuir] = useState("");
  const [assunto, setAssunto] = useState("");
  const [canalRecepcao, setCanalRecepcao] = useState("");
  const [tipoTarefa, setTipoTarefa] = useState("");
  const [grupo, setGrupo] = useState("");
  const [area, setArea] = useState("");
  const [obs, setObs] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      return;
    }

    // Função para carregar os dados dos usuários da API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    };
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/clients', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClients(response.data.client);

      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };
    const fetchStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/status', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setStatus(response.data.status);
      } catch (error) {
        console.error('Erro ao carregar estado:', error);
      }
    };
    const fetchType = async () => {
      try {

        const response = await axios.get('http://localhost:3000/types', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTypes(response.data.types);
      } catch (error) {
        console.error('Erro ao carregar tipo:', error);
      }
    };
    const fetchGroup = async () => {
      try {
        const response = await axios.get('htt');
      } catch (error) {

      }
    };

    fetchUsers();
    fetchClients();
    fetchStatus();
    fetchType();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };
  const handleSelectChangeclient = (event) => {
    setSelectedClient(event.target.value);
  };
  const handleSelectChangeStatus = (event) => {
    setSelectedStatus(event.target.value);
  };
  const handleSelectChangeType = (event) => {
    setSelectedType(event.target.value);
  }
  function handleSubmits(event) {


    event.preventDefault();

    const response = axios.post("http://localhost:3000/task/", inputData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },

    });

  };
  const onSubmit = (data) => {

    schema.isValid(data).then((valid) => {
      if (valid) {

        console.log("sucesso");
      } else {
        console.log("erro");
      }
    });
  };
  return (
    <div className="myOffcanva">
      <div
        id="drawer-new-tarefa"
        className="fixed top-0 right-0 z-40 h-screen md:w-1/2 w-3/4 p-10 bg-white rounded-l-3xl"
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <h5 id="drawer-right-label" className="mb-5 font-medium opacity-70">
          ADICIONAR UMA NOVA TAREFA
        </h5>
        <button
          onClick={() => setShowOfcanva(false)}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-6 right-6 inline-flex items-center justify-center"
        >
          <GrClose />
          <span className="sr-only">Close menu</span>
        </button>

        <form
          onSubmit={handleSubmits}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex flex-col mt-14 col-span-2">
            <label htmlFor="name" className="text-[12px]">
              Nome
            </label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              // {...register("name")}
              name="name"
              onChange={(e) => {
                setInputData({ ...inputData, name: e.target.value });
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="description" className="text-[12px]">
              Descrição
            </label>
            <input
              type="text"
              id="description"
              autoComplete="off"
              name="description"
              // {...register("atribuir")}
              onChange={(e) => {
                setInputData({ ...inputData, description: e.target.value });
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="userSelect" className="text-[12px]">Utilizador</label>
            <select id="user_id" name="user_id" value={selectedUser} onChange={handleSelectChange} className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2">
              <option value="">Selecione...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {selectedUser && <p>Você selecionou: {selectedUser}</p>}
          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="userSelect" className="text-[12px]">Cliente</label>
            <select id="client_id" name="client_id" value={selectedClient} onChange={handleSelectChangeclient} className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2">
              <option value="">Selecione...</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            {selectedClient && <p>Você selecionou: {selectedClient}</p>}
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="userSelect" className="text-[12px]">Estado da Tarefa</label>
            <select id="status_id" name="status_id" value={selectedStatus} onChange={handleSelectChangeStatus} className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2">
              <option value="">Selecione...</option>
              {status.map((statu) => (
                <option key={statu.id} value={statu.id}>
                  {statu.name}
                </option>
              ))}
            </select>
            {selectedStatus && <p>Você selecionou: {selectedStatus}</p>}
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="userSelect" className="text-[12px]">Tipo de Tarefa</label>
            <select id="status_id" name="status_id" value={selectedType} onChange={handleSelectChangeType} className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2">
              <option value="">Selecione...</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {selectedType && <p>Você selecionou: {selectedType}</p>}
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="group_id" className="text-[12px]">
              Grupo
            </label>
            <input
              type="text"
              id="group_id"
              name="group_id"
              autoComplete="off"
              // {...register("grupo")}
              onChange={(e) => {
                setInputData({ ...inputData, group_id: e.target.value });
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="area_id" className="text-[12px]">
              Área
            </label>
            <input
              type="text"
              id="area_id"
              name="area_id"
              autoComplete="off"
              // {...register("area")}

              onChange={(e) => {
                setInputData({ ...inputData, area_id: e.target.value });
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>
          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="channel_id" className="text-[12px]">
              Canal de recepção
            </label>
            <input
              type="text"
              id="channel_id"
              name="channel_id"
              autoComplete="off"
              // {...register("area")}

              onChange={(e) => {
                setInputData({ ...inputData, channel_id: e.target.value });
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>
          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="channel_id" className="text-[12px]">
              Anexos
            </label>
            <input
              type="file"
              id="files"
              name="files[]"
              autoComplete="off"
              // {...register("area")}

              onChange={(e) => {
                setInputData({ ...inputData, files: e.target.value });
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>

          {/* <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="obs" className="text-[12px]"></label>
            <input
              id="files"
              type="file"
              name="files"
              autoComplete="off"
              //{...register("obs")}
              onChange={(e) => {
                setInputData({ ...inputData, files: e.target.value });
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div> */}

          <div className="p-8 bottom-0 right-0 fixed">
            <button
              className="bg-primaryColor text-secudaryColor flex gap-2 rounded-md hover:bg-hoverColor px-4 py-2 items-center shadow-2xl hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
              type="submit"
            >
              <AiOutlinePlusCircle /> Adicionar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTarefa;
