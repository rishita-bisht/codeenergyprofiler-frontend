import { Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StreakCounterProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StreakCounter({ streak, size = 'md' }: StreakCounterProps) {
  const isOnFire = streak >= 7;
  
  const sizes = {
    sm: { container: 'p-3', icon: 'h-6 w-6', text: 'text-2xl' },
    md: { container: 'p-4', icon: 'h-8 w-8', text: 'text-3xl' },
    lg: { container: 'p-6', icon: 'h-10 w-10', text: 'text-4xl' }
  };

  const config = sizes[size];

  return (
    <Card className={`${config.container} relative overflow-hidden ${isOnFire ? 'border-streak' : ''}`}>
      {isOnFire && (
        <div className="absolute inset-0 bg-gradient-to-br from-streak/10 to-transparent animate-pulse-slow" />
      )}
      
      <div className="relative flex items-center gap-4">
        <div className={`${isOnFire ? 'animate-float' : ''}`}>
          <Flame 
            className={`${config.icon} ${isOnFire ? 'text-streak animate-pulse-glow' : 'text-muted-foreground'}`}
            fill={isOnFire ? 'currentColor' : 'none'}
          />
        </div>
        
        <div>
          <div className={`${config.text} font-bold ${isOnFire ? 'text-streak' : 'text-foreground'}`}>
            {streak}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            Day Streak {isOnFire && '🔥'}
          </div>
        </div>
      </div>

      {isOnFire && (
        <div className="mt-2 text-xs text-streak font-medium">
          You're on fire! Keep it up!
        </div>
      )}
    </Card>
  );
}
