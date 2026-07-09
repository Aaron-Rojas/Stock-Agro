import React, { useEffect, useState, useRef } from "react";
import { Contenedor } from "../components/atoms/Contenedor";
import { useAccesibilidad } from "../hooks/useAccesibilidad";
import { useNavigate } from "react-router-dom";
import { MenuOpciones } from "../components/organisms/MenuOpciones";

const TEXTO_LECTURA = `Bienvenido a Agro Kiosko, tu asistente agrícola inteligente. Presiona cualquier número del 1 al 4 para las opciones principales. Presiona el número 5 para ver el video de consejos de uso, o presiona el número 6 para responder la encuesta de satisfacción.`;

export const Home = () => {
  const { temaActual, nivelLetra, showFeedbackModal } = useAccesibilidad();
  const navigate = useNavigate();
  
  // Estados para controlar el modal y el video
  const [mostrarModal, setMostrarModal] = useState(false);
  const [reproduciendo, setReproduciendo] = useState(false);
  const videoRef = useRef(null); // Referencia al video nativo

  const tamanoTitulo =
    nivelLetra === "normal"
      ? "30px"
      : nivelLetra === "grande"
        ? "38px"
        : "45px";

  // Función para alternar Play/Pausa en el video nativo
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

  // Función para cerrar el modal de forma segura (Pausando el video)
  const cerrarModalVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setReproduciendo(false);
    setMostrarModal(false);
  };

  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(TEXTO_LECTURA);
      utterance.lang = "es-ES";
      utterance.rate = 0.85; 
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
      const numericKeys = {
        "1": "Uno",
        "2": "Dos",
        "3": "Tres",
        "4": "Cuatro",
        "5": "Cinco",
        "6": "Seis",
      };

      if (numericKeys[event.key]) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(numericKeys[event.key]);
        utterance.lang = "es-ES";
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);

        const keyLabels = {
          "1": "El clima de hoy",
          "2": "Calculadora para comprar semillas y abono",
          "3": "Ver si hay plagas en tu zona",
          "4": "Elegir qué cultivo vas a sembrar",
          "5": "Ver video explicativo de consejos de uso",
          "6": "Responder la encuesta para darnos tu opinión"
        };
        showFeedbackModal(event.key, keyLabels[event.key]);

        const actionDelayMs = 3000;

        if (event.key === "1") {
          setTimeout(() => navigate("/Clima"), actionDelayMs);
        } else if (event.key === "3") {
          setTimeout(() => navigate("/Plagas"), actionDelayMs);
        } else if (event.key === "2") {
          setTimeout(() => navigate("/Calculadora"), actionDelayMs);
        } else if (event.key === "4") {
          setTimeout(() => navigate("/seleccion-cultivo"), actionDelayMs);
        } else if (event.key === "5") {
          setTimeout(() => setMostrarModal(true), actionDelayMs);
        } else if (event.key === "6") {
          setTimeout(() => navigate("/encuesta"), actionDelayMs);
        }
      } else if (event.key === "Escape") {
        cerrarModalVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, showFeedbackModal]);


  return (
    <Contenedor>
      {/* Título de la pantalla */}
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h1
          style={{
            color: temaActual.textoPrincipal,
            fontSize: tamanoTitulo,
            fontFamily: "monospace",
            letterSpacing: "3px",
            margin: 0,
          }}
        >
          INICIO
        </h1>
      </div>

      <MenuOpciones />

      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "25px", 
        marginTop: "40px", 
        paddingBottom: "40px",
        flexWrap: "wrap" 
      }}>
        
        <button
          onClick={() => {
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
            setMostrarModal(true);
          }}
          style={{
            backgroundColor: "#4CAF50",
            color: "#000000",
            border: "4px solid #000000",
            borderRadius: "15px",
            padding: nivelLetra === "normal" ? "18px 35px" : "26px 45px",
            fontSize: nivelLetra === "normal" ? "22px" : "30px",
            fontWeight: "bold",
            cursor: "pointer",
            fontFamily: "monospace",
            boxShadow: "0px 6px 0px #000000",
            transition: "transform 0.1s, box-shadow 0.1s"
          }}
        >
          📺 [5] CONSEJOS PARA USAR
        </button>

        <button
          onClick={() => {
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
            navigate("/encuesta");
          }}
          style={{
            backgroundColor: "#2196F3",
            color: "#FFFFFF",
            border: "4px solid #000000",
            borderRadius: "15px",
            padding: nivelLetra === "normal" ? "18px 35px" : "26px 45px",
            fontSize: nivelLetra === "normal" ? "22px" : "30px",
            fontWeight: "bold",
            cursor: "pointer",
            fontFamily: "monospace",
            boxShadow: "0px 6px 0px #000000",
            transition: "transform 0.1s, box-shadow 0.1s"
          }}
        >
          📝 [6] RESPONDER ENCUESTA
        </button>

      </div>

      {/* MODAL EMERGENTE (AHORA CON VIDEO NATIVO) */}
      {mostrarModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            padding: "20px"
          }}
        >
          <div
            style={{
              backgroundColor: temaActual.fondoPrincipal || "#FFFFFF",
              border: `5px solid ${temaActual.textoPrincipal || "#000000"}`,
              borderRadius: "20px",
              width: "90%",
              maxWidth: "900px",
              padding: "25px",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}
          >
            <div style={{ textAlign: "center" }}>
              <h2 style={{ margin: 0, fontFamily: "monospace", color: temaActual.textoPrincipal, fontSize: nivelLetra === "normal" ? "24px" : "32px" }}>
                📺 CONSEJOS DE USO
              </h2>
            </div>

            {/* REPRODUCTOR NATIVO (Reemplaza a YouTube) */}
            <div style={{ width: "100%", borderRadius: "12px", overflow: "hidden", border: "3px solid #000", backgroundColor: "#000" }}>
              <video
                ref={videoRef}
                width="100%"
                controls={false} // Oculta los controles diminutos del navegador
              >
                <source src="/tutorial_final.mp4" type="video/mp4" />
                <track src="/sub.vvt" kind="subtitles" srcLang="es" label="Español" default />
                Tu navegador no soporta videos HTML5.
              </video>
            </div>

            {/* BOTONES GIGANTES DE CONTROL */}
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              
              {/* Botón de Play/Pausa */}
              <button
                onClick={alternarReproduccion}
                style={{
                  flex: 1,
                  padding: "15px",
                  fontSize: nivelLetra === "normal" ? "22px" : "28px",
                  fontWeight: "bold",
                  backgroundColor: reproduciendo ? "#FF9800" : "#4CAF50",
                  color: "#000000",
                  border: "4px solid #000000",
                  borderRadius: "15px",
                  cursor: "pointer",
                  fontFamily: "monospace"
                }}
              >
                {reproduciendo ? '⏸️ PAUSAR VIDEO' : '▶️ VER VIDEO'}
              </button>

              {/* Botón de Cerrar */}
              <button
                onClick={cerrarModalVideo}
                style={{
                  flex: 1,
                  padding: "15px",
                  fontSize: nivelLetra === "normal" ? "22px" : "28px",
                  fontWeight: "bold",
                  backgroundColor: "#E91E63",
                  color: "#FFFFFF",
                  border: "4px solid #000000",
                  borderRadius: "15px",
                  cursor: "pointer",
                  fontFamily: "monospace"
                }}
              >
                ❌ CERRAR (O ESC)
              </button>
            </div>

          </div>
        </div>
      )}
    </Contenedor>
  );
};