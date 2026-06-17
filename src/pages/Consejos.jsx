import React, { useRef, useState } from 'react';
import { Contenedor } from '../components/atoms/Contenedor';
import { Texto } from '../components/atoms/Texto';
import { useNavigate } from 'react-router-dom';
import { useAccesibilidad } from '../hooks/useAccesibilidad';

export const Consejos = () => {
  const videoRef = useRef(null);
  const navegar = useNavigate();
  const { esLetraGrande, temaActual } = useAccesibilidad();
  const [reproduciendo, setReproduciendo] = useState(false);

  // Funciones de control del video
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

  const reiniciarVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setReproduciendo(true);
    }
  };

  // Tamaños adaptativos basados en tu Hook de Accesibilidad
  const tamañoBoton = esLetraGrande ? '32px' : '22px';
  const paddingBoton = esLetraGrande ? '25px 40px' : '15px 25px';

  return (
    <Contenedor>
      {/* Encabezado de la pantalla */}
      <div style={{ padding: '20px', textAlign: 'center', borderBottom: `2px solid ${temaActual.textoPrincipal}` }}>
        <Texto>📺 [5] CONSEJOS PARA USAR EL AGRO-KIOSKO</Texto>
      </div>

      {/* Contenedor del Reproductor de Video */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        
        <div style={{ width: '100%', maxWidth: '800px', borderRadius: '12px', overflow: 'hidden', border: `4px solid ${temaActual.textoPrincipal}`, backgroundColor: '#000000' }}>
          <video
            ref={videoRef}
            width="100%"
            height="auto"
            controls={false} // Deshabilitamos los controles nativos pequeños
            preload="auto"
          >
            {/* Ruta al video en la carpeta public */}
            <source src="/consejos.mp4" type="video/mp4" />
            
            {/* Configuración de subtítulos automáticos en español */}
            <track 
              src="/consejos.vtt" 
              kind="subtitles" 
              srcLang="es" 
              label="Español" 
              default 
            />
            Tu navegador no soporta videos en HTML5.
          </video>
        </div>

        {/* 🔘 PANEL DE BOTONES GIGANTES */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '25px', flexWrap: 'wrap', justifyContent: 'center' }}>
          
          <button
            onClick={alternarReproduccion}
            style={{
              fontSize: tamañoBoton,
              padding: paddingBoton,
              cursor: 'pointer',
              backgroundColor: reproduciendo ? '#FFCC00' : '#4CAF50',
              color: '#000000',
              border: '4px solid #000000',
              borderRadius: '15px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {reproduciendo ? '⏸️ PAUSAR' : '▶️ VER VIDEO'}
          </button>

          <button
            onClick={reiniciarVideo}
            style={{
              fontSize: tamañoBoton,
              padding: paddingBoton,
              cursor: 'pointer',
              backgroundColor: '#2196F3',
              color: '#FFFFFF',
              border: '4px solid #000000',
              borderRadius: '15px',
              fontWeight: 'bold'
            }}
          >
            🔄 REPETIR
          </button>

          <button
            onClick={() => navegar(-1)} // Regresa a la pantalla anterior (Menú principal)
            style={{
              fontSize: tamañoBoton,
              padding: paddingBoton,
              cursor: 'pointer',
              backgroundColor: '#E91E63',
              color: '#FFFFFF',
              border: '4px solid #000000',
              borderRadius: '15px',
              fontWeight: 'bold'
            }}
          >
            ⬅️ VOLVER
          </button>

        </div>

      </div>
    </Contenedor>
  );
};