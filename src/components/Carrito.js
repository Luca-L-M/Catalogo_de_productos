import React, { useContext } from 'react';
import { useCart } from '../CarritoContext';

function Carrito() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.find(item => item) == null ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearCart}>Vaciar carrito</button>
    </div>
  );
}

export default Carrito;
