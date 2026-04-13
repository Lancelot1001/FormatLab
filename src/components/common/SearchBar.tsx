import { useState, useCallback, useRef, useEffect, type KeyboardEvent } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/utils/search';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  className,
  placeholder,
}: SearchBarProps) {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch(value);
      } else if (e.key === 'Escape') {
        onChange('');
        inputRef.current?.blur();
      }
    },
    [value, onSearch, onChange]
  );

  const handleClear = useCallback(() => {
    onChange('');
    inputRef.current?.focus();
  }, [onChange]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <motion.div
      className={cn(
        'relative flex items-center w-full max-w-2xl',
        'bg-bg-glass backdrop-blur-glass rounded-glass',
        'border border-border-subtle',
        'transition-all duration-300',
        isFocused && 'border-border-glow shadow-lg shadow-accent-primary/20',
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Search
        className={cn(
          'absolute left-4 w-5 h-5 text-text-muted',
          'transition-colors duration-200',
          isFocused && 'text-accent-primary'
        )}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          onSearch(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || t('search.placeholder')}
        className={cn(
          'w-full py-3 pl-12 pr-12',
          'bg-transparent text-text-primary text-base',
          'placeholder:text-text-muted',
          'outline-none',
          'font-sans'
        )}
        aria-label={t('header.searchPlaceholder')}
      />
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={handleClear}
            className={cn(
              'absolute right-4 p-1',
              'text-text-muted hover:text-text-primary',
              'transition-colors duration-200'
            )}
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <div className="absolute right-4 text-text-muted text-xs hidden sm:block">
        <kbd className="px-1.5 py-0.5 bg-bg-secondary rounded text-[10px]">ESC</kbd>
      </div>
    </motion.div>
  );
}
