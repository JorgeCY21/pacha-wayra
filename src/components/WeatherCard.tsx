import weatherData from '../data/weather.json'
import { Thermometer, Droplets, Cloud } from 'lucide-react'

interface Props {
  region: string
}

function WeatherCard({ region }: Props) {
  const data = (weatherData as any).find((w: any) => w.region === region)

  if (!data) return (
    <div className="text-center py-8">
      <p className="text-gray-500">No weather data available for {region}</p>
    </div>
  )

  const getWeatherIcon = (forecast: string) => {
    switch(forecast.toLowerCase()) {
      case 'sunny': return '☀️'
      case 'rainy': return '🌧️'
      case 'cloudy': return '☁️'
      case 'partly cloudy': return '⛅'
      default: return '🌈'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyan-100 rounded-xl">
          <Cloud className="text-cyan-600" size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Weather in {region}</h2>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-4xl">
          {getWeatherIcon(data.forecast)}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">{data.temperature}°C</div>
          <div className="text-sm text-gray-600 capitalize">{data.forecast}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="flex items-center gap-2">
          <Thermometer size={18} className="text-red-500" />
          <div>
            <div className="text-sm text-gray-600">Feels like</div>
            <div className="font-semibold text-gray-800">{data.temperature + 2}°C</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Droplets size={18} className="text-blue-500" />
          <div>
            <div className="text-sm text-gray-600">Humidity</div>
            <div className="font-semibold text-gray-800">{data.humidity}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard