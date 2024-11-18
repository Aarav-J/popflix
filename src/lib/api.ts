const TMDB_API_KEY = '01bb0eb6d5a726a009339bb272576a51';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const api = {
  async getTrending() {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch trending');
    return response.json();
  },

  async search(query: string, type: 'movie' | 'tv' = 'movie') {
    if (!query) return { results: [] };
    
    const response = await fetch(
      `${TMDB_BASE_URL}/search/${type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}&include_adult=false`
    );
    if (!response.ok) throw new Error('Failed to search');
    return response.json();
  },

  async getDetails(id: number, type: 'movie' | 'tv') {
    const response = await fetch(
      `${TMDB_BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch details');
    return response.json();
  },
};