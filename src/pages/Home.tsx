import WeatherCard from "../components/WeatherCard"
import Recommendations from "../components/Recommendations"
import Alerts from "../components/Alerts"
import TouristList from "../components/TouristList"
import SearchFilter from "../components/SearchFilter"
import MapView from "../components/MapView"
import { useState } from "react"
import { motion } from "framer-motion"
import { Leaf, Sun, MapPin } from "lucide-react"

function Home() {
  const [region, setRegion] = useState("Cusco")

  return (
    <div className="space-y-16">
      {/* 🌄 Hero Section */}
      <motion.section
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-700 via-teal-600 to-emerald-800 text-white shadow-2xl p-14 text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Imagen de fondo con overlay */}
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1597076537067-9cd994daebf6?auto=format&fit=crop&q=80')] bg-cover bg-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-emerald-800/70 to-emerald-900/70" />

        <div className="relative z-10 space-y-4">
          <h1 className="text-5xl font-extrabold drop-shadow-xl">
            🌿 Welcome to Pacha-Wayra
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Discover Peru’s wonders — climate, alerts and nature insights, beautifully integrated in one app.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <span className="bg-white text-emerald-700 px-5 py-2 rounded-full font-semibold shadow hover:bg-emerald-100 transition">
              {region}
            </span>
          </div>
        </div>
      </motion.section>

      {/* 🔍 Search and main content */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Columna izquierda */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-transform hover:-translate-y-1">
            <h3 className="text-emerald-700 font-semibold mb-3 flex items-center gap-2">
              <MapPin size={20} /> Select a Region
            </h3>
            <SearchFilter onRegionChange={setRegion} />
          </div>

          <div className="bg-gradient-to-br from-emerald-100 to-teal-50 rounded-2xl p-6 shadow-inner">
            <WeatherCard region={region} />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
            <Recommendations region={region} />
          </div>

          <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100 rounded-2xl p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-transform hover:-translate-y-1">
            <Alerts region={region} />
          </div>
        </motion.div>

        {/* Columna derecha */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-transform hover:-translate-y-1">
            <h3 className="text-emerald-700 font-semibold mb-4 flex items-center gap-2">
              <Leaf size={20} /> Tourist Attractions
            </h3>
            <TouristList region={region} />
          </div>

          <div className="bg-gradient-to-tr from-teal-100 via-green-50 to-emerald-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-1">
            <MapView region={region} />
          </div>
        </motion.div>
      </div>

      {/* ☀️ Footer-style closing banner */}
      <motion.div
        className="text-center py-12 bg-gradient-to-r from-teal-600 to-emerald-700 text-white rounded-3xl shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-xl font-semibold flex justify-center items-center gap-3">
          <Sun size={24} /> Enjoy your journey through Peru with{" "}
          <span className="font-extrabold">Pacha-Wayra</span> 🌄
        </p>
      </motion.div>
    </div>
  )
}

export default Home
