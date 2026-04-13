import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';

const languages = [
  { code: 'zh' as const, label: '中文', flag: 'CN' },
  { code: 'en' as const, label: 'English', flag: 'EN' },
];

export default function LanguageSwitch() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: 'zh' | 'en') => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2 px-3 py-2 rounded-glass glass hover:bg-white/10 transition-colors"
        whileTap={{ scale: 0.95 }}
        aria-label="Switch language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-4 h-4 text-text-secondary" />
        <span className="text-sm font-medium text-text-primary">
          {currentLanguage === 'zh' ? '中文' : 'EN'}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 py-2 rounded-xl glass border border-white/10 shadow-xl z-50"
            role="listbox"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                  currentLanguage === lang.code
                    ? 'text-accent-primary'
                    : 'text-text-primary hover:bg-white/5'
                }`}
                role="option"
                aria-selected={currentLanguage === lang.code}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 rounded border flex items-center justify-center text-xs font-medium ${
                      currentLanguage === lang.code
                        ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                        : 'border-white/20 text-text-secondary'
                    }`}
                  >
                    {lang.flag}
                  </span>
                  <span>{lang.label}</span>
                </div>
                {currentLanguage === lang.code && (
                  <Check className="w-4 h-4 text-accent-primary" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
