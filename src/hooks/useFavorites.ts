import { useMemo } from 'react';
import { tools } from '@/data/tools';
import { useAppStore } from '@/store/useAppStore';

export function useFavorites() {
  const { favorites, toggleFavorite, isFavorite, addFavorite, removeFavorite } = useAppStore();

  const favoriteTools = useMemo(() => {
    return tools.filter((tool) => favorites.includes(tool.id));
  }, [favorites]);

  return {
    favorites,
    favoriteTools,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
  };
}
