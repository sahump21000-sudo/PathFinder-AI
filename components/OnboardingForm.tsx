import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile, EducationLevel, Stream, SectorPreference } from '../types';

interface Props {
  onSubmit: (profile: UserProfile) => void;
}

const steps = [
  { id: 1, title: "Identity", description: "Let's start with who you are." },
  { id: 2, title: "Background", description: "Your academic foundation." },
  { id: 3, title: "Compass", description: "Where do you want to go?" },
];

const INDIAN_STATES = [
  "All India",
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", 
  "Lakshadweep", "Puducherry"
];

export const OnboardingForm: React.FC<Props> = ({ onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    educationLevel: EducationLevel.Class12,
    stream: Stream.PCM,
    interests: '',
    sectorPreference: SectorPreference.Both,
    location: 'All India'
  });

  const updateField = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onSubmit(formData);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const variants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
          Build Your Career DNA
        </h1>
        <p className="text-indigo-200 text-lg">
          Step {step} of 3: {steps[step - 1].description}
        </p>
        
        {/* Progress Bar */}
        <div className="h-1 w-full bg-white/10 mt-8 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-400"
            initial={{ width: "33%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div
            key={step}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="min-h-[300px] flex flex-col justify-center"
          >
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-indigo-300 text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-indigo-400/50 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-indigo-300 text-sm font-medium mb-2">Preferred Location</label>
                  <div className="relative">
                    <select
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-400 appearance-none cursor-pointer"
                    >
                      {INDIAN_STATES.map((state) => (
                        <option key={state} value={state} className="bg-indigo-950 text-white py-2">
                          {state}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-indigo-400/60 text-xs mt-2 ml-1">
                    Select a specific state for localized opportunities or 'All India' for national roles.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-indigo-300 text-sm font-medium mb-2">Education Level</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Object.values(EducationLevel).map((level) => (
                      <button
                        key={level}
                        onClick={() => updateField('educationLevel', level)}
                        className={`p-4 rounded-xl border transition-all text-sm font-medium ${
                          formData.educationLevel === level
                            ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                            : 'bg-black/20 border-white/10 text-indigo-200 hover:bg-white/5'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-indigo-300 text-sm font-medium mb-2">Stream / Specialization</label>
                  <div className="relative">
                    <select
                      value={formData.stream}
                      onChange={(e) => updateField('stream', e.target.value as Stream)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-400 appearance-none cursor-pointer"
                    >
                      {Object.values(Stream).map((s) => (
                        <option key={s} value={s} className="bg-indigo-950 text-white">{s}</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                 <div>
                  <label className="block text-indigo-300 text-sm font-medium mb-2">Sector Preference</label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.values(SectorPreference).map((pref) => (
                      <button
                        key={pref}
                        onClick={() => updateField('sectorPreference', pref)}
                        className={`p-4 rounded-xl border transition-all text-sm font-medium ${
                          formData.sectorPreference === pref
                            ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                            : 'bg-black/20 border-white/10 text-indigo-200 hover:bg-white/5'
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-indigo-300 text-sm font-medium mb-2">Interests & Hobbies</label>
                  <textarea
                    value={formData.interests}
                    onChange={(e) => updateField('interests', e.target.value)}
                    placeholder="e.g., Coding, Public Speaking, Traveling, Drawing..."
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-indigo-400/50 focus:outline-none focus:border-indigo-400 h-32 resize-none"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleBack}
            className={`px-6 py-3 rounded-full text-indigo-300 font-medium hover:text-white transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-white text-indigo-950 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {step === 3 ? 'Generate Plan' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};