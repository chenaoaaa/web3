import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, Gamepad2, ShoppingBag, Trophy, Home, Zap, ChevronDown, Copy, LogOut, Menu, X } from 'lucide-react'
import { useAppStore } from '../store'

export default function Navbar() {
  const { wallet, connectWallet, disconnectWallet } = useAppStore()
  const [walletDropdown, setWalletDropdown] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileMenu(false)
  }, [location])

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shortAddr = wallet.address ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}` : ''

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/games', label: 'Arena', icon: Gamepad2 },
    { to: '/nft', label: 'NFT Market', icon: ShoppingBag },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { to: '/wallet', label: 'Wallet', icon: Wallet },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top Ticker */}
      <div className="bg-black/60 border-b border-white/5 py-1.5 overflow-hidden">
        <div className="ticker-content">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              {[
                { label: 'NXS/USD', value: '$2.847', change: '+12.4%', up: true },
                { label: 'ETH/USD', value: '$3,421', change: '+2.1%', up: true },
                { label: 'BTC/USD', value: '$68,420', change: '-0.8%', up: false },
                { label: 'TOP GAME', value: 'Cyber Blitz', change: '12.4K players', up: true },
                { label: 'JACKPOT', value: '45,230 NXS', change: 'ACTIVE', up: true },
                { label: 'NFT FLOOR', value: '0.8 ETH', change: '+5.2%', up: true },
                { label: 'ARENA', value: '2.1K Online', change: 'LIVE', up: true },
              ].map((item, j) => (
                <div key={j} className="flex items-center gap-2 text-xs whitespace-nowrap">
                  <span className="text-white/40 font-mono">{item.label}</span>
                  <span className="text-white font-mono font-bold">{item.value}</span>
                  <span className={`font-mono text-xs ${item.up ? 'text-neon-green' : 'text-neon-pink'}`}>
                    {item.change}
                  </span>
                  <span className="text-white/10">|</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Nav */}
      <div className="backdrop-blur-xl bg-dark-bg/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center shadow-neon-purple">
                  <Zap size={18} className="text-white" />
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue opacity-0 group-hover:opacity-30 blur-lg transition-opacity" />
              </div>
              <div>
                <div className="font-cyber text-sm font-black tracking-widest gradient-text">NEXUS</div>
                <div className="font-cyber text-[8px] font-medium text-white/30 tracking-[4px]">ARENA</div>
              </div>
            </NavLink>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => `nav-link flex items-center gap-1.5 ${isActive ? 'active text-white' : ''}`}
                >
                  <Icon size={14} />
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Wallet Button */}
            <div className="flex items-center gap-3">
              {/* NXS Balance Indicator */}
              {wallet.connected && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-green/10 border border-neon-green/20"
                >
                  <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <span className="font-mono text-xs text-neon-green font-bold">
                    {wallet.nxsBalance.toLocaleString()} NXS
                  </span>
                </motion.div>
              )}

              {/* Wallet Connect/Dropdown */}
              {!wallet.connected ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={connectWallet}
                  disabled={wallet.connecting}
                  className="btn-neon btn-primary text-xs px-4 py-2"
                >
                  {wallet.connecting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Connecting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Wallet size={14} />
                      Connect Wallet
                    </div>
                  )}
                </motion.button>
              ) : (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setWalletDropdown(!walletDropdown)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-card border border-neon-purple/30 hover:border-neon-purple/60 transition-all group"
                  >
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-neon-green border border-dark-bg" />
                    </div>
                    <span className="font-mono text-xs text-white/70 group-hover:text-white">{shortAddr}</span>
                    <ChevronDown size={12} className={`text-white/40 transition-transform ${walletDropdown ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {walletDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-64 glass-card rounded-xl border border-white/10 overflow-hidden shadow-2xl"
                      >
                        <div className="p-4 border-b border-white/5">
                          <div className="text-xs text-white/40 font-mono mb-1">Connected Wallet</div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-white">{shortAddr}</span>
                            <button onClick={copyAddress} className="text-white/40 hover:text-neon-blue transition-colors">
                              <Copy size={12} />
                            </button>
                            {copied && <span className="text-neon-green text-xs">Copied!</span>}
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-white/50">ETH Balance</span>
                            <span className="font-mono text-sm text-white">{wallet.balance} ETH</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-white/50">NXS Balance</span>
                            <span className="font-mono text-sm text-neon-green">{wallet.nxsBalance.toLocaleString()} NXS</span>
                          </div>
                        </div>
                        <button
                          onClick={() => { disconnectWallet(); setWalletDropdown(false) }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-xs text-neon-pink hover:bg-neon-pink/10 transition-colors border-t border-white/5"
                        >
                          <LogOut size={12} />
                          Disconnect
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 rounded-lg border border-white/10 text-white/60 hover:text-white"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                {mobileMenu ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        isActive
                          ? 'bg-neon-purple/10 text-white border border-neon-purple/20'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <Icon size={16} />
                    <span className="font-cyber text-xs tracking-widest">{label}</span>
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
