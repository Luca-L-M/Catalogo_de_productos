// import { Link } from 'react-router-dom';
// import React, { useContext, useState } from 'react';
// import '../assets/css/main.css';
// import CarritoContext from '../CarritoContext';
// import CarritoModal from './CarritoModal';

// const Navbar = () => {
//   const { cart, cantProductos, precioTotal } = useContext(CarritoContext);  
//   const [isModalOpen, setIsModalOpen] = useState(false);  

//   const abrirModal = () => {
//     setIsModalOpen(true);
//   };

//   const cerrarModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <nav id="nav">
//       <ul className="links">
//         <li><Link to='/'>Home</Link></li>
//         <li><Link to='/verProductos'>Productos</Link></li>
//         <li><Link to='/contactos'>Contactos</Link></li>
//       </ul>
      
//       {/* Ícono del carrito */}
//       <div className="cart-icon-container">
//         <div className="cart-icon" onClick={abrirModal}>
//           <i className="fas fa-shopping-cart"></i>
//           {cantProductos > 0 && <span className="cart-count">{cantProductos}</span>}
//         </div>
//       </div>

//       {/* Modal Component */}
//       <CarritoModal isOpen={isModalOpen} onClose={cerrarModal} />
//     </nav>
//   );
// };

// export default Navbar;
import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import '../assets/css/main.css';
import CarritoContext from "../CarritoContext";
import CarritoModal from './CarritoModal';

const Navbar = () => {
  const { cart, cantProductos, precioTotal } = useContext(CarritoContext);  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  
  const [isModalOpen, setIsModalOpen] = useState(false);  

 
  const abrirModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setIsModalOpen(false);
  };
 

  return (
    <nav id="nav">
      <ul className="links">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/verProductos'>Productos</Link></li>
        <li><Link to='/contactos'>Contactos</Link></li>
      </ul>

      {/* Ícono del carrito */}
      <div className="cart-icon-container">
        <div className="cart-icon" onClick={abrirModal}>
          <i className="fas fa-shopping-cart"></i>
          {cantProductos > 0 && <span className="cart-count">{cantProductos}</span>}
        </div>

        {/* Desplegable del carrito */}
        {isDropdownOpen && (
          <div className="cart-dropdown">
            {cart.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity || 1} - ${item.price * (item.quantity || 1)}
                  </li>
                ))}
              </ul>
            )}
            <div className="cart-total">
              <strong>Total: ${precioTotal}</strong>
            </div>
            <Link to="/carrito" className="go-to-cart">
              Ver carrito
            </Link>
          </div>
        )}
      </div>
      <CarritoModal isOpen={isModalOpen} onClose={cerrarModal} />
    </nav>
  );
};

export default Navbar;
