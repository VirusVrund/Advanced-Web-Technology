import React, { createContext, useReducer, useEffect } from 'react';

// Define the initial state
const initialState = {
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
};

// Define the reducer function
const favoritesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE': {
            const isFavorited = state.favorites.some(fav => fav.id === action.payload.id);
            if (isFavorited) return state;
            return { ...state, favorites: [...state.favorites, action.payload] };
        }

        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(fav => fav.id !== action.payload)
            };

        case 'CLEAR_FAVORITES':
            return { ...state, favorites: [] };

        default:
            return state;
    }
};

// Create the context
export const FavoritesContext = createContext();

// Context Provider component
export const FavoritesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(favoritesReducer, initialState);

    // Persist favorites to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
    }, [state.favorites]);

    return (
        <FavoritesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </FavoritesContext.Provider>
    );
};
