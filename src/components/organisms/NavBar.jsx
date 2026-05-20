import React from 'react';
import { useAccesibilidad } from '../../hooks/useAccesibilidad';
import { BotonAccesibilidad } from '../molecules/BotonAccesibilidad';
// import Logo from '../../assets/logo.png'; 

export const NavBar = () => {
  // Extraemos las funciones del cerebro
  const { temaActual, aumentarLetra, disminuirLetra, alternarContraste } = useAccesibilidad();

  return (
    <nav style={{
      backgroundColor: temaActual.fondoNavbar,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      borderBottom: temaActual.fondoNavbar === '#000000' ? '2px solid red' : 'none' // Línea roja en alto contraste
    }}>
      
      {/* Zona Izquierda: Logo (Aquí puedes poner tu etiqueta <img /> luego) */}
      <div style={{ color: temaActual.textoNavbar, fontWeight: 'bold', fontSize: '20px' }}>
        🌿 Agro-Kiosko
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <BotonAccesibilidad icono="🔊" accionClick={() => console.log('Activar voz')} />
        <BotonAccesibilidad icono="+T" accionClick={aumentarLetra} />
        <BotonAccesibilidad icono="-T" accionClick={disminuirLetra} />
        <BotonAccesibilidad icono="🎙️" accionClick={() => console.log('Abrir micro')} />
        <BotonAccesibilidad icono="🌓" accionClick={alternarContraste} />
      </div>

    </nav>
  );
};