import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ArrowLeft, MapPin, Calendar, DollarSign, Star, User, Briefcase } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import type { Page, UserRole } from '../AppRouter';

interface JobDetailsProps {
  navigateTo: (page: Page) => void;
  jobId?: number;
  userRole: UserRole;
}

export function JobDetails({ navigateTo, jobId, userRole }: JobDetailsProps) {
  const { t } = useLanguage();

  const job = {
    id: jobId || 1,
    title: 'Modern E-commerce Website Development',
    category: 'Web Development',
    budget: '৳25,000 - ৳35,000',
    location: 'Sylhet',
    deadline: '2024-02-15',
    postedDate: '2 hours ago',
    description: `We are looking for an experienced web developer...`,
    client: {
      name: 'Rahman Enterprise',
      rating: 4.8,
      totalJobs: 12,
      joinedDate: 'January 2023',
      avatar: 'RE'
    },
    skills: ['React', 'Node.js', 'MongoDB', 'Payment Integration', 'Responsive Design'],
    applicants: 12
  };

  const handleApply = () => {
    alert('Application submitted successfully!');
  };

  const handleContactClient = () => {
    alert('Message sent to client!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateTo(userRole === 'client' ? 'client-dashboard' : 'worker-dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-kajkhuji-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="text-xl font-bold text-kajkhuji-green">KajKhuji</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <Badge variant="outline" className="border-kajkhuji-green text-kajkhuji-green">
                        {job.category}
                      </Badge>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {t('job.posted')}: {job.postedDate}
                      </div>
                    </div>
                  </div>
                  {userRole === 'worker' && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" onClick={handleContactClient}>
                        Contact Client
                      </Button>
                      <Button 
                        className="bg-kajkhuji-green hover:bg-kajkhuji-green/90 text-white"
                        onClick={handleApply}
                      >
                        {t('job.apply')}
                      </Button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="w-4 h-4 text-kajkhuji-green mr-1" />
                      <span className="text-sm text-gray-600">{t('job.budget')}</span>
                    </div>
                    <p className="font-semibold text-kajkhuji-green">{job.budget}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Calendar className="w-4 h-4 text-kajkhuji-green mr-1" />
                      <span className="text-sm text-gray-600">{t('job.deadline')}</span>
                    </div>
                    <p className="font-semibold">{job.deadline}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <User className="w-4 h-4 text-kajkhuji-green mr-1" />
                      <span className="text-sm text-gray-600">{t('job.applicants')}</span>
                    </div>
                    <p className="font-semibold">{job.applicants}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {job.description}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-kajkhuji-green/10 text-kajkhuji-green">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About the Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-kajkhuji-green text-white">
                      {job.client.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{job.client.name}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{job.client.rating}</span>
                      <span>•</span>
                      <span>{job.client.totalJobs} jobs posted</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>Member since {job.client.joinedDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {userRole === 'worker' && (
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this Job</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Send a proposal to the client explaining why you're the right fit.
                  </p>
                  <Button 
                    className="w-full bg-kajkhuji-green hover:bg-kajkhuji-green/90 text-white"
                    onClick={handleApply}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    {t('job.apply')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-kajkhuji-green text-kajkhuji-green hover:bg-kajkhuji-green hover:text-white"
                    onClick={handleContactClient}
                  >
                    Contact Client
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">
                      React Developer Needed
                    </h4>
                    <p className="text-xs text-gray-600 mb-2">৳15,000 - ৳20,000</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      Dhaka
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
