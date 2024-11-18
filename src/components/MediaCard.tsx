import React from 'react';
import { Star, Calendar } from '@phosphor-icons/react';
import { format } from 'date-fns';

interface MediaCardProps {
  title: string;
  posterPath: string | null;
  releaseDate: string;
  rating: number;
  onClick: () => void;
}

export function MediaCard({ title, posterPath, releaseDate, rating, onClick }: MediaCardProps) {
  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg bg-white dark:bg-dark-card shadow-lg transition-transform hover:scale-105 cursor-pointer"
    >
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-lg font-bold line-clamp-2">{title}</h3>
          <div className="mt-2 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Calendar size={16} weight="bold" />
              {releaseDate ? format(new Date(releaseDate), 'MMM d, yyyy') : 'No date'}
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} weight="fill" className="text-primary" />
              {rating.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}