import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/carrusel.css';
import axios from 'axios';

const Carrousel = () => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const showSlides = (n) => {
    if (n > productosSeleccionados.length) { setSlideIndex(1); }
    if (n < 1) { setSlideIndex(productosSeleccionados.length); }
  };

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProductos(response.data.products);
        setProductosSeleccionados(response.data.products);
        const uniqueCategories = [...new Set(response.data.products.map(product => product.category))];
        setCategorias(uniqueCategories);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    const filtro = productos.filter(producto => {
      const matchesSearch = search ? producto.nombre && producto.nombre.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesCategory = selectedCategory ? (producto.category && producto.category === selectedCategory) : true;
      return matchesSearch && matchesCategory;
    });
    setProductosSeleccionados(filtro);
    setSlideIndex(1); // Reset slide index when filtering
  }, [search, selectedCategory, productos]);

  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex, productosSeleccionados]);

  const plusSlides = (n) => {
    setSlideIndex((prevIndex) => prevIndex + n);
  };

  return (
    <div>
      <div className="slideshow-container">
        {productosSeleccionados.length > 0 && (
          <div className="mySlides fade">
            <img src={productosSeleccionados[slideIndex - 1].images[0]} alt={productosSeleccionados[slideIndex - 1].nombre} />
          </div>
        )}

        <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
        <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
      </div>
    </div>
  );
};

export default Carrousel;
