import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SchedulePage from './pages/SchedulePage'
import TeamsPage from './pages/TeamsPage'
import VotingPage from './pages/VotingPage'
import ResultsPage from './pages/ResultsPage'
import type { Page } from './types'

const pageComponents: Record<Page, React.ComponentType<any>> = {
  home: HomePage,
  schedule: SchedulePage,
  teams: TeamsPage,
  voting: VotingPage,
  results: ResultsPage,
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const PageComponent = pageComponents[currentPage]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 255, 136, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <ParticleBackground />

      {/* Navigation */}
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PageComponent onNavigate={setCurrentPage} />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
