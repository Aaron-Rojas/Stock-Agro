import React from 'react';
import { BotonOpcion } from '../molecules/BotonOpcion';
import { useNavigate } from 'react-router-dom';
import { useTraduccion } from '../../hooks/useTraduccion';


//import { Link } from 'react-router-dom'; 
  
export const MenuOpciones = () => {
  const { t } = useTraduccion();

  const navigate = useNavigate()
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', // 2 columnas del mismo tamaño
      gap: '30px',                    // Espacio entre botones
      maxWidth: '600px',              // Ancho máximo para que no se deforme
      margin: '0 auto',               // Centrar en la pantalla
      padding: '20px'
    }}>
      
      {/* En el futuro estos Link llevarán a sus rutas, por ahora simulan el clic */}
      <BotonOpcion numero="1" icono="☀️" texto={t("CLIMA")} accionClick={() => navigate("/clima")} />
      <BotonOpcion numero="2" icono="💰" texto={t("¿A CUÁNTO VENDER?")} accionClick={() => navigate("/calculadora")} />
      <BotonOpcion numero="3" icono="🐛" texto={t("ALERTAS DE PLAGAS")} accionClick={() => navigate("/plagas")} />
      <BotonOpcion numero="4" icono="🌱" texto={t("SEMILLAS Y ABONO")} accionClick={() => navigate("/seleccion-cultivo")} />

    </div>
  );
};