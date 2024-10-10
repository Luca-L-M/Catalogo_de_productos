import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css';
import productos from './Productos.js';
import Navbar from './Navbar.js';

const VerProductos = () => {
    const [search, setSearch] = useState('');
    const [productosSeleccionados, setProductosSeleccionados] = useState(productos);

    useEffect(() => {
        if (search !== '') {
            const filtro = productos.filter((producto) => producto.nombre.toLowerCase().includes(search.toLowerCase()));
            setProductosSeleccionados(filtro);
        }
        else setProductosSeleccionados(productos)
    }, [search]);

    return (
        <div>
            <Navbar/>
            <div id="main">
                <section>
                    <form>
                        <label>Buscar: <input type='text' value={search} onChange={e => setSearch(e.target.value)}/></label>
                    </form>
                </section>
                <section class="posts">
                    {productosSeleccionados.length > 0 && productosSeleccionados.map(producto => (
                        <Link to={`/detalles/${producto.id}`} key={producto.id}>
                            <article class="hover">
                                <header>
                                    <h3>{producto.nombre}</h3>
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
                        <a href="#" class="previous">Next</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default VerProductos;