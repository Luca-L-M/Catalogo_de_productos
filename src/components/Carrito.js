import React, { useContext } from 'react';
import CarritoContext from '../CarritoContext';

function Carrito() {
  const { cart, removeFromCart, clearCart } = useContext(CarritoContext);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
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
