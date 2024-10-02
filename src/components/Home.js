import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css'; // Importar el archivo de estilos para Home
import productos from './Productos';
import Carrousel from './Carrusel';

const Home = () => {
    return (
    <div>
        <nav id="nav">
            <ul class="links">
                <li class="active"><a href="index.html">This is Massively</a></li>
                <li><a href="generic.html">Generic Page</a></li>
                <li><a href="elements.html">Elements Reference</a></li>
            </ul>
        </nav>

        <div id="main">

            <Carrousel/>

            <article class="post featured">
                <header class="major">
                    <h2>Productos destacados</h2>
                </header>
            </article>

            <section class="posts">
                <Link to={`/detalles/${productos[1].id}`}>
                    <article>
                        <header>
                            <h2>{productos[1].nombre}</h2>
                        </header>
                        <img src={`productos[1].img`} alt=''/>
                    </article>
                </Link>
                <Link to={`/detalles/${productos[2].id}`}>
                    <article>
                        <header>
                            <h2>{productos[2].nombre}</h2>
                        </header>
                        <img src={`productos[2].img`} alt=''/>
                    </article>
                </Link>
                <Link to={`/detalles/${productos[3].id}`}>
                    <article>
                        <header>
                            <h2>{productos[3].nombre}</h2>
                        </header>
                        <img src={`productos[3].img`} alt=''/>
                    </article>
                </Link>
                <Link to={`/detalles/${productos[4].id}`}>
                    <article>
                        <header>
                            <h2>{productos[4].nombre}</h2>
                        </header>
                        <img src={`productos[4].img`} alt=''/>
                    </article>
                </Link>
                <Link to={`/detalles/${productos[5].id}`}>
                    <article>
                        <header>
                            <h2>{productos[5].nombre}</h2>
                        </header>
                        <img src={`productos[5].img`} alt=''/>
                    </article>
                </Link>
                <Link to={`/detalles/${productos[6].id}`}>
                    <article>
                        <header>
                            <h2>{productos[6].nombre}</h2>
                        </header>
                        <img src={`productos[6].img`} alt=''/>
                    </article>
                </Link>
            </section>

            <footer>
                <button><a href="#" class="">Ver Más</a></button>
                <div class="pagination">
                    <a href="#" class="previous">Prev</a>
                    <a href="#" class="page active">1</a>
                    <a href="#" class="page">2</a>
                    <a href="#" class="page">3</a>
                    <span class="extra">&hellip;</span>
                    <a href="#" class="page">8</a>
                    <a href="#" class="page">9</a>
                    <a href="#" class="page">10</a>
                    <a href="#" class="next">Next</a>
                </div>
            </footer>

        </div>
    </div>
    )
}

export default Home;