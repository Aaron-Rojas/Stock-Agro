import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contenedor } from '../components/atoms/Contenedor';
import { useAccesibilidad } from '../hooks/useAccesibilidad';

export const Clima = () => {
    const { temaActual, nivelLetra } = useAccesibilidad();
    const navigate = useNavigate();

    const [climaInfo, setClimaInfo] = useState(null);
    const [cargando, setCargando] = useState(true);

    const tamanoTitulo = nivelLetra === 'normal' ? '30px' : nivelLetra === 'grande' ? '38px' : '45px';
    const tamanoSubtitulo = nivelLetra === 'normal' ? '20px' : nivelLetra === 'grande' ? '24px' : '28px';
    const tamanoTextoGrande = nivelLetra === 'normal' ? '24px' : nivelLetra === 'grande' ? '30px' : '36px';
    const tamanoTextoNormal = nivelLetra === 'normal' ? '18px' : nivelLetra === 'grande' ? '22px' : '26px';

    const calcularTamano = (tamanoBase) => {
        if (nivelLetra === 'grande') return (tamanoBase + 8) + 'px';
        if (nivelLetra === 'extra') return (tamanoBase + 16) + 'px';
        return tamanoBase + 'px';
    };


        const fechaActual = new Date().toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const textoLectura = `Clima soleado y despejado. Lima, Perú, fecha actual: ${fechaActual}. ¡Hoy es un gran día para trabajar en el campo!. Presiona la tecla 0 para regresar al inicio.`;



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
            if (event.key === "0") {
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

    useEffect(() => {
        const obtenerDatosClima = () => {
            setTimeout(() => {
                const hoy = new Date();
                const opcionesFecha = { weekday: 'long', day: 'numeric', month: 'long' };
                const fechaFormateada = hoy.toLocaleDateString('es-ES', opcionesFecha);

                const condicionSimulada = 'Soleado';
                const temperaturaSimulada = 20;

                const esBuenDia = condicionSimulada === 'Soleado' && temperaturaSimulada > 15 && temperaturaSimulada < 30;

                let textoRecomendacion = esBuenDia
                    ? "¡Hoy es un gran día para plantar!"
                    : "Las condiciones no son ideales para el trabajo de campo hoy.";

                setClimaInfo({
                    ciudad: 'Lima, Perú',
                    fecha: fechaFormateada,
                    temperatura: temperaturaSimulada,
                    condicion: condicionSimulada,
                    humedad: '60%',
                    viento: '10 km/h',
                    probabilidadLluvia: '10%',
                    recomendacion: textoRecomendacion,
                    esBuenDia: esBuenDia
                });
                setCargando(false);
            }, 1200);
        };

        obtenerDatosClima();
    }, []);

    return (
        <Contenedor>
            <div style={{ padding: '30px', textAlign: 'center' }}>
                <h1 style={{
                    color: temaActual.textoPrincipal,
                    fontSize: tamanoTitulo,
                    fontFamily: 'monospace',
                    letterSpacing: '3px',
                    margin: '0 0 20px 0'
                }}>
                    CLIMA
                </h1>
            </div>

            <div style={{
                color: temaActual.textoPrincipal,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0 20px 40px 20px'
            }}>
                {cargando ? (
                    <p style={{ fontSize: tamanoTextoNormal }}>Cargando pronóstico del clima...</p>
                ) : (
                    <>
                        <div style={{
                            backgroundColor: temaActual.fondoSecundario || 'rgba(0, 0, 0, 0.05)',
                            border: `3px solid ${temaActual.textoPrincipal}`,
                            padding: '30px 20px',
                            borderRadius: '15px',
                            maxWidth: '500px',
                            width: '100%',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            marginBottom: '30px'
                        }}>
                            <div style={{ fontSize: tamanoTextoNormal, marginBottom: '20px' }}>
                                <strong style={{ textTransform: 'capitalize' }}>{climaInfo.fecha}</strong> | {climaInfo.ciudad}
                            </div>

                            <div style={{ fontSize: '80px', margin: '10px 0' }}>
                                {climaInfo.condicion === 'Soleado' ? '☀️' : '☁️'}
                            </div>

                            <div style={{ fontSize: '70px', fontWeight: 'bold', margin: '10px 0' }}>
                                {climaInfo.temperatura}°C
                            </div>

                            <p style={{ fontSize: tamanoTextoGrande, fontWeight: 'bold', marginBottom: '40px', textTransform: 'uppercase' }}>
                                {climaInfo.condicion}
                            </p>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: tamanoTextoNormal,
                                borderTop: `2px solid ${temaActual.textoPrincipal}`,
                                paddingTop: '25px',
                                paddingBottom: '10px',
                                gap: '15px'
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '32px' }}>💧</span>
                                    <strong>Humedad</strong>
                                    <span>{climaInfo.humedad}</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '32px' }}>💨</span>
                                    <strong>Viento</strong>
                                    <span>{climaInfo.viento}</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '32px' }}>🌧️</span>
                                    <strong>Lluvia</strong>
                                    <span>{climaInfo.probabilidadLluvia}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{

                            backgroundColor: climaInfo.esBuenDia ? '#4CAF50' : 'transparent',
                            color: climaInfo.esBuenDia ? '#FFFFFF' : temaActual.textoPrincipal,
                            fontSize: climaInfo.esBuenDia ? tamanoTextoGrande : tamanoSubtitulo,
                            fontWeight: climaInfo.esBuenDia ? 'bold' : 'normal',
                            padding: climaInfo.esBuenDia ? '20px 30px' : '0',
                            borderRadius: climaInfo.esBuenDia ? '12px' : '0',
                            boxShadow: climaInfo.esBuenDia ? '0 4px 6px rgba(0,0,0,0.15)' : 'none',
                            textAlign: 'center',
                            maxWidth: '600px',
                            marginBottom: '40px',
                            lineHeight: '1.4',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '15px'
                        }}>
                            {climaInfo.esBuenDia && <span style={{ fontSize: '35px' }}>✅</span>}
                            {climaInfo.recomendacion}
                        </div>

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
                    </>
                )}
            </div>
        </Contenedor>
    );
};