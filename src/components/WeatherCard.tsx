import weatherData from '../data/weather.json'
import { Thermometer, Wind, Gauge, Droplets, CloudRain, Snowflake, WindIcon } from 'lucide-react'

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
      case 'snowy': return '❄️'
      case 'windy': return '💨'
      default: return '🌈'
    }
  }

  // Datos de ejemplo para los nuevos campos (deberás actualizar tu JSON)
  const weatherDetails = {
    temperature: data.temperature,
    windSpeed: data.windSpeed || '15 km/h', // Ejemplo
    pressure: data.pressure || '1013 hPa', // Ejemplo
    humidity: data.humidity,
    rain: data.rain || '30%', // Ejemplo
    snow: data.snow || '0%', // Ejemplo
    dust: data.dust || 'Low' // Ejemplo
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyan-100 rounded-xl">
          <Thermometer className="text-cyan-600" size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Weather in {region}</h2>
      </div>
      
      {/* Temperatura Principal y Icono */}
      <div className="flex items-center justify-between bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4">
        <div className="text-4xl">
          {getWeatherIcon(data.forecast)}
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-800">{weatherDetails.temperature}°C</div>
          <div className="text-sm text-gray-600 capitalize">{data.forecast}</div>
        </div>
      </div>

      {/* Grid de Métricas Detalladas */}
      <div className="grid grid-cols-2 gap-3">
        {/* Viento */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Wind size={18} className="text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">VIENTO</div>
            <div className="text-sm font-semibold text-gray-800">{weatherDetails.windSpeed}</div>
          </div>
        </div>

        {/* Presión Atmosférica */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Gauge size={18} className="text-purple-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">PRESIÓN</div>
            <div className="text-sm font-semibold text-gray-800">{weatherDetails.pressure}</div>
          </div>
        </div>

        {/* Humedad */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <Droplets size={18} className="text-cyan-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">HUMEDAD</div>
            <div className="text-sm font-semibold text-gray-800">{weatherDetails.humidity}%</div>
          </div>
        </div>

        {/* Lluvia */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="p-2 bg-blue-100 rounded-lg">
            <CloudRain size={18} className="text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">LLUVIA</div>
            <div className="text-sm font-semibold text-gray-800">{weatherDetails.rain}</div>
          </div>
        </div>

        {/* Nieve */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <Snowflake size={18} className="text-cyan-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">NIEVE</div>
            <div className="text-sm font-semibold text-gray-800">{weatherDetails.snow}</div>
          </div>
        </div>

        {/* Polvo */}
        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="p-2 bg-amber-100 rounded-lg">
            <WindIcon size={18} className="text-amber-600" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">POLVO</div>
            <div className="text-sm font-semibold text-gray-800">{weatherDetails.dust}</div>
          </div>
        </div>
      </div>

      {/* Feels Like */}
      <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-3">
        <Thermometer size={18} className="text-orange-500" />
        <span className="text-sm font-medium text-gray-700">Feels like</span>
        <span className="text-sm font-bold text-gray-800">{weatherDetails.temperature + 2}°C</span>
      </div>
    </div>
  )
}

export default WeatherCard