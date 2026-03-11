import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Users, Zap, Play, Trophy, Clock, Shield, Star, Flame, Crown, Swords } from 'lucide-react'

const categories = ['All Games', 'Battle', 'Racing', 'Strategy', 'Card Games', 'Puzzle', 'RPG']

const games = [
  { id: 1, name: 'CYBER BLITZ', genre: 'Battle Royale', players: '12.4K', reward: '500 NXS', status: 'LIVE', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80', accent: '#FF2D78', gradient: 'from-pink-900', category: 'Battle', featured: true },
  { id: 2, name: 'VOID RUNNER', genre: 'Speed Racing', players: '8.2K', reward: '300 NXS', status: 'LIVE', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80', accent: '#00D4FF', gradient: 'from-blue-900', category: 'Racing', featured: true },
  { id: 3, name: 'NEON CLASH', genre: 'Card Strategy', players: '6.7K', reward: '200 NXS', status: 'TOURNAMENT', img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80', accent: '#00FF88', gradient: 'from-green-900', category: 'Card Games', featured: false },
  { id: 4, name: 'QUANTUM SIEGE', genre: 'Tower Defense', players: '5.1K', reward: '150 NXS', status: 'LIVE', img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&q=80', accent: '#B026FF', gradient: 'from-purple-900', category: 'Strategy', featured: false },
  { id: 5, name: 'PIXEL QUEST', genre: 'Adventure RPG', players: '9.8K', reward: '400 NXS', status: 'LIVE', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80', accent: '#FFD700', gradient: 'from-yellow-900', category: 'RPG', featured: true },
  { id: 6, name: 'CHAIN CHESS', genre: 'Puzzle Strategy', players: '3.4K', reward: '100 NXS', status: 'LIVE', img: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&q=80', accent: '#0EA5E9', gradient: 'from-sky-900', category: 'Puzzle', featured: false },
  { id: 7, name: 'DEATH MATCH X', genre: 'PvP Arena', players: '14.2K', reward: '750 NXS', status: 'HOT', img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=400&q=80', accent: '#FF2D78', gradient: 'from-red-900', category: 'Battle', featured: true },
  { id: 8, name: 'STAR FORGE', genre: 'Space Combat', players: '7.6K', reward: '350 NXS', status: 'NEW', img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80', accent: '#00D4FF', gradient: 'from-indigo-900', category: 'Battle', featured: false },
  { id: 9, name: 'DRIFT KINGS', genre: 'Street Racing', players: '4.9K', reward: '250 NXS', status: 'LIVE', img: 'https://images.unsplash.com/photo-1614160859544-c865e1ae8693?w=400&q=80', accent: '#FF8C00', gradient: 'from-orange-900', category: 'Racing', featured: false },
]

const tournaments = [
  { name: 'Grand Arena Championship', prize: '50,000 NXS', players: '256/256', starts: '2h 30m', status: 'FULL', accent: '#FFD700' },
  { name: 'Neon Cup — Season 7', prize: '25,000 NXS', players: '189/512', starts: '1d 4h', status: 'OPEN', accent: '#00FF88' },
  { name: 'Rookie Rumble', prize: '5,000 NXS', players: '64/128', starts: '45m', status: 'OPEN', accent: '#00D4FF' },
]

export default function GamesPage() {
  const [activeCategory, setActiveCategory] = useState('All Games')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGames = games.filter(g => {
    const matchCategory = activeCategory === 'All Games' || g.category === activeCategory
    const matchSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.genre.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

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
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Swords size={28} className="text-neon-purple" />
            <h1 className="font-cyber text-3xl font-black gradient-text">GAME ARENA</h1>
          </div>
          <p className="text-white/40 text-sm">Choose your battlefield. Every match earns real rewards.</p>
        </div>

        {/* Tournaments Banner */}
        <div className="glass-card rounded-2xl p-6 neon-border-purple mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Crown size={18} className="text-neon-gold" />
            <h2 className="font-cyber text-sm font-bold text-neon-gold tracking-widest">ACTIVE TOURNAMENTS</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {tournaments.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-white/3 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-cyber font-bold px-2 py-0.5 rounded"
                    style={{ background: t.accent + '20', color: t.accent, border: `1px solid ${t.accent}30` }}>
                    {t.status}
                  </span>
                  <div className="flex items-center gap-1 text-white/30">
                    <Clock size={11} />
                    <span className="text-xs font-mono">{t.starts}</span>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{t.name}</h3>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-white/30 text-[10px] font-mono">PRIZE POOL</div>
                    <div className="font-cyber text-lg font-black" style={{ color: t.accent }}>{t.prize}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/30 text-[10px] font-mono">PLAYERS</div>
                    <div className="text-white text-xs font-mono">{t.players}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="cyber-input pl-10"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all
                  ${activeCategory === cat
                    ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40'
                    : 'bg-white/3 text-white/40 border border-white/5 hover:text-white/70'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="game-card glass-card rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={game.img} alt={game.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-t ${game.gradient} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-cyber font-bold"
                    style={{ background: game.accent + '22', color: game.accent, border: `1px solid ${game.accent}44` }}>
                    {game.status}
                  </span>
                  {game.featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-cyber font-bold bg-neon-gold/20 text-neon-gold border border-neon-gold/30 flex items-center gap-1">
                      <Star size={8} fill="currentColor" /> FEATURED
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <Play size={22} fill="white" className="text-white ml-1" />
                  </motion.div>
                </div>

                <div className="absolute bottom-3 left-3">
                  <h3 className="font-cyber text-lg font-black text-white">{game.name}</h3>
                  <div className="text-white/50 text-xs font-mono">{game.genre}</div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Users size={12} className="text-white/30" />
                    <span className="text-white/50 text-xs font-mono">{game.players} online</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap size={12} style={{ color: game.accent }} />
                    <span className="font-mono text-sm font-bold" style={{ color: game.accent }}>{game.reward}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 rounded-lg font-cyber text-[10px] font-bold tracking-widest"
                    style={{ background: game.accent + '15', border: `1px solid ${game.accent}40`, color: game.accent }}
                  >
                    PLAY NOW
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 rounded-lg bg-white/3 border border-white/5 text-white/50 hover:text-white transition-colors"
                  >
                    <Trophy size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
