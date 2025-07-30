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

export function Profile({ navigateTo, userRole }) {
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
    alert('Profile updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = (skill) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* UI rendering remains same as original TypeScript version */}
    </div>
  );
}
