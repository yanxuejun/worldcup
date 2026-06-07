import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Users, Vote, BarChart3, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '../i18n';
import type { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  const navItems: { page: Page; label: string; icon: typeof Trophy }[] = [
    { page: 'home', label: t('nav.home'), icon: Trophy },
    { page: 'schedule', label: t('nav.schedule'), icon: Calendar },
    { page: 'teams', label: t('nav.teams'), icon: Users },
    { page: 'voting', label: t('nav.voting'), icon: Vote },
    { page: 'results', label: t('nav.results'), icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trophy className="w-7 h-7 text-[#FFD700]" />
            <span className="text-xl font-bold gradient-text font-display tracking-wider">
              WORLD CUP 2026
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ page, label, icon: Icon }) => (
              <motion.button
                key={page}
                onClick={() => onNavigate(page)}
                className={`relative px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer ${
                  currentPage === page
                    ? 'text-[#00ff88]'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                {label}
                {currentPage === page && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg border border-[#00ff88]/30 bg-[#00ff88]/5"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Language toggle */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                lang === 'en' ? 'text-[#00ff88] bg-[#00ff88]/10' : 'text-gray-500 hover:text-white'
              }`}
            >
              {t('lang.en')}
            </button>
            <span className="text-gray-700 text-xs">/</span>
            <button
              onClick={() => setLang('zh')}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                lang === 'zh' ? 'text-[#00ff88] bg-[#00ff88]/10' : 'text-gray-500 hover:text-white'
              }`}
            >
              {t('lang.zh')}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white cursor-pointer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map(({ page, label, icon: Icon }) => (
                <button
                  key={page}
                  onClick={() => {
                    onNavigate(page);
                    setMobileOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors cursor-pointer ${
                    currentPage === page
                      ? 'text-[#00ff88] bg-[#00ff88]/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
              <div className="flex items-center gap-1 pt-2 border-t border-white/5 px-4">
                <button
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer ${
                    lang === 'en' ? 'text-[#00ff88] bg-[#00ff88]/10' : 'text-gray-500'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => { setLang('zh'); setMobileOpen(false); }}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer ${
                    lang === 'zh' ? 'text-[#00ff88] bg-[#00ff88]/10' : 'text-gray-500'
                  }`}
                >
                  中
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
