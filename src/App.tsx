import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import SiteDetail from "./pages/SiteDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f0fdfa] via-[#e0f7fa] to-[#e0f2fe] text-slate-800 font-sans">
      <Header />

      <main className="flex-grow max-w-5xl mx-auto pt-28 px-6">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="/site/:id" element={<SiteDetail />} />
  </Routes>
</main>

      <Footer />
    </div>
  );
}

export default App;
