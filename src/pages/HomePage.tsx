import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/common/SearchBar';
import CategoryNav from '@/components/features/CategoryNav';
import ToolGrid from '@/components/features/ToolGrid';
import { useSearch } from '@/hooks/useSearch';
import { useAppStore } from '@/store/useAppStore';
import { useLanguage } from '@/hooks/useLanguage';

export default function HomePage() {
  const { setQuery, handleSearch, results } = useSearch();
  const { searchQuery } = useAppStore();
  const { currentLanguage } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/10 rounded-full blur-[120px]" />

          <div className="relative max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
                {currentLanguage === 'zh'
                  ? '聚合热门格式工具，快速找到并访问目标网站'
                  : 'Aggregate popular format tools, find and visit target websites quickly'}
              </p>
            </motion.div>

            {/* Hero Search */}
            <motion.div
              className="flex justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SearchBar
                value={searchQuery}
                onChange={setQuery}
                onSearch={handleSearch}
                className="w-full max-w-3xl"
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex justify-center gap-8 sm:gap-12 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">50+</div>
                <div className="text-sm text-text-muted">
                  {currentLanguage === 'zh' ? '格式工具' : 'Format Tools'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">6</div>
                <div className="text-sm text-text-muted">
                  {currentLanguage === 'zh' ? '分类' : 'Categories'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">2</div>
                <div className="text-sm text-text-muted">
                  {currentLanguage === 'zh' ? '语言' : 'Languages'}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Category Navigation */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CategoryNav />
            </motion.div>

            {/* Tool Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ToolGrid tools={results} />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
