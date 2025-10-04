export function StatsCard({ icon: Icon, label, value, trend, color = 'blue' }) {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      yellow: 'bg-yellow-50 text-yellow-600',
      purple: 'bg-purple-50 text-purple-600',
    };
  
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
            <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
  
            {trend && (
              <p className="text-sm text-gray-500 mt-2">
                {trend}
              </p>
            )}
          </div>
  
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-8 h-8" />
          </div>
        </div>
      </div>
    );
  }
  