import { useContext } from 'react';
import { ContextoTraduccion } from '../context/ContextoTraduccion';
import { traduccionesQuechua } from '../data/traduccionesQuechua';

export const useTraduccion = () => {
    const context = useContext(ContextoTraduccion);
    if (!context) {
        throw new Error('useTraduccion debe ser usado dentro de un TraduccionProvider');
    }

    const { idioma, cambiarIdioma } = context;

    // Función traductora no intrusiva
    const t = (textoOriginal) => {
        if (idioma === 'qu' && traduccionesQuechua[textoOriginal]) {
            return traduccionesQuechua[textoOriginal];
        }
        return textoOriginal;
    };

    return { idioma, cambiarIdioma, t };
};