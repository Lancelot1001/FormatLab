import { useLanguage } from '@/hooks/useLanguage';
import { ExternalLink, Star, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/common/GlassCard';
import FavoriteButton from './FavoriteButton';
import type { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
  index?: number;
}

export default function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const { currentLanguage } = useLanguage();
  const name = currentLanguage === 'zh' ? tool.nameZh : tool.name;
  const description = currentLanguage === 'zh' ? tool.descriptionZh : tool.description;
  const tags = currentLanguage === 'zh' ? tool.tagsZh : tool.tags;

  const handleClick = () => {
    window.open(tool.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <GlassCard
        className="p-4 cursor-pointer group"
        onClick={handleClick}
        hover
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-bg-secondary flex items-center justify-center">
            <img
              src={tool.favicon}
              alt={name}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                // Show fallback icon
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <Globe className="w-8 h-8 text-text-muted hidden items-center justify-center" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-text-primary truncate">{name}</h3>
              {tool.isPopular && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-accent-primary/20 text-accent-primary text-xs rounded-full">
                  <Star className="w-3 h-3" fill="currentColor" />
                  <span>Popular</span>
                </span>
              )}
            </div>
            <p className="text-sm text-text-secondary truncate">{description}</p>
          </div>
          <FavoriteButton toolId={tool.id} />
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-bg-secondary text-text-muted text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
          <span className="text-xs text-text-muted">{tool.url.replace('https://', '')}</span>
          <span className="flex items-center gap-1 text-accent-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            {currentLanguage === 'zh' ? '访问' : 'Visit'}
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>
      </GlassCard>
    </motion.div>
  );
}
