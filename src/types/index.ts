// Core types for Code Energy Profiler

export type AnalysisMode = 'local' | 'cloud';

export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type EcoRank = 
  | '🌱 Eco Noob'
  | '🌿 Optimizer'
  | '⚡ Green Architect'
  | '🏆 Energy Master';

export interface Hotspot {
  id: string;
  fileName: string;
  lineNumber: number;
  rule: string;
  energyCost: number; // in mJ
  severity: Severity;
  description: string;
  suggestion: string;
}

export interface FileAnalysis {
  fileName: string;
  energyUsed: number;
  efficiencyScore: number;
  hotspotsCount: number;
  severity: Severity;
  linesAnalyzed: number;
}

export interface UserProfile {
  level: number;
  xp: number;
  xpForNextLevel: number;
  ecoRank: EcoRank;
  streak: number;
  energySavedToday: number;
  filesOptimized: number;
  hotspotsReduced: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  xpReward: number;
}

export interface EnergySummary {
  totalEnergy: number;
  averageScore: number;
  filesAnalyzed: number;
  totalHotspots: number;
  criticalIssues: number;
  mode: AnalysisMode;
  timestamp: Date;
}

export interface RuleDistribution {
  rule: string;
  count: number;
  energyImpact: number;
}

export interface TrendPoint {
  date: string;
  score: number;
  energy: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
}
