import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useCart } from '../CarritoContext';

const CarritoModal = ({ isOpen, onClose }) => {
  const { cart } = useCart();  
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calcularTotal = () => {
      let total = 0;
      if (Array.isArray(cart)) {
        cart.forEach((item) => {
          total += item.price * (item.quantity || 1);
        });
      }
      return total.toFixed(2);
    };
  
    setTotal(calcularTotal());
  }, [cart]);

  if (!isOpen) return null;  

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Carrito</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>

        {/* Lista de productos en el carrito */}
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <ul>
            {cart.map((producto) => (
              <li key={producto.id}>
                <img style={productoImagen} src={producto.images} className="productoImagen"/>
                {producto.name} x {producto.quantity || 1} - ${producto.price * (producto.quantity || 1)}
              </li>
            ))}
          </ul>
        )}

        {/* Mostrar el total */}
        <h3><b>Total:</b> ${total}</h3>
        <button className='boton-mas-info'>
          <b><Link to="/carrito" className='link-no-decor'>Más info</Link></b>
        </button>
      </div>
    </div>
  );
};

export default CarritoModal;

const productoImagen = {
  width: "100px", 
  height: "auto",   
};
