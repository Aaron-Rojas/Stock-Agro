import React, { useRef, useState } from 'react';
import { Contenedor } from '../components/atoms/Contenedor';
import { useNavigate } from 'react-router-dom';
import { useAccesibilidad } from '../hooks/useAccesibilidad';

export const Consejos = () => {
  const videoRef = useRef(null);
  const navegar = useNavigate();
  const { temaActual, calcularTamano } = useAccesibilidad();
  const [reproduciendo, setReproduciendo] = useState(false);

  const alternarReproduccion = () => {
    if (videoRef.current) {
      if (reproduciendo) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setReproduciendo(!reproduciendo);
    }
  };

  return (
    <Contenedor>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: temaActual.textoPrincipal, fontSize: calcularTamano(40), fontFamily: 'monospace' }}>
          📺 CONSEJOS DE USO
        </h1>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        
        <div style={{ width: '100%', maxWidth: '800px', borderRadius: '12px', border: `4px solid ${temaActual.textoPrincipal}`, backgroundColor: '#000' }}>
          <video
            ref={videoRef}
            width="100%"
            height="auto"
            controls={false}
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
        </div>

        {/* 🔘 BOTONES GIGANTES */}
        <div style={{ display: 'flex', gap: '30px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          
          <button onClick={alternarReproduccion} style={{
            fontSize: calcularTamano(30), padding: '20px 40px', cursor: 'pointer',
            backgroundColor: reproduciendo ? temaActual.botonPeligro : temaActual.botonExito,
            color: '#FFF', border: `4px solid ${temaActual.bordePrincipal}`, borderRadius: '15px', fontWeight: 'bold'
          }}>
            {reproduciendo ? '⏸️ PAUSAR' : '▶️ VER VIDEO'}
          </button>

          <button onClick={() => navegar('/')} style={{
            fontSize: calcularTamano(30), padding: '20px 40px', cursor: 'pointer',
            backgroundColor: temaActual.botonPeligro, color: '#FFF',
            border: `4px solid ${temaActual.bordePrincipal}`, borderRadius: '15px', fontWeight: 'bold'
          }}>
            <span style={{ backgroundColor: '#000', color: '#FFF', padding: '5px 15px', borderRadius: '10px', marginRight: '10px' }}>0</span>
            ⬅️ VOLVER
          </button>

        </div>
      </div>
    </Contenedor>
  );
};