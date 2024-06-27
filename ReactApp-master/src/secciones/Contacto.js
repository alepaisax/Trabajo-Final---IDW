import React from 'react';
import './Styles.css';

function Contacto() {
  return (
    <div className='contenedor-contacto'>
      <section className="contenedor-formulario">
        <h2>Formulario de Contacto</h2>
        <form>
          <div className="contenido-form">
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="contenido-form">
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required />
          </div>
          <div className="contenido-form">
            <label htmlFor="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="contenido-form">
            <label htmlFor="message">Mensaje:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
          </div>
          <div className="contenido-form">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </section>
      <section className="contenedor-masinfo"></section>
    </div>
  );
}

export default Contacto;
