import React from 'react';
import { useAccesibilidad } from '../../hooks/useAccesibilidad';
import { useNavigate } from 'react-router-dom';

export const Contenedor = ({ children }) => {
  const { temaActual } = useAccesibilidad();
  const navegar = useNavigate();

  return (
    <div style={{ 
      backgroundColor: temaActual.fondoPrincipal, 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {children}

      <button 
        onClick={() => navegar('/configuracion')}
        style={{
          position: 'fixed', 
          bottom: '30px',
          right: '30px',
          backgroundColor: '#FFFFFF',
          border: '4px solid #000000',
          borderRadius: '50%', 
          width: '70px',
          height: '70px',
          fontSize: '35px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
        ⚙️
      </button>

    </div>
  );
};