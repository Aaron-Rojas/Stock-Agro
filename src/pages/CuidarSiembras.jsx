import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Contenedor } from "../components/atoms/Contenedor";
import { useAccesibilidad } from "../hooks/useAccesibilidad";

const TEXTO_LECTURA = `Recomendación para cuidar de tus siembras. Tip 1:  Mezcla el jabón con agua, rocía las plantas afectadas, asegúrate de mojar la parte de abajo de las hojas y aplícalo siempre en la tarde cuando no haya sol. Presione el número cero para regresar.`;

export const CuidarSiembras = () => {
    const { temaActual, nivelLetra, showFeedbackModal } = useAccesibilidad();
    const navigate = useNavigate();

    const calcularTamano = (tamanoBase) => {
        if (nivelLetra === "grande") return tamanoBase + 8 + "px";
        if (nivelLetra === "extra") return tamanoBase + 16 + "px";
        return tamanoBase + "px";
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
            const numericKeys = {
                "0": "Cero",
                "1": "Uno"
            };

            if (numericKeys[event.key]) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(numericKeys[event.key]);
                utterance.lang = "es-ES";
                utterance.rate = 1.0;
                window.speechSynthesis.speak(utterance);

                if (event.key === "0") {
                    showFeedbackModal("0", "Regresar a la pantalla de inicio", true);
                } else {
                    showFeedbackModal("1", "Consejos para cuidar tus plantas");
                }

                const actionDelayMs = 3000;

                if (event.key === "1") {
                    setTimeout(() => navigate("/CuidarSiembras"), actionDelayMs);
                } else if (event.key === "0") {
                    setTimeout(() => navigate("/"), actionDelayMs);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [navigate, showFeedbackModal]);

    const renderFilaResultado = (texto) => (
        <div
            style={{
                border: `4px solid ${temaActual.botonExito}`,
                borderRadius: "10px",
                padding: "20px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "30px",
                width: "100%",
                maxWidth: "600px",
                backgroundColor: temaActual.fondoTarjeta,
            }}
        >
            <span
                style={{
                    color: temaActual.textoPrincipal,
                    fontSize: calcularTamano(30),
                    fontWeight: "bold",
                    fontFamily: "monospace",
                }}
            >
                {texto}
            </span>
        </div>
    );

    return (
        <Contenedor>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "40px",
                    gap: "30px",
                    flex: 1,
                }}
            >
                {/* Título Principal */}
                <h1
                    style={{
                        color: temaActual.textoPrincipal,
                        fontSize: calcularTamano(40),
                        fontFamily: "monospace",
                        textAlign: "center",
                        maxWidth: "600px",
                        lineHeight: "1.2",
                    }}
                >
                    Recomendacion para cuidar de tus siembras
                </h1>

                {/* Filas de Resultados  */}
                {renderFilaResultado(" ✅ Mezcla el jabón con agua.")}
                {renderFilaResultado(" ✅ Rocía las plantas afectadas")}
                {renderFilaResultado(" ✅ Asegúrate de mojar la parte de abajo de las hojas")}
                {renderFilaResultado(" ✅ Aplícalo siempre en la tarde cuando no haya sol")}

                {/* Botón Regresar */}
                <div style={{ marginTop: "40px" }}>
                    <button
                        onClick={() => navigate("/")}
                        style={{
                            backgroundColor: temaActual.botonPeligro,
                            color: temaActual.textoBoton,
                            border: `4px solid ${temaActual.bordePrincipal}`,
                            borderRadius: "40px",
                            padding: "20px 60px",
                            fontSize: calcularTamano(30),
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            cursor: "pointer",
                        }}
                    >
                        <span
                            style={{
                                backgroundColor: "#000",
                                color: "#FFF",
                                padding: "5px 15px",
                                borderRadius: "10px",
                            }}
                        >
                            0
                        </span>
                        ← REGRESAR
                    </button>
                </div>
            </div>
        </Contenedor>
    );
};
