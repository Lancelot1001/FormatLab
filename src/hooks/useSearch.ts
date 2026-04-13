import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';
import { tools } from '@/data/tools';
import { useAppStore } from '@/store/useAppStore';
import type { Tool } from '@/types';

const fuseOptions = {
  keys: ['name', 'nameZh', 'description', 'descriptionZh', 'tags', 'tagsZh'],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 1,
};

export function useSearch() {
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { searchQuery, selectedCategory } = useAppStore();
  const fuse = useMemo(() => new Fuse(tools, fuseOptions), []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSearch = useCallback((query: string) => {
    // Clear previous timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // Set new timer
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
  }, []);

  const results = useMemo(() => {
    let filtered: Tool[];

    if (!debouncedQuery.trim()) {
      filtered = tools;
    } else {
      const searchResults = fuse.search(debouncedQuery);
      filtered = searchResults.map((result) => result.item);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }

    return filtered;
  }, [debouncedQuery, selectedCategory, fuse]);

  return {
    query: searchQuery,
    setQuery: useAppStore((state) => state.setSearchQuery),
    handleSearch,
    results,
    isSearching: debouncedQuery !== searchQuery,
  };
}
