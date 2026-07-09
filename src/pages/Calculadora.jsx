import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contenedor } from '../components/atoms/Contenedor';
import { useAccesibilidad } from '../hooks/useAccesibilidad';

const TEXTO_LECTURA = `Ingrese en números la cantidad de hectáreas de tierra que tiene. Presione uno para continuar o 0 para regresar al menú principal.`;

export const Calculadora = () => {
  const { temaActual, nivelLetra, showFeedbackModal } = useAccesibilidad();
  const navigate = useNavigate();

  const calcularTamano = (tamanoBase) => {
    if (nivelLetra === 'grande') return (tamanoBase + 8) + 'px';
    if (nivelLetra === 'extra') return (tamanoBase + 16) + 'px';
    return tamanoBase + 'px';
  };

  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(TEXTO_LECTURA);
      utterance.lang = "es-ES";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // NOTA: El listener intercepta '0' y '1' globalmente interfiriendo con la entrada de datos en el input.
      if (event.key === "0" || event.key === "1") {
        window.speechSynthesis.cancel();
        const text = event.key === "1" ? "Uno" : "Cero";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "es-ES";
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
        
        if (event.key === "0") {
          showFeedbackModal("0", "Regresar a la pantalla de inicio", true);
        } else {
          showFeedbackModal("1", "Ver los resultados de la calculadora");
        }

        const actionDelayMs = 3000;
        setTimeout(() => {
          navigate(event.key === "1" ? "/resultados" : "/");
        }, actionDelayMs);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, showFeedbackModal]);

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
            onClick={() => navigate("/resultados")}
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
            <span style={{ backgroundColor: '#000', color: '#FFF', padding: '5px 15px', borderRadius: '10px' }}>1 </span>
            ← CONTINUAR
          </button>

          <button
            onClick={() => navigate('/')}
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