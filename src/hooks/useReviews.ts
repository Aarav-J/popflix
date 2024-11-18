import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ReviewData {
  mediaId: number;
  mediaType: 'movie' | 'tv';
  rating: number;
  review: string;
  watchedDate: string;
}

export function useReviews() {
  const addReview = async (data: ReviewData) => {
    await addDoc(collection(db, 'reviews'), {
      ...data,
      createdAt: new Date().toISOString(),
    });
  };

  return { addReview };
}