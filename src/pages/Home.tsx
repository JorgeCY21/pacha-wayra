import WeatherCard from '../components/WeatherCard'
import Recommendations from '../components/Recommendations'
import Alerts from '../components/Alerts'
import TouristList from '../components/TouristList'
import SearchFilter from '../components/SearchFilter'
import MapView from '../components/MapView'
import { useState } from 'react'

function Home() {
  const [region, setRegion] = useState('Cusco')

  return (
    <div className="space-y-6">
      <SearchFilter onRegionChange={setRegion} />
      <Recommendations region={region} />
      <Alerts region={region} />
      <TouristList region={region} />
      <MapView region={region} />
    </div>
  )
}

export default Home
