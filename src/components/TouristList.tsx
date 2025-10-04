import { Link } from 'react-router-dom'
import sitesData from '../data/tourist_sites.json'
import { MapPin, Star } from 'lucide-react'

interface Props {
  region: string
}

function TouristList({ region }: Props) {
  const sites = (sitesData as any).filter((s: any) => s.region === region)

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-6">
        {sites.map((site: any) => (
          <Link
            key={site.id}
            to={`/site/${site.id}`}
            className="group bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 hover:border-emerald-300 hover:scale-[1.02]"
          >
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img
                src={site.image}
                alt={site.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700">{site.region}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-emerald-700 transition-colors">
                  {site.name}
                </h3>
                <div className="flex items-center gap-1 bg-amber-50 rounded-full px-2 py-1">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs font-semibold text-amber-700">4.8</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {site.description}
              </p>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-medium text-cyan-600 bg-cyan-50 rounded-full px-3 py-1">
                  {site.category || "Attraction"}
                </span>
                <span className="text-sm font-semibold text-emerald-600">
                  Learn more →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {sites.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏞️</div>
          <p className="text-gray-500 text-lg">No tourist sites found for {region}</p>
          <p className="text-gray-400">Try selecting a different region</p>
        </div>
      )}
    </div>
  )
}

export default TouristList