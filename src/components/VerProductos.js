// import React, { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../assets/css/main.css';
// import productos from './Productos.js';
// import Navbar from './Navbar.js';

// const VerProductos = () => {
//     const [search, setSearch] = useState('');
//     const [productosSeleccionados, setProductosSeleccionados] = useState(productos);

//     useEffect(() => {
//         if (search !== '') {
//             const filtro = productos.filter((producto) => producto.nombre.toLowerCase().includes(search.toLowerCase()));
//             setProductosSeleccionados(filtro);
//         }
//         else setProductosSeleccionados(productos)
//     }, [search]);

//     return (
//         <div>
//             <Navbar/>
//             <div id="main">
//                 <section>
//                     <form>
//                         <label>Buscar: <input type='text' value={search} onChange={e => setSearch(e.target.value)}/></label>
//                     </form>
//                 </section>
//                 <section class="posts">
//                     {productosSeleccionados.length > 0 && productosSeleccionados.map(producto => (
//                         <Link to={`/detalles/${producto.id}`} key={producto.id}>
//                             <article class="hover">
//                                 <header>
//                                     <h3>{producto.nombre}</h3>
//                                 </header>
//                                 <img src={producto.img} alt={producto.nombre}/>
//                             </article>
//                         </Link>
//                     ))}
//                 </section>

//                 <footer>
//                     <div class="pagination">
//                         <a href="#" class="previous">Prev</a>
//                         <a href="#" class="page active">1</a>
//                         <a href="#" class="page">2</a>
//                         <a href="#" class="page">3</a>
//                         <a href="#" class="previous">Next</a>
//                     </div>
//                 </footer>
//             </div>
//         </div>
//     );
// };

// export default VerProductos;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css';
import Navbar from './Navbar.js';
import axios from 'axios';

const VerProductos = () => {
    const [search, setSearch] = useState('');
    const [productos, setProductos] = useState([]);
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    // Obtener productos y categorías de la API
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                setProductos(response.data.products);
                setProductosSeleccionados(response.data.products);
                // Extraer categorías únicas de los productos
                const uniqueCategories = [...new Set(response.data.products.map(product => product.category))];
                setCategorias(uniqueCategories);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        obtenerProductos();
    }, []);

    // Filtrar productos por búsqueda y categoría
   
    useEffect(() => {
        const filtro = productos.filter(producto => {
            const matchesSearch = search ? producto.nombre && producto.nombre.includes(search) : true;
            const matchesCategory = selectedCategory ? (producto.category && producto.category === selectedCategory) : true;
            return matchesSearch && matchesCategory;
        });
        setProductosSeleccionados(filtro);
    }, [search, selectedCategory, productos]);

    return (
        <div>
            <Navbar />
            <div id="main">
                <section>
                    <form>
                        <label>
                            Buscar: <input type='text' value={search} onChange={e => setSearch(e.target.value)} />
                        </label>
                        <label>
                            Categoría:
                            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                                <option value="">Todas</option>
                                {categorias.map((categoria, index) => (
                                    <option key={index} value={categoria}>{categoria}</option>
                                ))}
                            </select>
                        </label>
                    </form>
                </section>
                <section className="posts">
                    {productosSeleccionados.length > 0 && productosSeleccionados.map(producto => (
                        <Link to={`/detalles/${producto.id}`} key={producto.id}>
                            <article className="hover">
                                <header>
                                    <h3>{producto.nombre}</h3>
                                </header>
                                <img src={producto.img} alt={producto.nombre} />
                            </article>
                        </Link>
                    ))}
                </section>

                <footer>
                    <div className="pagination">
                        <a href="#" className="previous">Prev</a>
                        <a href="#" className="page active">1</a>
                        <a href="#" className="page">2</a>
                        <a href="#" className="page">3</a>
                        <a href="#" className="previous">Next</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default VerProductos;
