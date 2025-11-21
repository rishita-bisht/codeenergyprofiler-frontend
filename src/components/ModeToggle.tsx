import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Cloud } from 'lucide-react';
import type { AnalysisMode } from '@/types';
import { webviewHost } from '@/utils/webviewHost';

interface ModeToggleProps {
  currentMode: AnalysisMode;
  onModeChange?: (mode: AnalysisMode) => void;
}

export function ModeToggle({ currentMode, onModeChange }: ModeToggleProps) {
  const [mode, setMode] = useState<AnalysisMode>(currentMode);

  const handleToggle = (newMode: AnalysisMode) => {
    setMode(newMode);
    webviewHost.setAnalysisMode(newMode);
    onModeChange?.(newMode);
  };

  return (
    <div className="flex items-center gap-2 p-1 rounded-lg bg-muted">
      <Button
        size="sm"
        variant={mode === 'local' ? 'default' : 'ghost'}
        onClick={() => handleToggle('local')}
        className={`flex items-center gap-2 ${
          mode === 'local' 
            ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' 
            : 'hover:bg-background'
        }`}
      >
        <Monitor className="h-4 w-4" />
        <span className="font-medium">Local</span>
        {mode === 'local' && <div className="h-2 w-2 rounded-full bg-secondary-glow animate-pulse" />}
      </Button>

      <Button
        size="sm"
        variant={mode === 'cloud' ? 'default' : 'ghost'}
        onClick={() => handleToggle('cloud')}
        className={`flex items-center gap-2 ${
          mode === 'cloud' 
            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
            : 'hover:bg-background'
        }`}
      >
        <Cloud className="h-4 w-4" />
        <span className="font-medium">Cloud AI</span>
        {mode === 'cloud' && <div className="h-2 w-2 rounded-full bg-primary-glow animate-pulse" />}
      </Button>
    </div>
  );
}
