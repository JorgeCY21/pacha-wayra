import { useParams } from 'react-router-dom'
import sitesData from '../data/tourist_sites.json'

function SiteDetail() {
  const { id } = useParams()
  const site = (sitesData as any).find((s: any) => s.id === Number(id))

  if (!site) return <p>Site not found.</p>

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (!favorites.find((f: any) => f.id === site.id)) {
      favorites.push(site)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      alert('Added to favorites!')
    } else {
      alert('Already in favorites.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">
      <img
        src={site.image}
        alt={site.name}
        className="rounded-xl w-full h-80 object-cover mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{site.name}</h1>
      <p className="text-gray-600 mb-4">{site.description}</p>

      <button
        onClick={handleFavorite}
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        ❤️ Add to Favorites
      </button>
    </div>
  )
}

export default SiteDetail
