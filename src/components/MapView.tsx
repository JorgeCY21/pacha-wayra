import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import sitesData from '../data/tourist_sites.json'
import { Calendar, Sun, CloudRain, Snowflake } from 'lucide-react'

interface Props {
  region: string
  date: Date
}

function MapView({ region, date }: Props) {
  const sites = (sitesData as any).filter((s: any) => s.region === region)

  // Get seasonal info for map popups
  const getSeasonalInfo = (selectedDate: Date) => {
    const month = selectedDate.getMonth();
    const daysFromNow = Math.ceil((selectedDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    const season = getSeason(month);
    const isRainySeason = month >= 11 || month <= 3;
    const isWinter = month >= 5 && month <= 9;
    
    return {
      season,
      isRainySeason,
      isWinter,
      daysFromNow,
      weatherNote: isRainySeason ? 'Rainy season - pack accordingly' : 
                   isWinter ? 'Cooler temperatures expected' : 
                   'Ideal dry season conditions'
    };
  };

  const getSeason = (month: number) => {
    if (month >= 11 || month <= 2) return 'summer';
    if (month >= 3 && month <= 5) return 'autumn';
    if (month >= 6 && month <= 8) return 'winter';
    return 'spring';
  };

  const seasonalInfo = getSeasonalInfo(date);

  return (
    <div className="h-96 rounded-2xl overflow-hidden shadow">
      {/* Map Header */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Regional Map</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            {seasonalInfo.daysFromNow > 0 && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                +{seasonalInfo.daysFromNow}d
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {seasonalInfo.weatherNote} • {seasonalInfo.season} season
        </p>
      </div>

      <MapContainer
        center={[-9.19, -75.0152] as [number, number]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sites.map((site: any) => {
          const siteSeasonalInfo = getSeasonalInfo(date);
          const getWeatherIcon = () => {
            if (siteSeasonalInfo.isRainySeason) return '🌧️';
            if (siteSeasonalInfo.isWinter) return '❄️';
            return '☀️';
          };

          return (
            <Marker key={site.id} position={[site.lat, site.lng] as [number, number]}>
              <Popup>
                <div className="min-w-[200px]">
                  <div className="flex items-start justify-between mb-2">
                    <strong className="text-lg">{site.name}</strong>
                    <span className="text-2xl">{getWeatherIcon()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{site.description}</p>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Region:</span>
                      <span>{site.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Season:</span>
                      <span className="capitalize">{siteSeasonalInfo.season}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Forecast:</span>
                      <span>{siteSeasonalInfo.weatherNote}</span>
                    </div>
                    {siteSeasonalInfo.daysFromNow > 30 && (
                      <div className="text-orange-600 font-medium">
                        Long-term forecast - check updates
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  )
}

export default MapView