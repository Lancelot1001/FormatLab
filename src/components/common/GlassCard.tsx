import { forwardRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/search';

interface GlassCardProps {
  as?: 'div' | 'section' | 'article';
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ as: Component = 'div', children, className, hover = true, onClick, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn('glass rounded-glass cursor-pointer border border-border-subtle', className)}
        whileHover={hover ? { scale: 1.02 } : undefined}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
