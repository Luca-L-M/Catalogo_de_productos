
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/main.css';
import Navbar from './Navbar.js';
import axios from 'axios';  
import { useCart } from '../CarritoContext.js';

const DetallesProducto = () => {
    const { id_producto } = useParams();  
    const [producto, setProducto] = useState(null);  
    const [loading, setLoading] = useState(true); 

    const { agregarAlCarrito } = useCart(); 

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
    agregarAlCarrito(producto);
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
