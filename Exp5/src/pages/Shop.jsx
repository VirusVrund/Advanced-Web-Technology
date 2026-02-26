import React, { useState, useEffect, useMemo, useRef } from 'react';
import moviesData from '../data/products';
import MovieCard from '../components/ProductCard';

const Browse = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const searchInputRef = useRef(null);

    // Demonstrate useEffect: Load movies on mount
    useEffect(() => {
        // Simulating a fetch call
        setMovies(moviesData);

        // Demonstrate useRef: Focus search input on mount
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // Demonstrate useMemo: Optimize filtering
    const filteredMovies = useMemo(() => {
        return movies.filter(movie => {
            const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = selectedGenre === 'All' || movie.genre.toLowerCase().includes(selectedGenre.toLowerCase());
            return matchesSearch && matchesGenre;
        });
    }, [movies, searchTerm, selectedGenre]);

    const genres = ['All', ...new Set(moviesData.flatMap(m => m.genre.split(', ')))];

    return (
        <div className="browse-container">
            <div className="browse-header">
                <h1>🎬 Browse Movies</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="search-input"
                        style={{ width: '150px' }}
                    >
                        {genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search movies by title..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredMovies.length > 0 ? (
                <div className="movies-grid">
                    {filteredMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p>No movies found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Browse;
