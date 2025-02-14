import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GameState, ConfigResponse, GamesResponse, Category } from '@/types';

const initialState: GameState = {
  games: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  loading: false,
  error: null,
  currentPage: 1,  
  pageSize: 20,   
  totalGames: 0, 
};

const API_BASE_URL = 'https://casino.api.pikakasino.com/v1/pika';

export const fetchCategories = createAsyncThunk(
  'games/fetchCategories',
  async () => {
    try {
      const response = await axios.get<ConfigResponse>(`${API_BASE_URL}/en/config`);
      const lobbyItems = response.data.menu.lobby.items || [];
      
      const categoriesArray: Category[] = lobbyItems
        .map(item => ({
          id: item.id,
          name: item.name,
          getPage: item.links.getPage,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      return categoriesArray;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
);

export const fetchGamesByCategory = createAsyncThunk(
  'games/fetchGamesByCategory',
  async ({ getPage, searchQuery }: { getPage: string; searchQuery: string }) => {
    try {
      const response = await axios.get<GamesResponse>(getPage);
      const components = response.data.components || [];
      const gamesArray = components.flatMap(comp => comp.games || []);

      const filteredGames = searchQuery
        ? gamesArray.filter(game =>
            game.gameText.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : gamesArray;

      return filteredGames.sort((a, b) => a.gameText.localeCompare(b.gameText));
    } catch (error) {
      console.error('Error fetching category games:', error);
      throw error;
    }
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.searchQuery = ''; 
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch categories';
        state.loading = false;
        state.categories = [];
      })
      .addCase(fetchGamesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGamesByCategory.fulfilled, (state, action) => {
        state.games = action.payload;
        state.loading = false;
      })
      .addCase(fetchGamesByCategory.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch games';
        state.loading = false;
        state.games = [];
      });
  },
});

export const { setSelectedCategory, setSearchQuery } = gamesSlice.actions;
export default gamesSlice.reducer;
