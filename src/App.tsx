import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import SiteDetail from './pages/SiteDetail'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-emerald-100 to-teal-50 font-sans text-gray-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-emerald-700 to-teal-600 text-white shadow-lg z-50 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          <Link
            to="/"
            className="font-extrabold text-2xl tracking-wide flex items-center space-x-2 hover:text-yellow-300 transition"
          >
            <span>Pacha-Wayra 🌿</span>
          </Link>

          <div className="space-x-6 font-medium">
            <Link
              to="/"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Favorites
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenido animado */}
      <main className="flex-grow max-w-7xl mx-auto px-6 pt-24 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/site/:id" element={<SiteDetail />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-700 text-white text-center py-5 mt-auto shadow-inner">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">
            © {new Date().getFullYear()} <span className="font-semibold">Pacha-Wayra</span> — Discover Peru responsibly 🌎
          </p>
          <p className="text-xs mt-1 text-emerald-200">
            Built with ❤️ using React + TailwindCSS
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
