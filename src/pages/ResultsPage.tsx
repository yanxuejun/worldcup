import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Calendar, MapPin, ChevronRight, Star, TrendingUp } from 'lucide-react';
import { teams, allMatches, getTeamById } from '../data/worldcupData';
import { useLocalTime } from '../hooks/useLocalTime';

// Simulated results data
const matchResults: Record<string, { homeScore: number; awayScore: number }> = {
  'm1': { homeScore: 2, awayScore: 0 },
  'm2': { homeScore: 1, awayScore: 1 },
  'm3': { homeScore: 3, awayScore: 1 },
  'm4': { homeScore: 0, awayScore: 2 },
  'm5': { homeScore: 2, awayScore: 2 },
};

// Group standings simulation
function getGroupStandings(group: string) {
  const groupTeams = teams.filter(t => t.group === group);
  return groupTeams.map((team, i) => ({
    team,
    played: [2, 2, 1, 1][i] || 0,
    won: [2, 0, 1, 0][i] || 0,
    drawn: [0, 2, 0, 0][i] || 0,
    lost: [0, 0, 0, 1][i] || 0,
    gf: [5, 2, 2, 0][i] || 0,
    ga: [1, 2, 1, 3][i] || 0,
    points: [6, 2, 3, 0][i] || 0,
  })).sort((a, b) => b.points - a.points || (b.gf - b.ga) - (a.gf - a.ga));
}

export default function ResultsPage() {
  const { formatMatchTime } = useLocalTime();
  const [activeTab, setActiveTab] = useState<'matches' | 'standings' | 'stats'>('matches');

  const finishedMatches = allMatches.filter(m => matchResults[m.id]).sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}:00-04:00`).getTime();
    const dateB = new Date(`${b.date}T${b.time}:00-04:00`).getTime();
    return dateB - dateA;
  });

  const upcomingMatches = allMatches.filter(m => !matchResults[m.id] && m.status === 'upcoming')
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}:00-04:00`).getTime();
      const dateB = new Date(`${b.date}T${b.time}:00-04:00`).getTime();
      return dateA - dateB;
    })
    .slice(0, 5);

  const tabs = [
    { key: 'matches' as const, label: '赛果', icon: Trophy },
    { key: 'standings' as const, label: '积分榜', icon: TrendingUp },
    { key: 'stats' as const, label: '数据统计', icon: Star },
  ];

  return (
    <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2 font-display">比赛结果</h1>
          <p className="text-gray-400">实时追踪比赛结果、积分榜和赛事数据</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6"
        >
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            {/* Upcoming */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#FFD700]" />
                即将开始
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {upcomingMatches.map((match, i) => {
                  const homeTeam = getTeamById(match.homeTeam);
                  const awayTeam = getTeamById(match.awayTeam);
                  const localInfo = formatMatchTime(match.date, match.time, match.timezone);
                  return (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass rounded-xl p-4 flex items-center gap-4"
                    >
                      <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-sm font-bold text-[#FFD700]">{localInfo.localTime}</span>
                        <span className="text-xs text-gray-500">{localInfo.localDate.slice(5)}</span>
                      </div>
                      <div className="flex-1 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 flex-1 justify-end">
                          <span className="text-sm font-medium text-white hidden sm:inline">{homeTeam?.name}</span>
                          <span className="text-xl">{homeTeam?.flag}</span>
                        </div>
                        <div className="px-3 py-1 rounded bg-white/5 text-sm font-bold text-gray-500 font-display">
                          VS
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-xl">{awayTeam?.flag}</span>
                          <span className="text-sm font-medium text-white hidden sm:inline">{awayTeam?.name}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {match.group ? `${match.group}组` : ''}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Finished */}
            {finishedMatches.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#00ff88]" />
                  已结束
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {finishedMatches.map((match, i) => {
                    const homeTeam = getTeamById(match.homeTeam);
                    const awayTeam = getTeamById(match.awayTeam);
                    const result = matchResults[match.id];
                    const homeWon = result && result.homeScore > result.awayScore;
                    const awayWon = result && result.awayScore > result.homeScore;
                    return (
                      <motion.div
                        key={match.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass rounded-xl p-4"
                      >
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{match.date}</span>
                          <MapPin className="w-3.5 h-3.5 ml-2" />
                          <span>{match.stadium}, {match.city}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 flex items-center justify-end gap-3">
                            <span className={`text-sm font-medium ${homeWon ? 'text-[#00ff88]' : 'text-white'}`}>
                              {homeTeam?.name}
                            </span>
                            <span className="text-2xl">{homeTeam?.flag}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl font-bold font-display ${homeWon ? 'text-[#00ff88]' : 'text-white'}`}>
                              {result?.homeScore}
                            </span>
                            <span className="text-gray-600">-</span>
                            <span className={`text-2xl font-bold font-display ${awayWon ? 'text-[#FFD700]' : 'text-white'}`}>
                              {result?.awayScore}
                            </span>
                          </div>
                          <div className="flex-1 flex items-center gap-3">
                            <span className="text-2xl">{awayTeam?.flag}</span>
                            <span className={`text-sm font-medium ${awayWon ? 'text-[#FFD700]' : 'text-white'}`}>
                              {awayTeam?.name}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {activeTab === 'standings' && (
          <div className="space-y-6">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((group, gi) => {
              const standings = getGroupStandings(group);
              return (
                <motion.div
                  key={group}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: gi * 0.05 }}
                  className="glass rounded-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-white font-display">{group}组 积分榜</h3>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-xs text-gray-500 border-b border-white/5">
                          <th className="text-left px-4 py-2">排名</th>
                          <th className="text-left px-4 py-2">球队</th>
                          <th className="text-center px-2 py-2">赛</th>
                          <th className="text-center px-2 py-2">胜</th>
                          <th className="text-center px-2 py-2">平</th>
                          <th className="text-center px-2 py-2">负</th>
                          <th className="text-center px-2 py-2">进</th>
                          <th className="text-center px-2 py-2">失</th>
                          <th className="text-center px-2 py-2">净</th>
                          <th className="text-center px-4 py-2 font-bold">分</th>
                        </tr>
                      </thead>
                      <tbody>
                        {standings.map((s, i) => (
                          <tr
                            key={s.team.id}
                            className={`border-b border-white/5 ${i < 2 ? 'bg-[#00ff88]/5' : i < 3 ? 'bg-[#FFD700]/5' : ''}`}
                          >
                            <td className="px-4 py-3">
                              <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-bold ${
                                i < 2 ? 'bg-[#00ff88]/20 text-[#00ff88]' :
                                i < 3 ? 'bg-[#FFD700]/20 text-[#FFD700]' :
                                'bg-white/5 text-gray-500'
                              }`}>
                                {i + 1}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{s.team.flag}</span>
                                <span className="font-medium text-white">{s.team.name}</span>
                              </div>
                            </td>
                            <td className="text-center px-2 py-3 text-gray-400">{s.played}</td>
                            <td className="text-center px-2 py-3 text-gray-400">{s.won}</td>
                            <td className="text-center px-2 py-3 text-gray-400">{s.drawn}</td>
                            <td className="text-center px-2 py-3 text-gray-400">{s.lost}</td>
                            <td className="text-center px-2 py-3 text-[#00ff88]">{s.gf}</td>
                            <td className="text-center px-2 py-3 text-red-400">{s.ga}</td>
                            <td className="text-center px-2 py-3 text-gray-400">{s.gf - s.ga > 0 ? '+' : ''}{s.gf - s.ga}</td>
                            <td className="text-center px-4 py-3">
                              <span className="text-base font-bold gradient-text">{s.points}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-4 py-2 text-xs text-gray-500 flex gap-4">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#00ff88]/50" />直接晋级</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#FFD700]/50" />可能晋级</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === 'stats' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Champions Predictions */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Medal className="w-5 h-5 text-[#FFD700]" />
                冠军热门预测
              </h2>
              <div className="space-y-4">
                {[
                  { team: teams.find(t => t.id === 'arg'), prob: 18 },
                  { team: teams.find(t => t.id === 'fra'), prob: 15 },
                  { team: teams.find(t => t.id === 'bra'), prob: 14 },
                  { team: teams.find(t => t.id === 'esp'), prob: 12 },
                  { team: teams.find(t => t.id === 'eng'), prob: 10 },
                  { team: teams.find(t => t.id === 'ger'), prob: 9 },
                ].filter(x => x.team).map((item, i) => (
                  <div key={item.team!.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.team!.flag}</span>
                        <span className="text-sm font-medium text-white">{item.team!.name}</span>
                      </div>
                      <span className="text-sm font-bold gradient-text">{item.prob}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.prob * 3}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#00ff88] to-[#FFD700]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: '总进球', value: '12', icon: '⚽' },
                { label: '场均进球', value: '2.4', icon: '📊' },
                { label: '红牌', value: '1', icon: '🔴' },
                { label: '黄牌', value: '18', icon: '🟨' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-bold text-white font-display">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
