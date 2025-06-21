import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, AlertTriangle, CheckCircle, Clock, Wifi, WifiOff, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const companyDetails = {
  'tata-steel-jamshedpur': {
    name: 'Tata Steel Jamshedpur',
    industry: 'Steel Manufacturing',
    location: 'Sakchi, Jamshedpur, Jharkhand',
    contact: '+91-657-665-7777',
    email: 'environment@tatasteel.com',
    status: 'moderate',
    compliance: 74,
    aqi: 156,
    logo: '🏭',
    established: '1907',
    employees: '80,000+',
    capacity: '13 MTPA'
  },
  'jusco-power': {
    name: 'JUSCO Power Plant',
    industry: 'Power Generation',
    location: 'Adityapur, Jamshedpur, Jharkhand',
    contact: '+91-657-665-8888',
    email: 'environment@jusco.co.in',
    status: 'dangerous',
    compliance: 42,
    aqi: 198,
    logo: '⚡',
    established: '1992',
    employees: '5,000+',
    capacity: '240 MW'
  },
  'tinplate-company': {
    name: 'Tinplate Company of India',
    industry: 'Metal Processing',
    location: 'Golmuri, Jamshedpur, Jharkhand',
    contact: '+91-657-665-9999',
    email: 'environment@tinplate.co.in',
    status: 'moderate',
    compliance: 68,
    aqi: 148,
    logo: '🔩',
    established: '1922',
    employees: '12,000+',
    capacity: '450,000 tonnes/year'
  },
  'usha-martin': {
    name: 'Usha Martin Limited',
    industry: 'Wire & Cable Manufacturing',
    location: 'Randhir Verma Chowk, Jamshedpur, Jharkhand',
    contact: '+91-657-665-0000',
    email: 'environment@ushamartin.com',
    status: 'safe',
    compliance: 87,
    aqi: 89,
    logo: '🔌',
    established: '1960',
    employees: '8,000+',
    capacity: '200,000 tonnes/year'
  },
  'tata-steel-water': {
    name: 'Tata Steel Water Treatment',
    industry: 'Steel Manufacturing',
    location: 'Kharkai River, Jamshedpur, Jharkhand',
    contact: '+91-657-665-7777',
    email: 'water@tatasteel.com',
    status: 'moderate',
    compliance: 63,
    aqi: 0,
    logo: '🏭',
    established: '1907',
    employees: '2,000+',
    capacity: '50 MLD'
  },
  'jusco-water': {
    name: 'JUSCO Water Supply',
    industry: 'Water Treatment',
    location: 'Dimna Lake, Jamshedpur, Jharkhand',
    contact: '+91-657-665-8888',
    email: 'water@jusco.co.in',
    status: 'safe',
    compliance: 91,
    aqi: 0,
    logo: '💧',
    established: '1992',
    employees: '1,500+',
    capacity: '200 MLD'
  },
  'karandih-effluent': {
    name: 'Karandih Industrial Area',
    industry: 'Industrial Effluent',
    location: 'Karandih, Jamshedpur, Jharkhand',
    contact: '+91-657-665-1111',
    email: 'environment@karandih.in',
    status: 'dangerous',
    compliance: 31,
    aqi: 0,
    logo: '🏭',
    established: '1985',
    employees: '5,000+',
    capacity: '25 MLD'
  },
  'adityapur-industrial': {
    name: 'Adityapur Industrial Area',
    industry: 'Mixed Industries',
    location: 'Adityapur, Jamshedpur, Jharkhand',
    contact: '+91-657-665-2222',
    email: 'environment@adityapur.in',
    status: 'dangerous',
    compliance: 23,
    aqi: 0,
    logo: '🏭',
    established: '1960',
    employees: '15,000+',
    capacity: 'Multiple facilities'
  },
  'tatanagar-soil': {
    name: 'Tatanagar Railway Area',
    industry: 'Transportation Hub',
    location: 'Tatanagar, Jamshedpur, Jharkhand',
    contact: '+91-657-665-3333',
    email: 'environment@tatanagar.in',
    status: 'moderate',
    compliance: 56,
    aqi: 0,
    logo: '🚂',
    established: '1919',
    employees: '8,000+',
    capacity: 'Major Junction'
  },
  'uranium-corporation': {
    name: 'Uranium Corporation of India',
    industry: 'Mining & Processing',
    location: 'Jaduguda Mine, Jamshedpur, Jharkhand',
    contact: '+91-657-665-4444',
    email: 'environment@ucil.gov.in',
    status: 'moderate',
    compliance: 78,
    aqi: 0,
    logo: '☢️',
    established: '1967',
    employees: '3,000+',
    capacity: '200 tonnes uranium/year'
  }
};

const timeSeriesData = [
  { time: '00:00', PM25: 65, NO2: 42, SO2: 18, AQI: 145 },
  { time: '04:00', PM25: 72, NO2: 45, SO2: 21, AQI: 152 },
  { time: '08:00', PM25: 89, NO2: 52, SO2: 28, AQI: 168 },
  { time: '12:00', PM25: 76, NO2: 48, SO2: 23, AQI: 156 },
  { time: '16:00', PM25: 68, NO2: 41, SO2: 19, AQI: 148 },
  { time: '20:00', PM25: 71, NO2: 44, SO2: 22, AQI: 151 }
];

const pollutantDistribution = [
  { name: 'PM2.5', value: 35, color: '#8884d8' },
  { name: 'PM10', value: 28, color: '#82ca9d' },
  { name: 'NO₂', value: 20, color: '#ffc658' },
  { name: 'SO₂', value: 12, color: '#ff7300' },
  { name: 'CO', value: 5, color: '#00ff00' }
];

const industryComparison = [
  { company: 'Tata Steel', value: 156, status: 'moderate' },
  { company: 'JUSCO Power', value: 198, status: 'dangerous' },
  { company: 'Tinplate Co.', value: 134, status: 'moderate' },
  { company: 'Usha Martin', value: 89, status: 'safe' },
  { company: 'Others', value: 165, status: 'dangerous' }
];

const sensors = [
  { id: 'TS_AIR_001', type: 'PM2.5 Monitor', status: 'online', lastData: '30 sec ago', value: '76 µg/m³', location: 'Stack 1' },
  { id: 'TS_AIR_002', type: 'NO₂ Analyzer', status: 'online', lastData: '45 sec ago', value: '48 ppb', location: 'Stack 2' },
  { id: 'TS_AIR_003', type: 'SO₂ Monitor', status: 'maintenance', lastData: '2 hrs ago', value: '23 ppb', location: 'Stack 3' },
  { id: 'TS_AIR_004', type: 'CO Analyzer', status: 'offline', lastData: '8 hrs ago', value: '12 ppm', location: 'Furnace A' },
  { id: 'TS_AIR_005', type: 'O₃ Monitor', status: 'online', lastData: '1 min ago', value: '67 ppb', location: 'Perimeter' }
];

const statusColors = {
  safe: 'text-green-600 bg-green-50 border-green-200',
  moderate: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  dangerous: 'text-red-600 bg-red-50 border-red-200'
};

const CompanyDashboard = () => {
  const { toxinType, companyId } = useParams();
  const [timeRange, setTimeRange] = useState('24h');
  const company = companyDetails[companyId];

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Company not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return 'safe';
    if (aqi <= 100) return 'moderate';
    return 'dangerous';
  };

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-green-600';
    if (aqi <= 100) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusDisplay = () => {
    if (toxinType === 'air' && company.aqi > 0) {
      return {
        value: company.aqi,
        label: 'Air Quality Index',
        status: getAQIStatus(company.aqi),
        color: getAQIColor(company.aqi)
      };
    }
    return {
      value: `${company.compliance}%`,
      label: 'Compliance Score',
      status: company.status,
      color: company.status === 'safe' ? 'text-green-600' : company.status === 'moderate' ? 'text-yellow-600' : 'text-red-600'
    };
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to={`/${toxinType}/companies`} 
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Companies
            </Link>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter Data
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{company.logo}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
              <p className="text-gray-600">{company.industry} • Est. {company.established}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Company Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Company Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{company.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{company.contact}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-blue-600">{company.email}</span>
              </div>
            </CardContent>
          </Card>

          {/* Status Gauge */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">{statusDisplay.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`text-4xl font-bold ${statusDisplay.color} mb-2`}>
                {statusDisplay.value}
              </div>
              <Badge className={statusColors[statusDisplay.status]}>
                {statusDisplay.status.toUpperCase()}
              </Badge>
              <div className="text-xs text-gray-500 mt-2">Last updated: 2 min ago</div>
            </CardContent>
          </Card>

          {/* Compliance */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Compliance Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {company.compliance}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${company.compliance}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">Monthly Average</div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Overall Status</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex items-center justify-center mb-2">
                {company.status === 'safe' && <CheckCircle className="w-8 h-8 text-green-500" />}
                {company.status === 'moderate' && <Clock className="w-8 h-8 text-yellow-500" />}
                {company.status === 'dangerous' && <AlertTriangle className="w-8 h-8 text-red-500" />}
              </div>
              <Badge className={statusColors[company.status]}>
                {company.status.toUpperCase()}
              </Badge>
              <div className="text-xs text-gray-500 mt-2">5 sensors active</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Time Series Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pollutant Trends (Last 24 Hours)</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant={timeRange === '24h' ? 'default' : 'outline'} size="sm" onClick={() => setTimeRange('24h')}>24H</Button>
                      <Button variant={timeRange === '7d' ? 'default' : 'outline'} size="sm" onClick={() => setTimeRange('7d')}>7D</Button>
                      <Button variant={timeRange === '30d' ? 'default' : 'outline'} size="sm" onClick={() => setTimeRange('30d')}>30D</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="PM25" stroke="#8884d8" strokeWidth={2} name="PM2.5" />
                      <Line type="monotone" dataKey="NO2" stroke="#82ca9d" strokeWidth={2} name="NO₂" />
                      <Line type="monotone" dataKey="SO2" stroke="#ffc658" strokeWidth={2} name="SO₂" />
                      <Line type="monotone" dataKey="AQI" stroke="#ff7300" strokeWidth={2} name="AQI" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pollutant Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Pollutant Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pollutantDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pollutantDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Industry Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Industry Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={industryComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="company" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historical Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-500 py-8">
                  Historical trend data will be displayed here with advanced filtering options.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sensors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sensor Network Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sensors.map((sensor) => (
                    <div key={sensor.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{sensor.type}</h4>
                        <div className="flex items-center space-x-1">
                          {sensor.status === 'online' && <Wifi className="w-4 h-4 text-green-500" />}
                          {sensor.status === 'offline' && <WifiOff className="w-4 h-4 text-red-500" />}
                          {sensor.status === 'maintenance' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                          <Badge className={
                            sensor.status === 'online' ? 'bg-green-100 text-green-800' :
                            sensor.status === 'offline' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {sensor.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>ID: {sensor.id}</div>
                        <div>Location: {sensor.location}</div>
                        <div>Last reading: {sensor.lastData}</div>
                      </div>
                      <div className="text-lg font-semibold text-blue-600">
                        {sensor.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center text-gray-500 py-8">
                    Report generation interface will be available here with options for PDF, CSV, and Excel exports.
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF Report
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDashboard;