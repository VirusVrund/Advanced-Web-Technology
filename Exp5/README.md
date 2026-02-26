# Movie Database App (React + Vite)

A modern movie discovery and favorites application built with React, demonstrating key React concepts.

## Features

- 🎬 **Browse Movies** - Explore a curated collection of top-rated movies
- ❤️ **Favorites Management** - Add/remove movies from your favorites list
- 🔍 **Search & Filter** - Search by title and filter by genre
- 💾 **Persistent Storage** - Favorites are saved to localStorage
- 🎨 **Modern UI** - Dark theme with responsive design

## React Concepts Demonstrated

- **Components** - Reusable UI components (MovieCard, FavoriteItem, Navbar)
- **Routing** - Multi-page navigation with React Router (Home, Browse, Favorites)
- **State Management** - Context API with useReducer for global favorites state
- **Hooks** - useState, useEffect, useContext, useMemo for functional components
- **Props & Data Flow** - Passing data between components
- **localStorage** - Persisting state across sessions

## Project Structure

```
src/
├── pages/
│   ├── Home.jsx        # Landing page
│   ├── Shop.jsx        # Browse/Browse movies page
│   └── Cart.jsx        # Favorites page
├── components/
│   ├── Navbar.jsx      # Navigation bar
│   ├── ProductCard.jsx # Movie card component
│   └── CartItem.jsx    # Favorite item component
├── context/
│   └── CartContext.jsx # FavoritesContext with useReducer
├── data/
│   └── products.js     # Movie data
└── styles.css          # Global styles
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd Exp5
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open in your browser:
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Tech Stack

- **React 19.2** - UI library
- **React Router DOM 7.13** - Client-side routing
- **Vite 7.3** - Build tool and dev server
- **ESLint** - Code quality

## Learning Outcomes

This project is a learning demonstration showcasing:
- Component composition and reusability
- Client-side routing patterns
- Global state management with Context API
- Form filtering and search functionality
- localStorage integration
- Responsive CSS design

## License

MIT
