import React from 'react';
import { motion } from 'framer-motion';
import { CareerOption, TierType } from '../types';

interface Props {
  path: CareerOption;
  tier: TierType;
  onClick: () => void;
}

const tierColors = {
  'Elite': 'hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)] border-amber-500/30 hover:border-amber-500/60',
  'Stable': 'hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] border-blue-500/30 hover:border-blue-500/60',
  'Hidden': 'hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] border-emerald-500/30 hover:border-emerald-500/60'
};

export const CareerCard: React.FC<Props> = ({ path, tier, onClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group w-full text-left relative overflow-hidden rounded-2xl p-5 border bg-white/5 backdrop-blur-sm transition-all duration-300 flex flex-col h-full ${tierColors[tier]}`}
    >
      {/* Abstract decorative accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-[4rem] -mr-4 -mt-4 transition-opacity group-hover:opacity-100 opacity-50`} />

      <div className="flex-grow relative z-10">
        <div className="flex justify-between items-start gap-4 mb-2">
            <h3 className="text-lg md:text-xl font-display font-bold text-white leading-tight group-hover:text-indigo-200 transition-colors">
            {path.role}
            </h3>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 text-sm text-indigo-300/80 mb-4">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-medium">
                {path.sector}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="text-xs">{path.difficulty} Difficulty</span>
            {path.location && path.location !== 'All India' && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                <span className="text-xs text-emerald-300">{path.location}</span>
              </>
            )}
        </div>

        {/* Added Description and Competition before Salary */}
        <p className="text-indigo-200/70 text-sm leading-relaxed mb-4 line-clamp-2">
          {path.description}
        </p>
        
        <div className="flex items-center gap-2 text-xs text-indigo-400 mb-2">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            <span className="truncate max-w-full opacity-80">{path.competitionStats.substring(0, 40)}{path.competitionStats.length > 40 ? '...' : ''}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-auto w-full relative z-10">
        <div>
            <span className="block text-[10px] text-indigo-400 uppercase tracking-wider font-bold">Avg. Salary</span>
            <span className="text-white font-medium text-sm">
                {path.salaryRange}
            </span>
        </div>
        
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all text-indigo-400">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
      </div>
    </motion.button>
  );
};