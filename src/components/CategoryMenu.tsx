import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSelectedCategory, fetchGamesByCategory, setSearchQuery } from '@/store/slices/gamesSlice';

const CategoryMenu = () => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory } = useAppSelector((state) => state.games);

  const handleCategoryClick = (categoryId: string, getPage: string) => {
    if (selectedCategory === categoryId) return; 

    dispatch(setSelectedCategory(categoryId));
    dispatch(setSearchQuery('')); 

    if (getPage) {
      dispatch(fetchGamesByCategory({ getPage, searchQuery: '' }));
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value;
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      dispatch(setSelectedCategory(categoryId));
      dispatch(fetchGamesByCategory({ getPage: category.getPage, searchQuery: '' }));
    }
  };

  return (
    <div className="category-menu">
      <h2 className="category-title">Categories</h2>
      {/* Select per mobile */}
      <select
        className="category-select"
        value={selectedCategory || ''}
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id, category.getPage)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
