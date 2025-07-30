import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Plus, Users, Calendar, MapPin, MoreVertical, MessageSquare, User, LogOut, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export function ClientDashboard({ navigateTo, logout }) {
  const { language, toggleLanguage, t } = useLanguage();

  // Mock job data
  const jobs = [
    {
      id: 1,
      title: 'Modern Website Development',
      budget: '৳25,000 - ৳35,000',
      status: 'open',
      applicants: 12,
      location: 'Sylhet',
      postedDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Logo Design for Restaurant',
      budget: '৳5,000 - ৳8,000',
      status: 'ongoing',
      applicants: 8,
      location: 'Chittagong',
      postedDate: '1 week ago'
    },
    {
      id: 3,
      title: 'Content Writing for Blog',
      budget: '৳15,000',
      status: 'completed',
      applicants: 5,
      location: 'Dhaka',
      postedDate: '2 weeks ago'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="text-gray-600">Manage your posted jobs and find the right workers</p>
          </div>
          <Button 
            className="bg-kajkhuji-green hover:bg-kajkhuji-green/90 text-white"
            onClick={() => navigateTo('post-job')}
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('job.postJob')}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="w-10 h-10 bg-kajkhuji-green/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-kajkhuji-green" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
                <div className="w-10 h-10 bg-kajkhuji-yellow/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-kajkhuji-yellow" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Applicants</p>
                  <p className="text-2xl font-bold text-gray-900">25</p>
                </div>
                <div className="w-10 h-10 bg-kajkhuji-green/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-kajkhuji-green" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job List */}
        <Card>
          <CardHeader>
            <CardTitle>{t('nav.myJobs')}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {jobs.map((job) => (
                <div key={job.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => navigateTo('job-details', job.id)}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <Badge className={`${getStatusColor(job.status)} text-xs w-fit`}>
                          {t(`job.status.${job.status}`)}
                        </Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 space-y-1 sm:space-y-0 sm:space-x-4 mt-1">
                        <span className="font-semibold text-kajkhuji-green">{job.budget}</span>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {job.applicants} {t('job.applicants')}
                        </div>
                        <span>{job.postedDate}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}