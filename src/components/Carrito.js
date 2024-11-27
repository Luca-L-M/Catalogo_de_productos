import React, { useContext, useEffect, useState } from 'react';
import { useCart } from '../CarritoContext';

function Carrito() {
  const { cart, eliminarProductoDelCarrito, eliminarCantProductoDelCarrito } = useCart();
  const [total, setTotal] = useState(0);

  const handleEliminarProducto=(itemId)=>
  {
    eliminarProductoDelCarrito(itemId)
  }
  const handleEliminarCantProducto=(itemId)=>
  {
    eliminarCantProductoDelCarrito(itemId)
  }
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

  return (
    <div style={{backgroundColor:'white', height:'35rem'}}>
      <h2>Carrito de Compras</h2>
      {cart.find(item => item) == null ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} style={listaProducto}>
              <img style={productoImagen} src={item.images} className="productoImagen"/>
              {item.name} x {item.quantity || 1} - ${item.price * (item.quantity || 1)}
              <button onClick={() => handleEliminarProducto(item.id)}>Eliminar producto</button>
              <button onClick={() => handleEliminarCantProducto(item.id)}>Eliminar 1</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Carrito;
const productoImagen = {
  width: "100px", 
  height: "auto",   
};

const listaProducto = {
  listStyle:'none',
  marginBottom:'2rem',
  display:'block',
  justifyContent: 'space-between',
};
