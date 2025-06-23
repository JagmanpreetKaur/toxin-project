import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Clock, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const dangerousCompanies = [
  {
    id: 'jusco-power',
    name: 'JUSCO Power Plant',
    industry: 'Power Generation', 
    location: 'Adityapur, Jamshedpur, Jharkhand',
    toxinType: 'air',
    alertLevel: 'Critical',
    lastAlert: '15 min ago',
    alertReason: 'PM10 levels exceeded 200 µg/m³',
    status: 'dangerous',
    logo: '⚡'
  },
  {
    id: 'karandih-effluent',
    name: 'Karandih Industrial Area',
    industry: 'Industrial Effluent',
    location: 'Karandih, Jamshedpur, Jharkhand',
    toxinType: 'water',
    alertLevel: 'High',
    lastAlert: '1 hour ago',
    alertReason: 'COD levels at 198 mg/L, pH at 9.1',
    status: 'dangerous',
    logo: '🏭'
  },
  {
    id: 'adityapur-industrial',
    name: 'Adityapur Industrial Area',
    industry: 'Mixed Industries',
    location: 'Adityapur, Jamshedpur, Jharkhand',
    toxinType: 'soil',
    alertLevel: 'High',
    lastAlert: '3 hours ago',
    alertReason: 'Chromium contamination at 167 mg/kg',
    status: 'dangerous',
    logo: '🏭'
  }
];

const Alerts = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-3xl font-bold text-gray-900">Active Alerts</h1>
            </div>
            <Badge className="bg-red-100 text-red-800 px-3 py-1">
              {dangerousCompanies.length} Active Alerts
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                  <p className="text-2xl font-bold text-red-600">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Last 24 Hours</p>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              Companies with Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dangerousCompanies.map((company) => (
                <Link
                  key={company.id}
                  to={`/${company.toxinType}/company/${company.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{company.logo}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                        <p className="text-gray-600 flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {company.industry}
                        </p>
                        <p className="text-gray-500 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {company.location}
                        </p>
                        <p className="text-red-600 font-medium mt-2">{company.alertReason}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-red-100 text-red-800 mb-2">
                        {company.alertLevel}
                      </Badge>
                      <p className="text-sm text-gray-500">{company.lastAlert}</p>
                      <Button size="sm" className="mt-2">
                        View Dashboard
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alert Timeline */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Alert Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">JUSCO Power Plant - Critical Alert</p>
                  <p className="text-sm text-gray-600">PM10 levels exceeded safe limits</p>
                </div>
                <span className="text-sm text-gray-500">15 min ago</span>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Karandih Industrial - High Alert</p>
                  <p className="text-sm text-gray-600">Water quality parameters exceeded</p>
                </div>
                <span className="text-sm text-gray-500">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Adityapur Industrial - High Alert</p>
                  <p className="text-sm text-gray-600">Soil contamination detected</p>
                </div>
                <span className="text-sm text-gray-500">3 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;