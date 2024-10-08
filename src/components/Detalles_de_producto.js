import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/main.css';
import productos from './Productos.js';
import Navbar from './Navbar.js';

const DetallesProducto = () => {
    const { id_producto } = useParams();
    return (
        <div>
            <Navbar/>
            <div id="main">
                <article class="post featured">
                    <header class="major">
                        <h3>{productos[id_producto].nombre}</h3>
                    </header>
                    <img src={productos[id_producto].img} alt={productos[id_producto].nombre}/> 
                     <div>
                        <h3>${productos[id_producto].precio}</h3>
                        <p>{productos[id_producto].descripcion}</p>
                    </div>
                    <ul class="actions special">
                        <li><a href="#" class="button large">Comprar</a></li>  
                    </ul>
				</article>
            </div>
        </div>
    );
};

export default DetallesProducto;