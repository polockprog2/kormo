import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { UserCheck, FileText, CreditCard, Globe, User, Briefcase } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export function Home({ navigateTo, setUserRole, user, login, register, logout, authLoading }) {
  const { language, toggleLanguage, t } = useLanguage();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    name: '',
    role: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginForm.email, loginForm.password);
      setShowLogin(false);
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!registerForm.role) {
      alert('Please select a role');
      return;
    }
    try {
      await register(registerForm.email, registerForm.password, registerForm.name, registerForm.role);
      setShowRegister(false);
    } catch (error) {
      alert('Registration failed');
    }
  };

  const handleFindWork = () => {
    if (user) {
      setUserRole('worker');
    } else {
      setRegisterForm(prev => ({ ...prev, role: 'worker' }));
      setShowRegister(true);
    }
  };

  const handleHireWorker = () => {
    if (user) {
      setUserRole('client');
    } else {
      setRegisterForm(prev => ({ ...prev, role: 'client' }));
      setShowRegister(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
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

              {user ? (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateTo('profile')}>
                    {user.name}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    {t('nav.logout')}
                  </Button>
                </div>
              ) : (
                <>
                  {/* Login Dialog */}
                  <Dialog open={showLogin} onOpenChange={setShowLogin}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        {t('nav.login')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t('nav.login')}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                          <Label htmlFor="login-email">Email</Label>
                          <Input
                            id="login-email"
                            type="email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="login-password">Password</Label>
                          <Input
                            id="login-password"
                            type="password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                            placeholder="Enter your password"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-kajkhuji-green hover:bg-kajkhuji-green/90"
                          disabled={authLoading}
                        >
                          {authLoading ? 'Loading...' : t('nav.login')}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* Register Dialog */}
                  <Dialog open={showRegister} onOpenChange={setShowRegister}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-kajkhuji-green hover:bg-kajkhuji-green/90">
                        {t('nav.register')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t('nav.register')}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            type="button"
                            variant={registerForm.role === 'worker' ? "default" : "outline"}
                            className={`h-auto p-4 ${registerForm.role === 'worker' ? 'bg-kajkhuji-green hover:bg-kajkhuji-green/90' : 'border-kajkhuji-green text-kajkhuji-green hover:bg-kajkhuji-green hover:text-white'}`}
                            onClick={() => setRegisterForm(prev => ({ ...prev, role: 'worker' }))}
                          >
                            <div className="text-center">
                              <User className="w-6 h-6 mx-auto mb-2" />
                              <div className="text-sm font-medium">{t('nav.findWork')}</div>
                            </div>
                          </Button>
                          <Button
                            type="button"
                            variant={registerForm.role === 'client' ? "default" : "outline"}
                            className={`h-auto p-4 ${registerForm.role === 'client' ? 'bg-kajkhuji-green hover:bg-kajkhuji-green/90' : 'border-kajkhuji-green text-kajkhuji-green hover:bg-kajkhuji-green hover:text-white'}`}
                            onClick={() => setRegisterForm(prev => ({ ...prev, role: 'client' }))}
                          >
                            <div className="text-center">
                              <Briefcase className="w-6 h-6 mx-auto mb-2" />
                              <div className="text-sm font-medium">{t('nav.hireWorker')}</div>
                            </div>
                          </Button>
                        </div>
                        <div>
                          <Label htmlFor="register-name">Full Name</Label>
                          <Input
                            id="register-name"
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="register-email">Email</Label>
                          <Input
                            id="register-email"
                            type="email"
                            value={registerForm.email}
                            onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="register-password">Password</Label>
                          <Input
                            id="register-password"
                            type="password"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                            placeholder="Create a password"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-kajkhuji-green hover:bg-kajkhuji-green/90"
                          disabled={authLoading || !registerForm.role}
                        >
                          {authLoading ? 'Loading...' : t('nav.register')}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-kajkhuji-green/5 to-kajkhuji-yellow/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            {t('home.tagline')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              size="lg"
              className="bg-kajkhuji-green hover:bg-kajkhuji-green/90 text-white"
              onClick={handleFindWork}
            >
              {t('nav.findWork')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-kajkhuji-green text-kajkhuji-green hover:bg-kajkhuji-green hover:text-white"
              onClick={handleHireWorker}
            >
              {t('nav.hireWorker')}
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
            {t('home.howItWorks')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-kajkhuji-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-kajkhuji-green" />
                </div>
                <h3 className="font-semibold mb-2">{t('home.step1.title')}</h3>
                <p className="text-gray-600 text-sm">{t('home.step1.desc')}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-kajkhuji-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-6 h-6 text-kajkhuji-yellow" />
                </div>
                <h3 className="font-semibold mb-2">{t('home.step2.title')}</h3>
                <p className="text-gray-600 text-sm">{t('home.step2.desc')}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-kajkhuji-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-6 h-6 text-kajkhuji-green" />
                </div>
                <h3 className="font-semibold mb-2">{t('home.step3.title')}</h3>
                <p className="text-gray-600 text-sm">{t('home.step3.desc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-kajkhuji-green rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">K</span>
              </div>
              <span className="font-semibold text-kajkhuji-green">KajKhuji</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-kajkhuji-green">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-kajkhuji-green">{t('footer.about')}</a>
              <a href="#" className="hover:text-kajkhuji-green">{t('footer.contact')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
