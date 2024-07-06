import React from 'react'
import img_0 from '../recursos/cafe.jpg';
import '../pages/style.css';

export const AcercaPage = () => {
  return (
    <div className='acerca-main'>
        <div className='acerca-img'>            
        <img src={img_0} alt="Main" className="main-image" />
        <p className='texto-acerca'>Bienvenido a nuestra cafetería en Talca, donde la pasión por el café se une con el compromiso de brindar la mejor experiencia a nuestros clientes. Nos enorgullecemos de ofrecer los mejores precios sin comprometer la calidad y el servicio.

Seleccionamos cuidadosamente los mejores granos de café para asegurar que cada taza sea perfecta. Desde el proceso de tostado hasta la presentación final, cada detalle es importante para nosotros.

Nuestro objetivo es crear un espacio acogedor y relajante donde puedas disfrutar de un excelente café, ya sea que vengas a trabajar, estudiar o simplemente relajarte. Nos esforzamos por ofrecer un servicio excepcional y hacer de cada visita una experiencia memorable.

Visítanos y descubre por qué somos la mejor opción para los amantes del café en Talca. ¡Te esperamos!
</p>
        </div>

        


    </div>
  )
}
