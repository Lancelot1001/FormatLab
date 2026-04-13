import { useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { categories } from '@/data/tools';
import type { ToolCategory } from '@/types';

export function useCategory() {
  const { selectedCategory, setSelectedCategory } = useAppStore();

  const handleCategoryChange = useCallback(
    (category: ToolCategory | 'all') => {
      setSelectedCategory(category);
    },
    [setSelectedCategory]
  );

  return {
    categories,
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
  };
}
