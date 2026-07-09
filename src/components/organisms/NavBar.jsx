import React, { useState, useEffect } from 'react'; // Agregamos useState y useEffect para controlar el micrófono
import { useNavigate } from 'react-router-dom';     // Agregamos useNavigate para poder cambiar de página por voz
import { useAccesibilidad } from '../../hooks/useAccesibilidad';
import { BotonAccesibilidad } from '../molecules/BotonAccesibilidad';
import { useTraduccion } from '../../hooks/useTraduccion';
// import Logo from '../../assets/logo.png'; 

export const NavBar = () => {

  const { idioma, cambiarIdioma, t } = useTraduccion();
  // Extraemos las funciones del cerebro
  const { temaActual, aumentarLetra, disminuirLetra, alternarContraste } = useAccesibilidad();
  const navigate = useNavigate(); // Hook para la navegación

  // Estados estrictamente necesarios para el micrófono
  const [escuchando, setEscuchando] = useState(false);
  const [reconocimiento, setReconocimiento] = useState(null);

  // Inicialización del reconocimiento de voz sin alterar nada más
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'es-ES';
      recognition.interimResults = false;

      recognition.onstart = () => setEscuchando(true);
      recognition.onend = () => setEscuchando(false);
      recognition.onerror = () => setEscuchando(false);

      recognition.onresult = (event) => {
        const comando = event.results[0][0].transcript.toLowerCase().trim().replace('.', '');
        console.log("Comando de voz recibido:", comando);

        // Lógica de navegación por comandos de voz
        if (comando.includes('clima') || comando.includes('tiempo') || comando.includes('Tiempo.') || comando.includes('Clima')) {
          navigate('/clima');
        } else if (comando.includes('plaga') || comando.includes('alerta')) {
          navigate('/plagas');
        } else if (comando.includes('calculadora') || comando.includes('calcular')) {
          navigate('/calculadora');
        } else if (comando.includes('configuracion') || comando.includes('ajustes')) {
          navigate('/configuracion');
        } else if (comando.includes('inicio') || comando.includes('regresar') || comando.includes('home')) {
          navigate('/');
        } else if (comando.includes('Cultivos') || comando.includes('cultivos') || comando.includes('cultivo') || comando.includes('Cultivos')) {
          navigate('/seleccion-cultivo');
        }
      };

      setReconocimiento(recognition);
    }
  }, [navigate]);

  // Función interna para activar o detener el micrófono
  const abrirMicrofono = () => {
    if (!reconocimiento) {
      alert("Tu navegador no soporta el reconocimiento de voz.");
      return;
    }

    if (escuchando) {
      reconocimiento.stop();
    } else {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel(); // Silencia lecturas automáticas activas para que no interfieran
      }
      reconocimiento.start();
    }
  };

  return (
    <nav className="navbar" style={{
      backgroundColor: temaActual.fondoNavbar,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      borderBottom: temaActual.fondoNavbar === '#000000' ? '2px solid red' : 'none' // Línea roja en alto contraste
    }}>

      {/* Zona Izquierda: Logo (Aquí puedes poner tu etiqueta <img /> luego) */}
      <div style={{ color: temaActual.textoNavbar, fontWeight: 'bold', fontSize: '30px' }}>
        🌿 Agro-Kiosko
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BotonAccesibilidad icono="🔊" accionClick={() => console.log('Activar voz')} />
        <BotonAccesibilidad icono="+T" accionClick={aumentarLetra} />
        <BotonAccesibilidad icono="-T" accionClick={disminuirLetra} />

        {/* Modificado únicamente para llamar a la función de reconocimiento de voz y cambiar el icono dinámicamente si está activo */}
        <BotonAccesibilidad icono={escuchando ? "🛑" : "🎙️"} accionClick={abrirMicrofono} />

        <BotonAccesibilidad icono="🌓" accionClick={alternarContraste} />
      </div>

      <div className="selector-idioma" style={{ marginLeft: 'auto', padding: '0 10px' }}>
        <button
          onClick={() => cambiarIdioma(idioma === 'es' ? 'qu' : 'es')}
          aria-label="Cambiar idioma"
          style={{ cursor: 'pointer' }}
        >
          {idioma === 'es' ? '🌐 Runasimi (Quechua)' : '🌐 Español'}
        </button>
      </div>
    </nav>
  );
};