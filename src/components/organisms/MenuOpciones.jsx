import React from 'react';
import { BotonOpcion } from '../molecules/BotonOpcion';

import { Link } from 'react-router-dom'; 

export const MenuOpciones = () => {
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
      <BotonOpcion numero="1" icono="☀️" texto="CLIMA" accionClick={() => alert('Navegar a Clima')} />
      <BotonOpcion numero="2" icono="💰" texto="¿A CUÁNTO VENDER?" accionClick={() => alert('Navegar a Ventas')} />
      <BotonOpcion numero="3" icono="🐛" texto="ALERTAS DE PLAGAS" accionClick={() => alert('Navegar a Plagas')} />
      <BotonOpcion numero="4" icono="🌱" texto="SEMILLAS Y ABONO" accionClick={() => alert('Navegar a Abono')} />

    </div>
  );
};