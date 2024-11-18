import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Star, Plus } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { CollectionsModal } from './CollectionsModal';
import { useCollections } from '../hooks/useCollections';
import { useReviews } from '../hooks/useReviews';
import toast from 'react-hot-toast';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: any;
  type: 'movie' | 'tv';
}

export function MediaModal({ isOpen, onClose, media, type }: MediaModalProps) {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isCollectionsModalOpen, setIsCollectionsModalOpen] = useState(false);
  const { addReview } = useReviews();
  const { collections } = useCollections();

  const handleSubmitReview = async () => {
    try {
      await addReview({
        mediaId: media.id,
        mediaType: type,
        rating,
        review,
        watchedDate: new Date().toISOString(),
      });
      toast.success('Review added successfully!');
      setReview('');
      setRating(0);
    } catch (error) {
      toast.error('Failed to add review');
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl rounded-xl bg-white dark:bg-dark-card p-6 shadow-xl">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <Dialog.Title className="text-2xl font-bold">
                  {type === 'movie' ? media.title : media.name}
                </Dialog.Title>
                <p className="text-gray-600 dark:text-gray-300">{media.overview}</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={24}
                          weight={star <= rating ? 'fill' : 'regular'}
                          className={`cursor-pointer ${
                            star <= rating
                              ? 'text-primary'
                              : 'text-gray-300'
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Review</label>
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-lighter p-2 focus:border-primary focus:ring-1 focus:ring-primary"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleSubmitReview}
                      className="btn btn-primary"
                      disabled={!rating || !review.trim()}
                    >
                      Submit Review
                    </button>
                    <button
                      onClick={() => setIsCollectionsModalOpen(true)}
                      className="btn btn-secondary flex items-center gap-2"
                    >
                      <Plus size={16} weight="bold" />
                      Add to Collection
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                  alt={type === 'movie' ? media.title : media.name}
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star size={20} weight="fill" className="text-primary" />
                    <span className="font-medium">{media.vote_average.toFixed(1)}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {format(
                      new Date(type === 'movie' ? media.release_date : media.first_air_date),
                      'MMM d, yyyy'
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <CollectionsModal
        isOpen={isCollectionsModalOpen}
        onClose={() => setIsCollectionsModalOpen(false)}
        media={media}
        type={type}
      />
    </>
  );
}