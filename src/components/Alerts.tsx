import epidemicData from '../data/epidemics.json'
import { AlertTriangle, Shield } from 'lucide-react'

interface Props {
  region: string
}

function Alerts({ region }: Props) {
  const alerts = (epidemicData as any).filter((e: any) => e.region === region)

  if (alerts.length === 0)
    return (
      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
          <Shield className="text-green-600" size={24} />
        </div>
        <div>
          <p className="font-semibold text-green-800">All Clear</p>
          <p className="text-sm text-green-600">No alerts in {region}</p>
        </div>
      </div>
    )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-100 rounded-xl">
          <AlertTriangle className="text-red-600" size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">Alerts in {region}</h2>
      </div>

      <div className="space-y-3">
        {alerts.map((alert: any, i: number) => (
          <div key={i} className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800">{alert.title}</h3>
                <p className="text-sm text-red-700 mt-1">{alert.description}</p>
                {alert.recommendation && (
                  <p className="text-xs text-red-600 mt-2 font-medium">
                    💡 {alert.recommendation}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Alerts