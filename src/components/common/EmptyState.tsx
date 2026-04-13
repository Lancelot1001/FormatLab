import { useTranslation } from 'react-i18next';
import { SearchX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmptyState() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SearchX className="w-16 h-16 text-text-muted mb-4" />
      <h3 className="text-xl font-semibold text-text-primary mb-2">{t('empty.title')}</h3>
      <p className="text-text-secondary text-center max-w-md">{t('empty.description')}</p>
    </motion.div>
  );
}
