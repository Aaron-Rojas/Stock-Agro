import React, { createContext, useState, useEffect } from 'react';

export const ContextoTraduccion = createContext();

export const TraduccionProvider = ({ children }) => {
    const [idioma, setIdioma] = useState(() => {
        return localStorage.getItem('stock_agro_idioma') || 'es';
    });

    useEffect(() => {
        localStorage.setItem('stock_agro_idioma', idioma);
    }, [idioma]);

    const cambiarIdioma = (nuevoIdioma) => {
        setIdioma(nuevoIdioma);
    };

    return (
        <ContextoTraduccion.Provider value={{ idioma, cambiarIdioma }}>
            {children}
        </ContextoTraduccion.Provider>
    );
};