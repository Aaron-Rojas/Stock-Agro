import React, { createContext, useState } from 'react';
import { temaColores } from '../theme/colores';

export const ContextoAccesibilidad = createContext();

export const ProveedorAccesibilidad = ({ children }) => {
  // Empezamos en modo normal (falso)
  const [esAltoContraste, setEsAltoContraste] = useState(false);
  const [nivelLetra, setNivelLetra] = useState('normal');
  
  // Estado para controlar el modal gigante de accesibilidad y confirmacion de botones
  const [modalFeedback, setModalFeedback] = useState({
    visible: false,
    key: '',
    label: '',
    isPanic: false
  });

  const alternarContraste = () => setEsAltoContraste(!esAltoContraste);
  
  const cambiarTamanoLetra = (nuevoNivel) => setNivelLetra(nuevoNivel);

  // El tema activo que leerán los componentes
  const temaActual = esAltoContraste ? temaColores.altoContraste : temaColores.normal;

  //Función para el NavBar
  const aumentarLetra = () => {
    if (nivelLetra === 'normal') setNivelLetra('grande');
    else if (nivelLetra === 'grande') setNivelLetra('extra');
  };
  
  const disminuirLetra = () => {
    if (nivelLetra === 'extra') setNivelLetra('grande');
    else if (nivelLetra === 'grande') setNivelLetra('normal');
  };

  const calcularTamano = (tamanoBase) => {
    if (nivelLetra === 'grande') return (tamanoBase + 8) + 'px';
    if (nivelLetra === 'extra') return (tamanoBase + 16) + 'px';
    return tamanoBase + 'px';
  };

  // Activa el modal visual grande y lo oculta automaticamente tras 3 segundos (3000ms)
  const showFeedbackModal = (key, label, isPanic = false) => {
    setModalFeedback({
      visible: true,
      key,
      label,
      isPanic
    });
    setTimeout(() => {
      setModalFeedback((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  return (
    <ContextoAccesibilidad.Provider 
      value={{ 
        esAltoContraste, 
        nivelLetra, 
        temaActual, 
        alternarContraste,
        cambiarTamanoLetra,
        aumentarLetra,
        disminuirLetra,
        calcularTamano,
        showFeedbackModal
      }}
    >
      {children}
      
      {/* MODAL GLOBAL DE ACCESIBILIDAD Y BOTÓN DE PÁNICO */}
      {modalFeedback.visible && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          {/* Estilos dinamicos insertados para la animacion del boton de panico */}
          <style>{`
            @keyframes panicBlink {
              0% { border-color: #FFEB3B; box-shadow: 0 0 20px #F44336; }
              50% { border-color: #D32F2F; box-shadow: 0 0 40px #FFEB3B; }
              100% { border-color: #FFEB3B; box-shadow: 0 0 20px #F44336; }
            }
            .panic-card {
              animation: panicBlink 1s infinite ease-in-out;
            }
          `}</style>

          <div 
            className={modalFeedback.isPanic ? "panic-card" : ""}
            style={{
              backgroundColor: modalFeedback.isPanic ? '#D32F2F' : (temaActual.fondoTarjeta || '#FFFFFF'),
              border: modalFeedback.isPanic ? '10px solid #FFEB3B' : `8px solid ${temaActual.textoPrincipal || '#000000'}`,
              borderRadius: '30px',
              padding: '50px 40px',
              width: '90%',
              maxWidth: '850px',
              textAlign: 'center',
              boxShadow: '0px 15px 40px rgba(0,0,0,0.6)',
              color: modalFeedback.isPanic ? '#FFFFFF' : (temaActual.textoPrincipal || '#000000'),
              fontFamily: 'monospace',
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {modalFeedback.isPanic ? (
              <>
                <span style={{ fontSize: calcularTamano(100), display: 'block' }}>🚨</span>
                <h1 style={{ fontSize: calcularTamano(40), margin: 0, fontWeight: '900', letterSpacing: '2px' }}>
                  ¡AYUDA!
                </h1>
                <p style={{ fontSize: calcularTamano(32), margin: 0, fontWeight: 'bold', color: '#FFEB3B' }}>
                  Presionaste regresar (Número 0)
                </p>
                <div style={{ width: '100%', height: '4px', backgroundColor: '#FFFFFF', margin: '10px 0' }} />
                <p style={{ fontSize: calcularTamano(26), margin: 0, fontWeight: 'bold' }}>
                  No te preocupes, te estamos llevando de vuelta al inicio de forma segura. ¡Espera un momento!
                </p>
              </>
            ) : (
              <>
                <span style={{ fontSize: calcularTamano(80), display: 'block' }}>💡</span>
                <h1 style={{ fontSize: calcularTamano(36), margin: 0, fontWeight: 'bold', letterSpacing: '1px' }}>
                  ¡Muy bien!
                </h1>
                <p style={{ fontSize: calcularTamano(28), margin: 0 }}>
                  Presionaste el número:
                </p>
                <div style={{
                  backgroundColor: temaActual.textoPrincipal || '#000000',
                  color: temaActual.fondoPrincipal || '#FFFFFF',
                  fontSize: calcularTamano(60),
                  fontWeight: 'bold',
                  padding: '15px 40px',
                  borderRadius: '20px',
                  border: `4px solid ${temaActual.textoPrincipal || '#000000'}`
                }}>
                  {modalFeedback.key}
                </div>
                <p style={{ fontSize: calcularTamano(26), margin: 0, fontWeight: 'bold' }}>
                  Ahora te llevaremos a: <span style={{ color: modalFeedback.isPanic ? '#FFEB3B' : '#2196F3', textDecoration: 'underline' }}>{modalFeedback.label}</span>
                </p>
                <p style={{ fontSize: calcularTamano(20), margin: 0, fontStyle: 'italic', opacity: 0.9 }}>
                  Cargando... Por favor espera un momento.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </ContextoAccesibilidad.Provider>
  );
};