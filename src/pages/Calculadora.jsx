import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Contenedor } from '../components/atoms/Contenedor';
import { useAccesibilidad } from '../hooks/useAccesibilidad';

export const Calculadora = () => {
  const { temaActual, nivelLetra } = useAccesibilidad();
  const navegar = useNavigate();

  const calcularTamano = (tamanoBase) => {
    if (nivelLetra === 'grande') return (tamanoBase + 8) + 'px';
    if (nivelLetra === 'extra') return (tamanoBase + 16) + 'px';
    return tamanoBase + 'px';
  };

  return (
    <Contenedor>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '40px', gap: '60px' }}>
        
        <h1 style={{ 
          color: temaActual.textoPrincipal, 
          fontSize: calcularTamano(40), 
          fontFamily: 'monospace', 
          textAlign: 'center', 
          maxWidth: '800px' 
        }}>
          ¿CUÁNTAS HECTÁREAS DE TIERRA TIENES?
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input 
            type="number" 
            placeholder="Ingrese un número"
            style={{
              padding: '20px',
              fontSize: calcularTamano(24),
              border: `4px solid ${temaActual.bordePrincipal}`,
              borderRadius: '10px',
              backgroundColor: temaActual.fondoTarjeta,
              color: temaActual.textoPrincipal,
              width: '300px'
            }}
          />
          <span style={{ 
            color: temaActual.textoPrincipal, 
            fontSize: calcularTamano(35), 
            fontWeight: 'bold', 
            fontFamily: 'monospace' 
          }}>
            Hectáreas
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '40px' }}>
          
          <button 
            onClick={() => navegar("/resultados")}
            style={{ 
              backgroundColor: temaActual.botonExito, 
              color: temaActual.textoBoton, 
              border: `4px solid ${temaActual.bordePrincipal}`, 
              borderRadius: '40px', 
              padding: '20px 60px', 
              fontSize: calcularTamano(30), 
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              cursor: 'pointer' 
            }}
          >
            <span style={{ backgroundColor: '#000', color: '#FFF', padding: '5px 15px', borderRadius: '10px' }}>ENTER</span>
            ← CONTINUAR
          </button>

          <button 
            onClick={() => navegar('/')}
            style={{ 
              backgroundColor: temaActual.botonPeligro, 
              color: temaActual.textoBoton, 
              border: `4px solid ${temaActual.bordePrincipal}`, 
              borderRadius: '40px', 
              padding: '20px 60px', 
              fontSize: calcularTamano(30), 
              fontWeight: 'bold', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              cursor: 'pointer' 
            }}
          >
            <span style={{ backgroundColor: '#000', color: '#FFF', padding: '5px 15px', borderRadius: '10px' }}>0</span>
            ← REGRESAR
          </button>

        </div>
      </div>
    </Contenedor>
  );
};