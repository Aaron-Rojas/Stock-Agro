import React, { useEffect } from "react";
import { Contenedor } from "../components/atoms/Contenedor";
import { useAccesibilidad } from "../hooks/useAccesibilidad";
import { useNavigate } from "react-router-dom";
import { MenuOpciones } from "../components/organisms/MenuOpciones";

export const Home = () => {
  const { temaActual, nivelLetra } = useAccesibilidad();
  const navigate = useNavigate();

  const tamanoTitulo =
    nivelLetra === "normal"
      ? "30px"
      : nivelLetra === "grande"
        ? "38px"
        : "45px";

  const textoLectura = `Bienvenido a Agro-Kiosko, tu asistente agrícola inteligente. Presiona cualquier numero del 1 al 4 para comenzar.`;

  
  useEffect(() => {
    const ejecutarLectura = () => {
      
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textoLectura);
        utterance.lang = "es-ES";
        utterance.rate = 0.9;
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

  return (
    <Contenedor>
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
    </Contenedor>
  );
};
