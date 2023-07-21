import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

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

const EditTarefa = ({ setShowOfcanva }) => {
  const [clienteName, setClienteName] = useState("Paulo Dos Santos");
  const [atribuir, setAtribuir] = useState("Cristiano Fula Mariano");
  const [assunto, setAssunto] = useState("...");
  const [canalRecepcao, setCanalRecepcao] = useState("...");
  const [tipoTarefa, setTipoTarefa] = useState("...");
  const [grupo, setGrupo] = useState("...");
  const [area, setArea] = useState("...");
  const [obs, setObs] = useState("...");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
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
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex flex-col mt-14 col-span-2">
            <label htmlFor="clienteName" className="text-[12px]">
              Cliente
            </label>
            <input
              type="text"
              id="clienteName"
              autoComplete="off"
              value={clienteName}
              {...register("clienteName")}
              onChange={(e) => {
                setClienteName(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="atribuir" className="text-[12px]">
              Atribuir a
            </label>
            <input
              type="text"
              id="atribuir"
              autoComplete="off"
              value={atribuir}
              {...register("atribuir")}
              onChange={(e) => {
                setAtribuir(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="assunto" className="text-[12px]">
              Assunto
            </label>
            <input
              type="text"
              id="assunto"
              autoComplete="off"
              value={assunto}
              {...register("assunto")}
              onChange={(e) => {
                setAssunto(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="canalRecepcao" className="text-[12px]">
              Canal de recepção
            </label>
            <input
              type="text"
              id="canalRecepcao"
              autoComplete="off"
              value={canalRecepcao}
              {...register("canalRecepcao")}
              onChange={(e) => {
                setCanalRecepcao(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="tipoTarefa" className="text-[12px]">
              Tipo de tarefa
            </label>
            <input
              type="text"
              id="tipoTarefa"
              autoComplete="off"
              value={tipoTarefa}
              {...register("tipoTarefa")}
              onChange={(e) => {
                setTipoTarefa(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="grupo" className="text-[12px]">
              Grupo
            </label>
            <input
              type="text"
              id="grupo"
              autoComplete="off"
              value={grupo}
              {...register("grupo")}
              onChange={(e) => {
                setGrupo(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="area" className="text-[12px]">
              Área
            </label>
            <input
              type="text"
              id="area"
              autoComplete="off"
              value={area}
              {...register("area")}
              onChange={(e) => {
                setArea(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
          </div>

          <div className="flex flex-col-2 col-span-2 mb-20">
            <label htmlFor="obs" className="text-[12px]"></label>
            <textarea
              id="obs"
              rows="4"
              autoComplete="off"
              value={obs}
              {...register("obs")}
              onChange={(e) => {
                setObs(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            ></textarea>
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
