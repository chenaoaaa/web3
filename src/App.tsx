import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import GamesPage from './pages/GamesPage'
import NFTMarketPage from './pages/NFTMarketPage'
import WalletPage from './pages/WalletPage'
import LeaderboardPage from './pages/LeaderboardPage'
import Notifications from './components/Notifications'
import ParticleField from './components/ParticleField'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-bg relative overflow-x-hidden">
        {/* Animated Background */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        
        {/* Cyber Grid */}
        <div className="cyber-grid fixed inset-0 pointer-events-none z-0" />
        
        {/* Scan Line */}
        <div className="scan-line" />
        
        {/* Particles */}
        <ParticleField />
        
        {/* Main Content */}
        <div className="relative z-10">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/nft" element={<NFTMarketPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
            </Routes>
          </AnimatePresence>
        </div>
        
        {/* Notifications */}
        <Notifications />
      </div>
    </BrowserRouter>
  )
}

export default App
