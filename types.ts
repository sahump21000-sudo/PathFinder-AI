export enum Stream {
  PCM = "PCM",
  PCB = "PCB",
  Commerce = "Commerce",
  Arts = "Arts",
  Vocational = "Vocational"
}

export enum EducationLevel {
  Class12 = "12th Pass",
  Graduate = "Graduate",
  PostGraduate = "Post Graduate"
}

export enum SectorPreference {
  Govt = "Government",
  Private = "Private",
  Both = "Both"
}

export interface UserProfile {
  name: string;
  educationLevel: EducationLevel;
  stream: Stream;
  interests: string;
  sectorPreference: SectorPreference;
  location: string;
}

export interface CareerOption {
  role: string;
  sector: "Government" | "Private";
  description: string;
  salaryRange: string;
  difficulty: "High" | "Medium" | "Low";
  competitionStats: string;
  officialPortal: string;
  requiredSkills: string[];
  roadmapStep: string;
  location: string;
}

export interface CareerPlan {
  userAnalysis: string;
  elitePaths: CareerOption[];
  stablePaths: CareerOption[];
  hiddenGems: CareerOption[];
}

export type TierType = 'Elite' | 'Stable' | 'Hidden';