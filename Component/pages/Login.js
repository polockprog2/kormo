import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Switch } from '../ui/switch';
import { ArrowLeft, Eye, EyeOff, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useAuth } from '../AuthContext';

export function Login({ navigateTo }) {
  const { language, toggleLanguage, t } = useLanguage();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData.email, formData.password);
      // Navigation will be handled by the app router based on user role
    } catch (error) {
      setError(error.message || 'Login failed');
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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-kajkhuji-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="text-2xl font-bold text-kajkhuji-green">KajKhuji</span>
          </div>

          {/* Language Toggle */}
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
            <CardTitle className="text-center text-2xl">{t('nav.login')}</CardTitle>
            <p className="text-center text-gray-600">
              Welcome back to KajKhuji
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
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

              <Button
                type="submit"
                className="w-full bg-kajkhuji-green hover:bg-kajkhuji-green/90 text-white"
                disabled={loading}
              >
                {loading ? t('common.loading') : t('nav.login')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Button
                  variant="link"
                  className="text-kajkhuji-green hover:text-kajkhuji-green/80 p-0"
                  onClick={() => navigateTo('register')}
                >
                  {t('nav.register')}
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
