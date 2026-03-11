import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Heart, ShoppingCart, TrendingUp, Zap, Eye, Star, Tag, Grid3X3, List } from 'lucide-react'
import { useAppStore } from '../store'

const rarities = ['All', 'Legendary', 'Epic', 'Rare', 'Common']
const categories = ['All', 'Characters', 'Weapons', 'Skins', 'Vehicles', 'Artifacts']

const nfts = [
  { id: 1, name: 'Dragon Slayer', collection: 'Nexus Warriors', rarity: 'Legendary', price: '4.2 ETH', usd: '$14,360', image: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=300&q=80', category: 'Characters', likes: 847, views: '12.4K', owned: false, trending: true, color: '#FFD700' },
  { id: 2, name: 'Neon Phantom', collection: 'CyberSkins v2', rarity: 'Epic', price: '1.8 ETH', usd: '$6,156', image: 'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=300&q=80', category: 'Skins', likes: 524, views: '8.9K', owned: false, trending: false, color: '#B026FF' },
  { id: 3, name: 'Void Blade', collection: 'Nexus Arsenal', rarity: 'Legendary', price: '6.5 ETH', usd: '$22,230', image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=300&q=80', category: 'Weapons', likes: 1203, views: '18.2K', owned: false, trending: true, color: '#FFD700' },
  { id: 4, name: 'Cyber Racer X7', collection: 'Void Motors', rarity: 'Epic', price: '2.4 ETH', usd: '$8,208', image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?w=300&q=80', category: 'Vehicles', likes: 389, views: '6.1K', owned: false, trending: false, color: '#B026FF' },
  { id: 5, name: 'Quantum Shield', collection: 'Nexus Arsenal', rarity: 'Rare', price: '0.8 ETH', usd: '$2,736', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=300&q=80', category: 'Weapons', likes: 267, views: '4.3K', owned: false, trending: false, color: '#00D4FF' },
  { id: 6, name: 'Shadow Clone', collection: 'Nexus Warriors', rarity: 'Rare', price: '1.1 ETH', usd: '$3,762', image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=300&q=80', category: 'Characters', likes: 431, views: '7.2K', owned: false, trending: false, color: '#00D4FF' },
  { id: 7, name: 'Oracle Stone', collection: 'Ancient Artifacts', rarity: 'Legendary', price: '12.0 ETH', usd: '$41,040', image: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?w=300&q=80', category: 'Artifacts', likes: 2104, views: '34.8K', owned: false, trending: true, color: '#FFD700' },
  { id: 8, name: 'Speed Demon', collection: 'Void Motors', rarity: 'Common', price: '0.3 ETH', usd: '$1,026', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&q=80', category: 'Vehicles', likes: 128, views: '2.1K', owned: false, trending: false, color: '#6B7280' },
  { id: 9, name: 'Plasma Cannon', collection: 'Nexus Arsenal', rarity: 'Epic', price: '2.9 ETH', usd: '$9,918', image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=300&q=80', category: 'Weapons', likes: 693, views: '11.4K', owned: false, trending: false, color: '#B026FF' },
]

const collectionStats = [
  { label: 'Total Volume', value: '28,420 ETH', change: '+18.4%', up: true },
  { label: 'Floor Price', value: '0.8 ETH', change: '+5.2%', up: true },
  { label: 'Items Listed', value: '12,847', change: '+2.1K', up: true },
  { label: 'Owners', value: '48.2K', change: '+3.4K', up: true },
]

const rarityConfig: Record<string, { label: string; class: string; color: string }> = {
  Legendary: { label: 'Legendary', class: 'rarity-legendary', color: '#FFD700' },
  Epic: { label: 'Epic', class: 'rarity-epic', color: '#B026FF' },
  Rare: { label: 'Rare', class: 'rarity-rare', color: '#00D4FF' },
  Common: { label: 'Common', class: 'rarity-common', color: '#6B7280' },
}

export default function NFTMarketPage() {
  const { wallet, addNotification } = useAppStore()
  const [activeRarity, setActiveRarity] = useState('All')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [likedNfts, setLikedNfts] = useState<Set<number>>(new Set())
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredNfts = nfts.filter(n => {
    const matchRarity = activeRarity === 'All' || n.rarity === activeRarity
    const matchCategory = activeCategory === 'All' || n.category === activeCategory
    const matchSearch = n.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchRarity && matchCategory && matchSearch
  })

  const toggleLike = (id: number) => {
    setLikedNfts(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleBuy = (nft: typeof nfts[0]) => {
    if (!wallet.connected) {
      addNotification({ type: 'warning', title: 'Wallet Required', message: 'Please connect your wallet to purchase NFTs' })
    } else {
      addNotification({ type: 'success', title: 'Purchase Initiated', message: `Purchasing ${nft.name} for ${nft.price}` })
    }
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
              <div className="text-2xl">🔮</div>
              <h1 className="font-cyber text-3xl font-black gradient-text">NFT MARKET</h1>
            </div>
            <p className="text-white/40 text-sm">Own rare gaming assets. Trade, battle, and earn.</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border transition-all ${viewMode === 'grid' ? 'bg-neon-purple/20 border-neon-purple/40 text-neon-purple' : 'border-white/10 text-white/30 hover:text-white/60'}`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg border transition-all ${viewMode === 'list' ? 'bg-neon-purple/20 border-neon-purple/40 text-neon-purple' : 'border-white/10 text-white/30 hover:text-white/60'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {collectionStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="glass-card rounded-xl p-4 border border-white/5"
            >
              <div className="text-white/30 text-xs font-mono mb-2">{stat.label}</div>
              <div className="font-cyber text-xl font-black text-white mb-1">{stat.value}</div>
              <div className={`flex items-center gap-1 text-xs font-mono ${stat.up ? 'text-neon-green' : 'text-neon-pink'}`}>
                <TrendingUp size={11} />
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search NFTs, collections..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="cyber-input pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-white/30 text-xs font-mono mr-1">RARITY:</span>
              {rarities.map(r => (
                <button
                  key={r}
                  onClick={() => setActiveRarity(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all
                    ${activeRarity === r
                      ? r === 'All' ? 'bg-white/15 text-white border border-white/20'
                        : r === 'Legendary' ? 'bg-neon-gold/20 text-neon-gold border border-neon-gold/30'
                        : r === 'Epic' ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                        : r === 'Rare' ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                        : 'bg-white/10 text-white/50 border border-white/15'
                      : 'bg-white/3 text-white/30 border border-white/5 hover:text-white/60'
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-white/30 text-xs font-mono mr-1">TYPE:</span>
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all
                    ${activeCategory === c
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                      : 'bg-white/3 text-white/30 border border-white/5 hover:text-white/60'
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredNfts.map((nft, i) => {
            const rarity = rarityConfig[nft.rarity]
            const isLiked = likedNfts.has(nft.id)
            return (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
                className="nft-card glass-card rounded-2xl overflow-hidden cursor-pointer group"
              >
                {/* NFT Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent" />

                  {/* Rarity Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-cyber font-bold ${rarity.class}`}>
                      {nft.rarity}
                    </span>
                  </div>

                  {/* Trending Badge */}
                  {nft.trending && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded bg-neon-pink/20 border border-neon-pink/30">
                      <TrendingUp size={9} className="text-neon-pink" />
                      <span className="text-[9px] font-cyber font-bold text-neon-pink">TRENDING</span>
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(nft.id)}
                      className={`w-10 h-10 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all
                        ${isLiked ? 'bg-neon-pink/30 border-neon-pink/50' : 'bg-white/10 border-white/20'}`}
                    >
                      <Heart size={16} fill={isLiked ? '#FF2D78' : 'none'} className={isLiked ? 'text-neon-pink' : 'text-white'} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    >
                      <Eye size={16} className="text-white" />
                    </motion.button>
                  </div>
                </div>

                {/* NFT Info */}
                <div className="p-4">
                  <div className="text-white/30 text-[10px] font-mono mb-1">{nft.collection}</div>
                  <h3 className="font-cyber text-base font-bold text-white mb-3">{nft.name}</h3>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-white/30 text-[10px] font-mono mb-0.5">PRICE</div>
                      <div className="font-cyber text-lg font-black text-white">{nft.price}</div>
                      <div className="text-white/30 text-[10px] font-mono">{nft.usd}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-3 justify-end">
                        <div className="flex items-center gap-1 text-white/30">
                          <Heart size={11} />
                          <span className="text-xs font-mono">{nft.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/30">
                          <Eye size={11} />
                          <span className="text-xs font-mono">{nft.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBuy(nft)}
                    className="w-full py-2.5 rounded-lg font-cyber text-[10px] font-bold tracking-widest flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${nft.color}20, ${nft.color}10)`,
                      border: `1px solid ${nft.color}40`,
                      color: nft.color,
                    }}
                  >
                    <ShoppingCart size={13} />
                    BUY NOW
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
