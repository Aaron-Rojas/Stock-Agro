import React from "react";
import { Contenedor } from "../components/atoms/Contenedor";
import { useAccesibilidad } from "../hooks/useAccesibilidad";
import { MenuOpciones } from "../components/organisms/MenuOpciones";

export const Home = () => {
  const { temaActual, nivelLetra } = useAccesibilidad();

  const tamanoTitulo =
    nivelLetra === "normal"
      ? "30px"
      : nivelLetra === "grande"
        ? "38px"
        : "45px";

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
