import React, { useState, useEffect } from "react";
import { Contenedor } from "../components/atoms/Contenedor";
import { Texto } from "../components/atoms/Texto";
import { useAccesibilidad } from "../hooks/useAccesibilidad";
import { useNavigate } from "react-router-dom";

export const Encuesta = () => {
  const { temaActual, nivelLetra } = useAccesibilidad();
  const navigate = useNavigate();

  // Guardar las respuestas de las 5 preguntas (por defecto en 0 = sin responder)
  const [respuestas, setRespuestas] = useState({
    p1: 0,
    p2: 0,
    p3: 0,
    p4: 0,
    p5: 0,
  });

  const [enviado, setEnviado] = useState(false);

  // Ajuste de tamaños adaptativos para rural/adulto mayor
  const tamanoTitulo = nivelLetra === "normal" ? "28px" : nivelLetra === "grande" ? "36px" : "42px";
  const tamanoPregunta = nivelLetra === "normal" ? "22px" : nivelLetra === "grande" ? "28px" : "34px";
  const tamanoLeyenda = nivelLetra === "normal" ? "18px" : nivelLetra === "grande" ? "24px" : "28px";

  // Texto introductorio para la lectura de voz automática
  const textoIntroduccion = `Buenos días. Esta es una pequeña encuesta para saber cómo se sintió usando el Agro Kiosko. No hay respuestas buenas ni malas. Solo queremos saber qué tan de acuerdo está usted con lo que dice cada oración. Para responder, elija un número del 1 al 5. Su opinión es muy importante. Muchas gracias por su tiempo.`;

  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textoIntroduccion);
      utterance.lang = "es-ES";
      utterance.rate = 0.85; // Un poco más pausado para zonas rurales
      window.speechSynthesis.speak(utterance);
    }
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  const preguntas = [
    { id: "p1", num: "1", texto: "Cuando presioné una tecla, la pantalla me mostró claramente cuál opción elegí y escuché una voz que me explicó lo que pasó." },
    { id: "p2", num: "2", texto: "Cuando me equivoqué o quise empezar de nuevo, presioné la tecla [0] y el sistema me llevó al inicio fácilmente." },
    { id: "p3", num: "3", texto: "Cuando tuve que escribir números (como las hectáreas de mi terreno), el teclado numérico me resultó más fácil de usar que un ratón o pantalla táctil, y no me salté de pantalla por error." },
    { id: "p4", num: "4", texto: "Las palabras y las imágenes del Agro-Kiosko (como el saco de abono o el ícono del sol) me resultaron fáciles de entender porque se parecen a cosas que conozco del campo." },
    { id: "p5", num: "5", texto: "La pantalla principal del Agro-Kiosko me pareció ordenada y sin demasiada información, lo que me ayudó a saber rápidamente qué tecla presionar." }
  ];

  const manejarSeleccion = (preguntaId, valor) => {
    setRespuestas({ ...respuestas, [preguntaId]: valor });
    
    // Feedback de voz rápido al presionar una opción
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const opcionesTexto = ["Totalmente en desacuerdo", "En desacuerdo", "Neutral", "De acuerdo", "Totalmente de acuerdo"];
      const utterance = new SpeechSynthesisUtterance(`Marcado: ${opcionesTexto[valor - 1]}`);
      utterance.lang = "es-ES";
      window.speechSynthesis.speak(utterance);
    }
  };

  const enviarEncuesta = (e) => {
    e.preventDefault();
    // Validar que hayan respondido todas
    if (Object.values(respuestas).includes(0)) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Por favor, responda todas las preguntas antes de terminar."));
      }
      alert("Por favor, responda todas las preguntas antes de continuar.");
      return;
    }
    
    console.log("Resultados de la Encuesta IHM:", respuestas);
    setEnviado(true);
    
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance("Muchas gracias. Su respuesta ha sido guardada correctamente."));
    }
  };

  if (enviado) {
    return (
      <Contenedor>
        <div style={{ padding: "40px", textAlign: "center", marginTop: "10% "}}>
          <h2 style={{ color: temaActual.textoPrincipal, fontSize: tamanoTitulo, fontFamily: "monospace" }}>
            ¡MUCHAS GRACIAS! 🙏
          </h2>
          <p style={{ color: temaActual.textoPrincipal, fontSize: tamanoPregunta, fontFamily: "monospace", marginTop: "20px" }}>
            Su opinión nos ayuda a mejorar el Agro-Kiosko.
          </p>
          <button 
            onClick={() => navigate("/")}
            style={{
              marginTop: "40px",
              padding: "20px 40px",
              fontSize: tamanoPregunta,
              backgroundColor: "#2196F3",
              color: "#FFF",
              border: "4px solid #000",
              borderRadius: "15px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ⬅️ VOLVER AL INICIO
          </button>
        </div>
      </Contenedor>
    );
  }

  return (
    <Contenedor>
      {/* Encabezado */}
      <div style={{ padding: "20px", textAlign: "center", borderBottom: `4px solid ${temaActual.textoPrincipal}` }}>
        <h1 style={{ color: temaActual.textoPrincipal, fontSize: tamanoTitulo, fontFamily: "monospace", margin: 0 }}>
          📝 ENCUESTA DE EVALUACIÓN
        </h1>
      </div>

      {/* Introducción Amigable */}
      <div style={{ padding: "25px", backgroundColor: "rgba(0,0,0,0.03)", borderBottom: `2px dashed ${temaActual.textoPrincipal}` }}>
        <p style={{ color: temaActual.textoPrincipal, fontSize: tamanoLeyenda, fontFamily: "monospace", margin: 0, lineHeight: "1.6" }}>
          <strong>Buenos días.</strong> Esta es una pequeña encuesta para saber cómo se sintió usando el Agro-Kiosko. No hay respuestas buenas ni malas. Elija un número del 1 al 5 para responder. ¡Muchas gracias!
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={enviarEncuesta} style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        
        {preguntas.map((p) => (
          <div 
            key={p.id} 
            style={{ 
              marginBottom: "40px", 
              padding: "25px", 
              border: `3px solid ${temaActual.textoPrincipal}`, 
              borderRadius: "15px",
              backgroundColor: "#FFFFFF"
            }}
          >
            {/* Texto de la Pregunta */}
            <p style={{ color: "#000000", fontSize: tamanoPregunta, fontFamily: "monospace", fontWeight: "bold", marginTop: 0, marginBottom: "20px" }}>
              {p.num}. {p.texto}
            </p>

            {/* Opciones en bloque de Botones Grandes */}
            {/* Opciones en bloque de Botones Grandes con Código de Colores Semánticos */}
<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  {[
    { val: 1, txt: "1️⃣ Totalmente en desacuerdo", colorBase: "#FFEBEE", colorActivo: "#D32F2F" }, // Rojo suave / Rojo fuerte
    { val: 2, txt: "2️⃣ En desacuerdo", colorBase: "#FFEBEE", colorActivo: "#F44336" },           // Rojo suave / Rojo medio
    { val: 3, txt: "3️⃣ Neutral", colorBase: "#FFFDE7", colorActivo: "#FBC02D" },                 // Amarillo suave / Amarillo oscuro
    { val: 4, txt: "4️⃣ De acuerdo", colorBase: "#E8F5E9", colorActivo: "#4CAF50" },              // Verde suave / Verde medio
    { val: 5, txt: "5️⃣ Totalmente de acuerdo", colorBase: "#E8F5E9", colorActivo: "#2E7D32" }    // Verde suave / Verde fuerte
  ].map((opcion) => {
    const estaSeleccionado = respuestas[p.id] === opcion.val;
    
    return (
      <button
        key={opcion.val}
        type="button"
        onClick={() => manejarSeleccion(p.id, opcion.val)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "16px 20px",
          fontSize: tamanoLeyenda,
          fontFamily: "monospace",
          fontWeight: "bold",
          cursor: "pointer",
          borderRadius: "10px",
          border: estaSeleccionado ? "4px solid #000000" : "2px solid #CCCCCC",
          
          // 🟢 LÓGICA DE COLOR: Si está seleccionado brilla con su color fuerte, si no, mantiene un tono pastel suave
          backgroundColor: estaSeleccionado ? opcion.colorActivo : opcion.colorBase,
          color: estaSeleccionado ? "#FFFFFF" : "#000000",
          
          boxShadow: estaSeleccionado ? "inset 0px 4px 8px rgba(0,0,0,0.4)" : "none",
          transform: estaSeleccionado ? "scale(0.98)" : "scale(1)",
          transition: "all 0.15s ease"
        }}
      >
        {opcion.txt} {estaSeleccionado ? " ✅" : ""}
      </button>
    );
  })}
</div>
          </div>
        ))}

        {/* Botón de Enviar Formulario */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", marginBottom: "50px" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "#000000",
              border: "4px solid #000000",
              borderRadius: "15px",
              padding: "25px 50px",
              fontSize: tamanoPregunta,
              fontWeight: "bold",
              cursor: "pointer",
              fontFamily: "monospace",
              boxShadow: "0px 6px 0px #000000"
            }}
          >
            💾 GUARDAR RESPUESTAS
          </button>
        </div>

      </form>
    </Contenedor>
  );
};