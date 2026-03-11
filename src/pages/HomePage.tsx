import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Zap, Shield, TrendingUp, Users, ChevronRight, Play, Star, ArrowUpRight } from 'lucide-react'
import { useAppStore } from '../store'
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'

const priceData = [
  { v: 1.2 }, { v: 1.8 }, { v: 1.5 }, { v: 2.1 }, { v: 1.9 }, { v: 2.4 },
  { v: 2.2 }, { v: 2.8 }, { v: 2.6 }, { v: 3.1 }, { v: 2.9 }, { v: 2.847 },
]

const featuredGames = [
  {
    id: 1, name: 'CYBER BLITZ', genre: 'Battle Royale', players: '12.4K',
    reward: '500 NXS', rarity: 'HOT', color: 'from-purple-900 to-pink-900',
    accent: '#FF2D78', description: 'Last survivor wins the jackpot',
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80',
  },
  {
    id: 2, name: 'VOID RUNNER', genre: 'Speed Racing', players: '8.2K',
    reward: '300 NXS', rarity: 'NEW', color: 'from-blue-900 to-cyan-900',
    accent: '#00D4FF', description: 'Race through quantum dimensions',
    img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&q=80',
  },
  {
    id: 3, name: 'NEON CLASH', genre: 'Card Strategy', players: '6.7K',
    reward: '200 NXS', rarity: 'TOURNAMENT', color: 'from-green-900 to-emerald-900',
    accent: '#00FF88', description: 'Build your NFT card deck',
    img: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80',
  },
]

const stats = [
  { label: 'Total Players', value: '2.1M+', icon: Users, color: 'text-neon-blue', bg: 'bg-neon-blue/10' },
  { label: 'Prizes Paid Out', value: '$48.2M', icon: TrendingUp, color: 'text-neon-green', bg: 'bg-neon-green/10' },
  { label: 'Active Games', value: '47', icon: Zap, color: 'text-neon-purple', bg: 'bg-neon-purple/10' },
  { label: 'NFTs Minted', value: '890K+', icon: Shield, color: 'text-neon-pink', bg: 'bg-neon-pink/10' },
]

const topPlayers = [
  { rank: 1, name: 'CryptoKnight_X', earnings: '245,820 NXS', wins: 1847, avatar: '#B026FF' },
  { rank: 2, name: 'VoidSlayer99', earnings: '198,450 NXS', wins: 1542, avatar: '#00D4FF' },
  { rank: 3, name: 'NeonPhantom', earnings: '176,230 NXS', wins: 1389, avatar: '#00FF88' },
  { rank: 4, name: 'QuantumBlade', earnings: '154,990 NXS', wins: 1201, avatar: '#FF2D78' },
  { rank: 5, name: 'DarkStar_Web3', earnings: '132,710 NXS', wins: 1087, avatar: '#FFD700' },
]

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export default function HomePage() {
  const { wallet, connectWallet } = useAppStore()

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="pt-28 pb-20"
    >
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="font-mono text-xs text-neon-green tracking-widest">SEASON 7 — NOW LIVE</span>
              </div>
              
              <h1 className="font-cyber text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-6">
                <span className="block text-white">PLAY.</span>
                <span className="block gradient-text">EARN.</span>
                <span className="block text-white">OWN.</span>
              </h1>
              
              <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-lg">
                The ultimate Web3 gaming universe. Battle in skill-based arenas, earn 
                <span className="text-neon-green font-semibold"> NXS tokens</span>, collect 
                <span className="text-neon-blue font-semibold"> rare NFT assets</span>, and 
                own your gaming destiny on-chain.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <NavLink to="/games">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-neon btn-primary flex items-center gap-2 px-6 py-3"
                  >
                    <Play size={16} fill="white" />
                    Enter Arena
                  </motion.button>
                </NavLink>
                {!wallet.connected && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={connectWallet}
                    className="btn-neon btn-outline flex items-center gap-2 px-6 py-3"
                  >
                    <Zap size={16} />
                    Connect & Earn
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* NXS Token Price Card */}
              <div className="glass-card rounded-2xl p-6 neon-border-purple">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-white/40 text-xs font-mono mb-1">NXS TOKEN PRICE</div>
                    <div className="font-cyber text-4xl font-black text-white">$2.847</div>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight size={14} className="text-neon-green" />
                      <span className="text-neon-green font-mono text-sm font-bold">+12.4%</span>
                      <span className="text-white/30 text-xs ml-1">24h</span>
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center shadow-neon-purple">
                    <Zap size={24} className="text-white" />
                  </div>
                </div>
                
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceData}>
                      <defs>
                        <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#B026FF" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#B026FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip
                        contentStyle={{ background: '#0D1117', border: '1px solid rgba(176,38,255,0.3)', borderRadius: '8px', fontSize: '12px' }}
                        formatter={(val: number) => [`$${val.toFixed(3)}`, 'NXS']}
                      />
                      <Area type="monotone" dataKey="v" stroke="#B026FF" strokeWidth={2} fill="url(#priceGrad)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/5">
                  {[
                    { label: 'Market Cap', value: '$284.7M' },
                    { label: '24h Vol', value: '$12.4M' },
                    { label: 'Holders', value: '148.2K' },
                  ].map(item => (
                    <div key={item.label} className="text-center">
                      <div className="text-white/30 text-xs font-mono">{item.label}</div>
                      <div className="text-white font-mono text-sm font-bold mt-0.5">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Active Players Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 glass-card rounded-xl p-3 neon-border-green"
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Users size={16} className="text-neon-green" />
                    <div className="badge-ping" />
                  </div>
                  <div>
                    <div className="font-cyber text-xs font-bold text-neon-green">2,147</div>
                    <div className="text-white/40 text-[10px] font-mono">ONLINE</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Jackpot Badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 glass-card rounded-xl p-3 neon-border-purple"
              >
                <div className="text-white/40 text-[10px] font-mono mb-1">CURRENT JACKPOT</div>
                <div className="font-cyber text-sm font-black text-neon-gold">45,230 NXS</div>
                <div className="text-neon-pink text-[10px] font-mono">≈ $128,740</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="glass-card rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div className={`font-cyber text-2xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-white/40 text-xs font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Games */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-cyber text-2xl font-bold text-white mb-1">FEATURED GAMES</h2>
            <p className="text-white/40 text-sm">High-stakes battles with real rewards</p>
          </div>
          <NavLink to="/games" className="flex items-center gap-1 text-neon-blue text-sm font-mono hover:text-white transition-colors group">
            View All
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </NavLink>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredGames.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="game-card glass-card rounded-2xl overflow-hidden cursor-pointer group"
            >
              {/* Game Cover */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.img}
                  alt={game.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${game.color} opacity-70`} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent" />
                
                {/* Rarity Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2 py-1 rounded text-[10px] font-cyber font-bold"
                    style={{ background: game.accent + '22', color: game.accent, border: `1px solid ${game.accent}44` }}
                  >
                    {game.rarity}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <Play size={22} fill="white" className="text-white ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3">
                  <h3 className="font-cyber text-xl font-black text-white">{game.name}</h3>
                  <div className="text-white/60 text-xs font-mono mt-0.5">{game.genre}</div>
                </div>
              </div>

              {/* Game Info */}
              <div className="p-4">
                <p className="text-white/50 text-sm mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Users size={13} className="text-white/30" />
                    <span className="text-white/50 text-xs font-mono">{game.players} playing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap size={13} style={{ color: game.accent }} />
                    <span className="font-mono text-sm font-bold" style={{ color: game.accent }}>{game.reward}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-2.5 rounded-lg font-cyber text-xs font-bold tracking-widest transition-all"
                  style={{
                    background: game.accent + '15',
                    border: `1px solid ${game.accent}40`,
                    color: game.accent,
                  }}
                >
                  PLAY NOW
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Players */}
          <div className="glass-card rounded-2xl p-6 neon-border-purple">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-cyber text-lg font-bold text-white">TOP PLAYERS</h2>
                <p className="text-white/30 text-xs font-mono mt-0.5">Season 7 Rankings</p>
              </div>
              <NavLink to="/leaderboard" className="text-neon-blue text-xs font-mono hover:text-white transition-colors">
                Full Board →
              </NavLink>
            </div>

            <div className="space-y-3">
              {topPlayers.map((player, i) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/3 hover:bg-white/5 transition-all group"
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-cyber text-xs font-black
                    ${i === 0 ? 'bg-neon-gold/20 text-neon-gold' : 
                      i === 1 ? 'bg-white/15 text-white/60' : 
                      i === 2 ? 'bg-orange-500/20 text-orange-400' : 
                      'bg-white/5 text-white/30'}`}
                  >
                    {player.rank}
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: player.avatar + '30', color: player.avatar, border: `1px solid ${player.avatar}40` }}
                  >
                    {player.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-semibold truncate">{player.name}</div>
                    <div className="text-white/30 text-xs font-mono">{player.wins} wins</div>
                  </div>
                  <div className="text-right">
                    <div className="text-neon-green font-mono text-xs font-bold">{player.earnings}</div>
                    {i < 3 && <div className="flex justify-end mt-0.5">
                      {[...Array(3 - i)].map((_, k) => (
                        <Star key={k} size={10} fill="#FFD700" className="text-neon-gold" />
                      ))}
                    </div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Web3 Features */}
          <div className="space-y-4">
            <h2 className="font-cyber text-lg font-bold text-white mb-4">WEB3 POWERED</h2>
            {[
              {
                title: 'Play-to-Earn Rewards',
                desc: 'Every game session earns you NXS tokens. Skill-based rewards ensure fair distribution.',
                icon: '⚡', color: '#B026FF', gradient: 'from-purple-900/30 to-transparent',
              },
              {
                title: 'NFT Game Assets',
                desc: 'Own your characters, weapons, and skins as NFTs. Trade, sell, or battle with them.',
                icon: '🔮', color: '#00D4FF', gradient: 'from-blue-900/30 to-transparent',
              },
              {
                title: 'Decentralized Tournaments',
                desc: 'Smart contract-powered tournaments with transparent prize pools and instant payouts.',
                icon: '🏆', color: '#00FF88', gradient: 'from-green-900/30 to-transparent',
              },
              {
                title: 'Cross-Chain Gaming',
                desc: 'Supported on Ethereum, Polygon, and BNB Chain. Bridge assets seamlessly.',
                icon: '🌐', color: '#FF2D78', gradient: 'from-pink-900/30 to-transparent',
              },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className={`glass-card rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all bg-gradient-to-r ${feat.gradient} group cursor-pointer`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{feat.icon}</div>
                  <div>
                    <div className="font-semibold text-sm mb-1" style={{ color: feat.color }}>{feat.title}</div>
                    <div className="text-white/40 text-xs leading-relaxed">{feat.desc}</div>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/60 transition-colors mt-0.5 ml-auto flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!wallet.connected && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden p-12 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 via-neon-blue/10 to-neon-green/20" />
            <div className="absolute inset-0 border border-neon-purple/20 rounded-2xl" />
            <div className="relative z-10">
              <h2 className="font-cyber text-3xl font-black text-white mb-4">
                START YOUR WEB3 GAMING JOURNEY
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">
                Connect your wallet and join 2.1 million players earning real rewards
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={connectWallet}
                className="btn-neon btn-primary text-sm px-8 py-4 inline-flex items-center gap-3"
              >
                <Zap size={18} />
                Connect Wallet & Play Free
              </motion.button>
            </div>
          </motion.div>
        </section>
      )}
    </motion.div>
  )
}
