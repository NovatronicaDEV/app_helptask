import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
//Icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ... rest of your code




const NewTarefa = ({ setShowOfcanva }) => {

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'O nome deve ter no mínimo 2 caracteres.')
      .max(200, 'O nome deve ter no máximo 200 caracteres.')
      .required('O nome é obrigatório.'),
    description: Yup.string()
      .min(6, 'A descrição deve ter no mínimo 6 caracteres.')
      .max(200, 'A descrição deve ter no máximo 200 caracteres.')
      .required('A descrição é obrigatório.'),
    user_id: Yup.number().required('O utilizador é obrigatório.'),
    client_id: Yup.number().required('O cliente é obrigatório.'),
    type_id: Yup.number().required('O tipo é obrigatório.'),
    group_id: Yup.number().required('O grupo é obrigatório.'),
    area_id: Yup.number().required('A area é obrigatório.'),
    status_id: Yup.number().required('O estado é obrigatório.'),
    channel_id: Yup.number().required('O canal é obrigatório')

  });

  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [status, setStatus,] = useState([]);
  const [types, setTypes,] = useState([]);
  const [groups, setGrupo] = useState([]);
  const [areas, setAreas] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

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

    fetchUsers();
    fetchClients();
    fetchStatus();
    fetchType();
    fetchGroup();
    fetchArea();
    fetcChannels();
  }, []);

  function resetFile(){
    document.getElementById("files").value = "";
  }
  function handleSubmits(values, { setSubmitting, resetForm }) {

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("user_id", values.user_id);
    formData.append("client_id", values.client_id);
    formData.append("status_id", values.status_id);
    formData.append("type_id", values.type_id);
    formData.append("group_id", values.group_id);
    formData.append("area_id", values.area_id);
    formData.append("channel_id", values.channel_id);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('files', selectedFiles[i]);
    }
    const token = localStorage.getItem("userToken");
    if (!token) {
      return;
    }

    axios
      .post("http://localhost:3000/task/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Tarefa adicionada com sucesso!");
        setSubmitting(false);
        resetForm();
        resetFile()
       
      })
      .catch((error) => {
        toast.error("erro ao registar a tarefa:".error);
        setSubmitting(false);
      });

  }


  return (
    <div className="myOffcanva">
      <Formik
        initialValues={
          {
            name: '',
            description: '',
            user_id: '',
            client_id: '',
            type_id: '',
            group_id: '',
            area_id: '',
            status_id: '',
            channel_id: '',
            files: ''
          }
        }
        validationSchema={schema}
        onSubmit={handleSubmits}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex flex-col mt-14 col-span-2">
                <label htmlFor="name" className="text-[12px]">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name" // Add name attribute for Formik to track
                  autoComplete="off"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2 ${touched.name && errors.name ? 'border-red-500' : ''
                    }`}
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col col-span-2">
                <label htmlFor="description" className="text-[12px]">
                  Descrição
                </label>
                <input
                  type="text"
                  id="description"
                  name="description" // Add name attribute for Formik to track
                  autoComplete="off"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2 ${touched.description && errors.description ? 'border-red-500' : ''
                    }`}
                />
                {touched.description && errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="userSelect" className="text-[12px]">Utilizador</label>
                <select
                  id="user_id"
                  name="user_id"
                  value={values.user_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2 ${touched.user_id && errors.user_id ? 'border-red-500' : ''
                    }`}
                >
                  <option value="">Selecione...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                {touched.user_id && errors.user_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.user_id}</p>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="userSelect" className="text-[12px]">Cliente</label>
                <select
                  id="client_id"
                  name="client_id"
                  value={values.client_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2">
                  <option value="">Selecione...</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                {touched.client_id && errors.client_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.client_id}</p>
                )}
              </div>

              <div className="flex flex-col col-span-2">
                <label htmlFor="userSelect" className="text-[12px]">Estado da Tarefa</label>
                <select
                  id="status_id"
                  name="status_id"
                  value={values.status_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2 ${touched.status_id && errors.status_id ? 'border-red-500' : ''
                    }`}
                >
                  <option value="">Selecione...</option>
                  {status.map((statu) => (
                    <option key={statu.id} value={statu.id}>
                      {statu.name}
                    </option>
                  ))}
                </select>
                {touched.status_id && errors.status_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.status_id}</p>
                )}
              </div>

              <div className="flex flex-col col-span-2">
                <label htmlFor="userSelect" className="text-[12px]">Tipo de Tarefa</label>
                <select
                  id="type_id"
                  name="type_id"
                  value={values.type_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2 ${touched.type_id && errors.type_id ? 'border-red-500' : ''
                    }`}
                >
                  <option value="">Selecione...</option>
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {touched.type_id && errors.type_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.type_id}</p>
                )}
              </div>
              <div className="flex flex-col col-span-2">
                <label htmlFor="userSelect" className="text-[12px]">Grupo</label>
                <select
                  id="group_id"
                  name="group_id"
                  value={values.group_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2 ${touched.group_id && errors.group_id ? 'border-red-500' : ''
                    }`}
                >
                  <option value="">Selecione...</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
                {touched.group_id && errors.group_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.group_id}</p>
                )}
              </div>

              <div className="flex flex-col col-span-2">
                <label htmlFor="userSelect" className="text-[12px]">Area</label>
                <select
                  id="area_id"
                  name="area_id"
                  value={values.area_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2 ${touched.area_id && errors.area_id ? 'border-red-500' : ''
                    }`}
                >
                  <option value="">Selecione...</option>
                  {areas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </select>
                {touched.area_id && errors.area_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.area_id}</p>
                )}
              </div>

              <div className="flex flex-col col-span-2">
                <label htmlFor="userSelect" className="text-[12px]">Canal de recepção</label>
                <select
                  id="channel_id"
                  name="channel_id"
                  value={values.channel_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2 ${touched.channel_id && errors.channel_id ? 'border-red-500' : ''
                    }`}
                >
                  <option value="">Selecione...</option>
                  {channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {channel.name}
                    </option>
                  ))}
                </select>
                {touched.channel_id && errors.channel_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.channel_id}</p>
                )}
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
                  disabled={isSubmitting}
                >
                  <AiOutlinePlusCircle /> Adicionar Tarefa
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default NewTarefa;
