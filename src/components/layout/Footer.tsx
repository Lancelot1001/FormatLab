import { Github, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full py-8 mt-auto border-t border-border-subtle bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <span>{t('footer.copyright')}</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-red-500" fill="currentColor" />
            </span>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-glass glass hover:bg-white/10 transition-colors text-text-secondary hover:text-text-primary"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm font-medium">{t('footer.github')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
