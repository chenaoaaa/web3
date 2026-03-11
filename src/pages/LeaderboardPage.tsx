import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Crown, Star, Flame, TrendingUp, Medal, Users, Zap, ChevronDown, Filter, Target, Swords, Award } from 'lucide-react'

const seasons = ['Season 7 (Current)', 'Season 6', 'Season 5', 'All Time']
const modes = ['Overall', 'Battle', 'Racing', 'Strategy', 'Card Games']

const leaderboardData = [
  { rank: 1, name: 'CryptoKnight_X', earnings: 245820, wins: 1847, loss: 312, winRate: 85.6, streak: 24, avatar: '#FFD700', badge: 'Champion', games: 'Cyber Blitz', level: 99 },
  { rank: 2, name: 'VoidSlayer99', earnings: 198450, wins: 1542, loss: 389, winRate: 79.8, streak: 18, avatar: '#C0C0C0', badge: 'Grandmaster', games: 'Death Match X', level: 97 },
  { rank: 3, name: 'NeonPhantom', earnings: 176230, wins: 1389, loss: 421, winRate: 76.7, streak: 15, avatar: '#CD7F32', badge: 'Master', games: 'Void Runner', level: 95 },
  { rank: 4, name: 'QuantumBlade', earnings: 154990, wins: 1201, loss: 488, winRate: 71.1, streak: 12, avatar: '#B026FF', badge: 'Diamond', games: 'Neon Clash', level: 92 },
  { rank: 5, name: 'DarkStar_Web3', earnings: 132710, wins: 1087, loss: 534, winRate: 67.1, streak: 9, avatar: '#00D4FF', badge: 'Diamond', games: 'Star Forge', level: 89 },
  { rank: 6, name: 'CyberSamurai', earnings: 118490, wins: 982, loss: 567, winRate: 63.4, streak: 7, avatar: '#00FF88', badge: 'Platinum', games: 'Cyber Blitz', level: 86 },
  { rank: 7, name: 'BlazeMaster_42', earnings: 102340, wins: 891, loss: 612, winRate: 59.3, streak: 6, avatar: '#FF2D78', badge: 'Platinum', games: 'PIXEL QUEST', level: 83 },
  { rank: 8, name: 'ShadowFury_07', earnings: 94120, wins: 834, loss: 645, winRate: 56.4, streak: 5, avatar: '#FF8C00', badge: 'Gold', games: 'Quantum Siege', level: 80 },
  { rank: 9, name: 'MetaWarrior', earnings: 87650, wins: 789, loss: 678, winRate: 53.8, streak: 4, avatar: '#0EA5E9', badge: 'Gold', games: 'Death Match X', level: 78 },
  { rank: 10, name: 'TokenHunter', earnings: 79230, wins: 712, loss: 701, winRate: 50.4, streak: 3, avatar: '#7C3AED', badge: 'Gold', games: 'Drift Kings', level: 75 },
  { rank: 11, name: 'NexusViper', earnings: 72890, wins: 678, loss: 723, winRate: 48.4, streak: 2, avatar: '#14B8A6', badge: 'Silver', games: 'Star Forge', level: 72 },
  { rank: 12, name: 'CryptoTank', earnings: 68450, wins: 645, loss: 756, winRate: 46.1, streak: 1, avatar: '#F97316', badge: 'Silver', games: 'Quantum Siege', level: 70 },
]

const badgeColors: Record<string, string> = {
  Champion: '#FFD700',
  Grandmaster: '#FF2D78',
  Master: '#B026FF',
  Diamond: '#00D4FF',
  Platinum: '#00FF88',
  Gold: '#FFD700',
  Silver: '#C0C0C0',
}

export default function LeaderboardPage() {
  const [activeSeason, setActiveSeason] = useState('Season 7 (Current)')
  const [activeMode, setActiveMode] = useState('Overall')
  const [showSeasons, setShowSeasons] = useState(false)

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { bg: 'bg-gradient-to-r from-yellow-900/30 to-transparent', border: 'border-neon-gold/30', glow: 'shadow-[0_0_30px_rgba(255,215,0,0.1)]' }
    if (rank === 2) return { bg: 'bg-gradient-to-r from-gray-800/30 to-transparent', border: 'border-white/20', glow: '' }
    if (rank === 3) return { bg: 'bg-gradient-to-r from-orange-900/20 to-transparent', border: 'border-orange-500/20', glow: '' }
    return { bg: 'bg-white/2', border: 'border-white/5', glow: '' }
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={18} className="text-neon-gold" />
    if (rank === 2) return <Medal size={18} className="text-white/60" />
    if (rank === 3) return <Medal size={18} className="text-orange-400" />
    return <span className="font-cyber text-sm font-bold text-white/30">#{rank}</span>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="pt-28 pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Trophy size={28} className="text-neon-gold" />
              <h1 className="font-cyber text-3xl font-black gradient-text">LEADERBOARD</h1>
            </div>
            <p className="text-white/40 text-sm">Top players ranked by performance & earnings</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSeasons(!showSeasons)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card border border-white/10 text-sm font-mono text-white/60 hover:text-white transition-all"
            >
              {activeSeason}
              <ChevronDown size={14} className={`transition-transform ${showSeasons ? 'rotate-180' : ''}`} />
            </button>
            {showSeasons && (
              <div className="absolute right-0 top-full mt-2 w-52 glass-card rounded-xl border border-white/10 overflow-hidden z-20">
                {seasons.map(s => (
                  <button
                    key={s}
                    onClick={() => { setActiveSeason(s); setShowSeasons(false) }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-mono transition-all
                      ${activeSeason === s ? 'bg-neon-purple/10 text-neon-purple' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
          {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map((p, i) => {
            const isFirst = i === 1
            return (
              <motion.div
                key={p.rank}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className={`glass-card rounded-2xl p-4 text-center relative overflow-hidden ${isFirst ? 'lg:-mt-4' : 'mt-4'}`}
                style={{ borderColor: p.avatar + '30', borderWidth: '1px' }}
              >
                <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at top, ${p.avatar}, transparent 70%)` }} />
                <div className="relative z-10">
                  <div className="mb-3">
                    {isFirst ? <Crown size={24} className="text-neon-gold mx-auto mb-1" /> :
                     i === 0 ? <Medal size={20} className="text-white/60 mx-auto mb-1" /> :
                     <Medal size={20} className="text-orange-400 mx-auto mb-1" />}
                  </div>
                  <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-lg font-bold"
                    style={{ background: p.avatar + '25', color: p.avatar, border: `2px solid ${p.avatar}50` }}>
                    {p.name[0]}
                  </div>
                  <div className="font-semibold text-white text-sm truncate mb-1">{p.name}</div>
                  <div className="text-[10px] font-cyber font-bold px-2 py-0.5 rounded inline-block mb-2"
                    style={{ background: badgeColors[p.badge] + '20', color: badgeColors[p.badge] }}>
                    {p.badge}
                  </div>
                  <div className="font-cyber text-base font-black text-neon-green">{p.earnings.toLocaleString()}</div>
                  <div className="text-white/30 text-[10px] font-mono">NXS EARNED</div>
                  <div className="mt-2 flex justify-center gap-3 text-[10px] font-mono text-white/30">
                    <span>{p.wins}W</span>
                    <span>{p.loss}L</span>
                    <span className="text-neon-green">{p.winRate}%</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Mode Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {modes.map(mode => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all
                ${activeMode === mode
                  ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40'
                  : 'bg-white/3 text-white/40 border border-white/5 hover:text-white/70'
                }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Full Leaderboard */}
        <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-white/5 text-[10px] font-cyber font-bold text-white/30 tracking-widest">
            <div className="col-span-1">RANK</div>
            <div className="col-span-3">PLAYER</div>
            <div className="col-span-2 text-right">EARNINGS</div>
            <div className="col-span-1 text-right hidden md:block">W/L</div>
            <div className="col-span-2 text-right hidden md:block">WIN RATE</div>
            <div className="col-span-1 text-right hidden lg:block">STREAK</div>
            <div className="col-span-2 text-right hidden lg:block">GAME</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/3">
            {leaderboardData.map((player, i) => {
              const style = getRankStyle(player.rank)
              return (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                  className={`grid grid-cols-12 gap-2 px-4 py-3 items-center ${style.bg} ${style.glow} border-l-2 ${style.border} hover:bg-white/3 transition-all cursor-pointer group`}
                >
                  <div className="col-span-1">
                    {getRankIcon(player.rank)}
                  </div>
                  <div className="col-span-3 flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: player.avatar + '25', color: player.avatar, border: `1px solid ${player.avatar}40` }}>
                      {player.name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-xs font-semibold truncate">{player.name}</div>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-cyber px-1 py-0.5 rounded"
                          style={{ background: badgeColors[player.badge] + '15', color: badgeColors[player.badge] }}>
                          {player.badge}
                        </span>
                        <span className="text-white/20 text-[9px] font-mono">Lv.{player.level}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <div className="font-cyber text-sm font-bold text-neon-green">{player.earnings.toLocaleString()}</div>
                    <div className="text-white/25 text-[9px] font-mono">NXS</div>
                  </div>
                  <div className="col-span-1 text-right hidden md:block">
                    <span className="text-white/60 text-xs font-mono">{player.wins}</span>
                    <span className="text-white/20 text-xs">/</span>
                    <span className="text-white/30 text-xs font-mono">{player.loss}</span>
                  </div>
                  <div className="col-span-2 text-right hidden md:block">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-green"
                          style={{ width: `${player.winRate}%` }} />
                      </div>
                      <span className="text-white/60 text-xs font-mono">{player.winRate}%</span>
                    </div>
                  </div>
                  <div className="col-span-1 text-right hidden lg:block">
                    <div className="flex items-center justify-end gap-1">
                      <Flame size={11} className={player.streak >= 10 ? 'text-neon-pink' : player.streak >= 5 ? 'text-orange-400' : 'text-white/30'} />
                      <span className={`text-xs font-mono ${player.streak >= 10 ? 'text-neon-pink font-bold' : 'text-white/40'}`}>
                        {player.streak}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 text-right hidden lg:block">
                    <span className="text-white/40 text-xs font-mono">{player.games}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
