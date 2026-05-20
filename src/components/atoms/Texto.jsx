import React from 'react';
import { useAccesibilidad } from '../../hooks/useAccesibilidad';

export const Texto = ({ children }) => {
  const { temaActual, esLetraGrande } = useAccesibilidad();

  return (
    <span style={{ 
      color: temaActual.textoPrincipal, 
      fontSize: esLetraGrande ? '24px' : '16px',
      fontFamily: 'monospace' 
    }}>
      {children}
    </span>
  );
};