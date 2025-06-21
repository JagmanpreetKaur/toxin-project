import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, AlertTriangle, CheckCircle, Clock, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const companyData = {
  air: [
    {
      id: 'tata-steel-jamshedpur',
      name: 'Tata Steel Jamshedpur',
      industry: 'Steel Manufacturing',
      location: 'Sakchi, Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['PM2.5: 89 µg/m³', 'NO₂: 52 ppb', 'SO₂: 34 ppb'],
      compliance: '74%',
      lastUpdate: '2 min ago',
      logo: '🏭'
    },
    {
      id: 'jusco-power',
      name: 'JUSCO Power Plant',
      industry: 'Power Generation',
      location: 'Adityapur, Jamshedpur, Jharkhand',
      status: 'dangerous',
      pollutants: ['PM10: 156 µg/m³', 'CO: 15 ppm', 'O₃: 78 ppb'],
      compliance: '42%',
      lastUpdate: '3 min ago',
      logo: '⚡'
    },
    {
      id: 'tinplate-company',
      name: 'Tinplate Company of India',
      industry: 'Metal Processing',
      location: 'Golmuri, Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['PM2.5: 67 µg/m³', 'NO₂: 41 ppb', 'SO₂: 28 ppb'],
      compliance: '68%',
      lastUpdate: '1 min ago',
      logo: '🔩'
    },
    {
      id: 'usha-martin',
      name: 'Usha Martin Limited',
      industry: 'Wire & Cable Manufacturing',
      location: 'Randhir Verma Chowk, Jamshedpur, Jharkhand',
      status: 'safe',
      pollutants: ['PM2.5: 45 µg/m³', 'NO₂: 32 ppb', 'SO₂: 18 ppb'],
      compliance: '87%',
      lastUpdate: '4 min ago',
      logo: '🔌'
    }
  ],
  water: [
    {
      id: 'tata-steel-water',
      name: 'Tata Steel Water Treatment',
      industry: 'Steel Manufacturing',
      location: 'Kharkai River, Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['pH: 8.4', 'BOD: 52 mg/L', 'Iron: 1.2 mg/L'],
      compliance: '63%',
      lastUpdate: '5 min ago',
      logo: '🏭'
    },
    {
      id: 'jusco-water',
      name: 'JUSCO Water Supply',
      industry: 'Water Treatment',
      location: 'Dimna Lake, Jamshedpur, Jharkhand',
      status: 'safe',
      pollutants: ['pH: 7.2', 'Chlorine: 0.8 mg/L', 'TDS: 245 mg/L'],
      compliance: '91%',
      lastUpdate: '2 min ago',
      logo: '💧'
    },
    {
      id: 'karandih-effluent',
      name: 'Karandih Industrial Area',
      industry: 'Industrial Effluent',
      location: 'Karandih, Jamshedpur, Jharkhand',
      status: 'dangerous',
      pollutants: ['pH: 9.1', 'COD: 198 mg/L', 'Heavy Metals: 2.4 mg/L'],
      compliance: '31%',
      lastUpdate: '8 min ago',
      logo: '🏭'
    }
  ],
  soil: [
    {
      id: 'adityapur-industrial',
      name: 'Adityapur Industrial Area',
      industry: 'Mixed Industries',
      location: 'Adityapur, Jamshedpur, Jharkhand',
      status: 'dangerous',
      pollutants: ['Chromium: 167 mg/kg', 'Lead: 89 mg/kg', 'pH: 4.8'],
      compliance: '23%',
      lastUpdate: '15 min ago',
      logo: '🏭'
    },
    {
      id: 'tatanagar-soil',
      name: 'Tatanagar Railway Area',
      industry: 'Transportation Hub',
      location: 'Tatanagar, Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['PAH: 45 mg/kg', 'Oil & Grease: 78 mg/kg', 'pH: 6.2'],
      compliance: '56%',
      lastUpdate: '12 min ago',
      logo: '🚂'
    }
  ],
  radioactive: [
    {
      id: 'uranium-corporation',
      name: 'Uranium Corporation of India',
      industry: 'Mining & Processing',
      location: 'Jaduguda Mine, Jamshedpur, Jharkhand',
      status: 'moderate',
      pollutants: ['Alpha: 0.8 Bq/m³', 'Beta: 0.6 Bq/m³', 'Radon: 145 Bq/m³'],
      compliance: '78%',
      lastUpdate: '1 min ago',
      logo: '☢️'
    }
  ]
};

const toxinTitles = {
  air: 'Air Pollution Companies',
  water: 'Water Pollution Companies',
  soil: 'Soil Contamination Companies',
  radioactive: 'Radioactive Emission Companies'
};

const statusConfig = {
  safe: {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
    bgColor: 'bg-green-50'
  },
  moderate: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
    bgColor: 'bg-yellow-50'
  },
  dangerous: {
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: AlertTriangle,
    bgColor: 'bg-red-50'
  }
};

const CompanyList = () => {
  const { toxinType } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const companies = companyData[toxinType] || [];
  const title = toxinTitles[toxinType] || 'Companies';

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || company.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Categories
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-3xl font-bold text-gray-900">{title} - Jamshedpur</h1>
            </div>
            <div className="text-sm text-gray-500">
              {filteredCompanies.length} companies found
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search companies or industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="safe">Safe</option>
              <option value="moderate">Moderate</option>
              <option value="dangerous">Dangerous</option>
            </select>
          </div>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => {
            const statusInfo = statusConfig[company.status];
            const StatusIcon = statusInfo.icon;
            
            return (
              <Link
                key={company.id}
                to={`/${toxinType}/company/${company.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group-hover:border-blue-300">
                  {/* Header */}
                  <div className={`p-4 ${statusInfo.bgColor} border-b`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{company.logo}</span>
                        <Badge className={statusInfo.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {company.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        {company.compliance} compliance
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <Building className="w-4 h-4 mr-1" />
                      {company.industry}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      {company.location}
                    </div>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-semibold text-gray-900">Current Pollutant Levels:</h4>
                      {company.pollutants.map((pollutant, index) => (
                        <div key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
                          {pollutant}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Last updated: {company.lastUpdate}</span>
                      <span className="text-blue-600 group-hover:text-blue-800 font-medium">
                        View Dashboard →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;