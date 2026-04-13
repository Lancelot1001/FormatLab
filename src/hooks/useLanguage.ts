import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language as 'zh' | 'en';

  const toggleLanguage = useCallback(() => {
    const newLang = currentLanguage === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  }, [currentLanguage, i18n]);

  const setLanguage = useCallback(
    (lang: 'zh' | 'en') => {
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  return {
    currentLanguage,
    toggleLanguage,
    setLanguage,
    t,
  };
}
