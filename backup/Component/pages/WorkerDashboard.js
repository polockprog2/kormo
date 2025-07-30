import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Search, MapPin, Calendar, Filter, User, MessageSquare, LogOut, Globe, Briefcase } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import type { Page } from '../AppRouter';

interface WorkerDashboardProps {
  navigateTo: (page: Page, jobId?: number) => void;
  logout: () => void;
}

export function WorkerDashboard({ navigateTo, logout }: WorkerDashboardProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Mock job data
  const jobs = [
    {
      id: 1,
      title: 'Modern E-commerce Website Development',
      category: 'Web Development',
      budget: '৳25,000 - ৳35,000',
      location: 'Sylhet',
      postedDate: '2 hours ago',
      client: 'Rahman Enterprise',
      clientRating: 4.8,
      description: 'Looking for an experienced developer to create a modern e-commerce website with payment integration.'
    },
    {
      id: 2,
      title: 'Restaurant Logo and Branding Design',
      category: 'Graphic Design',
      budget: '৳8,000 - ৳12,000',
      location: 'Chittagong',
      postedDate: '1 day ago',
      client: 'Spice Garden',
      clientRating: 4.5,
      description: 'Need a professional logo and complete branding package for a new restaurant chain.'
    },
    {
      id: 3,
      title: 'Bengali Content Writing for Website',
      category: 'Content Writing',
      budget: '৳5,000 - ৳8,000',
      location: 'Dhaka',
      postedDate: '3 days ago',
      client: 'Tech Solutions BD',
      clientRating: 4.9,
      description: 'Looking for a skilled Bengali content writer to create engaging website content.'
    },
    {
      id: 4,
      title: 'Mobile App UI/UX Design',
      category: 'Mobile App',
      budget: '৳15,000 - ৳20,000',
      location: 'Rajshahi',
      postedDate: '1 week ago',
      client: 'Digital Innovations',
      clientRating: 4.7,
      description: 'Need a modern and user-friendly mobile app design for a food delivery service.'
    }
  ];

  const cities = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || job.location === selectedCity;
    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    
    return matchesSearch && matchesCity && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-kajkhuji-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="text-xl font-bold text-kajkhuji-green">KajKhuji</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="flex items-center space-x-2">
                <Label htmlFor="language-toggle" className="text-sm">
                  {language === 'en' ? 'EN' : 'বাং'}
                </Label>
                <Switch
                  id="language-toggle"
                  checked={language === 'bn'}
                  onCheckedChange={toggleLanguage}
                />
                <Globe className="w-4 h-4 text-muted-foreground" />
              </div>
              
              <Button variant="ghost" size="sm" onClick={() => navigateTo('profile')}>
                <User className="w-4 h-4 mr-2" />
                {t('nav.profile')}
              </Button>
              <Button variant="ghost" size="sm">
                <Briefcase className="w-4 h-4 mr-2" />
                {t('nav.appliedJobs')}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                {t('nav.messages')}
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                {t('nav.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Worker Dashboard</h1>
          <p className="text-gray-600">Find and apply for jobs that match your skills</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={t('common.search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder={t('common.city')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Cities</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={t('job.category')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="Web Development">{t('category.webDevelopment')}</SelectItem>
                  <SelectItem value="Graphic Design">{t('category.graphicDesign')}</SelectItem>
                  <SelectItem value="Content Writing">{t('category.contentWriting')}</SelectItem>
                  <SelectItem value="Mobile App">{t('category.mobileApp')}</SelectItem>
                  <SelectItem value="Data Entry">{t('category.dataEntry')}</SelectItem>
                  <SelectItem value="Other">{t('category.other')}</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="border-kajkhuji-green text-kajkhuji-green hover:bg-kajkhuji-green hover:text-white">
                <Filter className="w-4 h-4 mr-2" />
                {t('common.filter')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Job List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigateTo('job-details', job.id)}>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 sm:mb-0">{job.title}</h3>
                      <Badge variant="outline" className="border-kajkhuji-green text-kajkhuji-green w-fit">
                        {job.category}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{job.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="font-semibold text-kajkhuji-green">{job.budget}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {job.postedDate}
                      </div>
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {job.client} ({job.clientRating}★)
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('job-details', job.id);
                      }}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-kajkhuji-green hover:bg-kajkhuji-green/90 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle apply action
                        alert('Application submitted!');
                      }}
                    >
                      {t('job.apply')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-gray-500">No jobs found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}