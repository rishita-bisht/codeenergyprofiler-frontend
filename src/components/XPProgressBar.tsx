interface XPProgressBarProps {
  currentXP: number;
  targetXP: number;
  level: number;
}

export function XPProgressBar({ currentXP, targetXP, level }: XPProgressBarProps) {
  const percentage = Math.min((currentXP / targetXP) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-muted-foreground">
            Level {level}
          </div>
          <div className="text-xs text-muted-foreground">
            {currentXP} / {targetXP} XP
          </div>
        </div>
        <div className="text-sm font-semibold text-xp">
          {targetXP - currentXP} to next level
        </div>
      </div>

      <div className="relative h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, hsl(var(--xp-bar)), hsl(var(--primary-glow)))',
            boxShadow: '0 0 12px hsl(var(--xp-bar) / 0.5)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
