import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from "yup";

//Icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

const schema = object({
  clienteName: string()
    .required("Campo Obrigatório.")
    .max(50, "Nome deve conter no máximo 50 caracteres."),
  pais: string()
    .required("Campo Obrigatório.")
    .max(30, "Pais deve conter no máximo 30 caracteres."),
  cidade: string()
    .required("Campo Obrigatório.")
    .max(50, "Cidade deve conter no máximo 50 caracteres."),
  morada: string()
    .required("Campo Obrigatório.")
    .max(50, "Morada deve conter no máximo 50 caracteres."),
  email: string()
    .required("Campo Obrigatório.")
    .email("Insira um endereço de e-mail válido.")
    .max(40, "O E-mail deve conter no máximo 40 caracteres."),
  email2: string()
    .email("Insira um endereço de e-mail válido.")
    .max(40, "O E-mail deve conter no máximo 40 caracteres."),
  numero: number()
    .typeError("Insira um número válido.")
    .required("Campo Obrigatório.")
    .positive("Apenas número positivo."),
  numero2: number().typeError("Insira um número válido."),
});

const NewCliente = ({ setShowOfcanva }) => {
  const [clienteName, setClienteName] = useState("");
  const [pais, setPais] = useState("");
  const [cidade, setCidade] = useState("");
  const [morada, setMorada] = useState("");
  const [email, setEamil] = useState("");
  const [email2, setEmail2] = useState("");
  const [numero, setNumero] = useState(0);
  const [numero2, setNumero2] = useState(0);

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
        id="drawer-new-cliente"
        className="fixed top-0 right-0 z-40 h-screen md:w-1/2 w-3/4 p-10 bg-white rounded-l-3xl"
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <h5 id="drawer-right-label" className="mb-5 font-medium opacity-70">
          ADICIONAR UM NOVO CLIENTE
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
              Nome do Cliente
            </label>
            <input
              type="text"
              id="clienteName"
              autoComplete="off"
              {...register("clienteName")}
              onChange={(e) => {
                setClienteName(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
            <span className="text-red-500 text-[12px] mt-1">
              {errors?.clienteName?.message}
            </span>
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="pais" className="text-[12px]">
              País
            </label>
            <input
              type="text"
              id="pais"
              autoComplete="off"
              {...register("pais")}
              onChange={(e) => {
                setPais(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
            <span className="text-red-500 text-[12px] mt-1">
              {errors?.pais?.message}
            </span>
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="cidade" className="text-[12px]">
              Cidade
            </label>
            <input
              type="text"
              id="cidade"
              autoComplete="off"
              {...register("cidade")}
              onChange={(e) => {
                setCidade(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
            <span className="text-red-500 text-[12px] mt-1">
              {errors?.cidade?.message}
            </span>
          </div>

          <div className="flex flex-col col-span-2">
            <label htmlFor="morada" className="text-[12px]">
              Morada
            </label>
            <input
              type="text"
              id="morada"
              autoComplete="off"
              {...register("morada")}
              onChange={(e) => {
                setMorada(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
            <span className="text-red-500 text-[12px] mt-1">
              {errors?.morada?.message}
            </span>
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="email" className="text-[12px]">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              {...register("email")}
              onChange={(e) => {
                setEamil(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
            <span className="text-red-500 text-[12px] mt-1">
              {errors?.email?.message}
            </span>
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="email2" className="text-[12px]">
              E-mail alternativo
            </label>
            <input
              type="email"
              id="email2"
              autoComplete="off"
              {...register("email2")}
              onChange={(e) => {
                setEmail2(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
            <span className="text-red-500 text-[12px] mt-1">
              {errors?.email2?.message}
            </span>
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="numero" className="text-[12px]">
              Número de telefone
            </label>
            <input
              type="number"
              id="numero"
              autoComplete="off"
              {...register("numero")}
              onChange={(e) => {
                setNumero(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
            <span className="text-red-500 text-[12px] mt-1">
              {errors?.numero?.message}
            </span>
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1 mb-20">
            <label htmlFor="numero2" className="text-[12px]">
              Número de telefone alternativo
            </label>
            <input
              type="number"
              id="numero2"
              autoComplete="off"
              {...register("numero2")}
              value={numero2}
              onChange={(e) => {
                setNumero2(e.target.value);
              }}
              className="bg-[#D9D9D9] w-full border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm px-2"
            />
            <span className="text-red-500 text-[12px] mt-1">
              {errors?.numero2?.message}
            </span>
          </div>

          <div className="p-8 bottom-0 right-0 fixed">
            <button
              className={`bg-primaryColor text-secudaryColor flex gap-2 rounded-md px-4 py-2 items-center shadow-2xl  ${
                clienteName != "" &&
                "hover:bg-hoverColor hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
              }`}
              type="submit"
              disabled={clienteName != "" ? false : true}
            >
              <AiOutlinePlusCircle /> Adicionar Clientes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCliente;
