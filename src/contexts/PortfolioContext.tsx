import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  cgpa: string;
  aiTrainingDuration: string;
}

export interface Education {
  degree: string;
  specialization: string;
  institution: string;
  duration: string;
}

export interface Skill {
  title: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  date: string;
  github?: string;
  demo?: string;
}

export interface Experience {
  title: string;
  company: string;
  type: string;
  duration: string;
  responsibilities: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface PortfolioData {
  profile: Profile;
  education: Education;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  certifications: Certification[];
  languages: Language[];
}

// Default data
const defaultData: PortfolioData = {
  profile: {
    name: "Rohan Patel",
    title: "Data Science & Machine Learning Engineer",
    tagline: "Building intelligent systems and extracting insights from complex data. Passionate about leveraging AI to solve real-world problems.",
    location: "Vellore, India",
    email: "rohanp.o2608@gmail.com",
    phone: "+91 7978546441",
    github: "https://github.com/Rohan26x",
    linkedin: "https://linkedin.com/in/rohan26x",
    cgpa: "8.26",
    aiTrainingDuration: "6-8",
  },
  education: {
    degree: "B.Tech in Computer Science",
    specialization: "Data Science Specialization",
    institution: "Vellore Institute of Technology",
    duration: "Aug 2023 – May 2027",
  },
  skills: [
    { title: "Languages", skills: ["Python", "R", "Java", "JavaScript", "SQL", "C"] },
    { title: "Web Development", skills: ["React.js", "Next.js", "HTML", "CSS", "REST APIs"] },
    { title: "Data & ML", skills: ["Pandas", "NumPy", "Matplotlib", "Scikit-learn", "Statistical Analysis", "Predictive Modeling"] },
    { title: "Tools & Automation", skills: ["Selenium", "PyQt6", "Git", "GitHub", "CI/CD", "Agile"] },
    { title: "Databases", skills: ["MySQL", "PostgreSQL"] },
    { title: "Cloud & IDEs", skills: ["AWS Foundations", "VS Code", "PyCharm", "RStudio", "DataSpell"] },
  ],
  projects: [
    {
      title: "Railway Route Optimization Engine",
      description: "Graph-based route optimizer processing 1,200+ stations using Dijkstra's algorithm with temporal constraints. Achieved sub-200ms query response at 99.8% accuracy.",
      tech: ["Python", "MySQL", "Dijkstra's Algorithm", "B-tree Indexing"],
      highlights: ["1,200+ stations processed", "99.8% accuracy rate", "70% reduced planning time", "22% improved network utilization"],
      date: "Jul - Nov 2024",
      github: "https://github.com/Rohan26x/railway-route-optimization",
    },
    {
      title: "AI-Overlay — Educational Assistant",
      description: "Cross-platform desktop application with automated screenshot-to-explanation pipeline, reducing query resolution time from 5 minutes to 30 seconds for 500+ active users.",
      tech: ["Python", "Perplexity API", "PyQt6", "PyInstaller"],
      highlights: ["500+ active users", "97% satisfaction rating", "1,000+ queries processed", "GDPR-compliant data handling"],
      date: "2024",
      github: "https://github.com/Rohan26x/ai-overlay",
    },
    {
      title: "Railway Data Extraction System",
      description: "Large-scale web scraping pipeline extracting 60,000+ structured train records from dynamic JavaScript-rendered pages across 700+ routes.",
      tech: ["Python", "Selenium", "Pandas", "ETL"],
      highlights: ["60,000+ records extracted", "96% extraction precision", "99.2% uptime", "45 hrs/week saved"],
      date: "2024",
      github: "https://github.com/Rohan26x/railway-data-extraction",
    },
  ],
  experiences: [
    {
      title: "AI Trainer",
      company: "Outlier Platform",
      type: "Part-time",
      duration: "6–8 months",
      responsibilities: [
        "Contributed domain expertise to improve large language models used in coding, STEM, and general reasoning tasks",
        "Executed adversarial prompt engineering and RLHF workflows to identify edge-case failures in LLM reasoning",
        "Created detailed grading rubrics and scorecards defining criteria for correctness, safety, completeness, and clarity",
        "Evaluated, rated, and ranked AI responses to guide model preference learning and performance tuning",
      ],
    },
  ],
  certifications: [
    { title: "OCI AI Foundations Associate", issuer: "Oracle", date: "Nov 2024" },
    { title: "OCI Generative AI Professional", issuer: "Oracle", date: "Dec 2024" },
    { title: "Data Analytics & Machine Learning", issuer: "Udemy", date: "Oct 2024" },
    { title: "Python with Hands-on Projects", issuer: "Udemy", date: "Sep 2024" },
    { title: "AI with Python", issuer: "Skillumni", date: "Aug 2024" },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Hindi", level: "Native" },
    { name: "Japanese", level: "Elementary" },
  ],
};

interface PortfolioContextType {
  data: PortfolioData;
  updateProfile: (profile: Profile) => void;
  updateEducation: (education: Education) => void;
  updateSkills: (skills: Skill[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateLanguages: (languages: Language[]) => void;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio_data";

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Migration: convert old 'experience' to 'experiences' array
        if (parsed.experience && !parsed.experiences) {
          parsed.experiences = [parsed.experience];
          delete parsed.experience;
        }
        return { ...defaultData, ...parsed };
      }
      return defaultData;
    } catch {
      return defaultData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateProfile = (profile: Profile) => setData(prev => ({ ...prev, profile }));
  const updateEducation = (education: Education) => setData(prev => ({ ...prev, education }));
  const updateSkills = (skills: Skill[]) => setData(prev => ({ ...prev, skills }));
  const updateProjects = (projects: Project[]) => setData(prev => ({ ...prev, projects }));
  const updateExperiences = (experiences: Experience[]) => setData(prev => ({ ...prev, experiences }));
  const updateCertifications = (certifications: Certification[]) => setData(prev => ({ ...prev, certifications }));
  const updateLanguages = (languages: Language[]) => setData(prev => ({ ...prev, languages }));
  const resetToDefaults = () => setData(defaultData);

  return (
    <PortfolioContext.Provider value={{
      data,
      updateProfile,
      updateEducation,
      updateSkills,
      updateProjects,
      updateExperiences,
      updateCertifications,
      updateLanguages,
      resetToDefaults,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
