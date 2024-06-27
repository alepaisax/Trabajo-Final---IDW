import React from 'react';
import './Styles.css'; 
import imagenNosotros from '../img/info1.jpg';
import imagenMision from '../img/info2.jpg';
import imagenServicios from '../img/info3.jpg';

function Informacion() {
  return (
    <div className="informacion-container">
      <section className="seccion nosotros">
        <div className="contenido-container">
          <img src={imagenNosotros} alt="Sobre Nosotros" className="imagen"/>
          <div className="texto">
            <h2 className="titulo">Sobre Nosotros</h2>
            <p>
              Alojamientos IDW - Check In es una cadena joven, dinámica y moderna con instalaciones en todas partes de Argentina. A lo largo de 10 años,
              hemos forjado una gran trayectoria en el mercado. Es nuestra prioridad distinguirnos en calidad, confianza, servicio al cliente
              y generar una experiencia vivencial a nuestros huéspedes. Nuestra propuesta de alojamientos está enfocada directamente en las
              necesidades de cada huésped bien sean en calidad de negocios o turismo. La infraestructura de nuestros alojamientos nos permite brindar
              soluciones integrales para cada ocasión. La impronta de diseño en nuestros alojamientos, combina calidez y buen gusto.
              En Alojamientos IDW - Check In las condiciones están dadas para garantizar una experiencia de confort y satisfacción.
            </p>
          </div>
        </div>
      </section>

      <section className="seccion mision">
        <div className="contenido-container inverso">
          <img src={imagenMision} alt="Misión" className="imagen"/>
          <div className="texto">
            <h2 className="titulo">Misión</h2>
            <p>
              Nuestro objetivo es brindar alojamientos cómodos y seguros que superen las expectativas de nuestros huéspedes. Estamos comprometidos
              a mantener altos estándares de calidad y servicio en todo momento. Con miras a la excelencia, nuestro propósito es ser una cadena
              de alojamientos innovadora en expansión internacional y servicios. Tenemos como desafío brindar una propuesta acorde a cada uno de nuestros
              huéspedes y dar respuestas a sus necesidades para así, garantizar que en la experiencia Latitud Hoteles a través de nuestra
              infraestructura y talento humano, se sientan a gusto al elegirnos.
            </p>
          </div>
        </div>
      </section>

      <section className="seccion servicios">
        <div className="contenido-container">
          <img src={imagenServicios} alt="Servicios" className="imagen"/>
          <div className="texto">
            <h2 className="titulo">Servicios</h2>
            <p>
              Alojamientos IDW - Check In cuenta actualmente con alojamientos ubicados estratégicamente en cada uno de sus destinos. Todas nuestras instalaciones
              han sido equipadas de tal forma que, la estadía de nuestros huéspedes sea una experiencia única y acogedora. Hace parte de nuestra
              impronta, sorprender a nuestros huéspedes con amabilidad y excelencia en nuestros servicios.
            </p>
            <p>
              Alojamientos IDW - Check In desarrolla, comercializa y opera en Argentina, por esto nos encontramos en una etapa de expansión en la cual
              nos proyectamos a sumar nuevos proyectos en diferentes puntos de la región.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Informacion;