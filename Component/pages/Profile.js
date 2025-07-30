import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { ArrowLeft, Edit3, Star, MapPin, Calendar, Briefcase, Award } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import type { Page, UserRole } from '../AppRouter';

interface ProfileProps {
  navigateTo: (page: Page) => void;
  userRole: UserRole;
}

export function Profile({ navigateTo, userRole }: ProfileProps) {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userRole === 'client' ? 'Rahman Enterprise' : 'Md. Karim Ahmed',
    email: userRole === 'client' ? 'contact@rahmanenterprise.com' : 'karim.ahmed@email.com',
    phone: '+880 1711-123456',
    location: 'Sylhet, Bangladesh',
    occupation: userRole === 'client' ? 'Business Owner' : 'Full Stack Developer',
    bio: userRole === 'client' 
      ? 'We are a growing e-commerce business looking to work with talented freelancers to expand our digital presence.'
      : 'Experienced full-stack developer with 5+ years in web development. Specialized in React, Node.js, and modern web technologies.',
    experience: '5+ years',
    skills: userRole === 'client' ? [] : ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Python', 'UI/UX Design']
  });

  const [stats] = useState({
    rating: userRole === 'client' ? 4.8 : 4.9,
    totalJobs: userRole === 'client' ? 12 : 24,
    completedJobs: userRole === 'client' ? 10 : 22,
    successRate: userRole === 'client' ? 95 : 98
  });

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    alert('Profile updated successfully!');
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
            
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={isEditing ? "bg-kajkhuji-green hover:bg-kajkhuji-green/90 text-white" : ""}
              variant={isEditing ? "default" : "outline"}
            >
              {isEditing ? (
                <>
                  <Award className="w-4 h-4 mr-2" />
                  {t('common.save')}
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4 mr-2" />
                  {t('profile.edit')}
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info - Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-kajkhuji-green text-white text-xl">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="occupation">Occupation</Label>
                          <Input
                            id="occupation"
                            value={profileData.occupation}
                            onChange={(e) => handleInputChange('occupation', e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                        <p className="text-lg text-gray-600 mb-2">{profileData.occupation}</p>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {profileData.location}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            {stats.rating}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {stats.totalJobs} jobs
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-600">Email</Label>
                      <p className="font-medium">{profileData.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Phone</Label>
                      <p className="font-medium">{profileData.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Location</Label>
                      <p className="font-medium">{profileData.location}</p>
                    </div>
                    {userRole === 'worker' && (
                      <div>
                        <Label className="text-sm text-gray-600">{t('profile.experience')}</Label>
                        <p className="font-medium">{profileData.experience}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bio/Description */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {userRole === 'client' ? 'About Company' : 'About Me'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={6}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Skills (Worker only) */}
            {userRole === 'worker' && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('profile.skills')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <Badge 
                            key={index}
                            variant="secondary"
                            className="bg-kajkhuji-green/10 text-kajkhuji-green cursor-pointer"
                            onClick={() => removeSkill(skill)}
                          >
                            {skill} ×
                          </Badge>
                        ))}
                      </div>
                      <Input
                        placeholder="Add a skill and press Enter"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addSkill(e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <Badge 
                          key={index}
                          variant="secondary"
                          className="bg-kajkhuji-green/10 text-kajkhuji-green"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Stats & Activity */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('profile.rating')}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{stats.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {userRole === 'client' ? 'Jobs Posted' : 'Jobs Completed'}
                  </span>
                  <span className="font-semibold">{stats.completedJobs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-semibold text-kajkhuji-green">{stats.successRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Jobs</span>
                  <span className="font-semibold">{stats.totalJobs}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { action: 'Job completed', time: '2 days ago' },
                  { action: 'Profile updated', time: '1 week ago' },
                  { action: 'New review received', time: '2 weeks ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">{activity.action}</span>
                    <span className="text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle>Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email</span>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phone</span>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Identity</span>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}