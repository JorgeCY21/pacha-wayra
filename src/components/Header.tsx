// components/Header.tsx
import { Link, useLocation } from "react-router-dom";
import { Mountain } from "lucide-react";

function Header() {
  const location = useLocation();

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <div className="bg-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Mountain className="w-7 h-7 text-white" />
            <span className="font-bold text-2xl tracking-wide">Pacha-Wayra</span>
          </Link>

          {/* Navegación */}
          <nav className="flex gap-6 text-lg">
            <Link
              to="/"
              className={`transition-colors ${
                location.pathname === "/" ? "text-yellow-300" : "hover:text-yellow-200"
              }`}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className={`transition-colors ${
                location.pathname === "/favorites"
                  ? "text-yellow-300"
                  : "hover:text-yellow-200"
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
