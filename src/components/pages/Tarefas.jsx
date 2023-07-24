import React, { useState, useEffect  } from "react";

import {
  BsSortAlphaDownAlt,
  BsSortAlphaUp,
  BsListUl,
  BsGrid3X3Gap,
} from "react-icons/bs";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import InputSearch from "../UI/InputSearch";
import Info from "../UI/Info";
import StateTask from "../UI/StateTask";
import ViewListTask from "../UI/ViewListTask";
import ViewGroupTask from "../UI/ViewGroupTask";
import NewTarefa from "../UI/NewTarefa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
const Tarefas = () => {
  const [stateView, setStateView] = useState(true);
  const [sort, setSort] = useState("Asc");
  const [search, setSearch] = useState("");
  const [showOfcanva, setShowOfcanva] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  useEffect(() => {
    // Função para obter as tarefas da API
    const fetchTarefas = async () => {
      try {
        // Faça a chamada à API e envie o token de autenticação no cabeçalho
        const token = localStorage.getItem("userToken");
      
        if (!token) {
          // Lidar com o cenário em que o token não está disponível
          return;
        }
   
        const response = await axios.get("http://localhost:3000/task", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
   
        // Atualize o estado das tarefas com os dados da API
        setTarefas(response.data.task);
      } catch (error) {
        // Lidar com erros de chamada à API
        console.error("Erro ao obter as tarefas:", error);
      }
    };

    // Chame a função para obter as tarefas
    fetchTarefas();
  }, []);

  //Modal Ofcanva
  const showOfcanvaHandler = () => {
    setShowOfcanva(true);
  };
  return (
    <section className="bg-secudaryColor w-full min-h-screen overflow-auto">
      <div className="p-8">
        <div className="grid md:grid-cols-2 sm:grid-rows gap-0">
          <h2 className="font-light text-3xl opacity-70 flex justify-end md:justify-start">
            MINHAS TAREFAS
          </h2>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:items-center items-end">
            <StateTask cor={"#27AE60"} estado={"Fechado"} />
            <StateTask cor={"#F1C40F"} estado={"Em Andamento"} />
            <StateTask cor={"#E67E22"} estado={"Em Espera"} />
            <StateTask cor={"#E74C3C"} estado={"Por Atribuir"} />
          </div>
        </div>

        {/* Search */}
        <InputSearch
          placeholder={"Procurar tarefas..."}
          search={search}
          setSearch={setSearch}
        />

        {/* Order */}
        <div className="flex justify-end mt-10">
          <div className="flex gap-2">
            <div
              onClick={() => {
                setSort("Asc");
              }}
              className={`${
                sort == "Asc"
                  ? "bg-primaryColor text-secudaryColor hover:bg-hoverColor"
                  : "border border-primaryColor text-primaryColor hover:text-hoverColor hover:border-hoverColor"
              } w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out`}
            >
              <BsSortAlphaUp size={20} />
            </div>
            <div
              onClick={() => {
                setSort("Desc");
              }}
              className={`${
                sort == "Desc"
                  ? "bg-primaryColor text-secudaryColor hover:bg-hoverColor"
                  : "border border-primaryColor text-primaryColor hover:text-hoverColor hover:border-hoverColor"
              } w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out`}
            >
              <BsSortAlphaDownAlt size={20} />
            </div>

            <div
              onClick={() => setStateView(true)}
              className={`${
                stateView
                  ? "bg-primaryColor text-secudaryColor hover:bg-hoverColor"
                  : "border border-primaryColor text-primaryColor hover:text-hoverColor hover:border-hoverColor"
              } w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out`}
            >
              <BsListUl size={20} />
            </div>
            <div
              onClick={() => setStateView(false)}
              className={`${
                !stateView
                  ? "bg-primaryColor text-secudaryColor hover:bg-hoverColor"
                  : "border border-primaryColor text-primaryColor hover:text-hoverColor hover:border-hoverColor"
              } w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out`}
            >
              <BsGrid3X3Gap size={20} />
            </div>
          </div>
        </div>

        {/* list */}
        <div
          className={`mt-5 grid ${
            stateView
              ? "grid-rows"
              : "2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
          } gap-4`}
        >
          {tarefas
            ?.filter((task) =>
              task.name.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, z) =>
              sort === "Asc"
                ? a.name.localeCompare(z.name)
                : z.name.localeCompare(a.name)
            )
            .map((task, index) =>
              stateView ? (
                <Link to={`/pages/verTarefas/${task.id}`} key={index}>
                  <ViewListTask task={task} />
                </Link>
              ) : (
                <Link to={"/pages/verTarefas"} key={index}>
                  <ViewGroupTask task={task} />
                </Link>
              )
            )}
        </div>

        {/* Pagination */}
        <div className="justify-center items-center flex gap-2 mt-10">
          <div className="rounded-full w-5 h-5 bg-primaryColor text-secudaryColor text-center leading-5 text-[10px]">
            1
          </div>
          <div className="rounded-full w-5 h-5 border border-primaryColor text-primaryColor text-center leading-5 text-[10px]">
            2
          </div>
          <div className="rounded-full w-5 h-5 border border-primaryColor text-primaryColor text-center leading-5 text-[10px]">
            3
          </div>
          <MdOutlineArrowForwardIos />
        </div>

        <div className="p-8 bottom-0 right-0 fixed">
          <button
            onClick={() => showOfcanvaHandler()}
            className="bg-primaryColor text-secudaryColor flex gap-2 rounded-md hover:bg-hoverColor px-4 py-2 items-center shadow-2xl hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
            type="button"
          >
            <AiOutlinePlusCircle /> Adicionar Tarefa
          </button>
        </div>

        <Info />
      </div>

      {showOfcanva && <NewTarefa setShowOfcanva={setShowOfcanva} />}
    </section>
  );
};

export default Tarefas;
