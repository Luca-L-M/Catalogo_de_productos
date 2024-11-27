import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/main.css'; 
import Carrusel from './Carrusel';
import Navbar from './Navbar';
import axios from 'axios';
import { useCart } from '../CarritoContext'


const Home = () => {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProductos(response.data.products);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  }, []);

  return (
    <div id='wrapper'>
      <Navbar />
      <div id="main">
        <Carrusel />
        <header className="major">
          <h2>Productos destacados</h2>
        </header>
  
        <section className="posts">
          {productos.length > 0 && productos.slice(0, 6).map(producto => (
            <Link to={`/detalles/${producto.id}`} key={producto.id}>
              <article className="hover">
                <header>
                  <h2>{producto.nombre}</h2>
                </header>
                <img src={producto.images[0]} alt={producto.nombre} />
              </article>
            </Link>
          ))}
        </section>

        <footer>
          <Link to={'/verProductos'}><button>Ver Más</button></Link>
        </footer>
      </div>
    </div>
  );
};


export default Home;
