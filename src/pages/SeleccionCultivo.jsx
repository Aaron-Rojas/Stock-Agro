import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Contenedor } from '../components/atoms/Contenedor';
import { useAccesibilidad } from '../hooks/useAccesibilidad';

import imgPapa from '../assets/papa.jpeg'; 
import imgTomate from '../assets/tomate.jpeg';

export const SeleccionCultivo = () => {
  const { temaActual, calcularTamano } = useAccesibilidad();
  const navegar = useNavigate();

  const seleccionarCultivo = (tipoCultivo) => {
    navegar('/calculadora'); 
  };

  return (
    <Contenedor>
      <div style={{ padding: '40px', textAlign: 'center', flex: 1 }}>
        <h1 style={{ color: temaActual.textoPrincipal, fontSize: calcularTamano(40), fontFamily: 'monospace' }}>
            ¿QUÉ VAS A SEMBRAR?
        </h1>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '40px', flexWrap: 'wrap' }}>
          
          <button onClick={() => seleccionarCultivo('papa')} style={{ 
            backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' 
          }}>
            <img src={imgPapa} alt="Papa" style={{ width: '300px', height: '250px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
            <div style={{ backgroundColor: '#1B5E20', width: '100%', padding: '15px 0', borderRadius: '0 0 10px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
              <span style={{ backgroundColor: '#000', color: '#FFF', padding: '5px 15px', borderRadius: '10px', fontSize: calcularTamano(24), fontWeight: 'bold' }}>1</span>
              <span style={{ color: '#FFF', fontSize: calcularTamano(30), fontWeight: 'bold', fontFamily: 'monospace' }}>PAPA</span>
            </div>
          </button>

          <button onClick={() => seleccionarCultivo('tomate')} style={{ 
            backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' 
          }}>
            <img src={imgTomate} alt="Tomate" style={{ width: '300px', height: '250px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
            <div style={{ backgroundColor: '#1B5E20', width: '100%', padding: '15px 0', borderRadius: '0 0 10px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
              <span style={{ backgroundColor: '#000', color: '#FFF', padding: '5px 15px', borderRadius: '10px', fontSize: calcularTamano(24), fontWeight: 'bold' }}>2</span>
              <span style={{ color: '#FFF', fontSize: calcularTamano(30), fontWeight: 'bold', fontFamily: 'monospace' }}>TOMATE</span>
            </div>
          </button>

        </div>

        <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => navegar('/')} style={{ 
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