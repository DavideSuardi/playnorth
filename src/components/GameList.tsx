import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchGamesByCategory, fetchCategories, setSearchQuery, setSelectedCategory } from '@/store/slices/gamesSlice';
import GameCard from './GameCard';
import SearchBar from './SearchBar';
import CategoryMenu from './CategoryMenu';

const GameList = () => {
  const dispatch = useAppDispatch();
  const { games, loading, error, categories, selectedCategory, searchQuery } = useAppSelector((state) => state.games);
  
  const [defaultCategorySet, setDefaultCategorySet] = useState(false); 

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!defaultCategorySet && categories.length > 0) {
      const allGamesCategory = categories.find(cat => cat.name.toLowerCase() === "all games");

      if (allGamesCategory && !selectedCategory) {
        dispatch(setSelectedCategory(allGamesCategory.id)); 
        dispatch(fetchGamesByCategory({ getPage: allGamesCategory.getPage, searchQuery: '' }));
        setDefaultCategorySet(true); 
      }
    }
  }, [dispatch, categories, selectedCategory, defaultCategorySet]);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat.id === selectedCategory);
      if (category) {
        dispatch(fetchGamesByCategory({ getPage: category.getPage, searchQuery }));
      }
    }
  }, [dispatch, selectedCategory, searchQuery, categories]);

  return (
    <div className="game-list">
      <div className="layout">
        <aside className="sidebar">
          <CategoryMenu />
        </aside>
        <main className="main-content">
          <div className="search-bar-container">
            <SearchBar />
          </div>

          {loading ? (
            <div className="loading-grid">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="loading-card" />
              ))}
            </div>
          ) : error ? (
            <div className="error-message">
              {error}
            </div>
          ) : !loading && games.length === 0 ? (
            <div className="no-games">
              <p>No games found</p>
            </div>
          ) : (
            <div className="games-grid">
              {games.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default GameList;
