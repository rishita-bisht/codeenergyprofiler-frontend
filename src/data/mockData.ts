// Mock data for demonstration purposes
import type {
  Hotspot,
  FileAnalysis,
  UserProfile,
  EnergySummary,
  RuleDistribution,
  TrendPoint,
  DailyChallenge,
  Achievement
} from '@/types';

export const mockHotspots: Hotspot[] = [
  {
    id: '1',
    fileName: 'utils/dataProcessor.ts',
    lineNumber: 45,
    rule: 'Inefficient Loop',
    energyCost: 125.5,
    severity: 'critical',
    description: 'Nested loops with O(n²) complexity causing excessive CPU cycles',
    suggestion: 'Use Map or Set for O(1) lookups instead of nested loops'
  },
  {
    id: '2',
    fileName: 'components/Dashboard.tsx',
    lineNumber: 89,
    rule: 'Unnecessary Re-renders',
    energyCost: 87.3,
    severity: 'high',
    description: 'Component re-renders on every state change without memoization',
    suggestion: 'Wrap component with React.memo() or use useMemo for expensive calculations'
  },
  {
    id: '3',
    fileName: 'api/fetchData.ts',
    lineNumber: 23,
    rule: 'Memory Leak',
    energyCost: 156.8,
    severity: 'critical',
    description: 'Event listeners not cleaned up in useEffect',
    suggestion: 'Return cleanup function from useEffect to remove event listeners'
  },
  {
    id: '4',
    fileName: 'utils/stringUtils.ts',
    lineNumber: 67,
    rule: 'Regex Backtracking',
    energyCost: 92.1,
    severity: 'high',
    description: 'Complex regex pattern causing catastrophic backtracking',
    suggestion: 'Simplify regex or use atomic groups to prevent backtracking'
  },
  {
    id: '5',
    fileName: 'styles/animations.css',
    lineNumber: 112,
    rule: 'GPU Thrashing',
    energyCost: 45.6,
    severity: 'medium',
    description: 'Animating properties that trigger layout reflow',
    suggestion: 'Use transform and opacity for animations instead of top/left/width/height'
  },
  {
    id: '6',
    fileName: 'services/imageLoader.ts',
    lineNumber: 34,
    rule: 'Synchronous I/O',
    energyCost: 134.2,
    severity: 'high',
    description: 'Blocking main thread with synchronous file operations',
    suggestion: 'Use async/await or Promises for I/O operations'
  },
  {
    id: '7',
    fileName: 'utils/calculations.ts',
    lineNumber: 78,
    rule: 'Redundant Computation',
    energyCost: 38.9,
    severity: 'medium',
    description: 'Same calculation performed multiple times without caching',
    suggestion: 'Cache computed values or use memoization'
  },
  {
    id: '8',
    fileName: 'components/ImageGallery.tsx',
    lineNumber: 156,
    rule: 'Large DOM Tree',
    energyCost: 67.4,
    severity: 'medium',
    description: 'Rendering all images at once causing DOM bloat',
    suggestion: 'Implement virtual scrolling or lazy loading'
  }
];

export const mockFileAnalysis: FileAnalysis[] = [
  {
    fileName: 'utils/dataProcessor.ts',
    energyUsed: 342.8,
    efficiencyScore: 42,
    hotspotsCount: 3,
    severity: 'critical',
    linesAnalyzed: 245
  },
  {
    fileName: 'components/Dashboard.tsx',
    energyUsed: 187.3,
    efficiencyScore: 68,
    hotspotsCount: 2,
    severity: 'high',
    linesAnalyzed: 412
  },
  {
    fileName: 'api/fetchData.ts',
    energyUsed: 289.6,
    efficiencyScore: 55,
    hotspotsCount: 2,
    severity: 'critical',
    linesAnalyzed: 156
  },
  {
    fileName: 'utils/stringUtils.ts',
    energyUsed: 124.5,
    efficiencyScore: 74,
    hotspotsCount: 1,
    severity: 'high',
    linesAnalyzed: 89
  },
  {
    fileName: 'styles/animations.css',
    energyUsed: 45.6,
    efficiencyScore: 85,
    hotspotsCount: 1,
    severity: 'medium',
    linesAnalyzed: 234
  },
  {
    fileName: 'services/imageLoader.ts',
    energyUsed: 201.3,
    efficiencyScore: 61,
    hotspotsCount: 2,
    severity: 'high',
    linesAnalyzed: 178
  },
  {
    fileName: 'utils/calculations.ts',
    energyUsed: 89.2,
    efficiencyScore: 79,
    hotspotsCount: 1,
    severity: 'medium',
    linesAnalyzed: 134
  },
  {
    fileName: 'components/ImageGallery.tsx',
    energyUsed: 156.7,
    efficiencyScore: 71,
    hotspotsCount: 1,
    severity: 'medium',
    linesAnalyzed: 298
  }
];

export const mockUserProfile: UserProfile = {
  level: 12,
  xp: 2450,
  xpForNextLevel: 3000,
  ecoRank: '🌿 Optimizer',
  streak: 7,
  energySavedToday: 1234.5,
  filesOptimized: 24,
  hotspotsReduced: 67,
  achievements: []
};

export const mockAchievements: Achievement[] = [
  {
    id: 'first_optimization',
    title: 'First Steps',
    description: 'Complete your first code optimization',
    icon: '🎯',
    unlocked: true,
    unlockedAt: new Date('2024-01-15'),
    xpReward: 100
  },
  {
    id: 'five_hotspots',
    title: 'Hotspot Hunter',
    description: 'Fix 5 energy hotspots',
    icon: '🔥',
    unlocked: true,
    unlockedAt: new Date('2024-01-18'),
    xpReward: 250
  },
  {
    id: 'high_score',
    title: 'Efficiency Expert',
    description: 'Achieve an energy score above 90',
    icon: '⚡',
    unlocked: true,
    unlockedAt: new Date('2024-01-22'),
    xpReward: 500
  },
  {
    id: 'energy_saver',
    title: 'Energy Saver',
    description: 'Save 1000mJ in total',
    icon: '💚',
    unlocked: true,
    unlockedAt: new Date('2024-01-25'),
    xpReward: 350
  },
  {
    id: 'week_streak',
    title: 'Dedicated',
    description: 'Maintain a 7-day optimization streak',
    icon: '🔥',
    unlocked: false,
    xpReward: 600
  },
  {
    id: 'twenty_files',
    title: 'Code Cleaner',
    description: 'Optimize 20 different files',
    icon: '📁',
    unlocked: false,
    xpReward: 450
  }
];

export const mockEnergySummary: EnergySummary = {
  totalEnergy: 1437.0,
  averageScore: 67,
  filesAnalyzed: 8,
  totalHotspots: 13,
  criticalIssues: 3,
  mode: 'local',
  timestamp: new Date()
};

export const mockRuleDistribution: RuleDistribution[] = [
  { rule: 'Inefficient Loops', count: 3, energyImpact: 342.8 },
  { rule: 'Memory Leaks', count: 2, energyImpact: 289.6 },
  { rule: 'Unnecessary Re-renders', count: 2, energyImpact: 187.3 },
  { rule: 'Synchronous I/O', count: 2, energyImpact: 201.3 },
  { rule: 'Regex Backtracking', count: 1, energyImpact: 92.1 },
  { rule: 'GPU Thrashing', count: 1, energyImpact: 45.6 },
  { rule: 'Redundant Computation', count: 1, energyImpact: 89.2 },
  { rule: 'Large DOM Tree', count: 1, energyImpact: 67.4 }
];

export const mockTrendData: TrendPoint[] = [
  { date: '2024-01-15', score: 45, energy: 2345 },
  { date: '2024-01-16', score: 52, energy: 2156 },
  { date: '2024-01-17', score: 48, energy: 2289 },
  { date: '2024-01-18', score: 58, energy: 1987 },
  { date: '2024-01-19', score: 63, energy: 1823 },
  { date: '2024-01-20', score: 61, energy: 1891 },
  { date: '2024-01-21', score: 67, energy: 1656 },
  { date: '2024-01-22', score: 71, energy: 1534 },
  { date: '2024-01-23', score: 68, energy: 1612 },
  { date: '2024-01-24', score: 73, energy: 1478 },
  { date: '2024-01-25', score: 67, energy: 1437 }
];

export const mockDailyChallenges: DailyChallenge[] = [
  {
    id: 'daily_1',
    title: 'Quick Fix',
    description: 'Fix 3 hotspots today',
    progress: 1,
    target: 3,
    xpReward: 150,
    completed: false
  },
  {
    id: 'daily_2',
    title: 'Energy Efficient',
    description: 'Save 500mJ of energy',
    progress: 234,
    target: 500,
    xpReward: 200,
    completed: false
  },
  {
    id: 'daily_3',
    title: 'File Master',
    description: 'Optimize 5 files',
    progress: 2,
    target: 5,
    xpReward: 175,
    completed: false
  }
];
