import { useFavorites } from '@/hooks/useFavorites';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn } from '@/utils/search';
import { useTranslation } from 'react-i18next';

interface FavoriteButtonProps {
  toolId: string;
  className?: string;
}

export default function FavoriteButton({ toolId, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useTranslation();
  const favorited = isFavorite(toolId);

  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(toolId);
      }}
      className={cn(
        'p-2 rounded-full transition-colors duration-200',
        favorited
          ? 'text-red-500 hover:text-red-400'
          : 'text-text-muted hover:text-red-500',
        className
      )}
      whileTap={{ scale: 0.8 }}
      animate={favorited ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.2 }}
      aria-label={favorited ? t('favorite.remove') : t('favorite.add')}
    >
      <Heart
        className="w-5 h-5"
        fill={favorited ? 'currentColor' : 'none'}
      />
    </motion.button>
  );
}
