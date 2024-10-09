import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css'; // Importar el archivo de estilos para Home
import productos from './Productos.js';

const Home = () => {
    return (
        <div id="main">
            <section class="posts">
                {productos.length > 0 && productos.map(producto => (
                    <Link to={`/detalles/${producto.id}`} key={producto.id}>
                        <article>
                            <header>
                                <h2>{producto.nombre}</h2>
                            </header>
                            <img src={producto.img} alt={producto.nombre}/>
                        </article>
                    </Link>
                ))}
            </section>

            <footer>
                <div class="pagination">
                    <a href="#" class="previous">Prev</a>
                    <a href="#" class="page active">1</a>
                    <a href="#" class="page">2</a>
                    <a href="#" class="page">3</a>
                    <a href="#" class="next">Next</a>
                </div>
            </footer>
        </div>
    )
}

export default Home;