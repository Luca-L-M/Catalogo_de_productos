import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import DetallesProducto from './components/Detalles_de_producto';
import VerProductos from './components/VerProductos';
import './App.css';  // Importar el archivo de estilos globales

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/detalles/:id_producto" element={<DetallesProducto/>}/>
          <Route path="/verProductos" element={<VerProductos />}/>
        </Routes>
      </div>
    </Router>
  );
}
{/* <Route path="/contactos" element={<Contactos />} />
<Route path="/productos" element={<Productos />} />
<Route path="/detalles/:id" element={<Detalles />} /> */}

export default App;