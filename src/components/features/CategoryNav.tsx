import { useCategory } from '@/hooks/useCategory';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/utils/search';
import {
  Grid3X3,
  Image,
  FileText,
  Video,
  Music,
  Archive,
  Code,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, LucideIcon> = {
  Grid3X3,
  Image,
  FileText,
  Video,
  Music,
  Archive,
  Code,
};

export default function CategoryNav() {
  const { categories, selectedCategory, setSelectedCategory } = useCategory();
  const { currentLanguage } = useLanguage();

  return (
    <nav className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex gap-2 min-w-max px-1">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] || Grid3X3;
          const isActive = selectedCategory === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'relative flex items-center gap-2 px-4 py-2.5 rounded-full',
                'font-medium text-sm whitespace-nowrap',
                'transition-all duration-200',
                isActive
                  ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/30'
                  : 'glass text-text-secondary hover:text-text-primary hover:bg-white/10'
              )}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              <span>{currentLanguage === 'zh' ? category.nameZh : category.name}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
