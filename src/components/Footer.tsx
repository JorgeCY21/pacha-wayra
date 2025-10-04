import { Sun, Leaf, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="relative mt-5 text-white text-center overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1604089842857-4f6b5f2efc3f?auto=format&fit=crop&w=1400&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-emerald-700 to-emerald-800/90 backdrop-blur-sm"></div>

      {/* Contenido */}
      <div className="relative z-10 py-6 px-4 md:px-12 space-y-3 max-w-7xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold flex justify-center items-center gap-2">
          <Sun size={20} /> Discover Peru Responsibly
        </h3>

        <p className="text-sm md:text-md text-emerald-100 max-w-2xl mx-auto">
          Explore the beauty, culture, and nature of Peru sustainably — all in one app.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-emerald-200 text-xs md:text-sm mt-3">
          <div className="flex items-center gap-1.5">
            <MapPin size={16} /> Arequipa, Peru
          </div>
          <div className="flex items-center gap-1.5">
            <Leaf size={16} /> Eco-friendly App
          </div>
        </div>

        <p className="text-xs text-emerald-200 mt-2">
          © 2025{" "}
          <span className="text-yellow-300 font-medium">Pacha-Wayra</span> — Created with 💙 by <strong>Los Desorbitados</strong>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
