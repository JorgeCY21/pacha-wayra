import epidemicData from '../data/epidemics.json'
import { AlertTriangle, Shield, Calendar, Info } from 'lucide-react'

interface Props {
  region: string
  date: Date
}

function Alerts({ region, date }: Props) {
  const baseAlerts = (epidemicData as any).filter((e: any) => e.region === region)

  // Filter and enhance alerts based on date
  const getDateSpecificAlerts = (alerts: any[], selectedDate: Date) => {
    const month = selectedDate.getMonth();
    const daysFromNow = Math.ceil((selectedDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    return alerts.map(alert => {
      let enhancedAlert = { ...alert };
      const season = getSeason(month);
      
      // Add seasonal context to alerts
      if (alert.seasonal && alert.season !== season) {
        enhancedAlert.severity = 'low';
        enhancedAlert.description += ` (Typically occurs in ${alert.season} season)`;
      }
      
      // Add timing context
      if (daysFromNow > 30) {
        enhancedAlert.description += ' - Long-term forecast may change';
      }
      
      return enhancedAlert;
    }).filter(alert => {
      // Filter out low severity alerts for distant future
      if (daysFromNow > 60 && alert.severity === 'low') return false;
      return true;
    });
  };

  const getSeason = (month: number) => {
    if (month >= 11 || month <= 2) return 'summer';
    if (month >= 3 && month <= 5) return 'autumn';
    if (month >= 6 && month <= 8) return 'winter';
    return 'spring';
  };

  const alerts = getDateSpecificAlerts(baseAlerts, date);
  const daysFromNow = Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  if (alerts.length === 0) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
          <Shield className="text-green-600" size={32} />
        </div>
        <div>
          <p className="font-semibold text-green-800 text-lg">All Clear</p>
          <p className="text-sm text-green-600 mb-2">No active alerts for {region}</p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Calendar size={12} />
            <span>
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              {daysFromNow > 0 && ` (${daysFromNow} day${daysFromNow !== 1 ? 's' : ''} ahead)`}
            </span>
          </div>
        </div>
      </div>
    )
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800' };
      case 'medium': return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800' };
      case 'low': return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800' };
      default: return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800' };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-xl">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Travel Alerts</h2>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Calendar size={14} />
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
        {daysFromNow > 30 && (
          <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
            <Info size={12} />
            <span>Long-term</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {alerts.map((alert: any, i: number) => {
          const colors = getAlertColor(alert.severity || 'medium');
          return (
            <div key={i} className={`${colors.bg} border ${colors.border} rounded-xl p-4`}>
              <div className="flex items-start gap-3">
                <AlertTriangle 
                  size={18} 
                  className={`${colors.text} mt-0.5 flex-shrink-0`} 
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className={`font-semibold ${colors.text}`}>{alert.title}</h3>
                    {alert.seasonal && (
                      <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600">
                        Seasonal
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{alert.description}</p>
                  {alert.recommendation && (
                    <p className="text-xs text-gray-600 mt-2 font-medium flex items-center gap-1">
                      <span>💡</span>
                      {alert.recommendation}
                    </p>
                  )}
                  {daysFromNow > 14 && (
                    <p className="text-xs text-gray-500 mt-2">
                      ⏰ Monitor updates as travel date approaches
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Alerts