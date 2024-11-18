import React, { useState, useCallback } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { MediaCard } from '../components/MediaCard';
import { MediaModal } from '../components/MediaModal';
import type { Movie, TVShow } from '../types/tmdb';
import { useDebounce } from '../hooks/useDebounce';

export function SearchPage() {
  const [searchInput, setSearchInput] = useState('');
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const [selectedMedia, setSelectedMedia] = useState<Movie | TVShow | null>(null);
  
  const debouncedQuery = useDebounce(searchInput, 300);

  const { data, isLoading } = useQuery({
    queryKey: ['search', mediaType, debouncedQuery],
    queryFn: () => api.search(debouncedQuery, mediaType),
    enabled: debouncedQuery.length >= 3,
  });

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-white dark:bg-dark-card p-6 shadow-lg">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <MagnifyingGlass size={20} weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for movies or TV shows..."
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-lighter py-2 pl-10 pr-4 text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
              />
            </div>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as 'movie' | 'tv')}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-lighter px-4 py-2 text-gray-900 dark:text-gray-100 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="movie">Movies</option>
              <option value="tv">TV Shows</option>
            </select>
          </div>
        </form>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}

      {data?.results && data.results.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data.results.map((item: Movie | TVShow) => (
            <MediaCard
              key={item.id}
              title={mediaType === 'movie' ? (item as Movie).title : (item as TVShow).name}
              posterPath={item.poster_path}
              releaseDate={
                mediaType === 'movie'
                  ? (item as Movie).release_date
                  : (item as TVShow).first_air_date
              }
              rating={item.vote_average}
              onClick={() => setSelectedMedia(item)}
            />
          ))}
        </div>
      )}

      {selectedMedia && (
        <MediaModal
          isOpen={!!selectedMedia}
          onClose={() => setSelectedMedia(null)}
          media={selectedMedia}
          type={mediaType}
        />
      )}

      {data?.results?.length === 0 && debouncedQuery.length >= 3 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">No results found</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}