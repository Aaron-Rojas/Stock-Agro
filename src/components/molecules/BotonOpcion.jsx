import React from 'react';
import { useAccesibilidad } from '../../hooks/useAccesibilidad';

export const BotonOpcion = ({ numero, icono, texto, accionClick }) => {
  const { temaActual, nivelLetra } = useAccesibilidad();

  const tamanoLetra = nivelLetra === 'normal' ? '16px' : nivelLetra === 'grande' ? '22px' : '26px';

  return (
    <button 
      onClick={accionClick}
      style={{
        backgroundColor: temaActual.fondoTarjeta,
        border: `4px solid ${temaActual.bordePrincipal}`,
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        cursor: 'pointer',
        minHeight: '250px' 
      }}
    >
      {/* La etiqueta del número */}
      <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
        <span style={{ 
          backgroundColor: '#000', 
          color: '#FFF', 
          padding: '5px 12px', 
          borderRadius: '8px', 
          fontWeight: 'bold',
          fontSize: '20px'
        }}>
          {numero}
        </span>
      </div>

      <div style={{ fontSize: '50px', margin: '10px 0' }}>
        {icono}
      </div>

      <span style={{ 
        color: temaActual.textoPrincipal, 
        fontSize: tamanoLetra ? '26px' : '16px', 
        fontWeight: 'bold', 
        fontFamily: 'monospace',
        textAlign: 'center'
      }}>
        {texto}
      </span>
    </button>
  );
};