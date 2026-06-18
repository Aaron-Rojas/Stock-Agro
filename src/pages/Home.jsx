import React, { useEffect, useState } from "react";
import { Contenedor } from "../components/atoms/Contenedor";
import { useAccesibilidad } from "../hooks/useAccesibilidad";
import { useNavigate } from "react-router-dom";
import { MenuOpciones } from "../components/organisms/MenuOpciones";

export const Home = () => {
  const { temaActual, nivelLetra } = useAccesibilidad();
  const navigate = useNavigate();
  
  // Estado para controlar si el modal del video está abierto o cerrado
  const [mostrarModal, setMostrarModal] = useState(false);

  const tamanoTitulo =
    nivelLetra === "normal"
      ? "30px"
      : nivelLetra === "grande"
        ? "38px"
        : "45px";

  // 🔊 Audio de bienvenida actualizado: ahora incluye las instrucciones para el video (5) y la encuesta (6)
  const textoLectura = `Bienvenido a Agro Kiosko, tu asistente agrícola inteligente. Presiona cualquier número del 1 al 4 para las opciones principales. Presiona el número 5 para ver el video de consejos de uso, o presiona el número 6 para responder la encuesta de satisfacción.`;

  useEffect(() => {
    const ejecutarLectura = () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textoLectura);
        utterance.lang = "es-ES";
        utterance.rate = 0.85; // Velocidad pausada ideal para la zona rural
        window.speechSynthesis.speak(utterance);
      }
    };

    ejecutarLectura();

    const handleKeyDown = (event) => {
      if (event.key === "1") {
        window.speechSynthesis.cancel();
        navigate("/Clima");
      } else if (event.key === "3") {
        window.speechSynthesis.cancel();
        navigate("/Plagas");
      } else if (event.key === "2") {
        window.speechSynthesis.cancel();
        navigate("/Calculadora");
      } else if (event.key === "4") {
        window.speechSynthesis.cancel();
        navigate("/seleccion-cultivo");
      } else if (event.key === "5") {
        window.speechSynthesis.cancel();
        setMostrarModal(true); // Abre el modal multimedia
      } else if (event.key === "6") {
        window.speechSynthesis.cancel();
        navigate("/encuesta"); // Va directo a la encuesta IHM
      } else if (event.key === "Escape") {
        setMostrarModal(false); // Cierra el video con la tecla Escape
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [navigate, textoLectura]);

  // ⚠️ REEMPLAZA ESTO con las letras y números finales de tu enlace de YouTube
  const ID_VIDEO_YOUTUBE = "TU_ID_DE_VIDEO_AQUÍ"; 

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

      {/* Tus 4 botones en cuadrícula limpia */}
      <MenuOpciones />

      {/* 🟢 SECCIÓN DE BOTONES COMPLEMENTARIOS GIGANTES */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "25px", 
        marginTop: "40px", 
        paddingBottom: "40px",
        flexWrap: "wrap" 
      }}>
        
        {/* Botón [5] - Consejos de Uso (Verde) */}
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
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(4px)";
            e.currentTarget.style.boxShadow = "0px 2px 0px #000000";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = "0px 6px 0px #000000";
          }}
        >
          📺 [5] CONSEJOS PARA USAR
        </button>

        {/* Botón [6] - Encuesta IHM (Azul) */}
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
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(4px)";
            e.currentTarget.style.boxShadow = "0px 2px 0px #000000";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = "0px 6px 0px #000000";
          }}
        >
          📝 [6] RESPONDER ENCUESTA
        </button>

      </div>

      {/* MODAL EMERGENTE PARA EL VIDEO DE YOUTUBE */}
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
            {/* Título interno del modal */}
            <div style={{ textAlign: "center" }}>
              <h2 style={{ margin: 0, fontFamily: "monospace", color: temaActual.textoPrincipal, fontSize: nivelLetra === "normal" ? "24px" : "32px" }}>
                📺 CONSEJOS DE USO
              </h2>
            </div>

            {/* Iframe con el reproductor de YouTube */}
            <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", border: "3px solid #000" }}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${ID_VIDEO_YOUTUBE}?autoplay=1&cc_load_policy=1&cc_lang_pref=es`}
                title="Video de Consejos de Uso"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Botón de cierre gigante */}
            <button
              onClick={() => setMostrarModal(false)}
              style={{
                width: "100%",
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
              ❌ CERRAR VIDEO (O presiona ESC)
            </button>
          </div>
        </div>
      )}
    </Contenedor>
  );
};