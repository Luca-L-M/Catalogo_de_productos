// import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import '../assets/css/main.css';
// import productos from './Productos.js';
// import Navbar from './Navbar.js';

// const DetallesProducto = () => {
//     const { id_producto } = useParams();
//     return (
//         <div>
//             <Navbar/>
//             <div id="main">
//                 <article class="post featured">
//                     <header class="major">
//                         <h3>{productos[id_producto].nombre}</h3>
//                     </header>
//                     <img src={productos[id_producto].img} alt={productos[id_producto].nombre}/> 
//                      <div>
//                         <h3>${productos[id_producto].precio}</h3>
//                         <p>{productos[id_producto].descripcion}</p>
//                     </div>
//                     <ul class="actions special">
//                         <li><a href="#" class="button large">Comprar</a></li>  
//                     </ul>
// 				</article>
//             </div>
//         </div>
//     );
// };

// export default DetallesProducto;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/main.css';
import Navbar from './Navbar.js';
import axios from 'axios';  
import CarritoContext from '../CarritoContext';

const DetallesProducto = () => {
    const { id_producto } = useParams();  
    const [producto, setProducto] = useState(null);  
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(response => {
                const productoEncontrado = response.data.products.find(
                    (producto) => producto.id === parseInt(id_producto)
                );
                setProducto(productoEncontrado); 
                setLoading(false);  
            })
            .catch(error => {
                console.error('Error al obtener el producto:', error);
                setLoading(false);  
            });
    }, [id_producto]);  

    if (loading) {
        return <div>Loading...</div>;  
    }

    if (!producto) {
        return <div>Producto no encontrado</div>;  
    }
const handleComprar=()=>
{   
    CarritoContext.agregarAlCarrito(producto);
}
    return (
        <div>
            <Navbar />
            <div id="main">
                <article className="post featured">
                    <header className="major">
                        <h3>{producto.title}</h3>
                    </header>
                    <img src={producto.images[0]} alt={producto.title} /> 
                    <div>
                        <h3>${producto.price}</h3> 
                        <p>{producto.description}</p> 
                    </div>
                    <ul className="actions special">
                    <button onClick={handleComprar}>Comprar</button>
                    </ul>
                </article>
            </div>
        </div>
    );
};

export default DetallesProducto;
