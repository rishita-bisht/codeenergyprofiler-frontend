import { Badge } from '@/components/ui/badge';
import type { Severity } from '@/types';
import { AlertTriangle, AlertOctagon, Info, AlertCircle } from 'lucide-react';

interface SeverityBadgeProps {
  severity: Severity;
  showIcon?: boolean;
}

export function SeverityBadge({ severity, showIcon = true }: SeverityBadgeProps) {
  const variants: Record<Severity, { 
    label: string; 
    className: string;
    icon: React.ReactNode;
  }> = {
    critical: {
      label: 'Critical',
      className: 'bg-severity-critical/10 text-severity-critical border-severity-critical/30',
      icon: <AlertOctagon className="h-3 w-3" />
    },
    high: {
      label: 'High',
      className: 'bg-severity-high/10 text-severity-high border-severity-high/30',
      icon: <AlertTriangle className="h-3 w-3" />
    },
    medium: {
      label: 'Medium',
      className: 'bg-severity-medium/10 text-severity-medium border-severity-medium/30',
      icon: <AlertCircle className="h-3 w-3" />
    },
    low: {
      label: 'Low',
      className: 'bg-severity-low/10 text-severity-low border-severity-low/30',
      icon: <Info className="h-3 w-3" />
    }
  };

  const config = variants[severity];

  return (
    <Badge variant="outline" className={`${config.className} flex items-center gap-1`}>
      {showIcon && config.icon}
      <span className="font-medium">{config.label}</span>
    </Badge>
  );
}
