export interface MenuItem {
  id: string;
  name: string;
  categoryFilter: string | null;
  links: {
    getPage: string;
  };
}

export interface ConfigResponse {
  menu: {
    lobby: {
      items: MenuItem[];
    };
  };
}

export interface Category {
  id: string;
  name: string;
  getPage: string;
}

export interface Game {
  id: string;
  gameText: string;
  provider: string;
  image: {
    original: {
      src: string;
    };
  };
}

export interface GamesResponse {
  components: GameComponent[];
}

export interface GameComponent {
  id: string;
  type: string;
  games: Game[];
}

export interface ImageData {
  url: string;
  width: number;
  height: number;
}

export interface FetchGamesParams {
  search?: string;
  category?: string | null;
  pageNumber?: number;
  pageSize?: number;
}

export interface GameState {
  games: Game[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  totalGames: number;
}