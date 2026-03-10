import { useAuth } from '../../hooks/useAuth';

export default function OverviewSection({
    stats,
    statsLoading,
    setActiveSection,
    setShowProductForm,
}) {

    const { user } = useAuth();

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>

            {/* User Profile Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-gray-600 text-sm">Username</p>
                            <p className="font-medium text-gray-900">{user?.username}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Email</p>
                            <p className="font-medium text-gray-900">{user?.email}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Started</h3>
                    <p className="text-gray-600 text-sm mb-4">
                        Start by adding your first product to your inventory.
                    </p>
                    <button
                        className="submit-btn"
                        onClick={() => {
                            setActiveSection('products');
                            setShowProductForm(true);
                        }}
                    >
                        Add First Product
                    </button>
                </div>
            </div>

            {statsLoading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Products Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600 text-sm">Total Products</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalProducts || 0}</p>
                    </div>

                    {/* Total Quantity Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600 text-sm">Total Quantity</p>
                        <p className="text-3xl font-bold text-primary-500 mt-2">{stats?.totalQuantity || 0}</p>
                    </div>

                    {/* Total Value Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600 text-sm">Inventory Value</p>
                        <p className="text-3xl font-bold text-secondary-500 mt-2">
                            ${(stats?.totalValue || 0).toFixed(2)}
                        </p>
                    </div>

                    {/* Low Stock Card */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <p className="text-gray-600 text-sm">Low Stock Items</p>
                        <p className="text-3xl font-bold text-red-600 mt-2">{stats?.lowStockProducts || 0}</p>
                    </div>
                </div>
            )}

        </div>)

}