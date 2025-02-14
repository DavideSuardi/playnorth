import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { setSearchQuery } from '@/store/slices/gamesSlice';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, dispatch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search games..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;