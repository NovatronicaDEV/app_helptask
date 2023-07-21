import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

//Incons
import { FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

//Images
import Rectangle_1 from "../../assets/Rectangle_1.png";

const schema = object({
  senha1: string()
    .required("Campo Obrigatório.")
    .min(8, "A senha deve conter pelo menos 8 caracteres.")
    .max(24, "A senha deve conter no máximo 24 caracteres."),
  senha2: string()
    .required("Campo Obrigatório.")
    .min(8, "A senha deve conter pelo menos 8 caracteres.")
    .max(24, "A senha deve conter no máximo 24 caracteres."),
});

const RedefinirSenha = () => {
  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");

  const {
    register,
    handleSubmit,
    watch,
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
    <div className="flex flex-col justify-between sm:p-20 p-10 h-screen w-full">
      <div className="fixed left-0 bottom-0">
        <img src={Rectangle_1} alt="" />
      </div>
      {/* Logo */}
      <FaTasks className="text-primaryColor" size={50} />

      {/* Text */}
      <div className="flex flex-col">
        <h1 className="text-[50px] font-bold opacity-75 leading-10 mb-4">
          Redefinir Senha
        </h1>

        <p className="text-[12px]">
          Quando você precisa recomeçar, a redefinição de senha é o primeiro
          passo para reconquistar o acesso e retomar o controle da sua conta.
          Nunca subestime o poder de uma nova senha para abrir caminho a um
          recomeço promissor.
        </p>

        <div className="h-2 w-1/2 bg-primaryColor rounded-full mt-2"></div>
      </div>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-5">
          <label htmlFor="senha1" className="text-[12px]">
            Nova Senha
          </label>
          <input
            type="password"
            id="senha1"
            autoComplete="off"
            {...register("senha1")}
            onChange={(e) => {
              setSenha1(e.target.value);
            }}
            className="bg-[#D9D9D9] w-full px-2 border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm"
          />
          <span className="text-red-500 text-[12px] mt-1">
            {errors?.senha1?.message}
          </span>
        </div>

        <div className="flex flex-col mt-5">
          <label htmlFor="senha2" className="text-[12px]">
            Repita a Nova Senha
          </label>
          <input
            type="password"
            id="senh2"
            autoComplete="off"
            {...register("senha2")}
            onChange={(e) => {
              setSenha2(e.target.value);
            }}
            className="bg-[#D9D9D9] w-full px-2 border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm"
          />
          <span className="text-red-500 text-[12px] mt-1">
            {errors?.senha2?.message}
            {senha2 != "" && senha1 != senha2 && " As senhas são difetentes"}
          </span>
        </div>

        <div className="flex justify-end font-semibold text-[12px] text-primaryColor mt-1">
          <Link to={"/"}>Já me lembro da Senha, fazer login.</Link>
        </div>

        <button
          className={`w-full mt-10 bg-primaryColor text-secudaryColor rounded-md px-4 py-2 items-center shadow-2xl ${
            senha1 != "" &&
            senha2 != "" &&
            senha1 == senha2 &&
            "hover:bg-hoverColor hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
          }`}
          type="submit"
          disabled={
            senha1 != "" && senha2 != "" && senha1 == senha2 ? false : true
          }
        >
          Alterar
        </button>
      </form>

      {/* copyrihgt */}
      <div className="flex justify-center font-light text-[12px] text-primaryColor">
        © 2023- NovatronicaST. todos os direitos reservados
      </div>
    </div>
  );
};

export default RedefinirSenha;
