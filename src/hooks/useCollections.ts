import { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Collection {
  id: string;
  name: string;
  description: string;
  items: Array<{
    id: number;
    type: 'movie' | 'tv';
    title: string;
    posterPath: string;
  }>;
}

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const q = query(collection(db, 'collections'));
      const querySnapshot = await getDocs(q);
      const fetchedCollections = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Collection[];

      if (!fetchedCollections.some(c => c.name === 'Watch List')) {
        await createCollection({
          name: 'Watch List',
          description: 'Movies and TV shows to watch later',
        });
      }

      setCollections(fetchedCollections);
    };

    fetchCollections();
  }, []);

  const createCollection = async (data: { name: string; description: string }) => {
    const docRef = await addDoc(collection(db, 'collections'), {
      ...data,
      items: [],
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  };

  const addToCollection = async (collectionId: string, item: any) => {
    const collectionRef = doc(db, 'collections', collectionId);
    const collection = collections.find(c => c.id === collectionId);
    if (!collection) return;

    await updateDoc(collectionRef, {
      items: [...collection.items, item],
    });

    setCollections(prev =>
      prev.map(c =>
        c.id === collectionId
          ? { ...c, items: [...c.items, item] }
          : c
      )
    );
  };

  return { collections, createCollection, addToCollection };
}