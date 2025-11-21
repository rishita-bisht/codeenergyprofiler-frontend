import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SeverityBadge } from './SeverityBadge';
import type { Hotspot } from '@/types';
import { FileCode, Zap, ExternalLink, Lightbulb } from 'lucide-react';
import { webviewHost } from '@/utils/webviewHost';

interface HotspotCardProps {
  hotspot: Hotspot;
  onFix?: (id: string) => void;
}

export function HotspotCard({ hotspot, onFix }: HotspotCardProps) {
  const handleOpenFile = () => {
    webviewHost.openFile(hotspot.fileName, hotspot.lineNumber);
  };

  const handleFix = () => {
    if (onFix) {
      onFix(hotspot.id);
    }
    webviewHost.fixHotspot(hotspot.id);
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-300 border-l-4 hover:border-l-primary group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-primary" />
              <button
                onClick={handleOpenFile}
                className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
              >
                {hotspot.fileName}
                <ExternalLink className="h-3 w-3" />
              </button>
              <span className="text-xs text-muted-foreground">
                Line {hotspot.lineNumber}
              </span>
            </div>
            <SeverityBadge severity={hotspot.severity} />
          </div>

          {/* Rule */}
          <div className="space-y-1">
            <div className="font-semibold text-foreground">
              {hotspot.rule}
            </div>
            <div className="text-sm text-muted-foreground">
              {hotspot.description}
            </div>
          </div>

          {/* Suggestion */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/30 border border-secondary/50">
            <Lightbulb className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-foreground">
              <span className="font-medium">Suggestion:</span> {hotspot.suggestion}
            </div>
          </div>

          {/* Energy Cost */}
          <div className="flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4 text-energy-moderate" />
            <span className="font-semibold text-energy-moderate">
              {hotspot.energyCost.toFixed(1)} mJ
            </span>
            <span className="text-muted-foreground">energy cost</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <Button
            size="sm"
            onClick={handleFix}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            Quick Fix
          </Button>
        </div>
      </div>
    </Card>
  );
}
