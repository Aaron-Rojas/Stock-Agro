import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Contenedor } from '../components/atoms/Contenedor';
import { useAccesibilidad } from '../hooks/useAccesibilidad';

export const ResultadosCalculadora = () => {
  const { temaActual, calcularTamano } = useAccesibilidad();
  const navegar = useNavigate();

  // Función para dibujar cada fila de resultado (Mantiene el código limpio)
  const renderFilaResultado = (cantidad, texto) => (
    <div style={{ 
      border: `4px solid ${temaActual.botonExito}`, 
      borderRadius: '10px',
      padding: '20px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '30px',
      width: '100%',
      maxWidth: '600px',
      backgroundColor: temaActual.fondoTarjeta
    }}>
      <span style={{ backgroundColor: '#FFF', color: '#000', padding: '10px 20px', fontSize: calcularTamano(30), fontWeight: 'bold' }}>
        {cantidad}
      </span>
      <span style={{ color: temaActual.textoPrincipal, fontSize: calcularTamano(30), fontWeight: 'bold', fontFamily: 'monospace' }}>
        {texto}
      </span>
    </div>
  );

  return (
    <Contenedor>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', gap: '30px', flex: 1 }}>
        
        {/* Título Principal */}
        <h1 style={{ color: temaActual.textoPrincipal, fontSize: calcularTamano(40), fontFamily: 'monospace', textAlign: 'center', maxWidth: '600px', lineHeight: '1.2' }}>
          Esto es lo que necesitas comprar
        </h1>

        {/* Filas de Resultados  */}
        {renderFilaResultado(10, 'sacos de semilla')}
        {renderFilaResultado(15, 'sacos de abono')}
        {renderFilaResultado(5, 'galones de agua')}

        {/* Botón Regresar */}
        <div style={{ marginTop: '40px' }}>
          <button onClick={() => navegar('/calculadora')} style={{ 
            backgroundColor: temaActual.botonPeligro, color: temaActual.textoBoton, border: `4px solid ${temaActual.bordePrincipal}`, borderRadius: '40px', padding: '20px 60px', fontSize: calcularTamano(30), fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' 
          }}>
            <span style={{ backgroundColor: '#000', color: '#FFF', padding: '5px 15px', borderRadius: '10px' }}>0</span>
            ← REGRESAR
          </button>
        </div>

      </div>
    </Contenedor>
  );
};