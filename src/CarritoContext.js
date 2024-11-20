import React, { createContext, useState, useEffect } from 'react';

const CarritoContext = createContext();


export const CartProvider = ({ children }) => {
 
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });


  // const agregarAlCarrito = (item) => {
  //   setCart((prevCart) => {
  //     const updatedCart = [...prevCart, item];

  //     localStorage.setItem('cart', JSON.stringify(updatedCart));
  //     return updatedCart;
  //   });
  // };

  const agregarAlCarrito = (item) => {
    setCart((prevCart) => {
      const itemExistente = prevCart.find((cartItem) => cartItem.id === item.id);
  
      if (itemExistente) {
        // Si el producto ya existe en el carrito, aumentar la cantidad
        const updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        // Si no existe, agregarlo al carrito
        const updatedCart = [...prevCart, { ...item, quantity: 1 }];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      }
    });
  };

  const editarCarrito = (itemId, updatedItem) => {
    setCart((prevCart) => {
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
  const cantProductos = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);


  const precioTotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0).toFixed(2);

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
