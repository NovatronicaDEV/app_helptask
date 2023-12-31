import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

//Icons
import { FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

//Images
import Rectangle_1 from "../../assets/Rectangle_1.png";

const schema = object({
  email: string()
    .required("Campo Obrigatório.")
    .email("Insira um endereço de e-mail válido.")
    .max(40, ""),
});

const RecuperarSenha = () => {
  const [email, setEmail] = useState("");
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
          Recuperar Senha
        </h1>

        <p className="text-[12px]">
          Basta um clique para recuperar sua senha e retomar o controle total de
          suas tarefas no gestor de tarefas. Nunca deixe um obstáculo como uma
          senha esquecida atrapalhar seu progresso.
        </p>

        <div className="h-2 w-1/2 bg-primaryColor rounded-full mt-2"></div>
      </div>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-20">
          <label htmlFor="email" className="text-[12px]">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            {...register("email")}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#D9D9D9] w-full px-2 border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm"
          />
          <span className="text-red-500 text-[12px] mt-1">
            {errors?.email?.message}
          </span>
        </div>

        <div className="flex justify-end font-semibold text-[12px] text-primaryColor mt-1">
          <Link to={"/"}>Já me lembro da Senha, fazer login.</Link>
        </div>

        <button
          className={`w-full mt-10 bg-primaryColor text-secudaryColor rounded-md px-4 py-2 items-center shadow-2xl ${
            email != "" &&
            "hover:bg-hoverColor hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
          }`}
          type="submit"
          disabled={email != "" ? false : true}
        >
          Enviar
        </button>
      </form>

      {/* copyrihgt */}
      <div className="flex justify-center font-light text-[12px] text-primaryColor">
        © 2023- NovatronicaST. todos os direitos reservados
      </div>
    </div>
  );
};

export default RecuperarSenha;
