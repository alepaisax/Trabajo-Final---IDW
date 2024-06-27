import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './secciones/Home';
import Informacion from './secciones/Informacion';
import Contacto from './secciones/Contacto';
import Nav from './secciones/componentes/Nav';
import Footer from './secciones/componentes/Footer';
import Admin from './secciones/Admin';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informacion" element={<Informacion />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;