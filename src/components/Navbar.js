import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css';
import { useCart } from '../CarritoContext';
import CarritoModal from './CarritoModal';

const Navbar = () => {
  const { cart, cantProductos, precioTotal } = useCart();  
  const [isModalOpen, setIsModalOpen] = useState(false);  

  const abrirModal = () => {
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
    <nav id="nav">
      <ul className="links">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/verProductos'>Productos</Link></li>
        <li><Link to='/contactos'>Contactos</Link></li>
      </ul>

      <div className="cart-icon-container">
        <div className="cart-icon" onClick={abrirModal}>
          <i className="fas fa-shopping-cart"></i>
          {cantProductos > 0 && <span className="cart-count">{cantProductos}</span>}
        </div>
        <Link to="/carrito" className="go-to-cart">Ver carrito</Link>
      </div>
    </nav>
          {isModalOpen && <CarritoModal isOpen={isModalOpen} onClose={cerrarModal} />}
          </div>
  );
};

export default Navbar;

