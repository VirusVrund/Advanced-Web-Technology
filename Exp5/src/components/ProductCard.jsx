import React, { useContext } from 'react';
import { FavoritesContext } from '../context/CartContext';

const MovieCard = ({ movie }) => {
    const { favorites, dispatch } = useContext(FavoritesContext);
    const isFavorited = favorites.some(fav => fav.id === movie.id);

    const toggleFavorite = () => {
        if (isFavorited) {
            dispatch({ type: 'REMOVE_FAVORITE', payload: movie.id });
        } else {
            dispatch({ type: 'ADD_FAVORITE', payload: movie });
        }
    };

    return (
        <div className="movie-card">
            <div className="movie-image-container">
                <img src={movie.image} alt={movie.title} className="movie-image" />
                <button
                    className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
                    onClick={toggleFavorite}
                    title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorited ? '❤️' : '🤍'}
                </button>
            </div>
            <div className="movie-info">
                <span className="movie-genre">{movie.genre}</span>
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-year">{movie.year}</p>
                <div className="movie-rating">
                    <span className="rating-value">⭐ {movie.rating}</span>
                </div>
                <p className="movie-description">{movie.description}</p>
            </div>
        </div>
    );
};

export default MovieCard;
