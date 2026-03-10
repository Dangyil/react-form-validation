
export default function AnalyticsSection({
    stats,
}) {

    return(
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Insights</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Products in Stock:</span>
                    <span className="font-bold text-primary-500">{stats?.totalProducts || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="font-bold">{stats?.totalQuantity || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Inventory Value:</span>
                    <span className="font-bold">${(stats?.totalValue || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h3>
                <div className="space-y-2">
                  {stats?.lowStockProducts > 0 ? (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
                      ⚠️ {stats.lowStockProducts} item(s) with low stock (&lt; 5 units)
                    </div>
                  ) : (
                    <div className="p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
                      ✅ All items are well-stocked
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
    )
}