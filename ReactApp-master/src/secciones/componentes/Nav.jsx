import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles.css';
import logo from '../../img/logo.png';

function Nav() {
  return (
    <div className='barra'>
      <div className="logo">
          <img src={logo} alt="Logo" />
      </div>
      <nav className='navbar'>
        <ul>
          <li><Link to="/">Inicio</Link></li> 
          <li><Link to="/informacion">Sobre nosotros</Link></li>  
          <li><Link to="/contacto">Contacto</Link></li>   
          <li><Link to="/admin">Admin</Link></li>             
        </ul>
      </nav>
    </div>
  );
}

export default Nav;