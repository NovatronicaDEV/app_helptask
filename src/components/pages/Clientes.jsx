
import React, { useState, useEffect } from "react";
import { BsSortAlphaDownAlt, BsSortAlphaUp } from "react-icons/bs";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import Info from "../UI/Info";
import InputSearch from "../UI/InputSearch";
import NewCliente from "../UI/NewCliente";
import { Link,redirect } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
const Clientes = () => {
  const [sort, setSort] = useState("Asc");
  const [search, setSearch] = useState("");
  const [showOfcanva, setShowOfcanva] = useState(false);
  const [clients, setClientes] = useState([]); // Armazena os dados dos clientes

  // Função para obter os dados dos clientes da API
  const getClientes = async () => {
    try {
      const token = localStorage.getItem("userToken");
      
      const isTokenValid = () => {
        const token = localStorage.getItem("userToken");
        return !!token;
      };
      const tokenIsValid = isTokenValid();

      // Redirect to login if the token is not valid
      if (!tokenIsValid) {
        return <redirect to="/" />;
      }
      const response = await axios.get("http://localhost:3000/clients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
   
      setClientes(response.data.client); // Armazena os dados dos clientes no estado
    } catch (error) {
      console.error("Erro ao obter clientes:", error);
    }
  };

  useEffect(() => {
    // Chamada para a API ao montar o componente
    getClientes();
  }, []);

  //Modal Ofcanva
  const showOfcanvaHandler = () => {
    setShowOfcanva(true);
  };

  return (
    <section className="bg-secudaryColor w-full min-h-screen overflow-auto">
      <div className="p-8">
        <h2 className="font-light text-3xl opacity-70 flex justify-end md:justify-start">
          MEUS CLIENTES
        </h2>
        <InputSearch
          placeholder={"Procurar clientes..."}
          search={search}
          setSearch={setSearch}
        />

        <div className="flex justify-end mt-10">
          <div className="flex gap-2">
            <div
              onClick={() => setSort("Asc")}
              className={`${
                sort == "Asc"
                  ? "bg-primaryColor text-secudaryColor hover:bg-hoverColor"
                  : "border border-primaryColor text-primaryColor hover:text-hoverColor hover:border-hoverColor"
              } w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out`}
            >
              <BsSortAlphaUp size={20} />
            </div>
            <div
              onClick={() => setSort("Desc")}
              className={`${
                sort == "Desc"
                  ? "bg-primaryColor text-secudaryColor hover:bg-hoverColor"
                  : "border border-primaryColor text-primaryColor hover:text-hoverColor hover:border-hoverColor"
              } w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out`}
            >
              <BsSortAlphaDownAlt size={20} />
            </div>
          </div>
        </div>

        <div className="overflow-auto lg:overflow-visible mt-5">
          <table className="table-auto text-secudaryColor text-[14px] w-full">
            <thead className="bg-primaryColor border-b-8 border-secudaryColor">
              <tr>
                <th className="p-3 text-left">Ref.</th>
                <th className="p-3 text-left">Nome Completo</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Telefone</th>
                <th className="p-3 text-left">País</th>
              </tr>
            </thead>
            <tbody>
              {clients
                ?.filter((client) =>
                  client.name.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a, z) =>
                  sort === "Asc"
                    ? a.name.localeCompare(z.name)
                    : z.name.localeCompare(a.name)
                )
                .map((client, index) => (
                  <tr
                    key={index}
                    /* onClick={location.href="verClientes"} */
                    className="bg-tdColor bg-opacity-15 text-gray-900 border-b-4 border-secudaryColor hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
                  >
                    <td className="p-3">{client.reference}</td>
                    <td className="cursor-pointer p-3 font-bold text-primaryColor">
                      <Link to={`/pages/verClientes/${client.id}`}>{client.name}</Link>
                    </td>
                    <td className="p-3">{client.email1}</td>
                    <td className="p-3">{client.phone1}</td>
                    <td className="p-3 ">{client.country}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

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
            <AiOutlinePlusCircle /> Adicionar Cliente
          </button>
        </div>

        <Info />
      </div>

      {showOfcanva && <NewCliente setShowOfcanva={setShowOfcanva} />}
    </section>
  );
};

export default Clientes;
