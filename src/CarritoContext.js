import React, { createContext, useState, useEffect, useContext } from 'react';

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
  let cantProductos = 0;
  if (Array.isArray(cart)) {
    cart.forEach((item) => {
      cantProductos += item.quantity || 1;
    });
  }
  
  let precioTotal = 0;
  if (Array.isArray(cart)) {
    cart.forEach((item) => {
      precioTotal += item.price * (item.quantity || 1);
    });
  }
  
  precioTotal = precioTotal.toFixed(2);
  

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);


  return (
    <CarritoContext.Provider value={{ cart, agregarAlCarrito, editarCarrito,eliminarDelCarrito, cantProductos, precioTotal }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CarritoContext);
};
