import React from 'react';
import { motion } from 'framer-motion';
import { CareerOption, TierType } from '../types';

interface Props {
  path: CareerOption;
  tier: TierType;
  onClose: () => void;
}

const tierBadges = {
  'Elite': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Stable': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Hidden': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
};

export const CareerDetailModal: React.FC<Props> = ({ path, tier, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f172a] border border-white/20 rounded-[2rem] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 pb-4 border-b border-white/10 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${tierBadges[tier]}`}>
            {path.difficulty.toUpperCase()} DIFFICULTY
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">{path.role}</h2>
          <div className="flex items-center gap-4 text-indigo-300 text-sm">
            <span>{path.sector} Sector</span>
            <span className="w-1 h-1 rounded-full bg-white/30"></span>
            <span>{path.location || 'All India'}</span> 
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar">
          
          {/* 1. Description */}
          <div>
            <h4 className="text-indigo-400 text-xs uppercase tracking-wider font-bold mb-3">Role Overview</h4>
            <p className="text-indigo-100 text-lg leading-relaxed">
              {path.description}
            </p>
          </div>

          {/* 2. Competition Reality (Explicitly before Salary) */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="flex items-center gap-2 mb-3 text-amber-300/80 text-xs uppercase tracking-wider font-bold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
              Competition Reality
            </div>
            <p className="text-white font-medium text-lg">{path.competitionStats}</p>
            <p className="text-white/40 text-sm mt-2">
              *Based on recent market trends and application data.
            </p>
          </div>

          {/* 3. Salary Section */}
          <div className="bg-indigo-500/10 rounded-2xl p-5 border border-indigo-500/20">
             <div className="flex items-center gap-2 mb-3 text-indigo-300 text-xs uppercase tracking-wider font-bold">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Financial Prospects
              </div>
              <p className="text-2xl font-display font-bold text-white">{path.salaryRange}</p>
              <p className="text-indigo-300/60 text-sm">Estimated Annual Package</p>
          </div>

          {/* 4. Skills */}
          <div>
            <h4 className="text-indigo-400 text-xs uppercase tracking-wider font-bold mb-3">Required Arsenal</h4>
            <div className="flex flex-wrap gap-2">
              {path.requiredSkills.map((skill, idx) => (
                  <span key={idx} className="px-4 py-2 bg-indigo-500/20 rounded-lg text-sm text-indigo-200 border border-indigo-500/30">
                      {skill}
                  </span>
              ))}
            </div>
          </div>

          {/* 5. Action Area */}
          <div className="bg-indigo-900/40 rounded-2xl p-6 border border-indigo-500/30">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              Immediate Action Plan
            </h4>
            <p className="text-indigo-200 text-sm mb-6">{path.roadmapStep}</p>
            
            <a 
              href={path.officialPortal} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full py-4 text-center bg-white text-indigo-950 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-white/10"
            >
              Visit Official Portal / Apply Now
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};