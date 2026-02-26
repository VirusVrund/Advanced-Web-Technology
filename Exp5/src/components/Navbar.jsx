import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/CartContext';

const Navbar = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <h1>🎬 MovieDB</h1>
                </Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/browse">Browse</Link></li>
                <li>
                    <Link to="/favorites" className="favorites-icon">
                        Favorites
                        {favorites.length > 0 && <span className="favorites-badge">{favorites.length}</span>}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
