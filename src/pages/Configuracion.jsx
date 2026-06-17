import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contenedor } from '../components/atoms/Contenedor';
import { useAccesibilidad } from '../hooks/useAccesibilidad';

export const Configuracion = () => {
  const { 
    temaActual, 
    esAltoContraste, 
    nivelLetra, 
    cambiarTamanoLetra, 
    alternarContraste 
  } = useAccesibilidad();
  
  const navegar = useNavigate();
  
  // Estado para el modal de Simplificar
  const [mostrarModal, setMostrarModal] = useState(false);

  // 1. LÓGICA PARA QUE SE VEA EL CAMBIO DE LETRA AL INSTANTE
  // Esta función suma píxeles dependiendo de lo que elija el usuario
  const calcularTamano = (tamanoBase) => {
    if (nivelLetra === 'grande') return (tamanoBase + 8) + 'px';
    if (nivelLetra === 'extra') return (tamanoBase + 16) + 'px';
    return tamanoBase + 'px';
  };

  // 2. LÓGICA PARA LOS BOTONES DE SELECCIÓN DE FUENTE
  const obtenerEstiloBotonLetra = (nivel) => {
    const estaActivo = nivelLetra === nivel;
    return {
      backgroundColor: estaActivo ? temaActual.textoPrincipal : (esAltoContraste ? '#1F2937' : '#FFF59D'),
      color: estaActivo ? temaActual.fondoPrincipal : temaActual.textoPrincipal,
      border: `4px solid ${temaActual.bordePrincipal}`,
      padding: '20px 30px',
      borderRadius: '10px',
      fontSize: nivel === 'normal' ? '24px' : nivel === 'grande' ? '32px' : '40px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontFamily: 'monospace'
    };
  };

  // Color dinámico para las cajas 
  const colorCaja = esAltoContraste ? '#1F2937' : '#FFF59D';

  return (
    <Contenedor>
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ color: temaActual.textoPrincipal, fontSize: calcularTamano(40), fontFamily: 'monospace' }}>
          ⚙️ ¿DESEAS HACER CAMBIOS EN LA PÁGINA?
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', width: '100%' }}>
          <p style={{ color: temaActual.textoPrincipal, fontSize: calcularTamano(28), fontWeight: 'bold', marginBottom: '20px' }}>
            TAMAÑO DE TEXTO
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
            <button onClick={() => cambiarTamanoLetra('normal')} style={obtenerEstiloBotonLetra('normal')}>
              A Normal
            </button>
            <button onClick={() => cambiarTamanoLetra('grande')} style={obtenerEstiloBotonLetra('grande')}>
              A Grande
            </button>
            <button onClick={() => cambiarTamanoLetra('extra')} style={obtenerEstiloBotonLetra('extra')}>
              A Extra
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginTop: '20px' }}>
          <div style={{ backgroundColor: colorCaja, border: `4px solid ${temaActual.bordePrincipal}`, padding: '20px 40px', borderRadius: '10px', fontSize: calcularTamano(30), fontWeight: 'bold', color: temaActual.textoPrincipal }}>
            ACTIVAR MODO OSCURO
          </div>
          <button onClick={alternarContraste} style={{ fontSize: '50px', padding: '10px 20px', cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}>
            🌗
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <button 
            onClick={() => setMostrarModal(true)}
            style={{ backgroundColor: colorCaja, border: `4px solid ${temaActual.bordePrincipal}`, padding: '20px 40px', borderRadius: '10px', fontSize: calcularTamano(30), fontWeight: 'bold', color: temaActual.textoPrincipal, cursor: 'pointer' }}
          >
            SIMPLIFICAR PÁGINA [ ? ]
          </button>
        </div>

        <div style={{ marginTop: '30px', marginBottom: '50px' }}>
          <button 
            onClick={() => navegar('/')}
            style={{ backgroundColor: temaActual.botonPeligro, color: temaActual.textoBoton, border: `4px solid ${temaActual.bordePrincipal}`, borderRadius: '40px', padding: '20px 50px', fontSize: calcularTamano(30), fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}
          >
            <span style={{ backgroundColor: '#000', color: '#FFF', padding: '5px 15px', borderRadius: '10px' }}>0</span>
            ← REGRESAR
          </button>
        </div>

      </div>

      {mostrarModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{ backgroundColor: '#000', border: '4px solid #FFF', padding: '50px', borderRadius: '20px', textAlign: 'center', maxWidth: '700px' }}>
            <h2 style={{ color: '#FFF', fontSize: calcularTamano(40), marginBottom: '30px' }}>¡RECUERDE!</h2>
            <p style={{ color: '#FFF', fontSize: calcularTamano(24), margin: '30px 0', border: '2px solid #FFF', padding: '30px', borderRadius: '10px' }}>
              RECUERDE QUE LA PÁGINA QUE ESTÁ USANDO YA ESTÁ SIMPLIFICADA.
            </p>
            <button 
              onClick={() => setMostrarModal(false)}
              style={{ backgroundColor: '#1F2937', color: '#FFF', border: '4px solid #FFF', padding: '15px 40px', fontSize: calcularTamano(24), borderRadius: '40px', cursor: 'pointer', marginTop: '20px' }}
            >
              <span style={{ backgroundColor: '#000', padding: '5px 15px', borderRadius: '10px', marginRight: '10px' }}>0</span>
              ← REGRESAR
            </button>
          </div>
        </div>
      )}

    </Contenedor>
  );
};