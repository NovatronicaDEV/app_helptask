import React from "react";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";

const ModalDelete = ({ setShowModal }) => {
  return (
    <div className="myOffcanva">
      <div className="w-full h-full fixed top-0 left-0">
        <div className="w-11/12 md:max-w-[400px] md:w-full absolute top-1/2 left-1/2 z-20 bg-secudaryColor rounded-md transform -translate-x-1/2 -translate-y-1/2 p-5 flex flex-col items-center justify-center">
          <AiOutlineDelete size={80} className="text-[#EF5858]" />
          <h2 className="py-5 text-xl">ALERTA DE EXCLUSÃO</h2>
          <p className="px-5 text-[14px] text-center">
            Se você tem certeza de que deseja prosseguir com a exclusão, por
            favor, clique no botão "Confirmar Exclusão" abaixo. Caso contrário,
            você pode simplesmente ignorar este alerta.
          </p>

          <div className="flex items-center sm:justify-end gap-2 mt-8 mb-5">
            <button
              className="bg-primaryColor bg-opacity-50 text-secudaryColor flex gap-2 rounded-md hover:bg-primaryColor px-4 py-2 items-center shadow-2xl hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out"
              onClick={() => setShowModal(false)}
            >
              <AiOutlineClose /> Fechar
            </button>
            <button className="bg-[#EF5858] text-secudaryColor flex gap-2 rounded-md hover:bg-[#E74C3C] px-4 py-2 items-center shadow-2xl hover:shadow-lg transform hover:scale-[103%] duration-300 ease-out">
              <AiOutlineDelete /> Apagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
