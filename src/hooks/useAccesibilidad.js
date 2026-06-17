// src/hooks/usarAccesibilidad.js
import { useContext } from 'react';
import { ContextoAccesibilidad } from '../context/ContextoAccesibilidad';

export const useAccesibilidad = () => {
  return useContext(ContextoAccesibilidad);
};
    