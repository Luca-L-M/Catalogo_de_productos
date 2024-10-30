// import React, { useEffect, useRef, useState } from 'react';
// import '../assets/css/carrusel.css';
// import axios from 'axios';

// const Carrousel = () => {
//   const [slideIndex, setSlideIndex] = useState(1);
//   const slidesRef = useRef([]);
//   const dotsRef = useRef([]);
//   const [productos, setProductos] = useState([]);
//   const [productosSeleccionados, setProductosSeleccionados] = useState([]);
//   const [categorias, setCategorias] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');

//   const showSlides = (n) => {
//     if (n > slidesRef.current.length) { setSlideIndex(1); }
//     if (n < 1) { setSlideIndex(slidesRef.current.length); }

//     slidesRef.current.forEach((slide, i) => {
//       slide.style.display = (i === slideIndex - 1) ? "block" : "none";
//     });

//     dotsRef.current.forEach((dot, i) => {
//       dot.className = dot.className.replace(" active", "");
//       if (i === slideIndex - 1) {
//         dot.className += " active";
//       }
//     });
//   };

//   useEffect(() => {
//     const obtenerProductos = async () => {
//         try {
//             const response = await axios.get('https://dummyjson.com/products');
//             setProductos(response.data.products);
//             setProductosSeleccionados(response.data.products);
//             // Extraer categorías únicas de los productos
//             const uniqueCategories = [...new Set(response.data.products.map(product => product.category))];
//             setCategorias(uniqueCategories);
//         } catch (error) {
//             console.error('Error al obtener productos:', error);
//         }
//     };

//     obtenerProductos();
// }, []);

//   useEffect(() => {
//       showSlides(slideIndex);
//   }, [slideIndex]);

//   const plusSlides = (n) => {
//       setSlideIndex((prevIndex) => prevIndex + n);
//   };

//   return (
//     <div className="slideshow-container">
//       <div ref={el => slidesRef.current[0] = el} className="mySlides fade">
//         <img  src={productos[0].images[0]} alt={productos[0].nombre}/>
//       </div>

//       <div ref={el => slidesRef.current[1] = el} className="mySlides fade">
//         <img src={productos[1].images[0]} alt={productos[1].nombre}/>
//       </div>

//       <div ref={el => slidesRef.current[2] = el} className="mySlides fade">
//         <img src={productos[2].images[0]} alt={productos[2].nombre}/>
//       </div>

//       <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
//       <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
//     </div>
//   );
// };

// export default Carrousel;














// import React, { useEffect, useRef, useState } from 'react';
// import '../assets/css/carrusel.css';
// import axios from 'axios';

// const Carrousel = () => {
//   const [slideIndex, setSlideIndex] = useState(1);
//   const slidesRef = useRef([]);
//   const dotsRef = useRef([]);
//   const [productos, setProductos] = useState([]);
//   const [productosSeleccionados, setProductosSeleccionados] = useState([]);
//   const [categorias, setCategorias] = useState([]);
//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const showSlides = (n) => {
//     if (n > slidesRef.current.length) { setSlideIndex(1); }
//     if (n < 1) { setSlideIndex(slidesRef.current.length); }

//     slidesRef.current.forEach((slide, i) => {
//       slide.style.display = (i === slideIndex - 1) ? "block" : "none";
//     });

//     dotsRef.current.forEach((dot, i) => {
//       dot.className = dot.className.replace(" active", "");
//       if (i === slideIndex - 1) {
//         dot.className += " active";
//       }
//     });
//   };

//   useEffect(() => {
//     const obtenerProductos = async () => {
//       try {
//         const response = await axios.get('https://dummyjson.com/products');
//         setProductos(response.data.products);
//         setProductosSeleccionados(response.data.products);
//         // Extraer categorías únicas de los productos
//         const uniqueCategories = [...new Set(response.data.products.map(product => product.category))];
//         setCategorias(uniqueCategories);
//       } catch (error) {
//         console.error('Error al obtener productos:', error);
//       }
//     };

//     obtenerProductos();
//   }, []);

//   useEffect(() => {
//     const filtro = productos.filter(producto => {
//       const matchesSearch = search ? producto.nombre && producto.nombre.toLowerCase().includes(search.toLowerCase()) : true;
//       const matchesCategory = selectedCategory ? (producto.category && producto.category === selectedCategory) : true;
//       return matchesSearch && matchesCategory;
//     });
//     setProductosSeleccionados(filtro);
//     // Reset the slide index when filtering
//     setSlideIndex(1);
//   }, [search, selectedCategory, productos]);

//   useEffect(() => {
//     showSlides(slideIndex);
//   }, [slideIndex]);

//   const plusSlides = (n) => {
//     setSlideIndex((prevIndex) => prevIndex + n);
//   };

//   return (
//     <div>
//       <div>
//         <form>
//           <label>
//             Buscar: <input type='text' value={search} onChange={e => setSearch(e.target.value)} />
//           </label>
//           <label>
//             Categoría:
//             <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
//               <option value="">Todas</option>
//               {categorias.map((categoria, index) => (
//                 <option key={index} value={categoria}>{categoria}</option>
//               ))}
//             </select>
//           </label>
//         </form>
//       </div>

//       <div className="slideshow-container">
//         {productosSeleccionados.map((producto, index) => (
//           <div key={producto.id} ref={el => slidesRef.current[index] = el} className="mySlides fade">
//             <img src={producto.images[0]} alt={producto.nombre} />
//           </div>
//         ))}

//         <a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
//         <a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
//       </div>
//     </div>
//   );
// };
// export default Carrousel;

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
