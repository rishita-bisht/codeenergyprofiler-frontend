import { Card } from '@/components/ui/card';
import type { Achievement } from '@/types';
import { Lock, Trophy } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

export function AchievementBadge({ achievement, size = 'md' }: AchievementBadgeProps) {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const iconSizes = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  return (
    <Card 
      className={`${sizeClasses[size]} relative overflow-hidden transition-all duration-300 ${
        achievement.unlocked 
          ? 'border-achievement/50 hover:border-achievement hover:shadow-lg hover:shadow-achievement/20' 
          : 'opacity-50 grayscale'
      }`}
    >
      {achievement.unlocked && (
        <div className="absolute top-0 right-0 p-2">
          <Trophy className="h-4 w-4 text-achievement" />
        </div>
      )}
      
      <div className="flex flex-col items-center gap-3 text-center">
        <div className={`${iconSizes[size]} ${!achievement.unlocked && 'relative'}`}>
          {achievement.unlocked ? (
            <span className="animate-float">{achievement.icon}</span>
          ) : (
            <>
              <span className="blur-sm">{achievement.icon}</span>
              <Lock className="absolute inset-0 m-auto h-5 w-5 text-muted-foreground" />
            </>
          )}
        </div>
        
        <div>
          <div className="font-semibold text-sm">
            {achievement.title}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {achievement.description}
          </div>
        </div>

        <div className="text-xs font-medium text-achievement">
          +{achievement.xpReward} XP
        </div>

        {achievement.unlocked && achievement.unlockedAt && (
          <div className="text-xs text-muted-foreground">
            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </Card>
  );
}
