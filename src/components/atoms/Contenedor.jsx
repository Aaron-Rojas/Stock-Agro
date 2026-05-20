import React from 'react';
import { useAccesibilidad } from '../../hooks/useAccesibilidad';

export const Contenedor = ({ children }) => {
  const { temaActual } = useAccesibilidad();

  return (
    <div style={{ 
      backgroundColor: temaActual.fondoPrincipal, 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column'
    }}>
      {children}
    </div>
  );
};