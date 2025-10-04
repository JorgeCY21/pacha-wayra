interface WeatherData {
  region: string
  temperature: number
  humidity: number
  forecast: string
  icon?: string
}

interface Props {
  data: WeatherData
}

function WeatherCard({ data }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 w-72 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-emerald-100">
      
      {/* Weather Icon */}
      {data.icon && (
        <img
          src={data.icon}
          alt={data.forecast}
          className="w-16 h-16 mb-3 drop-shadow-md"
        />
      )}

      {/* Region Name */}
      <h2 className="text-xl font-semibold text-emerald-700 mb-1">
        {data.region}
      </h2>

      {/* Temperature */}
      <p className="text-5xl font-bold text-sky-600">
        {data.temperature}°C
      </p>

      {/* Humidity */}
      <p className="text-sm text-gray-600 mt-1">
        Humidity: {data.humidity}%
      </p>

      {/* Forecast description */}
      <p className="text-base text-gray-700 mt-3 capitalize">
        {data.forecast}
      </p>
    </div>
  )
}

export default WeatherCard
