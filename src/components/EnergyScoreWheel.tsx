import { useEffect, useState } from 'react';

interface EnergyScoreWheelProps {
  score: number; // 0-100
  size?: number;
  showLabel?: boolean;
}

export function EnergyScoreWheel({ score, size = 200, showLabel = true }: EnergyScoreWheelProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'hsl(var(--energy-excellent))';
    if (score >= 75) return 'hsl(var(--energy-good))';
    if (score >= 60) return 'hsl(var(--energy-moderate))';
    if (score >= 40) return 'hsl(var(--energy-poor))';
    return 'hsl(var(--energy-critical))';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Moderate';
    if (score >= 40) return 'Poor';
    return 'Critical';
  };

  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            opacity="0.2"
          />
          
          {/* Animated progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${color})`
            }}
          />
        </svg>

        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div 
            className="text-5xl font-bold transition-all duration-1000"
            style={{ color }}
          >
            {Math.round(animatedScore)}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            Energy Score
          </div>
        </div>
      </div>

      {showLabel && (
        <div 
          className="text-lg font-semibold px-4 py-2 rounded-full border-2 transition-all duration-500"
          style={{ 
            borderColor: color,
            color: color,
            backgroundColor: `${color}15`
          }}
        >
          {getScoreLabel(score)}
        </div>
      )}
    </div>
  );
}
