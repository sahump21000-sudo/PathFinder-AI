import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { OnboardingForm } from './components/OnboardingForm';
import { LoadingScreen } from './components/LoadingScreen';
import { Dashboard } from './components/Dashboard';
import { UserProfile, CareerPlan } from './types';
import { generateCareerPlan } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'form' | 'loading' | 'dashboard'>('form');
  const [careerPlan, setCareerPlan] = useState<CareerPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (profile: UserProfile) => {
    setView('loading');
    setError(null);
    try {
      const plan = await generateCareerPlan(profile);
      setCareerPlan(plan);
      setView('dashboard');
    } catch (err) {
      console.error(err);
      setError("We encountered an issue connecting to the Career Matrix. Please try again.");
      setView('form');
    }
  };

  const handleReset = () => {
    setCareerPlan(null);
    setView('form');
  };

  return (
    <Layout>
      {error && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-red-500/10 border border-red-500 text-red-200 px-6 py-3 rounded-xl z-50 backdrop-blur-md">
          {error}
        </div>
      )}

      {view === 'form' && <OnboardingForm onSubmit={handleFormSubmit} />}
      
      {view === 'loading' && <LoadingScreen />}
      
      {view === 'dashboard' && careerPlan && (
        <Dashboard plan={careerPlan} onReset={handleReset} />
      )}
    </Layout>
  );
};

export default App;