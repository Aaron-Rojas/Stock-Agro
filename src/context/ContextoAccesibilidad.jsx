import React, { createContext, useState } from 'react';
import { temaColores } from '../theme/colores';

export const ContextoAccesibilidad = createContext();

export const ProveedorAccesibilidad = ({ children }) => {
  // Empezamos en modo normal (falso)
  const [esAltoContraste, setEsAltoContraste] = useState(false);
  const [esLetraGrande, setEsLetraGrande] = useState(false);

  // Funciones que cambiarán los estados
  const alternarContraste = () => setEsAltoContraste(!esAltoContraste);
  const aumentarLetra = () => setEsLetraGrande(true);
  const disminuirLetra = () => setEsLetraGrande(false);

  // El tema activo que leerán los componentes
  const temaActual = esAltoContraste ? temaColores.altoContraste : temaColores.normal;

  return (
    <ContextoAccesibilidad.Provider 
      value={{ 
        esAltoContraste, 
        esLetraGrande, 
        temaActual, 
        alternarContraste,
        aumentarLetra,
        disminuirLetra
      }}
    >
      {children}
    </ContextoAccesibilidad.Provider>
  );
};