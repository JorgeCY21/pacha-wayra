import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import sitesData from '../../public/data/tourist_sites.json'
import 'leaflet/dist/leaflet.css'

interface Props {
  region: string
}

function MapView({ region }: Props) {
  const sites = (sitesData as any).filter((s: any) => s.region === region)

  return (
    <div className="h-96 rounded-2xl overflow-hidden shadow">
      <MapContainer
        center={[-9.19, -75.0152]} // Center of Peru
        zoom={5}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sites.map((site: any) => (
          <Marker key={site.id} position={[site.lat, site.lng]}>
            <Popup>
              <strong>{site.name}</strong>
              <br />
              {site.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView
