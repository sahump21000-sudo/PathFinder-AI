import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-indigo-950 text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden relative">
      {/* Abstract Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-cyan-600/20 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-indigo-950/50 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">PathFinder AI</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-sm text-indigo-200">
          <span>Analysis</span>
          <span>Strategy</span>
          <span>Resources</span>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};