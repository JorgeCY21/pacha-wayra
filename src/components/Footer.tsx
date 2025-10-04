import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative mt-10 text-gray-200 text-center overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1604089842857-4f6b5f2efc3f?auto=format&fit=crop&w=1400&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-[#1e3a8a]/80 backdrop-blur-sm"></div>

      {/* Contenido */}
      <div className="relative z-10 py-10 space-y-4">
        <h3 className="text-xl font-semibold text-yellow-400">
          Discover Peru responsibly 🌎
        </h3>

        <div className="flex justify-center gap-6 text-sm">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link to="/favorites" className="hover:text-yellow-400 transition">
            Favorites
          </Link>
          <a
            href="https://peru.travel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            Peru Travel
          </a>
        </div>

        <p className="text-xs text-gray-300">
          © 2025 <span className="text-yellow-400 font-medium">Pacha-Wayra</span>{" "}
          — Created with 💙 by Jorge Condorios
        </p>
      </div>
    </footer>
  );
}

export default Footer;
