import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import '../assets/css/main.css';
 import CarritoContext from '../CarritoContext';

const Navbar = () => {
    
    const { cart } = useContext(CarritoContext); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
   
    const cantProductos = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  
   
    const precioTotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0).toFixed(2);
  
    // Manejar el clic en el ícono del carrito para abrir/cerrar el desplegable, no se que mierda es toggle
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    

    return (
        <nav id="nav">
            <ul class="links">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/verProductos'>Productos</Link></li>
                <li><Link to='/contactos'>Contactos</Link></li>
            </ul>

            {/* Ícono del carrito */}
      <div className="cart-icon-container">
        <div className="cart-icon" onClick={toggleDropdown}>
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
        </nav>
    )
}

export default Navbar;