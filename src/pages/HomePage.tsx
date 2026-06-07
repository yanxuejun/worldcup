import { motion } from 'framer-motion';
import { Trophy, Clock, Users, Globe, ChevronRight, Zap, Target, TrendingUp } from 'lucide-react';
import Countdown from '../components/Countdown';
import { teams, allMatches } from '../data/worldcupData';
import { useI18n } from '../i18n';
import type { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t, lang } = useI18n();
  const totalTeams = teams.length;
  const totalMatches = allMatches.length;

  const hostCountries = lang === 'zh'
    ? [
        { name: '美国', flag: '🇺🇸', desc: '11个举办城市，60场比赛（含1/4决赛、半决赛和决赛）' },
        { name: '加拿大', flag: '🇨🇦', desc: '2个举办城市，10场比赛' },
        { name: '墨西哥', flag: '🇲🇽', desc: '3个举办城市，10场比赛（含开幕式和揭幕战）' },
      ]
    : [
        { name: 'United States', flag: '🇺🇸', desc: '11 host cities, 60 matches (including quarter-finals, semi-finals and final)' },
        { name: 'Canada', flag: '🇨🇦', desc: '2 host cities, 10 matches' },
        { name: 'Mexico', flag: '🇲🇽', desc: '3 host cities, 10 matches (including opening ceremony and first match)' },
      ];

  const features = [
    { icon: Clock, titleKey: 'home.feature1Title', descKey: 'home.feature1Desc', page: 'schedule' as Page },
    { icon: Globe, titleKey: 'home.feature2Title', descKey: 'home.feature2Desc', page: 'schedule' as Page },
    { icon: Target, titleKey: 'home.feature3Title', descKey: 'home.feature3Desc', page: 'voting' as Page },
    { icon: Zap, titleKey: 'home.feature4Title', descKey: 'home.feature4Desc', page: 'voting' as Page },
    { icon: TrendingUp, titleKey: 'home.feature5Title', descKey: 'home.feature5Desc', page: 'results' as Page },
    { icon: Users, titleKey: 'home.feature6Title', descKey: 'home.feature6Desc', page: 'teams' as Page },
  ];

  const stats = [
    { labelKey: 'home.statsTeams', value: totalTeams, suffix: '' },
    { labelKey: 'home.statsMatches', value: totalMatches, suffix: '' },
    { labelKey: 'home.statsCities', value: 16, suffix: '' },
    { labelKey: 'home.statsDays', value: 39, suffix: '' },
  ];

  return (
    <div className="relative z-10">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Trophy className="w-12 h-12 text-[#FFD700]" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold font-display mb-4 tracking-tight"
          >
            <span className="gradient-text">{t('home.heroTitle')}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-2 text-white"
          >
            {t('home.heroYear')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-400 mb-2"
          >
            {t('home.hostCountries')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm sm:text-base text-gray-500 mb-10"
          >
            {t('home.subtitle')}
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <p className="text-sm text-[#00ff88] mb-4 font-medium tracking-widest uppercase">
              {t('home.countdownLabel')}
            </p>
            <Countdown />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => onNavigate('schedule')}
              className="glow-btn px-8 py-4 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black font-bold text-lg flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('home.ctaSchedule')}
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => onNavigate('voting')}
              className="glow-btn px-8 py-4 rounded-xl glass neon-border text-white font-bold text-lg flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('home.ctaPredict')}
              <Target className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl w-full px-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              className="glass rounded-xl p-4 text-center card-hover"
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text font-display">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">{t(stat.labelKey)}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">{t('home.featuresTitle')}</h2>
            <p className="text-gray-400">
              {lang === 'zh' ? '全方位世界杯体验，为您打造最佳观赛指南' : 'A comprehensive World Cup experience — your ultimate matchday guide'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 card-hover cursor-pointer"
                onClick={() => onNavigate(feature.page)}
              >
                <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#00ff88]" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{t(feature.titleKey)}</h3>
                <p className="text-sm text-gray-400">{t(feature.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Host Cities */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">{t('home.hostSectionTitle')}</h2>
            <p className="text-gray-400">
              {t('home.hostSectionDesc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hostCountries.map((country, i) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-8 text-center card-hover"
              >
                <div className="text-5xl mb-4">{country.flag}</div>
                <h3 className="text-2xl font-bold mb-2 text-white font-display">{country.name}</h3>
                <p className="text-sm text-gray-400">{country.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
