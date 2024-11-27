import React, { useContext } from 'react';
import { useCart } from '../CarritoContext';

function Carrito() {
  const { cart, eliminarDelCarrito, clearCart } = useCart();

  const handleEliminar=(item)=>
  {
    eliminarDelCarrito(item)
  }
  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.find(item => item) == null ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img style={productoImagen} src={item.images} className="productoImagen"/>
              {item.name} - ${item.price}
              <button onClick={handleEliminar}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearCart}>Vaciar carrito</button>
    </div>
  );
}

export default Carrito;
const productoImagen = {
  width: "100px", 
  height: "auto",   
};
