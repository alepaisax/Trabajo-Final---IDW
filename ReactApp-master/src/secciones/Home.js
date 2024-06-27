// src/Home.js
import React from 'react';
import './Styles.css';
import hotel1 from '../img/hotel1.jpg';
import hotel2 from '../img/hotel2.jpg';
import hotel3 from '../img/hotel3.jpg';
import casa1 from '../img/casa1.jpg';
import casa2 from '../img/casa2.jpg';
import casa3 from '../img/casa3.jpg';
import cabaña1 from '../img/cabaña1.jpg';
import cabaña2 from '../img/cabaña2.jpg';
import cabaña3 from '../img/cabaña3.jpg';

import Nav from './componentes/Nav';

const Home = () => {
  return (
    <div>
      <Nav />
      
      <header className="contenido principal">
        <h2 className="titulo-principal">IDW - Check In</h2>
        <p>¡Vive el lujo, reserva tu escapada perfecta con nosotros!</p>
        <div>
          <a href="#"  className="boton-home">¡RESERVA YA!</a>
        </div>
      </header>
      
      <main>
        <section className="contenedor alojamientos-destacados">
          <div className="titulo-primeraseccion">
            <h3>¡No te pierdas los Alojamientos Exclusivos!</h3>
            <p>Explora los principales alojamientos que ofrecemos y da el primer paso hacia una escapada perfecta</p>
          </div>
          <div className='texto-alojamientos'>
              <h4>Holetes favoritos elegidos entre los huéspedes</h4>
              <hr></hr>
          </div>
          <div className="contenido-alojamientos">
            <div className="hotel">
              <img src={hotel1} alt="hotel 1" />
              <a href="#">Hotel Luna Roja</a>
            </div>
            <div className="hotel">
              <img src={hotel2} alt="hotel 2" />
              <a href="#">Hotel Miradas</a>
            </div>
            <div className="hotel">
              <img src={hotel3} alt="hotel 3" />
              <a href="#">Hotel Mar Azul</a>
            </div>
          </div>
          <div>
              <a href="#" className="boton-seccion">Ver más</a>
          </div>

          <div className='texto-alojamientos'>
              <h4>Casas favoritas elegidas entre los huéspedes</h4>
              <hr></hr>
          </div>
          <div className="contenido-alojamientos">
            <div className="hotel">
              <img src={casa1} alt="casa 1" />
              <a href="#">Casa en Entre Rios</a>
            </div>
            <div className="hotel">
              <img src={casa2} alt="casa 2" />
              <a href="#">Casa en Necochea</a>
            </div>
            <div className="hotel">
              <img src={casa3} alt="casa 3" />
              <a href="#">Casa en Villa Ángela</a>
            </div>
          </div>
          <div>
              <a href="#" className="boton-seccion">Ver más</a>
          </div>

          <div className='texto-alojamientos'>
              <h4>Cabañas favoritas elegidas entre los huéspedes</h4>
              <hr></hr>
          </div>
          <div className="contenido-alojamientos">
            <div className="hotel">
              <img src={cabaña1} alt="cabaña 1" />
              <a href="#">Cabaña del Lago</a>
            </div>
            <div className="hotel">
              <img src={cabaña2} alt="cabaña 2" />
              <a href="#">Cabaña del Susurro</a>
            </div>
            <div className="hotel">
              <img src={cabaña3} alt="cabaña 3" />
              <a href="#">Cabaña del Mirador</a>
            </div>
          </div>
          <div>
              <a href="#"  className="boton-seccion">Ver más</a>
          </div>
        </section>

        <section className="contenido exclusivo">
          <article className="img-texto">
            <h2 className="titulo">Descuentos exclusivos ¡No te lo pierdas!</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere alias expedita delectus, dolorum provident porro atque.
              Earum itaque perferendis voluptate! Deserunt numquam, libero reiciendis aut fugit asperiores perspiciatis est accusantium?
            </p>
            <div>
              <a href="#"  className="boton-exclusivo">Más info</a>
            </div>
          </article>
        </section>

        <section className="contenido extra">
          <h2 className="titulo">Lorem</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere alias expedita delectus, dolorum provident porro atque.
            Earum itaque perferendis voluptate! Deserunt numquam, libero reiciendis aut fugit asperiores perspiciatis est accusantium?
          </p>
        </section>
      </main>
    </div>
  );
}

export default Home;