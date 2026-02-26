import React, { useContext } from 'react';
import { FavoritesContext } from '../context/CartContext';

const FavoriteItem = ({ movie }) => {
    const { dispatch } = useContext(FavoritesContext);

    return (
        <div className="favorite-item">
            <img src={movie.image} alt={movie.title} className="favorite-item-img" />
            <div className="favorite-item-details">
                <h3 className="favorite-item-title">{movie.title}</h3>
                <span className="favorite-genre">{movie.genre}</span>
                <p className="favorite-year">🎞️ {movie.year}</p>
                <p className="favorite-rating">⭐ Rating: {movie.rating}</p>
                <p className="favorite-description">{movie.description}</p>
                <button
                    className="remove-btn"
                    onClick={() => dispatch({ type: 'REMOVE_FAVORITE', payload: movie.id })}
                >
                    ❌ Remove
                </button>
            </div>
        </div>
    );
};

export default FavoriteItem;
