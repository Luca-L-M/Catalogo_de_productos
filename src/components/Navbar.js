import { Link } from 'react-router-dom';
import '../assets/css/main.css';

const Navbar = () => {
    return (
        <nav id="nav">
            <ul class="links">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/verProductos'>Productos</Link></li>
                <li><Link to='/contactos'>Contactos</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;