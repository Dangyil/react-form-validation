import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Menu, X, Home, Package, BarChart3, Settings, LogOut, User } from 'lucide-react';

export default function DashboardNav({ activeSection, setActiveSection }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
    // { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:flex md:w-64 md:h-screen md:flex-col md:bg-gray-900 md:text-white md:z-40">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-primary-500">Dashboard</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 ${
                activeSection === id
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-gray-700 p-4">
          <div className="mb-4 pb-4 border-b border-gray-700">
            <p className="text-sm text-gray-400">Logged in as</p>
            <p className="font-semibold truncate">{user?.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-primary-500">Dashboard</h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-gray-700 bg-gray-900">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleNavClick(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 ${
                    activeSection === id
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile User Info */}
            <div className="border-t border-gray-700 p-4">
              <div className="mb-4 pb-4 border-b border-gray-700">
                <p className="text-sm text-gray-400">Logged in as</p>
                <p className="font-semibold truncate">{user?.username}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition duration-200"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
