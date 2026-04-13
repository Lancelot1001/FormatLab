import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ToolCategory } from '@/types';

interface AppState {
  favorites: string[];
  selectedCategory: ToolCategory | 'all';
  searchQuery: string;
  addFavorite: (toolId: string) => void;
  removeFavorite: (toolId: string) => void;
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  setSelectedCategory: (category: ToolCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      selectedCategory: 'all',
      searchQuery: '',

      addFavorite: (toolId: string) => {
        set((state) => ({
          favorites: [...state.favorites, toolId],
        }));
      },

      removeFavorite: (toolId: string) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== toolId),
        }));
      },

      toggleFavorite: (toolId: string) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(toolId)) {
          removeFavorite(toolId);
        } else {
          addFavorite(toolId);
        }
      },

      isFavorite: (toolId: string) => {
        return get().favorites.includes(toolId);
      },

      setSelectedCategory: (category: ToolCategory | 'all') => {
        set({ selectedCategory: category });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },
    }),
    {
      name: 'convhub-storage',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
