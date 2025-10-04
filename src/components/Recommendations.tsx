import weatherData from '../../public/data/weather.json'

interface Props {
  region: string
}

function Recommendations({ region }: Props) {
  const data = (weatherData as any).find((w: any) => w.region === region)
  if (!data) return null

  let advice = 'Wear comfortable clothes.'
  if (data.temperature < 15) advice = 'Use warm clothing, jacket, and boots.'
  else if (data.temperature > 25) advice = 'Use light clothes, hat, and sunscreen.'
  else advice = 'A sweater and comfortable shoes are recommended.'

  return (
    <div className="bg-secondary p-4 rounded-2xl shadow text-primary">
      <h2 className="text-lg font-bold">Clothing Recommendation</h2>
      <p>{advice}</p>
    </div>
  )
}

export default Recommendations
