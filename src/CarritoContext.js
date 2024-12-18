import React, { createContext, useState, useEffect, useContext } from 'react';

const CarritoContext = createContext();


export const CartProvider = ({ children }) => {
 
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

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



  const eliminarProductoDelCarrito = (itemId) => {
    setCart((prevCart) => {
        const updatedCart = prevCart.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const eliminarCantProductoDelCarrito = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === itemId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item; 
      }).filter(item => item !== null); 
  
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
    <CarritoContext.Provider value={{ cart, agregarAlCarrito,eliminarProductoDelCarrito,eliminarCantProductoDelCarrito, cantProductos, precioTotal }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CarritoContext);
};
