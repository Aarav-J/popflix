import React from 'react';
import { Star, Calendar, Clock } from '@phosphor-icons/react';
import { format } from 'date-fns';
import type { DiaryEntry as DiaryEntryType } from '../types/tmdb';

interface DiaryEntryProps {
  entry: DiaryEntryType;
  mediaTitle: string;
  posterPath: string;
}

export function DiaryEntry({ entry, mediaTitle, posterPath }: DiaryEntryProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="flex gap-6">
        <div className="w-32 flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w200${posterPath}`}
            alt={mediaTitle}
            className="rounded-lg"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{mediaTitle}</h3>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  weight={i < entry.rating ? 'fill' : 'regular'}
                  className={i < entry.rating ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
          </div>
          <div className="mt-2 flex gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={16} weight="bold" />
              {format(new Date(entry.watchedDate), 'MMM d, yyyy')}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} weight="bold" />
              {format(new Date(entry.createdAt), 'h:mm a')}
            </div>
          </div>
          <p className="mt-4 text-gray-700">{entry.review}</p>
        </div>
      </div>
    </div>
  );
}