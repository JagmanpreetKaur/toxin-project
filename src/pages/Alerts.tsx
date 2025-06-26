import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Clock, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const dangerousCompanies = [
  {
    id: 'jusco-power',
    name: 'JUSCO Power Plant',
    hindiName: 'जस्को पावर प्लांट',
    industry: 'Power Generation',
    hindiIndustry: 'विद्युत उत्पादन', 
    location: 'Adityapur, Jamshedpur, Jharkhand',
    hindiLocation: 'आदित्यपुर, जमशेदपुर, झारखंड',
    toxinType: 'air',
    alertLevel: 'Critical',
    hindiAlertLevel: 'गंभीर',
    lastAlert: '15 min ago',
    hindiLastAlert: '15 मिनट पहले',
    alertReason: 'PM10 levels exceeded 200 µg/m³',
    hindiAlertReason: 'PM10 का स्तर 200 µg/m³ से अधिक',
    status: 'dangerous',
    logo: '⚡'
  },
  {
    id: 'karandih-effluent',
    name: 'Karandih Industrial Area',
    hindiName: 'करंडीह औद्योगिक क्षेत्र',
    industry: 'Industrial Effluent',
    hindiIndustry: 'औद्योगिक अपशिष्ट',
    location: 'Karandih, Jamshedpur, Jharkhand',
    hindiLocation: 'करंडीह, जमशेदपुर, झारखंड',
    toxinType: 'water',
    alertLevel: 'High',
    hindiAlertLevel: 'उच्च',
    lastAlert: '1 hour ago',
    hindiLastAlert: '1 घंटे पहले',
    alertReason: 'COD levels at 198 mg/L, pH at 9.1',
    hindiAlertReason: 'COD स्तर 198 mg/L पर, pH 9.1 पर',
    status: 'dangerous',
    logo: '🏭'
  },
  {
    id: 'adityapur-industrial',
    name: 'Adityapur Industrial Area',
    hindiName: 'आदित्यपुर औद्योगिक क्षेत्र',
    industry: 'Mixed Industries',
    hindiIndustry: 'मिश्रित उद्योग',
    location: 'Adityapur, Jamshedpur, Jharkhand',
    hindiLocation: 'आदित्यपुर, जमशेदपुर, झारखंड',
    toxinType: 'soil',
    alertLevel: 'High',
    hindiAlertLevel: 'उच्च',
    lastAlert: '3 hours ago',
    hindiLastAlert: '3 घंटे पहले',
    alertReason: 'Chromium contamination at 167 mg/kg',
    hindiAlertReason: 'क्रोमियम संदूषण 167 mg/kg पर',
    status: 'dangerous',
    logo: '🏭'
  }
];

const Alerts = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('Back to Dashboard', 'डैशबोर्ड पर वापस')}
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('Active Alerts', 'सक्रिय अलर्ट')}
              </h1>
            </div>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-3 py-1">
              {dangerousCompanies.length} {t('Active Alerts', 'सक्रिय अलर्ट')}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('Critical Alerts', 'गंभीर अलर्ट')}
                  </p>
                  <p className="text-2xl font-bold text-red-600">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('High Priority', 'उच्च प्राथमिकता')}
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {t('Last 24 Hours', 'पिछले 24 घंटे')}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Alerts List */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              {t('Companies with Active Alerts', 'सक्रिय अलर्ट वाली कंपनियां')}
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
                  <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{company.logo}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {language === 'hi' ? company.hindiName : company.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {language === 'hi' ? company.hindiIndustry : company.industry}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {language === 'hi' ? company.hindiLocation : company.location}
                        </p>
                        <p className="text-red-600 dark:text-red-400 font-medium mt-2">
                          {language === 'hi' ? company.hindiAlertReason : company.alertReason}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 mb-2">
                        {language === 'hi' ? company.hindiAlertLevel : company.alertLevel}
                      </Badge>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'hi' ? company.hindiLastAlert : company.lastAlert}
                      </p>
                      <Button size="sm" className="mt-2">
                        {t('View Dashboard', 'डैशबोर्ड देखें')}
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alert Timeline */}
        <Card className="mt-8 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              {t('Recent Alert Timeline', 'हाल की अलर्ट समयरेखा')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {t('JUSCO Power Plant - Critical Alert', 'जस्को पावर प्लांट - गंभीर अलर्ट')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t('PM10 levels exceeded safe limits', 'PM10 का स्तर सुरक्षित सीमा से अधिक')}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {t('15 min ago', '15 मिनट पहले')}
                </span>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {t('Karandih Industrial - High Alert', 'करंडीह औद्योगिक - उच्च अलर्ट')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t('Water quality parameters exceeded', 'जल गुणवत्ता मापदंड अधिक')}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {t('1 hour ago', '1 घंटे पहले')}
                </span>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {t('Adityapur Industrial - High Alert', 'आदित्यपुर औद्योगिक - उच्च अलर्ट')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t('Soil contamination detected', 'मिट्टी संदूषण का पता चला')}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {t('3 hours ago', '3 घंटे पहले')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Alerts;