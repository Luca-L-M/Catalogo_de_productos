// import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
// import CardCarrito from '../CardCarrito';
// import CarritoContext from '../CarritoContext';

// const CarritoModal = ({ isOpen, onClose }) => {
//   const { carrito, calcularTotal } = CarritoContext();
//   const [total, setTotal] = useState(0);
  
//   useEffect(() => {
//     setTotal(calcularTotal());
//   }, [carrito, calcularTotal]);
  
//   if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>Carrito</h2>
//           <button className="close-button" onClick={onClose}>X</button>
//         </div>
//         {carrito.map((producto) => (
//             <CardCarrito producto={producto} />
//           ))}
//         <h3><b>Total:</b> ${total}</h3>
//         <button className='boton-mas-info' onClick={()=> console.log("a")}><b><Link to="/carrito" className='link-no-decor'>Más info</Link></b></button>
//       </div>
//     </div>
//   );
// };

// export default CarritoModal;


// import React, { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
// import CardCarrito from '../CardCarrito';
// import CarritoContext from '../CarritoContext';

// const Modal = ({ isOpen, onClose }) => {
//   const { cart } = CarritoContext();
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     const calcularTotal = () => {
//       return cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0).toFixed(2);
//     };
//     setTotal(calcularTotal());
//   }, [cart]);

//   if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada
  
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>Carrito</h2>
//           <button className="close-button" onClick={onClose}>X</button>
//         </div>
//         {cart.map((producto) => (
//             <CardCarrito key={producto.id} producto={producto} />
//         ))}
//         <h3><b>Total:</b> ${total}</h3>
//         <button className='boton-mas-info'>
//           <b><Link to="/carrito" className='link-no-decor'>Más info</Link></b>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Modal;

// import React, { useEffect, useState, useContext } from 'react';
// import { Link } from "react-router-dom";
// import { useCart } from '../CarritoContext';

// const CarritoModal = ({ isOpen, onClose }) => {
//   const { cart } = useCart();  // Usamos el contexto de carrito
//   const [total, setTotal] = useState(0);

//   // Calculamos el total cuando cambian los productos del carrito
//   useEffect(() => {
//     const calcularTotal = () => {
//       let total = 0;
//       if (Array.isArray(cart)) {
//         cart.forEach((item) => {
//           total += item.price * (item.quantity || 1);
//         });
//       }
//       return total.toFixed(2);
//     };
  
//     setTotal(calcularTotal());
//   }, [cart]);

//   if (!isOpen) return null;  // Si el modal no está abierto, no se muestra nada

//   return (
//     <div className="modal-overlay" onClick={onClose} style={{backgroundColor:'magenta'}}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>Carrito</h2>
//           <button className="close-button" onClick={onClose}>X</button>
//         </div>

//         {/* Lista de productos en el carrito */}
//         {cart.find(item => item) == null ? (
//           <p>El carrito está vacío.</p>
//         ) : (
//           <ul>
//             {cart.map((producto) => (
//               <li key={producto.id}>
//                 {producto.name} x {producto.quantity || 1} - ${producto.price * (producto.quantity || 1)}
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Mostrar el total */}
//         <h3><b>Total:</b> ${total}</h3>
//         <button className='boton-mas-info'>
//           <b><Link to="/carrito" className='link-no-decor'>Más info</Link></b>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarritoModal;

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

  if (!isOpen) return null;  // Si el modal no está abierto, no se muestra nada

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
