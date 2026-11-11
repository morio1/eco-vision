import { read, write } from './lib/storage';
import { Activity } from './components/Activity';
import { useState } from 'react';
import { Splash } from './components/Splash';
import { Onboarding } from './components/Onboarding';
import { NewLoginPage } from './components/NewLoginPage';
import { NewDashboard } from './components/NewDashboard';
import { NewSchedulePickup } from './components/NewSchedulePickup';
import { NewReportWaste } from './components/NewReportWaste';
import { NewRecyclingKiosks } from './components/NewRecyclingKiosks';
import { NewProfile } from './components/NewProfile';
import { NewAboutUs } from './components/NewAboutUs';
import { USSDCompanion } from './components/USSDCompanion';
import { PaymentModule } from './components/PaymentModule';
import { Toaster } from './components/ui/sonner';

type AppState = 'splash' | 'onboarding' | 'login' | 'dashboard' | 'schedule' | 'report' | 'kiosks' | 'profile' | 'about' | 'ussd' | 'payment' | 'payment-history' | 'pickups' | 'reports' | 'stats';

export default function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => read('onboarded', false));

  const handleSplashComplete = () => {
    if (hasCompletedOnboarding) {
      setAppState('login');
    } else {
      setAppState('onboarding');
    }
  };

  const handleOnboardingComplete = () => {
    try { write('onboarded', true); } catch {}
    setHasCompletedOnboarding(true);
    setAppState('login');
  };

  const handleLogin = () => {
    setAppState('dashboard');
  };

  const handleNavigate = (page: string) => {
    // Map page names to app states
    switch (page) {
      case 'logout':
        setAppState('login');
        break;
      case 'dashboard':
        setAppState('dashboard');
        break;
      case 'schedule':
        setAppState('schedule');
        break;
      case 'report':
        setAppState('report');
        break;
      case 'kiosks':
        setAppState('kiosks');
        break;
      case 'profile':
        setAppState('profile');
        break;
      case 'about':
        setAppState('about');
        break;
      case 'ussd':
        setAppState('ussd');
        break;
      case 'payment':
        setAppState('payment');
        break;
      case 'payment-history':
        setAppState('payment-history');
        break;
      case 'pickups':
        setAppState('pickups');
        break;
      case 'reports':
        setAppState('reports');
        break;
      case 'stats':
        setAppState('profile');
        break;
      default:
        setAppState('dashboard');
    }
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
  };

  return (
    <>
      {appState === 'splash' && <Splash onComplete={handleSplashComplete} />}
      {appState === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}
      {appState === 'login' && <NewLoginPage onLogin={handleLogin} />}
      {appState === 'dashboard' && <NewDashboard onNavigate={handleNavigate} />}
      {appState === 'schedule' && <NewSchedulePickup onBack={handleBackToDashboard} onNavigate={handleNavigate} />}
      {appState === 'report' && <NewReportWaste onBack={handleBackToDashboard} onNavigate={handleNavigate} />}
      {appState === 'kiosks' && <NewRecyclingKiosks onBack={handleBackToDashboard} onNavigate={handleNavigate} />}
      {appState === 'profile' && <NewProfile onBack={handleBackToDashboard} onNavigate={handleNavigate} />}
      {appState === 'about' && <NewAboutUs onBack={handleBackToDashboard} />}
      {appState === 'ussd' && <USSDCompanion onBack={handleBackToDashboard} />}
      {appState === 'payment' && <PaymentModule onClose={handleBackToDashboard} />}
      {appState === 'payment-history' && <PaymentModule onClose={handleBackToDashboard} startWithHistory />}
      {(appState === 'pickups' || appState === 'reports') && <Activity kind={appState} onBack={handleBackToDashboard} />}
      <div role="status" className="fixed top-0 left-0 right-0 z-50 bg-amber-100 text-amber-950 text-center text-xs py-1 pointer-events-none">Local demo · data stays on this browser · payments are simulated</div>
      <Toaster />
    </>
  );
}
