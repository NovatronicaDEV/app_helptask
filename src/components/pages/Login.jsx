import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import axios from "axios";

//Icons
import { FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";

//Image
import Rectangle_1 from "../../assets/Rectangle_1.png";

const schema = object({
  senha: string().required("Campo Obrigatório.").max(24, ""),
  email: string()
    .required("Campo Obrigatório.")
    .email("Insira um endereço de e-mail válido.")
    .max(40, ""),
});

const loginUser = async (email, password) => {
 
  try {
   
    const response = await axios.post("http://localhost:3000/users/login", {
      email,
      password,
    });
   
    return response.data; // assuming the API returns data with token or user information
  } catch (error) {
    throw new Error("Failed to login"); // handle error appropriately
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {

    try {

      const response = await loginUser(data.email, data.senha);
      const token = response.token; // assuming the API returns the token as 'token'
      
      localStorage.setItem("userToken", token);

      navigate("/pages/tarefas");
    } catch (error) {
      console.log("erro");
    }
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
        <div className="flex items-center">
          <h1 className="text-[50px] font-bold opacity-75 leading-10 mb-4">
            Entrar
          </h1>

          <div className="h-2 w-1/4 bg-primaryColor rounded-full mt-7"></div>
        </div>
        <p className="text-[12px]">
          Seja bem-vindo(a) ao mundo do Help Task, onde a organização e o
          sucesso caminham juntos. Faça login agora e comece a tornar sua vida
          mais produtiva!
        </p>
      </div>

      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
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
        <div className="flex flex-col mt-5">
          <label htmlFor="senha" className="text-[12px]">
            Password
          </label>
          <input
            type="password"
            id="senha"
            autoComplete="off"
            {...register("senha")}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
            className="bg-[#D9D9D9] w-full px-2 border-none rounded-md py-2 focus:outline-none focus:border-primaryColor focus:ring-primaryColor focus:ring-1 sm:text-sm"
          />
          <span className="text-red-500 text-[12px] mt-1">
            {errors?.senha?.message}
          </span>
        </div>
        <div className="flex justify-end font-semibold text-[12px] text-primaryColor mt-1">
          <Link to={"recuperar"}>Esqueci minha password.</Link>
        </div>
        <div className="flex gap-2 items-center text-[12px] mt-4">
          <input
            type="checkbox"
            className="checked:bg-primaryColor"
          />{" "}
          Lembrar meus dados
        </div>

        <button
          className={`w-full mt-10 bg-primaryColor text-secudaryColor rounded-md px-4 py-2 items-center shadow-2xl ${
            email !== "" && senha !== ""
              ? "hover:bg-hoverColor hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
              : ""
          }`}
          type="submit"
          disabled={email !== "" && senha !== "" ? false : true}
        >
          Entrar
        </button>
      </form>

      {/* copyrihgt */}
      <div className="flex justify-center font-light text-[12px] text-primaryColor">
        © 2023- NovatronicaST. todos os direitos reservados
      </div>
    </div>
  );
};

export default Login;
