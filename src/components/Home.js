import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/main.css'; 
import Carrousel from './Carrusel.js';
import Navbar from './Navbar.js';
import { useEffect, useState, useNavigate } from 'react';
import axios from 'axios';
import CarritoContext from '../CarritoContext.js';


//FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//CARRITO
import Offcanvas from "react-bootstrap/Offcanvas";
import { useCart, removeFromCart  } from "../Cart/page.js";

//OFFCANVAS DEL CARRITO
function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //STATE DEL CARRITO
  const [repetidos, setRepetidos] = useState(new Map());
  const [Norepetidos, setNoRepetidos] = useState([]);
  let totalCarrito = 0; 
  Norepetidos.forEach(product => {
    const cantidad = repetidos[product.title]; 
    totalCarrito += product.price * cantidad;
  });

  //SACA PRODUCTOS REPETIDOS
  //el reduce permite acumular o reducir un objeto del cart a un solo valor
  useEffect(() => {
    const repetidos = cart.reduce((contador, producto) => {
      contador[producto.title] = (contador[producto.title] || 0) + 1; //si el producto ya está en el contador, toma su valor actual. Sino usamos cero como valor inicial. 
      //uso el titulo del producto como clave
      return contador;
    }, {});

    setRepetidos(repetidos);
    const arrayUnicos = cart.filter(
      (producto, index, cart) =>
        index === cart.findIndex((p) => p.title === producto.title)
      //Busca el índice del primer producto en el carrito cuyo titulo coincide con el titulo del producto actual.
    ); // saca todos los productos repetidos :(
    setNoRepetidos(arrayUnicos);
  }, [cart]);

  return (
    <>
      {/* OFFCANVAS DEL CARRITO */}
     {/* Ícono del carrito */}
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
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} x {item.quantity || 1} - ${item.price * (item.quantity || 1)}
                  </li>
                ))}
              </ul>
          <button 
            onClick={() => navigate("/detallecarrito", { state: { Norepetidos, repetidos, totalCarrito } })} 
            style={styles.button}>
            Ver detalles
          </button>
          <ul style={styles.offcanvasList}>
            {Norepetidos.map((product, index) => (
              <li key={index} style={styles.offcanvasListItem}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={styles.offcanvasImg}
                />
                <p>{product.title}</p>
                <p>
                  Precio: ${product.price * (repetidos[product.title] || 1)}
                </p>
                <button className="close-button" onClick={handleClose}>X</button>
              </li>
            ))}
            <h3 style={styles.offcanvasH3}>Subtotal : {totalCarrito} </h3>
          </ul>)}
        </Offcanvas.Body>
      </Offcanvas>
      </div>
    </>
  );
}

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
                                <img src={producto.images[0]} alt={producto.nombre}/>
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

const styles={
    offcanvasBody: {
        backgroundColor: '#ffffff',
        color: '#333',
        padding: '2rem'
      },
    
      offcanvasHeader: {
        backgroundColor: '#4CAF50',
        color: 'white',
        borderBottom: '2px solid #ddd',
      },
    
      offcanvasTitle: {
        fontWeight: 'bold',
        fontSize: '1.5rem'
      },
    
      offcanvasBtnDanger: {
        backgroundColor: '#e74c3c',
        border: 'none',
        borderRadius: '50%',
        padding: '0.5rem',
        marginLeft: '10px',
      },
    
      offcanvasList: {
        listStyle: 'none',
        paddingLeft: 0
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
        width: '50px', // Ajustamos el tamaño de la imagen
        height: '50px',
        objectFit: 'cover',
      },
    
      offcanvasH3: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginTop: '20px',
        color: '#4CAF50'
      },
    
      card: {
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        marginBottom: '3rem',
      },
    
      cardHover: {
        transform: 'translateY(-10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      },
    
      cardImgTop: {
        borderRadius: '15px 15px 0 0',
        width: '100%',
        height: '200px',
        objectFit: 'cover',
      },
    
      cardBody: {
        backgroundColor: '#fff',
        textAlign: 'center',
        padding: '1rem',
      },
    
      cardTitle: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        margin: '10px 0',
      },
    
      cardText: {
        color: '#4CAF50',
        fontSize: '1rem',
        fontWeight: 'bold',
      },
    
      cardButton: {
        marginTop: '15px',
        borderRadius: '20px',
        backgroundColor: '#E9BABC',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        transition: 'background-color 0.3s ease',
      },
    
      carouselItemImg: {
        borderRadius: '10px',
        transition: 'transform 0.3s ease'
      },
    
      productosTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#E9BABC',
        margin: '20px 0',
        textAlign: 'center',
        marginBottom: '4rem',
        marginTop: '6rem',
      },
    
      btnPrimary: {
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '20px',
        padding: '0.5rem 1.5rem',
        fontSize: '1rem',
      },
    
      button: {
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
      },
    
      buttonFocus: {
        outline: 'none',
      },
    
      // Nueva clase para el buscador
      searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
      },
    
      searchInput: {
        width: '300px',
        borderRadius: '20px',
        padding: '0.5rem',
        fontSize: '1.1rem',
        marginRight: '10px',
        border: '1px solid #ddd'
      },
    
      searchButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontSize: '1.1rem',
      }
    };
