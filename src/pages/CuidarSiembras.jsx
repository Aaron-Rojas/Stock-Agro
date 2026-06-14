import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Contenedor } from "../components/atoms/Contenedor";
import { useAccesibilidad } from "../hooks/useAccesibilidad";

export const CuidarSiembras = () => {
    const { temaActual, nivelLetra } = useAccesibilidad();
    const navigate = useNavigate();

    const tamanoTitulo =
        nivelLetra === "normal"
            ? "30px"
            : nivelLetra === "grande"
                ? "38px"
                : "45px";
    const tamanoSubtitulo =
        nivelLetra === "normal"
            ? "20px"
            : nivelLetra === "grande"
                ? "24px"
                : "28px";
    const tamanoTextoGrande =
        nivelLetra === "normal"
            ? "24px"
            : nivelLetra === "grande"
                ? "30px"
                : "36px";
    const tamanoTextoNormal =
        nivelLetra === "normal"
            ? "18px"
            : nivelLetra === "grande"
                ? "22px"
                : "26px";

    const calcularTamano = (tamanoBase) => {
        if (nivelLetra === "grande") return tamanoBase + 8 + "px";
        if (nivelLetra === "extra") return tamanoBase + 16 + "px";
        return tamanoBase + "px";
    };

    const textoLectura = `Recomendación para cuidar de tus siembras. Tip 1:  Mezcla el jabón con agua, rocía las plantas afectadas, asegúrate de mojar la parte de abajo de las hojas y aplícalo siempre en la tarde cuando no haya sol. Presione el número cero para regresar.`;
    
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
                navigate("/CuidarSiembras");
            } else if (event.key === "0") {
                window.speechSynthesis.cancel();
                navigate("/");
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
                <h2
                    style={{
                        fontSize: tamanoTitulo,
                        fontWeight: "bold",
                        margin: "10px 0",
                        color: temaActual.textoPrincipal,
                    }}
                >
                    Recomendacion para cuidar de tus siembras
                </h2>
                <p
                    style={{
                        fontSize: tamanoTitulo,
                        fontWeight: "bold",
                        margin: "100px 200px",
                        color: temaActual.textoPrincipal,
                        border: "4px solid",
                    }}
                >
                    TIP 1 💡: <br />
                    ✅ Mezcla el jabón con agua.
                    <br />
                    ✅Rocía las plantas afectadas.
                    <br />
                    ✅Asegúrate de mojar la parte de abajo de las hojas.
                    <br />
                    ✅Aplícalo siempre en la tarde cuando no haya sol.
                    <br />
                </p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    marginTop: '20px',
                    width: '100%',
                    alignItems: 'center'
                }}>
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
