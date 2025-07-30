import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { ClientDashboard } from './pages/ClientDashboard';
import { WorkerDashboard } from './pages/WorkerDashboard';
import { PostJobForm } from './pages/PostJobForm';
import { JobDetails } from './pages/JobDetails';
import { Profile } from './pages/Profile';

export function AppRouter({ user, loading, login, register, logout }) {
  const [appState, setAppState] = useState({
    currentPage: 'home',
    selectedJobId: undefined,
  });

  useEffect(() => {
    if (!loading && user) {
      if (appState.currentPage === 'home') {
        const dashboardPage = user.role === 'client' ? 'client-dashboard' : 'worker-dashboard';
        setAppState(prev => ({ ...prev, currentPage: dashboardPage }));
      }
    }
  }, [user, loading, appState.currentPage]);

  const navigateTo = (page, jobId) => {
    setAppState({
      currentPage: page,
      selectedJobId: jobId,
    });
  };

  const setUserRole = (role) => {
    if (role === 'client') {
      navigateTo('client-dashboard');
    } else if (role === 'worker') {
      navigateTo('worker-dashboard');
    } else {
      navigateTo('home');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-kajkhuji-green rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">K</span>
          </div>
          <p className="text-gray-600">Loading KajKhuji...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (appState.currentPage) {
      case 'home':
        return (
          <Home
            navigateTo={navigateTo}
            setUserRole={setUserRole}
            user={user}
            login={login}
            register={register}
            logout={logout}
            authLoading={loading}
          />
        );
      case 'client-dashboard':
        return user?.role === 'client' ? (
          <ClientDashboard navigateTo={navigateTo} logout={() => { logout(); navigateTo('home'); }} />
        ) : (
          <Home
            navigateTo={navigateTo}
            setUserRole={setUserRole}
            user={user}
            login={login}
            register={register}
            logout={logout}
            authLoading={loading}
          />
        );
      case 'worker-dashboard':
        return user?.role === 'worker' ? (
          <WorkerDashboard navigateTo={navigateTo} logout={() => { logout(); navigateTo('home'); }} />
        ) : (
          <Home
            navigateTo={navigateTo}
            setUserRole={setUserRole}
            user={user}
            login={login}
            register={register}
            logout={logout}
            authLoading={loading}
          />
        );
      case 'post-job':
        return user?.role === 'client' ? (
          <PostJobForm navigateTo={navigateTo} />
        ) : (
          <Home
            navigateTo={navigateTo}
            setUserRole={setUserRole}
            user={user}
            login={login}
            register={register}
            logout={logout}
            authLoading={loading}
          />
        );
      case 'job-details':
        return <JobDetails navigateTo={navigateTo} jobId={appState.selectedJobId} userRole={user?.role || null} />;
      case 'profile':
        return user ? (
          <Profile navigateTo={navigateTo} userRole={user.role} />
        ) : (
          <Home
            navigateTo={navigateTo}
            setUserRole={setUserRole}
            user={user}
            login={login}
            register={register}
            logout={logout}
            authLoading={loading}
          />
        );
      default:
        return (
          <Home
            navigateTo={navigateTo}
            setUserRole={setUserRole}
            user={user}
            login={login}
            register={register}
            logout={logout}
            authLoading={loading}
          />
        );
    }
  };

  return <div className="min-h-screen bg-background">{renderPage()}</div>;
}
