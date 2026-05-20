import React, { createContext, useState } from 'react';
import { temaColores } from '../theme/colores';

export const ContextoAccesibilidad = createContext();

export const ProveedorAccesibilidad = ({ children }) => {
  // Empezamos en modo normal (falso)
  const [esAltoContraste, setEsAltoContraste] = useState(false);
  const [nivelLetra, setNivelLetra] = useState('normal');
  // Funciones que cambiarán los estados
  const alternarContraste = () => setEsAltoContraste(!esAltoContraste);
  
  const cambiarTamanoLetra = (nuevoNivel) => setNivelLetra(nuevoNivel);

  // El tema activo que leerán los componentes
  const temaActual = esAltoContraste ? temaColores.altoContraste : temaColores.normal;

  //Función para el NavBar
 const aumentarLetra = () => {
    if (nivelLetra === 'normal') setNivelLetra('grande');
        else if (nivelLetra === 'grande') setNivelLetra('extra');
    };
 
 const disminuirLetra = () => {
    if (nivelLetra === 'extra') setNivelLetra('grande');
    else if (nivelLetra === 'grande') setNivelLetra('normal');
  }

  return (
    <ContextoAccesibilidad.Provider 
      value={{ 
        esAltoContraste, 
        nivelLetra, 
        temaActual, 
        alternarContraste,
        cambiarTamanoLetra,
        aumentarLetra,
        disminuirLetra
      }}
    >
      {children}
    </ContextoAccesibilidad.Provider>
  );
};