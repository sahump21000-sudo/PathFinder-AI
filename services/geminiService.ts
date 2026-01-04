import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserProfile, CareerPlan } from "../types";

const apiKey = process.env.API_KEY;

// We strictly define the schema to ensure the UI can render the data consistently.
const careerOptionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    role: { type: Type.STRING, description: "Job title or exam name (e.g., UPSC CSE, Senior Backend Dev)." },
    sector: { type: Type.STRING, enum: ["Government", "Private"], description: "The sector of the job." },
    description: { type: Type.STRING, description: "A brief, inspiring description of the role." },
    salaryRange: { type: Type.STRING, description: "Estimated annual package (e.g., ₹12L - ₹24L PA)." },
    difficulty: { type: Type.STRING, enum: ["High", "Medium", "Low"], description: "Difficulty to enter." },
    competitionStats: { type: Type.STRING, description: "Real-world competition data (e.g., 'Approx 10L applicants for 800 seats'). Use the search tool to find this." },
    officialPortal: { type: Type.STRING, description: "The official URL for applications (e.g., upsc.gov.in or linkedin.com)." },
    requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Top 3-4 key skills or subjects needed." },
    roadmapStep: { type: Type.STRING, description: "The immediate first step the user should take today." },
    location: { type: Type.STRING, description: "The specific location context (e.g., 'All India', 'Maharashtra', 'Bangalore', 'Remote')." },
  },
  required: ["role", "sector", "description", "salaryRange", "difficulty", "competitionStats", "officialPortal", "requiredSkills", "roadmapStep", "location"],
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    userAnalysis: { type: Type.STRING, description: "A personalized, empathetic paragraph acknowledging the user's situation and validating their confusion." },
    elitePaths: { type: Type.ARRAY, items: careerOptionSchema, description: "High difficulty, high reward paths." },
    stablePaths: { type: Type.ARRAY, items: careerOptionSchema, description: "High volume, reliable career paths." },
    hiddenGems: { type: Type.ARRAY, items: careerOptionSchema, description: "Low awareness but high value/growth paths." },
  },
  required: ["userAnalysis", "elitePaths", "stablePaths", "hiddenGems"],
};

export const generateCareerPlan = async (profile: UserProfile): Promise<CareerPlan> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as a World-Class Career Strategist.
    
    User Profile:
    - Name: ${profile.name}
    - Education: ${profile.educationLevel}
    - Stream: ${profile.stream}
    - Interests/Hobbies: ${profile.interests}
    - Sector Preference: ${profile.sectorPreference}
    - Location Preference: ${profile.location}

    Goal:
    Generate a comprehensive, exhaustive 'Master Plan' containing ALL possible career options. Do not leave out any major opportunities.
    
    Tasks:
    1. Write a 'userAnalysis' that is empathetic. Acknowledge that confusion is normal. Speak directly to ${profile.name}.
    2. Suggest at least 6-10 paths for 'Elite' (Very hard, prestigious).
    3. Suggest at least 6-10 paths for 'Stable' (Safe, popular, good volume).
    4. Suggest at least 6-10 paths for 'Hidden Gems' (Niche, upcoming, less competition).
    
    CRITICAL:
    - You have access to Google Search. You MUST use it to find the REAL 'officialPortal' URLs and current 'competitionStats'.
    - If the user has selected a specific state (e.g., "${profile.location}"), you MUST include state-specific government exams (like State PSCs) and local private sector hubs in that state, alongside All-India options.
    - Ensure the 'location' field accurately reflects if a job is state-specific (e.g., "Maharashtra Govt") or national (e.g., "All India").
    - Be EXHAUSTIVE. Provide a long list of high-quality options.
    - Provide the response in strict JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Supports search + strong reasoning
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response generated");

    return JSON.parse(text) as CareerPlan;
  } catch (error) {
    console.error("Career Plan Generation Error:", error);
    throw error;
  }
};