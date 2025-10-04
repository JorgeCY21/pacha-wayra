import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import SiteDetail from './pages/SiteDetail'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-primary text-white p-4 flex justify-between">
        <h1 className="font-bold text-xl">Pacha-Wayra 🌿</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/favorites" className="hover:underline">Favorites</Link>
        </div>
      </nav>

      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/site/:id" element={<SiteDetail />} />
        </Routes>
      </main>

      <footer className="bg-gray-800 text-white text-center py-3 text-sm">
        © 2025 Pacha-Wayra — Discover Peru responsibly
      </footer>
    </div>
  )
}

export default App
