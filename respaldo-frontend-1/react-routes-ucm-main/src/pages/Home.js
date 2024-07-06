import React from 'react';
import '../pages/home.css';
import banner from '../recursos/baner.jpg';
import maquina from '../recursos/maquina.jpg';
import granos from '../recursos/granos.jpg';
import cafeteria from '../recursos/cafeteria.jpg';
import { InfoPage } from './InfoPage';


function Home() {
  return (
    <>
      <div className="main-section">
        <img src={banner} alt="Main" className="main-image" />
      </div>
      <div className="sub-sections">
        <div className="sub-section">
          <img src={maquina} alt="Nuestras Máquinas" className="sub-image" />
          <h4>Nuestras Máquinas</h4>
          <p>Contamos con tecnología de punta en nuestras máquinas de procesamiento de café, diseñadas para maximizar la eficiencia y mantener la calidad en cada etapa.          </p>
        </div>
        <div className="sub-section">
          <img src={granos} alt="Nuestros Granos" className="sub-image" />
          <h4>Nuestros Granos</h4>
          <p>Seleccionamos los mejores granos de café de regiones prestigiosas, cultivados y tratados con cuidado para garantizar un sabor y aroma excepcionales.

          </p>
        </div>
        <div className="sub-section">
          <img src={cafeteria} alt="Sucursales" className="sub-image" />
          <h4>Sucursales</h4>
          <p>Nuestras sucursales, nacionales e internacionales, ofrecen una experiencia única y acogedora, donde puedes disfrutar de nuestro café de alta calidad y excelente servicio.
          </p>
        </div>
      </div>
      <InfoPage/>
    </>
  );
}

export { Home };
