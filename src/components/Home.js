import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css'; // Importar el archivo de estilos para Home
import productos from './Productos.js';
import Carrousel from './Carrusel.js';
import Navbar from './Navbar.js';

const Home = () => {
    return (
        <div id='wrapper'>
            <Navbar/>
            <div id="main">
                <Carrousel/>
                <header class="major">
                    <h2>Productos destacados</h2>
                </header>
                <section class="posts">
                    {productos.length > 0 && productos.slice(0, 6).map(producto => (
                        <Link to={`/detalles/${producto.id}`} key={producto.id}>
                            <article class="hover">
                                <header>
                                    <h2>{producto.nombre}</h2>
                                </header>
                                <img src={producto.img} alt={producto.nombre}/>
                            </article>
                        </Link>
                    ))}
                </section>

                <footer>
                    <Link to={'/verProductos'}><button>Ver Más</button></Link>
                </footer>
            </div>
        </div>
    )
}

export default Home;