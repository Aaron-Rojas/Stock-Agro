import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProveedorAccesibilidad } from './context/ContextoAccesibilidad';
import { NavBar } from './components/organisms/NavBar';
import { Home } from './pages/Home';
import { Configuracion } from './pages/Configuracion'; 

export const App = () => {
  return (
    <ProveedorAccesibilidad>
      <Router>
        
        <NavBar /> 
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Routes>

      </Router>
    </ProveedorAccesibilidad>
  );
};