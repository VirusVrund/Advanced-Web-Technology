import React, { useContext } from 'react';
import { FavoritesContext } from '../context/CartContext';
import FavoriteItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
    const { favorites, dispatch } = useContext(FavoritesContext);
    const navigate = useNavigate();

    if (favorites.length === 0) {
        return (
            <div className="favorites-container" style={{ textAlign: 'center' }}>
                <h2 className="favorites-title">❤️ No Favorites Yet</h2>
                <p style={{ marginBottom: '2rem' }}>You haven't added any movies to your favorites. Start by browsing our collection!</p>
                <button className="btn-primary" onClick={() => navigate('/browse')}>
                    Browse Movies
                </button>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            <h2 className="favorites-title">❤️ Your Favorite Movies</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>You have {favorites.length} favorite movie(s)</p>

            <div className="favorites-items">
                {favorites.map(movie => (
                    <FavoriteItem key={movie.id} movie={movie} />
                ))}
            </div>

            <div className="favorites-actions">
                <button
                    className="clear-btn"
                    onClick={() => dispatch({ type: 'CLEAR_FAVORITES' })}
                >
                    Clear All Favorites
                </button>
                <button
                    className="btn-primary"
                    onClick={() => navigate('/browse')}
                >
                    Add More Movies
                </button>
            </div>
        </div>
    );
};

export default Favorites;
