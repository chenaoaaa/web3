import { create } from 'zustand'

interface WalletState {
  connected: boolean
  address: string | null
  balance: number
  nxsBalance: number
  chainId: number
  connecting: boolean
}

interface GameState {
  currentGame: string | null
  playerRank: number
  totalEarnings: number
  gamesPlayed: number
  winRate: number
}

interface AppState {
  wallet: WalletState
  game: GameState
  notifications: Notification[]
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  addNotification: (notif: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
}

const mockAddress = '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')

export const useAppStore = create<AppState>((set, get) => ({
  wallet: {
    connected: false,
    address: null,
    balance: 0,
    nxsBalance: 0,
    chainId: 1,
    connecting: false,
  },
  game: {
    currentGame: null,
    playerRank: 1247,
    totalEarnings: 45230,
    gamesPlayed: 328,
    winRate: 68.5,
  },
  notifications: [],

  connectWallet: async () => {
    set(state => ({ wallet: { ...state.wallet, connecting: true } }))
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    set(state => ({
      wallet: {
        ...state.wallet,
        connected: true,
        address: mockAddress,
        balance: 2.847,
        nxsBalance: 15420,
        connecting: false,
      }
    }))

    get().addNotification({
      type: 'success',
      title: 'Wallet Connected',
      message: 'MetaMask connected successfully!',
    })
  },

  disconnectWallet: () => {
    set(state => ({
      wallet: {
        ...state.wallet,
        connected: false,
        address: null,
        balance: 0,
        nxsBalance: 0,
      }
    }))
  },

  addNotification: (notif) => {
    const id = Math.random().toString(36).substr(2, 9)
    set(state => ({
      notifications: [...state.notifications, { ...notif, id }]
    }))
    setTimeout(() => {
      get().removeNotification(id)
    }, 4000)
  },

  removeNotification: (id) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }))
  },
}))
