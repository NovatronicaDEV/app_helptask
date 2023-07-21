import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from "yup";

//Icons
import { AiOutlineEdit } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

//YUP
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

const EditCliente = ({ setShowOfcanva }) => {
  const [clienteName, setClienteName] = useState("Cristiano Fula Mariano");
  const [pais, setPais] = useState("Angola");
  const [cidade, setCidade] = useState("Viana");
  const [morada, setMorada] = useState("Boa Fé");
  const [email, setEamil] = useState("cristianofulamariano@gmail.com");
  const [email2, setEmail2] = useState("tchanopy@gmail.com");
  const [numero, setNumero] = useState(999999999);
  const [numero2, setNumero2] = useState(0);

  //React Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Submeter validação
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
        <h5 className="mb-5 font-medium opacity-70">EDITAR CLIENTE</h5>
        <button
          onClick={() => setShowOfcanva(false)}
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
              value={clienteName}
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
              value={pais}
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
              value={cidade}
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
              value={morada}
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
              value={email}
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
              value={email2}
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
              value={numero}
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
              <AiOutlineEdit /> Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCliente;
