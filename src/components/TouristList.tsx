import { Link } from 'react-router-dom'
import sitesData from '../../public/data/tourist_sites.json'

interface Props {
  region: string
}

function TouristList({ region }: Props) {
  const sites = (sitesData as any).filter((s: any) => s.region === region)

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Tourist Sites in {region}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sites.map((site: any) => (
          <Link
            key={site.id}
            to={`/site/${site.id}`}
            className="bg-white p-3 rounded-2xl shadow hover:shadow-lg transition"
          >
            <img
              src={site.image}
              alt={site.name}
              className="rounded-xl mb-2 h-40 w-full object-cover"
              loading="lazy"
            />
            <h3 className="font-semibold">{site.name}</h3>
            <p className="text-sm text-gray-600">{site.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TouristList
// refactor: update language attribute, clean up App component, and enhance styling with Tailwind CSS