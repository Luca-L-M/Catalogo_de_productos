import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/main.css'; 
import Carrusel from './Carrusel';
import Navbar from './Navbar';
import axios from 'axios';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from '../CarritoContext'


const OffCanvasExample = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle repeated products and calculate the total
  const [repetidos, setRepetidos] = useState(new Map());
  const [Norepetidos, setNoRepetidos] = useState([]);
  let totalCarrito = 0; 
  Norepetidos.forEach(product => {
    const cantidad = repetidos[product.title]; 
    totalCarrito += product.price * cantidad;
  });

  useEffect(() => {
    const repetidos = cart.reduce((contador, producto) => {
      contador[producto.title] = (contador[producto.title] || 0) + 1; // counting products by title
      return contador;
    }, {});

    setRepetidos(repetidos);
    const arrayUnicos = cart.filter(
      (producto, index, cart) =>
        index === cart.findIndex((p) => p.title === producto.title)
    );
    setNoRepetidos(arrayUnicos);
  }, [cart]);

  return (
    <>
      <div className="cart-icon-container">
        <div className="cart-icon" onClick={handleShow}>
          <i className="fas fa-shopping-cart"></i>
        </div>
        <Offcanvas show={show} onHide={handleClose} {...props}>
          <Offcanvas.Header closeButton style={styles.offcanvasHeader}>
            <Offcanvas.Title style={styles.offcanvasTitle}>
              <FontAwesomeIcon icon={faCartShopping} /> Cart
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={styles.offcanvasBody}>
            <h5>Productos:</h5>
            {cart.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              <ul>
                {Norepetidos.map((product, index) => (
                  <li key={index} style={styles.offcanvasListItem}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={styles.offcanvasImg}
                    />
                    <p>{product.title}</p>
                    <p>Precio: ${product.price * (repetidos[product.title] || 1)}</p>
                    <button className="close-button" onClick={() => removeFromCart(product.id)}>X</button>
                  </li>
                ))}
                <h3 style={styles.offcanvasH3}>Subtotal: ${totalCarrito}</h3>
                <button 
                  onClick={() => navigate("/detallecarrito", { state: { Norepetidos, repetidos, totalCarrito } })} 
                  style={styles.button}
                >
                  Ver detalles
                </button>
              </ul>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

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
        <OffCanvasExample />
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

const styles = {
  offcanvasBody: {
    backgroundColor: '#ffffff',
    color: '#333',
    padding: '2rem',
  },
  offcanvasHeader: {
    backgroundColor: '#282c34',
    color: 'white',
    borderBottom: '2px solid #ddd',
  },
  offcanvasTitle: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  offcanvasListItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  offcanvasImg: {
    borderRadius: '5px',
    marginRight: '10px',
    width: '50px',
    height: '50px',
    objectFit: 'cover',
  },
  offcanvasH3: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '20px',
    color: '#4CAF50',
  },
  button: {
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
};

export default Home;
