import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wind, Droplets, Mountain, Zap, Search, BarChart3, AlertTriangle, FileText, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import SearchModal from '@/components/SearchModal';

const toxinCategories = [
  {
    id: 'air',
    title: 'Air Pollution',
    hindiTitle: 'वायु प्रदूषण',
    description: 'Monitor industrial air emissions, PM2.5, NO₂, SO₂, and AQI levels from manufacturing facilities.',
    hindiDescription: 'विनिर्माण सुविधाओं से औद्योगिक वायु उत्सर्जन, PM2.5, NO₂, SO₂, और AQI स्तर की निगरानी करें।',
    icon: Wind,
    color: 'from-blue-500 to-cyan-500',
    companies: 4,
    bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
  },
  {
    id: 'water',
    title: 'Water Pollution',
    hindiTitle: 'जल प्रदूषण',
    description: 'Track water quality parameters including pH, BOD, COD, and heavy metal contamination.',
    hindiDescription: 'pH, BOD, COD, और भारी धातु संदूषण सहित जल गुणवत्ता मापदंडों को ट्रैक करें।',
    icon: Droplets,
    color: 'from-cyan-500 to-blue-500',
    companies: 3,
    bgPattern: 'bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20'
  },
  {
    id: 'soil',
    title: 'Soil Contamination',
    hindiTitle: 'मिट्टी संदूषण',
    description: 'Monitor soil health, heavy metal contamination, and chemical pollutants in industrial areas.',
    hindiDescription: 'औद्योगिक क्षेत्रों में मिट्टी के स्वास्थ्य, भारी धातु संदूषण, और रासायनिक प्रदूषकों की निगरानी करें।',
    icon: Mountain,
    color: 'from-amber-500 to-yellow-500',
    companies: 2,
    bgPattern: 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20'
  },
  {
    id: 'radioactive',
    title: 'Radioactive Emissions',
    hindiTitle: 'रेडियोधर्मी उत्सर्जन',
    description: 'Track radioactive emissions, alpha, beta, gamma radiation levels from nuclear facilities.',
    hindiDescription: 'परमाणु सुविधाओं से रेडियोधर्मी उत्सर्जन, अल्फा, बीटा, गामा विकिरण स्तरों को ट्रैक करें।',
    icon: Zap,
    color: 'from-purple-500 to-pink-500',
    companies: 1,
    bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
  }
];

const quickActions = [
  {
    title: 'View Analytics',
    hindiTitle: 'विश्लेषण देखें',
    description: 'Comprehensive environmental data analysis',
    hindiDescription: 'व्यापक पर्यावरणीय डेटा विश्लेषण',
    icon: BarChart3,
    link: '/analytics',
    color: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20'
  },
  {
    title: 'Active Alerts',
    hindiTitle: 'सक्रिय अलर्ट',
    description: 'View companies with pollution violations',
    hindiDescription: 'प्रदूषण उल्लंघन वाली कंपनियों को देखें',
    icon: AlertTriangle,
    link: '/alerts',
    color: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20'
  },
  {
    title: 'Generate Reports',
    hindiTitle: 'रिपोर्ट जेनरेट करें',
    description: 'Download environmental compliance reports',
    hindiDescription: 'पर्यावरणीय अनुपालन रिपोर्ट डाउनलोड करें',
    icon: FileText,
    link: '/analytics',
    color: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
  }
];

const Index = () => {
  const [language, setLanguage] = useState('en');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('10s ago');

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Update timer for live data simulation
    const interval = setInterval(() => {
      const now = new Date();
      const seconds = Math.floor(Math.random() * 60) + 1;
      setLastUpdated(`${seconds}s ago`);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const t = (en: string, hi: string) => language === 'hi' ? hi : en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                EcoMonitor
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>{t('Search Companies', 'कंपनियों की खोज करें')}</span>
              </Button>
              
              <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
              
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={setLanguage} 
              />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t dark:border-gray-700">
              <div className="flex flex-col space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 justify-start"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('Search Companies', 'कंपनियों की खोज करें')}</span>
                </Button>
                
                <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
                
                <LanguageSelector 
                  currentLanguage={language} 
                  onLanguageChange={setLanguage} 
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('Environmental', 'पर्यावरण')}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {t(' Monitoring', ' निगरानी')}
            </span>
            <br />
            {t('Dashboard', 'डैशबोर्ड')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            {t(
              'Real-time pollution monitoring and compliance tracking for industrial facilities in Jamshedpur, Jharkhand. Ensuring environmental transparency and accountability.',
              'जमशेदपुर, झारखंड में औद्योगिक सुविधाओं के लिए वास्तविक समय प्रदूषण निगरानी और अनुपालन ट्रैकिंग। पर्यावरणीय पारदर्शिता और जवाबदेही सुनिश्चित करना।'
            )}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">10</div>
              <div className="text-gray-600 dark:text-gray-400">{t('Companies Monitored', 'निगरानी की गई कंपनियां')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">3</div>
              <div className="text-gray-600 dark:text-gray-400">{t('Active Alerts', 'सक्रिय अलर्ट')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">72%</div>
              <div className="text-gray-600 dark:text-gray-400">{t('Avg Compliance', 'औसत अनुपालन')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-gray-600 dark:text-gray-400">{t('Active Sensors', 'सक्रिय सेंसर')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Toxin Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('Monitor Pollution by Category', 'श्रेणी के अनुसार प्रदूषण की निगरानी करें')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t(
                'Select a pollution category to view detailed monitoring data from industrial facilities in Jamshedpur.',
                'जमशेदपुर में औद्योगिक सुविधाओं से विस्तृत निगरानी डेटा देखने के लिए एक प्रदूषण श्रेणी का चयन करें।'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {toxinCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/${category.id}/companies`}
                  className="group block"
                >
                  <Card className={`${category.bgPattern} dark:bg-gray-800/50 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative`}>
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10 dark:opacity-5">
                      <IconComponent className="w-full h-full" />
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {language === 'hi' ? category.hindiTitle : category.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {category.companies} {t('companies', 'कंपनियां')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {language === 'hi' ? category.hindiDescription : category.description}
                      </p>
                      <div className="mt-6">
                        <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">
                          {t('View Companies', 'कंपनियों को देखें')}
                          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('Quick Actions', 'त्वरित कार्य')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {t('Access key environmental monitoring tools and reports', 'मुख्य पर्यावरणीय निगरानी उपकरण और रिपोर्ट तक पहुंचें')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={action.title}
                  to={action.link}
                  className="group block"
                >
                  <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white dark:bg-gray-800">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {language === 'hi' ? action.hindiTitle : action.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {language === 'hi' ? action.hindiDescription : action.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              EcoMonitor
            </span>
          </div>
          <p className="text-gray-400 mb-4">
            {t(
              'Ensuring environmental transparency and corporate accountability in Jamshedpur, Jharkhand.',
              'जमशेदपुर, झारखंड में पर्यावरणीय पारदर्शिता और कॉर्पोरेट जवाबदेही सुनिश्चित करना।'
            )}
          </p>
          <div className="text-gray-500 text-sm flex items-center justify-center space-x-2">
            <span>© 2024 EcoMonitor. {t('All rights reserved.', 'सभी अधिकार सुरक्षित।')}</span>
            <span>•</span>
            <span>{t('Last Updated', 'अंतिम अपडेट')} {lastUpdated} | NIT Jamshedpur</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;