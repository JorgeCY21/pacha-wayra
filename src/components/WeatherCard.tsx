import weatherData from '../data/weather.json'

interface Props {
  region: string
}

function WeatherCard({ region }: Props) {
  const data = (weatherData as any).find((w: any) => w.region === region)

  if (!data) return <p>No weather data available.</p>

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-2">Weather in {region}</h2>
      <p>🌡️ Temperature: {data.temperature}°C</p>
      <p>💧 Humidity: {data.humidity}%</p>
      <p>☁️ Forecast: {data.forecast}</p>
    </div>
  )
}

export default WeatherCard
