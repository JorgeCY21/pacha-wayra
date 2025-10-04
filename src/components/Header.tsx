// components/Header.tsx
import { Link, useLocation } from "react-router-dom";
import { Mountain, Sun } from "lucide-react";

function Header() {
  const location = useLocation();

  return (
    <header className="w-full fixed top-0 left-0 z-50 shadow-lg">
      <div className="bg-gradient-to-r from-teal-600 via-emerald-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5 md:py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <Mountain className="w-8 h-8 text-white" />
            <span className="font-extrabold text-2xl md:text-3xl tracking-wide">
              Pacha-Wayra
            </span>
          </Link>

          {/* Navegación */}
          <nav className="flex gap-6 text-lg md:text-xl font-medium">
            <Link
              to="/"
              className={`relative px-2 py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 after:transition-all ${
                location.pathname === "/" 
                  ? "text-yellow-300 after:w-full" 
                  : "hover:text-yellow-200 hover:after:w-full"
              }`}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className={`relative px-2 py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-300 after:transition-all ${
                location.pathname === "/favorites"
                  ? "text-yellow-300 after:w-full"
                  : "hover:text-yellow-200 hover:after:w-full"
              }`}
            >
              Favorites
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
