import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  chatWidgetOpen: boolean
  currentTheme: 'light' | 'dark'
  chatPresetPrompt: string | null
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleMobileMenu: () => void
  setMobileMenuOpen: (open: boolean) => void
  toggleChatWidget: () => void
  setChatWidgetOpen: (open: boolean) => void
  openChatWithPrompt: (prompt: string) => void
  clearChatPrompt: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  mobileMenuOpen: false,
  chatWidgetOpen: false,
  currentTheme: 'light',
  chatPresetPrompt: null,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleChatWidget: () => set((state) => ({ chatWidgetOpen: !state.chatWidgetOpen })),
  setChatWidgetOpen: (open) => set({ chatWidgetOpen: open }),
  openChatWithPrompt: (prompt) => set({ chatWidgetOpen: true, chatPresetPrompt: prompt }),
  clearChatPrompt: () => set({ chatPresetPrompt: null }),
  setTheme: (theme) => set({ currentTheme: theme }),
}))
