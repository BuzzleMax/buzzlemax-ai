import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/use-theme'
import { LandingPage } from '@/pages/LandingPage'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App

