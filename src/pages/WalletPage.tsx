import { motion } from 'framer-motion'
import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp, Zap, Shield, Copy, RefreshCw, Plus, Send, ChevronRight, ExternalLink } from 'lucide-react'
import { useAppStore } from '../store'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

const balanceHistory = [
  { date: 'Jan', eth: 1.2, nxs: 8000 },
  { date: 'Feb', eth: 1.8, nxs: 10500 },
  { date: 'Mar', eth: 1.4, nxs: 9200 },
  { date: 'Apr', eth: 2.2, nxs: 12400 },
  { date: 'May', eth: 2.0, nxs: 11800 },
  { date: 'Jun', eth: 2.6, nxs: 14200 },
  { date: 'Jul', eth: 2.847, nxs: 15420 },
]

const transactions = [
  { id: 1, type: 'earn', desc: 'Battle Royale Win — Cyber Blitz', amount: '+500 NXS', value: '+$1,424', time: '2h ago', hash: '0x7f3a...9b2c' },
  { id: 2, type: 'sell', desc: 'NFT Sale — Neon Phantom', amount: '+1.8 ETH', value: '+$6,156', time: '5h ago', hash: '0x2d1e...4f8a' },
  { id: 3, type: 'buy', desc: 'NFT Purchase — Void Blade', amount: '-6.5 ETH', value: '-$22,230', time: '1d ago', hash: '0x9c5b...3e71' },
  { id: 4, type: 'earn', desc: 'Tournament Reward — S7', amount: '+2000 NXS', value: '+$5,694', time: '2d ago', hash: '0x4a8d...7c2f' },
  { id: 5, type: 'stake', desc: 'Staked NXS Tokens', amount: '-5000 NXS', value: '-$14,235', time: '3d ago', hash: '0x6e2f...8d4b' },
  { id: 6, type: 'earn', desc: 'Staking Reward', amount: '+180 NXS', value: '+$512', time: '4d ago', hash: '0x1b7c...5a9e' },
]

const myNFTs = [
  { id: 1, name: 'Cyber Knight', collection: 'Nexus Warriors', value: '3.2 ETH', img: 'https://images.unsplash.com/photo-1634193295627-1cdddf751ebf?w=200&q=80', rarity: 'Epic', color: '#B026FF' },
  { id: 2, name: 'Shadow Blade', collection: 'Nexus Arsenal', value: '1.5 ETH', img: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=200&q=80', rarity: 'Rare', color: '#00D4FF' },
  { id: 3, name: 'Speed Ghost', collection: 'Void Motors', value: '2.1 ETH', img: 'https://images.unsplash.com/photo-1555353540-64580b51c258?w=200&q=80', rarity: 'Rare', color: '#00D4FF' },
  { id: 4, name: 'Fire Drake Skin', collection: 'CyberSkins v2', value: '0.6 ETH', img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=200&q=80', rarity: 'Common', color: '#6B7280' },
]

const txTypeConfig = {
  earn: { icon: ArrowDownLeft, color: '#00FF88', bg: 'bg-neon-green/10', label: 'Earned' },
  sell: { icon: ArrowUpRight, color: '#00D4FF', bg: 'bg-neon-blue/10', label: 'Sold' },
  buy: { icon: ArrowDownLeft, color: '#FF2D78', bg: 'bg-neon-pink/10', label: 'Bought' },
  stake: { icon: Shield, color: '#B026FF', bg: 'bg-neon-purple/10', label: 'Staked' },
}

export default function WalletPage() {
  const { wallet, connectWallet, addNotification } = useAppStore()

  const totalPortfolioValue = wallet.connected
    ? wallet.balance * 3421 + wallet.nxsBalance * 2.847 + 7.4 * 3421
    : 0

  if (!wallet.connected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-36 pb-20 flex items-center justify-center min-h-[60vh]"
      >
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 border border-neon-purple/30 flex items-center justify-center mx-auto mb-6">
            <Wallet size={32} className="text-neon-purple" />
          </div>
          <h2 className="font-cyber text-2xl font-black text-white mb-3">Connect Your Wallet</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Connect MetaMask, WalletConnect, or any Web3 wallet to view your portfolio, 
            NFT collection, and transaction history.
          </p>
          <div className="space-y-3">
            {[
              { name: 'MetaMask', icon: '🦊', desc: 'Most popular Ethereum wallet' },
              { name: 'WalletConnect', icon: '🔗', desc: 'Connect with 300+ wallets' },
              { name: 'Coinbase Wallet', icon: '💙', desc: 'Easy for beginners' },
            ].map(w => (
              <motion.button
                key={w.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={connectWallet}
                className="w-full flex items-center gap-4 p-4 rounded-xl glass-card border border-white/5 hover:border-neon-purple/30 transition-all group"
              >
                <span className="text-2xl">{w.icon}</span>
                <div className="text-left flex-1">
                  <div className="text-white font-semibold text-sm">{w.name}</div>
                  <div className="text-white/30 text-xs">{w.desc}</div>
                </div>
                <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  const shortAddr = `${wallet.address!.slice(0, 6)}...${wallet.address!.slice(-4)}`

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
              <Wallet size={28} className="text-neon-blue" />
              <h1 className="font-cyber text-3xl font-black gradient-text">MY WALLET</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-white/40 text-sm font-mono">{shortAddr}</span>
              <button onClick={() => { navigator.clipboard.writeText(wallet.address!); addNotification({ type: 'success', title: 'Copied!', message: 'Address copied to clipboard' }) }}
                className="text-white/20 hover:text-neon-blue transition-colors">
                <Copy size={13} />
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => addNotification({ type: 'info', title: 'Refreshing...', message: 'Syncing blockchain data' })}
              className="p-2.5 rounded-lg glass-card border border-white/5 hover:border-white/15 text-white/40 hover:text-white transition-all">
              <RefreshCw size={16} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="btn-neon btn-primary flex items-center gap-2 px-4 py-2 text-xs">
              <ExternalLink size={13} />
              View on Etherscan
            </motion.button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Portfolio Overview */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 neon-border-purple">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-white/30 text-xs font-mono mb-1">TOTAL PORTFOLIO VALUE</div>
                <div className="font-cyber text-4xl font-black text-white">
                  ${totalPortfolioValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight size={14} className="text-neon-green" />
                  <span className="text-neon-green font-mono text-sm font-bold">+$4,280</span>
                  <span className="text-white/30 text-xs ml-1">today</span>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neon-green/10 border border-neon-green/20 text-neon-green text-xs font-cyber">
                  <Plus size={13} /> Deposit
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-cyber">
                  <Send size={13} /> Send
                </motion.button>
              </div>
            </div>

            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceHistory}>
                  <defs>
                    <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B026FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Space Mono' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#0D1117', border: '1px solid rgba(176,38,255,0.3)', borderRadius: '8px', fontSize: '11px', fontFamily: 'Space Mono' }}
                    formatter={(val: number) => [`${val} ETH`, 'Balance']}
                  />
                  <Area type="monotone" dataKey="eth" stroke="url(#neonGradStroke)" strokeWidth={2} fill="url(#portfolioGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Token Balances */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-5 neon-border-blue">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">Ξ</div>
                  <div>
                    <div className="text-white font-semibold text-sm">Ethereum</div>
                    <div className="text-white/30 text-xs font-mono">ETH</div>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-neon-green" />
              </div>
              <div className="font-cyber text-3xl font-black text-white mb-1">{wallet.balance}</div>
              <div className="text-white/30 text-xs font-mono">≈ ${(wallet.balance * 3421).toLocaleString()}</div>
            </div>

            <div className="glass-card rounded-2xl p-5 neon-border-green">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center">
                    <Zap size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">NEXUS Token</div>
                    <div className="text-white/30 text-xs font-mono">NXS</div>
                  </div>
                </div>
                <div className="text-neon-green text-xs font-mono font-bold">+12.4%</div>
              </div>
              <div className="font-cyber text-3xl font-black text-neon-green mb-1">{wallet.nxsBalance.toLocaleString()}</div>
              <div className="text-white/30 text-xs font-mono">≈ ${(wallet.nxsBalance * 2.847).toLocaleString()}</div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-white/5">
              <div className="text-white/30 text-xs font-mono mb-3">NFT COLLECTION VALUE</div>
              <div className="font-cyber text-3xl font-black text-neon-blue mb-1">7.4 ETH</div>
              <div className="text-white/30 text-xs font-mono mb-2">≈ $25,315 · 4 items</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '68%' }} />
              </div>
              <div className="text-white/20 text-[10px] font-mono mt-1">68% portfolio share</div>
            </div>
          </div>
        </div>

        {/* My NFTs & Transactions */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* My NFTs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-cyber text-lg font-bold text-white">MY NFTs</h2>
              <button className="text-neon-blue text-xs font-mono hover:text-white transition-colors">View All →</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {myNFTs.map((nft, i) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="glass-card rounded-xl overflow-hidden cursor-pointer group hover:border-white/15 border border-white/5 transition-all"
                >
                  <div className="relative h-28 overflow-hidden">
                    <img src={nft.img} alt={nft.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/70 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <span className="text-[9px] font-cyber font-bold px-1.5 py-0.5 rounded"
                        style={{ background: nft.color + '25', color: nft.color, border: `1px solid ${nft.color}40` }}>
                        {nft.rarity}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-white/30 text-[9px] font-mono truncate">{nft.collection}</div>
                    <div className="text-white text-xs font-semibold truncate">{nft.name}</div>
                    <div className="font-cyber text-xs font-bold mt-1" style={{ color: nft.color }}>{nft.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Transactions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-cyber text-lg font-bold text-white">TRANSACTIONS</h2>
              <button className="text-neon-blue text-xs font-mono hover:text-white transition-colors">View All →</button>
            </div>
            <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
              <div className="divide-y divide-white/5">
                {transactions.map((tx, i) => {
                  const config = txTypeConfig[tx.type as keyof typeof txTypeConfig]
                  const Icon = config.icon
                  const isPositive = tx.amount.startsWith('+')
                  return (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                      className="flex items-center gap-3 p-4 hover:bg-white/2 transition-all"
                    >
                      <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={15} style={{ color: config.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white/80 text-xs font-medium truncate">{tx.desc}</div>
                        <div className="text-white/25 text-[10px] font-mono">{tx.hash} · {tx.time}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`font-mono text-xs font-bold ${isPositive ? 'text-neon-green' : 'text-neon-pink'}`}>
                          {tx.amount}
                        </div>
                        <div className={`font-mono text-[10px] ${isPositive ? 'text-neon-green/50' : 'text-neon-pink/50'}`}>
                          {tx.value}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
