import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


//Icons
import { AiOutlineEdit } from "react-icons/ai";
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

const EditTarefa = ({ id, setShowOfcanva }) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [grupo, setGrupo] = useState([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [status, setStatus,] = useState([]);
  const [types, setTypes,] = useState([]);
  const [user_id, setUser_id] = useState("");
  const [client_id, setClient_id] = useState("");
  const [status_id, setStatus_id] = useState("");
  const [type_id, SetType_id] = useState("");
  const [group_id, SetGroup_id] = useState("");
  const [area_id, SetArea_id] = useState("");
  const [channel_id, SetChannel_id] = useState("");
  const [areas, setAreas] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token || !id) {
      return;
    }
    const getTarefaData = async () => {
      try {

        const response = await axios.get(`http://localhost:3000/task/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const tarefaData = response.data.tasks;
        setName(tarefaData[0].name);
        setDescription(tarefaData[0].description);
        setUser_id(tarefaData[0].user.id);
        setClient_id(tarefaData[0].clients.id);
        setStatus_id(tarefaData[0].status.id);
        SetType_id(tarefaData[0].types.id);
        SetGroup_id(tarefaData[0].groups.id);
        SetArea_id(tarefaData[0].areas.id);
        SetChannel_id(tarefaData[0].channels.id)
      } catch (error) {
        console.log("Error ao obter dados da tarefa:", error);
      }
    };
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
        const response = await axios.get('http://localhost:3000/groups', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setGrupo(response.data.groups)
      } catch (error) {
        console.error('Erro ao carregar grupo:', error);
      }
    };
    const fetchArea = async () => {
      try {
        const response = await axios.get('http://localhost:3000/areas', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setAreas(response.data.areas)
      } catch (error) {
        console.error('Erro ao carregar Area:', error);
      }
    };
    const fetcChannels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/channels', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setChannels(response.data.channels)
      } catch (error) {
        console.error('Erro ao carregar Canal:', error);
      }
    };

    getTarefaData();
    fetchUsers();
    fetchClients();
    fetchStatus();
    fetchType();
    fetchGroup();
    fetchArea();
    fetcChannels();
  }, [id]);
  function resetFile(){
    document.getElementById("files").value = "";
  }
  function handleSubmits(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",event.target.name.value);
    formData.append("description", event.target.description.value);
    formData.append("user_id", event.target.user_id.value);
    formData.append("client_id", event.target.client_id.value);
    formData.append("status_id", event.target.status_id.value);
    formData.append("type_id", event.target.type_id.value);
    formData.append("group_id", event.target.group_id.value);
    formData.append("area_id",event.target.area_id.value);
    formData.append("channel_id", event.target.channel_id.value);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }
    const token = localStorage.getItem("userToken");
    axios.post(`http://localhost:3000/task/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        toast.success("Tarefa atualizada com sucesso!");
       resetFile();
      })
      .catch((error) => {
        toast.error("Erro ao atualizar a tarefa:",error);
       
      });
  };
  return (
    <div className="myOffcanva">
      <div
        className="fixed top-0 right-0 z-40 h-screen md:w-1/2 w-3/4 p-10 bg-white rounded-l-3xl"
        tabIndex="-1"
      >
        <h5 className="mb-5 font-medium opacity-70">
          EDITAR TAREFA
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
            <label htmlFor="clienteName" className="text-[12px]">
              Nome
            </label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              value={name}
              {...register("name")}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="atribuir" className="text-[12px]">
              Descrição
            </label>
            <input
              type="text"
              id="description"
              autoComplete="off"
              value={description}
              {...register("description")}
              onChange={(e) => {
                setDescription
                (e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="userSelect" className="text-[12px]">Utilizador</label>
            <select
              id="user_id"
              name="user_id"
              value={user_id}
              onChange={(e) =>
                setUser_id(e.target.value)
              }
              className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2  'border-red-500' : ''
                    }`}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="userSelect" className="text-[12px]">Cliente</label>
            <select
              id="client_id"
              name="client_id"
              value={client_id}
              onChange={(e) =>
                setClient_id(e.target.value)
              }
              className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2  'border-red-500' : ''
                    }`}
            >
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>

          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="userSelect" className="text-[12px]">Estado da Tarefa</label>
            <select
              id="status_id"
              name="status_id"
              value={status_id}
              onChange={(e) =>
                setStatus_id(e.target.value)
              }
              className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2  'border-red-500' : ''
                    }`}
            >
              {status.map((statu) => (
                <option key={statu.id} value={statu.id}>
                  {statu.name}
                </option>
              ))}
            </select>

          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="userSelect" className="text-[12px]">Tipo de Tarefa</label>
            <select
              id="type_id"
              name="type_id"
              value={type_id}
              onChange={(e) =>
                SetType_id(e.target.value)
              }
              className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2  'border-red-500' : ''
                    }`}
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="userSelect" className="text-[12px]">Grupos</label>
            <select
              id="group_id"
              name="group_id"
              value={group_id}
              onChange={(e) =>
                SetGroup_id(e.target.value)
              }
              className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2  'border-red-500' : ''
                    }`}
            >
              {grupo.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>

          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="userSelect" className="text-[12px]">Area</label>
            <select
              id="area_id"
              name="area_id"
              value={area_id}
              onChange={(e) =>
                SetArea_id(e.target.value)
              }
              className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2  'border-red-500' : ''
                    }`}
            >
              {areas.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>

          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="userSelect" className="text-[12px]">Canal de recepção</label>
            <select
              id="channel_id"
              name="channel_id"
              value={channel_id}
              onChange={(e) =>
                SetChannel_id(e.target.value)
              }
              className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2  'border-red-500' : ''
                    }`}
            >
              {channels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.name}
                </option>
              ))}
            </select>

          </div>
          <div className="flex flex-col col-span-2">
            <label htmlFor="channel_id" className="text-[12px]">
              Anexos
            </label>
            <input
              type="file"
              id="files"
              name="files[]"

              onChange={(e) => {
                const files = Array.from(e.target.files);
                setSelectedFiles(files);

              }}

              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
              multiple
            />

          </div>

          <div className="p-8 bottom-0 right-0 fixed">
            <button
              className="bg-primaryColor text-secudaryColor flex gap-2 rounded-md hover:bg-hoverColor px-4 py-2 items-center shadow-2xl hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
              type="submit"
            >
              <AiOutlineEdit /> Editar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTarefa;
