import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Switch } from '../ui/switch';
import { ArrowLeft, Eye, EyeOff, Globe, User, Briefcase } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useAuth } from '../AuthContext';

export function Register({ navigateTo }) {
  const { language, toggleLanguage, t } = useLanguage();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    role: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const cities = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.role) {
      setError('Please select your role');
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location,
        role: formData.role
      });
    } catch (error) {
      setError(error.message || 'Registration failed');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-kajkhuji-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="text-2xl font-bold text-kajkhuji-green">KajKhuji</span>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-4">
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
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">{t('nav.register')}</CardTitle>
            <p className="text-center text-gray-600">Join KajKhuji today</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label>I want to</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={formData.role === 'worker' ? 'default' : 'outline'}
                    className={`h-auto p-4 ${formData.role === 'worker' ? 'bg-kajkhuji-green hover:bg-kajkhuji-green/90' : 'border-kajkhuji-green text-kajkhuji-green hover:bg-kajkhuji-green hover:text-white'}`}
                    onClick={() => handleInputChange('role', 'worker')}
                  >
                    <div className="text-center">
                      <User className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">{t('nav.findWork')}</div>
                      <div className="text-xs opacity-80">As a Worker</div>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant={formData.role === 'client' ? 'default' : 'outline'}
                    className={`h-auto p-4 ${formData.role === 'client' ? 'bg-kajkhuji-green hover:bg-kajkhuji-green/90' : 'border-kajkhuji-green text-kajkhuji-green hover:bg-kajkhuji-green hover:text-white'}`}
                    onClick={() => handleInputChange('role', 'client')}
                  >
                    <div className="text-center">
                      <Briefcase className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">{t('nav.hireWorker')}</div>
                      <div className="text-xs opacity-80">As a Client</div>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+880 1711-123456"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">City</Label>
                <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password (min 6 characters)"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-kajkhuji-green hover:bg-kajkhuji-green/90 text-white"
                disabled={loading}
              >
                {loading ? t('common.loading') : t('nav.register')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Button
                  variant="link"
                  className="text-kajkhuji-green hover:text-kajkhuji-green/80 p-0"
                  onClick={() => navigateTo('login')}
                >
                  {t('nav.login')}
                </Button>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateTo('home')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
