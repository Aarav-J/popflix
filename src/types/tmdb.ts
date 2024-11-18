export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface DiaryEntry {
  id: string;
  mediaId: number;
  mediaType: 'movie' | 'tv';
  rating: number;
  review: string;
  watchedDate: string;
  createdAt: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  items: Array<{
    id: number;
    type: 'movie' | 'tv';
  }>;
  createdAt: string;
}