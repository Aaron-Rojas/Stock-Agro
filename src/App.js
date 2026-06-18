import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProveedorAccesibilidad } from "./context/ContextoAccesibilidad";
import { NavBar } from "./components/organisms/NavBar";
import { Home } from "./pages/Home";
import { Configuracion } from "./pages/Configuracion";
import { Calculadora } from "./pages/Calculadora";
import { SeleccionCultivo } from "./pages/SeleccionCultivo";
import { ResultadosCalculadora } from "./pages/ResultadosCalculadora";
import { Clima } from "./pages/Clima";
import { Plagas } from "./pages/Plagas";
import { CuidarSiembras } from "./pages/CuidarSiembras";

import { Encuesta } from "./pages/Encuesta";


export const App = () => {
  return (
    <ProveedorAccesibilidad>
      <Router>
        <NavBar />

        <Routes>
          {/* El Menú Principal */}
          <Route path="/" element={<Home />} />

          {/* Configuración */}
          <Route path="/configuracion" element={<Configuracion />} />

          {/* EL FLUJO DE LA CALCULADORA DE SIEMBRA */}
          <Route path="/seleccion-cultivo" element={<SeleccionCultivo />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/resultados" element={<ResultadosCalculadora />} />

          {/* Página del clima */}
          <Route path="/Clima" element={<Clima />} />

          {/* Página de plagas */}
          <Route path="/Plagas" element={<Plagas />} />

          {/* Página de cuidado de la siembra*/}
          <Route path="/CuidarSiembras" element={<CuidarSiembras />} />

          <Route path="/encuesta" element={<Encuesta />} />
        </Routes>
      </Router>
    </ProveedorAccesibilidad>
  );
};