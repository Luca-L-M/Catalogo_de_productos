import React, { createContext, useState, useEffect } from 'react';
const CarritoContext = createContext();


export const CartProvider = ({ children }) => {
 
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });


  const agregarAlCarrito = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const editarCarrito = (itemId, updatedItem) => {
    setCart((prevCart) => {
      // Actualizar el carrito reemplazando el ítem con el itemId dado
      const updatedCart = prevCart.map((item) =>
        item.id === itemId ? { ...item, ...updatedItem } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const eliminarDelCarrito = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== itemId);
 
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };


  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);


  return (
    <CarritoContext.Provider value={{ cart, agregarAlCarrito, editarCarrito,eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoContext;
