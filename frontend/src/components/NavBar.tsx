import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to="/">Instrucciones</Link>
      <Link to="/simulador">Simulador</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;