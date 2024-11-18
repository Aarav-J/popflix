import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Plus } from '@phosphor-icons/react';
import { useCollections } from '../hooks/useCollections';
import toast from 'react-hot-toast';

interface CollectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: any;
  type: 'movie' | 'tv';
}

export function CollectionsModal({ isOpen, onClose, media, type }: CollectionsModalProps) {
  const [newCollectionName, setNewCollectionName] = useState('');
  const { collections, addToCollection, createCollection } = useCollections();

  const handleAddToCollection = async (collectionId: string) => {
    try {
      await addToCollection(collectionId, {
        id: media.id,
        type,
        title: type === 'movie' ? media.title : media.name,
        posterPath: media.poster_path,
      });
      toast.success('Added to collection!');
      onClose();
    } catch (error) {
      toast.error('Failed to add to collection');
    }
  };

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) return;
    try {
      const collectionId = await createCollection({
        name: newCollectionName,
        description: '',
      });
      await handleAddToCollection(collectionId);
      setNewCollectionName('');
    } catch (error) {
      toast.error('Failed to create collection');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-md rounded-xl bg-white dark:bg-dark-card p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold mb-4">Add to Collection</Dialog.Title>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="New collection name..."
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-lighter p-2"
              />
              <button
                onClick={handleCreateCollection}
                className="btn btn-primary"
                disabled={!newCollectionName.trim()}
              >
                <Plus size={16} weight="bold" />
              </button>
            </div>

            <div className="space-y-2">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => handleAddToCollection(collection.id)}
                  className="w-full rounded-lg bg-gray-100 dark:bg-dark-lighter p-3 text-left hover:bg-gray-200 dark:hover:bg-dark-card transition-colors"
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}