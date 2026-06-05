import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Calendar, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { allMatches, groups, roundLabels, getTeamById } from '../data/worldcupData';
import { useLocalTime, getRelativeTime } from '../hooks/useLocalTime';

export default function SchedulePage() {
  const { formatMatchTime, location } = useLocalTime();
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedRound, setSelectedRound] = useState<string>('ALL');
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'date'>('date');

  const rounds = ['group', 'round32', 'round16', 'quarter', 'semi', 'third', 'final'];

  const filteredMatches = useMemo(() => {
    let matches = [...allMatches];
    if (selectedGroup !== 'ALL') {
      matches = matches.filter(m => m.group === selectedGroup);
    }
    if (selectedRound !== 'ALL') {
      matches = matches.filter(m => m.round === selectedRound);
    }
    return matches.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}:00-04:00`).getTime();
      const dateB = new Date(`${b.date}T${b.time}:00-04:00`).getTime();
      return dateA - dateB;
    });
  }, [selectedGroup, selectedRound]);

  const matchesByDate = useMemo(() => {
    const map: Record<string, typeof filteredMatches> = {};
    filteredMatches.forEach(m => {
      if (!map[m.date]) map[m.date] = [];
      map[m.date].push(m);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredMatches]);

  function formatDate(dateStr: string) {
    const date = new Date(dateStr + 'T00:00:00');
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return {
      month: date.getMonth() + 1,
      day: date.getDate(),
      weekday: weekdays[date.getDay()],
    };
  }

  return (
    <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2 font-display">完整赛程</h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-[#00ff88]" />
            <span>您的位置: {location.city}{location.country ? `, ${location.country}` : ''}</span>
            <span className="text-gray-600">|</span>
            <Clock className="w-4 h-4 text-[#FFD700]" />
            <span>比赛时间已自动转换为您当地时间</span>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-4 mb-6"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-400">筛选:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRound('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedRound === 'ALL' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                全部轮次
              </button>
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
          {selectedRound === 'group' || selectedRound === 'ALL' ? (
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
          ) : null}
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-end mb-4">
          <div className="flex bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode('date')}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'date' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'text-gray-400'
              }`}
            >
              按日期
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'text-gray-400'
              }`}
            >
              列表
            </button>
          </div>
        </div>

        {/* Matches */}
        <div className="space-y-6">
          {matchesByDate.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>没有找到符合条件的比赛</p>
            </div>
          ) : (
            matchesByDate.map(([date, matches]) => {
              const d = formatDate(date);
              return (
                <motion.div
                  key={date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ff88]/20 to-[#FFD700]/20 flex items-center justify-center">
                      <span className="text-lg font-bold gradient-text">{d.day}</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{d.month}月{d.day}日</div>
                      <div className="text-xs text-gray-500">{d.weekday}</div>
                    </div>
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-xs text-gray-500">{matches.length} 场比赛</span>
                  </div>

                  <div className="space-y-3">
                    {matches.map((match) => {
                      const homeTeam = getTeamById(match.homeTeam);
                      const awayTeam = getTeamById(match.awayTeam);
                      const localInfo = formatMatchTime(match.date, match.time, match.timezone);
                      const isExpanded = expandedMatch === match.id;

                      return (
                        <motion.div
                          key={match.id}
                          layout
                          className="glass rounded-xl overflow-hidden card-hover"
                        >
                          <button
                            onClick={() => setExpandedMatch(isExpanded ? null : match.id)}
                            className="w-full p-4 flex items-center gap-4 cursor-pointer"
                          >
                            {/* Time */}
                            <div className="flex flex-col items-center min-w-[70px]">
                              <span className="text-lg font-bold text-[#00ff88] font-display">{localInfo.localTime}</span>
                              <span className="text-xs text-gray-500">{localInfo.offset}</span>
                            </div>

                            {/* Teams */}
                            <div className="flex-1 flex items-center justify-center gap-3 sm:gap-6">
                              <div className="flex flex-col items-center gap-1 flex-1">
                                <span className="text-2xl">{homeTeam?.flag || '❓'}</span>
                                <span className="text-xs sm:text-sm font-medium text-white">{homeTeam?.name || match.homeTeam}</span>
                              </div>
                              <div className="text-xl font-bold text-gray-500 font-display">VS</div>
                              <div className="flex flex-col items-center gap-1 flex-1">
                                <span className="text-2xl">{awayTeam?.flag || '❓'}</span>
                                <span className="text-xs sm:text-sm font-medium text-white">{awayTeam?.name || match.awayTeam}</span>
                              </div>
                            </div>

                            {/* Meta */}
                            <div className="flex flex-col items-end gap-1 min-w-[80px]">
                              <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400">
                                {match.group ? `${match.group}组` : roundLabels[match.round]}
                              </span>
                              <span className="text-xs text-gray-500">
                                {getRelativeTime(match.date, match.time)}
                              </span>
                            </div>

                            <div className="hidden sm:block">
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                            </div>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-0 border-t border-white/5">
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                      <MapPin className="w-4 h-4 text-[#FFD700]" />
                                      <span>{match.stadium}, {match.city}, {match.country}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                      <Clock className="w-4 h-4 text-[#00ff88]" />
                                      <span>当地时间: {match.date} {match.time} ({match.timezone})</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                      <Calendar className="w-4 h-4 text-gray-500" />
                                      <span>您的当地时间: {localInfo.localDate} {localInfo.localTime}</span>
                                    </div>
                                  </div>
                                  {match.prediction && (
                                    <div className="mt-4 p-3 rounded-lg bg-white/5">
                                      <p className="text-xs text-gray-500 mb-2">AI 预测胜率</p>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400 w-16 text-right">{homeTeam?.name || '主队'}</span>
                                        <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden flex">
                                          <div className="h-full bg-[#00ff88]" style={{ width: `${match.prediction.homeWin}%` }} />
                                          <div className="h-full bg-gray-500" style={{ width: `${match.prediction.draw}%` }} />
                                          <div className="h-full bg-[#FFD700]" style={{ width: `${match.prediction.awayWin}%` }} />
                                        </div>
                                        <span className="text-xs text-gray-400 w-16">{awayTeam?.name || '客队'}</span>
                                      </div>
                                      <div className="flex justify-center mt-1 text-xs text-gray-500">
                                        平局 {match.prediction.draw}%
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
