import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <section className="hero">
                <h1>🎬 MovieDB</h1>
                <p>Discover the greatest movies of all time. Explore ratings, reviews, and build your collection of favorite films from all genres.</p>
                <button className="btn-primary" onClick={() => navigate('/browse')}>
                    Browse Movies
                </button>
            </section>

            <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Your Movie Portal</h2>
                <p style={{ maxWidth: '800px', margin: '0 auto', color: '#666' }}>
                    From classic masterpieces to modern blockbusters, explore thousands of films. Rate your favorites, maintain your collection, and discover new cinema. Start building your film library today.
                </p>
            </section>
        </div>
    );
};

export default Home;
