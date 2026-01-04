import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CareerPlan, TierType, CareerOption } from '../types';
import { CareerCard } from './CareerCard';
import { CareerDetailModal } from './CareerDetailModal';

interface Props {
  plan: CareerPlan;
  onReset: () => void;
}

export const Dashboard: React.FC<Props> = ({ plan, onReset }) => {
  const [activeTab, setActiveTab] = useState<TierType>('Stable');
  const [selectedCareer, setSelectedCareer] = useState<CareerOption | null>(null);

  const tabs: { id: TierType; label: string; desc: string }[] = [
    { id: 'Elite', label: 'Elite', desc: 'High Risk, High Reward' },
    { id: 'Stable', label: 'Stable', desc: 'Secure & Popular' },
    { id: 'Hidden', label: 'Hidden Gems', desc: 'Low Competition' },
  ];

  const getPaths = () => {
    switch (activeTab) {
      case 'Elite': return plan.elitePaths;
      case 'Stable': return plan.stablePaths;
      case 'Hidden': return plan.hiddenGems;
      default: return [];
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Analysis Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <svg className="w-32 h-32 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        </div>
        <h2 className="text-3xl font-display font-bold text-white mb-6">Strategic Analysis</h2>
        <p className="text-indigo-100 text-lg leading-relaxed max-w-4xl relative z-10">
          {plan.userAnalysis}
        </p>
      </motion.div>

      {/* Tiered Roadmap - List View */}
      <div>
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <h2 className="text-2xl font-display font-bold text-white mb-4 md:mb-0">Recommended Trajectories</h2>
            
            <div className="flex bg-black/20 p-1 rounded-full border border-white/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                            activeTab === tab.id 
                            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' 
                            : 'text-indigo-300 hover:text-white'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>

        <div className="mb-6 text-center md:text-left">
           <span className="text-indigo-400 text-sm">
               Category Insight: <span className="text-white font-medium">{tabs.find(t => t.id === activeTab)?.desc}</span>
           </span>
        </div>

        {/* Dense Grid for More Jobs */}
        <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
            <AnimatePresence mode="popLayout">
                {getPaths().map((path, index) => (
                    <CareerCard 
                        key={`${path.role}-${index}`} 
                        path={path} 
                        tier={activeTab} 
                        onClick={() => setSelectedCareer(path)}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
      </div>

      <div className="text-center pt-12 border-t border-white/10">
        <button 
            onClick={onReset}
            className="px-8 py-3 rounded-full border border-white/20 text-indigo-200 hover:bg-white/5 transition-colors"
        >
            Start New Profile
        </button>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCareer && (
            <CareerDetailModal 
                path={selectedCareer} 
                tier={activeTab} 
                onClose={() => setSelectedCareer(null)} 
            />
        )}
      </AnimatePresence>
    </div>
  );
};