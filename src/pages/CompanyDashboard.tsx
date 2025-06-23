import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, AlertTriangle, CheckCircle, Clock, Wifi, WifiOff, Download, Filter, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import MapComponent from '@/components/MapComponent';

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

const comparisonData = [
  { parameter: 'PM2.5', current: 76, limit: 60 },
  { parameter: 'NO₂', current: 48, limit: 80 },
  { parameter: 'SO₂', current: 23, limit: 80 },
  { parameter: 'CO', current: 12, limit: 10 },
  { parameter: 'O₃', current: 67, limit: 100 }
];

const sensors = [
  { id: 'TS_AIR_001', type: 'PM2.5 Monitor', status: 'online', lastData: '30 sec ago', value: '76 µg/m³', location: 'Stack 1' },
  { id: 'TS_AIR_002', type: 'NO₂ Analyzer', status: 'online', lastData: '45 sec ago', value: '48 ppb', location: 'Stack 2' },
  { id: 'TS_AIR_003', type: 'SO₂ Monitor', status: 'maintenance', lastData: '2 hrs ago', value: '23 ppb', location: 'Stack 3' },
  { id: 'TS_AIR_004', type: 'CO Analyzer', status: 'offline', lastData: '8 hrs ago', value: '12 ppm', location: 'Furnace A' },
  { id: 'TS_AIR_005', type: 'O₃ Monitor', status: 'online', lastData: '1 min ago', value: '67 ppb', location: 'Perimeter' }
];

const statusColors = {
  safe: 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800',
  moderate: 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800',
  dangerous: 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800'
};

// Live data generation
const generateLiveData = () => {
  const base = {
    PM25: 65 + Math.random() * 30,
    NO2: 42 + Math.random() * 20,
    SO2: 18 + Math.random() * 15,
    CO: 12 + Math.random() * 10,
    O3: 67 + Math.random() * 25
  };
  return {
    ...base,
    AQI: Math.round((base.PM25 + base.NO2 + base.SO2) / 3 * 1.5)
  };
};

// Historical data for different time ranges
const generateHistoricalData = (range: string) => {
  const points = range === '24h' ? 24 : range === '7d' ? 7 : range === '30d' ? 30 : 12;
  const data = [];
  
  for (let i = 0; i < points; i++) {
    const liveData = generateLiveData();
    data.push({
      time: range === '24h' ? `${i}:00` : 
            range === '7d' ? `Day ${i + 1}` : 
            range === '30d' ? `${i + 1}` : 
            `Month ${i + 1}`,
      ...liveData,
      timestamp: Date.now() - (points - i) * (range === '24h' ? 3600000 : range === '7d' ? 86400000 : range === '30d' ? 86400000 * 30 : 86400000 * 365)
    });
  }
  return data;
};

const radarData = [
  { subject: 'Air Quality', A: 120, B: 110, fullMark: 150 },
  { subject: 'Water Quality', A: 98, B: 130, fullMark: 150 },
  { subject: 'Soil Health', A: 86, B: 130, fullMark: 150 },
  { subject: 'Emissions', A: 99, B: 100, fullMark: 150 },
  { subject: 'Compliance', A: 85, B: 90, fullMark: 150 },
  { subject: 'Safety', A: 65, B: 85, fullMark: 150 }
];

const chartConfig = {
  PM25: {
    label: "PM2.5",
    color: "hsl(var(--chart-1))",
  },
  NO2: {
    label: "NO₂",
    color: "hsl(var(--chart-2))",
  },
  SO2: {
    label: "SO₂",
    color: "hsl(var(--chart-3))",
  },
  AQI: {
    label: "AQI",
    color: "hsl(var(--chart-4))",
  },
};

const CompanyDashboard = () => {
  const { toxinType, companyId } = useParams();
  const [timeRange, setTimeRange] = useState('24h');
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [liveData, setLiveData] = useState(generateLiveData());
  const [historicalData, setHistoricalData] = useState(generateHistoricalData('24h'));
  const [lastUpdated, setLastUpdated] = useState('10s ago');
  
  const company = companyDetails[companyId];

  useEffect(() => {
    // Update live data every 5 seconds
    const liveInterval = setInterval(() => {
      setLiveData(generateLiveData());
      const seconds = Math.floor(Math.random() * 60) + 1;
      setLastUpdated(`${seconds}s ago`);
    }, 5000);

    return () => clearInterval(liveInterval);
  }, []);

  useEffect(() => {
    setHistoricalData(generateHistoricalData(timeRange));
  }, [timeRange]);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Company not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
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
    if (aqi <= 50) return 'text-green-600 dark:text-green-400';
    if (aqi <= 100) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getStatusDisplay = () => {
    if (toxinType === 'air' && company.aqi > 0) {
      return {
        value: Math.round(liveData.AQI),
        label: 'Air Quality Index',
        status: getAQIStatus(liveData.AQI),
        color: getAQIColor(liveData.AQI)
      };
    }
    return {
      value: `${company.compliance}%`,
      label: 'Compliance Score',
      status: company.status,
      color: company.status === 'safe' ? 'text-green-600 dark:text-green-400' : 
             company.status === 'moderate' ? 'text-yellow-600 dark:text-yellow-400' : 
             'text-red-600 dark:text-red-400'
    };
  };

  const handleDownloadReport = () => {
    setShowDownloadDialog(true);
  };

  const confirmDownload = () => {
    setShowDownloadDialog(false);
    setTimeout(() => {
      alert('Report has been downloaded successfully!');
    }, 500);
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Download Confirmation Dialog */}
      {showDownloadDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Download Report</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Do you want to download the environmental report for {company.name}?</p>
            <div className="flex space-x-3">
              <Button onClick={confirmDownload} className="flex-1">
                Yes, Download
              </Button>
              <Button variant="outline" onClick={() => setShowDownloadDialog(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to={`/${toxinType}/companies`} 
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Companies
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Activity className="w-4 h-4 text-green-500" />
                <span>Live Data • Last Updated {lastUpdated} | NIT Jamshedpur</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Data
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{company.logo}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{company.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{company.industry} • Est. {company.established}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Live Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{Math.round(liveData.PM25)}</div>
              <div className="text-sm opacity-90">PM2.5 µg/m³</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{Math.round(liveData.NO2)}</div>
              <div className="text-sm opacity-90">NO₂ µg/m³</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{Math.round(liveData.SO2)}</div>
              <div className="text-sm opacity-90">SO₂ µg/m³</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{Math.round(liveData.CO)}</div>
              <div className="text-sm opacity-90">CO mg/m³</div>
            </CardContent>
          </Card>
          <Card className={`bg-gradient-to-r ${statusDisplay.status === 'safe' ? 'from-green-500 to-green-600' : 
                                               statusDisplay.status === 'moderate' ? 'from-yellow-500 to-yellow-600' : 
                                               'from-red-500 to-red-600'} text-white`}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{statusDisplay.value}</div>
              <div className="text-sm opacity-90">{statusDisplay.label}</div>
            </CardContent>
          </Card>
        </div>

        {/* Company Location Map */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Company Location</CardTitle>
          </CardHeader>
          <CardContent>
            <MapComponent companyName={companyId} location={company.location} />
          </CardContent>
        </Card>

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
              {/* Live Time Series Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900 dark:text-white">Live Pollutant Trends</CardTitle>
                    <div className="flex space-x-2">
                      {['24h', '7d', '30d', '1y'].map((range) => (
                        <Button 
                          key={range}
                          variant={timeRange === range ? 'default' : 'outline'} 
                          size="sm" 
                          onClick={() => setTimeRange(range)}
                        >
                          {range.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="PM25" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="NO2" stackId="1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="SO2" stackId="1" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Pollutant Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Pollutant Distribution</CardTitle>
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
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Standards Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Standards Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="parameter" />
                      <YAxis />
                      <ChartTooltip />
                      <Bar dataKey="current" fill="#8884d8" name="Current" />
                      <Bar dataKey="limit" fill="#82ca9d" name="Limit" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Performance Radar</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar name="Current" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Radar name="Standard" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                      <ChartTooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Compliance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip />
                      <Line type="monotone" dataKey="AQI" stroke="#ff7300" strokeWidth={3} name="AQI Score" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sensors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Sensor Network Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sensors.map((sensor) => (
                    <div key={sensor.id} className="border dark:border-gray-700 rounded-lg p-4 space-y-3 bg-white dark:bg-gray-800">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{sensor.type}</h4>
                        <div className="flex items-center space-x-1">
                          {sensor.status === 'online' && <Wifi className="w-4 h-4 text-green-500" />}
                          {sensor.status === 'offline' && <WifiOff className="w-4 h-4 text-red-500" />}
                          {sensor.status === 'maintenance' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                          <Badge className={
                            sensor.status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            sensor.status === 'offline' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }>
                            {sensor.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <div>ID: {sensor.id}</div>
                        <div>Location: {sensor.location}</div>
                        <div>Last reading: {sensor.lastData}</div>
                      </div>
                      <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
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
                <CardTitle className="text-gray-900 dark:text-white">Generate Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    Professional environmental compliance reports with real-time data analysis.
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" onClick={handleDownloadReport}>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF Report
                    </Button>
                    <Button variant="outline" onClick={handleDownloadReport}>
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