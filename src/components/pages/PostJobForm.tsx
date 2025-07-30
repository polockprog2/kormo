import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import type { Page } from '../AppRouter';

interface PostJobFormProps {
  navigateTo: (page: Page) => void;
}

export function PostJobForm({ navigateTo }: PostJobFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    city: '',
    deadline: '',
    contactInfo: 'john.doe@example.com' // Pre-filled
  });

  const cities = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Job posted successfully!');
    navigateTo('client-dashboard');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateTo('client-dashboard')}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t('job.postJob')}</CardTitle>
            <p className="text-gray-600">Fill out the details to post your job and find the right worker</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="title">{t('job.title')} *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Modern Website Development"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">{t('job.category')} *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">{t('category.webDevelopment')}</SelectItem>
                    <SelectItem value="graphic-design">{t('category.graphicDesign')}</SelectItem>
                    <SelectItem value="content-writing">{t('category.contentWriting')}</SelectItem>
                    <SelectItem value="data-entry">{t('category.dataEntry')}</SelectItem>
                    <SelectItem value="mobile-app">{t('category.mobileApp')}</SelectItem>
                    <SelectItem value="other">{t('category.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">{t('job.description')} *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you need done, including any specific requirements..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  required
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label htmlFor="budget">{t('job.budget')} *</Label>
                <Input
                  id="budget"
                  placeholder="e.g., ৳15,000 - ৳25,000 or Fixed: ৳20,000"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500">You can specify a range or fixed amount</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city">{t('job.location')} *</Label>
                  <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Deadline */}
                <div className="space-y-2">
                  <Label htmlFor="deadline">{t('job.deadline')} *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <Label htmlFor="contactInfo">Contact Information</Label>
                <Input
                  id="contactInfo"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.contactInfo}
                  onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500">This will be shared with selected workers</p>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => navigateTo('client-dashboard')}
                  className="flex-1"
                >
                  {t('common.cancel')}
                </Button>
                <Button 
                  type="submit"
                  className="bg-kajkhuji-green hover:bg-kajkhuji-green/90 text-white flex-1"
                >
                  {t('job.postJob')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Tips for a Great Job Post</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Be specific about what you need done</li>
              <li>• Include any relevant files or references</li>
              <li>• Set a realistic budget and timeline</li>
              <li>• Mention any preferred skills or experience</li>
              <li>• Be clear about your expectations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
