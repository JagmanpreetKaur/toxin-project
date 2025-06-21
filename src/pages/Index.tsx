import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wind, Droplets, Mountain, Zap, Moon, Sun, Globe, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const toxinCategories = [
  {
    id: 'air',
    title: 'Air Toxins',
    icon: Wind,
    description: 'Monitor PM2.5, PM10, NO₂, SO₂, CO, O₃, and AQI levels',
    color: 'from-blue-500 to-cyan-500',
    hoverColor: 'hover:from-blue-600 hover:to-cyan-600',
    companies: 24,
    status: 'moderate'
  },
  {
    id: 'water',
    title: 'Water Toxins',
    icon: Droplets,
    description: 'Track pH, BOD, COD, Arsenic, Lead, Mercury levels',
    color: 'from-blue-600 to-blue-800',
    hoverColor: 'hover:from-blue-700 hover:to-blue-900',
    companies: 18,
    status: 'safe'
  },
  {
    id: 'soil',
    title: 'Soil Toxins',
    icon: Mountain,
    description: 'Analyze pH, Nitrate, Cadmium, Chromium, Zinc content',
    color: 'from-amber-600 to-orange-600',
    hoverColor: 'hover:from-amber-700 hover:to-orange-700',
    companies: 12,
    status: 'dangerous'
  },
  {
    id: 'radioactive',
    title: 'Radioactive',
    icon: Zap,
    description: 'Monitor Alpha, Beta, Gamma Radiation, Radon levels',
    color: 'from-purple-600 to-pink-600',
    hoverColor: 'hover:from-purple-700 hover:to-pink-700',
    companies: 6,
    status: 'safe'
  }
];

const statusColors = {
  safe: 'bg-green-500',
  moderate: 'bg-yellow-500',
  dangerous: 'bg-red-500'
};

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-blue-50'}`}>
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Wind className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">EcoMonitor</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Button variant="ghost" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                EN
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Environmental Pollution
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
              Monitoring Platform
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time monitoring and accountability for industrial environmental compliance. 
            Track air, water, soil, and radioactive pollution from companies across your region.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">60</div>
            <div className="text-gray-600 dark:text-gray-300">Companies Monitored</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">247</div>
            <div className="text-gray-600 dark:text-gray-300">Active Sensors</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Real-time Monitoring</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">98%</div>
            <div className="text-gray-600 dark:text-gray-300">Data Accuracy</div>
          </div>
        </div>

        {/* Toxin Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {toxinCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                to={`/${category.id}/companies`}
                className="group"
              >
                <div className={`relative bg-gradient-to-br ${category.color} ${category.hoverColor} rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-3 h-3 rounded-full ${statusColors[category.status]} animate-pulse`}></div>
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-6">
                    <IconComponent className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                  <p className="text-white/80 mb-6 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold">{category.companies}</div>
                      <div className="text-white/70 text-sm">Companies</div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        category.status === 'safe' ? 'bg-green-500/20 text-green-100' :
                        category.status === 'moderate' ? 'bg-yellow-500/20 text-yellow-100' :
                        'bg-red-500/20 text-red-100'
                      }`}>
                        {category.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/analytics" className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">View Analytics</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Industry comparisons & trends</div>
              </div>
            </Link>
            
            <Link to="/alerts" className="flex items-center p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Active Alerts</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Threshold violations</div>
              </div>
            </Link>
            
            <Link to="/reports" className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">Download Reports</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Export compliance data</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;