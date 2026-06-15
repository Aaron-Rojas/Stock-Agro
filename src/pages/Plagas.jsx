import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Contenedor } from "../components/atoms/Contenedor";
import { useAccesibilidad } from "../hooks/useAccesibilidad";

export const Plagas = () => {
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


    const calcularTamano = (tamanoBase) => {
        if (nivelLetra === "grande") return tamanoBase + 8 + "px";
        if (nivelLetra === "extra") return tamanoBase + 16 + "px";
        return tamanoBase + "px";
    };

    // Obtener la fecha actual en formato local (DD/MM/AAAA)
    const fechaActual = new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });


    const textoLectura = `Alerta de plagas. Lima, Perú, fecha actual: ${fechaActual}. ¡Alerta! ¡Hay pulgones cerca de tu zona! Presione el número uno para escuchar cómo cuidar sus siembras, o presione el número cero para regresar al inicio.`;

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

    const estilos = {
        pantallaCentrada: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
            padding: "20px",
            boxSizing: "border-box",
        },
        tarjetaAlerta: {
            backgroundColor: "#d60000",
            border: "2px solid #c9c8c8",
            borderRadius: "12px",
            padding: "25px",
            width: "auto",
            maxWidth: "900px",
            textAlign: "center",
            marginBottom: "30px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        },
        iconoAlerta: {
            fontSize: "4rem",
            marginBottom: "10px",
            display: "block",
        },
    };

    return (
        <Contenedor>
            <div style={estilos.pantallaCentrada}>
                <h2
                    tipo="titulo"
                    style={{
                        fontSize: tamanoTitulo,
                        fontWeight: "bold",
                        margin: "10px 0",
                        color: temaActual.textoPrincipal
                    }}
                >
                    ALERTA DE PLAGAS
                </h2>

                <h2
                    tipo="subtitulo"
                    style={{
                        fontSize: tamanoSubtitulo,
                        marginBottom: "25px",
                        color: temaActual.textoPrincipal,
                    }}
                >
                    Lima, Perú - {fechaActual}
                </h2>

                <div style={estilos.tarjetaAlerta} role="alert">
                    <span style={estilos.iconoAlerta} aria-hidden="true">
                        ⚠️
                    </span>
                    <h3
                        tipo="parrafo"
                        style={{
                            fontSize: tamanoTextoGrande,
                            fontWeight: "bold",
                            color: "#faf5f7",
                            margin: 0,
                        }}
                    >
                        ¡ALERTA! ¡HAY PULGONES CERCA DE TU ZONA!
                    </h3>
                </div>


                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    marginTop: '20px',
                    width: '100%',
                    alignItems: 'center'
                }}>

                    <button
                        onClick={() => navigate("/CuidarSiembras")}
                        style={{
                            backgroundColor: temaActual.botonExito,
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
                        <span style={{ backgroundColor: '#000', color: '#FFF', padding: '5px 15px', borderRadius: '10px' }}>1</span>
                        ← ESCUCHE COMO CUIDAR DE SUS SIEMBRAS 💡

                    </button>
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
                            gap: "35px",
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
