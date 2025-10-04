import epidemicData from '../../public/data/epidemics.json'

interface Props {
  region: string
}

function Alerts({ region }: Props) {
  const alerts = (epidemicData as any).filter((e: any) => e.region === region)

  if (alerts.length === 0)
    return <p className="text-gray-500">No current epidemic or fauna alerts.</p>

  return (
    <div className="bg-red-50 p-4 rounded-2xl shadow">
      <h2 className="text-lg font-bold text-red-700">Health & Fauna Alerts</h2>
      <ul className="list-disc ml-6">
        {alerts.map((a: any, i: number) => (
          <li key={i}>
            <strong>{a.title}:</strong> {a.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Alerts
