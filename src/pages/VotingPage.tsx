import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, TrendingUp, Users, CheckCircle2, Clock, Filter } from 'lucide-react';
import { allMatches, roundLabels, getTeamById, groups } from '../data/worldcupData';
import { useLocalTime } from '../hooks/useLocalTime';
import type { VoteRecord } from '../types';

export default function VotingPage() {
  const { formatMatchTime } = useLocalTime();
  const [votes, setVotes] = useState<Record<string, VoteRecord>>(() => {
    const saved = localStorage.getItem('worldcup-votes');
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedRound, setSelectedRound] = useState<string>('group');
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('worldcup-votes', JSON.stringify(votes));
  }, [votes]);

  const rounds = ['group', 'round32', 'round16', 'quarter', 'semi', 'final'];

  const filteredMatches = allMatches.filter(m => {
    const matchesRound = m.round === selectedRound;
    const matchesGroup = selectedGroup === 'ALL' || m.group === selectedGroup;
    return matchesRound && matchesGroup;
  }).sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}:00-04:00`).getTime();
    const dateB = new Date(`${b.date}T${b.time}:00-04:00`).getTime();
    return dateA - dateB;
  });

  function handleVote(matchId: string, choice: 'home' | 'draw' | 'away') {
    setVotes(prev => ({
      ...prev,
      [matchId]: { matchId, choice, timestamp: Date.now() }
    }));
    setShowSuccess(matchId);
    setTimeout(() => setShowSuccess(null), 2000);
  }

  function getVoteStats(matchId: string) {
    // In a real app, this would come from a backend
    // For demo, we generate consistent pseudo-random stats
    const seed = matchId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const total = 1000 + (seed % 5000);
    const homeW = 30 + (seed % 35);
    const draw = 15 + (seed % 20);
    const awayW = 100 - homeW - draw;
    return { total, homeW, draw, awayW };
  }

  return (
    <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2 font-display">预测投票</h1>
          <p className="text-gray-400">为每场比赛投票预测胜负，看看谁的直觉最准</p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-4 mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Vote className="w-5 h-5 text-[#00ff88]" />
                <div>
                  <p className="text-lg font-bold text-white">{Object.keys(votes).length}</p>
                  <p className="text-xs text-gray-500">您已投票</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FFD700]" />
                <div>
                  <p className="text-lg font-bold text-white">{allMatches.length}</p>
                  <p className="text-xs text-gray-500">总场次</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4 text-[#00ff88]" />
              <span>投票数据存储在本地浏览器中</span>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-xl p-4 mb-6"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-400">轮次:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {rounds.map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRound(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedRound === r ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {roundLabels[r]}
                </button>
              ))}
            </div>
          </div>
          {selectedRound === 'group' && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/5">
              <button
                onClick={() => setSelectedGroup('ALL')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedGroup === 'ALL' ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                全部小组
              </button>
              {groups.map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGroup(g)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedGroup === g ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {g}组
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Voting Cards */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredMatches.map((match, i) => {
              const homeTeam = getTeamById(match.homeTeam);
              const awayTeam = getTeamById(match.awayTeam);
              const localInfo = formatMatchTime(match.date, match.time, match.timezone);
              const vote = votes[match.id];
              const stats = getVoteStats(match.id);
              const isVoted = !!vote;

              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="glass rounded-xl p-4 sm:p-6"
                >
                  {/* Match Info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{localInfo.localDate} {localInfo.localTime}</span>
                      <span className="text-gray-600">|</span>
                      <span>{match.group ? `${match.group}组` : roundLabels[match.round]}</span>
                    </div>
                    {isVoted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-1 text-xs text-[#00ff88]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        已投票
                      </motion.div>
                    )}
                  </div>

                  {/* Teams */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-4xl">{homeTeam?.flag || '❓'}</span>
                      <span className="text-sm font-bold text-white text-center">{homeTeam?.name || match.homeTeam}</span>
                      <span className="text-xs text-gray-500">主</span>
                    </div>
                    <div className="text-xl font-bold text-gray-600 font-display">VS</div>
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-4xl">{awayTeam?.flag || '❓'}</span>
                      <span className="text-sm font-bold text-white text-center">{awayTeam?.name || match.awayTeam}</span>
                      <span className="text-xs text-gray-500">客</span>
                    </div>
                  </div>

                  {/* Vote Buttons */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { key: 'home' as const, label: homeTeam?.name || '主队', icon: homeTeam?.flag || '🏠', color: 'from-[#00ff88]/20 to-[#00cc6a]/20', border: '#00ff88' },
                      { key: 'draw' as const, label: '平局', icon: '🤝', color: 'from-gray-500/20 to-gray-600/20', border: '#888' },
                      { key: 'away' as const, label: awayTeam?.name || '客队', icon: awayTeam?.flag || '✈️', color: 'from-[#FFD700]/20 to-[#FFA500]/20', border: '#FFD700' },
                    ].map(option => (
                      <motion.button
                        key={option.key}
                        onClick={() => handleVote(match.id, option.key)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative py-3 px-2 rounded-xl bg-gradient-to-b ${option.color} border transition-all cursor-pointer overflow-hidden ${
                          vote?.choice === option.key
                            ? `border-[${option.border}] shadow-lg`
                            : 'border-white/10 hover:border-white/20'
                        }`}
                        style={vote?.choice === option.key ? {
                          borderColor: option.border,
                          boxShadow: `0 0 15px ${option.border}30`
                        } : {}}
                      >
                        <div className="text-lg mb-1">{option.icon}</div>
                        <div className="text-xs font-medium text-white truncate">{option.label}</div>
                        {vote?.choice === option.key && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-1 right-1"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Vote Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>全网预测分布 ({stats.total.toLocaleString()} 票)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden flex">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stats.homeW}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-[#00ff88]"
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stats.draw}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gray-500"
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stats.awayW}%` }}
                          transition={{ duration: 1, delay: 0.4 }}
                          className="h-full bg-[#FFD700]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#00ff88]">{stats.homeW}% 主胜</span>
                      <span className="text-gray-400">{stats.draw}% 平</span>
                      <span className="text-[#FFD700]">{stats.awayW}% 客胜</span>
                    </div>
                  </div>

                  {/* Success Toast */}
                  <AnimatePresence>
                    {showSuccess === match.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-3 py-2 px-3 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 text-center"
                      >
                        <span className="text-sm text-[#00ff88] font-medium">投票成功！感谢您的参与</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
