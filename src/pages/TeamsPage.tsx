import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, User, Search, Shield, ChevronRight, Award } from 'lucide-react';
import { teams, groups, getTeamsByGroup } from '../data/worldcupData';
import { useI18n } from '../i18n';
import type { Team } from '../types';

const continentEnMap: Record<string, string> = {
  '欧洲': 'Europe',
  '南美洲': 'South America',
  '亚洲': 'Asia',
  '非洲': 'Africa',
  '中北美': 'North America',
  '大洋洲': 'Oceania',
};

function TeamDetailCard({ team, onClose, lang, t }: { team: Team; onClose: () => void; lang: string; t: (key: string) => string }) {
  const displayName = lang === 'en' ? team.nameEn : team.name;
  const continent = lang === 'en' ? (continentEnMap[team.continent] || team.continent) : team.continent;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="glass-strong rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{team.flag}</span>
          <div>
            <h2 className="text-2xl font-bold text-white font-display">{displayName}</h2>
            <p className="text-sm text-gray-400">{lang === 'en' ? team.name : team.nameEn}</p>
          </div>
          <div className="ml-auto">
            <span className="text-3xl font-bold gradient-text font-display">#{team.fifaRank}</span>
            <p className="text-xs text-gray-500">{t('teams.fifaRank')}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="glass rounded-xl p-3 text-center">
            <Trophy className="w-5 h-5 mx-auto mb-1 text-[#FFD700]" />
            <p className="text-lg font-bold text-white">{team.titles}</p>
            <p className="text-xs text-gray-500">{t('teams.worldCupTitles')}</p>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <Award className="w-5 h-5 mx-auto mb-1 text-[#00ff88]" />
            <p className="text-lg font-bold text-white">{team.group}</p>
            <p className="text-xs text-gray-500">{t('teams.group')}</p>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <Shield className="w-5 h-5 mx-auto mb-1 text-blue-400" />
            <p className="text-lg font-bold text-white">{continent}</p>
            <p className="text-xs text-gray-500">{lang === 'zh' ? '大洲' : 'Continent'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#00ff88] mb-2 flex items-center gap-2">
              <Star className="w-4 h-4" />
              {t('teams.bestResult')}
            </h3>
            <p className="text-sm text-gray-300">{team.bestResult}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#00ff88] mb-2">{lang === 'zh' ? '球队简介' : 'About'}</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{team.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#00ff88] mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              {t('teams.coach')}
            </h3>
            <p className="text-sm text-gray-300">{team.coach}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#00ff88] mb-2 flex items-center gap-2">
              <Star className="w-4 h-4" />
              {t('teams.starPlayers')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {team.starPlayers.map(player => (
                <span key={player} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300">
                  {player}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors cursor-pointer"
        >
          {lang === 'zh' ? '关闭' : 'Close'}
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function TeamsPage() {
  const { t, lang } = useI18n();
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const filteredTeams = teams.filter(t => {
    const matchesGroup = selectedGroup === 'ALL' || t.group === selectedGroup;
    const matchesSearch = t.name.includes(searchQuery) || t.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const continentColors: Record<string, string> = {
    '欧洲': 'bg-blue-500/20 text-blue-400',
    '南美洲': 'bg-green-500/20 text-green-400',
    '亚洲': 'bg-red-500/20 text-red-400',
    '非洲': 'bg-yellow-500/20 text-yellow-400',
    '中北美': 'bg-purple-500/20 text-purple-400',
    '大洋洲': 'bg-cyan-500/20 text-cyan-400',
  };

  function getGroupLabel(g: string) {
    return lang === 'zh' ? `${g}组` : `Group ${g}`;
  }

  function getContinentLabel(c: string) {
    return lang === 'en' ? (continentEnMap[c] || c) : c;
  }

  return (
    <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2 font-display">{t('teams.title')}</h1>
          <p className="text-gray-400">
            {lang === 'zh' ? '48支世界杯参赛球队，点击查看详细介绍' : '48 World Cup teams — click to view details'}
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-4 mb-6 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder={t('teams.searchPlaceholder')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00ff88]/30 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGroup('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedGroup === 'ALL' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {lang === 'zh' ? '全部' : 'All'}
            </button>
            {groups.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGroup(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedGroup === g ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {getGroupLabel(g)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Teams Grid */}
        {selectedGroup === 'ALL' && !searchQuery ? (
          groups.map(group => {
            const groupTeams = getTeamsByGroup(group);
            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ff88]/20 to-[#FFD700]/20 flex items-center justify-center">
                    <span className="text-lg font-bold gradient-text">{group}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white font-display">{getGroupLabel(group)}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {groupTeams.map((team, i) => (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedTeam(team)}
                      className="glass rounded-xl p-4 cursor-pointer card-hover"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{team.flag}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white truncate">{lang === 'en' ? team.nameEn : team.name}</h3>
                          <p className="text-xs text-gray-500">{lang === 'en' ? team.name : team.nameEn}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${continentColors[team.continent] || 'bg-white/5 text-gray-400'}`}>
                          {getContinentLabel(team.continent)}
                        </span>
                        <span className="text-xs text-gray-500">#{team.fifaRank}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTeams.map((team, i) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedTeam(team)}
                className="glass rounded-xl p-4 cursor-pointer card-hover"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{team.flag}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate">{lang === 'en' ? team.nameEn : team.name}</h3>
                    <p className="text-xs text-gray-500">{lang === 'en' ? team.name : team.nameEn}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${continentColors[team.continent] || 'bg-white/5 text-gray-400'}`}>
                    {getContinentLabel(team.continent)}
                  </span>
                  <span className="text-xs text-gray-500">#{team.fifaRank}</span>
                  <span className="text-xs text-[#FFD700]/70">{getGroupLabel(team.group)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedTeam && (
            <TeamDetailCard team={selectedTeam} onClose={() => setSelectedTeam(null)} lang={lang} t={t} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
