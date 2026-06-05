import { motion } from 'framer-motion';
import { Trophy, Clock, Users, Globe, ChevronRight, Zap, Target, TrendingUp } from 'lucide-react';
import Countdown from '../components/Countdown';
import { teams, allMatches } from '../data/worldcupData';
import type { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const features = [
  { icon: Clock, title: '本地时间转换', desc: '根据您的位置自动显示比赛当地时间' },
  { icon: Globe, title: '全球覆盖', desc: '48支球队，104场比赛，完整赛程' },
  { icon: Target, title: '智能预测', desc: '每场比赛的胜负预测，数据驱动' },
  { icon: Zap, title: '实时投票', desc: '为每场比赛投票，表达您的观点' },
  { icon: TrendingUp, title: '赛果追踪', desc: '实时更新比分和晋级情况' },
  { icon: Users, title: '球队档案', desc: '48支参赛球队的详细介绍' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const totalTeams = teams.length;
  const totalMatches = allMatches.length;
  const hostCountries = ['美国', '加拿大', '墨西哥'];

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
            <span className="gradient-text">WORLD CUP</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-2 text-white"
          >
            2026
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-400 mb-2"
          >
            美国 · 加拿大 · 墨西哥
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm sm:text-base text-gray-500 mb-10"
          >
            48支球队 · 104场比赛 · 首届48强世界杯
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <p className="text-sm text-[#00ff88] mb-4 font-medium tracking-widest uppercase">
              距离揭幕战还有
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
              查看赛程
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => onNavigate('voting')}
              className="glow-btn px-8 py-4 rounded-xl glass neon-border text-white font-bold text-lg flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              参与预测
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
          {[
            { label: '参赛球队', value: totalTeams, suffix: '支' },
            { label: '比赛场次', value: totalMatches, suffix: '场' },
            { label: '举办城市', value: 16, suffix: '个' },
            { label: '比赛天数', value: 39, suffix: '天' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              className="glass rounded-xl p-4 text-center card-hover"
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text font-display">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">网站功能</h2>
            <p className="text-gray-400">全方位世界杯体验，为您打造最佳观赛指南</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 card-hover cursor-pointer"
                onClick={() => {
                  if (feature.title === '本地时间转换') onNavigate('schedule');
                  else if (feature.title === '智能预测' || feature.title === '实时投票') onNavigate('voting');
                  else if (feature.title === '球队档案') onNavigate('teams');
                  else if (feature.title === '赛果追踪') onNavigate('results');
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#00ff88]" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">主办国家</h2>
            <p className="text-gray-400">历史上首次由三个国家联合举办的世界杯</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hostCountries.map((country, i) => (
              <motion.div
                key={country}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-8 text-center card-hover"
              >
                <div className="text-5xl mb-4">
                  {country === '美国' ? '🇺🇸' : country === '加拿大' ? '🇨🇦' : '🇲🇽'}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white font-display">{country}</h3>
                <p className="text-sm text-gray-400">
                  {country === '美国'
                    ? '11个举办城市，60场比赛（含1/4决赛、半决赛和决赛）'
                    : country === '加拿大'
                    ? '2个举办城市，10场比赛'
                    : '3个举办城市，10场比赛（含开幕式和揭幕战）'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
