import "./App.css";

import { useEffect } from "react";
import {
  BrowserRouter,
  Outlet,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Aos from "aos";

import NavbarVertical from "./components/UI/NavbarVertical";
import Clientes from "./components/pages/Clientes";
import Tarefas from "./components/pages/Tarefas";
import Configuracao from "./components/pages/Configuracao";
import Login from "./components/pages/Login";
import WelcomeInfo from "./components/UI/WelcomeInfo";
import RecuperarSenha from "./components/pages/RecuperarSenha";
import RedefinirSenha from "./components/pages/RedefinirSenha";
import VerCliente from "./components/pages/VerCliente";
import VerTarefa from "./components/pages/VerTarefa";

function Layout() {
  /* const navigate = useNavigate();
  navigate(0); */

  return (
    <div className="flex flex-row h-screen w-screen">
      {/* NavBar Vertical */}
      <NavbarVertical />
      {/* /NavBar Vertical */}

      {/* Body */}

      <div className="flex w-full">
        <Outlet />
      </div>

      {/* /Body */}
    </div>
  );
}

function Layout2() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-0">
      <Outlet />

      <WelcomeInfo />
    </div>
  );
}

function App() {
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout2 />}>
          <Route path="/" element={<Login />} />
          <Route path="recuperar" element={<RecuperarSenha />} />
          <Route path="redefinir" element={<RedefinirSenha />} />
        </Route>
        <Route path="pages" element={<Layout />}>
          <Route path="clientes" element={<Clientes />} />
          <Route path="verClientes/:id" element={<VerCliente />} />
          <Route path="tarefas" element={<Tarefas />} />
          <Route path="verTarefas/:id" element={<VerTarefa />} />
          <Route path="configuracoes" element={<Configuracao />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
