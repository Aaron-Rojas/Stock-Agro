import React from 'react';
import { useAccesibilidad } from '../../hooks/useAccesibilidad';

export const BotonAccesibilidad = ({ icono, accionClick }) => {
  const { temaActual } = useAccesibilidad();

  return (
    <button 
      onClick={accionClick}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        borderRight: `2px solid ${temaActual.lineaNavbar}`, 
        color: temaActual.textoNavbar,
        fontSize: '24px',
        padding: '10px 20px',
        cursor: 'pointer'
      }}
    >
      {icono}
    </button>
  );
};